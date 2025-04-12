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
      
      // Show success message in Oromo
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'WAAN NU QUUNNAMTANIIF GALATOOMAA!';
      successMessage.style.color = 'var(--primary-color)';
      successMessage.style.fontSize = '1.2rem';
      successMessage.style.fontWeight = 'bold';
      successMessage.style.marginTop = '1rem';
      successMessage.style.padding = '1rem';
      successMessage.style.borderRadius = 'var(--radius-md)';
      successMessage.style.backgroundColor = 'var(--card-bg)';
      successMessage.style.border = '1px solid var(--glass-border)';
      successMessage.style.animation = 'fadeIn 0.5s ease forwards';
      
      // Clear any existing messages
      const existingMessage = contactForm.querySelector('.success-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      contactForm.appendChild(successMessage);
      
      // Reset form
      contactForm.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
          successMessage.remove();
        }, 500);
      }, 5000);
    });
  }

  // Add typing effect to hero section
  let typingEffectInitialized = false;

  function initializeTypingEffect() {
    if (typingEffectInitialized) return;
    
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content h2');

    if (heroTitle && heroSubtitle) {
        // Store the original text content
        const titleText = "Hi, I'm Begna Bile";
        const subtitleText = "BI Developer & Electrical and Computer Engineer";
        
        // Clear the text content
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        // Type the title
        let i = 0;
        const typeTitle = setInterval(() => {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
            } else {
                clearInterval(typeTitle);
                // Start typing the subtitle after the title is done
                let j = 0;
                const typeSubtitle = setInterval(() => {
                    if (j < subtitleText.length) {
                        heroSubtitle.textContent += subtitleText.charAt(j);
                        j++;
                    } else {
                        clearInterval(typeSubtitle);
                    }
                }, 100);
            }
        }, 100);
        
        typingEffectInitialized = true;
    }
  }

  // Call the typing effect initialization in DOMContentLoaded
  initializeTypingEffect();

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

  // Add 3D hover effect to cards
  document.querySelectorAll('.skill-card, .project-card, .certification-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // Add typing effect to section titles
  function typeSectionTitles() {
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
      const text = title.textContent;
      title.textContent = '';
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < text.length) {
          title.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typingEffect);
        }
      }, 50);
    });
  }

  // Add scroll-triggered animations
  const scrollAnimations = {
    init() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        this.observer.observe(element);
      });
    }
  };

  // Add particle effect to hero section
  function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 5 + 2;
      
      // Random animation duration
      const duration = Math.random() * 20 + 10;
      
      particle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
      `;
      
      hero.appendChild(particle);
    }
  }

  // Add smooth scroll to top button
  function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
      } else {
        scrollButton.classList.remove('show');
      }
    });
    
    scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Add image zoom effect
  document.querySelectorAll('.project-card img, .certification-card img').forEach(img => {
    img.addEventListener('click', () => {
      const zoomContainer = document.createElement('div');
      zoomContainer.className = 'zoom-container';
      
      const zoomedImg = document.createElement('img');
      zoomedImg.src = img.src;
      zoomedImg.className = 'zoomed-image';
      
      zoomContainer.appendChild(zoomedImg);
      document.body.appendChild(zoomContainer);
      
      zoomContainer.addEventListener('click', () => {
        zoomContainer.remove();
      });
    });
  });

  // Add progress bars for skills
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-progress');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // Add hover effect to social links
  document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-10px)';
      link.style.color = 'var(--primary-color)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
      link.style.color = '';
    });
  });

  // Initialize new features
  typeSectionTitles();
  scrollAnimations.init();
  createParticles();
  addScrollToTop();
  animateSkillBars();
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const zoomContainer = document.querySelector('.zoom-container');
      if (zoomContainer) {
        zoomContainer.remove();
      }
    }
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

// Enhanced translations with more detailed content
const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    contact: "Contact",
    
    // Hero section
    heroTitle: "Hi, I'm Begna Bile",
    heroSubtitle: "BI Developer & Electrical and Computer Engineer",
    heroDescription: "I specialize in creating smart systems and BI solutions that drive business growth.",
    
    // About section
    aboutTitle: "About Me",
    aboutDescription: "I am a passionate BI Developer and Electrical and Computer Engineer with expertise in Oracle Database Administration and Development. My journey in technology has been driven by a deep interest in data analytics and system optimization.",
    aboutDescription2: "With a strong foundation in both hardware and software, I bring a unique perspective to solving complex problems. I specialize in creating efficient database solutions and developing business intelligence tools that help organizations make data-driven decisions.",
    aboutDescription3: "My approach combines technical excellence with creative problem-solving, ensuring that every solution I deliver is both robust and user-friendly.",
    
    // Skills section
    skillsTitle: "My Skills",
    html5: "HTML5",
    css3: "CSS3",
    javascript: "JavaScript",
    react: "React",
    oracleDB: "Oracle DB",
    networking: "Networking",
    sql: "SQL",
    plsql: "PL/SQL",
    python: "Python",
    
    // Projects section
    projectsTitle: "My Projects",
    iotProject: "IoT Smart Door System",
    iotDescription: "Designed a smart IoT-based home door security system.",
    biProject: "Internal BI Reporting",
    biDescription: "Developed Oracle BI reports and dashboards for Siinqee Bank.",
    
    // Certifications section
    certificationsTitle: "My Certifications",
    oracleCert: "Oracle 19C DBA",
    oracleDescription: "Certified Database Administrator",
    plsqlCert: "PL/SQL Developer",
    plsqlDescription: "Advanced PL/SQL programming",
    financeCert: "Financial Inclusion",
    financeDescription: "Fintech and banking solutions",
    dataAnalytics: "Data Analytics",
    dataDescription: "Advanced data analysis techniques",
    googleMarketing: "Google Digital Marketing",
    googleDescription: "Digital marketing strategies",
    aiFundamentals: "AI Fundamentals",
    aiDescription: "Artificial Intelligence basics",
    
    // Contact section
    contactTitle: "Get In Touch",
    phone: "Phone",
    email: "Email",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    github: "GitHub",
    submit: "Send Message",
    successMessage: "Thank you for your message! I will get back to you soon.",
    
    // Additional UI elements
    downloadCV: "Download CV",
    getInTouch: "Get in Touch",
    viewProject: "View Project",
    viewReport: "View Report",
    viewCert: "View Certificate"
  },
  
  om: {
    // Navigation
    home: "Mana",
    about: "Waa'ee",
    skills: "Qophii",
    projects: "Ogeessa",
    certifications: "Faarsaa",
    contact: "Bilbila",
    
    // Hero section
    heroTitle: "Akkam, Ani Begna Bile",
    heroSubtitle: "Ogeessa BI & Injinera Kompiitaraa",
    heroDescription: "Sisteemii smartii fi furmaata BI uumuun guddina daldalaa gargaaruuf kan hojjatu.",
    
    // About section
    aboutTitle: "Waa'ee Kootii",
    aboutDescription: "Ani ogeessa BI fi Injinera Kompiitaraa ta'een gara Oracle Database Administration fi Development qophii qabuun furmaata fayyaa fi guddaa uumaa jira.",
    aboutDescription2: "Gara fuula duraafi duubaatti qophii qabuun furmaata fayyaa fi guddaa uumaa jira.",
    aboutDescription3: "Gara fuula duraafi duubaatti qophii qabuun furmaata fayyaa fi guddaa uumaa jira.",
    
    // Skills section
    skillsTitle: "Qophii Kootii",
    html5: "HTML5",
    css3: "CSS3",
    javascript: "JavaScript",
    react: "React",
    oracleDB: "Oracle DB",
    networking: "Networking",
    sql: "SQL",
    plsql: "PL/SQL",
    python: "Python",
    
    // Projects section
    projectsTitle: "Ogeessa Kootii",
    itProject: "Sisteemii Balbala IoT",
    iotDescription: "Sisteemii balbala mana smartii IoT irratti hundaa'e.",
    biProject: "Ripootii BI Keessaa",
    biDescription: "Ripootii fi dashboard BI Oracle Siinqee Bank irratti hojjate.",
    
    // Certifications section
    certificationsTitle: "Faarsa Kootii",
    oracleCert: "Oracle 19C DBA",
    oracleDescription: "Ogeessa Database Administrator",
    plsqlCert: "PL/SQL Developer",
    plsqlDescription: "PL/SQL programming guddaa",
    financeCert: "Fintech",
    financeDescription: "Furmaata fintech fi bankii",
    dataAnalytics: "Data Analytics",
    dataDescription: "Data analysis guddaa",
    googleMarketing: "Google Digital Marketing",
    googleDescription: "Digital marketing strategy",
    aiFundamentals: "AI Fundamentals",
    aiDescription: "AI basics",
    
    // Contact section
    contactTitle: "Natti Bilbila",
    phone: "Bilbila",
    email: "Email",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    github: "GitHub",
    submit: "Ergaa Ergaa",
    successMessage: "WAAN NU QUUNNAMTANIIF GALATOOMAA!",
    
    // Additional UI elements
    downloadCV: "CV Download Gochuu",
    getInTouch: "Natti Bilbila",
    viewProject: "Ogeessa Ilaaluu",
    viewReport: "Ripootii Ilaaluu",
    viewCert: "Faarsa Ilaaluu"
  },
  
  am: {
    // Navigation
    home: "ዋና ገጽ",
    about: "ስለኔ",
    skills: "ችሎታዎች",
    projects: "ፕሮጀክቶች",
    certifications: "ምስክርነቶች",
    contact: "አግኙኝ",
    
    // Hero section
    heroTitle: "ሰላም፣ እኔ በግና ቢሌ ነኝ",
    heroSubtitle: "BI ዴቨሎፐር እና ኤሌክትሪካል እና ኮምፒውተር ምህንድስና",
    heroDescription: "በንግድ እድገት ላይ ተጽዕኖ የሚያሳድሩ ዘመናዊ ስርዓቶች እና BI መፍትሄዎችን በመፍጠር እተሰማራለሁ።",
    
    // About section
    aboutTitle: "ስለኔ",
    aboutDescription: "በOracle Database Administration እና Development ልምድ ያለው ተነሳሽነት ያለው BI ዴቨሎፐር እና ኤሌክትሪካል እና ኮምፒውተር ምህንድስና ነኝ።",
    aboutDescription2: "በሃርድዌር እና ሶፍትዌር ሁለቱም ላይ ጠንካራ መሠረት አለኝ።",
    aboutDescription3: "በቴክኒካል ልምድ እና ፈጠራ ላይ የተመሠረተ አቀራረብ አለኝ።",
    
    // Skills section
    skillsTitle: "ችሎታዎቼ",
    html5: "HTML5",
    css3: "CSS3",
    javascript: "JavaScript",
    react: "React",
    oracleDB: "Oracle DB",
    networking: "Networking",
    sql: "SQL",
    plsql: "PL/SQL",
    python: "Python",
    
    // Projects section
    projectsTitle: "ፕሮጀክቶቼ",
    iotProject: "IoT የቤት አውቶሜሽን ስርዓት",
    iotDescription: "የቤት ደህንነት ስርዓት IoT ላይ የተመሠረተ።",
    biProject: "የውስጥ BI ሪፖርት",
    biDescription: "ለሲንቄ ባንክ Oracle BI ሪፖርቶች እና ዳሽቦርዶች አዘጋጅተዋል።",
    
    // Certifications section
    certificationsTitle: "ምስክርነቶቼ",
    oracleCert: "Oracle 19C DBA",
    oracleDescription: "የተመሰከረ ዳታቤዝ አስተዳዳሪ",
    plsqlCert: "PL/SQL Developer",
    plsqlDescription: "የላቀ PL/SQL ፕሮግራሚንግ",
    financeCert: "የፋይናንስ አገልግሎት",
    financeDescription: "የፋይናንስ እና የባንክ መፍትሄዎች",
    dataAnalytics: "የውሂብ ትንተና",
    dataDescription: "የላቀ የውሂብ ትንተና ቴክኒኮች",
    googleMarketing: "Google Digital Marketing",
    googleDescription: "ዲጂታል ማርኬቲንግ ስትራቴጂዎች",
    aiFundamentals: "AI Fundamentals",
    aiDescription: "የሰው ሰራሽ አውታረ መረብ መሰረታዊ ነገሮች",
    
    // Contact section
    contactTitle: "አግኙኝ",
    phone: "ስልክ",
    email: "ኢሜይል",
    telegram: "ቴሌግራም",
    linkedin: "ሊንክዲን",
    github: "ጊትሃብ",
    submit: "መልእክት ላክ",
    successMessage: "መልእክትህን ላክህልኝ አመሰግናለሁ!",
    
    // Additional UI elements
    downloadCV: "CV አውርድ",
    getInTouch: "አግኙኝ",
    viewProject: "ፕሮጀክት ይመልከቱ",
    viewReport: "ሪፖርት ይመልከቱ",
    viewCert: "ምስክርነት ይመልከቱ"
  }
};

// Enhanced language update function
function updateLanguage(language) {
  const translation = translations[language];
  
  // Update navigation
  document.querySelectorAll('.nav-links a').forEach((link, index) => {
    const keys = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
    link.textContent = translation[keys[index]];
  });
  
  // Update hero section
  const heroTitle = document.querySelector('.hero-content h1');
  const heroSubtitle = document.querySelector('.hero-content h2');
  const heroDescription = document.querySelector('.hero-content p');
  if (heroTitle) heroTitle.textContent = translation.heroTitle;
  if (heroSubtitle) heroSubtitle.textContent = translation.heroSubtitle;
  if (heroDescription) heroDescription.textContent = translation.heroDescription;
  
  // Update about section
  const aboutTitle = document.querySelector('.about-content h2');
  const aboutDescription = document.querySelector('.about-content p');
  if (aboutTitle) aboutTitle.textContent = translation.aboutTitle;
  if (aboutDescription) aboutDescription.textContent = translation.aboutDescription;
  
  // Update skills section
  const skillsTitle = document.querySelector('.column:nth-child(1) h2');
  if (skillsTitle) skillsTitle.textContent = translation.skillsTitle;
  
  // Update projects section
  const projectsTitle = document.querySelector('.column:nth-child(2) h2');
  if (projectsTitle) projectsTitle.textContent = translation.projectsTitle;
  
  // Update certifications section
  const certificationsTitle = document.querySelector('.column:nth-child(3) h2');
  if (certificationsTitle) certificationsTitle.textContent = translation.certificationsTitle;
  
  // Update contact section
  const contactTitle = document.querySelector('#contact h2');
  if (contactTitle) contactTitle.textContent = translation.contactTitle;
  
  // Update form button
  const submitButton = document.querySelector('.submit-btn');
  if (submitButton) submitButton.textContent = translation.submit;
  
  // Update project descriptions
  document.querySelectorAll('.project-card p').forEach((p, index) => {
    const descriptions = [translation.iotDescription, translation.biDescription];
    p.textContent = descriptions[index];
  });
  
  // Update certification descriptions
  document.querySelectorAll('.certification-content p').forEach((p, index) => {
    const descriptions = [
      translation.oracleDescription,
      translation.plsqlDescription,
      translation.financeDescription,
      translation.dataDescription,
      translation.googleDescription,
      translation.aiDescription
    ];
    p.textContent = descriptions[index];
  });
  
  // Update buttons and links
  document.querySelector('.download-btn').textContent = translation.downloadCV;
  document.querySelector('.cta-button').textContent = translation.getInTouch;
  document.querySelectorAll('.project-link').forEach((link, index) => {
    link.textContent = index === 0 ? translation.viewProject : translation.viewReport;
  });
  document.querySelectorAll('.certification-link').forEach(link => {
    link.textContent = translation.viewCert;
  });
}

// Language selection functionality
document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('language-selector');
  
  // Set initial language from localStorage or default to English
  const savedLanguage = localStorage.getItem('language') || 'en';
  languageSelector.value = savedLanguage;
  updateLanguage(savedLanguage);
  
  // Add event listener for language change
  languageSelector.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem('language', selectedLanguage);
    updateLanguage(selectedLanguage);
  });
});

// Add interactive cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add hover effect to cursor
document.querySelectorAll('a, button, .skill-card, .project-card, .certification-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
  });
});

// Add interactive background effect
function createInteractiveBackground() {
  const background = document.createElement('div');
  background.className = 'interactive-background';
  document.body.appendChild(background);
  
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement('div');
    dot.className = 'background-dot';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${Math.random() * 5}s`;
    background.appendChild(dot);
  }
}

// Add interactive skill bars
function createInteractiveSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    const percentage = document.createElement('div');
    percentage.className = 'skill-percentage';
    percentage.textContent = `${progress}%`;
    bar.appendChild(percentage);
    
    bar.addEventListener('mouseenter', () => {
      bar.style.transform = 'scale(1.05)';
      percentage.style.opacity = '1';
    });
    
    bar.addEventListener('mouseleave', () => {
      bar.style.transform = 'scale(1)';
      percentage.style.opacity = '0';
    });
  });
}

// Add interactive project cards
function enhanceProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';
    
    const technologies = document.createElement('div');
    technologies.className = 'project-technologies';
    technologies.innerHTML = '<h4>Technologies Used</h4><ul></ul>';
    
    overlay.appendChild(technologies);
    card.appendChild(overlay);
    
    card.addEventListener('mouseenter', () => {
      overlay.style.opacity = '1';
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      overlay.style.opacity = '0';
      card.style.transform = 'translateY(0)';
    });
  });
}

// Add interactive certification cards
function enhanceCertificationCards() {
  const certCards = document.querySelectorAll('.certification-card');
  certCards.forEach(card => {
    const details = document.createElement('div');
    details.className = 'certification-details';
    
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
      if (card.classList.contains('expanded')) {
        details.innerHTML = `
          <h4>Details</h4>
          <p>Issued by: ${card.getAttribute('data-issuer')}</p>
          <p>Date: ${card.getAttribute('data-date')}</p>
          <p>Credential ID: ${card.getAttribute('data-id')}</p>
        `;
        card.appendChild(details);
      } else {
        details.remove();
      }
    });
  });
}

// Add interactive contact form
function enhanceContactForm() {
  const form = document.getElementById('contact-form');
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// Add interactive navigation
function enhanceNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    });
  });
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Add interactive theme switcher
function enhanceThemeSwitcher() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Update theme-dependent elements
    document.querySelectorAll('.card, .nav-links a, .contact-card').forEach(element => {
      element.style.backgroundColor = isLight ? 'var(--light-card-bg)' : 'var(--card-bg)';
    });
  });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
  // ... existing initialization code ...
  
  // Initialize new interactive features
  createInteractiveBackground();
  createInteractiveSkillBars();
  enhanceProjectCards();
  enhanceCertificationCards();
  enhanceContactForm();
  enhanceNavigation();
  enhanceThemeSwitcher();
  
  // Add CSS for new interactive features
  const style = document.createElement('style');
  style.textContent = `
    /* Custom Cursor */
    .custom-cursor {
      width: 20px;
      height: 20px;
      border: 2px solid var(--primary-color);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease;
    }
    
    .cursor-hover {
      transform: scale(1.5);
      background: var(--primary-color);
      opacity: 0.5;
    }
    
    /* Interactive Background */
    .interactive-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
    }
    
    .background-dot {
      position: absolute;
      width: 2px;
      height: 2px;
      background: var(--primary-color);
      border-radius: 50%;
      animation: float 10s linear infinite;
    }
    
    /* Skill Bars */
    .skill-percentage {
      position: absolute;
      right: 0;
      top: -20px;
      font-size: 0.8rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    /* Project Cards */
    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    /* Certification Cards */
    .certification-card.expanded {
      transform: scale(1.05);
    }
    
    .certification-details {
      padding: 1rem;
      background: var(--card-bg);
      border-radius: var(--radius-md);
      margin-top: 1rem;
    }
    
    /* Contact Form */
    .form-group {
      position: relative;
      margin-bottom: 1.5rem;
    }
    
    .form-group.focused label {
      transform: translateY(-20px);
      font-size: 0.8rem;
      color: var(--primary-color);
    }
    
    /* Navigation */
    .nav-links a.active {
      color: var(--primary-color);
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
});
  