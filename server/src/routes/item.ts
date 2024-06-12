import express from "express";
import multer from "multer";
import { addItem, deleteItem, getItem, getItems } from "../controllers/item";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const itemStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./src/uploads"),
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4();
    const fileExtension = file.originalname.split(".").pop();
    const filename = `${uniqueFilename}.${fileExtension}`;
    cb(null, filename);
  },
});

const itemUpload = multer({ storage: itemStorage });

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/add", itemUpload.single("file"), addItem);
router.delete("/:id", deleteItem);

export default router;
