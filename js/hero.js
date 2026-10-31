// Первый экран: фото лица, под курсором «жидкими» пятнами с рваным краем
// проступает второе фото — по мотивам landonorris.com, но в 2D (WebGL).
// Каждое интро — отдельная секция .hero; запускается вызовом HeroIntro.mount(секция), когда её впервые показывают.
// Цвет надувных букв задаёт data-palette: "fur" — белый мех с золотым кантом, "velvet" — зелёный бархат с жёлтым кантом.
const PALETTES = {
  velvet: { deep: [0.008, 0.055, 0.035], mid: [0.04, 0.31, 0.19], lite: [0.5, 0.88, 0.66],
            yd: [0.34, 0.2, 0.02], ym: [0.95, 0.7, 0.16], yl: [1.0, 0.95, 0.68], spec: [16, 0.7], fib: [0.88, 0.16, 0.08] },
  fur:    { deep: [0.46, 0.41, 0.41], mid: [0.93, 0.91, 0.89], lite: [0.32, 0.31, 0.3],
            yd: [0.3, 0.18, 0.04], ym: [0.8, 0.58, 0.22], yl: [1.0, 0.94, 0.74], spec: [22, 0.95], fib: [0.8, 0.26, 0.1] }
};
window.HeroIntro = { mount(hero){
  if (!hero || hero.dataset.mounted) return;
  hero.dataset.mounted = '1';
  const pal = PALETTES[hero.dataset.palette] || PALETTES.velvet;
  const canvas = hero.querySelector('.hero-canvas');
  const topo = hero.querySelector('.hero-topo');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cfg = {
    fx: parseFloat(hero.dataset.focusX) || 0.5,
    fy: parseFloat(hero.dataset.focusY) || 0.3,
    face: parseFloat(hero.dataset.face) || 0.2,
    cover: hero.dataset.fit === 'cover',
    contain: hero.dataset.fit === 'contain',   // фото целиком по центру, занавес продолжается по бокам
    side: hero.dataset.layout === 'side'   // фото целиком справа (на телефоне — снизу), надписи и PLAY слева
  };
  if (cfg.cover) hero.classList.add('hero--photo');

  // Фото грузим через fetch → blob: так WebGL может их читать, даже если файлы лежат на другом адресе
  // (как на опубликованной странице). Если fetch не сработал (файл открыт с диска) — обычная загрузка.
  const plainImage = src => new Promise((ok, fail) => {
    const img = new Image();
    img.onload = () => ok(img);
    img.onerror = fail;
    img.src = src;
  });
  // Сайт открыт с диска (file://): браузер не даёт WebGL читать обычные файлы-фото,
  // поэтому берём те же фото из скрипта data-pack (assets/intro-data-*.js), там они в виде data:-ссылок
  const fromDisk = location.protocol === 'file:' || /[?&]pack\b/.test(location.search);
  let packReady = null;
  const loadPack = () => packReady || (packReady = new Promise(ok => {
    if (!hero.dataset.pack) return ok();
    const sc = document.createElement('script');
    sc.src = hero.dataset.pack; sc.onload = sc.onerror = () => ok();
    document.head.appendChild(sc);
  }));
  const load = async src => {
    if (fromDisk) {
      await loadPack();
      const data = window.HERO_DATA && window.HERO_DATA[src];
      if (data) return plainImage(data);
    }
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(res.status);
      return await plainImage(URL.createObjectURL(await res.blob()));
    } catch { return plainImage(src); }
  };

  // Запасной вид без анимации: фото, слова и PLAY обычной разметкой (если WebGL недоступен
  // или браузер не дал прочитать фото — например, сайт открыт двойным кликом с диска)
  function showStatic(){
    if (hero.classList.contains('is-static')) return;
    hero.classList.add('is-static', 'has-play');
    const img = document.createElement('img');
    img.className = 'hero-static-img'; img.alt = ''; img.src = hero.dataset.base;
    if (cfg.side) img.classList.add('is-side');
    hero.insertBefore(img, hero.firstChild);
    const w = document.createElement('div');
    w.className = 'hero-static-words' + (cfg.side ? ' is-side' : '');
    w.setAttribute('aria-hidden', 'true');
    w.innerHTML = words.map(x => `<span>${x}</span>`).join(' ');
    hero.insertBefore(w, playBtn || null);
  }

  let base, reveal, mask, maskReveal;   // mask — вырезанный силуэт (PNG), чтобы «дым» шёл только по фону
  let W = 0, H = 0, dpr = 1, faceH = 0, rect = null;
  const FIELD_SCALE = 0.25;      // поле «пятен» считается в 1/4 разрешения
  const field = document.createElement('canvas');
  const fctx = field.getContext('2d');
  const ptr = { x: 0, y: 0, px: 0, py: 0, tx: 0, ty: 0, active: false, last: -1e9 };

  // ---------- раскладка фото ----------
  // Телефон с фото на весь экран: «постер» — Максим помельче, внизу, сверху и вокруг головы — фон
  const posterMode = () => cfg.cover && W / H < 0.9;
  let bgColor = null;   // цвет фона фото (по верхним строкам) — им продолжаем фон над снимком

  function computeRect(img){
    const iw = img.naturalWidth, ih = img.naturalHeight;
    if (cfg.contain) {
      // data-zoom — во сколько раз фото больше экрана (человек крупнее), data-crop-top — сколько срезать сверху
      const zoom = parseFloat(hero.dataset.zoom) || 1, cropT = parseFloat(hero.dataset.cropTop) || 0;
      let h = H * zoom, w = iw * h / ih;
      if (w > W * zoom) { w = W * zoom; h = ih * w / iw; }   // телефон: на всю ширину внизу, сверху место под надписи
      faceH = ih * cfg.face * (h / ih);
      return { x: (W - w) / 2, y: h > H ? -h * cropT : H - h, w, h };
    }
    if (cfg.side) {
      let w, h;
      if (W / H >= 0.9) {                     // компьютер: фото крупно, прижато вправо
        // data-zoom — во сколько раз фото выше экрана; data-crop-top / data-crop-right — какую долю
        // фото можно срезать сверху (занавес над головой) и справа (занавес сбоку от человека)
        const zoom = parseFloat(hero.dataset.zoom) || 1;
        const cropT = parseFloat(hero.dataset.cropTop) || 0, cropR = parseFloat(hero.dataset.cropRight) || 0;
        h = H * zoom; w = iw * h / ih;
        if (w * (1 - cropR) > W * 0.62) { w = W * 0.62 / (1 - cropR); h = ih * w / iw; }
        faceH = ih * cfg.face * (h / ih);
        return { x: W - w * (1 - cropR), y: Math.min(0, Math.max(H - h, -h * cropT)), w, h };
      }
      w = W; h = ih * W / iw;                 // телефон: фото целиком на всю ширину внизу, сверху место под надписи
      faceH = ih * cfg.face * (h / ih);
      return { x: (W - w) / 2, y: H - h, w, h };
    }
    if (posterMode()) {
      faceH = Math.min(W * 0.5, H * 0.25);
      const scale = Math.max(faceH / (ih * cfg.face), 1.12 * W / iw);
      const w = iw * scale, h = ih * scale;
      faceH = ih * cfg.face * scale;
      const x = Math.min(0, Math.max(W - w, W / 2 - cfg.fx * w));
      return { x, y: Math.max(0, H - h), w, h };
    }
    const mobile = W < 640;
    const cx = W * 0.5, cy = H * (mobile ? 0.42 : 0.44);
    faceH = Math.min(H * 0.46, W * 0.75);
    let scale = faceH / (ih * cfg.face);
    // низ фото (обрез по груди) должен уходить за нижний край экрана
    scale = Math.max(scale, (H - cy) / ((1 - cfg.fy) * ih));
    if (cfg.cover) scale = Math.max(scale, W / iw, H / ih);
    const w = iw * scale, h = ih * scale;
    faceH = ih * cfg.face * scale;
    let x = cx - cfg.fx * w, y = cy - cfg.fy * h;
    if (cfg.cover) {
      x = Math.min(0, Math.max(W - w, x));
      y = Math.min(0, Math.max(H - h, y));
    }
    return { x, y, w, h };
  }

  let backdrop = null;
  // Фон вокруг фото: занавес продолжается зеркальными полосами, взятыми с края основного фото
  // (там только занавес, без человека), к краю экрана слегка темнеет — под надписи
  function makeBackdrop(){
    const c = document.createElement('canvas');
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    const g = c.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.imageSmoothingQuality = 'high';
    const iw = base.naturalWidth, ih = base.naturalHeight;
    g.fillStyle = sampleBg(base); g.fillRect(0, 0, W, H);
    // data-pleats="x0,x1,y0,y1" — кусок фото с ровными вертикальными складками занавеса (доли ширины/высоты).
    // Его вытягиваем на всю высоту и повторяем зеркально — занавес по бокам получается ровным, без волн.
    if (hero.dataset.pleats) {
      const [px0, px1, py0, py1] = hero.dataset.pleats.split(',').map(Number);
      const sx = px0 * iw, sw = (px1 - px0) * iw, sy = py0 * ih, sh = (py1 - py0) * ih;
      const dw = sw * rect.h / ih;
      const tile = (x, k) => {
        g.save();
        if (k % 2 === 0) { g.translate(x + dw, 0); g.scale(-1, 1); g.drawImage(base, sx, sy, sw, sh, 0, 0, dw, H); }
        else g.drawImage(base, sx, sy, sw, sh, x, 0, dw, H);
        g.restore();
      };
      for (let x = rect.x, k = 0; x > -dw; k++) { x -= dw; tile(x, k); }
      for (let x = rect.x + rect.w, k = 0; x < W; k++, x += dw) tile(x, k);
      // data-clean-bg — ровный занавес и за человеком (сам человек потом рисуется вырезанным силуэтом)
      if (rect.x < 1 || hero.hasAttribute('data-clean-bg')) for (let x = rect.x, k = 1; x < W; k++, x += dw) tile(x, k);
      const shade = (x0, x1, y0, y1) => {
        const gr = g.createLinearGradient(x0, y0, x1, y1);
        gr.addColorStop(0, 'rgba(20,0,4,.55)'); gr.addColorStop(1, 'rgba(20,0,4,.05)');
        return gr;
      };
      if (rect.x > 0) { g.fillStyle = shade(0, rect.x, 0, 0); g.fillRect(0, 0, rect.x, H); }
      if (rect.x + rect.w < W) { g.fillStyle = shade(W, rect.x + rect.w, 0, 0); g.fillRect(rect.x + rect.w, 0, W - rect.x - rect.w, H); }
      if (rect.y > 0) { g.fillStyle = shade(0, 0, 0, rect.y); g.fillRect(0, 0, W, rect.y); }
      return c;
    }
    // data-strip-left / data-strip-right — какая доля фото у края — только занавес (без человека)
    const sl = parseFloat(hero.dataset.stripLeft) || 0.3, sr = parseFloat(hero.dataset.stripRight) || 0.3;
    if (rect.x + rect.w < W) {                          // справа: зеркальные полосы с правого края фото
      const sw = iw * sr, dw = rect.w * sr, sx = iw - sw;
      for (let x = rect.x + rect.w, k = 0; x < W; k++, x += dw) {
        g.save();
        if (k % 2 === 0) { g.translate(x + dw, 0); g.scale(-1, 1); g.drawImage(base, sx, 0, sw, ih, 0, rect.y, dw, rect.h); }
        else g.drawImage(base, sx, 0, sw, ih, x, rect.y, dw, rect.h);
        g.restore();
      }
      const gr = g.createLinearGradient(W, 0, rect.x + rect.w, 0);
      gr.addColorStop(0, 'rgba(20,0,4,.55)'); gr.addColorStop(1, 'rgba(20,0,4,.05)');
      g.fillStyle = gr; g.fillRect(rect.x + rect.w, 0, W - rect.x - rect.w, H);
    }
    if (rect.x > 0) {                                   // слева: зеркальные полосы с левого края фото
      const sw = iw * sl, dw = rect.w * sl;
      for (let x = rect.x, k = 0; x > 0; k++) {
        x -= dw;
        g.save();
        if (k % 2 === 0) { g.translate(x + dw, 0); g.scale(-1, 1); g.drawImage(base, 0, 0, sw, ih, 0, rect.y, dw, rect.h); }
        else g.drawImage(base, 0, 0, sw, ih, x, rect.y, dw, rect.h);
        g.restore();
      }
      const gr = g.createLinearGradient(0, 0, rect.x, 0);
      gr.addColorStop(0, 'rgba(20,0,4,.55)'); gr.addColorStop(1, 'rgba(20,0,4,.05)');
      g.fillStyle = gr; g.fillRect(0, 0, rect.x, H);
    }
    if (rect.y > 0) {                                   // сверху: полосы высотой 13% фото
      const sh = ih * 0.13, dh = rect.h * 0.13;
      for (let y = rect.y, k = 0; y > 0; k++) {
        y -= dh;
        g.save();
        if (k % 2 === 0) { g.translate(0, y + dh); g.scale(1, -1); g.drawImage(base, 0, 0, iw, sh, rect.x, 0, rect.w, dh); }
        else g.drawImage(base, 0, 0, iw, sh, rect.x, y, rect.w, dh);
        g.restore();
      }
      const gr = g.createLinearGradient(0, 0, 0, rect.y);
      gr.addColorStop(0, 'rgba(20,0,4,.55)'); gr.addColorStop(1, 'rgba(20,0,4,.05)');
      g.fillStyle = gr; g.fillRect(0, 0, W, rect.y);
    }
    return c;
  }
  function fadedPhoto(img){
    const c = document.createElement('canvas');
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    const g = c.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, rect.x, rect.y, rect.w, rect.h);
    g.globalCompositeOperation = 'destination-out';
    const fade = (x0, y0, x1, y1, bx, by, bw, bh) => {
      const gr = g.createLinearGradient(x0, y0, x1, y1);
      gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(bx, by, bw, bh);
    };
    const soft = hero.dataset.pleats ? 2 : 1;          // ровный занавес сшиваем с фото мягче
    const fx = rect.w * 0.04 * soft, fy = rect.h * 0.03 * soft;
    if (rect.x > 1) fade(rect.x, 0, rect.x + fx, 0, rect.x, rect.y, fx, rect.h);
    if (rect.x + rect.w < W - 1) fade(rect.x + rect.w, 0, rect.x + rect.w - fx, 0, rect.x + rect.w - fx, rect.y, fx, rect.h);
    if (rect.y > 1) fade(0, rect.y, 0, rect.y + fy, rect.x, rect.y, rect.w, fy);
    return c;
  }
  function photoLayer(img, fill, cutout, withBackdrop){
    const c = document.createElement('canvas');
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    const g = c.getContext('2d');
    if (withBackdrop && backdrop) {
      g.drawImage(backdrop, 0, 0);
      if (cutout && hero.hasAttribute('data-clean-bg')) {
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        g.imageSmoothingQuality = 'high';
        g.drawImage(cutout, rect.x, rect.y, rect.w, rect.h);
      } else g.drawImage(fadedPhoto(img), 0, 0);
      return c;
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.imageSmoothingQuality = 'high';
    g.drawImage(img, rect.x, rect.y, rect.w, rect.h);
    // над снимком — тот же оранжевый фон, верхний край фото плавно растворяется в нём
    if (fill && rect.y > 0) {
      const fade = rect.h * 0.12;
      g.fillStyle = fill; g.fillRect(0, 0, W, rect.y + 1);
      const gr = g.createLinearGradient(0, rect.y, 0, rect.y + fade);
      gr.addColorStop(0, fill); gr.addColorStop(1, fill.replace('rgb(', 'rgba(').replace(')', ',0)'));
      g.fillStyle = gr; g.fillRect(0, rect.y, W, fade);
      // растворяем только фон: человека (вырезанный силуэт) рисуем поверх заново
      if (cutout) g.drawImage(cutout, rect.x, rect.y, rect.w, rect.h);
    }
    return c;
  }

  // средний цвет верхних строк фото — это фон студии
  function sampleBg(img){
    const c = document.createElement('canvas'); c.width = 64; c.height = 4;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight * 0.04, 0, 0, 64, 4);
    const d = g.getImageData(0, 0, 64, 4).data;
    let r = 0, gg = 0, b = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; }
    const n = d.length / 4;
    return `rgb(${Math.round(r / n)},${Math.round(gg / n)},${Math.round(b / n)})`;
  }

  // ---------- фон: линии как на топографической карте ----------
  function hash(x, y){ const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function vnoise(x, y){
    const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
    const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function drawTopo(){
    if (!topo) return;
    topo.width = Math.round(W * dpr); topo.height = Math.round(H * dpr);
    const g = topo.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.strokeStyle = 'rgba(38,62,50,.13)';
    g.lineWidth = 1;
    const step = 10, cols = Math.ceil(W / step) + 1, rows = Math.ceil(H / step) + 1;
    const k = 1 / 320, val = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const x = i * step * k, y = j * step * k;
      val[j * cols + i] = vnoise(x + 3.1, y + 7.7) * 0.65 + vnoise(x * 2.1 + 11, y * 2.1 + 5) * 0.35;
    }
    g.beginPath();
    for (let level = 0.2; level < 0.85; level += 0.045) {
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const a = val[j * cols + i], b = val[j * cols + i + 1], c = val[(j + 1) * cols + i + 1], d = val[(j + 1) * cols + i];
        const x0 = i * step, y0 = j * step, pts = [];
        const edge = (p, q, xa, ya, xb, yb) => {
          if ((p < level) !== (q < level)) { const t = (level - p) / (q - p); pts.push(xa + (xb - xa) * t, ya + (yb - ya) * t); }
        };
        edge(a, b, x0, y0, x0 + step, y0);
        edge(b, c, x0 + step, y0, x0 + step, y0 + step);
        edge(d, c, x0, y0 + step, x0 + step, y0 + step);
        edge(a, d, x0, y0, x0, y0 + step);
        for (let p = 0; p + 3 < pts.length; p += 4) { g.moveTo(pts[p], pts[p + 1]); g.lineTo(pts[p + 2], pts[p + 3]); }
      }
    }
    g.stroke();
  }

  // ---------- WebGL ----------
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  let prog, texBase, texReveal, texField, texMask, texL1, texL2, texL3, uTime, uRes, uHasLetters;
  const uniforms = {};

  const VERT = `attribute vec2 p; varying vec2 vUv;
    void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
  const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    varying vec2 vUv;
    uniform sampler2D uBase, uReveal, uField, uMask;
    uniform float uHasMask;
    uniform sampler2D uL1, uL2;   // буквы: L1 = нормаль (rg) + высота (b), L2 = цвет (r) + тень (g) + силуэт (b)
    uniform float uHasLetters;
    uniform sampler2D uL3; uniform float uArt;   // буквы с картинки (data-word-art): их собственный цвет
    uniform vec2 uPtr, uTilt;       // курсор (uv) и наклон букв к курсору (сдвиг в uv)
    uniform float uPtrOn, uPuff;    // насколько курсор рядом: блик за курсором и «поддувание»
    uniform float uIntro;           // секунды с начала появления букв
    uniform float uBtnIdx, uPuffBtn; // номер «буквы»-кнопки и её поддувание при наведении
    uniform vec2 uLRes;             // размер текстур букв в пикселях
    uniform float uTime; uniform vec2 uRes;
    uniform vec3 uDeep, uMid, uLite, uYd, uYm, uYl;   // цвета букв и канта (палитра)
    uniform vec2 uSpec; uniform vec3 uFib;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
    }
    float fbm3(vec2 p){ return 0.5 * noise(p) + 0.3 * noise(p * 2.1 + 5.0) + 0.2 * noise(p * 4.3 + 9.0); }
    float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.07; a *= 0.5; } return v; }
    void main(){
      vec2 uv = vUv;
      // остаток ниже ~7% не тает до нуля (8-битная точность), поэтому срезаем его
      float f = clamp((texture2D(uField, uv).a - 0.07) / 0.93, 0.0, 1.0);
      vec2 q = uv * vec2(uRes.x / uRes.y, 1.0) * 4.0;
      float n = fbm(q + vec2(uTime * 0.06, -uTime * 0.045));
      // Горизонтальные «лоскуты»: пока полоса свежая — она цельная,
      // когда тает — распадается на тонкие горизонтальные полоски, как у Ландо
      float sn = noise(vec2(uv.x * 2.5 + uTime * 0.35, uv.y * 60.0));
      float slice = (sn - 0.5) * 0.85 * (1.0 - smoothstep(0.55, 0.95, f)) * smoothstep(0.0, 0.25, f);
      float v = f + (n - 0.5) * 0.3 + slice;
      float aa = 0.02;
      float m = smoothstep(0.5 - aa, 0.5 + aa, v);                // маска проявления
      float rim = 1.0 - smoothstep(0.5, 0.6, v);                  // полоска у края внутри
      float shadow = smoothstep(0.38, 0.5, v) * (1.0 - m);        // тень снаружи края
      vec2 warp = vec2(n - 0.5, 0.0) * 0.02 * rim * m;            // лёгкое «стекло» у края
      vec4 b = texture2D(uBase, uv);
      vec4 r = texture2D(uReveal, uv + warp);
      // тень и кромка видны только там, где фото различаются (на общем фоне их нет)
      float diff = smoothstep(0.06, 0.3, length(texture2D(uReveal, uv).rgb - b.rgb));
      r.rgb *= 1.0 - rim * m * 0.3 * diff;
      vec4 col = mix(b, r, m);
      col.rgb *= 1.0 - shadow * 0.25 * b.a * diff;
      // «Дым» по фону: тот же мазок, но мягче и шире, только вне силуэта человека
      float person = uHasMask > 0.5 ? texture2D(uMask, uv).a : 0.0;
      float smoke = smoothstep(0.02, 0.3, f + (n - 0.5) * 0.3 + (sn - 0.5) * 0.1) * (1.0 - person);
      col.rgb = mix(col.rgb, col.rgb * 0.72 + vec3(0.04), smoke * 0.7 * col.a);
      float ghost = m * 0.06;                                     // след пятна на прозрачном фоне
      col += (1.0 - col.a) * vec4(vec3(0.15, 0.24, 0.2) * ghost, ghost);
      // ---- Бархатные надувные буквы и кнопка ----
      if (uHasLetters > 0.5) {
        vec4 l1 = texture2D(uL1, uv - uTilt);
        vec4 l2 = texture2D(uL2, uv - uTilt);
        // появление: буквы по очереди «надуваются» из середины к краям, с лёгким перелётом
        // номер буквы читаем строго по пикселю: при сглаживании края смешиваются с фоном (255)
        vec2 uvL = uv - uTilt;
        float idxRaw = floor(texture2D(uL2, (floor(uvL * uLRes) + 0.5) / uLRes).a * 255.0 + 0.5);
        float inFront = step(127.5, idxRaw) * step(idxRaw, 254.5);   // буква целиком поверх человека (телефон)
        float idx = idxRaw - 128.0 * inFront;
        float local = clamp((uIntro - idx * 0.11) / 0.6, 0.0, 1.0);
        float grow = local * local * (3.0 - 2.0 * local);
        float x1 = local - 1.0;
        float pop = 1.0 + 2.70158 * x1 * x1 * x1 + 1.70158 * x1 * x1;   // easeOutBack
        float introAll = clamp(uIntro / 1.8, 0.0, 1.0);
        float shadowA = texture2D(uL2, uv + uTilt * 1.5).g;
        float isBtn = 1.0 - step(0.5, abs(idx - uBtnIdx));
        float behind = person * (1.0 - inFront) * (1.0 - isBtn);   // где буквы прячутся за человеком (кнопка — всегда впереди)
        col.rgb *= 1.0 - shadowA * 0.55 * introAll * (1.0 - behind);   // тень букв (на человека не падает, если они за ним)
        float h = l1.b;
        float thr = (1.0 - grow) * 0.92 - 0.03;
        float la = l2.b * smoothstep(thr - 0.03, thr + 0.01, h);
        if (la > 0.0) {
          float puffAmt = mix(uPuff, uPuffBtn, isBtn);
          float pipe = l1.a;                                     // жёлтый кант по краю
          vec2 nxy = (l1.rg * 2.0 - 1.0) * pop * (1.0 + 0.35 * puffAmt);
          // морщинки ткани: нормаль слегка «мнётся» по шуму
          vec2 fq = uv * vec2(uRes.x / uRes.y, 1.0);
          float e = 0.0012;
          float w0 = fbm3(fq * 11.0), wx = fbm3((fq + vec2(e, 0.0)) * 11.0), wy = fbm3((fq + vec2(0.0, e)) * 11.0);
          nxy += vec2(w0 - wx, w0 - wy) * 13.0 * (0.25 + 0.75 * h) * (1.0 - 0.8 * pipe);
          float nl = length(nxy);
          if (nl > 0.97) nxy *= 0.97 / nl;
          vec3 N = normalize(vec3(nxy, sqrt(max(0.0, 1.0 - dot(nxy, nxy)))));
          // свет: по умолчанию сверху слева, рядом с курсором — от курсора (блик бежит за мышью)
          vec3 Lc = normalize(vec3((uPtr - uv) * vec2(uRes.x / uRes.y, 1.0) * 3.0, 0.55));
          vec3 L = normalize(mix(normalize(vec3(-0.45, 0.6, 0.7)), Lc, uPtrOn));
          vec3 c;
          if (uArt > 0.5 && isBtn < 0.5) {
            // готовые буквы с картинки: свой цвет, блик за курсором и искра, что пробегает по льду
            c = texture2D(uL3, uvL).rgb;
            float glint = pow(max(dot(reflect(-L, N), vec3(0.0, 0.0, 1.0)), 0.0), 14.0);
            float sweep = 1.0 - smoothstep(0.0, 0.045, abs(fract(uTime * 0.12) * 2.6 - 0.8 - (uv.x * 0.8 + uv.y * 0.6)));
            float lum = dot(c, vec3(0.3, 0.5, 0.2));
            c += vec3(1.0, 0.97, 0.9) * (glint * 0.3 * uPtrOn + sweep * 0.6 * lum);
          } else {
          float wrap = dot(N, L) * 0.5 + 0.5;
          float rim = pow(1.0 - N.z, 1.25);                         // бархат светлеет на скатах
          float crush = fbm(fq * 3.5 + 3.7);                       // «мятый» бархат
          float streak = noise(vec2(dot(fq, vec2(0.8, 0.6)) * 60.0 + crush * 6.0, dot(fq, vec2(-0.6, 0.8)) * 8.0));
          float nap = noise(vec2(fq.x * 300.0, fq.y * 80.0));      // направленный ворс
          float fiber = hash(floor(gl_FragCoord.xy));              // мелкие волокна
          vec3 deep = uDeep, mid = uMid, lite = uLite;
          c = mix(deep, mid, smoothstep(0.0, 0.9, wrap * (0.75 + 0.5 * crush)));
          c += lite * rim * (0.5 + 1.3 * crush) * (0.35 + 0.65 * wrap) * (0.6 + 0.8 * streak);
          c += lite * pow(max(dot(reflect(-L, N), vec3(0.0, 0.0, 1.0)), 0.0), 8.0) * 0.22 * (0.5 + crush);
          c *= uFib.x + uFib.y * fiber + uFib.z * nap;
          vec3 yd = uYd, ym = uYm, yl = uYl;
          vec3 cy = mix(yd, ym, smoothstep(0.05, 0.85, wrap));
          cy += yl * pow(max(dot(reflect(-L, N), vec3(0.0, 0.0, 1.0)), 0.0), uSpec.x) * uSpec.y;
          cy += yl * rim * 0.18;
          cy *= 0.95 + 0.08 * fiber;
          c = mix(c, cy, pipe);
          c *= mix(0.6, 1.0, smoothstep(0.0, 0.3, h) * (1.0 - pipe) + pipe) * (1.0 - l2.r * 0.8);   // глубина у краёв и в складках
          }
          // тень от человека на буквах (свет сверху слева — тень ложится вправо вниз)
          float ps = 0.0;
          ps += texture2D(uMask, uv + vec2(-0.006, 0.009)).a;
          ps += texture2D(uMask, uv + vec2(-0.012, 0.018)).a;
          ps += texture2D(uMask, uv + vec2(-0.02, 0.03)).a;
          c *= 1.0 - 0.5 * (ps / 3.0) * uHasMask * (1.0 - inFront) * (1.0 - isBtn);
          float front = la * (1.0 - behind);                       // буквы позади человека
          col = vec4(mix(col.rgb, c, front), max(col.a, front));
        }
      }
      gl_FragColor = col;
    }`;

  function shader(type, src){
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function texture(unit){
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]])
      gl.texParameteri(gl.TEXTURE_2D, k, v);
    return t;
  }
  function upload(unit, tex, src){
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
  }
  function initGL(){
    prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    texBase = texture(0); texReveal = texture(1); texField = texture(2); texMask = texture(3);
    texL1 = texture(4); texL2 = texture(5); texL3 = texture(6);
    gl.uniform1i(gl.getUniformLocation(prog, 'uL3'), 6);
    gl.uniform1i(gl.getUniformLocation(prog, 'uL1'), 4);
    gl.uniform1i(gl.getUniformLocation(prog, 'uL2'), 5);
    uHasLetters = gl.getUniformLocation(prog, 'uHasLetters');
    for (const n of ['uPtr', 'uPtrOn', 'uPuff', 'uTilt', 'uIntro', 'uBtnIdx', 'uPuffBtn', 'uLRes', 'uArt']) uniforms[n] = gl.getUniformLocation(prog, n);
    gl.uniform1i(gl.getUniformLocation(prog, 'uBase'), 0);
    gl.uniform1i(gl.getUniformLocation(prog, 'uReveal'), 1);
    gl.uniform1i(gl.getUniformLocation(prog, 'uField'), 2);
    gl.uniform1i(gl.getUniformLocation(prog, 'uMask'), 3);
    gl.uniform1f(gl.getUniformLocation(prog, 'uHasMask'), mask ? 1 : 0);
    for (const [n, k] of [['uDeep', 'deep'], ['uMid', 'mid'], ['uLite', 'lite'], ['uYd', 'yd'], ['uYm', 'ym'], ['uYl', 'yl'], ['uFib', 'fib']])
      gl.uniform3fv(gl.getUniformLocation(prog, n), pal[k]);
    gl.uniform2fv(gl.getUniformLocation(prog, 'uSpec'), pal.spec);
    uTime = gl.getUniformLocation(prog, 'uTime');
    uRes = gl.getUniformLocation(prog, 'uRes');
  }

  function resize(){
    const b = hero.getBoundingClientRect();
    W = b.width; H = b.height;
    if (!W || !H) return;            // интро скрыто (открыт другой экран сайта)
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    field.width = Math.ceil(W * FIELD_SCALE); field.height = Math.ceil(H * FIELD_SCALE);
    rect = computeRect(base);
    if (!bgColor && cfg.cover) { bgColor = sampleBg(base); hero.style.background = bgColor; }
    const ext = cfg.side || cfg.contain;
    backdrop = ext ? makeBackdrop() : null;
    const baseLayer = photoLayer(base, posterMode() && bgColor, mask, ext);
    drawTopo();
    if (!gl) { canvas.getContext('2d').drawImage(baseLayer, 0, 0); return; }
    gl.viewport(0, 0, canvas.width, canvas.height);
    upload(0, texBase, baseLayer);
    upload(1, texReveal, photoLayer(reveal || base, posterMode() && bgColor, reveal ? maskReveal : mask, ext));
    if (mask) upload(3, texMask, photoLayer(mask));
    const letters = buildLetters();
    gl.uniform1f(uHasLetters, letters ? 1 : 0);
    gl.uniform1f(uniforms.uIntro, 1e3);
    if (letters) {
      // данные букв грузим без премультипликации альфы (в альфе — номер буквы)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      upload(4, texL1, letters[0]); upload(5, texL2, letters[1]);
      if (letters[2]) upload(6, texL3, letters[2]);
      gl.uniform1f(uniforms.uArt, letters[2] ? 1 : 0);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.uniform1f(uniforms.uBtnIdx, letters.btnIdx);
      gl.uniform2f(uniforms.uLRes, letters[0].width, letters[0].height);
    }
    if (!ptr.active) { ptr.x = ptr.px = ptr.tx = W / 2; ptr.y = ptr.py = ptr.ty = H * 0.4; }
  }

  // ---------- Надувные бархатные буквы (data-words) ----------
  // Слова стоят одним блоком (парами по строкам: «SHOW MAX» / «GO ON») на свободном фоне:
  // место ищется по силуэту человека (data-mask, data-mask-reveal), чтобы текст его не касался.
  const words = (hero.dataset.words || '').split(',').map(w => w.trim()).filter(Boolean);
  // шрифт надувных букв: по умолчанию круглый Bagel Fat One, data-font — свой (например, жирный Oswald)
  const FONT = hero.dataset.font ? `"${hero.dataset.font}", "Arial Narrow", "Arial Black", sans-serif` : '"Bagel Fat One", "Baloo 2", "Arial Rounded MT Bold", "Arial Black", sans-serif';
  const FONT_W = hero.dataset.font ? 700 : 400, FONT_LS = hero.dataset.font ? .01 : -.06;
  // data-word-art — картинка с готовыми словами на чёрном фоне (например, ледяные буквы) вместо шрифта;
  // data-word-boxes — где на ней слова: "x0 y0 x1 y1; ..." в пикселях, в том же порядке, что data-words
  const ART_H = 0.9;   // высота слова-картинки в долях кегля
  let wordArt = null;
  function cutWords(img){
    const boxes = (hero.dataset.wordBoxes || '').split(';').map(b => b.trim().split(/[\s,]+/).map(Number)).filter(b => b.length === 4);
    if (!img || boxes.length !== words.length) return null;
    return boxes.map(([x0, y0, x1, y1]) => {
      const w = x1 - x0, h = y1 - y0, c = document.createElement('canvas'); c.width = w; c.height = h;
      const g = c.getContext('2d'); g.drawImage(img, -x0, -y0);
      const im = g.getImageData(0, 0, w, h), d = im.data;
      // чёрный фон → прозрачность: чем темнее пиксель, тем прозрачнее; цвет «вытягиваем» обратно
      for (let i = 0; i < d.length; i += 4) {
        const a = Math.min(1, Math.max(0, (Math.max(d[i], d[i + 1], d[i + 2]) / 255 - 0.05) / 0.3));
        for (let k = 0; k < 3; k++) d[i + k] = a > 0 ? Math.min(255, d[i + k] / a) : 0;
        d[i + 3] = a * 255;
      }
      g.putImageData(im, 0, 0);
      return c;
    });
  }

  // Сетка занятости: 1 там, где на экране человек (обычное фото или костюм)
  function personGrid(cell, frontY = Infinity){
    const gw = Math.ceil(W / cell), gh = Math.ceil(H / cell);
    const c = document.createElement('canvas'); c.width = gw; c.height = gh;
    const g = c.getContext('2d');
    for (const img of [mask, maskReveal]) if (img) g.drawImage(img, rect.x / cell, rect.y / cell, rect.w / cell, rect.h / cell);
    const d = g.getImageData(0, 0, gw, gh).data;
    // префиксные суммы — быстро считать, сколько человека в прямоугольнике
    const sum = new Int32Array((gw + 1) * (gh + 1));
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
      const occ = d[(y * gw + x) * 4 + 3] > 30 && y * cell < frontY ? 1 : 0;
      sum[(y + 1) * (gw + 1) + x + 1] = occ + sum[y * (gw + 1) + x + 1] + sum[(y + 1) * (gw + 1) + x] - sum[y * (gw + 1) + x];
    }
    const count = (x0, y0, x1, y1) => {
      const a = Math.max(0, Math.floor(x0 / cell)), b = Math.max(0, Math.floor(y0 / cell));
      const e = Math.min(gw, Math.ceil(x1 / cell)), f = Math.min(gh, Math.ceil(y1 / cell));
      if (e <= a || f <= b) return [0, 1];
      return [sum[f * (gw + 1) + e] - sum[b * (gw + 1) + e] - sum[f * (gw + 1) + a] + sum[b * (gw + 1) + a], (e - a) * (f - b)];
    };
    return {
      free: (x0, y0, x1, y1) => count(x0, y0, x1, y1)[0] === 0,
      cover: (x0, y0, x1, y1) => { const [n, all] = count(x0, y0, x1, y1); return n / all; }
    };
  }

  // Самый крупный кегль, при котором блок слов помещается на фоне, не касаясь человека
  // Надпись почти на весь экран, за человеком. Перебираем раскладки (строки по центру, слова по краям,
  // стопка, зигзаг, одна строка) и берём самый крупный кегль, при котором каждое слово видно
  // хотя бы на 70% — человек перекрывает буквы, но надпись читается.
  function placeLetters(g, setFont, portrait, gutter, frontY){
    const bottom = H - gutter - (portrait && playBtn ? 58 + 40 : 0);   // место под кнопку PLAY
    setFont(g, 100);
    const unit = wordArt ? wordArt.map(a => a.width / a.height * ART_H + 0.04)
                         : words.map(wd => g.measureText(wd).width / 100 + 0.1);   // + запас на «надувание»
    const grid = (mask || maskReveal) ? personGrid(4, frontY) : { free: () => true, cover: () => 0 };
    // на телефоне голова занимает почти всю ширину — разрешаем ей закрывать буквы чуть сильнее
    const LH = 0.9, CAP = 0.8, GAP = 0.32, VIS = portrait ? 0.6 : 0.7;
    const pairs = [], stack = words.map((_, i) => [i]), one = [words.map((_, i) => i)];
    for (let i = 0; i < words.length; i += 2) pairs.push([i, i + 1].filter(j => j < words.length));
    const modes = [
      [pairs, 'center'], [pairs, 'split'], [stack, 'zigzag'], [stack, 'left'], [stack, 'right'], [stack, 'center'], [one, 'center']
    ];
    const layout = (rows, align, fs, y) => {
      const items = [];
      rows.forEach((row, r) => {
        const cy = y + fs * LH * (r + 0.5);
        const ws = row.map(i => unit[i] * fs), rowW = ws.reduce((a, b) => a + b, 0) + GAP * fs * (row.length - 1);
        let xs;
        if (align === 'split' && row.length > 1) xs = [gutter, W - gutter - ws[ws.length - 1]];
        else if (align === 'left' || (align === 'zigzag' && r % 2 === 0)) xs = [gutter];
        else if (align === 'right' || align === 'zigzag') xs = [W - gutter - rowW];
        else xs = [(W - rowW) / 2];
        let x = xs[0];
        row.forEach((i, k) => {
          if (xs[k] !== undefined) x = xs[k];
          items.push({ text: words[i], x, y: cy, w: ws[k] });
          x += ws[k] + GAP * fs;
        });
      });
      return items;
    };
    if (isFinite(frontY)) {
      // телефон: надпись сразу под подбородком, по центру; берём раскладку с самыми крупными буквами
      const LHp = 0.82, top = frontY + H * 0.012;
      const rowsOpts = [pairs, stack];
      if (words.length === 4) rowsOpts.push([[0], [1], [2, 3]]);
      let pick = null;
      for (const rows of rowsOpts) {
        const widest = Math.max(...rows.map(row => row.reduce((a, i) => a + unit[i], 0) + GAP * (row.length - 1)));
        const fsP = Math.min((W - 2 * gutter) / widest, (bottom - top) / (rows.length * LHp));
        if (!pick || fsP > pick.fs) pick = { fs: fsP, rows };
      }
      const fsP = Math.max(18, pick.fs * 0.92), bhP = pick.rows.length * fsP * LHp, yP = top;   // чуть мельче — блок аккуратнее
      const items = layout(pick.rows, 'center', fsP, yP).map(it => ({ ...it, y: yP + (it.y - yP) * (LHp / LH) }));
      return { fs: fsP, items, x: gutter, y: yP, bw: W - 2 * gutter, bh: bhP, align: 'center', free: grid.free };
    }
    if (cfg.side) {
      const landscape = W / H >= 0.9;
      const x0 = gutter, x1 = landscape ? rect.x - gutter : W - gutter;
      const y0 = gutter + 40,                 // сверху место под кнопку «← Формат»
            y1 = landscape ? H - gutter : rect.y + rect.h * 0.12;
      const rw = x1 - x0, rh = y1 - y0;
      const playK = 0.22 + 0.62 + 0.1;   // отступ до PLAY + сама подушка (доли кегля)
      let pick = null;
      for (const rows of [pairs, stack]) {
        const widest = Math.max(...rows.map(row => row.reduce((a, i) => a + unit[i], 0) + GAP * (row.length - 1)));
        const fs = Math.min(rw / widest, rh / (rows.length * LH + playK), H * 0.3);
        if (!pick || fs > pick.fs) pick = { fs, rows };
      }
      const fs = pick.fs, bh = pick.rows.length * fs * LH;
      const playH = landscape ? Math.max(52, Math.min(84, fs * 0.62)) : 58;
      const y = y0 + Math.max(0, (rh - (bh + fs * 0.22 + playH)) / 2);
      const items = [];
      pick.rows.forEach((row, r) => {
        const ws = row.map(i => unit[i] * fs), rowW = ws.reduce((a, b) => a + b, 0) + GAP * fs * (row.length - 1);
        let x = x0 + (rw - rowW) / 2;
        row.forEach((i, k) => { items.push({ text: words[i], x, y: y + fs * LH * (r + 0.5), w: ws[k] }); x += ws[k] + GAP * fs; });
      });
      return { fs, items, x: x0, y, bw: rw, bh, align: 'center', free: () => true };
    }
    const maxFs = Math.min(W * 0.42, H * 0.46);
    for (let fs = maxFs; fs >= 18; fs *= 0.96) {
      let best = null;
      for (const [rows, align] of modes) {
        const widest = Math.max(...rows.map(row => row.reduce((a, i) => a + unit[i] * fs, 0) + GAP * fs * (row.length - 1)));
        if (widest > W - 2 * gutter) continue;
        const bh = rows.length * fs * LH;
        const yMin = isFinite(frontY) ? Math.max(gutter, frontY - fs * LH * 0.5) : gutter;   // на телефоне — ниже подбородка
        for (let y = yMin; y + bh <= bottom; y += 8) {
          const items = layout(rows, align, fs, y);
          let vis = 1;
          for (const it of items) vis = Math.min(vis, 1 - grid.cover(it.x, it.y - fs * CAP / 2, it.x + it.w, it.y + fs * CAP / 2));
          if (vis >= VIS && (!best || vis > best.vis)) best = { vis, items, y, bh };
        }
      }
      if (best) {
        const x0 = Math.min(...best.items.map(it => it.x)), x1 = Math.max(...best.items.map(it => it.x + it.w));
        return { fs, items: best.items, x: x0, y: best.y, bw: x1 - x0, bh: best.bh, align: 'center', free: grid.free };
      }
    }
    const fs = 18;
    return { fs, items: layout(stack, 'left', fs, gutter), x: gutter, y: gutter, bw: W / 2, bh: words.length * fs * LH, align: 'left', free: grid.free };
  }

  const INTRO_DELAY = 600;   // мс: буквы начинают появляться, когда фото уже проявилось
  let glyphCount = 0, lettersBox = null, introStart = null, puff = 0, ptrOn = 0;
  const playBtn = hero.querySelector('.hero-play');
  let playHover = false;
  if (playBtn) {
    playBtn.addEventListener('pointerenter', () => { playHover = true; });
    playBtn.addEventListener('pointerleave', () => { playHover = false; });
    playBtn.addEventListener('focus', () => { playHover = true; });
    playBtn.addEventListener('blur', () => { playHover = false; });
  }

  // Кнопка PLAY — бархатная подушка под блоком слов (если там свободно), иначе внизу по центру.
  // Сама подушка рисуется в шейдере, поверх неё — настоящая ссылка с надписью.
  let playRect = null, puffBtn = 0;
  function placePlay(spot){
    lettersBox = { x: spot.x, y: spot.y, w: spot.bw, h: spot.bh, fs: spot.fs };
    if (!playBtn) return null;
    const portrait = W / H < 0.9;
    const ph = portrait ? 58 : Math.max(52, Math.min(84, spot.fs * 0.62)), pw = ph * 2.85;
    if (cfg.side) spot.bw = Math.max(spot.bw, pw);
    let x = spot.align === 'right' ? spot.x + spot.bw - pw : spot.align === 'center' ? spot.x + (spot.bw - pw) / 2 : spot.x;
    let y = spot.y + spot.bh + spot.fs * 0.22;
    const gap = 12;
    if (!cfg.side && (portrait || !spot.free(x - gap, y - gap, x + pw + gap, y + ph + gap) || y + ph > H - 16)) {
      x = (W - pw) / 2; y = H - ph - Math.max(28, H * 0.05);
    }
    playRect = { x, y, w: pw, h: ph };
    hero.style.setProperty('--play-x', x + 'px');
    hero.style.setProperty('--play-y', y + 'px');
    hero.style.setProperty('--play-w', pw + 'px');
    hero.style.setProperty('--play-h', ph + 'px');
    hero.style.setProperty('--play-delay', (reduced ? 0 : INTRO_DELAY / 1000 + (glyphCount + 1) * 0.11 + 0.45) + 's');
    hero.classList.add('has-play');
    return playRect;
  }

  // Буквы реагируют на мышь: чем ближе курсор, тем сильнее «поддуваются», наклоняются к нему
  // и тем больше блик следует за курсором
  function lettersFollow(t){
    if (!lettersBox) return;
    const b = lettersBox;
    const near = ptr.active && t - ptr.last < 4000;
    const dx = Math.max(b.x - ptr.x, 0, ptr.x - (b.x + b.w)), dy = Math.max(b.y - ptr.y, 0, ptr.y - (b.y + b.h));
    const d = Math.hypot(dx, dy);
    puff += ((near && d === 0 ? 0.45 : 0) - puff) * 0.06;
    ptrOn += ((near ? 0.85 : 0) - ptrOn) * 0.06;
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    const tx = Math.max(-1, Math.min(1, (ptr.x - cx) / (b.w / 2 + b.fs))) * b.fs * 0.05 * puff;
    const ty = Math.max(-1, Math.min(1, (ptr.y - cy) / (b.h / 2 + b.fs))) * b.fs * 0.05 * puff;
    gl.uniform2f(uniforms.uPtr, ptr.x / W, 1 - ptr.y / H);
    gl.uniform1f(uniforms.uPtrOn, ptrOn);
    gl.uniform1f(uniforms.uPuff, puff);
    const overBtn = playRect && near && ptr.x > playRect.x && ptr.x < playRect.x + playRect.w && ptr.y > playRect.y && ptr.y < playRect.y + playRect.h;
    puffBtn += ((overBtn || playHover ? 1 : 0) - puffBtn) * 0.15;
    gl.uniform1f(uniforms.uPuffBtn, puffBtn);
    gl.uniform2f(uniforms.uTilt, tx / W, -ty / H);
    if (introStart === null) {
      introStart = reduced ? -1e6 : t + INTRO_DELAY;   // ждём, пока проявится фото
      // первая волна костюма — сразу после того, как буквы появились
      nextSeries = Math.max(nextSeries, t + INTRO_DELAY + glyphCount * 110 + 700);
    }
    gl.uniform1f(uniforms.uIntro, (t - introStart) / 1000);
  }

  // Евклидово расстояние до края (Felzenszwalb): для каждой точки внутри — как далеко до фона
  function distanceField(inside, w, h){
    const INF = 1e12, n = Math.max(w, h);
    const f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
    const out = new Float64Array(w * h);
    for (let i = 0; i < w * h; i++) out[i] = inside[i] ? INF : 0;
    const pass = (len, get, set) => {
      for (let q = 0; q < len; q++) f[q] = get(q);
      let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
      for (let q = 1; q < len; q++) {
        let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
        k++; v[k] = q; z[k] = s; z[k + 1] = INF;
      }
      k = 0;
      for (let q = 0; q < len; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
      for (let q = 0; q < len; q++) set(q, d[q]);
    };
    for (let x = 0; x < w; x++) pass(h, y => out[y * w + x], (y, val) => { out[y * w + x] = val; });
    for (let y = 0; y < h; y++) pass(w, x => out[y * w + x], (x, val) => { out[y * w + x] = val; });
    for (let i = 0; i < w * h; i++) out[i] = Math.sqrt(out[i]);
    return out;
  }

  // Размытие «бегущей суммой» (для складок между буквами)
  function boxBlur(src, w, h, r){
    const tmp = new Float32Array(w * h), out = new Float32Array(w * h), n = 2 * r + 1;
    for (let y = 0; y < h; y++) {
      let acc = 0;
      for (let x = -r; x <= r; x++) acc += src[y * w + Math.min(w - 1, Math.max(0, x))];
      for (let x = 0; x < w; x++) {
        tmp[y * w + x] = acc / n;
        acc += src[y * w + Math.min(w - 1, x + r + 1)] - src[y * w + Math.max(0, x - r)];
      }
    }
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let y = -r; y <= r; y++) acc += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
      for (let y = 0; y < h; y++) {
        out[y * w + x] = acc / n;
        acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
      }
    }
    return out;
  }

  function buildLetters(){
    if (!words.length) return null;
    const ls = Math.min(dpr, 1.5);
    const w = Math.round(W * ls), h = Math.round(H * ls);
    const portrait = W / H < 0.9;
    const gutter = Math.max(16, W * 0.035);
    const mk = (cw = w, ch = h) => { const c = document.createElement('canvas'); c.width = cw; c.height = ch; return c; };
    const setFont = (g, size) => {
      g.font = `${FONT_W} ${size}px ${FONT}`;
      if ('letterSpacing' in g) g.letterSpacing = `${FONT_LS * size}px`;
      g.textBaseline = 'middle';
    };
    const maskC = mk(), m = maskC.getContext('2d');
    // на телефоне свободного фона почти нет: ниже подбородка буквы идут поверх человека
    const frontY = Infinity;   // буквы за человеком и на телефоне, как на компьютере
    const spot = placeLetters(m, setFont, portrait, gutter, frontY);
    const fs = spot.fs;

    // список «подушек»: каждая буква отдельно + кнопка
    setFont(m, fs);
    const shapes = [];
    spot.items.forEach(it => {
      if (wordArt) {                                             // слово с картинки — одна «подушка»
        const a = wordArt[words.indexOf(it.text)], hh = ART_H * fs;
        shapes.push({ art: a, x: it.x + fs * 0.02, y: it.y, w: a.width / a.height * hh, h: hh });
        return;
      }
      const x0 = it.x + fs * 0.05;                               // половина запаса на «надувание»
      [...it.text].forEach((ch, ci) => {
        if (ch.trim()) shapes.push({ ch, x: x0 + m.measureText(it.text.slice(0, ci)).width, y: it.y });
      });
    });
    glyphCount = shapes.length;
    const pr = placePlay(spot);
    if (pr) shapes.push({ pill: pr });
    const btnIdx = pr ? glyphCount : -10;

    const H1 = new Float32Array(w * h), IDX = new Uint8Array(w * h).fill(255);
    const PIPE = new Uint8Array(w * h).fill(255);           // 255 — жёлтый кант, 0 — зелёный бархат
    const P = Math.max(3, fs * 0.06 * ls);                  // ширина канта
    const drawShape = (g, sh) => {
      if (sh.pill) {
        const r = sh.pill.h / 2;
        g.beginPath(); g.roundRect(sh.pill.x, sh.pill.y, sh.pill.w, sh.pill.h, r); g.fill();
      } else if (sh.art) {
        g.drawImage(sh.art, sh.x, sh.y - sh.h / 2, sh.w, sh.h);
      } else {
        g.textAlign = 'left'; setFont(g, fs);
        g.lineJoin = 'round'; g.lineWidth = fs * 0.07; g.strokeStyle = '#fff';
        g.strokeText(sh.ch, sh.x, sh.y); g.fillText(sh.ch, sh.x, sh.y);
      }
    };
    // общий силуэт (для сглаженного края и тени)
    m.setTransform(ls, 0, 0, ls, 0, 0); m.fillStyle = '#fff';
    shapes.forEach(sh => drawShape(m, sh));

    // каждая подушка: расстояние до края → круглый профиль; на стыках берём максимум — получается складка
    shapes.forEach((sh, si) => {
      const bx = sh.pill ? sh.pill.x - 4 : sh.art ? sh.x - 4 : sh.x - fs * 0.15, by = sh.pill ? sh.pill.y - 4 : sh.art ? sh.y - sh.h / 2 - 4 : sh.y - fs * 0.75;
      const bw = sh.pill ? sh.pill.w + 8 : sh.art ? sh.w + 8 : m.measureText(sh.ch).width + fs * 0.4, bh = sh.pill ? sh.pill.h + 8 : sh.art ? sh.h + 8 : fs * 1.5;
      const gx = Math.max(0, Math.floor(bx * ls)), gy = Math.max(0, Math.floor(by * ls));
      const gw = Math.min(w - gx, Math.ceil(bw * ls)), gh = Math.min(h - gy, Math.ceil(bh * ls));
      if (gw <= 2 || gh <= 2) return;
      const c = mk(gw, gh), g = c.getContext('2d');
      g.setTransform(ls, 0, 0, ls, -gx, -gy); g.fillStyle = '#fff';
      drawShape(g, sh);
      const a = g.getImageData(0, 0, gw, gh).data;
      const inside = new Uint8Array(gw * gh);
      for (let i = 0; i < gw * gh; i++) inside[i] = a[i * 4 + 3] >= 128 ? 1 : 0;
      const dist = distanceField(inside, gw, gh);
      let maxD = 1;
      for (let i = 0; i < gw * gh; i++) if (dist[i] > maxD) maxD = dist[i];
      const R = Math.max(maxD * 0.95, P * 2);
      const tubeH = Math.min(0.5, (P * 0.5 / R) * 1.4);     // кант — круглый шнур по краю
      for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
        const li = y * gw + x;
        if (!inside[li]) continue;
        const d = dist[li];
        let hv, pipe;
        if (d < P) {
          const u = (d - P * 0.5) / (P * 0.5);
          hv = Math.sqrt(Math.max(0, 1 - u * u)) * tubeH;
          pipe = d < P - 1 ? 255 : Math.round((P - d) * 255);
        } else {
          const t = Math.min(1, (d - P) / (R - P));
          hv = 1 - (1 - t) * (1 - t) * (1 - t);              // мягкий бархатный купол внутри канта
          pipe = 0;
        }
        const gi = (gy + y) * w + gx + x;
        if (hv >= H1[gi]) { H1[gi] = hv; IDX[gi] = sh.pill ? btnIdx : si + (sh.y >= frontY - 1 ? 128 : 0); PIPE[gi] = pipe; }
      }
    });

    // сглаживаем гребни и считаем складки (где высота ниже, чем вокруг)
    const Hs = boxBlur(boxBlur(H1, w, h, 1), w, h, 1);
    const Hb = boxBlur(Hs, w, h, Math.max(2, Math.round(fs * 0.06 * ls)));
    const sigma = fs * 0.06 * ls;
    const shC = mk(), shx = shC.getContext('2d');
    shx.filter = `blur(${sigma * 1.4}px)`; shx.drawImage(maskC, 0, fs * 0.07 * ls);
    const md = m.getImageData(0, 0, w, h).data, sd = shx.getImageData(0, 0, w, h).data;
    const t1 = new ImageData(w, h), t2 = new ImageData(w, h);
    const k = fs * 0.075 * ls;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, o = i * 4;
      const hx = (Hs[Math.min(i + 1, y * w + w - 1)] - Hs[Math.max(i - 1, y * w)]) * 0.5 * k;
      const hy = (Hs[Math.min(i + w, w * h - 1)] - Hs[Math.max(i - w, 0)]) * 0.5 * k;
      const len = Math.hypot(hx, hy, 1);
      t1.data[o] = (-hx / len * 0.5 + 0.5) * 255;
      t1.data[o + 1] = (hy / len * 0.5 + 0.5) * 255;
      t1.data[o + 2] = Hs[i] * 255;
      t1.data[o + 3] = PIPE[i];                                                 // кант
      t2.data[o] = Math.min(1, Math.max(0, (Hb[i] - Hs[i]) * 2.5)) * 255;   // складки
      t2.data[o + 1] = sd[o + 3];                                             // тень
      t2.data[o + 2] = md[o + 3];                                             // силуэт
      t2.data[o + 3] = IDX[i];                                                // номер буквы
    }
    const out = [t1, t2];
    if (wordArt) {                                              // цвет букв с картинки
      const colC = mk(), cx = colC.getContext('2d');
      cx.setTransform(ls, 0, 0, ls, 0, 0);
      shapes.forEach(sh => sh.art && drawShape(cx, sh));
      out.push(colC);
    }
    out.spot = spot; out.btnIdx = btnIdx;
    return out;
  }

  function onMove(e){
    const b = hero.getBoundingClientRect();
    ptr.tx = e.clientX - b.left;
    ptr.ty = e.clientY - b.top;
    if (!ptr.active) { ptr.x = ptr.px = ptr.tx; ptr.y = ptr.py = ptr.ty; }
    ptr.active = true;
    ptr.last = performance.now();
    hero.classList.add('is-touched');
  }

  // Автоматическая смена образа, как на landonorris.com: пока курсор не двигается,
  // через лицо сериями проходят широкие горизонтальные мазки (глаза, рот, лоб),
  // в которых проступает костюм; по фону за ними тянется «дым».
  const autoPause = parseFloat(hero.dataset.auto ?? 1.6) * 1000;
  // data-stroke — толщина мазков, в которых проступает костюм (1 — как было; больше — костюма видно больше)
  const strokeK = parseFloat(hero.dataset.stroke) || 1;
  // высота от центра лица (доли лица): голова и тело
  const BANDS = { forehead: -0.36, eyes: -0.06, mouth: 0.3, neck: 0.62, chest: 0.95, belly: 1.35 };
  const SERIES = [
    ['eyes', 'chest', 'mouth'],
    ['forehead', 'belly', 'neck'],
    ['mouth', 'chest', 'belly', 'eyes'],
    ['chest', 'eyes', 'belly'],
    ['neck', 'forehead', 'chest', 'mouth']
  ];
  const STROKE_DUR = 900, STROKE_GAP = 520;                     // длительность мазка и шаг между мазками серии
  const sweeps = [];
  let nextSeries = 500, seriesIdx = 0, dir = 1;
  const ease = p => 1 - Math.pow(1 - p, 2.2);

  function sweepPoint(sw, p){
    const cx = rect.x + cfg.fx * rect.w, cy = rect.y + cfg.fy * rect.h;
    const span = W * 0.62 + faceH;                              // мазок идёт через весь экран
    return {
      x: cx + sw.dir * (-span + 2 * span * ease(p)),
      y: cy + sw.band * faceH + Math.sin(p * Math.PI * 1.6 + sw.phase) * faceH * 0.08
    };
  }

  function runSweeps(t){
    if (autoPause <= 0 || reduced) return;
    if (!sweeps.length && t >= nextSeries && t - ptr.last > 1000) {
      SERIES[seriesIdx].forEach((name, i) => sweeps.push({
        start: t + i * STROKE_GAP, band: BANDS[name], dir: (i % 2 ? -dir : dir), phase: Math.random() * 6, x: null, y: null
      }));
      seriesIdx = (seriesIdx + 1) % SERIES.length;
      dir = -dir;
    }
    for (let j = sweeps.length - 1; j >= 0; j--) {
      const sw = sweeps[j];
      if (t < sw.start) continue;
      const p = Math.min(1, (t - sw.start) / STROKE_DUR);
      const pt = sweepPoint(sw, p);
      if (sw.x === null) { sw.x = pt.x; sw.y = pt.y; }
      const r = faceH * (0.16 + 0.09 * Math.sin(p * Math.PI)) * strokeK;
      const dist = Math.hypot(pt.x - sw.x, pt.y - sw.y);
      const steps = Math.max(1, Math.ceil(dist / (r * 0.3)));
      for (let i = 1; i <= steps; i++) {
        const k = i / steps;
        stamp(sw.x + (pt.x - sw.x) * k, sw.y + (pt.y - sw.y) * k, r, Math.min(0.65, 0.4 * strokeK), 2.4);
      }
      sw.x = pt.x; sw.y = pt.y;
      if (p >= 1) sweeps.splice(j, 1);
    }
    if (!sweeps.length && nextSeries < t) nextSeries = t + autoPause;
  }

  // Мазок-эллипс: sx > 1 растягивает его по горизонтали
  function stamp(x, y, r, a, sx = 1){
    const s = FIELD_SCALE;
    fctx.save();
    fctx.translate(x * s, y * s);
    fctx.scale(sx, 1);
    const g = fctx.createRadialGradient(0, 0, 0, 0, 0, r * s);
    g.addColorStop(0, `rgba(0,0,0,${a})`);
    g.addColorStop(0.6, `rgba(0,0,0,${a * 0.8})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    fctx.fillStyle = g;
    fctx.beginPath(); fctx.arc(0, 0, r * s, 0, Math.PI * 2); fctx.fill();
    fctx.restore();
  }

  function frame(t){
    if (!hero.offsetWidth || !rect) { requestAnimationFrame(frame); return; }   // интро скрыто — не рисуем
    const moving = t - ptr.last < 120;
    ptr.px = ptr.x; ptr.py = ptr.y;
    ptr.x += (ptr.tx - ptr.x) * 0.22;
    ptr.y += (ptr.ty - ptr.y) * 0.22;
    const dist = Math.hypot(ptr.x - ptr.px, ptr.y - ptr.py);

    // Поле пятен: старое медленно «съедается», вдоль пути курсора добавляются новые капли
    fctx.globalCompositeOperation = 'destination-out';
    fctx.fillStyle = `rgba(0,0,0,${hero.dataset.decay || 0.028})`;
    fctx.fillRect(0, 0, field.width, field.height);
    fctx.globalCompositeOperation = 'source-over';
    runSweeps(t);
    if (ptr.active && moving) {
      const r = (faceH * 0.15 + Math.min(dist, 60) * 1.1) * strokeK;
      const steps = Math.max(1, Math.ceil(dist / (r * 0.25)));
      for (let i = 1; i <= steps; i++) {
        const k = i / steps;
        stamp(ptr.px + (ptr.x - ptr.px) * k, ptr.py + (ptr.y - ptr.py) * k, r, Math.min(0.55, 0.32 * strokeK), 1.6);
      }
    }

    upload(2, texField, field);
    lettersFollow(t);
    gl.uniform1f(uTime, t / 1000);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(frame);
  }

  const optional = src => src ? load(src).catch(() => null) : null;
  Promise.all([load(hero.dataset.base), optional(hero.dataset.reveal), optional(hero.dataset.mask), optional(hero.dataset.maskReveal), optional(hero.dataset.wordArt)])
    .then(async ([b, r, mk, mr, art]) => {
      base = b; reveal = r; mask = mk; maskReveal = mr; wordArt = cutWords(art);
      if (words.length && !wordArt && document.fonts) await document.fonts.load(`${FONT_W} 100px ${FONT}`).catch(() => {});
      if (!gl) throw new Error('WebGL недоступен');
      initGL();
      resize();
      const safeResize = () => { try { resize(); } catch (e) { console.error('hero:', e); showStatic(); } };
      addEventListener('resize', safeResize);
      // при повторном показе интро пересчитываем раскладку, только если размер окна поменялся
      hero._relayout = () => { const b = hero.getBoundingClientRect(); if (b.width && (b.width !== W || b.height !== H)) safeResize(); };
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerdown', onMove);
      hero.classList.add('is-ready');
      if (gl) requestAnimationFrame(frame);
    })
    .catch(err => { console.error('hero:', err); showStatic(); });
} };
