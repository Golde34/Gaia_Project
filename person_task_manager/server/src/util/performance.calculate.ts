import { NextFunction } from "express";

const calculatedTimeResult = (startTime: number, next: NextFunction) => {
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    // do something
    return elapsedTime;
}
