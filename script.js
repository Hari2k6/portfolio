document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for the tagline
    const taglineElement = document.querySelector('.tagline');
    const taglineText = "Energetic and passionate AI and Data Science Student. Excited to learn how technology can solve real-world problems through experience.";
    let i = 0;
    const typingSpeed = 50; // Milliseconds per character

    function typeWriter() {
        if (i < taglineText.length) {
            taglineElement.innerHTML += taglineText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            taglineElement.style.opacity = 1; // Ensure full opacity after typing
        }
    }

    // Set initial opacity to 1 for the tagline element so it's visible during typing
    taglineElement.style.opacity = 1;
    typeWriter();

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Reveal Animation using Intersection Observer
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.remove('hidden'); // Remove hidden class once animated
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden'); // Add hidden class initially
        observer.observe(section);
    });

    // Optional: Add a subtle parallax effect to the hero section background
    const hero = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = -scrollPosition * 0.1 + 'px'; // Adjust 0.1 for speed
    });
});
