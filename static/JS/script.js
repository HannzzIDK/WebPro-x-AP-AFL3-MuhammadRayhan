function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.getAttribute('data-theme') === 'light') {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'bi bi-sun-fill';
    } else {
        html.setAttribute('data-theme', 'light');
        icon.className = 'bi bi-moon-stars-fill';
    }
}

// 1. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger counter animation if it's the stats section
            if (entry.target.querySelector('.stat-number')) {
                animateCounters(entry.target);
            }
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// 2. Counter Animation
function animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        if (counter.classList.contains('animated')) return;
        counter.classList.add('animated');
        
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 50;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

// 3. Improved Typing Effect
document.querySelectorAll('.typing-text').forEach(el => {
    const text = el.innerText;
    el.innerText = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 800);
});

// 4. Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        
        const showAlert = (message, type) => {
            alertPlaceholder.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show rounded-4 shadow-sm" role="alert">
                    <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}-fill me-2"></i>
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        };

        // Simple Validation
        if (name.length < 3) {
            showAlert('Nama terlalu pendek (minimal 3 karakter).', 'danger');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Format email tidak valid.', 'danger');
            return;
        }

        if (message.length < 10) {
            showAlert('Pesan terlalu pendek (minimal 10 karakter).', 'danger');
            return;
        }

        // Success Feedback
        showAlert('Terima kasih! Pesan Anda telah berhasil dikirim.', 'success');
        contactForm.reset();
    });
}