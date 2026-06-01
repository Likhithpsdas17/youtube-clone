import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createVideo, 
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getVideosByChannel,
  increaseViews
} from "../controllers/videoController.js";

const router = express.Router();
router.post("/",authMiddleware,createVideo,);
router.get("/", getAllVideos);
router.get("/channel/:channelId", getVideosByChannel);
router.get("/:id", getVideoById);
router.put("/:id",authMiddleware,updateVideo);
router.delete("/:id",authMiddleware,deleteVideo);
router.put("/:id/like", likeVideo);
router.put("/:id/dislike", dislikeVideo);
router.put("/:id/view", increaseViews);

export default router;