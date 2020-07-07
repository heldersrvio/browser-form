function validateInputs(doc = document) {
    const inputs = [...doc.querySelectorAll('input')];
    const form = doc.querySelector('form');
    const passwordInput = doc.getElementById('password');

    function isValid(inputElement) {
        if (inputElement.id !== 'password-confirmation') {
            return inputElement.checkValidity();
        } else {
            return inputElement.checkValidity() && inputElement.value === passwordInput.value;
        }
    }

    function displayErrorMessage(elementId) {
        const span = doc.getElementById(`${elementId}-error`);
        const element = doc.getElementById(`${elementId}`);
        if (!isValid(element)) {
            if (element.validity.valueMissing) {
                span.textContent = 'Input field empty';
            } else if (element.validity.typeMismatch) {
                span.textContent = 'Invalid email';
            } else if (element.validity.patternMismatch) {
                span.textContent = 'Invalid zip code';
            } else if (element.validity.tooLong) {
                span.textContent = 'Maximum length exceeded';
            } else if (element.validity.tooShort) {
                span.textContent = 'Too short';
            } else {
                span.textContent = 'Password does not match';
            }
            element.classList.add('invalid');
        } else {
            span.textContent = '';
            element.classList.remove('invalid');
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('focusout', () => {
            displayErrorMessage(input.id);
        });
    });

    form.addEventListener('submit', (event) => {
        inputs.forEach((input) => {
            if (!isValid(input)){
                displayErrorMessage(input.id);
                event.preventDefault();
            }
        });
    });

}

validateInputs(document);