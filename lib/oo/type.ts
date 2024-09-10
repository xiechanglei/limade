// 定义类的说明
export type Type<T = {}> = new (...args: any[]) => T;

// 定义动态合并类  UnionToIntersection<A | B | C> => Type<A & B & C>
export type UnionToConstructorIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? Type<I> : never;

// 将类型种的undefined和null去掉
export type NonNullable<T> = T extends null | undefined ? never : T;
