// const { reactive, effect } = require("@vue/reactivity")

const { reactive, effectWatch } = require('./core/reactivity')
// let a = 10
// let b;

// update()

// function update() {
//     b = a + 10;
//     console.log(b)
// }

// a = 20
// update()

process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
);

let a = reactive({
    value: 1
})
let b;

effectWatch(() => {
    b = a.value + 10
    console.log(b)
})


a.value = 30

setTimeout(() => {
    a.value = 60
}, 2000)
