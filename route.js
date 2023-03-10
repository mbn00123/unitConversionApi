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

//Metric
router.route("/metrics")
    .get(metricSvc.gets)
    .post(metricSvc.create)
    .put(metricSvc.update);
router.route("/metrics/:id")
    .get(metricSvc.getByID)
    .delete(metricSvc.destroy);
    router.route("/metrics/convert")
        .post(metricSvc.convert);

//Context
router.route("/contexts")
    .get(contextSvc.gets)
    .post(contextSvc.create)
    .put(contextSvc.update);
router.route("/contexts/:id")
    .get(contextSvc.getByID)
    .delete(contextSvc.destroy);

module.exports = router;