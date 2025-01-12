const { getConnection } = require("../../../config/database/db-connection");
const oracledb = require("oracledb");

module.exports = {
    inputs: {},

    exits: {},

    fn: async function () {
        const req = this.req;

        const prc_name = 'prc_crud_subject';
        
        const prc_params = {
            p_action: 'READ',
            p_id: req.query.id,
            p_name: req.query.name,
            p_description: req.query.description,
            p_parent_id: req.query.parent_id,
        };

        const result = await sails.helpers.procedureWrapper(prc_name, prc_params, req)

        return result;
    },
};
