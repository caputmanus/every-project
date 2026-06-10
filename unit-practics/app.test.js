const request = require("supertest"); // Обычно называют request
const app = require("./app");

describe("API test", () => {
    test("Get request 200?", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Есть апишка");
    });
});
