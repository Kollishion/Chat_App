import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsersForSidebar,
  addContact,
  uploadContacts,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.post("/addContact", protectRoute, addContact);
router.post("/uploadContacts", protectRoute, uploadContacts);

export default router;
