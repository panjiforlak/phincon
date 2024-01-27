const express = require("express");
const pokemonRoutes =require("./routes/pokemon.js")
const middlewareLogReq = require("./middleware/logs.js")
const app = express();
const cors = require("cors");
const sequelize = require('./config/database.js');

sequelize.sync().then(()=>console.log('sqlite is running'))

const PORT=4000;

app.use(cors());
app.use(express.json())
app.use(middlewareLogReq);
// app.use(bodyParser);

app.use('/api/pokemon',pokemonRoutes)

app.listen(PORT, ()=> {
    console.log('Server is running on port',PORT)
});