'use strict';

const db = require('../models').sequelize;
const metricDao = require('../dao/metric.dao');

module.exports = {
    gets,
    getByID,
    create,
    update,
    destroy,
    convert
}

async function gets(req, res) {
    try {

        const results = await metricDao.gets();

        return res.status(200).send(results);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const result = await metricDao.getByID(id);
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
        await metricDao.create(data, transaction)

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

        await metricDao.update({
            metricName: data.metricName,
            metricValue: data.metricValue
        }, data.metricID, transaction)

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
        await metricDao.destroy(id, transaction)

        await transaction.commit();
        return res.status(200).send();
    } catch (e) {
        console.error(e);
        await transaction.rollback();
        return res.status(500).send(e.message);
    }
}


async function convert(req, res) {
    try {

        const {
            fromMetricID,
            fromMetricQty,
            toMetricID
        } = req.body;

        const fromMetric = await metricDao.getByID(fromMetricID);
        const toMetric = await metricDao.getByID(toMetricID);

        if (fromMetric.unitID != toMetric.unitID) {
            throw new Error("Imperial doesn't match!!");
        }

        const fromUnitValue = ((fromMetric.Unit.unitValue * fromMetricQty) / fromMetric.metricValue).toFixed(10);
        const toUnitValue = (fromUnitValue * toMetric.metricValue).toFixed(10);

        return res.status(200).send({
            fromMetricID,
            fromMetricQty,
            toMetricID,
            toValue: +toUnitValue
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}