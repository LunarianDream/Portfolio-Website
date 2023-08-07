////////////////////////
/* Menu Variables */
////////////////////////

const menuBtns = document.getElementsByClassName('mobile_menu_btn');
const mobileMenu = document.querySelector('.mobile_menu_container');
const menuOverlay = document.querySelector('.mobile_menu_overlay');

for (const menuBtn of menuBtns) {
    menuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('closed')) {
            mobileMenu.classList.add('open');
            mobileMenu.classList.remove('closed');
            menuOverlay.classList.remove('overlay_inactive');
            menuOverlay.classList.add('overlay_active')
        } else if (mobileMenu.classList.contains('open')) {
            mobileMenu.classList.add('closed');
            mobileMenu.classList.remove('open');
            menuOverlay.classList.remove('overlay_active');
            menuOverlay.classList.add('overlay_inactive')
        };
    });
};

menuOverlay.addEventListener('click', () => {
    mobileMenu.classList.add('closed');
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('overlay_active');
    menuOverlay.classList.add('overlay_inactive')
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

/* ========================
If fields are empty
=========================== */

    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value == '') {
            formFields[i].style.borderColor = 'red';
            formFields[i].nextElementSibling.style.display = 'block';
            isValid = false;
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
        nameField.style.borderColor = 'red';
        nameField.nextElementSibling.style.display = 'block';
        nameField.nextElementSibling.innerText = `Cannot contain numbers.`
        isValid = false;
    };

    /* ========================
    Phone Number
    =========================== */

    if (phoneField.value.match('[a-z]+') || phoneField.value.length < 10) {
        phoneField.style.borderColor = 'red';
        phoneField.nextElementSibling.style.display = 'block';
        isValid = false;
    } else {
        phoneField.style.borderColor = 'var(--accent-color-2)';
        phoneField.nextElementSibling.style.display = 'none';
        isValid = true;
    };

    /* ========================
    Email
    =========================== */

    if (emailRegex.test(emailField.value) == false) {
        emailField.style.borderColor = 'red';
        emailField.nextElementSibling.style.display = 'block';
        isValid = false;
    // } else {
    //     emailField.style.borderColor = 'var(--accent-color-2)';
    //     emailField.nextElementSibling.style.display = 'none';
    //     isValid = true;
    };

    /* ========================
    Company
    =========================== */



    /* ========================
    Comments
    =========================== */

    if (commentBox.value.length < 50) {
        commentBox.style.borderColor = 'red';
        commentBox.nextElementSibling.style.display = 'block';
        commentBox.nextElementSibling.innerText = `Must be at least 50 characters.`
        isValid = false;
    };

    /* ========================
    Completed Form Validation
    =========================== */

    if (isValid == true) {
        form.submit();
    }


}

/////////////////////////////////
/* Butons */
/////////////////////////////////

submitBtn.addEventListener('click', formValidation);
