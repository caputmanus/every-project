const { add, sub } = require("./calculator")

test("Этот тест выведет сумму двух чисел: ", () => {
    expect(add(1, 2)).toBe(3)
})

test("Этот тест выведет разницу из двух чисел: ", () => {
    expect(sub(2, 2)).toBe(0)
})