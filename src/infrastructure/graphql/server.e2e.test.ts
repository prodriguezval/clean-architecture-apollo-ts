import { app, main, server } from "infrastructure/graphql/server";
import request from "supertest";
import { Product } from "product/domain/entity/Product";

describe("Server test", () => {
  beforeAll(async () => {
    await main();
  });
  describe("Products Operations", () => {
    it("when the products query is executed, an array of products should be returned", async () => {
      const expectedProducts = [
        { id: "1", name: "Rice", quantity: 5 },
        { id: "2", name: "Diapers", quantity: 5 },
        { id: "3", name: "Orange", quantity: 5 },
      ];
      const productQueryBody = {
        query: `
        query {
          products {
              id
              name
              quantity
          } 
      }`,
      };

      await request(app.server)
        .post("/graphql")
        .send(productQueryBody)
        .expect(200)
        .expect((response) => {
          const products: Product[] = response.body.data.products;

          expect(products).toHaveLength(3);
          expect(products[0]).toMatchObject(expectedProducts[0]);
          expect(products[1]).toMatchObject(expectedProducts[1]);
          expect(products[2]).toMatchObject(expectedProducts[2]);
        });
    });
  });

  describe("User Operations", () => {
    const expectedUser = { id: "1", name: "Nova", address: "El peumo" };
    const userQueryBody = {
      query: `
        query {
          user(id: "1") {
            id
            name
            address
          } 
        }`,
    };
    it("when the user query is executed without cookie and token, an error should occur", async () => {
      await request(app.server)
        .post("/graphql")
        .send(userQueryBody)
        .expect(400)
        .expect((res) => {
          const { errors } = res.body;
          expect(errors[0].message).toEqual("UNAUTHORIZED");
        });
    });

    it("when the user query is executed with cookie and token, the user data should be returned", async () => {
      await request(app.server)
        .post("/graphql")
        .set({ authorization: "Bearer 1234" })
        .set("Cookie", "country=cl")
        .send(userQueryBody)
        .expect((res) => {
          const user = res.body.data.user;
          expect(user).toMatchObject(expectedUser);
        });
    });
    it("when the user query is executed only with token, the user data should be returned", async () => {
      await request(app.server)
        .post("/graphql")
        .set({ authorization: "Bearer 1234" })
        .send(userQueryBody)
        .expect((res) => {
          const user = res.body.data.user;
          expect(user).toMatchObject(expectedUser);
        });
    });
  });

  afterAll(async () => {
    await server.stop();
    await app.close();
  });
});
