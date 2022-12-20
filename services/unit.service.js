'use strict';

const db = require('../models').sequelize;
const unitDao = require('../dao/unit.dao');

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

        const results = await unitDao.gets();

        return res.status(200).send(results);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const result = await unitDao.getByID(id);
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

        const data = req.body;
        await unitDao.create(data, transaction)

        await transaction.commit();
        return res.status(201).send();
    } catch (e) {
        console.error(e);
        await transaction.rollback();
        return res.status(500).send(e.message);
    }
}

async function update(req, res) {
    const transaction = await db.transaction();
    try {

        const data = req.body;

        await unitDao.update({
            unitName: data.unitName,
            unitValue: data.unitValue
        }, data.unitID, transaction)

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
        await unitDao.destroy(id, transaction)

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

        //     const {
        //         fromUnitID,
        //         fromUnitQty,
        //         toUnitID
        //     } = req.body;

        //   const fromUnit = await unitDao.getByID(fromUnitID);
        //   const toUnit = await unitDao.getByID(toUnitID);
        //   const toUnitValue = fromUnit.unitValue;

        //     return res.status(200).send({
        //         fromUnitID,
        //         fromUnitQty,
        //         toUnitID,
        //         toUnitValue
        //     });
        return res.status(200).send();
    } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
    }
}