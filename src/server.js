import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Home"));

const handleListen = () => console.log(`Listening on http://localhost${PORT}`);

app.listen(PORT, handleListen);
