/**
 * 基础处理器，提供一些基础的操作
 */
export class HandlerBase {
    readonly el: HTMLElement

    /**
     * 可以传入标签名或者元素
     * @param element
     */
    constructor(element: HTMLElement) {
        this.el = element
    }

    // 获取元素
    get(): HTMLElement {
        return this.el
    }
}