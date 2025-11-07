// Fade-in animation on page load
document.addEventListener('DOMContentLoaded', () => {
    // All sections visible immediately on load
    const sections = [
        'h1',
        '.countdown-container',
        '.cat-icon',
        'button',
        '.features-section',
        '.get-notified'
    ];

    sections.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '1';
        }
    });

    

    // Email form submission with fade effect
    const emailForm = document.querySelector('.email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailForm.querySelector('.email-input').value;
            
            // Fade out form
            emailForm.style.transition = 'opacity 0.5s ease';
            emailForm.style.opacity = '0';
            
            setTimeout(() => {
                // Show thank you message
                const thankYouMsg = document.createElement('div');
                thankYouMsg.textContent = `Thank you! We'll notify ${email} when we launch! 🐱`;
                thankYouMsg.style.fontSize = '1.2rem';
                thankYouMsg.style.fontWeight = 'bold';
                thankYouMsg.style.color = '#e89b5f';
                thankYouMsg.style.opacity = '0';
                thankYouMsg.style.transition = 'opacity 0.5s ease';
                
                emailForm.parentElement.appendChild(thankYouMsg);
                
                // Fade in thank you message
                setTimeout(() => {
                    thankYouMsg.style.opacity = '1';
                }, 50);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    thankYouMsg.style.opacity = '0';
                    setTimeout(() => {
                        thankYouMsg.remove();
                        emailForm.reset();
                        emailForm.style.opacity = '1';
                    }, 500);
                }, 3000);
            }, 500);
        });
    }
});




// Scroll-based fade out/in for Coming Soon and Features sections
const comingSoonElements = [
    document.querySelector('h1'), 
    document.querySelector('.countdown-container'), 
    document.querySelector('.cat-icon'), 
    document.querySelector('button')
];

const featuresSection = document.querySelector('.features-section');

// Add transition styles
comingSoonElements.forEach(el => {
    if (el) el.style.transition = 'opacity 0.6s ease';
});
if (featuresSection) featuresSection.style.transition = 'opacity 0.6s ease';

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // At top (Coming Soon visible)
    if (scrollTop < 200) {
        // Coming Soon - visible
        comingSoonElements.forEach(el => {
            if (el) el.style.opacity = '1';
        });
        // Features - hidden
        if (featuresSection) featuresSection.style.opacity = '0';
    } 
    // Scrolled down (Features visible)
    else {
        // Coming Soon - hidden
        comingSoonElements.forEach(el => {
            if (el) el.style.opacity = '0';
        });
        // Features - visible
        if (featuresSection) featuresSection.style.opacity = '1';
    }
});