// import http from "http"
// import express from "express"
// import dotenv from "dotenv-defaults"
// import mongoose from 'mongoose'
// import WebSocket from "ws"
// import mongo from './mongo'
// import wsConnect from "./wsConnect"


// mongo.connect()

// const app = express()
// const server = http.createServer(app)
// const wss = new WebSocket.Server({ server })
// const db = mongoose.connection

// db.once('open', () =>{
//     console.log("MongoDB connected!")
//     wss.on('connection', (ws) =>{
//         wsConnect.initData(ws)
//         // ws.onmessage = wsConnect.onMessage(wss,ws)
//         ws.onmessage = wsConnect.onMessage(ws)
//     })
// })

// const PORT = process.env.PORT || 4000
// server.listen(PORT, () => {
//     console.log(`MongoDB listening on http://localhost:${PORT}`)
// })



import http from "http"
import express from "express"
import dotenv from "dotenv-defaults"
import mongoose from 'mongoose'
import WebSocket from "ws"
import mongo from './mongo'
import wsConnect from "./wsConnect"
const path = require("path");
const uuid = require("uuid");


mongo.connect()

const app = express()
// const db = mongoose.connection

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: "ChatBox" }],
});

const messageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref: "ChatBox" },
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const UserModel = mongoose.model("User", userSchema);
const ChatBoxModel = mongoose.model("ChatBox", chatBoxSchema);
// const ChatBoxModel = require("../../frontend/src/post.js");
// let PostModel = require("../model/post.js");
const MessageModel = mongoose.model("Message", messageSchema);

const makeName = (name, to) => {
    return [name, to].sort().join("_");
};

const server = http.createServer(app);

const wss = new WebSocket.Server({
    server,
});

app.use(express.static(path.join(__dirname, "public")));

const validateUser = async (name) => {
    const existing = await UserModel.findOne({ name });
    if (existing) return existing;
    return new UserModel({ name }).save();
};

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
    return box
        .populate('users')
        .populate({ path: 'messages', populate: 'sender' })
        .execPopulate();
};

const chatBoxes = {}; 

wss.on("connection", function connection(client) {
    client.id = uuid.v4();
    client.box = ""; // keep track of client's CURRENT chat box

    client.sendEvent = (e) => client.send(JSON.stringify(e));

    client.on("message", async function incoming(message) {
        message = JSON.parse(message);

        const { type } = message;

        switch (type) {
            case "CHAT": {
                const {
                    data: { name, to },
                } = message;

                const chatBoxName = makeName(name, to);

                const sender = await validateUser(name);
                const receiver = await validateUser(to);
                const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

                
                if (chatBoxes[client.box])
                    chatBoxes[client.box].delete(client);

                
                client.box = chatBoxName;
                if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set();
                chatBoxes[chatBoxName].add(client);

                client.sendEvent({
                type: "CHAT",
                data: {
                    messages: chatBox.messages.map(({ sender: { name }, body }) => ({
                    name,
                    body,
                    })),
                },
                });

                break;
            }

            case "MESSAGE": {
                const {
                data: { name, to, body },
                } = message;

                const chatBoxName = makeName(name, to);

                const sender = await validateUser(name);
                const receiver = await validateUser(to);
                const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

                const newMessage = new MessageModel({ sender, body });
                await newMessage.save();

                chatBox.messages.push(newMessage);
                await chatBox.save();

                chatBoxes[chatBoxName].forEach((client) => {
                client.sendEvent({
                    type: "MESSAGE",
                    data: {
                    message: {
                        name,
                        body,
                    },
                    },
                });
                });
            }
        }

        client.once("close", () => {
            chatBoxes[client.box].delete(client);
        });
    });
});

mongo.connect();

server.listen(process.env.PORT || 4000, () => {
    console.log("Server listening on port " + server.address().port);
});
