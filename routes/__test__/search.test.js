const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe("/search/suburbs", () => {
  it("Get json response from endpoint", async () => {
    const response = await request(app).get("/search/suburbs").send();

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Suburbs have the required fields", async () => {
    const response = await request(app).get("/search/suburbs").send();

    expect(response._body[0].name).toBeDefined();
    expect(response._body[0].state).toBeDefined();
    expect(response._body[0].postcode).toBeDefined();
  });
});

describe("/search/addresses", () => {
  it("Get json response from endpoint", async () => {
    const response = await request(app).get("/search/addresses").send();

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Addresses have the required fields", async () => {
    const response = await request(app).get("/search/addresses").send();

    expect(response._body[0].streetName).toBeDefined();
    expect(response._body[0].streetNumber).toBeDefined();
    expect(response._body[0].suburb).toBeDefined();
    expect(response._body[0].suburb.name).toBeDefined();
    expect(response._body[0].suburb.state).toBeDefined();
    expect(response._body[0].suburb.postcode).toBeDefined();
  });
});

describe("/search/properties", () => {
  it("Get json response from endpoint", async () => {
    const response = await request(app).get("/search/properties").send();

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Properties have the required fields", async () => {
    const response = await request(app).get("/search/properties").send();

    expect(response._body[0].agent).toBeDefined();
    expect(response._body[0].agent.name).toBeDefined();
    expect(response._body[0].agent.phoneNumber).toBeDefined();
    expect(response._body[0].description).toBeDefined();
    expect(response._body[0].description.title).toBeDefined();
    expect(response._body[0].description.content).toBeDefined();

    expect(response._body[0].address).toBeDefined();
    expect(response._body[0].address.streetName).toBeDefined();
    expect(response._body[0].address.streetNumber).toBeDefined();
    expect(response._body[0].address.suburb).toBeDefined();
    expect(response._body[0].address.suburb.name).toBeDefined();
    expect(response._body[0].address.suburb.state).toBeDefined();
    expect(response._body[0].address.suburb.postcode).toBeDefined();

    expect(response._body[0].propertyType).toBeDefined();
    expect(response._body[0].listingType).toBeDefined();
    expect(response._body[0].price).toBeDefined();
  });
});

describe("/search/properties/suburb/{suburbName}", () => {
  it("Get json response from endpoint", async () => {
    const suburbName = "Box Hill";
    const response = await request(app)
      .get(`/search/properties/suburb/${suburbName}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("invalid suburb name gives 404", async () => {
    let suburbName = "rubbishsuburb123";
    const response = await request(app)
      .get(`/search/properties/suburb/${suburbName}`)
      .send();
    expect(response.statusCode).toEqual(404);
  });
});

describe("/search/property/{id}", () => {
  it("Get json response from endpoint when using valid id", async () => {
    let id = await request(app).get("/search/properties").send();
    const response = await request(app)
      .get(`/search/property/${id._body[0]._id}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("invalid id gives 404", async () => {
    let id = "rubbishid123";
    const response = await request(app).get(`/search/property/${id}`).send();
    expect(response.statusCode).toEqual(404);
  });
});

describe("/search", () => {
  it("Get json response from endpoint when using valid query", async () => {
    let id = await request(app).get("/search").send();
    const response = await request(app)
      .get("/search")
      .query({
        searchType: "Buy",
        suburbName: "Box Hill",
        propertyType: "Any",
        priceMin: 0,
        priceMax: 0,
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Get 404 response from endpoint when using invalid query", async () => {
    let id = await request(app).get("/search").send();
    const response = await request(app)
      .get("/search")
      .query({
        searchType: "ahsdasdi",
        suburbName: "12321x",
        priceMin: 0,
        priceMax: 0,
      })
      .send();

    expect(response.statusCode).toEqual(404);
  });
});
