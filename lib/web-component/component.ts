import {parseHTML, updateElement} from "./vnode";
import {optional, stringOptional} from "../oo";

const privateProp = Symbol('props');
const privateRenderStatus = Symbol('renderStatus');
const privateOldVNode = Symbol('oldVNode');
const privateNeedPain = Symbol('needPain');
const privateContentIndex = Symbol('contentIndex');
const privateFirstRender = Symbol('firstRender');

/**
 * 定义一个基础的WebComponent，用于给自定义组件继承使用，
 * 1.默认实现了props属性，用于接收外部传入的参数
 * 2.默认实现了shadowRoot
 */

export abstract class WebComponent<T> extends HTMLElement {
    // 属性
    [privateProp]?: T = undefined;
    // 渲染状态
    [privateRenderStatus]: boolean = false;
    // 旧的vnode
    [privateOldVNode]: any = undefined;
    // content index
    [privateContentIndex]: number = 0;
    // privateFirstRender
    [privateFirstRender]: boolean = true;

    /**
     * 构造函数
     * @param props
     */
    constructor(props?: T) {
        super();
        this.props = props!;
            // 开启shadowRoot,表示可以通过 element.shadowRoot 访问 Shadow DOM
        this.attachShadow({mode: 'open'});
    }

    /**
     * 设置props属性
     * @param props
     */
    set props(props: T) {
        optional(props).ifPresent(props => {
            this[privateProp] = new Proxy(props as any, {
                set: (target, p: string, value, receiver) => {
                    const setRes = Reflect.set(target, p, value, receiver);
                    this.update()
                    return setRes;
                }
            }) as T;
        }).ifNotPresent(() => {
            this[privateProp] = undefined;
        });
        this.update();
    }

    /**
     * 获取props属性
     */
    get props(): T | undefined {
        return this[privateProp];
    }

    /**
     * 模板方法，用于子类实现，返回一个html字符串
     */
    template() {
        return ""
    };

    /**
     * 样式方法，用于子类实现，返回一个css字符串
     */
    stylesheet?: string = undefined;

    [privateNeedPain]: boolean = false;

    update() {
        optional(this.shadowRoot).ifPresent((shadowRoot) => {
            if (this[privateRenderStatus]) {
                //使用Promise.resolve().then()，可以保证在下一个微任务中执行，避免重复渲染
                if (!this[privateNeedPain]) {
                    this[privateNeedPain] = true;
                    Promise.resolve().then(() => {
                        this[privateNeedPain] = false;
                        const new_vnode = parseHTML(this.template.call(this));
                        updateElement(shadowRoot, new_vnode, this[privateOldVNode], this[privateContentIndex]);
                        this[privateOldVNode] = new_vnode;
                    });
                }
            }
        })
    }

    /**
     * 渲染方法，用于子类实现,在connectedCallback中调用,表示元素被插入到文档中的时候再调用
     */
    connectedCallback() {
        this[privateRenderStatus] = true;
        this.update();
        if (this[privateFirstRender]) {
            this[privateFirstRender] = false;
            stringOptional(this.stylesheet).ifPresent(() => {
                this.shadowRoot!.innerHTML = `<style>${this.stylesheet}</style>`;
                this[privateContentIndex] = 1
            });
        }

    }

    /**
     * 渲染方法，用于子类实现,在disconnectedCallback中调用,表示元素从文档中删除的时候再调用
     * todo:回收资源
     */
    disconnectedCallback() {
        this[privateRenderStatus] = false;
    }

}