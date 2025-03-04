document.addEventListener("DOMContentLoaded", function() {
    // Typing effect for heading
    const heading = document.getElementById("intro-heading");
    const originalText = heading.textContent;
    const duration = 300; // Duration for the random numbers effect in milliseconds
    const interval = 50; // Interval between each random number change in milliseconds

    // Counting effect for stats
    const stats = document.querySelectorAll('.stat');
    
    function startCountingEffect() {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target'); // Get target value from data attribute
            const increment = target / 200; // Increment rate for the counter animation
            let count = 0;

            function updateCount() {
                if (count < target) {
                    count += increment;
                    stat.innerText = Math.ceil(count); // Update the stat number
                    setTimeout(updateCount, 1); // Continue updating
                } else {
                    stat.innerText = target; // Ensure the counter ends at the target number
                }
            }

            updateCount(); // Start the counter animation
        });
    }

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
                setTimeout(typeEffect, 100); // Adjust the typing speed as needed
            } else {
                callback(); // Call the callback function after the typing effect ends
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
                setTimeout(typeEffect, 100); // Adjust the typing speed as needed
            }
        }

        typeEffect();
    }

    // Start both the counting effect and the random number typing effect simultaneously
    startCountingEffect(); // Start counting right away
    typeNumbers(showRandomNumbers); // Start typing random numbers and proceed to original text

    // Sidebar toggle functionality
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

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