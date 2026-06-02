import Video from "../models/Video.js";
import Channel from "../models/Channel.js";


export const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
    } = req.body;

      if (
        !title ||
        !description ||
        !videoUrl ||
        !thumbnailUrl ||
        !category
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Create a channel first",
      });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel: channel._id,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    const videos = await Video.find(filter)
      .populate("channel")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
    
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (
      !channel ||
      video.channel.toString() !== channel._id.toString()
    ) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (
      !channel ||
      video.channel.toString() !== channel._id.toString()
    ) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.likes += 1;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.dislikes += 1;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getVideosByChannel = async (
  req,
  res
) => {
  try {
    const videos = await Video.find({
      channel: req.params.channelId,
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const increaseViews = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    video.views += 1;

    await video.save();

    res.status(200).json(video);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};