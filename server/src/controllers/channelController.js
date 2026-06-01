import Channel from "../models/Channel.js";
import User from "../models/User.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, banner } = req.body;

    const existingChannel = await Channel.findOne({
      owner: req.user._id,
    });

    if (existingChannel) {
      return res.status(400).json({
        message: "Channel already exists",
      });
    }

    const channel = await Channel.create({
      channelName,
      description,
      banner,
      owner: req.user._id,
    });

    await User.findByIdAndUpdate(
      req.user._id,
      {
        channel: channel._id,
      }
    );

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(
      req.params.id
    ).populate("owner", "username email");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "No channel found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    const updatedChannel =
      await Channel.findByIdAndUpdate(
        channel._id,
        req.body,
        { new: true }
      );

    res.status(200).json(updatedChannel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};