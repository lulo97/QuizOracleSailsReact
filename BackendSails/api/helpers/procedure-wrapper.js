const { getConnection } = require("../../config/database/db-connection");
const { CURSOR, VARCHAR2 } = require("../../utils/consts")

module.exports = {
  inputs: {
    prc_name: {
      type: 'string',
      required: true,
    },
    prc_params: {
      type: 'ref',
      required: true
    },
    req: {
      type: 'ref',
      required: true
    }, 
  },

  fn: async function (inputs, exits) {

    const { prc_name, prc_params, req } = inputs;

    prc_params.p_refcursor = CURSOR;
    prc_params.p_error_code = VARCHAR2;
    prc_params.p_error_message = VARCHAR2;
    prc_params.p_language = req.headers['language'] ?? 'vi';

    for (const [key, value] of Object.entries(prc_params)) {
      prc_params[key] = value ?? '';
    };

    console.log(prc_params)

    const connection = await getConnection();

    const result_query = await connection.execute(
      `SELECT query 
         FROM tbl_procedure_declare 
         WHERE name = :prc_name`,
      [prc_name]
    );

    if (result_query.rows.length === 0) {
      return exits.error('Procedure not found');
    }

    const prc_query = result_query.rows[0][0];

    const result_call = await connection.execute(
      prc_query,
      prc_params
    );

    const result_data = result_call.outBinds.p_refcursor;
    const error_code = result_call.outBinds.p_error_code;
    const error_message = result_call.outBinds.p_error_message;

    const rows = await result_data.getRows();

    const columns = result_data.metaData.map(
      (ele) => ele.name
    );

    await result_data.close();

    const data = rows.map(row_ele => {
      let current_element = {};
      columns.map((col_ele, idx) => {
        current_element[col_ele] = row_ele[idx];
      })
      return current_element;
    })

    await connection.close();

    return exits.success({ data, error_code, error_message });
  }
};
