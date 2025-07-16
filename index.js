require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost${PORT}`);
      console.log("Conectado a la base de datos:", mongoose.connection.name);
    });
  })
  .catch((error) => {
    console.log("Error conectando a la base de datos:", error);
  });
