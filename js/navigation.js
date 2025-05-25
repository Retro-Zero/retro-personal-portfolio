document.addEventListener('DOMContentLoaded', () => {
    // Handle space key press
    document.addEventListener('keydown', (event) => {
        // Check if the pressed key is space and we're at the top of the page
        if (event.code === 'Space' && window.scrollY < 100) {
            event.preventDefault(); // Prevent space from scrolling
            scrollToSection('#about');
        }
    });

    // Handle smooth scroll for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href'));
        });
    });

    // Smooth scroll function
    function scrollToSection(selector) {
        const target = document.querySelector(selector);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add active state to hero prompt when space is held
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            const prompt = document.querySelector('.hero-prompt');
            if (prompt) {
                prompt.style.opacity = '0.5';
                prompt.style.transform = 'translateX(-50%) translateY(3px)';
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            const prompt = document.querySelector('.hero-prompt');
            if (prompt) {
                prompt.style.opacity = '';
                prompt.style.transform = '';
            }
        }
    });

    // Custom Scroll Indicator
    const descriptions = document.querySelectorAll('.project-description');
    
    descriptions.forEach(description => {
        const content = description.querySelector('.project-description-content');
        const thumb = description.querySelector('.scroll-thumb');
        
        // Initial thumb height
        updateThumbHeight();

        // Update thumb position on scroll
        content.addEventListener('scroll', () => {
            const scrollPercent = content.scrollTop / (content.scrollHeight - content.clientHeight);
            const maxTop = description.clientHeight - thumb.clientHeight;
            thumb.style.top = `${scrollPercent * maxTop}px`;
        });

        // Update thumb height when content changes
        function updateThumbHeight() {
            const scrollRatio = content.clientHeight / content.scrollHeight;
            const thumbHeight = Math.max(scrollRatio * content.clientHeight, 30); // minimum 30px height
            thumb.style.height = `${thumbHeight}px`;
            
            // Only show scroll indicator if content is scrollable
            const scrollIndicator = description.querySelector('.scroll-indicator');
            scrollIndicator.style.opacity = scrollRatio < 1 ? '1' : '0';
        }

        // Handle thumb drag
        let isDragging = false;
        let startY;
        let startTop;

        thumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startTop = parseInt(thumb.style.top || '0');
            document.body.style.userSelect = 'none'; // Prevent text selection while dragging
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const delta = e.clientY - startY;
            const maxTop = description.clientHeight - thumb.clientHeight;
            const newTop = Math.max(0, Math.min(maxTop, startTop + delta));
            
            thumb.style.top = `${newTop}px`;
            
            // Update content scroll position
            const scrollPercent = newTop / maxTop;
            content.scrollTop = scrollPercent * (content.scrollHeight - content.clientHeight);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });

        // Update thumb height on window resize
        window.addEventListener('resize', updateThumbHeight);

        // Initial scroll position
        content.scrollTop = 0;
    });
}); 