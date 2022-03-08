const request = require("supertest");
const app = require('../app');

describe("server testing", () => {
    describe("Step1: GET requests made by /api/ping", () => {
        test("It should response status 200 on success", async () => {
            const response = await request(app).get("/api/ping")
            expect(response.status).toBe(200);
        });
        test("It should response success: true", async () => {
            const response = await request(app).get("/api/ping")
            expect(response.body).toEqual({ "success": true });
           
        });
        test("It should response status 404 on unsuccessful api call", async () => {
            const response = await request(app).get("/api/pingg")
            expect(response.status).toBe(404);
        });
    });
    describe("Step2: GET requests made by /api/posts", () => {
        test("It should response status 400 api without tag ", async () => {
            const response = await request(app).get("/api/posts")
            expect(response.status).toBe(400);
        });
        test(`It should response error: "Tags parameter is required"`, async () => {
            const response = await request(app).get("/api/posts")
            expect(response.body).toEqual({ error: "Tags parameter is required" });
        });
        test("It should response status 404 for wrong tag", async () => {
            const response = await request(app).get("/api/posts/te")
            expect(response.status).toBe(404);
        });
        test(`It should response error: "error: "Tag parameter is invalid"`, async () => {
            const response = await request(app).get("/api/posts/te")
            expect(response.body).toEqual({ error: "Tag parameter is invalid" });
        });
        test("It should response status 200 on successful tag api", async () => {
            const response = await request(app).get("/api/posts/tech")
            expect(response.status).toBe(200);
        });
        test("It should response an object for correct response", async () => {
            const response = await request(app).get("/api/posts/tech")
            expect(response.body).toEqual(expect.any(Object));
        });
        test("It should response status 200 for complete api with all the three parameters", async () => {
            const response = await request(app).get("/api/posts/tech,history/likes/desc")
            expect(response.status).toBe(200);
        });
        //test if unique ids are printed
        test("It should response body for complete api with all the three parameters and one tag", async () => {
            const response = await request(app).get("/api/posts/tech/likes/desc")
            expect(response.body.posts.length).toEqual(28);
        });
        test("It should response body for complete api with all the three parameters and multiple tags", async () => {
            const response = await request(app).get("/api/posts/tech,history/likes/desc")
            expect(response.body.posts.length).toEqual(46);
        });
        //to test if the posts are sorted
        test("It should response true if sortBy parameter(likes) is used", async () => {
            const response = await request(app).get("/api/posts/tech,history/likes/desc")
            const test = () => {
                let sortedByLikes = response.body.posts
                const lastElementIndex = sortedByLikes.length - 1
                const secondLastElement = sortedByLikes.length - 2
                let i = 0;
                while (sortedByLikes.length >= 2) {
                    if (!(sortedByLikes[0].likes > sortedByLikes[lastElementIndex].likes)) {
                        return false;
                    }
                    sortedByLikes = sortedByLikes.slice(1, secondLastElement)
                    i++;
                    return true
                }
            }
            expect(test()).toBe(true);
        }); 
        //test default list of posts
        test("It should response true for default sortBy id and direction asc", async () => {
            const response = await request(app).get("/api/posts/tech,history")
            const test = () => {
                let sortedByLikes = response.body.posts
                const lastElementIndex = sortedByLikes.length - 1
                const secondLastElement = sortedByLikes.length - 2
                let i = 0;
                while (sortedByLikes.length >= 2) {
                    if (!(sortedByLikes[0].id < sortedByLikes[lastElementIndex].id)) {
                        return false;
                    }
                    sortedByLikes = sortedByLikes.slice(1, secondLastElement)
                    i++;
                    return true
                }
            }
            expect(test()).toBe(true);
        });
        test("It should response status 400 for invalid sortBy", async () => {
            const response = await request(app).get("/api/posts/tech,history/lik/de")
            expect(response.status).toBe(400);
        });
    });
})