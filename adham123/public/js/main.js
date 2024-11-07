// Get DOM elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const signUpBtn = document.querySelector('.btn-outline-success');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(145deg, #0a2b0c, #0d3d10)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'linear-gradient(145deg, #104113, #114b15)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Add hover effects to nav links
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
        link.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Enhance dropdown interaction
if (dropdownToggle) {
    dropdownToggle.addEventListener('mouseenter', () => {
        dropdownToggle.click(); // Auto-open on hover
    });
}

// Sign up button animation
if (signUpBtn) {
    signUpBtn.addEventListener('mouseenter', () => {
        signUpBtn.style.transform = 'scale(1.05)';
        signUpBtn.style.transition = 'all 0.3s ease';
    });
    
    signUpBtn.addEventListener('mouseleave', () => {
        signUpBtn.style.transform = 'scale(1)';
    });
    
    signUpBtn.addEventListener('click', () => {
        signUpBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            signUpBtn.style.transform = 'scale(1)';
        }, 200);
    });
}

// Add smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("gysassen110@gmail.com"); // Replace with your actual public key
})();

// Add sign up button functionality
if (signUpBtn) {
    signUpBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        try {
            // Show loading state
            signUpBtn.disabled = true;
            signUpBtn.innerHTML = 'Sending...';
            
            // Get user input using a better UI than prompt()
            const { value: email } = await Swal.fire({
                title: 'Enter your email address',
                input: 'email',
                inputPlaceholder: 'name@example.com',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please enter your email address';
                    }
                }
            });

            if (email) {
                // Send email using EmailJS
                const response = await emailjs.send(
                    "", // Replace with your service ID
                    "YOUR_TEMPLATE_ID", // Replace with your template ID
                    {
                        to_email: email,
                        message: "Thank you for signing up!",
                        // Add any other template parameters you need
                    }
                );

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Thank you for signing up! Please check your email.',
                });
            }
        } catch (error) {
            console.error('Failed to send email:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
            });
        } finally {
            // Reset button state
            signUpBtn.disabled = false;
            signUpBtn.innerHTML = 'Sign Up';
        }
    });
}
