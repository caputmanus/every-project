const express = require("express")
const app = express()
app.use(express.json())

const users = [
    {name: "Alisa", surename: "Pupkovich"},
    {name: "Kurt", surename: "Kobain"}
]

app.get("/", (req, res) => {
    res.status(200).json({message: "Есть апишка"})
})

app.get("/users", (req, res) => {
    res.status(200).json(users)
})

module.exports = app