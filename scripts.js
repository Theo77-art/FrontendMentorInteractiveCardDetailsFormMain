/**  REACTIVE CREDIT CARD */

const cardholdername = document.querySelector("#cardholdername");
const responsecardholdername = document.getElementsByClassName("array-cardholder-name");

cardholdername.addEventListener("input", (event) => {
    let name = event.target.value;
    let nameArray = name.split('');

    for(i = 0; i < 23; i++){
        responsecardholdername[i].innerHTML = "";
    }

    for(i = 0; i < nameArray.length; i++){
        responsecardholdername[i].innerHTML = nameArray[i];
        if(nameArray[i] == " "){
            responsecardholdername[i].style.width = "11px";
        }
    }
});

const cardnumber = document.querySelector("#cardnumber");
const responsecardnumber = document.getElementsByClassName("array-card-number");

cardnumber.addEventListener("input", (event) => {
    let number = event.target.value;
    let numberArray = number.split('');  
    numberArray = numberArray.slice(0, 16);  

    numberArray = numberArray.map(element => element.replaceAll(" ", "0"));

    for(i = 0; i < numberArray.length; i++){
        responsecardnumber[i].innerHTML = numberArray[i];
    }
});

const expireMounth = document.querySelector("#expirationdatemounth");
const responseExpireMounth = document.getElementsByClassName("expiration-mounth");

expireMounth.addEventListener("input", (event) => {
    let mounth = event.target.value;
    let mounthArray = mounth.split('');
    mounthArray = mounthArray.slice(0, 2);

    mounthArray = mounthArray.map(element => element.replaceAll(" ", "0"));

    for(i = 0; i < mounthArray.length; i++){
            responseExpireMounth[i].innerHTML = mounthArray[i]; 
    }
});

const expireYear = document.querySelector("#expirationdateyear");
const responseExpireYear = document.getElementsByClassName("expiration-year");

expireYear.addEventListener("input", (event) => {
    let year = event.target.value;
    let yearArray = year.split('');
    yearArray = yearArray.slice(0, 2);

    yearArray = yearArray.map(element => element.replaceAll(" ", "0"));

    for(i = 0; i < yearArray.length; i++){
        responseExpireYear[i].innerHTML = yearArray[i]; 
    }
});


const cvc = document.querySelector("#cvc");
const responsecvc = document.getElementsByClassName("cvc-number");

cvc.addEventListener("input", (event) => {
    let cvc = event.target.value;
    let cvcArray = cvc.split('');
    cvcArray = cvcArray.slice(0, 3);
    cvcArray = cvcArray.map(element => element.replaceAll(" ", "0"));

    for( i = 0; i < cvcArray.length; i++){
        responsecvc[i].innerHTML = cvcArray[i];
    }
});


/**   FORM VERIFICATION */

const form = document.querySelector("form");
const submit = document.querySelector("#btn-submit");
form.addEventListener("submit", (event) => {

    event.preventDefault();

    const formData = new FormData(form);

    if(nameChecking(formData.get("cardholdername"))){
        if(cardnumberChecking(formData.get("cardnumber"))){
            if( expirationmounthChecking(formData.get("expirationdatemounth"))){
                if(expirationyearChecking(formData.get("expirationdatemounth"), formData.get("expirationdateyear"))){
                    if(cvcChecking(formData.get("cvc"))){
                        const formState = document.querySelector(".form-wrapper");
                        const thankState = document.querySelector(".card-added");

                        formState.classList.add("hide");
                        thankState.classList.remove("hide");
                    }
                }
            }
        }
    }

});

function nameChecking(name){

    const nameInputResponse = document.querySelector("#cardholdername");
    const nameResponse = document.querySelector("#reponse-cardholdername");

    if(name.length == 0){

        nameInputResponse.classList.add("error");
        nameResponse.innerHTML = "can't be blank";
        return false;

    }else{

        if(/^[A-Za-z\s]*$/.test(name)){
            nameInputResponse.classList.remove("error");
            nameResponse.innerHTML = "";
            return true;
        }

        else{

            nameInputResponse.classList.add("error");
            nameResponse.innerHTML = "Wrong format, letter only";
            return false;
        }
       
    }   
}

function cardnumberChecking(cardnumber){

    const cardnumberInputResponse = document.querySelector("#cardnumber");
    const cardnumberResponse = document.querySelector("#reponse-cardnumber");

    if(cardnumber.length == 0){

        cardnumberInputResponse.classList.add("error");
        cardnumberResponse.innerHTML = "can't be blank";
        return false;

    }else{

        if(/^[0-9]*$/.test(cardnumber)){
            
            if(cardnumber.length == 16){
                cardnumberInputResponse.classList.remove("error");
                cardnumberResponse.innerHTML = "";
                return true;
            }else{
                cardnumberInputResponse.classList.add("error");
                cardnumberResponse.innerHTML = "Wrong format, card number have 16 numbers";
                return false
            }

        }

        else{
            cardnumberInputResponse.classList.add("error");
            cardnumberResponse.innerHTML = "Wrong format, number only";
            return false;
        }
       
    }   
}



/*** Expiration date */

function expirationmounthChecking(expirationmounth){
    const expirationmounthInputResponse = document.querySelector("#expirationdatemounth");
    const expirationdateResponce = document.querySelector("#response-date");

    if(expirationmounth.length == 0){
        expirationmounthInputResponse.classList.add("error");
        expirationdateResponce.innerHTML = "can't be blank";
        return false;
    }
    else
    {
        if(/^[0-9]*$/.test(expirationmounth)){

            if(expirationmounth.length == 2){
                if(parseInt(expirationmounth) > 12){
                    console.log(parseInt(expirationmounth));
                    expirationmounthInputResponse.classList.add("error");
                    expirationdateResponce.innerHTML = "maximum value is 12";
                    return false;
                }else{
                    expirationmounthInputResponse.classList.remove("error");
                    expirationdateResponce.innerHTML = "";
                    return true;
                }
            }else{
                expirationmounthInputResponse.classList.add("error");
                expirationdateResponce.innerHTML = "Wrong format, mounth have 2 numbers";
                return false;
            }

        }else{
            expirationmounthInputResponse.classList.add("error");
            expirationdateResponce.innerHTML = "Wrong format, number only";
            return false;
        }
    }
}

function expirationyearChecking(expirationyear, expirationmounth){

    const expirationyearInputResponse = document.querySelector("#expirationdateyear");
    const expirationdateResponce = document.querySelector("#response-date");

    if(expirationyear.length == 0){
        expirationyearInputResponse.classList.add("error");
        expirationdateResponce.innerHTML = "can't be blank";
        return false;
    }else{
        if(/^[0-9]*$/.test(expirationyear)){

            if(expirationyear.length == 2){
                if(expirationmounthChecking(expirationmounth)){
                    console.log(expirationmounthChecking(expirationmounth));
                    expirationdateResponce.innerHTML = "";
                    return true;
                }else{
                    console.log(expirationmounthChecking(expirationmounth));
                    expirationyearInputResponse.classList.remove("error");
                    return true;
                }

            }else{
                expirationyearInputResponse.classList.add("error");
                expirationdateResponce.innerHTML = "Wrong format, year have 2 numbers";
                return false;
            }

        }else{
            expirationyearInputResponse.classList.add("error");
            expirationdateResponce.innerHTML = "Wrong format, number only";
            return false;
        }
    }
}


/*** CVC */

function cvcChecking(cvc){
    const cvcInputResponse = document.querySelector("#cvc");
    const cvcResponse = document.querySelector("#response-cvc");

    if(cvc.length == 0){
        cvcInputResponse.classList.add("error");
        cvcResponse.innerHTML = "can't be blank";
        return false;
    }else{
        if(/^[0-9]*$/.test(cvc)){

            if(cvc.length == 3){
                cvcInputResponse.classList.remove("error");
                cvcResponse.innerHTML = "";
                return true;
            }else{
                cvcInputResponse.classList.add("error");
                cvcResponse.innerHTML = "Wrong format, cvc have 3 numbers";
                return false;
            }

        }else{
            cvcInputResponse.classList.add("error");
            cvcResponse.innerHTML = "Wrong format, number only";
            return false;
        }
    }
}