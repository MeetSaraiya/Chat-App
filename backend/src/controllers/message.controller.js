import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary";

export const getUsersForSidebar = async (req, res) => {
    const userId = req.user._id;
    try {
        const filteredUsers = await Message.find({ _id: { $ne: userId } }).select(
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
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const filteredMessages = Message.find({
        $or: [
            { senderId: userToChatId, receiverId: myId },
            { senderId: myId, receiverId: userToChatId },
        ],
        });

        res.status(200).json(filteredMessages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req,res) => {
    try {
        const {text,image} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const uploadedImage = await cloudinary.uploader.upload(image); 
        const imgUrl = uploadedImage.secure_url

        const newMessage = new Message({
            senderId ,
            receiverId ,
            text ,
            image : imgUrl
        });

        await newMessage.save();

    //complete in future from socket

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}