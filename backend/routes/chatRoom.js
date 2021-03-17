const router = require("express").Router();
const ChatRoom = require("../models/chatRoom.model");
const User = require("../models/user.model");
const { json } = require("body-parser");
const jwtVerify = require("../JWT/JWT_Verify");

router.route("/").get((req, res) => {
    ChatRoom.find()
        .then((rooms) => res.json(rooms))
        .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/create").post(async (req, res) => {
    try {
        const { token, roomName } = req.body;
        if (!roomName || roomName === "") {
            throw new Error("Not valid room name.");
        }
        const id = jwtVerify(token);
        const user = await User.findById(id);
        const newRoom = new ChatRoom({
            name: roomName,
            users: [
                {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            ],
        });
        const room = await newRoom.save();
        user.chatRooms.unshift(room.id);
        await user.save();
        res.json("New room added !!!");
    } catch (err) {
        console.log("Add room error: ", err.message);
        res.status(400).json(err.message);
    }
});

router.route("/join").put(async (req, res) => {
    try {
        const { roomID, token } = req.body;
        const id = jwtVerify(token);
        if (!id) {
            return res.status(400).json("Invalid token");
        }
        let room = await ChatRoom.findById(roomID);
        if (!room) {
            throw new Error("Room not found")
        }
        if (room.isPrivate) {
            throw new Error("Can't join a private room");
        }
        let user = await User.findById(id);
        let idx = room.users.findIndex((item) => item.id === id);
        if (idx === -1) {
            room.users.unshift({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            });
            await room.save();
            user.chatRooms.push(roomID);
            await user.save();
            res.json("Joined the room !!!");
        } else {
            res.json("Already joined the room !!!");
        }
    } catch (err) {
        console.log("Join room error: ", err.message);
        res.status(400).json(err.message);
    }
});

router.route("/chatWith").post(async (req, res) => {
    try {
        const { token, email } = req.body;
        const id = jwtVerify(token);
        if (!id) {
            return res.status(400).json("Invalid token");
        }

        let user = await User.findById(id);
        let recipient = await User.findOne({ email });
        if (!recipient) {
            throw new Error('User not existed.')
        }
        const idList = [user.id, recipient.id];
        let room = await ChatRoom.findOne({
            "users.id": { $all: idList },
            isPrivate: true,
        });

        if (room) {
            user.chatRooms.unshift(room.id);
            await user.save();
        } else {
            const newPrivateRoom = new ChatRoom({
                name: recipient.email,
                isPrivate: true,
                users: [
                    {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    {
                        id: recipient.id,
                        email: recipient.email,
                        firstName: recipient.firstName,
                        lastName: recipient.lastName,
                    },
                ],
            });
            await newPrivateRoom.save();
            user.chatRooms.unshift(newPrivateRoom.id);
            await user.save();
        }
        res.json("Private room created !!!");
    } catch (err) {
        console.log("Private message failed: ", err.message);
        res.status(400).json(err.message);
    }
});

router.route("/leave").put(async (req, res) => {
    try {
        const { roomID, token } = req.body;
        const id = jwtVerify(token);
        const user = await User.findById(id);
        const room = await ChatRoom.findById(roomID);
        user.chatRooms = user.chatRooms.filter((item) => item !== roomID);
        if (!room) {
            throw new Error("Room not found");
        }
        if (!room.isPrivate) {
            room.users = room.users.filter((item) => item.id !== id);
            if (room.users.length === 0) {
                await ChatRoom.findByIdAndDelete(roomID);
            } else {
                await room.save();
            }
        }
        await user.save();
        res.json("Leave room successfully !!!");
    } catch (err) {
        console.log("Leave room error: ", err.message);
        res.status(400).json(err.message);
    }
});

router.route("/new-message").put(async (req, res) => {
    try {
        const { token, message, roomID } = req.body;
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
        res.json("New message sent!!!");
    } catch (err) {
        console.log("New message error: ", err.message);
        res.status(400).json(err.message);
    }
});

router.route("/get-room-list").put(async (req, res) => {
    try {
        const id = jwtVerify(req.body.token);
        const user = await User.findById(id);
        const rooms = await ChatRoom.find()
            .where("_id")
            .in(user.chatRooms)
            .sort({ updatedAt: -1 })
            .exec();
        res.json(rooms);
    } catch (err) {
        console.log("Get room error: ", err.message);
        res.status(400).json(err.message);
    }
});

module.exports = router;
