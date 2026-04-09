# Building Blocks — Portfolio

This document describes the non-trivial building blocks used across the site: CSS variables, theme overrides, animations/keyframes, utilities, the custom cursor, and the JS hooks that drive them.

**1. CSS Variables (:root)**

- Color tokens:
    - `--bg-dark`, `--bg-card`, `--bg-card-hover` — background surfaces (dark theme defaults).
    - `--text-primary`, `--text-secondary` — foreground colors for headings and body copy.
    - `--accent-red`, `--accent-orange`, `--accent-purple`, `--accent-blue` — accent palette used for gradients, highlights and icons.
- Gradients:
    - `--gradient-primary`, `--gradient-secondary`, `--gradient-glow` — precomposed linear-gradient values for headings, brand accents, and subtle glows.
- Typography:
    - `--font-sans`, `--font-mono`, `--font-heading` — font stacks (Inter, JetBrains Mono, Outfit).
- Glass effect helpers:
    - `--border-glass`, `--glass-shadow` — thin translucent borders and shadow values used for card surfaces.
- Motion helpers:
    - `--transition-fast`, `--transition-normal`, `--transition-slow`, `--ease` — easing and timing constants used across hover/transform/transition rules.
- Convenience alias:
    - `--accent` — set to an accent token (used for cursor and small highlights).

**2. Theme overrides (light mode)**

- Selector: `body.light-theme` toggles a group of variable overrides to switch backgrounds, text colors, borders, and shadows for light mode.
- Scoped overrides: many rules are written as `body.light-theme <selector>` to tweak colors for cards, titles, and small UI pieces when light mode is active.
- JS integration: theme toggled by `#theme-toggle` and persisted in `localStorage`.

**3. Reveal & entrance animations (CSS + JS)**

- CSS classes:
    - `.reveal-up`, `.reveal-left`, `.reveal-right` — initial hidden states (opacity:0 + transform). When `.active` is added they transition to visible.
- JS: IntersectionObserver (`revealObserver`) watches `.reveal-*` elements and adds `.active` on first intersection.
- Use: creates lightweight scroll-based entrance animations without heavy libraries.

**4. Keyframes**

- `@keyframes bounce` — used for the `.scroll-down` indicator to create an up/down floating motion.
- Note: previously defined `float` and `pulse` keyframes were removed (commented) as unused.

**5. Custom cursor (HTML, CSS, JS)**

- HTML anchors:
    - `<div id="cursor" class="cursor"></div>` — small center dot.
    - `<div id="cursor-follower" class="cursor-follower"></div>` — larger halo/follower ring.
- CSS:
    - `.cursor` — size, background (uses `--accent`), `pointer-events: none`, `transform: translate(-50%, -50%)` to position by JS.
    - `.cursor-follower` — larger ring, `border` color, opacity, smooth transform transitions.
    - `body.custom-cursor { cursor: none; }` — native cursor is hidden only when JS indicates custom cursor is active.
    - `@media (hover: none)` hides the cursor elements on touch devices and keeps native cursor visible.
- JS (`initCursor()`):
    - Moves `#cursor` directly to `mousemove` coordinates.
    - Smoothly animates follower with `requestAnimationFrame` lerping.
    - Scales cursor/follower on interactive elements via `mouseenter`/`mouseleave` on selectors `a, button, .skill-card, .contact-item`.
    - Adds `body.custom-cursor` while active; removes it for touch devices so native cursor remains usable.
- Notes:
    - CSS-only `cursor: url(data:...svg)` is present as an additional decorative fallback; DOM-based cursor is preferred for the smooth follower effect.

**6. Utilities & components used repeatedly**

- Buttons: `.btn`, `.btn-primary`, `.btn-secondary` — reusable button patterns with gradients, shadows, and hover transforms.
- Glass cards: `backdrop-filter: blur()` + `--border-glass` + `--glass-shadow` — applied to `.skill-card`, `.project-description`, `.contact-wrapper`.
- Nav underline: `.nav-link::after` uses width transitions for an animated underline.
- Responsive breakpoints: `@media (max-width: 968px)`, `768px`, `480px` — adjust grid layout, navigation, and typography.
- `.scroll-down` with `animation: bounce` for the down chevron.

**7. JS hooks, behaviors and important selectors**

- Navbar & nav:
    - `.navbar`, `.hamburger`, `.nav-links`, `.nav-link` — mobile toggle, `scrolled` class added based on `window.scrollY`, active link highlighting by checking section offsets.
- Typing effect:
    - `#typing-text` — rotated through `titles` array using `typeEffect()`.
- Reveal animations:
    - `.reveal-up`, `.reveal-left`, `.reveal-right` — observed via IntersectionObserver with `threshold: 0.15`.
- Parallax shapes:
    - `.bg-shape` — moved on `mousemove` to create depth.
- Custom cursor:
    - `#cursor`, `#cursor-follower` and hover targets `a, button, .skill-card, .contact-item`.

**8. Accessibility & fallback considerations**

- Touch devices: `@media (hover: none)` hides the DOM cursor elements and sets `cursor: auto` so touch interactions are natural.
- `pointer-events: none` on cursor elements prevents them from capturing clicks.
- Theme persistence via `localStorage` keeps user preference across visits.

**9. Assets & external integrations**

- Google Fonts: Inter, Outfit, JetBrains Mono.
- Font Awesome for icons.
- Project images in `images/` used by `.project-image` wrappers.

**10. How to extend or modify**

- To add a new accent color: add new `--accent-...` token and use it in `--accent` or component-specific rules.
- To add a reveal animation variant: create a new `.reveal-*` rule with transform and register elements in HTML, the IntersectionObserver will pick them up automatically.
- To change cursor style: modify `.cursor` and `.cursor-follower` CSS sizes/colors, optionally replace the SVG `cursor:` data-URI with a file path.

---

## File: `BUILDING_BLOCKS.md` created at project root. If you want, I can also:

## Hinglish (Hindi + English mix) — quick explanations

Below are short Hinglish summaries for each section above. Existing English content is kept intact; these lines give quick conversational explanations in Hindi+English.
**1. CSS Variables (:root)**

- Ye colors aur fonts ki `variables` hain — dark theme ke colors, gradients, fonts, shadows, aur kuch timing values. Agar aapko color change karna hai to yahi tokens update karo.
  **2. Theme overrides (light mode)**
- `body.light-theme` switch karke site light mode me chala jaata hai — JS toggle se yeh class add/remove hoti hai aur variables override ho jaate hain.
  **3. Reveal & entrance animations (CSS + JS)**
- `.reveal-*` classes initially hidden rakhti hain; JS IntersectionObserver jab element viewport me aaye to `.active` laga ke animation chalaata hai — smooth scroll reveal.
  **4. Keyframes**
- `@keyframes bounce` scroll indicator ke liye hai. Kuch extra keyframes (float/pulse) hata diye gaye the because they were unused.
  **5. Custom cursor (HTML, CSS, JS)**
- Do DOM elements (`#cursor`, `#cursor-follower`) follow karte hain mouse ko. JS unko move karta hai; CSS me `body.custom-cursor { cursor: none }` rakha gaya hai takki native cursor chhupa sake jab JS active ho.
  **6. Utilities & components used repeatedly**
- Buttons, glass cards, nav underline, responsive breakpoints — ye re-usable patterns hain. Agar koi naya card banana ho to same helpers use karo.
  **7. JS hooks, behaviors and important selectors**
- JS me navbar, theme toggle, typing, reveal observer, parallax shapes, aur cursor init handle ho rahe hain — selectors unhi elements ko target karte hain.
  **8. Accessibility & fallback considerations**
- Touch devices ke liye `@media (hover: none)` use karke custom cursor hide kar diya gaya hai — fallback safe hai.
  **9. Assets & external integrations**
- Google Fonts, Font Awesome, aur `images/` folder use hote hain — links external and marked with `rel="noopener noreferrer"`.
  **10. How to extend or modify**
- Simple guide: naya color add karo (`--accent-*`) aur phir components me use karo; reveal add karne ke liye `.reveal-new` class banao.

---

If you want the Hinglish text adjusted (more formal Hindi, more English, or pure Hindi), tell me which tone you prefer and I'll update the file.

- generate a short `HOWTO_TWEAK.md` with exact lines to change for colors, timing, and cursor sizing, or
- create a small demo HTML showing just the cursor + reveal behavior for testing.

Which follow-up would you like?

---

# हिंदी में पंक्ति-दर-पंक्ति समझ (Code + Explanation)

नीचे उन मुख्य हिस्सों का विस्तृत हिंदी में वर्णन और संबंधित कोड स्निपेट दिए जा रहे हैं। मौजूदा अंग्रेज़ी कंटेंट को हटाया नहीं गया है — यह एक अतिरिक्त, विस्तृत हिंदी गाइड है ताकि आप हर लाइन की भूमिका समझ सकें और ज़रूरत पड़ने पर सीधे कोड कॉपी कर सकें।

## A. CSS Variables (:root) — कोड और हिंदी व्याख्या

कोड (वहीं जैसा `style.css` में है):

```css
:root {
    --bg-dark: #0a0f16;
    --bg-card: rgba(17, 25, 40, 0.7);
    --bg-card-hover: rgba(26, 38, 59, 0.8);
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;
    --accent-red: #ff3366;
    --accent-orange: #ff7733;
    --accent-purple: #9d4edd;
    --accent-blue: #00b4d8;
    --gradient-primary: linear-gradient(
        135deg,
        var(--accent-red),
        var(--accent-orange)
    );
    --gradient-secondary: linear-gradient(
        135deg,
        var(--accent-blue),
        var(--accent-purple)
    );
    --gradient-glow: linear-gradient(
        135deg,
        rgba(255, 51, 102, 0.4),
        rgba(255, 119, 51, 0.4)
    );
    --font-sans: "Inter", sans-serif;
    --font-mono: "JetBrains Mono", monospace;
    --font-heading: "Outfit", sans-serif;
    --border-glass: 1px solid rgba(255, 255, 255, 0.05);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --accent: var(--accent-blue);
}
```

हर लाइन की हिंदी व्याख्या:

- `:root { ... }` — यह CSS variables का global scope है; यहाँ पर जितनी भी values defined हैं, पूरे CSS में `var(--name)` से उपयोग होंगी।
- `--bg-dark` — साइट का मुख्य dark background color; dark-theme के लिए base color.
- `--bg-card` — कार्ड/उप-क्षेत्रों के पीछे वाला translucent background (glass-like look).
- `--bg-card-hover` — कार्ड hover होने पर उपयोग होने वाला background color.
- `--text-primary` — प्रमुख टेक्स्ट (heading आदि) का रंग।
- `--text-secondary` — सहायक टेक्स्ट का रंग (paragraphs, muted text)।
- `--accent-*` (red, orange, purple, blue) — accent palette; gradients और highlights के लिए अलग-अलग रंग।
- `--gradient-primary/secondary/glow` — pre-made gradient values; इन्हें CSS में background के रूप में reuse किया जाता है।
- `--font-*` — fonts के अपडेट के लिए centralized variables।
- `--border-glass` / `--glass-shadow` — thin translucent border और shadow presets, glassy card effect के लिए।
- `--transition-*` और `--ease` — standard transition timings and easing curves; reuse से animation consistency मिलती है।
- `--accent` — convenience alias; project-wide small highlights और cursor color के लिए use किया जाता है।

## B. Theme overrides (`body.light-theme`) — कोड + हिंदी व्याख्या

कोड उदाहरण:

```css
body.light-theme {
    --bg-dark: #f8fafc;
    --bg-card: rgba(255, 255, 255, 0.85);
    --bg-card-hover: rgba(241, 245, 249, 0.9);
    --text-primary: #0f172a;
    --text-secondary: #334155;
    --border-glass: 1px solid rgba(0, 0, 0, 0.05);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
}
```

हिंदी में लाइन-दर-लाइन:

- `body.light-theme { ... }` — जब JS `body.classList.add('light-theme')` करेगा तो ये override values उपयोग में आएंगी।
- ऊपर की हर line का मतलब यह है कि आप dark-theme की variables को light-theme के हिसाब से replace कर रहे हैं — ताकि वही वर्ग (selectors) वही variables पढ़कर light-styled UI दिखाएँ।

नोट: ये approach flexible है — आप component-specific overrides भी लिख सकते हैं जैसे `body.light-theme .skill-card { background: var(--bg-card); }`।

## C. Reveal classes + IntersectionObserver (code + explanation)

CSS reveal snippet:

```css
.reveal-up {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
.reveal-up.active {
    opacity: 1;
    transform: translateY(0);
}
```

JS observer snippet (simplified):

```js
const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("active");
                obs.unobserve(e.target);
            }
        });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);
revealElements.forEach((el) => revealObserver.observe(el));
```

हिंदी व्याख्या:

- `.reveal-up` CSS में element को viewport में आने से पहले छिपा (invisible) रखता है — `opacity:0` और `translateY(50px)` से यह नीचे से ऊपर आकर दिखेगा।
- जब JS observer पाएगा कि element viewport के 15% तक दिख रहा है, तो `.active` add करेगा — यह CSS transition trigger करेगा और element smoothly आकर दिखाई देगा।
- `obs.unobserve(e.target)` की वजह से animation एक बार के लिए चलती है, बार-बार नहीं — यह performance friendly है।

## D. Keyframes (bounce) — code + हिंदी व्याख्या

कोड:

```css
@keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0) translateX(-50%);
    }
    40% {
        transform: translateY(-20px) translateX(-50%);
    }
    60% {
        transform: translateY(-10px) translateX(-50%);
    }
}
.scroll-down {
    animation: bounce 2s infinite;
}
```

हिंदी में समझ:

- `@keyframes bounce` में different key percentages पर transform बदलता है जिससे element ऊपर-नीचे حرکت करता है — typical bounce effect.
- `.scroll-down` पर यह animation apply कर के user को visually indicate किया जाता है कि वहाँ नीचे scroll करना है।

## E. Custom cursor — HTML, CSS, JS (complete example + हिंदी विस्तार)

HTML snippet (body में शुरुआत में रखा गया है):

```html
<div id="cursor" class="cursor"></div>
<div id="cursor-follower" class="cursor-follower"></div>
```

CSS snippet:

```css
.cursor {
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    pointer-events: none;
    z-index: 10001;
    transform: translate(-50%, -50%);
    transition:
        transform 0.1s ease,
        opacity 0.2s;
}
.cursor-follower {
    position: fixed;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--accent);
    opacity: 0.5;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    transition: transform 0.35s ease;
}
body.custom-cursor {
    cursor: none;
}
@media (hover: none) {
    .cursor,
    .cursor-follower {
        display: none;
    }
    body {
        cursor: auto;
    }
}
```

JS snippet (simplified `initCursor()`):

```js
function initCursor() {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    if (!cursor || !follower) return;
    if ("ontouchstart" in window) {
        document.body.classList.remove("custom-cursor");
        return;
    }
    document.body.classList.add("custom-cursor");
    let mouseX = 0,
        mouseY = 0,
        fx = 0,
        fy = 0;
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });
    function animate() {
        fx += (mouseX - fx) * 0.12;
        fy += (mouseY - fy) * 0.12;
        follower.style.left = fx + "px";
        follower.style.top = fy + "px";
        requestAnimationFrame(animate);
    }
    animate();
    document
        .querySelectorAll("a, button, .skill-card, .contact-item")
        .forEach((el) => {
            el.addEventListener("mouseenter", () => {
                cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
                follower.style.transform = "translate(-50%,-50%) scale(1.6)";
            });
            el.addEventListener("mouseleave", () => {
                cursor.style.transform = "translate(-50%,-50%) scale(1)";
                follower.style.transform = "translate(-50%,-50%) scale(1)";
            });
        });
}
document.addEventListener("DOMContentLoaded", () => {
    initCursor();
});
```

लाइन-दर-लाइन हिंदी व्याख्या:

- HTML में दो div हैं — एक छोटा dot (`#cursor`) और एक बड़ा follower ring (`#cursor-follower`). ये DOM-based cursor हैं (native cursor को hide करके इनको दिखाते हैं)।
- CSS में `pointer-events: none` इसलिए है ताकि ये elements mouse events को block ना करें — user जो भी element पर click करे वो normal तरीके से काम करे।
- `body.custom-cursor { cursor: none; }` — जब JS active हो तब native system cursor hide हो जाता है; CSS cursor data-URI (agar मौजूद हो) decorative fallback दे सकता है पर हमारा DOM cursor primary है।
- JS में `mousemove` event से instant cursor position update होता है (छोटा dot) और follower smooth lerp से follow करता है — ये effect smoothness देता है।
- `mouseenter`/`mouseleave` handlers interactive elements पर cursor को enlarge कर देते हैं — ऐसा feel देता है कि cursor element पर interact कर रहा है।
- Touch devices: `'ontouchstart' in window'` check करके JS custom cursor रोक देता है और native cursor/fallback enabled रहता है — ये accessibility और usability के लिए जरूरी है।

## F. Utilities & common components — Hindi explanation + code examples

- Buttons (example):

```css
.btn {
    display: inline-block;
    padding: 12px 28px;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
}
.btn-primary {
    background: var(--gradient-primary);
    color: #fff;
}
.btn-secondary {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

हिंदी: इन classes ko reuse karke aap consistent buttons bana sakte ho; agar global spacing change karna ho to sirf `.btn` me update karo.

## G. JS hooks — code pointers + हिंदी व्याख्या

- Theme toggle (example):

```js
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("light-theme") ? "light-theme" : "",
    );
});
```

हिंदी: button click pe body me `light-theme` lag jaati hai aur localStorage me store ho jaata hai; page reload ke baad JS stored value dekh ke theme restore kar leta hai.

## H. Troubleshooting tips (हिंट्स) — हिंदी में

- Cursor नहीं दिखे तो check karo:
    - `initCursor()` call हो रहा है या नहीं (DOMContentLoaded handler).
    - `#cursor` और `#cursor-follower` elements HTML में मौजूद हैं।
    - `--accent` variable defined है warna small dot transparent lagega.
- Reveal elements काम नहीं कर रहे: ensure karo `.reveal-*` class markup me lagi ho aur `revealObserver` script चल रहा ho (console errors check karo).

---

मैंने ऊपर सब sections में code और line-by-line हिंदी explanations जोड़ दी हैं। यह फाइल अब दोनों टेक्स्ट (अंग्रेज़ी मूल) और विस्तृत हिंदी गाइड रखती है।
बता दें अगर आप चाहें तो मैं:

- ये हिंदी अनुवाद अलग `BUILDING_BLOCKS.hi.md` फाइल में move कर दूँ, या
- प्रत्येक code snippet के नीचे छोटा runnable demo (single HTML file) बना दूँ जिसे browser में open करके देखा जा सके।
