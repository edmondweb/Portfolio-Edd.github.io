document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById("intro-heading");
    const originalText = heading.textContent;
    const duration = 2000; // Duration for the random numbers effect in milliseconds
    const interval = 100; // Interval between each random number change in milliseconds

    function getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    function showRandomNumbers() {
        let startTime = Date.now();

        function updateText() {
            if (Date.now() - startTime < duration) {
                heading.textContent = originalText.split('').map(() => getRandomNumber()).join('');
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

    showRandomNumbers();
});