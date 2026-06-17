import { Router } from "express";
import { villeController as controller } from "../controllers/villes.controller.js";

const router = Router();

router.get("/", controller.listerVilles);

export default router;