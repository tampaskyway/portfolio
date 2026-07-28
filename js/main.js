import { initGallery } from 'js/gallery.js';
import { initModal } from 'js/modal.js';
import { initScrollEffects } from 'js/scroll.js';
import { initContactForm } from 'js/contact.js';

// Инициализируем все системы сайта после полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initModal();
    initScrollEffects();
    initContactForm();
});