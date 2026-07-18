/* ============================================================
   INDEX PAGE LOGIC — hero slideshow, roster grid, 3D tilt cards,
   filtering & search, loader.
   ============================================================ */

(function(){
  /* ---------- Loader ---------- */
  window.addEventListener('load', ()=>{
    const fill = document.getElementById('loaderFill');
    const screen = document.getElementById('loaderScreen');
    if (fill) fill.style.transition = 'width 0.9s ease';
    requestAnimationFrame(()=>{ if(fill) fill.style.width = '100%'; });
    setTimeout(()=>{ if (screen) screen.classList.add('hidden'); }, 1000);
  });
  // Fallback in case load event already fired
  setTimeout(()=>{
    const screen = document.getElementById('loaderScreen');
    if (screen && !screen.classList.contains('hidden')) screen.classList.add('hidden');
  }, 3200);

  /* ---------- Hero Slideshow ---------- */
  const heroSlides = document.getElementById('heroSlides');
  if (heroSlides){
    const featured = CHARACTERS.slice(0, 6);
    featured.forEach((c, i)=>{
      const div = document.createElement('div');
      div.className = 'hero-bg-slide' + (i===0 ? ' active' : '');
      div.style.backgroundImage = `url('${c.image}')`;
      heroSlides.appendChild(div);
    });
    const slides = heroSlides.querySelectorAll('.hero-bg-slide');
    let idx = 0;
    setInterval(()=>{
      slides[idx].classList.remove('active');
      idx = (idx+1) % slides.length;
      slides[idx].classList.add('active');
    }, 4200);
  }

  /* ---------- Render Roster Cards ---------- */
  const grid = document.getElementById('rosterGrid');
  const noResults = document.getElementById('noResults');

  function powerScore(c){
    const s = c.stats;
    return Math.round((s.power + s.speed + s.intelligence + s.defense + s.energy)/5);
  }

  function renderCards(list){
    grid.innerHTML = '';
    if (!list.length){ noResults.hidden = false; return; }
    noResults.hidden = true;
    list.forEach((c, i)=>{
      const card = document.createElement('article');
      card.className = 'char-card';
      card.style.setProperty('--card-glow', c.colors.glow);
      card.style.setProperty('--power-pct', powerScore(c) + '%');
      card.dataset.id = c.id;
      card.dataset.anime = c.anime;
      card.innerHTML = `
        <img src="${c.image}" alt="${c.name}" loading="lazy">
        <div class="card-aura"></div>
        <div class="card-scrim"></div>
        <div class="card-badge"><i class="fa-solid fa-arrow-right"></i></div>
        <div class="card-content">
          <p class="card-anime">${c.anime}</p>
          <h3 class="card-name">${c.name}</h3>
          <p class="card-title">${c.title}</p>
          <div class="card-power-row">
            <span class="card-power-label">PWR</span>
            <div class="card-power-bar"><div class="card-power-fill"></div></div>
            <span class="card-power-label">${powerScore(c)}</span>
          </div>
        </div>
      `;
      card.addEventListener('click', ()=>{
        window.location.href = `character.html?id=${c.id}`;
      });
      grid.appendChild(card);

      // 3D tilt effect
      card.addEventListener('mousemove', (e)=>{
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${px*14}deg) rotateX(${-py*14}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', ()=>{
        card.style.transform = '';
      });

      // reveal on scroll
      setTimeout(()=>{
        const io = new IntersectionObserver((entries)=>{
          entries.forEach(entry=>{
            if (entry.isIntersecting){
              entry.target.classList.add('revealed');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        io.observe(card);
      }, i*10);
    });
  }

  renderCards(CHARACTERS);

  /* ---------- Filtering ---------- */
  const chips = document.querySelectorAll('.filter-chip');
  let currentFilter = 'all';
  let currentSearch = '';

  function applyFilters(){
    let list = CHARACTERS;
    if (currentFilter !== 'all'){
      list = list.filter(c => c.anime === currentFilter);
    }
    if (currentSearch.trim()){
      const q = currentSearch.trim().toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.anime.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
    }
    renderCards(list);
  }

  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput){
    searchInput.addEventListener('input', (e)=>{
      currentSearch = e.target.value;
      applyFilters();
    });
  }

  /* ---------- Random Legend Button ---------- */
  const randomBtn = document.getElementById('heroRandomBtn');
  if (randomBtn){
    randomBtn.addEventListener('click', ()=>{
      const pick = CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)];
      window.location.href = `character.html?id=${pick.id}`;
    });
  }
})();
