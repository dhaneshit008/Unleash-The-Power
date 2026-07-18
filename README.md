# ANIME LEGENDS — Premium 3D Anime Character Showcase

A premium, animation-rich static website showcasing legendary anime characters
(Naruto, Gojo Satoru, Kakashi Hatake, Itachi, Madara, Sukuna, Levi, Tanjiro,
Luffy, Goku, Ichigo, Sasuke) with individual profile pages, unique signature
power animations, stat visualizations and cinematic effects.

## ✅ Currently Completed Features

### Global / Shared
- Custom animated cursor (dot + trailing ring) with hover states
- Full-screen animated loader ("Summoning Legends") on first load
- Canvas-based ambient particle background system
- Sticky glass-morphism navbar with scroll state, live search, mobile toggle
- Scroll-reveal animations (`data-anim="fade-up"`) via IntersectionObserver
- Responsive layout down to small mobile screens
- Premium dark theme with Cinzel / Rajdhani / Inter typography and Font Awesome icons

### Home Page (`index.html`)
- Auto-rotating cinematic hero background slideshow of 6 featured characters
- Animated gradient hero title, animated stat counters, marquee power-terms strip
- Full character roster grid (12 characters) rendered dynamically from `js/data.js`
- 3D mouse-tilt interactive character cards with glow aura themed per character
- Anime-universe filter chips (Naruto, Jujutsu Kaisen, One Piece, Dragon Ball,
  Bleach, Attack on Titan, Demon Slayer) + live text search combined filtering
- "Random Legend" button to jump to a random profile
- About/experience section with animated orbital rings

### Character Profile Page (`character.html?id=<character-id>`)
- Dynamic hero section themed with each character's unique color palette
  (CSS variables driven per-character: primary / secondary / glow / dark)
- Floating character portrait with animated rings + ambient GSAP particles
- Character switcher strip (avatar rail) to jump between all 12 legends
- **Unique bespoke "Unleash Power" GSAP animation for every character**, e.g.:
  - Naruto — Chakra Swirl (Rasengan-style particle burst)
  - Gojo Satoru — Infinity Void (expanding domain rings)
  - Kakashi Hatake — Spinning Sharingan with tomoe
  - Itachi Uchiha — Rising Susanoo glow + rune rings
  - Madara Uchiha — Rinnegan dimensional warp rings
  - Sukuna — Malevolent Shrine multi-directional slash burst
  - Levi Ackerman — Rapid ODM blade slash combo
  - Tanjiro Kamado — Rising flame breathing particles
  - Luffy — Gear 5 bouncing bubble physics
  - Goku — Charging Kamehameha beam blast
  - Ichigo Kurosaki — Bankai shockwave + blade fan
  - Sasuke Uchiha — Chidori lightning spark burst
- Auto-plays the signature power animation once on page load, replayable on demand
- Powers & Abilities grid (4 unique abilities per character with icon + description)
- Animated Chart.js radar chart + animated stat bars (Power / Speed / Intelligence
  / Defense / Energy)
- Lore & backstory section
- "More Legends" recommendation grid (randomized, excludes current character)

## 🌐 Functional Entry URIs

| Path | Parameters | Description |
|---|---|---|
| `index.html` | — | Home / roster showcase page |
| `index.html#roster` | — | Scrolls to the roster grid |
| `index.html#about` | — | Scrolls to the about/experience section |
| `character.html` | `?id=<character-id>` | Individual character profile page. Defaults to the first character if `id` is missing/invalid. |

**Valid `id` values:** `naruto`, `gojo`, `kakashi`, `itachi`, `madara`, `sukuna`,
`levi`, `tanjiro`, `luffy`, `goku`, `ichigo`, `sasuke`

Example: `character.html?id=gojo`

## 🗂 Project Structure
```
index.html            Home / roster showcase page
character.html        Individual character profile page
css/
  ├── style.css        Global styles, navbar, hero, roster grid, about, footer
  └── character.css     Character page styles + all power-fx animation elements
js/
  ├── data.js           Character database (bio, stats, powers, theme colors, power-fx key)
  ├── particles.js       Shared FX: custom cursor, bg particle canvas, scroll reveal, navbar state
  ├── main.js            Home page logic: hero slideshow, roster render, tilt, filters, search
  └── character.js        Character page logic: hero populate, GSAP power animations, Chart.js radar
images/               Downloaded character artwork (jpg)
```

## 💾 Data Model

All character data lives client-side in `js/data.js` as a plain JS array
(`CHARACTERS`) — no backend/database is required for this showcase. Each
character object contains:

```js
{
  id, name, anime, title, image,
  colors: { primary, secondary, glow, dark },
  tagline, quote, bio,
  powerfx,                 // key into the animation engine in character.js
  signatureMove,
  stats: { power, speed, intelligence, defense, energy },
  powers: [ { icon, name, desc }, ... ]
}
```

No RESTful Table API / database tables are used in this project since all
content is static reference data suited to a client-side array.

## 🚧 Not Yet Implemented / Possible Enhancements
- Search does not currently persist in the URL (no shareable filtered links)
- No audio/sound-effect layer for power activations (would require licensed SFX)
- No user accounts, favorites, or persistence across sessions
- Only 12 characters are included; roster can be extended by adding entries to `CHARACTERS`
- No dedicated 404 page for invalid `id` values (falls back to first character)

## 🔜 Recommended Next Steps
1. Add more characters to `js/data.js` (just follow the existing object shape) —
   the UI (grid, filters, profile page) will pick them up automatically.
2. Add a "favorites" system using `localStorage` if persistence is desired.
3. Consider adding subtle Web Audio API sound effects tied to the `playPower()`
   trigger in `js/character.js` for extra immersion (ensure royalty-free assets).
4. Add Open Graph / Twitter meta tags per character page for richer social shares.
5. Optionally lazy-load `images/*.jpg` at higher resolution variants for very
   large screens.

## 🚀 Deployment
This is a fully static site (HTML/CSS/JS + CDN libraries only — GSAP, Chart.js,
Font Awesome, Google Fonts). To deploy your website and make it live, go to the
**Publish tab**, which will handle deployment automatically and give you a live
URL.
