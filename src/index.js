import express from 'express';
import cors from "cors";
import "express-async-errors";
import { errorHandler } from './middlewares/main.js'
import CustomError from './services/errors/custom-error.js';
import env from './config/enviroment.config.js';
import { logger } from './utils/main.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import ecobiciRouter from './routes/ecobici.router.js';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const PORT = env.port || 9000

app.use(express.json());
// Habilita CORS
app.use(cors());

// Middleware para servir la documentación de Swagger
app.listen(PORT, () => {
  logger.info(`Servidor en funcionamiento http://localhost:${PORT}`);
});
app.set("views", __dirname + "/views");
app.set("view engine");
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación Bicycle Traker",
      description: "Bicycle Traker",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`], // Ruta a tus archivos de documentación YAML
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/api/doc", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/api", ecobiciRouter)
app.get('/', (req, res) => {
  const version = 'version: 1.0.0'; // Define la versión de la API
  res.status(200).json({ version });
});
app.get("*", (req, res, next) => {
  try {
    CustomError.createError({
      name: "Page Not Found",
      cause: "Non existent path",
      message: "The path you are trying to access does not exist",
      code: Errors.ROUTING_ERROR,
    });
  } catch (error) {
    next(error);
  }
});
app.use(errorHandler);