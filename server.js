import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";


import playerProfileRoutes from "./routes/player/profile.js";
import playerTournamentsRoutes from "./routes/player/tournaments.js";
import playerRequestsRoutes from "./routes/player/requests.js";
import playerMatchesRoutes from "./routes/player/matches.js";


import adminTournamentsRoutes from "./routes/admin/tournaments.js";
import adminRequestsRoutes from "./routes/admin/requests.js";
import adminMatchesRoutes from "./routes/admin/matches.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);


app.use("/api/player/profile", playerProfileRoutes);
app.use("/api/player/tournaments", playerTournamentsRoutes);
app.use("/api/player/requests", playerRequestsRoutes);
app.use("/api/player/matches", playerMatchesRoutes);

// admin
app.use("/api/admin/tournaments", adminTournamentsRoutes);
app.use("/api/admin/requests", adminRequestsRoutes);
app.use("/api/admin/matches", adminMatchesRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
