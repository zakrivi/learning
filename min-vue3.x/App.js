import { h } from './core/h.js'
import { reactive } from './core/reactivity/index.js'

export default {
    render(context) {
        // 构建视图 view = b
        // tag
        // props
        // children
        // const div = document.createElement('div')
        // div.innerText = context.state.count
        // return div
        return h('div', {
            id: 'app_' + context.state.id,
            class: 'block'
        }, [
            h('p', null, context.state.count),
            h('p', {
                class: 'p2'
            }, 'p2'),
            h('p', null, 'p3'),
        ])
    },
    setup() {
        const state = reactive({
            count: 9,
            id: '0'
        })

        window.state = state
        return {
            state
        }
    }
}