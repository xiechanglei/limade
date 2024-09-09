import {HandlerBase} from "./base.handler";


export class HandlerForClass extends HandlerBase {
    addClass(className: string): this {
        this.el.classList.add(className)
        return this
    }

    // 移除类名
    removeClass(className: string): this {
        this.el.classList.remove(className)
        return this
    }

    // 判断是否有某个类名
    hasClass(className: string): boolean {
        return this.el.classList.contains(className)
    }
}