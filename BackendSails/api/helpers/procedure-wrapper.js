const { getConnection } = require("../../config/database/db-connection");

module.exports = {
    inputs: {
      prc_name: {
        type: 'string',
        required: true,
      },
      prc_params: {
        type: 'ref',
        required: true
      }
    },
  
    fn: async function (inputs, exits) {
      const { prc_name, prc_params } = inputs;

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

      const result_objects = result_call.outBinds.p_refcursor;

      const rows = await result_objects.getRows(); 

      const columns = result_objects.metaData.map(
          (ele) => ele.name
      );

      await result_objects.close(); 

      const final_result = rows.map(row_ele => {
        let current_element = {};
        columns.map((col_ele, idx) => {
          current_element[col_ele] = row_ele[idx];
        })
        return current_element;
      })

      return exits.success(final_result);
    }
  };
  