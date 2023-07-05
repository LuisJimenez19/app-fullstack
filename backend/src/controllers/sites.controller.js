import { pool } from "../db.js";
import { URLREGEX } from "../utils/regex.js";

export const getSites = async (req, res) => {
  const { id } = req.user;
  try {
    const [result] = await pool.query("SELECT * FROM sites WHERE user_id = ?", [
      id,
    ]);
    res.json(result);
  } catch (error) {
    return res.json(500).json({
      error,
      message: "Internal server error.",
    });
  }
};

export const getSite = async (req, res) => {
  const { site_id } = req.params;
  const userId = req.user.id;
  try {
    const [result] = await pool.query(
      "SELECT * FROM sites WHERE id = ? AND user_id = ?",
      [site_id, userId]
    );
    res.status(200).json({
      site: result,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Internal server error.",
    });
  }
};

export const createSite = async (req, res) => {
  const { url, alias } = req.body;
  const userId = req.user.id;
  if (!URLREGEX.test(url) || !alias) {
    return res.status(400).json({
      message: "Invalid data.",
    });
  }
  try {
    /* primero validamos si ya tiene este sitio guardad */
    const [isExists] = await pool.query(
      "SELECT * FROM sites WHERE url = ? AND user_id = ?",
      [url, userId]
    );

    if (isExists.length !== 0)
      return res.status(400).json({ message: "The url already exists." });

    const [result] = await pool.query(
      "INSERT INTO sites (alias, url, user_id) VALUES (?,?,?)",
      [alias, url, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "could not add.",
      });
    }
    const response = {
      id: result.insertId,
      alias,
      url,
    };
    

    return res.status(200).json({
      message: "successfully added",
      site: response,
    });
  } catch (error) {
    return res.json(500).json({
      message: "Internal server error.",
    });
  }
};

export const updateSite = async (req, res) => {
  const { site_id } = req.params;
  const userId = req.user.id;
  const { url, alias } = req.body;
  if (!URLREGEX.test(url)) {
    return res.status(400).json({
      message: "Invalid data.",
    });
  }
  try {
    const [result] = await pool.query(
      "UPDATE sites SET url = IFNULL(?, url), alias = IFNULL(?, alias) WHERE id = ? AND user_id = ?",
      [url, alias, site_id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Url not found" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM sites WHERE user_id = ? AND id = ?",
      [userId, site_id]
    );

    const response = {
      site: rows,
    };
    return res.status(200).json(response);
  } catch (error) {
    if (error.name == "Error")
      return res.status(400).json({ message: "id invalid." });
    return res.status(500).json({ error, message: "Internal Server Error." });
  }
};

export const deleteSite = async (req, res) => {
  const { site_id } = req.params;
  const userId = req.user.id;
  try {
    const [result] = await pool.query(
      "DELETE FROM sites WHERE id = ? AND user_id = ?",
      [site_id, userId]
    );
    
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Site not found" });

    return res.status(200).json({ message: "Site deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Internal server error.",
    });
  }
};
