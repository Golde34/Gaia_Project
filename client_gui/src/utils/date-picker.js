export const validateDatePicker = (from, to) => {
    if (from !== undefined && to !== undefined) {
         return {
            from: from,
            to: to
        }
    } else if (from !== undefined && to === undefined) {
        return {
            from: from,
            to: from
        }
    } else if (from === undefined && to !== undefined) {
        return {
            from: new Date(0),
            to: to
        }
    } 
}

export const validateFromDate = (from, to) => {
     if (from < new Date()) {
        from = new Date();
    } 
    if (from > to) {
        return to;
    }else if (from === to) {
        return from;
    } else {
        return to;
    }
}

export const convertTimestampToDate = (timestamp) => {
    // return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
};