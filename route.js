"use strict";

const express = require("express");
const router = express.Router();

const unitSvc = require('./services/unit.service');
const metricSvc = require('./services/metric.service');
const contextSvc = require('./services/context.service');

//Unit
router.route("/units")
    .get(unitSvc.gets)
    .post(unitSvc.create)
    .put(unitSvc.update);
router.route("/units/:id")
    .get(unitSvc.getByID)
    .delete(unitSvc.destroy);
router.route("/units/convert")
    .post(unitSvc.convert);

//Metric
router.route("/metrics")
    .get(metricSvc.gets)
    .post(metricSvc.create)
    .put(metricSvc.update);
router.route("/metrics/:id")
    .get(metricSvc.getByID)
    .delete(metricSvc.destroy);

//Context
router.route("/contexts")
    .post(metricSvc.create);

module.exports = router;