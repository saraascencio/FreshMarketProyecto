const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productoRoute = require("./routes/productoRoute");
const { connectedtoMongoDB } = require("./configuration/dbConfig");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

connectedtoMongoDB()
    .then(() => {
        app.use("/api/producto", productoRoute);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error}`);
    });
