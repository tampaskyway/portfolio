function initContactForm() {
    const form = document.getElementById('contact-form');
    const successAlert = document.getElementById('form-success');
    const errorAlert = document.getElementById('form-error');
    const validationAlert = document.getElementById('form-validation-error');

    if (!form) return;

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Блокируем перезагрузку страницы

        // Сбрасываем старые уведомления
        successAlert.style.display = 'none';
        errorAlert.style.display = 'none';
        if (validationAlert) {
            validationAlert.style.display = 'none';
            validationAlert.innerHTML = '';
        }

        // 1. ПРОВЕРКА ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ (Имя, Email, Сообщение)
        if (!form.checkValidity()) {
            if (validationAlert) {
                validationAlert.innerHTML = '• Please fill out all required fields correctly (Name, Email, and Message).';
                validationAlert.style.display = 'block';
            }
            return;
        }

        // Получаем значение телефона
        const phoneField = document.getElementById('phone');
        const phoneInput = phoneField ? phoneField.value.trim() : '';
        let errors = [];

        // 2. УМНАЯ ВАЛИДАЦИЯ НОМЕРА ТЕЛЕФОНА
        if (phoneInput.length > 0) {
            // Удаляем абсолютно всё, КРОМЕ ЦИФР
            const onlyDigits = phoneInput.replace(/\D/g, ''); 
            
            // Если после очистки осталось меньше 7 цифр или больше 15
            if (onlyDigits.length < 7 || onlyDigits.length > 15) {
                errors.push('• <b>Phone Number</b> must be a valid number containing between 7 and 15 digits.');
            }
        }

        // Если есть ошибки — выводим и стопим отправку
        if (errors.length > 0) {
            if (validationAlert) {
                validationAlert.innerHTML = errors.join('<br>');
                validationAlert.style.display = 'block';
            } else {
                // Страховка: если блока на странице нет, выводим обычный alert
                alert(errors.join('\n').replace(/<\/?[^>]+(>|$)/g, ""));
            }
            return;
        }

        // ОТПРАВКА ФОРМЫ ЧЕРЕЗ AJAX
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : 'Send Message';

        try {
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }

            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                successAlert.style.display = 'block';
                form.reset(); 
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            errorAlert.style.display = 'block';
        } finally {
            if (submitButton) {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        }
    });
}
