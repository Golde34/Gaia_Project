export const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    gaiaSignin: {
        gaiaInfo: localStorage.getItem('gaiaInfo')
            ? JSON.parse(localStorage.getItem('gaiaInfo'))
            : null,
    },
};