const express = require("express");
const router = express.Router();
const { getIO } = require("../utils/io.utils");

let todos = [
    { id: 1, text: "DECI - First Task", completed: true },
    { id: 2, text: "DECI - Second Task", completed: false }
];

router.get("/", (req, res) => {
    res.json(todos);
});

router.post("/", (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };

    todos.push(newTodo);

    getIO().emit("sync:add", newTodo);

    res.json({ success: true });
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ error: "Item not found" });
    }

    todo.completed = !todo.completed;

    getIO().emit("sync:update", todo);

    res.json({ success: true });
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const lengthBefore = todos.length;

    todos = todos.filter(t => t.id !== id);

    if (lengthBefore === todos.length) {
        return res.status(404).json({ error: "Item not found" });
    }

    getIO().emit("sync:delete", id);

    res.json({ success: true });
});

module.exports = router;