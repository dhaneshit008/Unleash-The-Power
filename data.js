/* ============================================================
   CHARACTER DATABASE — Anime Legends Showcase
   Each character has theme colors used to drive dynamic CSS
   variables, a unique "power-fx" animation key used by
   character.js to render a bespoke power effect, and stats
   used for the animated radar/bars.
   ============================================================ */

const CHARACTERS = [
  {
    id: "naruto",
    name: "Naruto Uzumaki",
    anime: "Naruto Shippuden",
    title: "The Seventh Hokage",
    image: "images/naruto.jpg",
    colors: { primary: "#ff8c1a", secondary: "#ffb347", glow: "#ffb703", dark: "#3a1a00" },
    tagline: "Believe it. The will of fire never dies.",
    quote: "\u201CI'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!\u201D",
    bio: "Once the village outcast carrying the Nine-Tails, Naruto Uzumaki rose through relentless determination to become the Seventh Hokage. Master of Sage Mode and the Nine-Tails Chakra Mode, his unbreakable spirit and Shadow Clone mastery make him one of the most powerful shinobi to ever live.",
    powerfx: "chakra-swirl",
    signatureMove: "Rasengan / Sage Art: Ultra-Big Ball Rasengan",
    stats: { power: 96, speed: 90, intelligence: 78, defense: 88, energy: 99 },
    powers: [
      { icon: "fa-solid fa-wind", name: "Nine-Tails Chakra Mode", desc: "Fuses with Kurama's chakra for immense speed, power and regeneration." },
      { icon: "fa-solid fa-circle-notch", name: "Rasengan", desc: "A rotating sphere of concentrated chakra capable of devastating close-range damage." },
      { icon: "fa-solid fa-clone", name: "Shadow Clone Jutsu", desc: "Creates fully-functional physical clones to overwhelm enemies." },
      { icon: "fa-solid fa-sun", name: "Sage Mode", desc: "Harnesses natural energy for heightened senses and strength." }
    ]
  },
  {
    id: "gojo",
    name: "Gojo Satoru",
    anime: "Jujutsu Kaisen",
    title: "The Strongest Sorcerer",
    image: "images/gojo.jpg",
    colors: { primary: "#3b82f6", secondary: "#a855f7", glow: "#7dd3fc", dark: "#050014" },
    tagline: "Throughout heaven and earth, I alone am the honored one.",
    quote: "\u201CI'm the strongest, so it's my duty to look after those weaker than me.\u201D",
    bio: "A special-grade jujutsu sorcerer and teacher at Tokyo Jujutsu High, Gojo Satoru wields the legendary Limitless technique and Six Eyes, making him virtually unbeatable. His Domain Expansion, Unlimited Void, traps opponents in an inescapable void of infinite information.",
    powerfx: "infinity-void",
    signatureMove: "Domain Expansion: Unlimited Void",
    stats: { power: 99, speed: 95, intelligence: 93, defense: 97, energy: 98 },
    powers: [
      { icon: "fa-solid fa-infinity", name: "Limitless", desc: "Manipulates space itself to render enemy attacks nearly impossible to land." },
      { icon: "fa-solid fa-eye", name: "Six Eyes", desc: "Perceives cursed energy with perfect clarity, allowing precise technique control." },
      { icon: "fa-solid fa-circle-dot", name: "Domain Expansion", desc: "Unlimited Void — an inescapable domain that overwhelms the target's mind." },
      { icon: "fa-solid fa-hand", name: "Blue / Red / Purple", desc: "Convergent and divergent cursed energy attacks of catastrophic force." }
    ]
  },
  {
    id: "kakashi",
    name: "Kakashi Hatake",
    anime: "Naruto Shippuden",
    title: "Copy Ninja",
    image: "images/kakashi.jpg",
    colors: { primary: "#64748b", secondary: "#38bdf8", glow: "#94f0ff", dark: "#0b1220" },
    tagline: "A shinobi who breaks the rules is scum.",
    quote: "\u201CThose who break the rules are scum, but those who abandon their comrades are worse than scum.\u201D",
    bio: "Renowned as the Copy Ninja for mirroring over a thousand jutsu with his transplanted Sharingan, Kakashi Hatake became the Sixth Hokage. His lightning-natured Chidori and mastery of Kamui make him a tactical and combat legend of Konoha.",
    powerfx: "sharingan-spin",
    signatureMove: "Chidori / Kamui",
    stats: { power: 88, speed: 87, intelligence: 96, defense: 82, energy: 85 },
    powers: [
      { icon: "fa-solid fa-eye", name: "Sharingan", desc: "Copies almost any jutsu witnessed and reads enemy movement instantly." },
      { icon: "fa-solid fa-bolt", name: "Chidori", desc: "A concentrated lightning-blade jutsu piercing through nearly anything." },
      { icon: "fa-solid fa-vortex", name: "Kamui", desc: "Warps matter into another dimension, enabling intangibility or teleportation." },
      { icon: "fa-solid fa-book", name: "Master Tactician", desc: "Unrivaled strategic mind, having copied over a thousand techniques." }
    ]
  },
  {
    id: "itachi",
    name: "Itachi Uchiha",
    anime: "Naruto Shippuden",
    title: "The Prodigy of the Uchiha",
    image: "images/itachi.jpg",
    colors: { primary: "#dc2626", secondary: "#111827", glow: "#ff4d4d", dark: "#100000" },
    tagline: "Sacrifice for peace, even in the shadow of truth.",
    quote: "\u201CPeople live their lives bound by what they accept as truth.\u201D",
    bio: "A genius Uchiha who sacrificed everything—including his clan's trust—to protect Konoha from the shadows. Itachi commands the Mangekyo Sharingan, summoning Susanoo and the illusion-weaving Tsukuyomi to dismantle enemies with terrifying precision.",
    powerfx: "susanoo-rise",
    signatureMove: "Susanoo / Tsukuyomi",
    stats: { power: 92, speed: 89, intelligence: 98, defense: 90, energy: 90 },
    powers: [
      { icon: "fa-solid fa-eye", name: "Mangekyo Sharingan", desc: "Grants access to Tsukuyomi and the ethereal guardian Susanoo." },
      { icon: "fa-solid fa-user-shield", name: "Susanoo", desc: "A colossal spectral warrior granting immense offense and defense." },
      { icon: "fa-solid fa-moon", name: "Tsukuyomi", desc: "A genjutsu that traps the victim's mind in a controlled illusory world." },
      { icon: "fa-solid fa-fire", name: "Amaterasu", desc: "Black flames that burn eternally, nearly impossible to extinguish." }
    ]
  },
  {
    id: "madara",
    name: "Madara Uchiha",
    anime: "Naruto Shippuden",
    title: "Legendary Uchiha Leader",
    image: "images/madara.jpg",
    colors: { primary: "#7c3aed", secondary: "#ef4444", glow: "#c084fc", dark: "#120018" },
    tagline: "In this world, wherever there is light, there are shadows.",
    quote: "\u201CIn this world, wherever there is light there are also shadows.\u201D",
    bio: "Co-founder of Konoha and one of the most powerful Uchiha ever born, Madara awakened the Rinnegan and commanded the Ten-Tails. A master of Susanoo and space-time ninjutsu, his ambitions nearly reshaped the entire shinobi world through the Infinite Tsukuyomi.",
    powerfx: "rinnegan-warp",
    signatureMove: "Perfect Susanoo / Rinnegan",
    stats: { power: 99, speed: 91, intelligence: 95, defense: 96, energy: 97 },
    powers: [
      { icon: "fa-solid fa-circle-dot", name: "Rinnegan", desc: "Grants command over powerful techniques including gravity manipulation." },
      { icon: "fa-solid fa-user-shield", name: "Perfect Susanoo", desc: "A complete, colossal Susanoo of overwhelming destructive power." },
      { icon: "fa-solid fa-water", name: "Wood Release", desc: "Controls the power of the First Hokage to bind or crush foes." },
      { icon: "fa-solid fa-meteor", name: "Ten-Tails Jinchuriki", desc: "Commands the god-tree beast for near-limitless destructive force." }
    ]
  },
  {
    id: "sukuna",
    name: "Ryomen Sukuna",
    anime: "Jujutsu Kaisen",
    title: "King of Curses",
    image: "images/sukuna.jpg",
    colors: { primary: "#e11d48", secondary: "#f59e0b", glow: "#ff2d55", dark: "#0d0000" },
    tagline: "Know your place, insects.",
    quote: "\u201CThat's what makes it fun, right?\u201D",
    bio: "The King of Curses, sealed for a thousand years before returning to unleash unmatched cursed energy. Sukuna's Malevolent Shrine and Domain Expansion place him among the most feared beings ever recorded in jujutsu history.",
    powerfx: "malevolent-shrine",
    signatureMove: "Domain Expansion: Malevolent Shrine",
    stats: { power: 99, speed: 94, intelligence: 89, defense: 92, energy: 96 },
    powers: [
      { icon: "fa-solid fa-hand-fist", name: "Dismantle / Cleave", desc: "Invisible slashing attacks that cut through anything in their path." },
      { icon: "fa-solid fa-fire-flame-curved", name: "Fire Arrow", desc: "A devastating pyrokinetic blast capable of leveling city blocks." },
      { icon: "fa-solid fa-torii-gate", name: "Malevolent Shrine", desc: "Domain Expansion guaranteeing dismantling hits on anyone trapped inside." },
      { icon: "fa-solid fa-skull", name: "Four Arms, Unmatched Skill", desc: "Superhuman physical prowess honed over a thousand years." }
    ]
  },
  {
    id: "levi",
    name: "Levi Ackerman",
    anime: "Attack on Titan",
    title: "Humanity's Strongest Soldier",
    image: "images/levi.jpg",
    colors: { primary: "#0d9488", secondary: "#94a3b8", glow: "#5eead4", dark: "#03100e" },
    tagline: "The only thing we're allowed to do is believe.",
    quote: "\u201CThe world is cruel... and yet so beautiful.\u201D",
    bio: "Captain of the Survey Corps' Special Operations Squad, Levi Ackerman's blistering ODM gear mastery and blade work make him the deadliest titan-killer humanity has ever produced.",
    powerfx: "blade-slash",
    signatureMove: "ODM Gear Aerial Barrage",
    stats: { power: 85, speed: 98, intelligence: 88, defense: 80, energy: 90 },
    powers: [
      { icon: "fa-solid fa-gears", name: "ODM Gear Mastery", desc: "Unrivaled aerial maneuvering to strike titans' weak points at speed." },
      { icon: "fa-solid fa-khanda", name: "Blade Mastery", desc: "Lightning-fast swordsmanship capable of felling titans in seconds." },
      { icon: "fa-solid fa-person-running", name: "Ackerman Physiology", desc: "Superhuman strength, speed and reflexes activated under pressure." },
      { icon: "fa-solid fa-shield-halved", name: "Tactical Command", desc: "Sharp battlefield instincts that keep squads alive against impossible odds." }
    ]
  },
  {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    anime: "Demon Slayer",
    title: "Water & Sun Breathing User",
    image: "images/tanjiro.jpg",
    colors: { primary: "#059669", secondary: "#dc2626", glow: "#34d399", dark: "#03110a" },
    tagline: "I'll never give up, no matter what.",
    quote: "\u201CNo matter how many people you may lose, you have no choice but to keep on living.\u201D",
    bio: "A compassionate demon slayer driven to protect his sister Nezuko, Tanjiro's keen sense of smell and mastery over Water Breathing evolve into the legendary Hinokami Kagura — the Sun Breathing style.",
    powerfx: "flame-breath",
    signatureMove: "Hinokami Kagura: Sun Breathing",
    stats: { power: 87, speed: 88, intelligence: 80, defense: 84, energy: 91 },
    powers: [
      { icon: "fa-solid fa-water", name: "Water Breathing", desc: "Fluid sword forms that flow like water to overwhelm demons." },
      { icon: "fa-solid fa-sun", name: "Hinokami Kagura", desc: "The legendary Sun Breathing style, feared by demons for generations." },
      { icon: "fa-solid fa-nose", name: "Enhanced Sense of Smell", desc: "Detects emotions, injuries, and even the nature of blood demon arts." },
      { icon: "fa-solid fa-khanda", name: "Nichirin Blade Mastery", desc: "Precise blade techniques capable of beheading demons in an instant." }
    ]
  },
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    anime: "One Piece",
    title: "Captain of the Straw Hat Pirates",
    image: "images/luffy.jpg",
    colors: { primary: "#ef4444", secondary: "#facc15", glow: "#fef08a", dark: "#150a00" },
    tagline: "I'm gonna be King of the Pirates!",
    quote: "\u201CI don't want to conquer anything. I just think the guy with the most freedom in this whole ocean... is the Pirate King!\u201D",
    bio: "The rubber-bodied captain of the Straw Hat Pirates, Luffy awakened his Gear 5 form after unlocking the mythical Hito Hito no Mi, Model: Nika — turning him into the Warrior of Liberation and one of the most unpredictable fighters alive.",
    powerfx: "gear5-bounce",
    signatureMove: "Gear 5: Bajrang Gun",
    stats: { power: 98, speed: 93, intelligence: 74, defense: 89, energy: 100 },
    powers: [
      { icon: "fa-solid fa-shapes", name: "Gum-Gum Fruit", desc: "Rubber body grants immunity to blunt attacks and elastic combat versatility." },
      { icon: "fa-solid fa-sun", name: "Gear 5", desc: "Awakened Nika form bending reality itself around him in playful chaos." },
      { icon: "fa-solid fa-hand-fist", name: "Bajrang Gun", desc: "A giant inflated fist strike capable of leveling entire cities." },
      { icon: "fa-solid fa-crown", name: "Conqueror's Haki", desc: "Overwhelming willpower that can knock out weaker opponents instantly." }
    ]
  },
  {
    id: "goku",
    name: "Son Goku",
    anime: "Dragon Ball Super",
    title: "Saiyan Warrior",
    image: "images/goku.jpg",
    colors: { primary: "#fb923c", secondary: "#38bdf8", glow: "#fde68a", dark: "#140a00" },
    tagline: "A true warrior is always evolving.",
    quote: "\u201CI am the hope of the universe. I am the answer to all living things that cry out for peace.\u201D",
    bio: "Earth's greatest defender and a pure-hearted Saiyan warrior, Goku's endless drive to grow stronger led him from Super Saiyan to Ultra Instinct — a divine state where his body reacts to danger faster than thought itself.",
    powerfx: "kamehameha-beam",
    signatureMove: "Ultra Instinct Kamehameha",
    stats: { power: 99, speed: 99, intelligence: 70, defense: 93, energy: 99 },
    powers: [
      { icon: "fa-solid fa-star", name: "Super Saiyan", desc: "Unlocks explosive power multipliers through righteous rage and training." },
      { icon: "fa-solid fa-bolt", name: "Ultra Instinct", desc: "A divine mastery allowing the body to dodge and counter instinctively." },
      { icon: "fa-solid fa-hand-sparkles", name: "Kamehameha", desc: "A concentrated energy wave blast of immense destructive output." },
      { icon: "fa-solid fa-gauge-high", name: "Instant Transmission", desc: "Teleports instantly to any location by sensing an energy signature." }
    ]
  },
  {
    id: "ichigo",
    name: "Ichigo Kurosaki",
    anime: "Bleach",
    title: "Substitute Soul Reaper",
    image: "images/ichigo.jpg",
    colors: { primary: "#1d4ed8", secondary: "#000000", glow: "#60a5fa", dark: "#05070f" },
    tagline: "I'll protect everyone, even if it costs me everything.",
    quote: "\u201CIf I don't wield the sword, I can't protect you. If I keep wielding the sword, I can't embrace you.\u201D",
    bio: "A substitute Soul Reaper carrying the powers of Hollows, Quincy, and Shinigami all at once, Ichigo Kurosaki's Bankai — Tensa Zangetsu — and his Hollowfied form make him a singular force capable of standing against gods.",
    powerfx: "bankai-slash",
    signatureMove: "Tensa Zangetsu Bankai",
    stats: { power: 95, speed: 92, intelligence: 79, defense: 87, energy: 94 },
    powers: [
      { icon: "fa-solid fa-khanda", name: "Bankai: Tensa Zangetsu", desc: "A lighter, faster blade form vastly amplifying speed and cutting power." },
      { icon: "fa-solid fa-mask", name: "Hollowfication", desc: "Channels inner Hollow power for a dramatic surge in strength." },
      { icon: "fa-solid fa-wind", name: "Getsuga Tensho", desc: "A wave of condensed spiritual energy unleashed from the blade." },
      { icon: "fa-solid fa-eye", name: "Combat Instinct", desc: "Rapid growth in battle lets him adapt to nearly any opponent." }
    ]
  },
  {
    id: "sasuke",
    name: "Sasuke Uchiha",
    anime: "Naruto Shippuden",
    title: "The Last Uchiha",
    image: "images/sasuke.jpg",
    colors: { primary: "#6d28d9", secondary: "#1e1b4b", glow: "#a78bfa", dark: "#0a0014" },
    tagline: "I've got a new dream now — to protect this village.",
    quote: "\u201CFrom now on... I'll live my life without regret.\u201D",
    bio: "Naruto's rival and closest friend, Sasuke Uchiha's tragic past forged him into an elite shinobi wielding the Rinnegan and Amaterasu. His Susanoo, combined with the power of lightning-fast Chidori strikes, makes him one of the deadliest warriors alive.",
    powerfx: "chidori-strike",
    signatureMove: "Indra's Arrow / Susanoo",
    stats: { power: 95, speed: 93, intelligence: 91, defense: 89, energy: 94 },
    powers: [
      { icon: "fa-solid fa-circle-dot", name: "Rinnegan", desc: "Space-time ninjutsu including teleportation and dimensional sight." },
      { icon: "fa-solid fa-user-shield", name: "Susanoo", desc: "A spectral avatar granting immense offensive and defensive might." },
      { icon: "fa-solid fa-bolt", name: "Chidori", desc: "A lightning blade strike capable of piercing nearly any defense." },
      { icon: "fa-solid fa-fire", name: "Amaterasu", desc: "Inextinguishable black flames triggered by the Mangekyo Sharingan." }
    ]
  }
];

// Utility: fetch character by id
function getCharacterById(id) {
  return CHARACTERS.find(c => c.id === id);
}
