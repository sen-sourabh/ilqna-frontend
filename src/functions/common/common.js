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

//It will return Chip color of priority badge whereever question is visible
export const getPriorityColor = (priority) => {
    if(priority === 'medium') {
        return 'bg-warning'
    } else if(priority === 'high') {
        return 'bg-success'
    } else if(priority === 'critical') {
        return 'bg-error'
    } else {
        return 'bg-primary'
    }

    // let colorClass = [
    //   'bg-primary',
    //   'bg-success',
    //   'bg-error'
    // ];
    // let randomNumber = Math.floor(Math.random() * colorClass.length);
    // return colorClass[randomNumber];
}

//It will return Chip color of priority badge whereever question is visible
export const getStatusColor = (status) => {
    if(status === 'hold') {
        return 'bg-warning'
    } else if(status === 'close') {
        return 'bg-error'
    } else {
        return 'bg-success'
    }

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
    let currentLocation = window.location.href;
    window.location.href = currentLocation;
}

//Refactor API Response
export const refactor = (response) => {
    console.log("response: ", response)
    if(!response || !response?.data) return [];
    return response?.data[0] || [];
}

//Generate Default Username By Email At The Time Of Sign Up
export const generatedUsernameByEmail = (text) => {
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