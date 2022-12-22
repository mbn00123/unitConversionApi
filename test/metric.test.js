const chai = require('chai');
const request = require('supertest');
const { server } = require('../app');

const { expect } = chai;

describe('CRUD metric test', async () => {
    it('Get all metrics', async () => {
        const { body, status } = await request(server).get('/metrics');
        expect(status).to.equal(200);
        expect(body.length).to.equal(5);
    });

    it("Get metric by metricID:1", async () => {
        const { body, status } = await request(server).get('/metrics/1');
        expect(status).to.equal(200);
        expect(body).to.deep.equal({
            metricID: 1,
            metricName: 'm2',
            metricValue: 4046.856422,
            unitID: 1,
            Unit: {
                unitID: 1,
                unitName: "acre",
                unitValue: 1
            }
        });
    });

    it("Create new metric", async () => {
        const newData = {
            metricName: 'Rai',
            metricValue: 2.529,
            unitID: 1
        };
        let { status } = await request(server).post('/metrics').send(newData);
        expect(status).to.equal(201);

        const res = await request(server).get('/metrics/6');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
            metricID: 6,
            metricName: 'Rai',
            metricValue: 2.529,
            unitID: 1,
            Unit: {
                unitID: 1,
                unitName: "acre",
                unitValue: 1
            }
        });
    });

    it("Update metric:Rai", async () => {
        const updateData = {
            metricID: 6,
            metricName: 'Rai (ไร่)',
            metricValue: 2.529,
            unitID: 1
        };
        let { status } = await request(server).put('/metrics').send(updateData);
        expect(status).to.equal(200);

        const res = await request(server).get('/metrics/6');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
            metricID: 6,
            metricName: 'Rai (ไร่)',
            metricValue: 2.529,
            unitID: 1,
            Unit: {
                unitID: 1,
                unitName: "acre",
                unitValue: 1
            }
        });
    });

    it("Delete metric:Rai", async () => {
        let { status } = await request(server).del('/metrics/6');
        expect(status).to.equal(200);

        const res = await request(server).get('/metrics/6');
        expect(res.status).to.equal(404);
    });
});

describe('Convert metric test', async () => {
    it("Convert from 1 meter/second to kilomater/second", async () => {
        let res = await request(server).post('/metrics/convert').send({
            fromMetricID: 4,
            fromMetricQty: 1,
            toMetricID: 5
        });
        expect(res.status).to.equal(200);
        expect(res.body.toValue).to.equal(0.0009999105);
    });

    it("Convert from 2 meter/second to kilomater/second", async () => {
        let res = await request(server).post('/metrics/convert').send({
            fromMetricID: 4,
            fromMetricQty: 2,
            toMetricID: 5
        });
        expect(res.status).to.equal(200);
        expect(res.body.toValue).to.equal(0.0019998210);
    });

    it("Convert from 1 kilomater/second to meter/second", async () => {
        let res = await request(server).post('/metrics/convert').send({
            fromMetricID: 5,
            fromMetricQty: 1,
            toMetricID: 4
        });
        expect(res.status).to.equal(200);
        expect(res.body.toValue).to.equal(1000.0894854586);
    });

    it("Convert from 5 kilomater/second to meter/second", async () => {
        let res = await request(server).post('/metrics/convert').send({
            fromMetricID: 5,
            fromMetricQty: 5,
            toMetricID: 4
        });
        expect(res.status).to.equal(200);
        expect(res.body.toValue).to.equal(5000.4474272931);
    });

    it("Convert with incorrect unit", async () => {
        let res = await request(server).post('/metrics/convert').send({
            fromMetricID: 1,
            fromMetricQty: 5,
            toMetricID: 5
        });
        expect(res.status).to.equal(500);
    });
})