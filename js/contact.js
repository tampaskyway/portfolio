function initContactForm() {
    const form = document.getElementById('contact-form');
    const successAlert = document.getElementById('form-success');
    const errorAlert = document.getElementById('form-error');
    const phoneInput = document.getElementById('phone').value.trim();

    if (!form) return;

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // 🔥 ГЛАВНОЕ: Блокирует переход на внешнюю страницу благодарности

        // Скрываем прошлые уведомления перед новой попыткой
        successAlert.style.display = 'none';
        errorAlert.style.display = 'none';

        // Проверяем валидность заполнения полей формы
        if (!form.checkValidity()) {
            alert('Please fill in all required fields.');
            return;
        }
// 2. Валидация телефона (вставьте рядом с проверкой WhatsApp и Telegram)
if (phoneInput.length > 0) {
    // Регулярное выражение: обязательно начинается с +, затем от 7 до 15 цифр
    const phoneRegex = /^\+[1-9]\d{7,14}$/;
    if (!phoneRegex.test(phoneInput)) {
        errors.push('• <b>Phone Number</b> must be a valid international number starting with <b>+</b> (e.g., +1234567890).');
    }
}
        // Собираем данные полей формы
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        try {
            // Визуально меняем текст на кнопке во время отправки
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Отправляем AJAX запрос на сервер Formspree
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json' // Важно для корректных ответов API Formspree
                }
            });

            if (response.ok) {
                // Если отправка успешна: показываем зеленую плашку и очищаем форму
                successAlert.style.display = 'block';
                form.reset(); 
            } else {
                // Если сервер вернул ошибку
                throw new Error('Server response was not ok.');
            }
        } catch (error) {
            // Если возникли проблемы с сетью или сервером
            errorAlert.style.display = 'block';
        } finally {
            // В любом случае возвращаем кнопке её исходный текст и активность
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}
