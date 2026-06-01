import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { createChannel, getChannelById, getMyChannel, updateChannel } from "../controllers/channelController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createChannel,
);

router.get(
  "/my-channel",
  authMiddleware,
  getMyChannel
);

router.get("/:id", getChannelById);

router.put(
  "/",
  authMiddleware,
  updateChannel
);

export default router;