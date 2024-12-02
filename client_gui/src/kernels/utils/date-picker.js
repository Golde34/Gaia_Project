export const convertTimestampToDate = (timestamp) => {
    // return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
};

export const formatHourNumber = (value) => {
    if (value <= 0) {
        return true;
    }
    if (value > 24) {
        return true;
    }
    return false;
}

export const convertDateToString = (date) => {
    // Format date to string dd/MM/yyyy HH:mm:ss
    return date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}