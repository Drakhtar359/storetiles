document.addEventListener('DOMContentLoaded', () => {
  // --- SELECTORS ---
  const body = document.body;
  const header = document.querySelector('header');
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');
  
  // Collections Gallery
  const filterButtons = document.querySelectorAll('.filter-btn');
  const tileCards = document.querySelectorAll('.tile-card');

  // Contact Form
  const contactForm = document.getElementById('contact-form');

  // --- THEME SWITCHER (DARK MODE) ---
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    updateThemeToggleIcon(true);
  } else {
    body.classList.remove('dark-mode');
    updateThemeToggleIcon(false);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeToggleIcon(isDark);
  });

  function updateThemeToggleIcon(isDark) {
    const path = themeToggle.querySelector('path');
    if (isDark) {
      // Sun Icon path
      path.setAttribute('d', 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.02-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.02-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z');
    } else {
      // Moon Icon path
      path.setAttribute('d', 'M12.3 22h-.1c-5.5 0-10-4.5-10-10C2.2 6.8 6.4 2.4 11.8 2c.4 0 .8.2 1 .5.2.3.2.7.1 1.1-.9 2.6-.2 5.5 1.7 7.4s4.8 2.6 7.4 1.7c.4-.1.8 0 1.1.3.3.3.5.7.5 1-.4 5.4-4.8 9.6-10.2 9.6-.1 0-.1 0-.1 0z');
    }
  }

  // --- MOBILE MENU TOGGLE ---
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- STICKY HEADER & ACTIVE SECTIONS ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });

  // --- COLLECTIONS GALLERY FILTERS ---
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      tileCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(5px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'none';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // --- CONTACT FORM SUBMISSION ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      
      setTimeout(() => {
        const formParent = contactForm.parentElement;
        contactForm.style.opacity = '0';
        
        setTimeout(() => {
          contactForm.style.display = 'none';
          
          const successDiv = document.createElement('div');
          successDiv.className = 'form-success-message';
          successDiv.style.textAlign = 'center';
          successDiv.style.padding = '3rem';
          successDiv.style.animation = 'fadeInUp 0.6s ease';
          successDiv.innerHTML = `
            <div style="font-size: 3rem; color: var(--accent); margin-bottom: 1.5rem;">✓</div>
            <h3 style="font-size: 1.75rem; margin-bottom: 1rem;">Thank you!</h3>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Your message has been sent successfully. Our team at Store Tiles - S.A.R.L will contact you within 24 hours.</p>
            <button class="btn btn-primary" id="btn-form-reset">Send Another Message</button>
          `;
          
          formParent.appendChild(successDiv);
          
          document.getElementById('btn-form-reset').addEventListener('click', () => {
            successDiv.remove();
            contactForm.reset();
            contactForm.style.display = 'flex';
            setTimeout(() => {
              contactForm.style.opacity = '1';
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
            }, 50);
          });
        }, 300);
      }, 1500);
    });
  }
});
