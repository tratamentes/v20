/**
 * Script para gerenciar o modal de agendamento no TrataMentes
 * Este script deve ser incluído em todas as páginas que possuem botões de agendamento
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se já existe um modal na página
    let modal = document.getElementById('bookingModal');
    
    // Se não existir, criar o modal dinamicamente
    if (!modal) {
        const modalHTML = `
            <div id="bookingModal" class="booking-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Agendar Consulta</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <noscript>
                            <div class="booking-fallback">
                                <p>Para usar o sistema de agendamento, é necessário ter o JavaScript ativado.</p>
                                <p>Como alternativa, você pode agendar diretamente no link abaixo:</p>
                                <a href="https://tratamentes.buk.pt/" class="btn btn-primary" target="_blank">Agendar no Buk.pt</a>
                            </div>
                        </noscript>
                        <iframe id="bookingIframe" class="booking-iframe" src="" frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar estilos CSS na head
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Estilos para o modal de agendamento */
            .booking-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1000;
                overflow-y: auto;
            }
            
            .modal-content {
                position: relative;
                background-color: #fff;
                margin: 50px auto;
                padding: 0;
                width: 90%;
                max-width: 900px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                overflow: hidden;
            }
            
            .modal-header {
                padding: 1rem 1.5rem;
                background-color: var(--primary);
                color: var(--text-light);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-title {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: transparent;
                border: 0;
                color: var(--text-light);
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: var(--secondary);
            }
            
            .modal-body {
                height: 600px;
            }
            
            .booking-iframe {
                width: 100%;
                height: 100%;
                border: 0;
            }
            
            .booking-fallback {
                padding: 2rem;
                text-align: center;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    margin: 20px auto;
                    width: 95%;
                }
            }
        `;
        
        document.head.appendChild(styleElement);
        
        // Adicionar o modal ao corpo da página
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
        
        // Atualizar a referência ao modal
        modal = document.getElementById('bookingModal');
    }
    
    // Elementos do Modal
    const iframe = document.getElementById('bookingIframe');
    const closeBtn = modal.querySelector('.modal-close');
    const openBtns = document.querySelectorAll('.open-booking-modal');
    
    // URL base do iframe
    const baseIframeUrl = 'https://buk.pt/tratamentes?embed=true';
    
    // Função para abrir o modal
    function openModal(service) {
        // Definir URL do iframe com o serviço específico, se fornecido
        let iframeUrl = baseIframeUrl;
        if (service) {
            iframeUrl += '&service=' + encodeURIComponent(service);
        }
        iframe.src = iframeUrl;
        
        // Exibir o modal
        modal.style.display = 'block';
        
        // Impedir rolagem da página
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Limpar o iframe para evitar continuação de processamento
        iframe.src = '';
    }
    
    // Event listeners para os botões de abertura
    openBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            openModal(service);
        });
    });
    
    // Event listener para o botão de fechar
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar o modal ao clicar fora do conteúdo
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar o modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Converter links de agendamento externos em links para o modal
    function convertExternalBookingLinks() {
        const externalLinks = document.querySelectorAll('a[href*="tratamentes.buk.pt"]');
        
        externalLinks.forEach(function(link) {
            if (!link.classList.contains('open-booking-modal')) {
                link.classList.add('open-booking-modal');
                link.setAttribute('data-service', '');
                
                // Salvar o href original como atributo data
                link.setAttribute('data-original-href', link.getAttribute('href'));
                
                // Adicionar event listener para abrir o modal
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    openModal('');
                });
            }
        });
    }
    
    // Converter links externos em modal
    convertExternalBookingLinks();
});