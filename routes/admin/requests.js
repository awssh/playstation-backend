import express from "express";
import db from "../../db.js";
import adminAuth from "../../middleware/adminAuth.js";

const router = express.Router();


router.get("/pending/:tournamentId", adminAuth, async (req, res) => {
  const result = await db.query(
    `
    SELECT tr.id, tr.user_id, u.username
    FROM tournament_requests tr
    JOIN users u ON tr.user_id = u.id
    WHERE tr.tournament_id = $1
      AND tr.status = 'pending'
    `,
    [req.params.tournamentId]
  );

  res.json(result.rows);
});


router.put("/approve/:id", adminAuth, async (req, res) => {
  const result = await db.query(
    `
    UPDATE tournament_requests
    SET status = 'approved'
    WHERE id = $1
    RETURNING *
    `,
    [req.params.id]
  );

  res.json(result.rows[0]);
});


router.put("/reject/:id", adminAuth, async (req, res) => {
  const result = await db.query(
    `
    UPDATE tournament_requests
    SET status = 'rejected'
    WHERE id = $1
    RETURNING *
    `,
    [req.params.id]
  );

  res.json(result.rows[0]);
});


router.get("/approved/:tournamentId", adminAuth,async (req, res) => {
  const result = await db.query(
    `
    SELECT u.id, u.username
    FROM tournament_requests tr
    JOIN users u ON tr.user_id = u.id
    WHERE tr.tournament_id = $1
      AND tr.status = 'approved'
    `,
    [req.params.tournamentId]
  );

  res.json(result.rows);
});


export default router;
