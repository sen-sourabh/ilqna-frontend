const isValidEmail = (email) => {
    if(!isEmpty(email)) return false;
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
}

const isEmpty = (email) => {
    if(email === null || email === '') return false;
    return true;
}

const Email = {
    isValidEmail
}
export default Email;