const chai = require('chai');
const request = require('supertest');
const { server } = require('../app');

const { expect } = chai;

describe('CRUD context test', async () => {
    it('Get all contexts', async () => {
        const { body, status } = await request(server).get('/contexts');
        expect(status).to.equal(200);
        expect(body.length).to.equal(4);
    });

    it("Get context by contextID:1", async () => {
        const { body, status } = await request(server).get('/contexts/1');
        expect(status).to.equal(200);
        expect(body).to.deep.equal({
            contextID: 1,
            contextName: 'Area',
            unitID: 1, //acre
            metricID: 1, //m2
            customMetricName: "rai (ไร่)",
            customMetricValue: 2.529
        });
    });

      it("Create new context", async() => {
        const newData = {
            contextName: 'Area',
            unitID: 1, //acre
            metricID: 1, //m2
            customMetricName: "Square Meter",
            customMetricValue: 4046.856422
        };
        let { status } = await request(server).post('/contexts').send(newData);
        expect(status).to.equal(201);

        const res = await request(server).get('/contexts/5');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
            contextID:5,
            contextName: 'Area',
            unitID: 1, //acre
            metricID: 1, //m2
            customMetricName: "Square Meter",
            customMetricValue: 4046.856422
        });
      });

      it("Update context:Square Meter", async() => {
        const updateData = {
            contextID:5,
            contextName: 'Area',
            unitID: 1, //acre
            metricID: 1, //m2
            customMetricName: "Square Meters",
            customMetricValue: 99999.9999
        };
        let { status } = await request(server).put('/contexts').send(updateData);
        expect(status).to.equal(200);

        const res = await request(server).get('/contexts/5');
        expect(res.status).to.equal(200);
        console.log(res.body)
        expect(res.body).to.deep.equal({
            contextID:5,
            contextName: 'Area',
            unitID: 1, //acre
            metricID: 1, //m2
            customMetricName: "Square Meters",
            customMetricValue: 99999.9999
        });
      });

      it("Delete context:Square Meter", async() => {
        let { status } = await request(server).del('/contexts/5');
        expect(status).to.equal(200);

        const res = await request(server).get('/contexts/5');
        expect(res.status).to.equal(404);
      });
});