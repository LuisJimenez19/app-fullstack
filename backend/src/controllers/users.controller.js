import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const currentUser = req.user;
  try {
    /* const [result] = await pool.query(
      "SELECT id,name, email,default_url_id, completed_tasks_count FROM users ",
      [currentUser.id]
    ); */
    const [row] = await pool.query(
      "SELECT u.id, u.name, u.email,completed_tasks_count, created_at, du.default_url " +
        "FROM users u " +
        "JOIN default_url_gravatar du ON u.default_url_id = du.id "
    );

    const response = {
      users: row,
      currentUser,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error, message: "Internal Server Error." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;
  const { name, email, password, default_url_id } = req.body;
  /* Verifica que el usuario a actualizar sea el mismo que de la sesión */
  if (parseInt(id) !== currentUser.id)
    return res.status(400).json({ message: "Access denied." });
  /* Verifica si quiere actualizar el email, si es email valido, y si esta disponible (De esta forma no hameos consultas sin datos erroneos) */
  let newEmail;
  if (email) {
    //-> estos dos ifs porque si no lo manda entonces no lo quiere actualizar
    if (!EMAILREGEX.test(email)) {
      return res.status(400).json({ message: "Invalid credentials." });
    } else {
      newEmail = email;
      const [resultEmail] = await pool.query(
        // el email es invalido
        "SELECT * FROM users WHERE email = (?)",
        [newEmail]
      );

      if (resultEmail.length !== 0) {
        return res.status(400).json({
          message: "Email already has an account.",
          newEmail,
        });
      }
    }
  }
  let newPass;
  if (password) {
    newPass = await bycriptjs.hash(password, 12);
  }
  try {
    const [result] = await pool.query(
      "UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password), default_url_id= IFNULL(?, default_url_id) where id = ? ",
      [name, newEmail, newPass, default_url_id, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else if (result.affectedRows >= 1) {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ? ", [
        id,
      ]);

      const response = {
        tasks: rows,
        currentUser,
      };
      res.status(200).json(response);
    } else {
      res.status(204);
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "Email already belongs to an account." });
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;
  if (parseInt(id) !== currentUser.id) {
    return res.status(400).json({ message: "Access denied." });
  }

  try {
    const restultTasks = await pool.query(
      "DELETE FROM tasks WHERE user_id = ?",
      [currentUser.id]
    );

    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
      currentUser.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({
        message: "User not found.",
      });
    } else if (result.affectedRows >= 1) {
      res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });
      res.status(200).json({
        message: "User deleted successfully.",
        currentUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
