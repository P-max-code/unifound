import { Request, Response } from "express";
import { Item } from "../models/item";

export const addItem = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const data = req.body;
    if (!file) return res.status(400).json({ message: "File is required." });

    const { filename, path } = file;
    const itemWithFile = new Item({
      ...data,
      fileId: filename,
      file: {
        filename,
        path,
      },
    });
    const savedItem = await itemWithFile.save();
    return res.status(200).json(savedItem);
  } catch (error) {
    console.error("Error adding item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      secret: req.body.secret,
    });
    if (!item) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "Item deleted successfully", item });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const category = req.query.category;
    if (!category || (category !== "LOST" && category !== "FOUND"))
      return res.status(400).json({ message: "Invalid category provided" });

    const items = await Item.find({ category });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching lost items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
