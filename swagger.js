const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.routes.ts"];

swaggerAutogen(outputFile, endpointsFiles);
