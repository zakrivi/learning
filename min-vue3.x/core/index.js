import { effectWatch } from "./reactivity/index.js"
import { mountElement, diff } from "./renderer/index.js"

export function createApp(rootComponent) {

    return {
        mount(rootContainer) {
            const context = rootComponent.setup()
            const root = document.querySelector(rootContainer)

            let isMounted = false
            let prevSubTree = null
            effectWatch(() => {
                if (!isMounted) {
                    isMounted = true
                    // 首次渲染
                    root.innerText = ''
                    const subTree = rootComponent.render(context)
                    // root.append(element)
                    console.log(subTree)
                    mountElement(subTree, root)
                    prevSubTree = subTree
                } else {
                    // update
                    const subTree = rootComponent.render(context)
                    diff(prevSubTree, subTree)
                    prevSubTree = subTree
                }
                // diff
                // newVnode oldVnode
            })

        }
    }
}