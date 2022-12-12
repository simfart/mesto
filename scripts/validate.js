const checkInputValidity = (input, config) => {
    const error = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
        error.textContent = "";
        error.classList.remove(config.errorClass);
        input.classList.remove(config.inputErrorClass);
    } else {
        error.textContent = input.validationMessage;
        error.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
    }
};

const toggleButton = (inputs, btn, config) => {
    const isformValid = inputs.every((input) => input.validity.valid);

    if (isformValid) {
        btn.classList.remove(config.inactiveButtonClass);
        btn.disabled = "";
    } else {
        btn.classList.add(config.inactiveButtonClass);
        btn.disabled = "disable";
    }
};

const enableValidation = (config) => {
    const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;
    const forms = [...document.querySelectorAll(formSelector)];
    
    forms.forEach((form) => {
        const inputs = [...form.querySelectorAll(inputSelector)];
        const btn = form.querySelector(submitButtonSelector);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                checkInputValidity(input, restConfig);
                toggleButton(inputs, btn, restConfig);
            });
        });
    });
};

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_invalid",
    inputErrorClass: "popup__item_error",
    errorClass: "popup__error_visible",
};


enableValidation(config);
