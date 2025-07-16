// Global variables
let currentSlide = 1;
const totalSlides = 10;
let isTransitioning = false;

// DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const expandIcon = fullscreenBtn.querySelector('.expand-icon');
const compressIcon = fullscreenBtn.querySelector('.compress-icon');
let increaseFontBtn, decreaseFontBtn;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSlideVisibility();
    updateNavigation();
    updateProgress();
    initializeKeyboardNavigation();
    initializeTouchNavigation();
    initializeCharts();
    initializeFullscreen();
    initializeFontSizeControls();
    initializeLogoNavigation();
});

// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides && !isTransitioning) {
        currentSlide++;
        transitionToSlide();
    }
}

function prevSlide() {
    if (currentSlide > 1 && !isTransitioning) {
        currentSlide--;
        transitionToSlide();
    }
}

function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides && slideNumber !== currentSlide && !isTransitioning) {
        currentSlide = slideNumber;
        transitionToSlide();
    }
}

function transitionToSlide() {
    isTransitioning = true;
    
    // Remove all active and transition classes
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    
    // Add appropriate classes
    slides[currentSlide - 1].classList.add('active');
    
    // Add prev class to slides before current
    for (let i = 0; i < currentSlide - 1; i++) {
        slides[i].classList.add('prev');
    }
    
    updateNavigation();
    updateProgress();
    
    // Toggle body class for hero slide
    if (currentSlide === 1) {
        document.body.classList.add('on-hero');
    } else {
        document.body.classList.remove('on-hero');
    }
    
    // Reset transition flag
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

function updateSlideVisibility() {
    slides.forEach((slide, index) => {
        if (index === currentSlide - 1) {
            slide.classList.add('active');
        } else if (index < currentSlide - 1) {
            slide.classList.add('prev');
        }
    });
    
    // Toggle body class for hero slide
    if (currentSlide === 1) {
        document.body.classList.add('on-hero');
    } else {
        document.body.classList.remove('on-hero');
    }
}

function updateNavigation() {
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

function updateProgress() {
    const progressPercentage = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progressPercentage}%`;
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'Escape') {
            goToSlide(2); // Go to table of contents
        } else if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    });
}

// Touch navigation
function initializeTouchNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Fullscreen functionality
function initializeFullscreen() {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Listen for fullscreen change events
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);
}

function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && !document.msFullscreenElement) {
        // Enter fullscreen
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function updateFullscreenButton() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || 
                        document.mozFullScreenElement || document.msFullscreenElement;
    
    if (isFullscreen) {
        expandIcon.style.display = 'none';
        compressIcon.style.display = 'block';
    } else {
        expandIcon.style.display = 'block';
        compressIcon.style.display = 'none';
    }
}

// Tab functionality for Employment Practices slide
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(tabName);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Initialize charts
function initializeCharts() {
    // Chart for FCF Penalties (Slide 7)
    const penaltyCanvas = document.getElementById('penaltyChart');
    if (penaltyCanvas) {
        const ctx = penaltyCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Minimum Debarment', 'Maximum Debarment'],
                datasets: [
                    {
                        label: 'Previous (months)',
                        data: [6, 12],
                        backgroundColor: 'rgba(156, 163, 175, 0.8)',
                        borderColor: 'rgba(156, 163, 175, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Current (months)',
                        data: [12, 24],
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Enhanced FCF Penalties Comparison',
                        color: '#fff',
                        font: {
                            size: 16
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#fff'
                        }
                    }
                }
            }
        });
    }
}

// Add smooth scroll to slide transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSlide = document.getElementById(targetId);
        if (targetSlide) {
            const slideIndex = Array.from(slides).indexOf(targetSlide) + 1;
            goToSlide(slideIndex);
        }
    });
});

// Add entrance animations when slide becomes active
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all content elements
document.querySelectorAll('.content-wrapper').forEach(el => {
    observer.observe(el);
});

// Preload images
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
        'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&q=80',
        'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1920&q=80',
        'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
        'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=1920&q=80',
        'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1920&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

preloadImages();

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize charts on resize
        initializeCharts();
    }, 250);
});

// Font Size Controls
let fontScale = 1;
const minFontScale = 0.8;
const maxFontScale = 1.5;
const fontScaleStep = 0.1;

function initializeFontSizeControls() {
    // Find the DOM elements
    increaseFontBtn = document.getElementById('increaseFontBtn');
    decreaseFontBtn = document.getElementById('decreaseFontBtn');
    
    // Load saved font scale from localStorage
    const savedFontScale = localStorage.getItem('tafep-font-scale');
    if (savedFontScale) {
        fontScale = parseFloat(savedFontScale);
        updateFontScale();
    }

    // Add event listeners
    if (increaseFontBtn) {
        increaseFontBtn.addEventListener('click', increaseFontSize);
    }
    
    if (decreaseFontBtn) {
        decreaseFontBtn.addEventListener('click', decreaseFontSize);
    }

    // Update button states
    updateFontButtonStates();
}

function increaseFontSize() {
    if (fontScale < maxFontScale) {
        fontScale = Math.min(fontScale + fontScaleStep, maxFontScale);
        updateFontScale();
        saveFontScale();
        updateFontButtonStates();
    }
}

function decreaseFontSize() {
    if (fontScale > minFontScale) {
        fontScale = Math.max(fontScale - fontScaleStep, minFontScale);
        updateFontScale();
        saveFontScale();
        updateFontButtonStates();
    }
}

function updateFontScale() {
    document.documentElement.style.setProperty('--font-scale', fontScale);
    // Force a style recalculation
    document.body.offsetHeight;
}

function saveFontScale() {
    localStorage.setItem('tafep-font-scale', fontScale.toString());
}

function updateFontButtonStates() {
    if (increaseFontBtn) {
        increaseFontBtn.disabled = fontScale >= maxFontScale;
    }
    if (decreaseFontBtn) {
        decreaseFontBtn.disabled = fontScale <= minFontScale;
    }
}

// Logo Navigation
function initializeLogoNavigation() {
    const logoContainer = document.querySelector('.fixed-logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(1);
            }
        });
    }
}