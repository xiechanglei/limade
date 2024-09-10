import {c} from "vite/dist/node/types.d-aGj9QkWt";

class VNode {
    tag: string;
    attrs: Record<string, string>;
    children: VNode[];

    constructor(tag: string, attrs: Record<string, string>, children: VNode[] = []) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
    }
}

function render(vnode: VNode): HTMLElement | Text {
    if (vnode.tag === 'text') {
        return document.createTextNode(vnode.attrs.nodeValue);
    }

    const el = document.createElement(vnode.tag);

    // 设置属性
    for (const [key, value] of Object.entries(vnode.attrs)) {
        // console.log(key, value);
        // el.setAttribute(key, value);
    }

    // 渲染子节点
    for (const child of vnode.children) {
        el.appendChild(render(child));
    }

    return el;
}

export function updateElement(parent: HTMLElement | ShadowRoot, newVNode: VNode, oldVNode?: VNode, index: number = 0) {
    if (!oldVNode) {
        parent.appendChild(render(newVNode));
    } else if (!newVNode) {
        if (parent.childNodes[index] !== undefined) {
            parent.removeChild(parent.childNodes[index]);
        }
    } else if (newVNode.tag !== oldVNode.tag) {
        parent.replaceChild(render(newVNode), parent.childNodes[index]);
    } else {
        const el = parent.childNodes[index] as HTMLElement;

        // 更新属性
        for (const [key, value] of Object.entries(newVNode.attrs)) {
            if (value !== oldVNode.attrs[key]) {
                if (newVNode.tag === 'text' && key === 'nodeValue') {
                    el.nodeValue = value;
                } else {
                    el.setAttribute(key, value);
                }
            }
        }
        for (const key in oldVNode.attrs) {
            if (!(key in newVNode.attrs)) {
                el.removeAttribute(key);
            }
        }

        // 更新子节点
        const newLength = newVNode.children.length;
        const oldLength = oldVNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(el, newVNode.children[i], oldVNode.children[i], i);
        }
    }
}

/**
 * 使用流式解析器解析HTML成为一个VNode
 * @param html
 */
const ilegalTagChar ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
export function parseHTML(html: string): VNode {
    // 存储所有的根节点
    const rootNodes: VNode[] = []
    // 存储当前的节点
    let currentNode: VNode | null = null;
    // 存储节点层级结构
    let NodeStack: VNode[] = []
    // 当前的索引
    let currentIndex = 0;
    //当前的字符
    let currentChar: string | undefined = undefined
    //寻找第一个节点
    const parseNode = (start:number,html:string)=>{

    }

    while ((currentChar = html[currentIndex++]) !== undefined) {
        const nextChar = html[currentIndex]
        if(currentChar === '<' && ilegalTagChar.indexOf(nextChar)!== -1) { //节点开始

        }
    }
    return rootNodes[0]
}
