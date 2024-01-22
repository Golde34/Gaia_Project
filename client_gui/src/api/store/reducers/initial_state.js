export const initialState = {
    gaiaSignin: {
        gaiaInfo: localStorage.getItem('gaiaInfo')
            ? JSON.parse(localStorage.getItem('gaiaInfo'))
            : null,
    }
};