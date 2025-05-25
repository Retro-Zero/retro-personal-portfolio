document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for stat bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stat bars
                if (entry.target.classList.contains('stat-group')) {
                    const bars = entry.target.querySelectorAll('.bar-fill');
                    bars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = `${level}%`;
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe stat groups
    document.querySelectorAll('.stat-group').forEach(group => {
        observer.observe(group);
    });

    // Add hover effect to portrait
    const portrait = document.querySelector('.portrait-container');
    if (portrait) {
        portrait.addEventListener('mousemove', (e) => {
            const rect = portrait.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            portrait.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        portrait.addEventListener('mouseleave', () => {
            portrait.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Animate skill levels
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        item.style.setProperty('--skill-level', `${level}%`);
    });

    // Animate attribute levels
    const attributeBars = document.querySelectorAll('.attribute-bar');
    attributeBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.querySelector('.attribute-fill').style.setProperty('--attribute-level', `${level}%`);
    });

    // Animate elements when they come into view
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer2.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe skill items and attribute bars
    document.querySelectorAll('.skill-item, .attribute-bar').forEach(el => {
        observer2.observe(el);
    });
}); 