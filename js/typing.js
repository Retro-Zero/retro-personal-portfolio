document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.getElementById("typed-text");
    const words = ["Arian", "a Full-Stack Developer", "a Computer Science Student", "a Web Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isFirstWord = true;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting characters
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing characters
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Handle word completion or deletion
        if (!isDeleting && charIndex === currentWord.length) {
            if (isFirstWord) {
                // If it's the first word (Arian), start deleting after a pause
                isDeleting = true;
                isFirstWord = false;
                setTimeout(type, 1500); // Wait before starting to delete
                return;
            }
            // For other words, pause before deleting
            isDeleting = true;
            setTimeout(type, 1500);
            return;
        } else if (isDeleting && charIndex === 0) {
            // When done deleting, move to next word
            isDeleting = false;
            if (wordIndex === 0) {
                wordIndex = 1; // After Arian, move to first developer role
            } else {
                // Cycle through developer roles
                wordIndex = (wordIndex + 1) % words.length;
                if (wordIndex === 0) wordIndex = 1; // Skip back to Arian
            }
        }

        // Set typing speed
        const typingSpeed = isDeleting ? 100 : 150;
        setTimeout(type, typingSpeed);
    }

    // Start the typing animation
    type(); // Start immediately since span is empty
}); 