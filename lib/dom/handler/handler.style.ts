import {HandlerBase} from "./handler.base";
import {optional} from "../../oo";


export class HandlerForClass extends HandlerBase {

    class(className: string): this
    class(): string[]
    class(className?: string): this | string[] {
        return optional(className).map((className) => this.addClass(className)).orElseGet(() => this.getClass())

    }

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

    // 获取所有类名
    getClass(): string[] {
        return Array.from(this.el.classList)
    }

    // toggle class
    toggleClass(className: string): this {
        this.el.classList.toggle(className)
        return this
    }


    style(style: string): string
    style(style: string, value: string): this
    style(style: string, value?: string): this | string {
        return optional(value).map((value) => this.setStyle(style, value)).orElseGet(() => this.getStyle(style))
    }

    // 设置style
    setStyle(style: string, value: string): this {
        optional(value).ifPresent((value) => this.el.style.setProperty(style, value));
        return this
    }

    // 获取style
    getStyle(style: string): string {
        return this.el.style.getPropertyValue(style)
    }
}