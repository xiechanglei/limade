import {HandlerBase} from "./handler.base";
import {optional} from "../../oo";

export class HandlerForAttr extends HandlerBase {

    attr(name: string): string | null
    attr(name: string, value: string): this
    attr(name: string, value?: string): this | string | null {
        return optional(value).map((value) => this.setAttr(name, value)).orElseGet(() => this.getAttr(name))
    }

    setAttr(name: string, value: string): this {
        this.el.setAttribute(name, value)
        return this
    }

    removeAttr(name: string): this {
        this.el.removeAttribute(name)
        return this
    }

    getAttr(name: string): string | null {
        return this.el.getAttribute(name)
    }

    hasAttr(name: string): boolean {
        return this.el.hasAttribute(name)
    }

    attrs(attrs: Record<string, string>): this {
        for (const [key, value] of Object.entries(attrs)) {
            this.el.setAttribute(key, value)
        }
        return this
    }

    id(): string
    id(id: string): this
    id(id?: string): string | this {
        return optional(id).map((id) => this.setId(id)).orElseGet(() => this.getId())
    }

    setId(id: string): this {
        this.el.id = id
        return this
    }

    getId(): string {
        return this.el.id
    }

}