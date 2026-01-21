import express from "express";
import db from "../../db.js";

const router = express.Router();

//get  tournament by id 
router.get("/:tournamentId", async (req, res) => {
  const { tournamentId } = req.params;

  const result = await db.query(
    `
   
  SELECT 
  m.id,
  m.round,
  u1.id AS player1_id,
  u1.username AS player1,
  u2.id AS player2_id,
  u2.username AS player2,
  u3.username AS winner

    FROM matches m
    JOIN users u1 ON m.player1_id = u1.id
    JOIN users u2 ON m.player2_id = u2.id
    LEFT JOIN users u3 ON m.winner_id = u3.id
    WHERE m.tournament_id = $1
    ORDER BY m.round, m.id
    `,
    [tournamentId]
  );

  res.json(result.rows);
});



export default router;
