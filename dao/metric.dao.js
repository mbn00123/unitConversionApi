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
        const results = await models.Metric.findAll({
            order: [
                ['metricName', 'asc']
            ],
        });
        return results;
    } catch (error) {
        throw error;
    }
}

async function getByID(id) {
    try {
        const results = await models.Metric.findByPk(id);
        return results;
    } catch (error) {
        throw error;
    }
}

async function create(data, transaction) {
    try {
        await models.Metric.create(data, { transaction });
    } catch (error) {
        throw error;
    }
}

async function update(data, id, transaction) {
    try {
        await models.Metric.update(data, {
            where: {
                metricID: {
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
        await models.Metric.destroy({
            where: {
                metricID: {
                    $eq: id
                }
            }, transaction
        })
    } catch (error) {
        throw error;
    }
}