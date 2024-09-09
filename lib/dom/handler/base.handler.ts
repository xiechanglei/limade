/**
 * 基础处理器，提供一些基础的操作
 */
export class HandlerBase {
    readonly el: HTMLElement

    /**
     * 可以传入标签名或者元素
     * @param tagNameOrElement
     */
    constructor(tagNameOrElement: string | HTMLElement) {
        if (typeof tagNameOrElement === 'string') {
            this.el = document.createElement(tagNameOrElement)
        } else {
            this.el = tagNameOrElement
        }
    }

    // 获取元素
    get(): HTMLElement {
        return this.el
    }

}