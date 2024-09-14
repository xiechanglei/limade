import {Type, mixinClassMethods, optional} from "../../oo";
import {HandlerBase} from "./handler.base";
import {HandlerForClass} from "./handler.style";
import {HandlerForInsert} from "./handler.insertion";
import {HandlerForEvent} from "./handler.event";
import {HandlerForAttr} from "./handler.attr";


const HTMLElementHandler = mixinClassMethods(HandlerBase, HandlerForClass, HandlerForInsert, HandlerForEvent, HandlerForAttr)

/**
 * 创建一个的dom元素，可以指定标签名，类名和内容
 * @param source - 可以是一个html字符串，一个HTMLElement对象，或者一个HTMLElement的构造函数（web-component）
 * @param props - 一个对象，包含了元素的属性
 *
 */
export function withHandler(source: string | HTMLElement | Type<HTMLElement>, props?: unknown) {
    const buildSource = optional(source).map((source) => {
        if (typeof source === 'string') {
            source = document.createElement(source);
        } else if (typeof source === 'function') {
            source = new (source as Type<HTMLElement>)(props)
        }
        return source
    }).orElseThrow('source不能为空');
    return new HTMLElementHandler(buildSource, props);
}