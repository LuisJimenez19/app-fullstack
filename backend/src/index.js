import { app } from "./app.js";

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server on port ${PORT}`);
});
