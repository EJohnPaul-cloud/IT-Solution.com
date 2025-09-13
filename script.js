document.addEventListener('DOMContentLoaded', () => {

    /* =================================
    1. RESPONSIVE MOBILE NAVIGATION
    ================================= */
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // You can remove or keep the line below if you don't use the 'toggle' class for an animation.
        // hamburgerMenu.classList.toggle('toggle');
    });

    /* =================================
    2. ANIMATED COUNTER FOR STATS SECTION
    ================================= */
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

    /* =================================
    3. SMOOTH SCROLLING
    ================================= */
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (document.querySelector(target)) {
                smoothScroll(target);
                // Close mobile menu after clicking a link
                navLinks.classList.remove('nav-active');
                hamburgerMenu.classList.remove('toggle');
            }
        });
    });

    /* =================================
    4. STICKY HEADER ON SCROLL
    ================================= */
    const mainHeader = document.querySelector('.main-header');
    const stickyPoint = 50; // Distance to scroll before header becomes sticky

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyPoint) {
            mainHeader.classList.add('sticky-header');
        } else {
            mainHeader.classList.remove('sticky-header');
        }
    });

});

/* =================================
    FAQ ACCORDION FUNCTIONALITY
    ================================= */
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isItemOpen = header.classList.contains('active');

            // Close all other items
            accordionItems.forEach(otherItem => {
                const otherHeader = otherItem.querySelector('.accordion-header');
                const otherContent = otherItem.querySelector('.accordion-content');
                otherHeader.classList.remove('active');
                otherContent.style.maxHeight = null;
                otherContent.style.padding = '0 15px';
            });

            // If the clicked item was not open, open it
            if (!isItemOpen) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '15px';
            }
        });
    });
