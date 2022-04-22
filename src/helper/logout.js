export const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
}