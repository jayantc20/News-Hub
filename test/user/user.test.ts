//TODO: Add tests for user routes

// import tap from "tap";
// import express from "express";
// import request from "supertest";
// import userRoutes from "../../src/routes/userRoutes";

// const app = express();
// app.use(express.json());
// app.use("/user", userRoutes);

// tap.test("POST /user/register - success", async (t) => {
//   const res = await request(app)
//     .post("/api/v1/user/register")
//     .send({ id: 1,  username: "test", password: "test" });

//   t.equal(res.status, 201);
//   t.equal(res.body.id, 1);
//   t.equal(res.body.username, "test");
// });
