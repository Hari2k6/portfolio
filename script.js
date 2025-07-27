document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Typewriter Effect
    const taglineElement = document.querySelector('.tagline');
    const taglineText = "Passionate AI & Data Science Student exploring technology to solve real-world problems.";
    let i = 0;
    const typingSpeed = 60;
    const startDelay = 1000;

    function typeWriter() {
        if (i < taglineText.length) {
            taglineElement.innerHTML += taglineText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Add cursor blink effect after typing is complete
            taglineElement.innerHTML += '<span class="cursor">|</span>';
            setTimeout(() => {
                const cursor = taglineElement.querySelector('.cursor');
                if (cursor) {
                    cursor.style.animation = 'blink 1s infinite';
                }
            }, 500);
        }
    }

    // Start typing after delay
    setTimeout(() => {
        taglineElement.style.opacity = 1;
        typeWriter();
    }, startDelay);

    // Add cursor blink animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        .cursor {
            animation: blink 1s infinite;
            font-weight: 300;
        }
    `;
    document.head.appendChild(style);

    // Enhanced Smooth Scrolling with Offset
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Add active state to navigation
            document.querySelectorAll('.nav-list a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Enhanced Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50px 0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.remove('hidden');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.education-item, .skill-category, .project-card, .experience-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
        
        // Initially hide child elements for staggered animation
        const children = section.querySelectorAll('.education-item, .skill-category, .project-card, .experience-item');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Parallax Effect for Hero Section
    const hero = document.getElementById('hero');
    const heroBackground = document.querySelector('.hero-background');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Update floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    }

    // Throttled scroll event for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });

    // Navigation Active State on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Enhanced Button Hover Effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project Cards Interactive Effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // Skill Categories Hover Effect
    document.querySelectorAll('.skill-category').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 10px 25px rgba(44, 62, 80, 0.1)'; // Adjusted shadow for new scheme
            }
        });
        
        skill.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = 'none';
            }
        });
    });

    // Add loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--dark-gradient); display: flex; justify-content: center; align-items: center; z-index: 10000; transition: opacity 0.5s ease;">
            <div style="text-align: center; color: white;">
                <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <h3 style="font-family: 'Poppins', sans-serif; font-weight: 300; letter-spacing: 2px;">Loading Portfolio...</h3>
            </div>
        </div>
    `;
    
    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    });

    // Removed mouse trail effect for a more professional look
    // let mouseTrail = [];
    // const trailLength = 10;
    // function createTrailDot(x, y) {
    //     const dot = document.createElement('div');
    //     dot.style.cssText = `
    //         position: fixed;
    //         width: 6px;
    //         height: 6px;
    //         background: linear-gradient(45deg, #667eea, #764ba2);
    //         border-radius: 50%;
    //         pointer-events: none;
    //         z-index: 9999;
    //         left: ${x - 3}px;
    //         top: ${y - 3}px;
    //         transition: opacity 0.3s ease;
    //     `;
    //     document.body.appendChild(dot);
        
    //     setTimeout(() => {
    //         dot.style.opacity = '0';
    //         setTimeout(() => dot.remove(), 300);
    //     }, 100);
    // }
    // document.addEventListener('mousemove', (e) => {
    //     if (window.innerWidth > 768) { // Only on desktop
    //         createTrailDot(e.clientX, e.clientY);
    //     }
    // });

    // Konami Code Easter egg - Disabled rainbow effect for professionalism
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated! (Effect disabled for professional look)
            console.log('Konami Code Activated! (Visual effect disabled for professional aesthetic)');
            // document.body.style.animation = 'rainbow 2s infinite';
            // const easterEggStyle = document.createElement('style');
            // easterEggStyle.textContent = `
            //     @keyframes rainbow {
            //         0% { filter: hue-rotate(0deg); }
            //         100% { filter: hue-rotate(360deg); }
            //     }
            // `;
            // document.head.appendChild(easterEggStyle);
            
            // setTimeout(() => {
            //     document.body.style.animation = '';
            //     easterEggStyle.remove();
            // }, 4000);
            
            konamiCode = [];
        }
    });

    // Add particles to background (subtle effect) - Adjusted color
    function createParticle() {
        if (window.innerWidth > 768) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.1); /* More subtle white */
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * window.innerWidth}px;
                top: ${window.innerHeight + 10}px;
                animation: float-up 8s linear infinite;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 8000);
        }
    }

    // Add float-up animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Add mobile menu toggle for smaller screens
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        const navList = document.querySelector('.nav-list');
        
        // Create hamburger menu
        const hamburger = document.createElement('div');
        hamburger.innerHTML = `
            <div style="display: flex; flex-direction: column; cursor: pointer; padding: 10px;">
                <span style="width: 25px; height: 3px; background: var(--text-dark); margin: 3px 0; transition: 0.3s;"></span>
                <span style="width: 25px; height: 3px; background: var(--text-dark); margin: 3px 0; transition: 0.3s;"></span>
                <span style="width: 25px; height: 3px; background: var(--text-dark); margin: 3px 0; transition: 0.3s;"></span>
            </div>
        `;
        
        navbar.insertBefore(hamburger, navList);
        navList.style.display = 'none';
        
        hamburger.addEventListener('click', () => {
            if (navList.style.display === 'none') {
                navList.style.display = 'flex';
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '100%';
                navList.style.left = '0';
                navList.style.right = '0';
                navList.style.background = 'var(--bg-card)';
                navList.style.boxShadow = 'var(--shadow-sm)';
            } else {
                navList.style.display = 'none';
            }
        });
    }

    console.log('🚀 Portfolio loaded successfully!');
    console.log('💼 Built with passion by Hari A');
    console.log('🎨 Enhanced with modern web technologies');
});