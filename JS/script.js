'use strict';

////////////////////////
/* Menu Variables */
////////////////////////

const menuBtns = document.getElementsByClassName('mobile_menu_btn');
const mobileMenu = document.querySelector('.mobile_menu_container');
const menuOverlay = document.querySelector('.mobile_menu_overlay');

//// Loop for Menu Buttons ////
for (const menuBtn of menuBtns) {
    menuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('closed')) {
            mobileMenu.classList.replace('closed', 'open');
            menuOverlay.classList.replace('overlay_inactive', 'overlay_active')
        } else if (mobileMenu.classList.contains('open')) {
            mobileMenu.classList.replace('open', 'closed');
            menuOverlay.classList.replace('overlay_active', 'overlay_inactive')
        };
    });
};

menuOverlay.addEventListener('click', () => {
    mobileMenu.classList.replace('open', 'closed');
    menuOverlay.classList.replace('overlay_active', 'overlay_inactive')
    
})

////////////////////////
/* Form Variables */
////////////////////////

const form = document.querySelector('form');

const formFields = document.querySelectorAll('input, textarea');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const companyField = document.getElementById('company');
const commentBox = document.getElementById('comments');

const submitBtn = document.querySelector('button[type="submit"]');

let isValid = true;

////////////////////////
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

////////////////////////
/* Functions */
////////////////////////

let formatPhoneNumber = function () {
    // const cleaned = ('' + phoneNumberString).replace(/\D/g, "");
    // // const matched = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    // // if (matched) {
    // //     return phoneField.value = '(' + matched[1] + ')-' + matched[2] + '-' + matched[3];
    // // }

    if (phoneField.value.length == 3) {
        return phoneField.value = '(' + phoneField.value.slice(0,3) + ')-' + phoneField.value.slice(3);
    } else if (phoneField.value.length == 9) {
        return phoneField.value = phoneField.value.slice(0,9) + '-'
    }

    return null
}

let phoneNumber = function () {
    let phoneNum = phoneField.value;
    phoneNum = formatPhoneNumber(phoneNum);
}

function formValidation () {

    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

    const phoneRegex = /^(\(\d{3}\))-\d{3}-\d{4}$/; 

    let error = function (field, msg) {
        field.style.borderColor = 'red';
        field.nextElementSibling.style.display = 'block';
        field.nextElementSibling.innerText = msg;
        return isValid = false
    }

/* ========================
If fields are empty
=========================== */

    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value == '') {
            error(formFields[i], 'Cannot be blank.');
        } else {
            formFields[i].style.borderColor = 'var(--accent-color-2)';
            formFields[i].nextElementSibling.style.display = 'none';
            isValid = true;
        };
    };

    /* ========================
    Name 
    =========================== */

    if (nameField.value.match('[0-9]+')) {
        error(nameField, `Cannot contain numbers.`);
    };

    /* ========================
    Phone Number
    =========================== */

    if (phoneField.value.match('[a-z]+') || (phoneField.value.length >= 1 && phoneField.value.length < 10)) {
        error(phoneField, 'Please enter a valid US Telephone Number.');
    } else if (phoneRegex.test(phoneField.value) == false) {
        error(phoneField, 'Please use (XXX)-XXX-XXX number format')
    };


    /* ========================
    Email
    =========================== */

    if (emailRegex.test(emailField.value) == false && emailField.value.length >= 1) {
        error(emailField, 'Please enter a valid email.');
    };

    /* ========================
    Company
    =========================== */
    
    if (companyField.value.length < 1) {
        error(companyField, 'Cannot be blank')
    }


    /* ========================
    Comments
    =========================== */

    if (commentBox.value.length >= 1 & commentBox.value.length <= 49) {
        error(commentBox, 'Must be at least 50 characters.');
    };

    /* ========================
    Completed Form Validation
    =========================== */

    if (isValid == true) {
        form.submit();
    }


}

/////////////////////////////////
/* Buttons */
/////////////////////////////////
phoneField.addEventListener('keypress', phoneNumber);
submitBtn.addEventListener('click', formValidation);

