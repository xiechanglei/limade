export * from "./idleTask"

/**
 * Sleep for a given amount of time
 * @param ms - The amount of time to sleep in milliseconds
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type QueueTask = Function | number;

export const scheduleQueueTask = async (...task: QueueTask[]) => {
    for (let i = 0; i < task.length; i++) {
        if (typeof task[i] === 'number') {
            await sleep(task[i] as number);
        } else if (typeof task[i] === 'function') {
            await (task[i] as Function)();
        }
    }
}

const log1 = () => {
    console.log(1)
}

const log2 = () => {
    console.log(2)
}
scheduleQueueTask(log1, 2000, log2, 3000, log1);