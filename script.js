// ======================= Hamburger Menu Functionality =======================
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ======================= Animated Counter for Stats Section =======================

const statNumbers = document.querySelectorAll('.animated-number');
let hasAnimated = false;

// Function to start the counter animation
function startCounter(element) {
    const target = parseInt(element.getAttribute('data-target') || element.textContent.replace('K', '000').replace(/\s/g, ''));
    let count = 0;
    const increment = target / 100;

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.round(count);
        if (element.textContent.includes('K')) {
            displayValue = (displayValue / 1000).toFixed(1) + 'K';
            if (displayValue === '2.0K') displayValue = '2K';
        }
        element.textContent = displayValue;
        
    }, 20);
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Listen for scroll events to trigger the animation
window.addEventListener('scroll', () => {
    if (!hasAnimated && isElementInViewport(document.querySelector('.stats-section'))) {
        hasAnimated = true;
        statNumbers.forEach(startCounter);
    }
});