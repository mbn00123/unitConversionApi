const chai = require('chai');
const request = require('supertest');
const { server } = require('../app');

const { expect } = chai;

describe('CRUD unit test', async () => {
  it('Get all units', async () => {
    const { body, status } = await request(server).get('/units');
    expect(status).to.equal(200);
    expect(body.length).to.equal(4);
  });

  it("Get unit by unitID:1", async () => {
    const { body, status } = await request(server).get('/units/1');
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ unitID: 1, unitName: 'acre', unitValue: 1 });
  });

  it("Create new unit", async() => {
    const newUnit = {
      unitName: "Kilo",
      unitValue: 1
    };
    let { status } = await request(server).post('/units').send(newUnit);
    expect(status).to.equal(201);

    const res = await request(server).get('/units/5');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ unitID: 5, unitName: 'Kilo', unitValue: 1 });
  });

  it("Update unit:Kilo", async() => {
    const updateUnit = {
      unitID: 5,
      unitName: "kilogram",
      unitValue: 2
    };
    let { status } = await request(server).put('/units').send(updateUnit);
    expect(status).to.equal(200);

    const res = await request(server).get('/units/5');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ unitID: 5, unitName: 'kilogram', unitValue: 2 });
  });

  it("Delete unit:Kilo", async() => {
    let { status } = await request(server).del('/units/5');
    expect(status).to.equal(200);

    const res = await request(server).get('/units/5');
    expect(res.status).to.equal(404);
  });
});