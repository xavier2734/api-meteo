import { Router } from "express";
import { releveController as controller } from "../controllers/releves.controller.js";

const router = Router();

router.get("/", controller.listerReleves);
router.get("/:id", controller.getUnReleve);
router.post("/", controller.postUnReleve);
router.delete("/:id", controller.deleteUnReleve);

export default router;