import {HandlerBase} from "./base.handler";

/**
 * 事件处理器
 */
export class HandlerForEvent extends HandlerBase {
    // 绑定事件
    on(event: string, handler: (event: Event) => void): this {
        this.el.addEventListener(event, handler)
        return this
    }

    // 移除事件
    off(event: string, handler: (event: Event) => void): this {
        this.el.removeEventListener(event, handler)
        return this
    }

    // 一次性事件
    one(event: string, handler: (event: Event) => void): this {
        const wrapper = (event: Event) => {
            handler(event)
            this.off(event.type, wrapper)
        }
        this.on(event, wrapper)
        return this
    }
}