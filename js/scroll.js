/**
 * Модуль умного скролла, анимаций и подсветки меню
 */
export function initScrollEffects() {
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const sections = document.querySelectorAll('.hero, section');
    const artCards = document.querySelectorAll('.art-card');
    const aboutContainer = document.querySelector('.about-container');

    // 1. ПОДСВЕТКА АКТИВНЫХ ПУНКТОВ МЕНЮ
    const navObserverOptions = {
        root: null,
        rootMargin: '-10% 0px -50% 0px', 
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        if (section) navObserver.observe(section);
    });

    // 2. АНИМАЦИЯ ПЛАВНОГО ПОЯВЛЕНИЯ КАРТОЧЕК КАРТИН
    const cardsObserverOptions = {
        root: null,
        rootMargin: '0px 0px 100px 0px', // Увеличили зону: карточки начнут проявляться чуть заранее
        threshold: 0.05
    };

    const cardsObserver = new IntersectionObserver((entries, observer) => {
        let delayCount = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                setTimeout(() => {
                    card.classList.add('reveal');
                }, delayCount * 100);
                delayCount++;
                observer.unobserve(card); 
            }
        });
    }, cardsObserverOptions);

    artCards.forEach(card => {
        if (card) cardsObserver.observe(card);
    });

    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКА «ABOUT ME»
    if (aboutContainer) {
        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        aboutContainer.classList.add('reveal');
                    }, 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            root: null,
            rootMargin: '0px 0px 100px 0px',
            threshold: 0.05 
        });

        aboutObserver.observe(aboutContainer);
    }
}
