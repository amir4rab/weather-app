export const setSynced = data => ({
    type: 'SET_SYNCED',
    payload:data
});
export const firebaseClear = _ => ({
    type: 'CLEAR'
})