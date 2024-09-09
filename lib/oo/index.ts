// 定义类的说明
type Constructor<T = {}> = new (...args: any[]) => T;
// 定义动态合并类  UnionToIntersection<A | B | C> => Constructor<A & B & C>
type UnionToConstructorIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? Constructor<I> : never;

/**
 * 以第一个类为基类，动态合并多个类的方法
 * @param constructors
 */
export function mixinClassMethods<T extends Constructor[]>(...constructors: T): UnionToConstructorIntersection<InstanceType<T[number]>> {
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