import "dotenv/config";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";
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
// inicializa o swagger ui
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// aplica as rotas na nossa aplicação
app.use(routes);
app.use(errorHandler);

// inicia a execução da aplicação
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
