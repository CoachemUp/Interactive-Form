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

/************************
 *     HELPER FUNCTIONS
 ***********************/
//required function
const required = (value) => (value === "" ? false : true);
//email valid format function
const validEmail = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
//show error when fields are not valid
const showError = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('valid');
    formField.classList.add('not-valid');

};
//show valid when fields are  valid
const showValid = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('not-valid');
    formField.classList.add('valid');

};
/***********************************
 * Validating each required fields
 **********************************/
//validating the name field
const checkName = () => {
    let valid = false;
    let name = userName.value.trim();
    let nameInput = userName.value;
    let fullName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!required(name)) {
        showError(userName);
        document.getElementById("name-hint").style.display = "block";
    } else
        if (!fullName.test(nameInput)) {
            showError(userName);
        } else {
            showValid(userName);
            document.getElementById("name-hint").style.display = "none";
            valid = true;
        }
    return valid;
};
//validating the email field
const checkEmail = () => {
    let valid = false;
    let email = userEmail.value.trim();
    if (!validEmail(email)) {
        showError(userEmail);
        document.getElementById('email-hint').style.display = 'block';
    } else {
        showValid(userEmail);
        document.getElementById('email-hint').style.display = 'none';
        valid = true;
    }
    return valid;
};

//validating that at least one activity is selected
const checkActivities = () => {
    let valid = false;
    let totalActivities = totalPrice;
    if (totalActivities > 0) {
        showValid(activities);
        document.getElementById('activities-hint').style.display = 'none';
        valid = true;
    } else {
        showError(activities);
        document.getElementById('activities-hint').style.display = 'block';
    }
    return valid;
};

//validate cc if chosen to paywith
const validCard = /(?:\d[ -]*?){13,16}/;
function checkCard() {
    let valid = false;
    let userCard = cardNumber.value;
    if (!validCard.test(userCard)) {
        showError(cardNumber);
        document.getElementById('cc-hint').style.display = 'block';
    } else {
        showValid(cardNumber);
        document.getElementById('cc-hint').style.display = 'none';
        valid = true;
    }
    return valid;
};
//validate zip code - must contain 5 digits
const validZip = /^\d{5}$/;
function checkZip() {
    let valid = false;
    let userZip = zipCode.value;
    if (!validZip.test(userZip)) {
        showError(zipCode);
        document.getElementById('zip-hint').style.display = 'block';
    } else {
        showValid(zipCode);
        document.getElementById('zip-hint').style.display = 'none';
        valid = true;
    }
    return valid;
};
//validate CVV - must contain 3 digits
const validCvv = /^\d{3}$/;
function checkCvv() {
    let valid = false;
    let userCvv = cvv.value;
    if (!validCvv.test(userCvv)) {
        showError(cvv);
        document.getElementById('cvv-hint').style.display = 'block';
    } else {
        showValid(cvv);
        document.getElementById('cvv-hint').style.display = 'none';
        valid = true;
    }
    return valid;
};

/****************************************
 * setting up Accessibility to document *
 ***************************************/
//Focus and Blur to activities section
const checkBox = document.querySelectorAll('#activities-box input[type="checkbox"]');
checkBox.forEach(function (i) {
    i.addEventListener('focus', function () {
        i.parentElement.classList.add('focus');
    });
    i.addEventListener('blur', function () {
        i.parentElement.classList.remove('focus');
    });
});



form.addEventListener('submit', (e) => {

    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isActivitiesValid = checkActivities(),
        isCardNumberValid = checkCard(),
        isZipValid = checkZip(),
        isCvvValid = checkCvv();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isActivitiesValid &&
        isCardNumberValid &&
        isZipValid &&
        isCvvValid;

    if (isFormValid) {
        return true;
    } else {
        e.preventDefault();
    }
});
