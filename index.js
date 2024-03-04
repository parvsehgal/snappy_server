const express = require("express")
const app = express();
const cors = require('cors')
app.use(express.json());

const getData = require('./routes/getData.js')
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use('/api/v1', getData)
app.use('/test', (req, res) => {
  res.send('this is test route')
})

app.listen(4000, () => {
  console.log("server started on port 4000")
})
