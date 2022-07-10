"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.postTestRouteTwo = exports.postTestRoute = void 0;
const blogcommon_1 = require("@hrioymahmud/blogcommon");
const client_1 = __importDefault(require("../client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const blogcommon_2 = require("@hrioymahmud/blogcommon");
const postTestRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ id: 1, email: "test@gmail.com" }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    req.session = ({ jwt: token });
    res.send("hit the endpoint.");
});
exports.postTestRoute = postTestRoute;
const postTestRouteTwo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("successfull.");
});
exports.postTestRouteTwo = postTestRouteTwo;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        throw new blogcommon_1.BadRequest("Invalid post data.", 500);
    }
    const userData = req.currentUser;
    if (parseInt(userData.id) != author.userId) {
        throw new blogcommon_1.BadRequest("You are not authorized to create this post.");
    }
    //check if the author is in the post db
    let authorAccount;
    authorAccount = yield client_1.default.user.findUnique({
        where: { userId: author.userId }, //make userID to unique
    });
    // if not, create the author
    if (!authorAccount) {
        authorAccount = yield client_1.default.user.create({
            data: {
                userId: parseInt(userData.id),
                email: author.email,
                fullName: author.fullName,
            },
        });
    }
    // create the post
    const newPost = yield client_1.default.post.create({
        data: {
            title,
            content,
            author: {
                connect: {
                    id: authorAccount.id,
                },
            },
        },
        include: {
            author: true
        }
    });
    blogcommon_2.KafkaBus.send(blogcommon_2.KafkaEventType.POST_CREATED, {
        type: blogcommon_2.KafkaEventType.POST_CREATED,
        data: {
            id: newPost.id,
            title: newPost.title,
            content: newPost.content,
            authorId: newPost.author.id,
        },
    });
    // send the post back to the client
    res.status(201).json({ status: "success", post: newPost });
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.id);
    const currentUser = req.currentUser;
    //check if the author is in the post db
    const user = yield client_1.default.user.findUnique({ where: { userId: parseInt(currentUser.id) } });
    //throw an error if the author dosen't exist
    if (!user) {
        throw new blogcommon_1.BadRequest("You are not authorized to update this post.");
    }
    //check if the post exists
    let post;
    post = yield client_1.default.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            author: true
        }
    });
    if (!post) {
        throw new blogcommon_1.BadRequest("Post not found.");
    }
    //throw an error if the post dosen't exist
    //  -------------update the post-----------------
    //updated the title if provided
    if (req.body.title) {
        post = yield client_1.default.post.update({
            where: { id: postId },
            data: { title: req.body.title },
            include: {
                author: true,
            },
        });
    }
    //updated the content if provided
    if (req.body.content) {
        post = yield client_1.default.post.update({
            where: { id: postId },
            data: { content: req.body.content },
            include: {
                author: true,
            },
        });
    }
    blogcommon_2.KafkaBus.send(blogcommon_2.KafkaEventType.POST_UPDATED, {
        type: blogcommon_2.KafkaEventType.POST_UPDATED,
        data: {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.author.id,
        },
    });
    //send the post back to the client
    res.status(200).json({ status: "success", post: post });
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.id);
    //check if the author is in the post db
    const currentUser = req.currentUser;
    //check if the author match with the post author
    const user = yield client_1.default.user.findUnique({ where: { userId: parseInt(currentUser.id) } });
    //throw error if dosent't match or found
    if (!user || user.userId != parseInt(req.currentUser.id)) {
        throw new blogcommon_1.BadRequest("You are not authorized to delete this post.");
    }
    //delete the post
    const post = yield client_1.default.post.delete({
        where: {
            id: postId,
        },
        include: {
            author: true,
        },
    });
    blogcommon_2.KafkaBus.send(blogcommon_2.KafkaEventType.POST_DELETED, {
        type: blogcommon_2.KafkaEventType.POST_DELETED,
        data: {
            id: post.id,
            authorId: post.author.id,
        },
    });
    //send operation status to the client
    res.status(200).json({ status: "Delete successful." });
});
exports.deletePost = deletePost;
