const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    // this.routes();
  }

  middlewares() {
    // Directorio público
    this.app.use("*", express.static("build"));
  }

  // routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en ${this.port}`);
    });
  }
}

module.exports = Server;
