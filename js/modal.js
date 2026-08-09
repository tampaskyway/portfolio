/**
 * Модуль управления модальным окном просмотра картин
 */
export function initModal() {
    const modal = document.getElementById('artModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.modal-close');
    const artCards = document.querySelectorAll('.art-card');

    if (!modal || !modalImg) return;

    // Открытие окна при клике на любую карточку
    artCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-src');
            if (imgSrc) {
                modal.style.display = 'flex';
                modal.setAttribute('aria-hidden', 'false');
                modalImg.src = imgSrc;
                document.body.style.overflow = 'hidden'; // Блокируем скролл фона
            }
        });
    });

    // Функция закрытия окна
    const closeModal = () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
        document.body.style.overflow = ''; // Возвращаем скролл
    };

    // Закрытие по кнопке-крестику
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Закрытие при клике на пустую область вокруг картинки
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });

    // Закрытие по нажатию кнопки Escape на клавиатуре
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}
window.initModal = initModal;
