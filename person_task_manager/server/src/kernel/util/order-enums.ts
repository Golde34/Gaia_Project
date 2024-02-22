import { Priority } from "../../core/domain/enums/enums";

class OrderedPriority {

    constructor() { }

    decreasePriorityDimension(taskArray: any[]): any {
        let priorityDict = this.priorityDefo();
        taskArray.forEach(task => {
            let min = 10;
            for (let i = 0; i < task.priority.length; i++) {
                let number = priorityDict.find((item: any) => item.priority === task.priority[i])!.order;
                if (number < min) {
                    min = number;
                }
            }
            task.number = min;
        });
        return taskArray;
    }
    priorityDefo() {
        // Add your implementation here
        const priority = [Priority.star, Priority.high, Priority.medium, Priority.low, Priority.custom];
        const priorityOrder = [];
        for (let i = 0; i < priority.length; i++) {
            priorityOrder.push({ priority: priority[i], order: i });
        }
        // return dictionary: Star: 0, High: 1, Medium: 2, Low: 3, Custom: 4 
        return priorityOrder;
    }

    quickSort = (taskArray: any[], left: number, right: number): any[] => {
        let index;
        if (taskArray.length > 1) {
            index = this.partition(taskArray, left, right);
            if (left < index - 1) {
                this.quickSort(taskArray, left, index - 1);
            }
            if (index < right) {
                this.quickSort(taskArray, index, right);
            }
        }
        return taskArray;
    }
    partition = (taskArray: any[], left: number, right: number): number => {
        let pivot = taskArray[Math.floor((right + left) / 2)].number;
        let i = left;
        let j = right;
        while (i <= j) {
            while (taskArray[i].number < pivot) {
                i++;
            }
            while (taskArray[j].number > pivot) {
                j--;
            }
            if (i <= j) {
                this.swap(taskArray, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
    swap = (taskArray: any[], leftIndex: number, rightIndex: number): void => {
        let temp = taskArray[leftIndex];
        taskArray[leftIndex] = taskArray[rightIndex];
        taskArray[rightIndex] = temp;
    }
}

export const priorityOrder = new OrderedPriority();