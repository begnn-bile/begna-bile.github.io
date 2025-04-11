// Music control variables
let isMusicPlaying = false;
const audio = document.getElementById('background-music');
const volumeControl = document.getElementById('volume-control');
const musicBtn = document.querySelector('.music-btn');
const musicToggle = document.querySelector('.music-toggle');

// Music control functions
function toggleMusic() {
  const audio = document.getElementById('background-music');
  const musicIcon = document.querySelector('.music-toggle i');
  
  if (audio.paused) {
    audio.play();
    musicIcon.classList.remove('fa-music');
    musicIcon.classList.add('fa-volume-up');
  } else {
    audio.pause();
    musicIcon.classList.remove('fa-volume-up');
    musicIcon.classList.add('fa-music');
  }
}

// Volume control
document.getElementById('volume-control').addEventListener('input', function(e) {
  document.getElementById('background-music').volume = e.target.value;
});

// Theme toggle functionality
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const themeIcon = document.querySelector('.theme-toggle i');
  themeIcon.classList.toggle('fa-moon');
  themeIcon.classList.toggle('fa-sun');
  localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Apply saved theme preference and initialize music
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
  }

  // Initialize audio
  audio.volume = 0.5; // Set default volume
  audio.loop = true;

  // Add scroll animation classes
  const sections = document.querySelectorAll('section, .column, .skill-card, .project-card, .certification-card, .contact-card');
  sections.forEach(section => {
    section.classList.add('scroll-animate');
  });

  // Initialize scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll('.skill-card, .project-card, .certification-card, .contact-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });

  // Function to create ripple effect
  function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  // Add click animations to cards
  const allCards = document.querySelectorAll('.skill-card, .project-card, .certification-card');
  allCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Remove clicked class from all cards of the same type
      const cardType = card.className.split(' ')[0];
      document.querySelectorAll(`.${cardType}`).forEach(c => c.classList.remove('clicked'));
      
      // Add clicked class and ripple effect
      card.classList.add('clicked');
      createRipple(e, card);
      
      // Add slide animation based on index
      const direction = index % 2 === 0 ? 'Right' : 'Left';
      card.style.animation = `slide${direction} 0.5s ease forwards`;
      
      // Reset animation
      setTimeout(() => {
        card.style.animation = '';
        card.classList.remove('clicked');
      }, 500);
    });
  });

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Get form values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Here you would typically send the form data to a server
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      contactForm.appendChild(successMessage);
      
      // Reset form
      contactForm.reset();
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    });
  }

  // Add typing effect to hero section
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
  }

  // Get all cards
  const skillCards = document.querySelectorAll('.skill-card');
  const projectCards = document.querySelectorAll('.project-card');
  const certificationCards = document.querySelectorAll('.certification-card');

  // Add click handlers for skill cards
  skillCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Remove clicked class from all cards
      skillCards.forEach(c => c.classList.remove('clicked'));
      
      // Add clicked class to current card
      card.classList.add('clicked');
      
      // Add ripple effect
      createRipple(e, card);
      
      // Add slide animation
      card.style.animation = index % 2 === 0 ? 'slideRight 0.5s ease forwards' : 'slideLeft 0.5s ease forwards';
      
      // Reset animation after it completes
      setTimeout(() => {
        card.style.animation = '';
      }, 500);
    });
  });

  // Add click handlers for project cards
  projectCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Remove clicked class from all cards
      projectCards.forEach(c => c.classList.remove('clicked'));
      
      // Add clicked class to current card
      card.classList.add('clicked');
      
      // Add ripple effect
      createRipple(e, card);
      
      // Add slide animation
      card.style.animation = index % 2 === 0 ? 'slideRight 0.5s ease forwards' : 'slideLeft 0.5s ease forwards';
      
      // Reset animation after it completes
      setTimeout(() => {
        card.style.animation = '';
      }, 500);
    });
  });

  // Add click handlers for certification cards
  certificationCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Remove clicked class from all cards
      certificationCards.forEach(c => c.classList.remove('clicked'));
      
      // Add clicked class to current card
      card.classList.add('clicked');
      
      // Add ripple effect
      createRipple(e, card);
      
      // Add slide animation
      card.style.animation = index % 2 === 0 ? 'slideRight 0.5s ease forwards' : 'slideLeft 0.5s ease forwards';
      
      // Reset animation after it completes
      setTimeout(() => {
        card.style.animation = '';
      }, 500);
    });
  });
});

// Add scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  const updateProgress = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  };
  
  window.addEventListener('scroll', updateProgress);
  updateProgress();
});

// Scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    } else {
      reveal.classList.remove('active');
    }
  });
}

// Typing effect
function typeEffect(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollPosition = window.pageYOffset;
  
  hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Add cursor trail effect
document.addEventListener('mousemove', (e) => {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-trail');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  document.body.appendChild(cursor);
  
  setTimeout(() => {
    cursor.remove();
  }, 1000);
});
  