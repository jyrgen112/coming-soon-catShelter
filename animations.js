
const targetDate = new Date('2026-05-15T16:00:00').getTime();

function updateCountdown() {

    const now = new Date().getTime();
    
    const distance = targetDate - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        clearInterval(countdownInterval);
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 60000);// Email notification form handler
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.querySelector('.email-form');
    const emailInput = document.querySelector('.email-input');
    const submitBtn = document.querySelector('.submit-btn');

    // Store submitted emails (in a real app, this would go to a server)
    let submittedEmails = [];

    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email format
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Check if email already submitted
        if (submittedEmails.includes(email)) {
            showMessage('This email is already registered!', 'info');
            return;
        }

        // Simulate submission (disable button temporarily)
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Simulate API call delay
        setTimeout(() => {
            // Store email
            submittedEmails.push(email);
            
            // Show success message
            showMessage('Thank you! You\'ll be notified when we launch 🐱', 'success');
            
            // Clear input
            emailInput.value = '';
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
            
            // Optional: Store in localStorage for persistence
            localStorage.setItem('notifyEmails', JSON.stringify(submittedEmails));
        }, 800);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message function
    function showMessage(text, type) {
        // Remove any existing message
        const existingMsg = document.querySelector('.notification-message');
        if (existingMsg) {
            existingMsg.remove();
        }

        // Create message element
        const message = document.createElement('div');
        message.className = `notification-message ${type}`;
        message.textContent = text;
        
        // Style the message
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1000;
            animation: slideDown 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        // Set color based on type
        if (type === 'success') {
            message.style.backgroundColor = '#4CAF50';
            message.style.color = 'white';
        } else if (type === 'error') {
            message.style.backgroundColor = '#f44336';
            message.style.color = 'white';
        } else if (type === 'info') {
            message.style.backgroundColor = '#2196F3';
            message.style.color = 'white';
        }

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Add to page
        document.body.appendChild(message);

        // Remove after 4 seconds
        setTimeout(() => {
            message.style.animation = 'slideDown 0.3s ease-out reverse';
            setTimeout(() => message.remove(), 300);
        }, 4000);
    }

    // Load previously submitted emails from localStorage
    const stored = localStorage.getItem('notifyEmails');
    if (stored) {
        try {
            submittedEmails = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading stored emails:', e);
        }
    }
});// Fade-in animation on page load
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