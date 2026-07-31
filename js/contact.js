function initContactForm() {
    const form = document.getElementById('contact-form');
    const successAlert = document.getElementById('form-success');
    const errorAlert = document.getElementById('form-error');
    const validationAlert = document.getElementById('form-validation-error');

    if (!form) return;

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Блокируем перезагрузку и переход на Formspree

        // Сбрасываем плашки уведомлений перед новой попыткой
        successAlert.style.display = 'none';
        errorAlert.style.display = 'none';
        validationAlert.style.display = 'none';
        validationAlert.innerHTML = '';

        // 1. СТАНДАРТНАЯ ПРОВЕРКА ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ (Имя, Email, Сообщение)
        if (!form.checkValidity()) {
            validationAlert.innerHTML = '• Please fill out all required fields correctly (Name, Email, and Message).';
            validationAlert.style.display = 'block';
            return;
        }

        // Получаем и очищаем значение из поля телефона
        const phoneInput = document.getElementById('phone')?.value.trim() || '';
        let errors = [];

        // 2. УМНАЯ ВАЛИДАЦИЯ НОМЕРА ТЕЛЕФОНА (если поле заполнено)
        if (phoneInput.length > 0) {
            // Удаляем пробелы, скобки, дефисы и плюсы для чистой проверки цифр
            const cleanedPhone = phoneInput.replace(/[\s()+-]/g, ''); 
            // Проверяем, что осталось от 7 до 15 цифр
            const phoneRegex = /^[1-9]\d{6,14}$/; 
            
            if (!phoneRegex.test(cleanedPhone)) {
                errors.push('• <b>Phone Number</b> must be a valid international number (e.g., +1 (234) 567-8900).');
            }
        }

        // Если обнаружены ошибки в телефоне, прерываем отправку
        if (errors.length > 0) {
            validationAlert.innerHTML = errors.join('<br>');
            validationAlert.style.display = 'block';
            return;
        }

        // ЕСЛИ ВСЁ В ПОРЯДКЕ — ОТПРАВЛЯЕМ ДАННЫЕ ЧЕРЕЗ AJAX (FETCH)
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        try {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

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
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}
