import { initGallery } from './gallery.js';
import { initModal } from './modal.js';
import { initScrollEffects } from './scroll.js';
import { initContactForm } from './contact.js';

// Инициализируем все системы сайта после полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initModal();
    initScrollEffects();
    initContactForm();
});