/* ============================================================
   SHARED FX: custom cursor, background particle canvas,
   scroll-reveal observer, navbar scroll state.
   Used by both index.html and character.html
   ============================================================ */

(function(){
  /* ---------- Custom Cursor ---------- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring && window.matchMedia('(hover: hover)').matches){
    let mx=0,my=0, rx=0, ry=0;
    window.addEventListener('mousemove', e=>{
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx+'px'; dot.style.top = my+'px';
    });
    function loop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.left = rx+'px'; ring.style.top = ry+'px';
      requestAnimationFrame(loop);
    }
    loop();
    document.addEventListener('mouseover', e=>{
      if (e.target.closest('a, button, .char-card, .filter-chip, input, .switch-avatar, .more-card')){
        ring.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', e=>{
      if (e.target.closest('a, button, .char-card, .filter-chip, input, .switch-avatar, .more-card')){
        ring.classList.remove('hover');
      }
    });
  }

  /* ---------- Navbar Scroll State ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar){
    window.addEventListener('scroll', ()=>{
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive:true });
  }

  /* ---------- Scroll Reveal Observer ---------- */
  const revealTargets = document.querySelectorAll('[data-anim="fade-up"]');
  if (revealTargets.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach((entry, idx)=>{
        if (entry.isIntersecting){
          setTimeout(()=> entry.target.classList.add('in-view'), idx * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => io.observe(el));
  }

  /* ---------- Background Particle Canvas (index page) ---------- */
  const canvas = document.getElementById('particleCanvas');
  if (canvas){
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function createParticles(){
      const count = Math.min(90, Math.floor(window.innerWidth/16));
      particles = Array.from({length:count}, ()=>({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*1.8 + 0.4,
        vy: -(Math.random()*0.4 + 0.1),
        vx: (Math.random()-0.5)*0.2,
        alpha: Math.random()*0.5 + 0.15,
        hue: Math.random() > 0.5 ? '255,140,26' : '125,211,252'
      }));
    }
    function draw(){
      ctx.clearRect(0,0,canvas.width, canvas.height);
      particles.forEach(p=>{
        p.y += p.vy; p.x += p.vx;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width+10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize(); createParticles(); draw();
    window.addEventListener('resize', ()=>{ resize(); createParticles(); });
  }

  /* ---------- Animated Count-up ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length){
    const cio = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          let cur = 0;
          const step = Math.max(1, Math.round(target/40));
          const interval = setInterval(()=>{
            cur += step;
            if (cur >= target){ cur = target; clearInterval(interval); }
            el.textContent = cur;
          }, 30);
          cio.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  }

  /* ---------- Mobile Nav Toggle (simple) ---------- */
  const navToggle = document.getElementById('navToggle');
  if (navToggle){
    navToggle.addEventListener('click', ()=>{
      const links = document.querySelector('.nav-links');
      if (!links) return;
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.position='absolute';
      links.style.top='68px';
      links.style.left='0';
      links.style.right='0';
      links.style.background='rgba(5,6,10,.97)';
      links.style.flexDirection='column';
      links.style.padding='20px 6%';
      links.style.gap='18px';
      links.style.backdropFilter='blur(16px)';
      links.style.borderBottom='1px solid var(--panel-border)';
    });
  }
})();
