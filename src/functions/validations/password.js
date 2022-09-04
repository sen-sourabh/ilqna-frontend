const isValidPassword = (password) => {
    if(!isEmpty(password)) return false;
    return password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
}

const isEmpty = (password) => {
    if(password === null || password === '') return false;
    return true;
}

const Password = {
    isValidPassword
};
export default Password;