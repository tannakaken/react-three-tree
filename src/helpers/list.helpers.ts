export const forEachUntil = <T>(n: number, callback: (index: number) =>T) => Array.from(Array(n), (_, k) => callback(k));