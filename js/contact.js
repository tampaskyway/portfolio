/**
 * Модуль асинхронной отправки контактной формы с валидацией
 */
export function initContactForm() {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("form-success");
    const errorMessage = document.getElementById("form-error");
    const submitBtn = document.getElementById("submit-btn");

    if (!form) return;

    // Вспомогательная функция для проверки корректности контактов
    function validateContact(inputString) {
        if (inputString.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(inputString);
        }
        if (inputString.startsWith('@')) {
            return inputString.length >= 5;
        }
        return false;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const contactInput = document.getElementById("email");
        const contactValue = contactInput ? contactInput.value.trim() : "";

        successMessage.style.display = "none";
        errorMessage.style.display = "none";

        // Проверяем введенные контактные данные
        if (!validateContact(contactValue)) {
            if (contactInput) {
                contactInput.style.borderColor = "#dc3545";
                contactInput.focus();
            }
            errorMessage.innerText = "Please enter a valid email address or @username for Telegram.";
            errorMessage.style.display = "block";
            return; 
        }

        if (contactInput) contactInput.style.borderColor = "";

        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            submitBtn.disabled = false;
            submitBtn.innerText = "Send message";

            if (response.ok) {
                successMessage.style.display = "block";
                form.reset();
            } else {
                errorMessage.innerText = "Oops! There was a problem submitting your form.";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.innerText = "Send message";
            errorMessage.innerText = "Oops! There was a problem submitting your form.";
            errorMessage.style.display = "block";
        }
    });
}