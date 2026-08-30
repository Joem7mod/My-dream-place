// ========================================
// Dark Mode Toggle
// ========================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
});

function updateThemeToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ========================================
// Back to Top Button
// ========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Stats Number Counter Animation
// ========================================
const counters = document.querySelectorAll('.stat-number');
let animated = false;

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-counter-section');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && !animated) {
        animated = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    counter.innerText = target;
                    clearInterval(interval);
                } else {
                    counter.innerText = count;
                }
            }, 30);
        });
    }
});

// ========================================
// Hotel Category Filter
// ========================================
function filterHotels(category, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const cards = document.querySelectorAll('.hotel-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ========================================
// Wishlist Toggle
// ========================================
function toggleWishlist(btn, e) {
    e.stopPropagation();
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('active-heart');
    
    const isSaved = icon.classList.contains('fa-solid');
    showSuccessMessage(isSaved ? 'Saved to your Wishlist!' : 'Removed from Wishlist');
}

// ========================================
// Search Form Validation
// ========================================
const searchForm = document.querySelector('.search-form');

if (searchForm) {
    const searchBtn = searchForm.querySelector('.btn-primary');
    
    searchBtn.addEventListener('click', () => {
        const location = searchForm.querySelector('input[type="text"]:first-of-type');
        const checkIn = searchForm.querySelector('input[type="date"]:first-of-type');
        const checkOut = searchForm.querySelector('input[type="date"]:last-of-type');
        const guests = searchForm.querySelector('input[type="text"]:last-of-type');
        
        let isValid = true;
        
        if (!location.value) {
            showValidationError(location, 'Please enter a destination');
            isValid = false;
        }
        if (!checkIn.value) {
            showValidationError(checkIn, 'Please select check-in date');
            isValid = false;
        }
        if (!checkOut.value) {
            showValidationError(checkOut, 'Please select check-out date');
            isValid = false;
        }
        if (!guests.value) {
            showValidationError(guests, 'Please enter number of guests');
            isValid = false;
        }
        
        if (isValid) {
            showSuccessMessage('Search submitted successfully! Finding best deals...');
        }
    });
}

function showValidationError(input, message) {
    input.style.border = '1px solid #ef4444';
    setTimeout(() => {
        input.style.border = 'none';
    }, 2500);
}

function showSuccessMessage(message) {
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 14px 22px;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    successMsg.textContent = '✓ ' + message;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// ========================================
// Newsletter Form
// ========================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showSuccessMessage('Thank you for subscribing!');
        newsletterForm.reset();
    });
}

// ========================================
// Auth Modal Handling
// ========================================
const authModal = document.getElementById('authModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');

document.getElementById('signInBtn')?.addEventListener('click', () => {
    modalTitle.textContent = 'Sign In to My Dream Place';
    authModal.classList.add('open');
});

document.getElementById('registerBtn')?.addEventListener('click', () => {
    modalTitle.textContent = 'Create a New Account';
    authModal.classList.add('open');
});

modalClose?.addEventListener('click', () => authModal.classList.remove('open'));
window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('open');
});

function handleAuthSubmit(e) {
    e.preventDefault();
    authModal.classList.remove('open');
    showSuccessMessage('Authentication successful! Welcome.');
}

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        authModal.classList.remove('open');
    }
});