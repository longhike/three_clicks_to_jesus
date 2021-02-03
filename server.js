const express = require("express");
const apiRouter = require("./routes/api-routes");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static("views"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(apiRouter)

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
