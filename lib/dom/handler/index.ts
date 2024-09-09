import {mixinClassMethods} from "../../oo";
import {HandlerBase} from "./base.handler";
import {HandlerForClass} from "./style.handler";
import {HandlerForInsert} from "./insertion.handler";
import {HandlerForEvent} from "./event.handler";


const HTMLElementHandler = mixinClassMethods(HandlerBase, HandlerForClass, HandlerForInsert, HandlerForEvent)

/**
 * 创建一个的dom元素，可以指定标签名，类名和内容
 */
export function createHTMLElementHandler(tagName: string | HTMLElement) {
    return new HTMLElementHandler(tagName);
}