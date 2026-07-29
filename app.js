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

  // --- THREE.JS 3D MODELS ---
  if (typeof THREE !== 'undefined') {
    initThreeJSModels();
  }

  function initThreeJSModels() {
    const containers = document.querySelectorAll('.scene-3d[data-product]');
    containers.forEach(container => {
      const product = container.getAttribute('data-product');
      const width = container.clientWidth || 100;
      const height = container.clientHeight || 100;
      
      // Scene
      const scene = new THREE.Scene();
      
      // Camera
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0.8, 5.5);
      
      // Renderer
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      
      const modelGroup = new THREE.Group();
      
      if (product === 'bath') {
        // Soft defined lighting for matte ceramic and cabinet details
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
        scene.add(ambientLight);
        
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
        dirLight1.position.set(4, 7, 4);
        scene.add(dirLight1);
        
        const dirLight2 = new THREE.DirectionalLight(0x507B8C, 0.3); // Soft Aqua
        dirLight2.position.set(-4, -2, 2);
        scene.add(dirLight2);
        
        const headLight = new THREE.DirectionalLight(0xffffff, 0.25); // Subtle headlight for curvature definition
        headLight.position.set(0, 0, 6);
        scene.add(headLight);

        // Cabinet base
        const cabGeom = new THREE.BoxGeometry(2.1, 1.2, 1.3);
        const cabMat = new THREE.MeshStandardMaterial({ color: 0x898989, roughness: 0.5, metalness: 0.15 });
        const cabinet = new THREE.Mesh(cabGeom, cabMat);
        cabinet.position.y = -0.5;
        modelGroup.add(cabinet);
        
        // Countertop
        const counterGeom = new THREE.BoxGeometry(2.2, 0.12, 1.4);
        const counterMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.05 });
        const counter = new THREE.Mesh(counterGeom, counterMat);
        counter.position.y = 0.16;
        modelGroup.add(counter);
        
        // Ceramic Basin (rounded bowl shape)
        const basinGeom = new THREE.CylinderGeometry(0.65, 0.5, 0.35, 24, 1, false);
        const basinMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.02 });
        const basin = new THREE.Mesh(basinGeom, basinMat);
        basin.position.y = 0.4;
        modelGroup.add(basin);
        
        // Chrome Mixer Faucet
        const tapGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.45, 12);
        const tapMat = new THREE.MeshStandardMaterial({ color: 0xdcdcdc, metalness: 0.95, roughness: 0.1 });
        const faucetBody = new THREE.Mesh(tapGeom, tapMat);
        faucetBody.position.set(0, 0.75, -0.4);
        modelGroup.add(faucetBody);
        
        const spoutGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.35, 12);
        const faucetSpout = new THREE.Mesh(spoutGeom, tapMat);
        faucetSpout.rotation.x = Math.PI / 2.2;
        faucetSpout.position.set(0, 0.9, -0.23);
        modelGroup.add(faucetSpout);
        
        const handleGeom = new THREE.BoxGeometry(0.12, 0.04, 0.04);
        const handle = new THREE.Mesh(handleGeom, tapMat);
        handle.position.set(0, 0.96, -0.4);
        modelGroup.add(handle);
        
        camera.lookAt(0, 0, 0);
        
      } else if (product === 'mixer') {
        // Bright metallic lighting for chrome faucet
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.1);
        dirLight1.position.set(5, 8, 5);
        scene.add(dirLight1);
        
        const dirLight2 = new THREE.DirectionalLight(0x507B8C, 0.65);
        dirLight2.position.set(-5, -2, 2);
        scene.add(dirLight2);
        
        const headLight = new THREE.DirectionalLight(0xffffff, 0.65);
        headLight.position.set(0, 0, 6);
        scene.add(headLight);

        // Continuous, high-fidelity Water Mixer Faucet using TubeGeometry
        const chromeMat = new THREE.MeshStandardMaterial({ 
          color: 0xe5eaec, // bright light-grey silver
          metalness: 0.85, 
          roughness: 0.22 
        });
        
        // Define points for gooseneck faucet curve
        const curvePoints = [];
        curvePoints.push(new THREE.Vector3(-0.3, -1.1, 0)); // base offset
        curvePoints.push(new THREE.Vector3(-0.3, 0.4, 0));  // straight column
        curvePoints.push(new THREE.Vector3(-0.25, 0.9, 0)); // bend starts
        curvePoints.push(new THREE.Vector3(0.15, 1.25, 0)); // arch top
        curvePoints.push(new THREE.Vector3(0.65, 0.85, 0)); // spout down-arch
        curvePoints.push(new THREE.Vector3(0.7, 0.35, 0));  // spout tip
        
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const tubeGeom = new THREE.TubeGeometry(curve, 40, 0.24, 16, false);
        const faucetNeck = new THREE.Mesh(tubeGeom, chromeMat);
        modelGroup.add(faucetNeck);
        
        // Base plate collar
        const baseGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.12, 32);
        const base = new THREE.Mesh(baseGeom, chromeMat);
        base.position.set(-0.3, -1.1, 0);
        modelGroup.add(base);
        
        // Spout tip aerator collar
        const tipGeom = new THREE.CylinderGeometry(0.26, 0.26, 0.22, 24);
        const tip = new THREE.Mesh(tipGeom, chromeMat);
        tip.position.set(0.7, 0.35, 0);
        modelGroup.add(tip);
        
        // Modern control lever/handle (on the column side)
        const jointGeom = new THREE.SphereGeometry(0.18, 16, 16);
        const joint = new THREE.Mesh(jointGeom, chromeMat);
        joint.position.set(-0.3, 0.0, 0.24); // side mounting
        modelGroup.add(joint);
        
        const leverGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.65, 12);
        const lever = new THREE.Mesh(leverGeom, chromeMat);
        lever.position.set(-0.3, 0.3, 0.35);
        lever.rotation.x = Math.PI / 6;
        lever.rotation.z = -Math.PI / 12;
        modelGroup.add(lever);
        
        camera.position.set(0, 0.3, 5.0);
        camera.lookAt(0, 0.1, 0);
        
      } else if (product === 'adhesive') {
        // Defined soft lighting to prevent paper sack washout
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
        scene.add(ambientLight);
        
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.75);
        dirLight1.position.set(3, 6, 3);
        scene.add(dirLight1);
        
        const dirLight2 = new THREE.DirectionalLight(0x507B8C, 0.25);
        dirLight2.position.set(-3, -2, 2);
        scene.add(dirLight2);
        
        const headLight = new THREE.DirectionalLight(0xffffff, 0.25);
        headLight.position.set(0, 0, 6);
        scene.add(headLight);

        // Puffy paper sack geometry with 8 subdivisions
        const bagGeom = new THREE.BoxGeometry(1.6, 2.3, 0.7, 8, 8, 8);
        
        const pos = bagGeom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);
          
          // Parabolic bulge factor (1 at center y=0, 0 at top/bottom y=±1.15)
          let dy = y / 1.15;
          let bulge = 1.0 - dy * dy;
          
          // Bulge Z (thickness) and X (width) to look pillowed in the center
          pos.setZ(i, z * (0.5 + 0.8 * bulge));
          pos.setX(i, x * (0.95 + 0.12 * bulge));
          
          // Fold the extreme top/bottom edges flat
          if (Math.abs(y) > 1.05) {
            pos.setZ(i, z * 0.22);
          }
        }
        bagGeom.computeVertexNormals();
        
        // Canvas texture for paper bag surface
        const texCanvas = document.createElement('canvas');
        texCanvas.width = 256;
        texCanvas.height = 256;
        const ctx = texCanvas.getContext('2d');
        
        // Background paper color
        ctx.fillStyle = '#dfdfdf';
        ctx.fillRect(0, 0, 256, 256);
        
        // Texture noise overlay
        ctx.fillStyle = 'rgba(0,0,0,0.03)';
        for (let i = 0; i < 3000; i++) {
          let rx = Math.random() * 256;
          let ry = Math.random() * 256;
          ctx.fillRect(rx, ry, 1, 1);
        }
        
        // Horizontal grey bands
        ctx.fillStyle = '#898989';
        ctx.fillRect(0, 35, 256, 12);
        ctx.fillRect(0, 209, 256, 12);
        
        // Aqua circular logo
        ctx.fillStyle = '#507B8C';
        ctx.beginPath();
        ctx.arc(128, 128, 48, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('STORE TILES', 128, 115);
        ctx.font = 'bold 11px Montserrat, sans-serif';
        ctx.fillText('ADHESIVE', 128, 138);
        ctx.font = '8px Montserrat, sans-serif';
        ctx.fillStyle = '#898989';
        ctx.fillText('CLASS C2TE - 25 KG', 128, 235);
        
        const texture = new THREE.CanvasTexture(texCanvas);
        const bagMat = new THREE.MeshStandardMaterial({ map: texture, roughness: 1.0, metalness: 0.0 });
        const bag = new THREE.Mesh(bagGeom, bagMat);
        modelGroup.add(bag);
        
        camera.position.set(0, 0, 5.0);
        camera.lookAt(0, 0, 0);
      }
      
      scene.add(modelGroup);
      
      // Auto-rotation animation loop
      let animId;
      function animateModel() {
        animId = requestAnimationFrame(animateModel);
        modelGroup.rotation.y += 0.012;
        renderer.render(scene, camera);
      }
      animateModel();
    });
  }
});
