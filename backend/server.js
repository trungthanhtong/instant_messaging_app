const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ChatRoom = require("./models/chatRoom.model");
const User = require("./models/user.model");
const jwtVerify = require("./JWT/JWT_Verify");

require("dotenv").config();

const app = express();
const port = 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully!!!");
});

app.use(cors());
app.use(express.json());

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.on("send-message", async ({ token, roomID, message }) => {
        try {
            if (!message || message.trim() === "") {
                throw new Error("Invalid message");
            }
            const id = jwtVerify(token);
            const user = await User.findById(id);
            const room = await ChatRoom.findById(roomID);
            room.messages.push({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                message,
            });
            await room.save();
            if (room.isPrivate) {
              let {id: recipientID} = room.users.find(item => item.id !== id);
              let recipient = await User.findById(recipientID);
              let idx = recipient.chatRooms.findIndex(item => item.id === room.id);
              if (idx === -1) {
                recipient.chatRooms.push(room.id);
                await recipient.save();
              }
            }
            io.emit("receive-message", room.messages[room.messages.length - 1]);
        } catch (err) {
            console.log("New message error: ", err.message);
            res.status(400).json(err.message);
        }
    });
});

const usersRouter = require("./routes/users");
const chatRoomRouter = require("./routes/chatRoom");

app.use("/users", usersRouter);
app.use("/chatrooms", chatRoomRouter);

http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
