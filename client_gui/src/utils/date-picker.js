export const validateDatePicker = (from, to) => {
    if (from !== undefined && to !== undefined) {
        console.log("from !== null && to !== null")
        return {
            from: from,
            to: to
        }
    } else if (from !== undefined && to === undefined) {
        console.log("from !== null && to === null")
        return {
            from: from,
            to: from
        }
    } else if (from === undefined && to !== undefined) {
        console.log("from === null && to !== null")
        return {
            from: new Date(0),
            to: to
        }
    } 
}

export const validateFromDate = (from, to) => {
    console.log(from, to);
    if (from < new Date()) {
        from = new Date();
    } 
    if (from > to) {
        console.log("from > to");
        return to;
    }else if (from === to) {
        console.log("from === to");
        return from;
    } else {
        console.log("from");
        return to;
    }
}