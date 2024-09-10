import {optional} from "../oo";

interface IdleTask {
    // 任务是否已经结束
    ended(): boolean;

    // 继续执行任务
    goon: () => void;
}

/**
 * 调度一个任务，在浏览器的空闲时间进行执行。此任务应该是一个耗js执行时间较长的任务，并且不应该去阻塞主线程。
 */
export function scheduleIdleTask(task: IdleTask): void {
    optional(task).orElseThrow('task不能为空');

    optional(window.requestIdleCallback).ifPresent((requestIdleCallback) => {
        const execute = () => {
            requestIdleCallback((idle) => {
                while (idle.timeRemaining() > 0 && !task.ended()) {
                    task.goon();
                }
                if (!task.ended()) {
                    execute();
                }
            });
        };
        execute();
    }).ifNotPresent(() => {
        //不支持requestIdleCallback的浏览器，直接执行
        while (!task.ended()) {
            task.goon();
        }
    });
}