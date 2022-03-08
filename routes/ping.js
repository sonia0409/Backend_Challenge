const express = require('express');

const router = express.Router();

module.exports = () => {
    router.get("/", (req, res) => {
        return res.status(200).json({ success: true });
    });
    return router;
}