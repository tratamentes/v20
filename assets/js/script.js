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

    // Seletor de Paletas de Cores
    document.addEventListener('DOMContentLoaded', function () {
        // Inicializar o seletor de paletas
        const paletteOptions = document.querySelectorAll('.palette-option');
        const toggleButton = document.querySelector('.palette-switcher-toggle');
        const paletteSwitcher = document.querySelector('.palette-switcher');

        // Inicializar o accordion
        const firstAccordionItem = document.querySelector('.accordion-item');
        if (firstAccordionItem) {
            firstAccordionItem.classList.add('active');
        }

        // Função para aplicar a paleta selecionada
        function applyPalette(paletteName) {
            // Remover todas as classes de paletas do elemento html
            document.documentElement.classList.remove(
                'palette-glamour',
                'palette-pastel',
                'palette-therapeutic',
                'palette-earthy',
                'palette-olive',
                'palette-terracotta',
                'palette-coffee',
                'palette-eucalyptus'
            );

            // Adicionar a classe da paleta selecionada
            document.documentElement.classList.add(paletteName);

            // Salvar a preferência no localStorage
            localStorage.setItem('selectedPalette', paletteName);

            // Destacar a opção selecionada visualmente
            paletteOptions.forEach(opt => {
                if (opt.dataset.palette === paletteName.replace('palette-', '')) {
                    opt.style.fontWeight = 'bold';
                } else {
                    opt.style.fontWeight = 'normal';
                }
            });
        }

        // Adicionar listeners para cada opção de paleta
        paletteOptions.forEach(option => {
            option.addEventListener('click', function () {
                const paletteName = 'palette-' + this.dataset.palette;
                applyPalette(paletteName);
            });
        });

        // Colapsar/expandir o seletor de paletas
        toggleButton.addEventListener('click', function () {
            paletteSwitcher.classList.toggle('collapsed');
            this.textContent = paletteSwitcher.classList.contains('collapsed') ? '+' : '−';
        });

        // Carregar paleta salva anteriormente
        const savedPalette = localStorage.getItem('selectedPalette');
        if (savedPalette) {
            applyPalette(savedPalette);
        } else {
            // Se não houver paleta salva, usar 'palette-earthy' como padrão
            applyPalette('palette-earthy');
        }
    });