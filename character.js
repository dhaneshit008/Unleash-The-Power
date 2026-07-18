/* ============================================================
   CHARACTER DETAIL PAGE LOGIC
   - Loads character from URL param ?id=
   - Populates hero, abilities, stats (Chart.js), lore, switcher
   - Triggers a bespoke GSAP power animation per character
   ============================================================ */

(function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || CHARACTERS[0].id;
  const character = getCharacterById(id) || CHARACTERS[0];

  /* ---------- Apply Theme Variables ---------- */
  const root = document.documentElement;
  root.style.setProperty('--char-primary', character.colors.primary);
  root.style.setProperty('--char-secondary', character.colors.secondary);
  root.style.setProperty('--char-glow', character.colors.glow);
  root.style.setProperty('--char-dark', character.colors.dark);

  /* ---------- Populate Hero ---------- */
  document.title = `${character.name} | ANIME LEGENDS`;
  document.getElementById('charAnime').textContent = character.anime;
  document.getElementById('charName').textContent = character.name;
  document.getElementById('charTitle').textContent = character.title;
  document.getElementById('charQuote').textContent = character.quote;
  document.getElementById('charImage').src = character.image;
  document.getElementById('charImage').alt = character.name;
  document.getElementById('charBio').textContent = character.bio;
  document.getElementById('signatureMoveTitle').textContent = character.signatureMove;
  document.getElementById('charHeroBg').style.backgroundImage = `url('${character.image}')`;

  /* ---------- Hero floating particles ---------- */
  const particleWrap = document.getElementById('charHeroParticles');
  if (particleWrap){
    for (let i=0;i<28;i++){
      const p = document.createElement('span');
      const size = Math.random()*4+2;
      p.style.position='absolute';
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.borderRadius='50%';
      p.style.background = character.colors.glow;
      p.style.opacity = (Math.random()*0.5+0.15).toFixed(2);
      p.style.left = Math.random()*100+'%';
      p.style.top = Math.random()*100+'%';
      p.style.filter = 'blur(1px)';
      particleWrap.appendChild(p);
      gsap.to(p, {
        y: `-=${Math.random()*120+60}`,
        x: `+=${(Math.random()-0.5)*80}`,
        opacity: 0,
        duration: Math.random()*4+4,
        repeat: -1,
        delay: Math.random()*4,
        ease: 'sine.inOut'
      });
    }
  }

  /* ---------- Character Switcher ---------- */
  const switcher = document.getElementById('charSwitcher');
  if (switcher){
    CHARACTERS.forEach(c=>{
      const av = document.createElement('a');
      av.href = `character.html?id=${c.id}`;
      av.className = 'switch-avatar' + (c.id === character.id ? ' active' : '');
      av.title = c.name;
      av.innerHTML = `<img src="${c.image}" alt="${c.name}">`;
      switcher.appendChild(av);
    });
    const activeAv = switcher.querySelector('.active');
    if (activeAv) setTimeout(()=> activeAv.scrollIntoView({inline:'center', block:'nearest'}), 300);
  }

  /* ---------- Abilities Grid ---------- */
  const abilitiesGrid = document.getElementById('abilitiesGrid');
  character.powers.forEach((p, i)=>{
    const card = document.createElement('div');
    card.className = 'ability-card';
    card.innerHTML = `
      <div class="ability-icon"><i class="${p.icon}"></i></div>
      <h3 class="ability-name">${p.name}</h3>
      <p class="ability-desc">${p.desc}</p>
    `;
    abilitiesGrid.appendChild(card);
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){
          setTimeout(()=> entry.target.classList.add('revealed'), i*100);
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.2 });
    io.observe(card);
  });

  /* ---------- Stats Bars ---------- */
  const statsBars = document.getElementById('statsBars');
  const statLabels = { power:'Power', speed:'Speed', intelligence:'Intelligence', defense:'Defense', energy:'Energy' };
  Object.keys(character.stats).forEach(key=>{
    const val = character.stats[key];
    const row = document.createElement('div');
    row.className = 'stat-bar-row';
    row.innerHTML = `
      <div class="stat-bar-label"><span>${statLabels[key]}</span><span>${val}</span></div>
      <div class="stat-bar-track"><div class="stat-bar-fill" data-val="${val}"></div></div>
    `;
    statsBars.appendChild(row);
  });
  const barIo = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.querySelectorAll('.stat-bar-fill').forEach(fill=>{
          fill.style.width = fill.dataset.val + '%';
        });
        barIo.unobserve(entry.target);
      }
    });
  }, { threshold:0.3 });
  barIo.observe(statsBars);

  /* ---------- Radar Chart ---------- */
  const radarCtx = document.getElementById('statsRadar');
  if (radarCtx && window.Chart){
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Power','Speed','Intelligence','Defense','Energy'],
        datasets: [{
          label: character.name,
          data: [character.stats.power, character.stats.speed, character.stats.intelligence, character.stats.defense, character.stats.energy],
          backgroundColor: character.colors.primary + '33',
          borderColor: character.colors.glow,
          borderWidth: 2,
          pointBackgroundColor: character.colors.glow,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display:false } },
        scales: {
          r: {
            angleLines: { color:'rgba(255,255,255,.1)' },
            grid: { color:'rgba(255,255,255,.1)' },
            pointLabels: { color:'#c7cbdb', font:{ family:'Rajdhani', size:12, weight:600 } },
            ticks: { display:false, backdropColor:'transparent' },
            suggestedMin: 0, suggestedMax: 100
          }
        }
      }
    });
  }

  /* ---------- More Legends Grid ---------- */
  const moreGrid = document.getElementById('moreGrid');
  const others = CHARACTERS.filter(c=>c.id !== character.id);
  const shuffled = others.sort(()=>Math.random()-0.5).slice(0,4);
  shuffled.forEach(c=>{
    const card = document.createElement('a');
    card.href = `character.html?id=${c.id}`;
    card.className = 'more-card';
    card.innerHTML = `
      <img src="${c.image}" alt="${c.name}" loading="lazy">
      <div class="more-card-scrim"><span class="more-card-name">${c.name}</span></div>
    `;
    moreGrid.appendChild(card);
  });

  /* =========================================================
     POWER ANIMATION ENGINE
     Each character maps to a bespoke GSAP timeline built from
     dynamically created DOM elements inside #powerStageFx.
     ========================================================= */
  const stageFx = document.getElementById('powerStageFx');
  const caption = document.getElementById('powerCaption');
  const unleashBtn = document.getElementById('unleashBtn');
  let animating = false;

  function clearStage(){ stageFx.innerHTML = ''; }

  function makeEl(cls, styles){
    const el = document.createElement('div');
    el.className = cls;
    Object.assign(el.style, styles || {});
    stageFx.appendChild(el);
    return el;
  }

  const animations = {
    'chakra-swirl': (tl)=>{
      const ring = makeEl('fx-chakra-ring');
      tl.to(ring, { opacity:1, scale:1.4, duration:.6, ease:'power2.out' }, 0)
        .to(ring, { scale:2.4, opacity:0, duration:1, ease:'power2.in' }, .6);
      for (let i=0;i<24;i++){
        const angle = (i/24)*Math.PI*2;
        const dist = 150;
        const p = makeEl('fx-chakra-particle', { left:'50%', top:'50%' });
        tl.to(p, { opacity:1, duration:.2 }, i*0.02)
          .to(p, { x: Math.cos(angle)*dist, y: Math.sin(angle)*dist, rotation:360, duration:1, ease:'power1.out' }, i*0.02)
          .to(p, { opacity:0, duration:.4 }, .8+i*0.01);
      }
    },
    'infinity-void': (tl)=>{
      const circle = makeEl('fx-void-circle');
      tl.to(circle, { opacity:1, scale:1, duration:.1 }, 0)
        .fromTo(circle, { scale:0.2 }, { scale:2.2, duration:1.4, ease:'expo.out' }, 0)
        .to(circle, { opacity:0, duration:.6 }, 1.2);
      for (let i=0;i<4;i++){
        const ring = makeEl('fx-void-ring', { width: (80+i*70)+'px', height:(80+i*70)+'px' });
        tl.fromTo(ring, { opacity:0, scale:.5, rotation:0 }, { opacity:.7, scale:1.3, rotation:180, duration:1.6, ease:'power2.out' }, i*0.1)
          .to(ring, { opacity:0, duration:.5 }, 1.2+i*0.05);
      }
    },
    'sharingan-spin': (tl)=>{
      const eye = makeEl('fx-sharingan');
      tl.fromTo(eye, { opacity:0, scale:.3, rotation:0 }, { opacity:1, scale:1, duration:.6, ease:'back.out(1.7)' }, 0)
        .to(eye, { rotation:340, duration:1.6, ease:'power1.inOut' }, .3)
        .to(eye, { opacity:0, scale:1.3, duration:.5 }, 1.7);
      const positions = [[0,-60],[52,30],[-52,30]];
      positions.forEach((pos, i)=>{
        const tomoe = document.createElement('div');
        tomoe.className='tomoe';
        tomoe.style.transform = `translate(${pos[0]}px, ${pos[1]}px) rotate(${i*120}deg)`;
        eye.appendChild(tomoe);
      });
    },
    'susanoo-rise': (tl)=>{
      const glow = makeEl('fx-susanoo-glow', { bottom:'0', left:'50%', transform:'translateX(-50%)' });
      tl.fromTo(glow, { opacity:0, y:80, scale:.6 }, { opacity:.85, y:-10, scale:1, duration:1.2, ease:'power2.out' }, 0)
        .to(glow, { opacity:0, duration:.6 }, 1.6);
      for (let i=0;i<3;i++){
        const ring = makeEl('fx-rune-ring', { width:(120+i*60)+'px', height:(120+i*60)+'px' });
        tl.fromTo(ring, { opacity:0, rotation:0, scale:.7 }, { opacity:.6, rotation:200, scale:1.1, duration:1.6, ease:'power1.out' }, .2+i*0.1)
          .to(ring, { opacity:0, duration:.5 }, 1.6);
      }
    },
    'rinnegan-warp': (tl)=>{
      for (let i=0;i<4;i++){
        const ring = makeEl('fx-rune-ring', { width:(90+i*70)+'px', height:(90+i*70)+'px', borderColor: i%2 ? 'var(--char-primary)' : 'var(--char-secondary)' });
        tl.fromTo(ring, { opacity:0, rotation:0, scale:.4 }, { opacity:.75, rotation: i%2? 260 : -260, scale:1.2, duration:1.8, ease:'power2.out' }, i*0.08)
          .to(ring, { opacity:0, duration:.5 }, 1.7);
      }
      const glow = makeEl('fx-susanoo-glow', { bottom:'10%', left:'50%', transform:'translateX(-50%)', opacity:0 });
      tl.to(glow, { opacity:.5, duration:1 }, .3).to(glow, { opacity:0, duration:.6 }, 1.6);
    },
    'malevolent-shrine': (tl)=>{
      for (let i=0;i<10;i++){
        const angle = Math.random()*360;
        const len = 120+Math.random()*140;
        const slash = makeEl('fx-shrine-slash', {
          width: len+'px', left:'50%', top:'50%',
          transform:`translate(-50%,-50%) rotate(${angle}deg)`
        });
        tl.fromTo(slash, { opacity:0, scaleX:0 }, { opacity:1, scaleX:1, duration:.25, ease:'power4.out' }, i*0.06)
          .to(slash, { opacity:0, duration:.4 }, .3+i*0.06);
      }
      const glow = makeEl('fx-void-circle', { background:`radial-gradient(circle, var(--char-secondary) 0%, var(--char-primary) 40%, transparent 75%)` });
      tl.fromTo(glow, { opacity:0, scale:.3 }, { opacity:.6, scale:1.8, duration:1.4, ease:'power2.out' }, 0)
        .to(glow, { opacity:0, duration:.5 }, 1.2);
    },
    'blade-slash': (tl)=>{
      for (let i=0;i<6;i++){
        const angle = -30 + i*12;
        const blade = makeEl('fx-blade', { left:'50%', top:'50%', transform:`translate(-110%,-50%) rotate(${angle}deg)` });
        tl.fromTo(blade, { opacity:0, x:-140 }, { opacity:1, x:140, duration:.35, ease:'power4.out' }, i*0.09)
          .to(blade, { opacity:0, duration:.25 }, .3+i*0.09);
      }
    },
    'flame-breath': (tl)=>{
      for (let i=0;i<18;i++){
        const flame = makeEl('fx-flame', { left: (44+Math.random()*12)+'%', bottom:'10%' });
        tl.fromTo(flame, { opacity:0, y:0, scale:.4 }, { opacity:1, y:-(180+Math.random()*80), scale:1+Math.random()*0.6, rotation:(Math.random()-0.5)*40, duration:1.2+Math.random()*0.6, ease:'power1.out' }, i*0.05)
          .to(flame, { opacity:0, duration:.4 }, .8+i*0.05);
      }
    },
    'gear5-bounce': (tl)=>{
      for (let i=0;i<10;i++){
        const size = 20+Math.random()*50;
        const bubble = makeEl('fx-bubble', { width:size+'px', height:size+'px', left:(20+Math.random()*60)+'%', top:(20+Math.random()*60)+'%' });
        tl.fromTo(bubble, { opacity:0, scale:0, y:40 }, { opacity:.8, scale:1, y:-30, duration:.9, ease:'bounce.out' }, i*0.08)
          .to(bubble, { opacity:0, duration:.4 }, .9+i*0.05);
      }
    },
    'kamehameha-beam': (tl)=>{
      const beam = makeEl('fx-beam', { left:'-10%', top:'50%', width:'0%', transform:'translateY(-50%)' });
      tl.to(beam, { width:'120%', duration:.15, ease:'power1.in' }, .3)
        .to(beam, { opacity:1, duration:.05 }, .3)
        .to(beam, { opacity:0, duration:.5 }, 1.0);
      const charge = makeEl('fx-void-circle', { left:'6%', top:'50%', transform:'translate(-50%,-50%)', width:'60px', height:'60px' });
      tl.fromTo(charge, { opacity:0, scale:.2 }, { opacity:1, scale:1.4, duration:.5, ease:'power2.out' }, 0)
        .to(charge, { opacity:0, duration:.2 }, .45);
    },
    'bankai-slash': (tl)=>{
      const wave = makeEl('fx-bankai-wave');
      tl.fromTo(wave, { opacity:0, scale:.2 }, { opacity:.8, scale:1.6, duration:1, ease:'power2.out' }, 0)
        .to(wave, { opacity:0, duration:.6 }, .9);
      for (let i=0;i<5;i++){
        const blade = makeEl('fx-blade', { left:'50%', top:'50%', width:'260px', transform:`translate(-50%,-50%) rotate(${i*36}deg)` });
        tl.fromTo(blade, { opacity:0, scaleX:0 }, { opacity:1, scaleX:1, duration:.3, ease:'power3.out' }, .1+i*0.07)
          .to(blade, { opacity:0, duration:.3 }, .5+i*0.07);
      }
    },
    'chidori-strike': (tl)=>{
      for (let i=0;i<26;i++){
        const len = 20+Math.random()*60;
        const angle = Math.random()*360;
        const spark = makeEl('fx-spark', {
          height: len+'px', left:'50%', top:'50%',
          transform:`translate(-50%,-50%) rotate(${angle}deg)`
        });
        tl.fromTo(spark, { opacity:0, scaleY:0 }, { opacity:1, scaleY:1, duration:.15, ease:'power4.out' }, i*0.02)
          .to(spark, { opacity:0, duration:.3 }, .2+i*0.02);
      }
      const glow = makeEl('fx-void-circle', { background:'radial-gradient(circle, #fff 0%, var(--char-secondary) 40%, transparent 75%)', width:'160px', height:'160px' });
      tl.fromTo(glow, { opacity:0, scale:.2 }, { opacity:.9, scale:1.3, duration:.5, ease:'power2.out' }, 0)
        .to(glow, { opacity:0, duration:.4 }, .5);
    }
  };

  function playPower(){
    if (animating) return;
    animating = true;
    clearStage();
    caption.style.opacity = 0;
    const build = animations[character.powerfx] || animations['chakra-swirl'];
    const tl = gsap.timeline({
      onComplete: ()=>{
        animating = false;
        caption.textContent = character.signatureMove;
        gsap.to(caption, { opacity:1, duration:.4 });
        setTimeout(clearStage, 200);
      }
    });
    build(tl);
    caption.textContent = 'Unleashing ' + character.signatureMove + '...';
  }

  if (unleashBtn){
    unleashBtn.addEventListener('click', playPower);
  }
  // Auto-trigger once shortly after load for cinematic first impression
  setTimeout(playPower, 900);

  /* ---------- Ambient background canvas particles themed to character ---------- */
  const canvas = document.getElementById('powerCanvas');
  if (canvas){
    const ctx = canvas.getContext('2d');
    function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    const glowColor = character.colors.glow;
    const rgb = hexToRgb(glowColor);
    let particles = Array.from({length:60}, ()=>({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*1.6+.3, vy:-(Math.random()*0.3+0.05), vx:(Math.random()-0.5)*0.15,
      a: Math.random()*0.5+0.1
    }));
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p=>{
        p.y+=p.vy; p.x+=p.vx;
        if (p.y<-10) p.y=canvas.height+10;
        if (p.x<-10) p.x=canvas.width+10;
        if (p.x>canvas.width+10) p.x=-10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${p.a})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
  function hexToRgb(hex){
    hex = hex.replace('#','');
    if (hex.length===3) hex = hex.split('').map(c=>c+c).join('');
    const num = parseInt(hex,16);
    return { r:(num>>16)&255, g:(num>>8)&255, b:num&255 };
  }
})();
