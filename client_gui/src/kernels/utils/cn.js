export default function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}

export const isNullOrUndefined = (value) => {
	if (value === null || value === undefined) {
		return true;
	}
	if (value === "") {
		return true;
	}
	return false;
}