import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

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

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const comment = await Comment.create({
      text,
      user: req.user._id,
      video: videoId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCommentsByVideo = async (
  req,
  res
) => {
  try {
    const comments = await Comment.find({
      video: req.params.videoId,
    }).populate("user", "username avatar");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateComment = async (
  req,
  res
) => {
  try {
    const comment = await Comment.findById(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    comment.text = req.body.text;

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComment = async (
  req,
  res
) => {
  try {
    const comment = await Comment.findById(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await Comment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};