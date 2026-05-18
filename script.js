// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between bars and times
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
                 top: offsetPosition,
                 behavior: 'smooth'
            });
        }
    });
});

// Simple Scroll Animation Reveal (Optional enhancement)
const revealElements = document.querySelectorAll('.pricing-card, .testimonial-card, .section-header');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }
    });
}

// Initial setup for animation elements
revealElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Contact Modal Logic
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const contactLinks = document.querySelectorAll('a[href="#contact"]');

// Open modal
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close modal when clicking close button
closeModal.addEventListener('click', () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});



// Payment Logic (Backend API Call)
const pawapayBtns = document.querySelectorAll('.pawapay-btn');
const pawapayModal = document.getElementById('pawapayModal');
const pawapayMessage = document.getElementById('pawapayMessage');

pawapayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = btn.getAttribute('data-amount');
        const product = btn.getAttribute('data-product');
        
        // Ask user for phone number to mock Mobile Money payment
        const phone = prompt("Entrez votre numéro de téléphone (ex: 081...) pour le paiement Mobile Money :");
        if (!phone) return; // Cancelled
        
        // Update the message in the modal
        pawapayMessage.innerText = `Initialisation du paiement de ${amount}$ pour le ${product}...`;
        
        // Show modal
        pawapayModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Call our new Node.js Backend API
        fetch('api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount,
                product: product,
                phone: phone
            })
        })
        .then(response => response.json())
        .then(data => {
            pawapayModal.classList.remove('active');
            document.body.style.overflow = '';
            
            if (data.status === 'success') {
                alert("✅ " + data.message + "\nTransaction ID: " + data.transactionId);
            } else {
                alert("❌ Erreur: " + data.error);
            }
        })
        .catch(error => {
            pawapayModal.classList.remove('active');
            document.body.style.overflow = '';
            alert("Une erreur de communication avec le serveur est survenue.");
            console.error(error);
        });
    });
});
