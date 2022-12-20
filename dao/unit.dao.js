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
        const results = await models.Unit.findAll({
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
        const results = await models.Unit.findByPk(id);
        return results;
    } catch (error) {
        throw error;
    }
}

async function create(data, transaction) {
    try {
        await models.Unit.create(data, { transaction });
    } catch (error) {
        throw error;
    }
}

async function update(data, id, transaction) {
    try {
        await models.Unit.update(data, {
            where: {
                unitID: {
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
        await models.Unit.destroy({
            where: {
                unitID: {
                    $eq: id
                }
            }, transaction
        })
    } catch (error) {
        throw error;
    }
}