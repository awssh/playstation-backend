import express from "express";
import db from "../../db.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const result = await db.query(`
    SELECT 
      t.*,
      COUNT(tr.id) AS players_count
    FROM tournaments t
    LEFT JOIN tournament_requests tr
      ON tr.tournament_id = t.id
      AND tr.status = 'approved'
    GROUP BY t.id
    ORDER BY t.start_date
  `)

  res.json(result.rows)
})



router.get("/:id", async (req, res) => {
  const result = await db.query(
    `
    SELECT 
      t.*,
      u.username AS winner_name
    FROM tournaments t
    LEFT JOIN users u ON t.winner_id = u.id
    WHERE t.id = $1
    `,
    [req.params.id]
  );

  res.json(result.rows[0]);
});
export default router;


