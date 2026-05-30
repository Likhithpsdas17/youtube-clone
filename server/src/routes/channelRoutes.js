import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { createChannel, getChannelById, getMyChannel } from "../controllers/channelController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createChannel
);

router.get(
  "/my-channel",
  authMiddleware,
  getMyChannel
);

router.get("/:id", getChannelById);

export default router;