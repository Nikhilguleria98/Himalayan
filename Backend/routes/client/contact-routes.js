import express from "express";
import {
  submitContactForm,
  getAllContactMessages,
} from "../../controllers/client/contact-controller.js";

const router = express.Router();

// Submit contact form (public)
router.post("/send", submitContactForm);

// Get all contact messages (admin)
router.get("/all", getAllContactMessages);

export default router;
