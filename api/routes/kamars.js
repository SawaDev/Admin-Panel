import express from 'express';
import { createKamar, updateKamar, deleteKamar, getKamar, getKamars, getWarehouse } from '../controllers/kamar.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createKamar);

//UPDATE
router.put("/:id", verifyAdmin, updateKamar);

//DELETE
router.delete("/:id", verifyAdmin, deleteKamar);

//GET
router.get("/find/:id", getKamar);

//GET ALL
router.get("/", getKamars);

//GET STATS ABOUT WAREHOUSE
router.get("/warehouse", getWarehouse);

export default router;