export const login = data => ({
    type: 'LOGIN',
    payload: data
});
export const logout = _ => ({
    type: 'LOGOUT'
});
export const setLoading = data => ({
    type: 'SET_LOADING',
    payload: data
});
export const setSynced = data => ({
    type: 'SET_SYNCED',
    payload:data
});