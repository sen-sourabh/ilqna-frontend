export const snackbarTimer = 5000;

//User Avatar Dynamic Color
export const generateRandomColor = () => {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

//Refactor API Response
export const refactor = (response) => {
    console.log("ref: ", response);
    return response.data[0];
}

//Generate Default Username By Email At The Time Of Sign Up
export const generatedUsernameByEmail = (text) => {
    console.log("username: ", text.split('@')[0].toString());
    return text.split('@')[0].toString();
}
