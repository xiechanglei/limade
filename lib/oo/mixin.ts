import {Type, UnionToConstructorIntersection} from "./type";


/**
 * 以第一个类为基类，动态合并多个类的方法
 * @param constructors
 */
export function mixinClassMethods<T extends Type[]>(...constructors: T): UnionToConstructorIntersection<InstanceType<T[number]>> {
    if (constructors.length === 0) {
        throw new Error('至少需要一个类');
    }
    if (constructors.length === 1) {
        return constructors[0] as any;
    }
    const combinedClass = class extends constructors[0] {
        constructor(...args: any[]) {
            super(...args);
        }
    }
    for (let i = 1; i < constructors.length; i++) {
        const constructor = constructors[i];
        const methods = Object.getOwnPropertyNames(constructor.prototype);
        methods.forEach(method => {
            // 构造函数不需要合并
            if (method === 'constructor') {
                return;
            }
            // @ts-ignore
            combinedClass.prototype[method] = constructor.prototype[method];
        });
    }
    return combinedClass as any;
}
