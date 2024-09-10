import {NonNullable} from "./type";

/**
 * 模拟 Java8 的 Optional 类
 */
class Optional<T> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    check(): boolean {
        return this.value !== undefined && this.value !== null;
    }

    /**
     * 如果值存在，则执行 consumer
     * @param consumer
     */
    ifPresent(consumer: (value: NonNullable<T>) => void): this {
        if (this.check()) {
            consumer(this.value as NonNullable<T>);
        }
        return this;
    }

    /**
     * 如果值不存在，则执行 consumer
     * @param consumer
     */
    ifNotPresent(consumer: () => void): this {
        if (!this.check()) {
            consumer();
        }
        return this;
    }

    /**
     * 如果值存在，则执行 mapper，并返回新的Optional
     * @param mapper
     */
    map<U>(mapper: (value: NonNullable<T>) => U): Optional<U | undefined> {
        return this.check() ? Optional.of(mapper(this.value as NonNullable<T>)) : this as any;
    }

    /**
     * 如果值存在，则返回值，否则返回 other
     * @param other
     */
    orElse<U>(other: U): NonNullable<T> | U {
        return this.check() ? this.value as NonNullable<T> : other;
    }

    /**
     * 如果值存在，则返回值，否则返回执行 supplier 获取的值
     * @param supplier
     */
    orElseGet<U>(supplier: () => U): NonNullable<T> | U {
        return this.check() ? this.value as NonNullable<T> : supplier();
    }

    /**
     * 如果值存在，则返回值，否则抛出 errorSource
     * @param errorSource
     */
    orElseThrow(errorSource: (() => Error) | Error | string): NonNullable<T> {
        if (this.check()) {
            return this.value as NonNullable<T>;
        }
        if (typeof errorSource === 'string') {
            throw new Error(errorSource);
        }
        if (typeof errorSource === 'function') {
            throw errorSource();
        }
        throw errorSource;
    }

    /**
     * 获取值
     */
    get(): T {
        return this.value
    }

    /**
     * 创建一个Optional
     * @param value
     */
    static of<T>(value: T): Optional<T> {
        return new Optional(value);
    }
}

class StringOptional extends Optional<string | undefined> {
    check(): boolean {
        return this.value !== undefined && this.value !== null && this.value.trim() !== '';
    }
}

export function optional<T>(value: T): Optional<T> {
    return Optional.of(value);
}

export function stringOptional(value: string | undefined): StringOptional {
    return new StringOptional(value);
}