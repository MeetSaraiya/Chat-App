import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getUsersForSidebar = async (req, res) => {

    const userId = req.user._id;
    try {
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
            "-password"
        );

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        console.log("------------------------------------------------------------------------------------")
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const filteredMessages = await Message.find({
            $or: [
                { senderId: new ObjectId(userToChatId), receiverId:new  ObjectId(myId) },
                { senderId: new ObjectId(myId), receiverId:new  ObjectId(userToChatId) },
            ],
        }).lean();

        if (!filteredMessages) {
            console.log("No messages found, returning empty array.");
            return res.status(200).json([]);
        }

        console.log("------------------------------------------------------------------------------------")

        res.status(200).json(filteredMessages);
    } catch (error) {
        console.error("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        console.log("text : ",text)
        
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imgUrl = "";
        if(image){
            const uploadedImage = await cloudinary.uploader.upload(image);
            imgUrl = uploadedImage.secure_url
        }
       
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl
        });

        await newMessage.save();

        return res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }

}