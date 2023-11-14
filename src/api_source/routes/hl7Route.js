import express from "express";
import hlrCtrl from "../controller/hl7.controller.js";
const router = express.Router();

router.post("/", hlrCtrl.getFormattedData);

export default router;
