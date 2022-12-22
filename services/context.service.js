'use strict';

const db = require('../models').sequelize;
const contextDao = require('../dao/context.dao');

module.exports = {
    gets,
    getByID,
    create,
    update,
    destroy
}

async function gets(req, res) {
    try {

        const results = await contextDao.gets();

        return res.status(200).send(results);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const result = await contextDao.getByID(id);
        if (result) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send();
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}

async function create(req, res) {
    const transaction = await db.transaction();
    try {

        const data = req.body
        await contextDao.create(data, transaction)

        await transaction.commit();
        return res.status(201).send(true);
    } catch (e) {
        console.error(e);
        await transaction.rollback();
        return res.status(500).send(e.message);
    }
}

async function update(req, res) {
    const transaction = await db.transaction();
    try {

        const data = req.body

        await contextDao.update({
            contextName: data.contextName,
            unitID: data.unitID,
            metricID: data.metricID,
            customMetricName: data.customMetricName,
            customMetricValue: data.customMetricValue,
        }, data.contextID, transaction);

        await transaction.commit();
        return res.status(200).send();
    } catch (e) {
        console.error(e);
        await transaction.rollback();
        return res.status(500).send(e.message);
    }
}

async function destroy(req, res) {
    const transaction = await db.transaction();
    try {

        const id = req.params.id;
        await contextDao.destroy(id, transaction)

        await transaction.commit();
        return res.status(200).send();
    } catch (e) {
        console.error(e);
        await transaction.rollback();
        return res.status(500).send(e.message);
    }
}