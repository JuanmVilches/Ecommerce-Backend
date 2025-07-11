const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error conectando a la base de datos:", error);
  });
