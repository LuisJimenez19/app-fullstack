import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  const currentUser = req.user;

  try {
    const [result] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [
      currentUser.id,
    ]);
    const tasksCompleted = result.filter((task) => task.done == true);
    /* Actualiza tareas completadas. */
    const [resultUpdate] = await pool.query(
      "UPDATE users set completed_tasks_count = ? WHERE id = ?",
      [tasksCompleted.length, currentUser.id]
    );

    const response = {
      tasks: result,
      currentUser,
    };

    return res.status(200).json(response);
  } catch (error) {
    if (error.name == "Error")
      return res.status(400).json({ message: "id invalid." });
    return res.status(500).json({ error, message: "Internal Server Error." });
  }
};

export const getTask = async (req, res) => {
  const { task_id } = req.params;
  const currentUser = req.user;
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ? AND id = ?",
      [currentUser.id, task_id]
    );
    const response = {
      task: result,
      currentUser,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const createTask = async (req, res) => {
  const currentUser = req.user;
  const { name, description, done = false } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      message: "Incorrect data.",
    });
  } else {
    try {
      const [result] = await pool.query(
        "INSERT INTO tasks (name, description, done, user_id) VALUES (?,?,?,?)",
        [name, description, done, currentUser.id]
      );
      const response = {
        task: {
          id: result.insertId,
          name,
          description,
          done: false,
          user_id: currentUser.id,
        },
        currentUser,
      };

      return res.status(200).json(response);
    } catch (error) {
      if (error.code == "ER_DATA_TOO_LONG") {
        return res.status(400).json({ message: "Datos muy extensos." });
      }
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
};

export const updateTask = async (req, res) => {
  const { task_id } = req.params;
  const currentUser = req.user;
  const { name, description, done } = req.body;
  try {
    /* El id de la tarea y del usuario para que un usuario no */

    const [result] = await pool.query(
      "UPDATE tasks SET name = IFNULL(?, name), description = IFNULL(?, description), done = IFNULL(?, done), completed_at = IF(?, NOW(), completed_at) WHERE id = ? AND user_id = ?",
      [name, description, done, done, task_id, currentUser.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ? AND id = ?",
      [currentUser.id, task_id]
    );
    const response = {
      task: rows,
      currentUser,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "Internal Server Error." });
  }
};

export const deleteTask = async (req, res) => {
  const { task_id } = req.params;
  const currentUser = req.user;

  try {
    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [task_id, currentUser.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }
    return res.status(200).json({
      message: "Task deleted successfully.",
      currentUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Internal server error.",
    });
  }
};

/* Todas hacen referencia a un solo usuario, no se puede traer todas las tareas que existe
solo las del usuario que esta en sesión. */
