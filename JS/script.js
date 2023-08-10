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

function formValidation () {

    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

    let error = function (field, msg) {
        field.style.borderColor = 'red';
        field.nextElementSibling.style.display = 'block';
        field.nextElementSibling.innerText = msg;
        isValid = false
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
        // nameField.nextElementSibling.innerText = `Cannot contain numbers.`
    };

    /* ========================
    Phone Number
    =========================== */

    if (phoneField.value.match('[a-z]+') || phoneField.value.length < 10) {
        error(phoneField, 'Please enter a valid US Telephone Number.');
    };

    /* ========================
    Email
    =========================== */

    if (emailRegex.test(emailField.value) == false) {
        error(emailField, 'Please enter a valid email.');
    };

    /* ========================
    Company
    =========================== */



    /* ========================
    Comments
    =========================== */

    if (commentBox.value.length < 50) {
        // commentBox.nextElementSibling.innerText = `Must be at least 50 characters.`
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

submitBtn.addEventListener('click', formValidation);
