import express from "express";
import { pool } from "../db.js";
import { authSession } from "../middleware/auth.middleware.js";

const routesIndex = express.Router();

routesIndex.get("/", authSession, async (req, res) => {
  const descriptionRelation = `
    # Primer APIREST

Aplicación que permite al usuario leer, crear, actualizar y borrar tareas y sitios favoritos.
Con un sistema de autenticación.

### Paquetes.
- express
- jsonwebtoken
- dotenv
- cookie-parser
- cors
- bcryptjs
- mysql2
  
### DB

- **users** (ED)
  - user_id INT (PK)
  - email varchar (UQ)
  - name varchar not null
  - password varchar not null

- **tasks** (ED)
  - task_is INT (PK)
  - user_id (FK)
  - name varchar not null
  - description varchar not null
  - done bool

- **sites** (ED)
  - site_id INT (PK)
  - user_id (FK)
  - name VARCHAR
  - url VARCHAR

### RELACIONES
- user 1 a m task.
- user 1 a m sites.
    `;

  res.status(200).send(descriptionRelation);
});

export default routesIndex;
