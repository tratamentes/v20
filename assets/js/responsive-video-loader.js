/**
 * Carregador de Vídeo Responsivo para TrataMentes
 * Carrega o vídeo apropriado com base no tamanho da tela
 */

// Modificação HTML necessária:
// 1. Remova o atributo "src" dos elementos source do seu vídeo
// 2. Adicione um id ao elemento vídeo: id="responsive-video"
// 3. Mantenha apenas o atributo "type" nos elementos source
// 4. Adicione data-sizes aos elementos source com o formato abaixo

document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('responsive-video');
    
    // Se o vídeo não existe na página, não faz nada
    if (!videoElement) return;
    
    // Definições dos tamanhos de vídeo disponíveis
    const videoSizes = {
      small: {
        maxWidth: 767, // Mobile (<768px)
        webm: '/assets/video/terapia-craniana-small.webm',
        mp4: '/assets/video/terapia-craniana-small.mp4'
      },
      medium: {
        maxWidth: 1023, // Tablet (768px-1024px)
        webm: '/assets/video/terapia-craniana-medium.webm',
        mp4: '/assets/video/terapia-craniana-medium.mp4'
      },
      large: {
        maxWidth: 1599, // Desktop (1025px-1600px)
        webm: '/assets/video/terapia-craniana-large.webm',
        mp4: '/assets/video/terapia-craniana-large.mp4'
      },
      extraLarge: {
        maxWidth: Infinity, // Telas muito grandes (>1600px)
        webm: '/assets/video/terapia-craniana-extra-large.webm',
        mp4: '/assets/video/terapia-craniana-extra-large.mp4'
      }
    };
    
    // Função para determinar qual tamanho de vídeo carregar
    function getVideoSizeToLoad() {
      const screenWidth = window.innerWidth;
      
      // Verificar da menor para a maior largura
      if (screenWidth <= videoSizes.small.maxWidth) return 'small';
      if (screenWidth <= videoSizes.medium.maxWidth) return 'medium';
      if (screenWidth <= videoSizes.large.maxWidth) return 'large';
      return 'extraLarge';
    }
    
    // Função para carregar o vídeo adequado
    function loadAppropriateVideo() {
      const sizeToLoad = getVideoSizeToLoad();
      const sources = videoElement.querySelectorAll('source');
      
      sources.forEach(source => {
        const type = source.getAttribute('type');
        
        if (type === 'video/webm') {
          source.setAttribute('src', videoSizes[sizeToLoad].webm);
        } else if (type === 'video/mp4') {
          source.setAttribute('src', videoSizes[sizeToLoad].mp4);
        }
      });
      
      // Recarrega o vídeo para aplicar as novas fontes
      videoElement.load();
      
      // Se o vídeo estava tocando, retoma a reprodução
      if (!videoElement.paused) {
        videoElement.play().catch(e => {
          console.log('Falha ao retomar a reprodução automática:', e);
        });
      }
    }
    
    // Adicionar carregamento lazy
    function setupLazyLoading() {
      // Remover os src inicialmente
      const sources = videoElement.querySelectorAll('source');
      sources.forEach(source => {
        source.removeAttribute('src');
      });
      
      // Usar Intersection Observer para carregar o vídeo quando visível
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadAppropriateVideo();
              observer.unobserve(entry.target);
            }
          });
        }, { rootMargin: '200px 0px' }); // Pré-carrega quando o vídeo estiver a 200px de entrar na viewport
        
        observer.observe(videoElement);
      } else {
        // Fallback para navegadores sem suporte a IntersectionObserver
        loadAppropriateVideo();
      }
    }
    
    // Configurar redimensionamento de tela
    function setupResizeHandling() {
      let resizeTimer;
      
      window.addEventListener('resize', function() {
        // Usar debounce para evitar muitas chamadas durante redimensionamento
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          loadAppropriateVideo();
        }, 200);
      });
    }
    
    // Inicializar
    setupLazyLoading();
    setupResizeHandling();
  });