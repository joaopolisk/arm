// Dados dos produtos
const productsData = {
    camiseta: {
        name: "Camiseta Fitness",
        price: "R$ 89,90",
        image: "images/camiseta.jpg",
        description: "Camiseta fitness de alta qualidade, confeccionada em tecido dry-fit que proporciona máximo conforto durante os treinos. Material respirável e de secagem rápida, ideal para atividades físicas intensas."
    },
    leg: {
        name: "Leg Fitness",
        price: "R$ 129,90",
        image: "images/1615.jpg",
        description: "Legging fitness com tecnologia de compressão graduada, oferecendo suporte muscular e melhor performance. Tecido elástico de alta qualidade que acompanha todos os movimentos do corpo."
    },
    luva: {
        name: "Luva de Treino",
        price: "R$ 49,90",
        image: "images/luva.jpg",
        description: "Luvas de treino com proteção palmar em borracha, ideais para musculação e crossfit. Proporcionam melhor aderência e protegem as mãos contra calos e lesões."
    },
    proteina: {
        name: "Whey Protein",
        price: "R$ 159,90",
        image: "images/proteina.jpg",
        description: "Whey Protein concentrado de alta qualidade, rico em aminoácidos essenciais. Ideal para recuperação muscular pós-treino e ganho de massa magra. Sabor chocolate."
    },
    creatina: {
        name: "Creatina",
        price: "R$ 79,90",
        image: "images/creatina.jpg",
        description: "Creatina monohidratada pura, suplemento essencial para aumento de força e potência muscular. Produto micronizado para melhor absorção e dissolução."
    },
    "pre-treino": {
        name: "Pré-Treino",
        price: "R$ 99,90",
        image: "images/pre_treino.jpg",
        description: "Suplemento pré-treino com cafeína, beta-alanina e outros ingredientes que aumentam a energia, foco e resistência durante os exercícios. Sabor frutas vermelhas."
    }
};

// Elementos DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close');
const productCards = document.querySelectorAll('.product-card');
const ctaButton = document.querySelector('.cta-button');

// Função para toggle do menu mobile
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Função para fechar o menu mobile
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Função para abrir modal do produto
function openProductModal(productKey) {
    const product = productsData[productKey];
    if (!product) return;

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDescription').textContent = product.description;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal
function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função para scroll suave
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para simular adicionar ao carrinho
function addToCart() {
    // Animação de feedback
    const button = document.querySelector('.add-to-cart-btn');
    const originalText = button.textContent;
    
    button.textContent = 'Adicionado!';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#FCB81E';
        closeProductModal();
        
        // Mostrar notificação
        showNotification('Produto adicionado ao carrinho!');
    }, 1500);
}

// Função para mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #FCB81E;
        color: #241E20;
        padding: 1rem 2rem;
        border-radius: 5px;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para animação de entrada dos elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Função para lazy loading de imagens
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    hamburger.addEventListener('click', toggleMobileMenu);

    // Fechar menu ao clicar nos links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });

    // Produtos - abrir modal
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productKey = card.getAttribute('data-product');
            openProductModal(productKey);
        });
    });

    // Fechar modal
    closeModal.addEventListener('click', closeProductModal);
    
    // Fechar modal clicando fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });

    // Botão CTA
    ctaButton.addEventListener('click', () => {
        smoothScroll('#produtos');
    });

    // Adicionar ao carrinho
    document.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);

    // Scroll animations
    window.addEventListener('scroll', animateOnScroll);

    // Inicializar animações
    animateOnScroll();
    
    // Lazy loading
    lazyLoadImages();

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeProductModal();
        }
    });
});

// Adicionar estilos CSS para animações via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .product-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    /* Melhorias de performance */
    .product-card:hover {
        will-change: transform;
    }

    /* Scroll suave para navegadores que não suportam */
    @media (prefers-reduced-motion: no-preference) {
        html {
            scroll-behavior: smooth;
        }
    }

    /* Estados de loading */
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }

    /* Feedback visual para botões */
    .btn-loading {
        position: relative;
        color: transparent;
    }

    .btn-loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border: 2px solid #241E20;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

document.head.appendChild(style);

// Função para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimizar scroll listener
const optimizedScrollHandler = debounce(animateOnScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Preload de imagens críticas
function preloadImages() {
    const criticalImages = [
        'images/hero_background.png',
        'images/logo.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar preload
preloadImages();

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

