"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("express-async-errors");
const body_parser_1 = require("body-parser");
// import { errorHandler } from './middlewares/errorHandler'
// import { createBullBoard } from "@bull-board/api"
// import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
// import { ExpressAdapter } from "@bull-board/express"
// import { NotFound } from './errors/notFound'
const blogcommon_1 = require("@hrioymahmud/blogcommon");
const posts_route_1 = require("./routes/posts-route");
// import { Queue, Worker } from "bullmq"
const app = (0, express_1.default)();
exports.app = app;
//this check is to catch the unexpected uncaught errors while responding to the pending request.
process.on("uncaughtException", (err) => {
    console.log("uncaughtException Error... System will terminate soon");
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});
// const serverAdapter = new ExpressAdapter()
// serverAdapter.setBasePath("/api/v1/posts/ui")
app.set("trust proxy", true);
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
    maxAge: 24 * 60 * 60 * 1000, //this is one day.
})); // to parser the cookie
app.use((0, morgan_1.default)("dev")); //to log the request in the console.
// const myQueue = new Queue("test")
// async function addJobs() {
//   await myQueue.add("testOne", { foo: "bar" })
//   await myQueue.add("testTwo", { qux: "baz" })
// }
// const worker = new Worker('test', async (job) => {
//   // Will print { foo: 'bar'} for the first job
//   // and { qux: 'baz' } for the second.
//   console.log(job.data)
// })
// worker.on("completed", (job) => {
//   console.log(`${job.id} has completed!`)
// })
// worker.on("failed", (job, err) => {
//   console.log(`${job.id} has failed with ${err.message}`)
// })
// const callFunc = async ()=> {
// await addJobs()
// } 
// callFunc()
// createBullBoard({
//   queues: [new BullMQAdapter(new Queue("test"))],
//   serverAdapter,
// })
app.use("/api/v1/posts", posts_route_1.PostRouter); //auth router is used to create user account and  other controls.
// app.use("/api/v1/posts/ui", serverAdapter.getRouter())
app.all("*", (req, res) => {
    throw new blogcommon_1.NotFound("Route not found.");
}); //this is used to catch the error if the route is not found.
app.use(blogcommon_1.errorHandler); //this is a error handler middleware.
