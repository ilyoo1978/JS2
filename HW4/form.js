class Validator {
    constructor(id) {
        this.form = document.getElementById(id);
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errorMessage = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.valid = false;
        this._validateForm(this.form);
    }
    _validateForm(form) {
        let inputs = [...form.getElementsByTagName('input')];
        inputs.forEach(input => {
            this._validateLine(input);
        });
        if (![...form.getElementsByClassName('invalid')].length) {
            this.valid = true;
        }
    }
    _validateLine(input) {
        if (!this.patterns[input.name].test(input.value)) {
            input.classList.remove('valid');
            if (!input.classList.contains('invalid')) {
                input.classList.add('invalid');
                this._showErrorMessage(input);
                this._watchInput(input);
            }
        } else {
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                input.parentNode.querySelector('.error-msg').remove();

            }
            input.classList.add('valid');
        }
    }
    _showErrorMessage(input) {
        input.parentNode.insertAdjacentHTML('beforeend', `<div class="error-msg">${this.errorMessage[input.name]}</div>`);
    }
    _watchInput(input) {
        input.addEventListener('input', e => {
            this._validateLine(input);
        })
    }

}
document.getElementById('myForm').addEventListener('submit', e => {
    let validator = new Validator('myForm');

    if (!validator.valid) {
        e.preventDefault();
    }
});