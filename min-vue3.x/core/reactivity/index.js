// 响应式库
try {
    if (process) {
        process.stdout.write(
            process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
        );
    }
} catch (error) { }

// 依赖
let currentEffect = null;
class Dep {
    // 1、收集依赖
    constructor(val) {
        this._val = val
        this.effects = new Set()
    }

    get value() {
        this.depend()
        return this._val
    }

    set value(newVal) {
        this._val = newVal
        this.notice()
    }

    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }
    // 2、触发依赖
    notice() {
        // 触发一下之前收集到的依赖
        this.effects.forEach(effect => effect())
    }
}

const dep = new Dep(10)

export function effectWatch(effect) {
    // 收集依赖
    currentEffect = effect
    effect()
    currentEffect = null
}



// let b;
// effectWatch(() => {
//     b = dep.value + 10
//     console.log('hello world', b)
// })


// dep.value = 200

// setTimeout(() => {
//     dep.value = 3
// }, 1000)



// proxy
const targetMap = new Map()

function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}


export function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            console.log(target, key)
            // key - dep
            // dep 存储在哪里
            const dep = getDep(target, key)
            // 依赖收集
            dep.depend()

            return Reflect.get(target, key)
        },
        set(target, key, value) {
            // 触发依赖
            // 获取到依赖
            const dep = getDep(target, key)
            const result = Reflect.set(target, key, value)
            dep.notice()
            return result
        }
    })
}

// const user = reactive({
//     age: 19
// })

// let double;
// effectWatch(() => {
//     console.log('--reactive')
//     double = user.age;
//     console.log(double)
// })

// user.age = 20
// console.log(user.age)
// console.log(user.age)
// console.log(user.age)

