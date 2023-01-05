
/*---------------------------------------------------------------*/

const url = window.location.href;
let baseUrl = "";

if (url.split(":")[0] === 'https') {
    baseUrl = 'https://excited-train-deer.cyclic.app/';
} else {
    baseUrl = 'http://localhost:5001';
}


/*---------------------------------------------------------------*/
