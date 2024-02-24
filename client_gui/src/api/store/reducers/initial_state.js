export const initialState = {
    gaiaSignin: {
        gaiaInfo: localStorage.getItem('gaiaInfo')
            ? JSON.parse(localStorage.getItem('gaiaInfo'))
            : null,
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    }
};