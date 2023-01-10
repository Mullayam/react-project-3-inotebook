const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//showng
router.get("/Get/All", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
});
//add new
router.post(
  "/Add/New",
  fetchUser,
  [
    body("title", "title error").isLength({ min: 3 }),
    body("description", "description must be 5 words").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ Error: errors.message });
      }
      const addNew = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await addNew.save();
      res.send(savedNote);
    } catch (error) {
      // res.send(error);
      res.status(500).json({ Error: "Internal Server Error" });
    }
  }
);
//delete note
router.delete("/Delete/Note/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Error 404 Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).res.send("Access Denied");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.send("Note Deleted Successfully");
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

//edit note
router.put(
  "/Update/:id",
  [
    body("title", "title error").isLength({ min: 3 }),
    body("description", "description must be 5 words").isLength({ min: 3 }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Error 404 Not Found");
      } else {
        if (note.user.toString() !== req.user.id) {
          return res.status(401).res.send("Access Denied");
        }
        note = await Note.findByIdAndUpdate(
          req.params.id,
          { $set: newNote },
          { new: true }
        );

        res.send("Note Updated Successfully");
      }
    } catch (error) {
      res.status(500).json({ Error: "Internal Server Error" });
    }
  }
);
module.exports = router;
