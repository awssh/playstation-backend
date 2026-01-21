import express from "express";
import db from "../../db.js";
import adminAuth from "../../middleware/adminAuth.js";

const router = express.Router();
router.post("/", adminAuth, async (req, res) => {
  const { name, game, start_date, max_players, prize } = req.body;

  if (!name || !game || !start_date || !max_players || !prize) {
    return res.json({ message: "Missing fields" });
  }

  const result = await db.query(
    `INSERT INTO tournaments
     (name, game, start_date, max_players, prize, status)
     VALUES ($1, $2, $3, $4, $5, 'upcoming')
     RETURNING *`,
    [name, game, start_date, max_players, prize]
  );

  res.status(201).json(result.rows[0]);
});


router.put("/:id/start", adminAuth, async (req, res) => {
  const result = await db.query(
    `UPDATE tournaments
     SET status = 'active'
     WHERE id = $1
     RETURNING *`,
    [req.params.id]
  );

  res.json(result.rows[0]);
});

router.get("/", adminAuth, async (req, res) => {
  const result = await db.query("SELECT * FROM tournaments");
  res.json(result.rows);
});

router.put("/:id/winner", adminAuth, async (req, res) => {
  const { winner_id } = req.body;

  const result = await db.query(
    `UPDATE tournaments
     SET winner_id = $1, status = 'completed'
     WHERE id = $2
     RETURNING *`,
    [winner_id, req.params.id]
  );

  res.json(result.rows[0]);
});



router.delete("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query( "DELETE FROM matches WHERE tournament_id = $1",[id]
    );

    await db.query("DELETE FROM tournament_requests WHERE tournament_id = $1", [id]
    );

    const result = await db.query( "DELETE FROM tournaments WHERE id = $1 RETURNING *", [id]
    );

    if (result.rows.length === 0) {
      return res.json({ message: "Tournament not found" });
    }

    res.json({ message: "Tournament deleted successfully" });

  } catch (err) {
    res.json({ message: "Delete failed" });
  }
});
router.get("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    "SELECT * FROM tournaments WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Tournament not found" });
  }

  res.json(result.rows[0]);
});

export default router;
