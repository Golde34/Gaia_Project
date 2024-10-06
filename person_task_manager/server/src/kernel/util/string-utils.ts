export const buildCommonStringValue = (value: string): string => {
    // HIGH, HiGh, high, hiGH, hIgh -> High
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}