// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.querySelector('body');

    // Check for saved theme
    let theme = localStorage.getItem('theme') || 'light';
    setTheme(theme);

    // Theme switcher event listeners
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mode = this.dataset.mode;
            setTheme(mode);
        });
    });

    function setTheme(mode) {
        // Remove active class from all options
        themeOptions.forEach(option => {
            option.classList.remove('active');
        });
        
        // Add active class to selected option
        const selectedOption = document.querySelector(`#${mode}-mode`);
        if (selectedOption) {
            selectedOption.classList.add('active');
        }
        
        // Set theme
        if (mode === 'light') {
            body.removeAttribute('data-theme');
        } else if (mode === 'dark') {
            body.setAttribute('data-theme', 'dark');
        } else if (mode === 'blue') {
            body.setAttribute('data-theme', 'blue');
        } else if (mode === 'green') {
            body.setAttribute('data-theme', 'green');
        }
        
        // Save theme preference
        localStorage.setItem('theme', mode);
    }

    // Responsive Navigation
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle navigation menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }

    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        try {
            const scrollY = window.pageYOffset;
            
            // Header shadow on scroll
            const header = document.querySelector('header');
            if (header) {
                if (scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Highlight active nav link
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                const navLink = document.querySelector(`.nav-link[href*=${sectionId}]`);
                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                }
            });
        } catch (error) {
            console.error('Error updating active nav link:', error);
        }
    }

    // Initial call and add scroll event listener
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically add code to handle form submission
            // For example, using fetch to send data to a server
            
            // For now, just show a success message
            const formElements = Array.from(this.elements);
            formElements.forEach(element => {
                if (element.tagName !== 'BUTTON') {
                    element.value = '';
                }
            });
            
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    // Typing animation for hero section (optional enhancement)
    const heroText = document.querySelector('.hero-text h2');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
});