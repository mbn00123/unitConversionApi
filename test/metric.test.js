const chai = require('chai');
const request = require('supertest');
const { server } = require('../app');

const { expect } = chai;

describe('CRUD metric test', async () => {
    it('Get all metrics', async () => {
        const { body, status } = await request(server).get('/metrics');
        expect(status).to.equal(200);
        expect(body.length).to.equal(4);
    });

    it("Get metric by metricID:1", async () => {
        const { body, status } = await request(server).get('/metrics/1');
        expect(status).to.equal(200);
        expect(body).to.deep.equal({
            metricID: 1,
            metricName: 'm2',
            metricValue: 4046.856422,
            unitID: 1
        });
    });

      it("Create new metric", async() => {
        const newUnit = {
            metricName: 'Rai',
            metricValue: 2.529,
            unitID: 1
        };
        let { status } = await request(server).post('/metrics').send(newUnit);
        expect(status).to.equal(201);

        const res = await request(server).get('/metrics/5');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
            metricID: 5,
            metricName: 'Rai',
            metricValue: 2.529,
            unitID: 1
        });
      });

      it("Update metric:Rai", async() => {
        const updateUnit = {
            metricID: 5,
            metricName: 'Rai (ไร่)',
            metricValue: 2.529,
            unitID: 1
        };
        let { status } = await request(server).put('/metrics').send(updateUnit);
        expect(status).to.equal(200);

        const res = await request(server).get('/metrics/5');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
            metricID: 5,
            metricName: 'Rai (ไร่)',
            metricValue: 2.529,
            unitID: 1
        });
      });

      it("Delete metric:Rai", async() => {
        let { status } = await request(server).del('/metrics/5');
        expect(status).to.equal(200);

        const res = await request(server).get('/metrics/5');
        expect(res.status).to.equal(404);
      });
});