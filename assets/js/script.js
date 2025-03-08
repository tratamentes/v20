// Efeito de scroll para navegação
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// Accordion para as FAQs
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        // Fecha todos os outros itens
        accordionItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Alterna o estado do item atual
        item.classList.toggle('active');
    });
});

/* Script para o FAQ e Modal de Agendamento */
document.addEventListener('DOMContentLoaded', function () {
    // Script para as FAQs
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Toggle a classe active no item atual
            item.classList.toggle('active');

            // Fechar outros itens (comportamento de acordeão)
            faqItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});