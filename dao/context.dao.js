'use strict';
const models = require("../models");

module.exports = {
    gets,
    getByID,
    create,
    update,
    destroy
}

async function gets() {
    try {
        const results = await models.Context.findAll({
            order: [
                ['unitName', 'asc']
            ],
        });
        return results;
    } catch (error) {
        throw error;
    }
}

async function getByID(id) {
    try {
        const results = await models.Context.findByPk(id);
        return results;
    } catch (error) {
        throw error;
    }
}

async function create(data, transaction) {
    try {
        await models.Context.create(data, { transaction });
    } catch (error) {
        throw error;
    }
}

async function update(data, id, transaction) {
    try {
        await models.Context.update(data, {
            where: {
                metricId: {
                    $eq: id
                }
            }, transaction
        });
    } catch (error) {
        throw error;
    }
}

async function destroy(id, transaction) {
    try {
        await models.Context.destroy(id, {
            where: {
                metricId: {
                    $eq: id
                }
            }, transaction
        })
    } catch (error) {
        throw error;
    }
}