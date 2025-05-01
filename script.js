document.addEventListener("DOMContentLoaded", function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Typing effect for heading with random numbers
    const heading = document.getElementById("intro-heading");
    if (heading) {
        const originalText = heading.textContent;
        const duration = 300; // Duration for the random numbers effect in milliseconds
        const interval = 50; // Interval between each random number change in milliseconds

        function getRandomNumber() {
            return Math.floor(Math.random() * 10);
        }

        function typeNumbers(callback) {
            const numbers = Array(7).fill(0).map(getRandomNumber).join(' ');
            heading.textContent = "";
            let index = 0;
            function typeEffect() {
                if (index < numbers.length) {
                    heading.textContent += numbers.charAt(index);
                    index++;
                    setTimeout(typeEffect, 100);
                } else {
                    callback();
                }
            }
            typeEffect();
        }

        function showRandomNumbers() {
            let startTime = Date.now();
            function updateText() {
                if (Date.now() - startTime < duration) {
                    heading.textContent = Array(7).fill(0).map(getRandomNumber).join(' ');
                    setTimeout(updateText, interval);
                } else {
                    showOriginalText();
                }
            }
            updateText();
        }

        function showOriginalText() {
            heading.textContent = "";
            let index = 0;
            function typeEffect() {
                if (index < originalText.length) {
                    heading.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeEffect, 100);
                }
            }
            typeEffect();
        }

        // Start the typing effect
        typeNumbers(showRandomNumbers);
    }

    // Statistics counter animation
    const stats = document.querySelectorAll('.stat');
    
    function startCountingEffect() {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const increment = target / 200;
            let count = 0;
            
            function updateCount() {
                if (count < target) {
                    count += increment;
                    stat.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target;
                }
            }
            
            updateCount();
        });
    }

    // Run counter animation when stats section is in view
    const insightsSection = document.querySelector('.insights');
    if (insightsSection) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCountingEffect();
                    observer.unobserve(insightsSection);
                }
            });
        }, observerOptions);

        observer.observe(insightsSection);
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to your server
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Reset form and show success message
            contactForm.reset();
            
            // Create a custom success message element
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
            successMessage.style.color = '#2ecc71';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '8px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontWeight = '500';
            successMessage.innerHTML = '<span style="font-size: 20px;">✓</span> Your message has been sent successfully!';
            
            // Find the parent container to add the message after the form
            const formContainer = document.querySelector('.contact-form');
            formContainer.appendChild(successMessage);
            
            // Remove the success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    formContainer.removeChild(successMessage);
                }, 500);
            }, 5000);
        });
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Sidebar toggle functionality (if present in HTML)
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // Fade-in and fade-out effect on scroll
    const fadeElements = document.querySelectorAll('.intro, .projects, footer');
    function checkFade() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                element.classList.add('fade-in');
                element.classList.remove('fade-out');
            } else {
                element.classList.add('fade-out');
                element.classList.remove('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // Initial check
});