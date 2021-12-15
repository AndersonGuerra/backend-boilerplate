import "dotenv/config";
import "express-async-errors";
import express from "express";
import routes from "./routes/index.routes";
import fs from "fs";
import setUser from "./middleware/setUser";
import errorHandler from "./middleware/errorHandler";

if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(setUser);
// aplica as rotas na nossa aplicação
app.use(routes);
app.use(errorHandler);

// inicia a execução da aplicação
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
