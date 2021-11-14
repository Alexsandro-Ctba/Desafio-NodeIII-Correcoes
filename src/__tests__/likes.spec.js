const request = require("supertest");
const app = require("../");

describe("Likes", () => {
  it("deve ser capaz de dar um like no repositório", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    let response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 1
    });

    response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 2
    });
  });

  it("não deve ser capaz de dar um like a um repositório não existente", async () => {
    await request(app)
      .post(`/repositories/123/like`)
      .expect(404);
  });
});
