module.exports = {
    inputs: {},

    exits: {},

    fn: async function () {
        const req = this.req;

        const prc_name = "prc_crud_subject";

        const prc_params = {
            p_action: "DELETE",
            p_id: req.query.id,
            p_name: '',
            p_description: '',
            p_parent_id: '',
        };

        const result = await sails.helpers.procedureWrapper(
            prc_name,
            prc_params,
            req
        );

        return result;
    },
};
