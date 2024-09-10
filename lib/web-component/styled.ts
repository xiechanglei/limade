type StyleInfo = {
    selector: string;
    style: string[];
    children: StyleInfo[];
    parent: StyleInfo | null;
}
/**
 * 将样式信息转换为字符串
 * @param info
 */
const styleInfoToString = (info: StyleInfo): string => {
    const self = info.style.length > 0 ? `${info.selector} {\n\t${info.style.join(";\n\t")};\n}` : "";
    const children = info.children.map(styleInfoToString).join("\n");
    return `${self}\n${children}`;
}

/**
 * 将嵌套的样式打平
 * @param style
 */
const flattenStyles = (style: string): string => {
    style = style.trim();
    let start = 0; // 用于记录当前的位置
    const root: StyleInfo[] = []; // 用于记录根样式
    let current: StyleInfo | null = null; // 用于记录当前的样式
    let quote: string[] = []; // 用于记录引号
    for (let i = 0; i < style.length; i++) {
        const char = style[i];
        if (quote.length > 0) {
            if (char === quote[quote.length - 1]) {
                quote.pop();
            }
            continue;
        }
        if (char === '"' || char === "'") {
            quote.push(char);
            continue;
        }
        if (char === "{") {
            let selector = style.slice(start, i).trim();
            if (selector.startsWith("&") && current !== null) {
                selector = current.selector + selector.slice(1);
            } else if (current !== null) {
                selector = current.selector + " " + selector;
            }
            current = {selector: selector, style: [], children: [], parent: current}
            start = i + 1;
        } else if (char === ";") {
            const styleStr = style.slice(start, i).trim();
            if (current !== null && styleStr.length > 0) {
                current.style.push(styleStr);
            }
            start = i + 1;
        } else if (char === "}") {
            if (current !== null) {
                const styleStr = style.slice(start, i).trim();
                if (styleStr.length > 0) {
                    current.style.push(styleStr);
                }
                if (current.parent === null) {
                    root.push(current);
                } else {
                    current.parent.children.push(current);
                }
                current = current.parent;
            }
            start = i + 1;
        }
    }
    return root.map(styleInfoToString).join("");
};

/**
 * 实现一个简单的 styled-components,支持嵌套，会将嵌套的样式打平
 * @param strings 表示模板字符串的数组
 * @param values 表示模板字符串中的变量
 */
export const styled = (strings: TemplateStringsArray, ...values: string[]) => {
    let style = strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
    return flattenStyles(style);
}
