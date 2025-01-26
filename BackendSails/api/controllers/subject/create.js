module.exports = {
    inputs: {},

    exits: {},

    fn: async function () {
        const req = this.req;

        const prc_name = "prc_crud_subject";

        const prc_params = {
            p_action: "CREATE",
            p_id: '',
            p_name: req.body.name,
            p_description: req.body.description,
            p_parent_id: req.body.parent_id,
        };

        const result = await sails.helpers.procedureWrapper(
            prc_name,
            prc_params,
            req
        );

        return result;
    },
};
