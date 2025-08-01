// Initialize EmailJS - DISABLED FOR NOW
// (function() {
//     emailjs.init("ZEYlPxTSLOLLQNBJd");
// })();

// Contact form handling - DISABLED FOR NOW
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const originalText = buttonText.textContent;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // EmailJS functionality disabled - show demo notification
        setTimeout(() => {
            showNotification('Contact form is currently disabled. Please use the email link above.', 'error');
            submitButton.disabled = false;
            buttonText.textContent = originalText;
        }, 1000);

        // Original EmailJS code commented out:
        // emailjs.send('service_k8cjh9v', 'template_hr42ohn', {
        //     from_name: formData.name,
        //     from_email: formData.email,
        //     subject: formData.subject,
        //     message: formData.message,
        //     to_name: 'Arian'
        // })
        // .then(function(response) {
        //     // Success
        //     showNotification('Message sent successfully!', 'success');
        //     contactForm.reset();
        // })
        // .catch(function(error) {
        //     // Error
        //     showNotification('Failed to send message. Please try again.', 'error');
        //     console.error('EmailJS Error:', error);
        // })
        // .finally(function() {
        //     // Reset button state
        //     submitButton.disabled = false;
        //     buttonText.textContent = originalText;
        // });
    });

    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}); 