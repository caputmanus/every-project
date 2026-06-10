
const app = require("./app")

PORT = 8080

app.listen(PORT || 4000, () => {
    console.log("Сервер встал на порте", PORT)
})
