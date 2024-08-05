export const convertTimestampToDate = (timestamp) => {
    // return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
};

export const formatHourNumber = (value) => {
        if (value <=0) {
            return true;
        }
        if (value > 24) {
            return true;
        }
        return false;
    }