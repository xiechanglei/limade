import {HandlerBase} from "./handler.base";
import {optional} from "../../oo";

/**
 * 子元素类型
 */
type childType = HTMLElement | Text | HandlerBase | string;

/**
 * 格式化子元素，如果是HandlerBase类型，则获取其元素，如果是String类型，则创建文本节点
 * @param child
 */
const formatChild = (child: childType): HTMLElement | Text => {
    if (child instanceof HandlerBase) {
        return child.get()
    } else if (typeof child === 'string') {
        return document.createTextNode(child)
    }
    return child
}

/**
 * 结构处理器
 */
export class HandlerForInsert extends HandlerBase {

    // 在元素内部最后面添加内容
    appendTo(parent: HTMLElement | ShadowRoot): this {
        parent.appendChild(this.el)
        return this
    }

    // 在元素内部最前面添加内容
    prependTo(parent: HTMLElement | ShadowRoot): this {
        parent.prepend(this.el)
        return this
    }

    // 在元素外部最后面添加内容
    appendAfter(parent: HTMLElement): this {
        parent.after(this.el)
        return this
    }

    // 在元素外部最前面添加内容
    prependBefore(parent: HTMLElement): this {
        parent.before(this.el)
        return this
    }

    /**
     * 内部末尾添加元素
     * @param child
     */
    appendChild(child: childType): this {
        optional(child).map(formatChild).ifPresent((child) => this.el.appendChild(child))
        return this
    }

    /**
     * 内部最前面添加元素
     * @param child
     */
    prependChild(child: childType): this {
        optional(child).map(formatChild).ifPresent((child) => this.el.prepend(child))
        return this
    }

    /**
     * 设置内部内容
     * @param child
     */
    fill(child: childType): this {
        optional(child).map(formatChild).ifPresent((child) => {
            this.empty().appendChild(child)
        });
        return this;
    }

    text(text: string): this {
        this.el.textContent = text
        return this
    }

    /**
     * 设置html内容
     * @param html
     */
    fillHTML(html: string): this {
        optional(html).ifPresent(html => this.el.innerHTML = html)
        return this
    }

    /**
     * 清空元素内容,遍历子结点，逐个删除，性能较差，目的是为了
     */
    empty(): this {
        this.el.replaceChildren()
        return this
    }
}