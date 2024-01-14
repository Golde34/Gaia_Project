export const initialState = {
    gaiaSignin: {
        gaiaInfo: localStorage.getItem('gaiaInfo')
            ? JSON.parse(localStorage.getItem('gaiaInfo'))
            : null,
    },
    bossSignin: {
        bossInfo: localStorage.getItem('bossInfo')
            ? JSON.parse(localStorage.getItem('bossInfo'))
            : null,
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};