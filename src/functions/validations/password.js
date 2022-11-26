const isValidPassword = (password) => {
    if(!isEmpty(password)) return false;
    return password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
}

const isEmpty = (password) => {
    if(password === null || password === '' || password === undefined) return false;
    return true;
}

const isPasswordMatch = (newPassword, cnewPassword) => {
    if(newPassword === cnewPassword){
        return true;
    }
    return false;
}

const Password = {
    isValidPassword, 
    isPasswordMatch
};
export default Password;