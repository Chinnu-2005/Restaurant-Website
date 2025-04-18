// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = body.dataset.theme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    mobileMenuBtn.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu Tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        menuTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding category
        tab.classList.add('active');
        document.querySelector(`.menu-category[data-category="${tab.dataset.category}"]`).classList.add('active');
    });
});

// Gallery Lightbox
lightGallery(document.getElementById('lightgallery'), {
    speed: 500,
    download: false
});

// Date and Time Picker
flatpickr("#date", {
    minDate: "today",
    dateFormat: "Y-m-d",
});

flatpickr("#time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    minTime: "11:00",
    maxTime: "22:00",
});

// Testimonials Carousel
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= testimonialSlides.length) currentSlide = 0;
    if (index < 0) currentSlide = testimonialSlides.length - 1;
    
    testimonialSlides[currentSlide].classList.add('active');
}

prevButton.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

// Auto-advance testimonials
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

// Reservation Form
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value,
        specialRequests: document.getElementById('special-requests').value
    };

    try{
        const response=await fetch('/submit-reservation',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        });
        const result=await response.json();
        if(response.ok){
            alert('Reservation Confirmed....');
            reservationForm.reset();
        }else{
            alert(`Error ${result.error}`);
        }

    }catch(error){
        alert('Failed to submit reservation')
    }
    
    // alert(`Reservation confirmed!\n\nDetails:\nName: ${formData.name}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}`);
    reservationForm.reset();
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.menu-item, .about-images img, .info-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
    }
    
    lastScroll = currentScroll;
});