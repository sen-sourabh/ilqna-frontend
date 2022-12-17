import ENV from "../../config.json";

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

//Check JWT token
export const checkJWT = (response) => {
    if(response.data[0].code === 100 && response.data[0].message === "jwt expired") {
        localStorage.clear();
        window.location.href = ENV.BASE_URL;
        return;
    }
    return;
}

export const goingForLogout = () => {
    window.location.href = window.location.href;
}

//Refactor API Response
export const refactor = (response) => {
    return response.data[0];
}

//Generate Default Username By Email At The Time Of Sign Up
export const generatedUsernameByEmail = (text) => {
    console.log("username: ", text.split('@')[0].toString());
    return text.split('@')[0].toString();
}

//String Functions
export const isEmpty = (text) => {
    if(text === null || text === '' || text === undefined) return false;
    return true;
}

//Capitalize first letter of each word in given string
export const capitalizeFirstLetter = (str) => {
    const words = str.split(" ");
    return words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
}