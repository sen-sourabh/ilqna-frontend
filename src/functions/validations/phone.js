const isValidPhone = (phone) => {
    if(!isEmpty(phone)) return false;
    return phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/);
}

const isEmpty = (phone) => {
    if(phone === null || phone === '' || phone === undefined) return false;
    return true;
}

const Phone = {
    isValidPhone
}
export default Phone;