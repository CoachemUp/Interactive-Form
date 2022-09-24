/*************
 * Name Field
 ************/

//onload function to focus on name field when window loads
window.onload = function () {
    document.getElementById("name").focus();
};

/*******************
 * Job Role Section
 *******************/

//hiding the 'Other Job Role' text field when window loads
let otherJobRole = document.getElementById("other-job-role");
otherJobRole.style.display = "none";
//showing 'other job role' if other is selected in job role
let jobRole = document.getElementById("title");
jobRole.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
});

/*******************
 * T-Shirt Section
 *******************/

//Variables
let design = document.getElementById("shirt-designs");
let shirtColor = document.getElementById("color");
let colorOption = shirtColor.children;
//disabling the color option
shirtColor.disabled = true;
//enabling the color option and displaying the proper color
design.addEventListener("change", (e) => {
    shirtColor.disabled = false;
    for (i = 0; i < colorOption.length; i++) {
        let value = e.target.value;
        let colorValue = colorOption[i].getAttribute("data-theme");
        if (value === colorValue) {
            colorOption[i].hidden = false;
        } else {
            colorOption[i].hidden = true;
        }
    }
});

/**************************************
 * Register For Activities Section
 *************************************/

//Variables
let activities = document.getElementById("activities");
let activitiesCost = document.getElementById("activities-cost");
let totalPrice = 0;
//adding or subtracting the cost of each activity
activities.addEventListener("change", (e) => {
    let cost = e.target.getAttribute("data-cost");
    let totalCost = +cost;
    if (e.target.checked) {
        totalPrice += totalCost;
    } else {
        totalPrice -= totalCost;
    }
    //adding a running cost to html
    activitiesCost.innerHTML = "Total: $" + totalPrice;
});

/************************
 * Payment info Section
 ***********************/

//Variables
let payWith = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let payPal = document.getElementById("paypal");
let bitCoin = document.getElementById("bitcoin");
//hide non credit card
payPal.style.display = "none";
bitCoin.style.display = "none";
//credit card is auto selected in payment info
payWith.children.item(1).setAttribute("selected", "select");
//eventlistener to show payment selected and hide others
payWith.addEventListener("change", (e) => {
    if (e.target.value === "paypal") {
        creditCard.style.display = "none";
        bitCoin.style.display = "none";
        payPal.style.display = "block";
    } else {
        creditCard.style.display = "block";
        bitCoin.style.display = "none";
        payPal.style.display = "none";
    }
    if (e.target.value === "bitcoin") {
        creditCard.style.display = "none";
        payPal.style.display = "none";
        bitCoin.style.display = "block";
    }
});
/************************
 *     Form Validation
 ***********************/

//Variables
let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let cardNumber = document.getElementById("cc-num");
let zipCode = document.getElementById("zip");
let cvv = document.getElementById("cvv");
let form = document.querySelector("form");

//helper functions
//required function
const required = (value) => (value === "" ? false : true);
//credit card length of number function
const length = (length, min, max) =>
    length < min || length > max ? false : true;
//email valid format function
const validEmail = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
//show error when fields are not valid
const showError = (input) => {
    const formField = input.parentElement;
   // formField.classList.remove("valid");
    formField.classList.add("not-valid");
};
//show valid when fields are  valid
const showValid = (input) => {
    const formField = input.parentElement;
   // formField.classList.remove("not-valid");
    formField.classList.add("valid");
};
/**
 * *********************************
 * Validating each required fields
 **********************************/
//validating the name field
const checkName = () => {
    let valid = false;
    let name = userName.value.trim();
    let nameInput = name.value;
    let fullName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!required(name)) {
        showError(userName);
        document.getElementById("name-hint").style.display = "block";
    } else
        if (!fullName.test(nameInput)) {
            showError(userName);
        } else {
            showValid(userName);
            valid = true;
        }
    return valid;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isNameValid = checkName();

    let isFormValid = isNameValid;

    if (isFormValid) {
    }
});
