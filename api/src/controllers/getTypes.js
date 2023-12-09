const axios = require('axios');
const { Types } = require('../db');
const { URL_API_TYPES } = process.env

const getTypes = async (req, res, next) => {
    try {
        const allTypes = await Types.findAll();

        if (allTypes.length === 0) {
            try {
                const response = await axios(URL_API_TYPES);
                const listTypes = response.data.results.map((t) => ({
                    name: t.name
                }));

                await Types.bulkCreate(listTypes);
                res.status(200).json(listTypes);
            } catch (error) {
                next(error);
            }
        } else {
            console.log('Types have already been established');
            res.status(200).json(allTypes);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getTypes
}