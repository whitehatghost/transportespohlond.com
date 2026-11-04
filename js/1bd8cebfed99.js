
(function () {
  var hasIO = 'IntersectionObserver' in window;

  // Hero: one orchestrated entrance (headline, livery stripe, photo)
  var hero = document.getElementById('hero');
  requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add('go'); }); });

  // Reveal blocks as they enter the viewport
  var io = hasIO ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }) : null;
  document.querySelectorAll('.rv').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  // Header turns solid once the demo strip scrolls away
  var top = document.getElementById('top');
  function hdr() { top.classList.toggle('solid', scrollY > 8); }
  addEventListener('scroll', hdr, { passive: true }); hdr();

  // Mobile menu
  var mb = document.getElementById('menuBtn'), mn = document.getElementById('mnav');
  function menu(open) {
    document.body.classList.toggle('menu-open', open);
    mb.setAttribute('aria-expanded', String(open));
    mn.inert = !open;
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  mb.addEventListener('click', function () { menu(!document.body.classList.contains('menu-open')); });
  document.getElementById('mnavX').addEventListener('click', function () { menu(false); });
  mn.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') menu(false); });

  // Services: the row in focus (scroll, hover or keyboard) drives the photo panel
  var rows = [].slice.call(document.querySelectorAll('.svc-row')), figs = [].slice.call(document.querySelectorAll('.svc-media figure'));
  function act(i) {
    rows.forEach(function (r, k) { r.classList.toggle('on', k === i); });
    figs.forEach(function (f, k) { f.classList.toggle('on', k === i); });
  }
  rows.forEach(function (r, i) {
    r.addEventListener('mouseenter', function () { act(i); });
    r.addEventListener('focusin', function () { act(i); });
  });
  if (hasIO) {
    var mid = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) act(rows.indexOf(e.target)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    rows.forEach(function (r) { mid.observe(r); });
  }
  act(0);

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  // Route story: the truck drives a sample route as the visitor scrolls through the pinned section
  (function () {
    var track = document.getElementById('routeTrack'); if (!track) return;
    var NS = 'http://www.w3.org/2000/svg', topo = document.getElementById('topo');
    // Contour lines around the volcanoes north and east of the valley, and the southern hills
    [[250, -170, 30, 15, 1.3], [470, -80, 24, 14, 2.1], [830, 180, 22, 15, .7], [330, 430, 9, 13, 2.9], [640, 610, 14, 16, 4.2]].forEach(function (c) {
      for (var i = 1; i <= c[2]; i++) {
        var r = i * c[3], d = '';
        for (var k = 0; k <= 72; k++) {
          var t = k / 72 * Math.PI * 2, rr = r * (1 + .07 * Math.sin(3 * t + c[4] + i * .12) + .04 * Math.sin(5 * t - c[4] * 1.7 + i * .07));
          d += (k ? 'L' : 'M') + (c[0] + Math.cos(t) * rr * 1.25).toFixed(1) + ' ' + (c[1] + Math.sin(t) * rr).toFixed(1);
        }
        var pth = document.createElementNS(NS, 'path'); pth.setAttribute('d', d + 'Z');
        if (i % 5 === 0) pth.setAttribute('stroke-opacity', '.13');
        topo.appendChild(pth);
      }
    });
    var path = document.getElementById('rpath'), trail = document.getElementById('rtrail'), truck = document.getElementById('rtruck'), cam = document.getElementById('rcam');
    var pinB = document.getElementById('pinB'), hudS = document.getElementById('hudS'), hudC = document.getElementById('hudC'), bar = document.getElementById('hudBar');
    var steps = [].slice.call(document.querySelectorAll('#rsteps li'));
    var L = path.getTotalLength(), last = -1;
    trail.style.strokeDasharray = L;
    function render(p) {
      var m = clamp((p - .16) / .68, 0, 1), e = m < .5 ? 2 * m * m : 1 - Math.pow(-2 * m + 2, 2) / 2;
      var len = e * L, pt = path.getPointAtLength(len), a = path.getPointAtLength(Math.max(0, len - 2)), b = path.getPointAtLength(Math.min(L, len + 2));
      var ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      trail.style.strokeDashoffset = L - len;
      truck.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')');
      var k = Math.sin(Math.PI * e), z = 1 + .45 * k, cx = 400 + (pt.x - 400) * k, cy = 260 + (pt.y - 260) * k;
      cam.setAttribute('transform', 'translate(400 260) scale(' + z.toFixed(3) + ') translate(' + (-cx).toFixed(1) + ' ' + (-cy).toFixed(1) + ')');
      var st = p < .16 ? 0 : p < .84 ? 1 : 2;
      if (st !== last) { steps.forEach(function (li, i) { li.classList.toggle('on', i === st); }); last = st; }
      pinB.classList.toggle('done', p >= .84);
      hudS.textContent = T(p < .16 ? 'Cargando' : p < .84 ? 'En ruta' : p < .97 ? 'Descargando' : 'Entregado');
      hudC.textContent = T('{la}° N · {lo}° O', { la: (10.08 - pt.y / 520 * .28).toFixed(3), lo: (84.32 - pt.x / 800 * .47).toFixed(3) });
      bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    }
    if (reduce) { render(1); steps.forEach(function (li) { li.classList.add('on'); }); onLang(function () { render(1); }); return; }
    var cur = -1, tgt = 0, running = false;
    function prog() { var r = track.getBoundingClientRect(), h = track.offsetHeight - innerHeight; return h > 0 ? clamp(-r.top / h, 0, 1) : 1; }
    function tick() {
      cur = cur < 0 ? tgt : cur + (tgt - cur) * .12;
      if (Math.abs(tgt - cur) < .0004) cur = tgt;
      render(cur);
      if (cur !== tgt) requestAnimationFrame(tick); else running = false;
    }
    function go() { tgt = prog(); if (!running) { running = true; requestAnimationFrame(tick); } }
    addEventListener('scroll', go, { passive: true }); addEventListener('resize', go); go();
    onLang(function () { render(cur < 0 ? 0 : cur); });
  })();

  // Night band: headlights ignite once the band is in view
  (function () {
    var band = document.getElementById('band'), img = band.querySelector('img'), glows = band.querySelectorAll('.glow');
    function place() {
      var W = img.offsetWidth, H = img.offsetHeight, sc = Math.max(W / 1640, H / 525), rw = 1640 * sc, rh = 525 * sc;
      var op = getComputedStyle(img).objectPosition.split(' ').map(parseFloat), ox = (W - rw) * op[0] / 100, oy = (H - rh) * op[1] / 100;
      glows.forEach(function (g) {
        g.style.left = (img.offsetLeft + ox + rw * g.dataset.x) + 'px';
        g.style.top = (img.offsetTop + oy + rh * g.dataset.y) + 'px';
        g.style.setProperty('--s', (rh * g.dataset.s) + 'px');
      });
    }
    place(); addEventListener('resize', place); img.addEventListener('load', place);
    if (!hasIO) { band.classList.add('lit'); return; }
    var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { band.classList.add('lit'); o.disconnect(); } }, { threshold: .5 });
    o.observe(band);
  })();

  // Hero photo parallax + livery progress line in the header
  (function () {
    var pic = document.querySelector('.hero-ph picture'), ph = document.querySelector('.hero-ph'), ticking = false;
    function frame() {
      ticking = false;
      var y = scrollY, doc = document.documentElement.scrollHeight - innerHeight;
      top.style.setProperty('--p', doc > 0 ? (y / doc).toFixed(4) : 0);
      if (!reduce && y < ph.offsetTop + ph.offsetHeight) pic.style.transform = 'translate3d(0,' + Math.min(y * .2, ph.offsetHeight * .14).toFixed(1) + 'px,0)';
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    frame();
  })();

  // "Lo que transportamos": a photo follows the cursor over each row (desktop with a mouse)
  (function () {
    if (reduce || !matchMedia('(hover:hover) and (pointer:fine) and (min-width:1101px)').matches) return;
    var peek = document.getElementById('peek'), pimg = peek.querySelector('img'), list = document.querySelector('.ct-list');
    var px = 0, py = 0, tx = 0, ty = 0, vx = 0, loop = false;
    function step() {
      var dx = tx - px; px += dx * .16; py += (ty - py) * .16; vx = vx * .8 + dx * .2;
      var x = Math.min(px + 32, innerWidth - 372), y = clamp(py - 128, 12, innerHeight - 268);
      peek.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + clamp(vx * .06, -7, 7).toFixed(2) + 'deg)';
      if (peek.classList.contains('on') || Math.abs(dx) > .5) requestAnimationFrame(step); else loop = false;
    }
    list.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    document.querySelectorAll('.ct-row').forEach(function (r) {
      var im = r.querySelector('.ct-th img');
      r.addEventListener('mouseenter', function (e) {
        if (!im) { peek.classList.remove('on'); return; }
        if (!peek.classList.contains('on') && !loop) { px = tx = e.clientX; py = ty = e.clientY; }
        pimg.src = im.currentSrc || im.src; pimg.style.objectPosition = im.style.objectPosition || '50% 50%';
        peek.classList.add('on');
        if (!loop) { loop = true; requestAnimationFrame(step); }
      });
      r.addEventListener('mouseleave', function () { peek.classList.remove('on'); });
    });
  })();

  // A3 · truck picker: four yes/no questions recommend a fleet card
  (function () {
    var box = document.getElementById('picker'); if (!box) return;
    var ans = {}, cards = document.querySelectorAll('.fc'), out = document.getElementById('pickT'), wa = document.getElementById('pickWa');
    var NAMES = { mont: 'Camión plataforma con montacargas', grua: 'Camión grúa con brazo articulado', mm: 'Master Move: cabezal con plataforma para equipo pesado', plat: 'Camión plataforma' };
    function decide() {
      var n = Object.keys(ans).length;
      cards.forEach(function (c) { c.classList.remove('pick'); });
      if (!n) { out.textContent = T('Responda las preguntas y le decimos qué camión le sirve.'); return; }
      var t = ans.pesada === '1' ? 'mm' : (ans.izar === '1' || ans.fragil === '1') ? 'grua' : ans.montasitio === '0' ? 'mont' : ans.montasitio === '1' ? 'plat' : null;
      if (!t) { out.textContent = T('Responda las preguntas y le decimos qué camión le sirve.'); return; }
      var card = document.querySelector('.fc[data-truck="' + t + '"]'); card.classList.add('pick');
      out.textContent = T(NAMES[t]);
      wa.href = 'https://wa.me/50689838585?text=' + encodeURIComponent(T('Hola, creo que necesito un {v}. ¿Me cotizan?', { v: T(NAMES[t]) }));
    }
    box.querySelectorAll('.pq').forEach(function (q) {
      q.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          q.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          ans[q.dataset.q] = b.dataset.v; decide();
        });
      });
    });
    onLang(decide);
  })();

  // A5 · articulated crane unfolds with scroll, lowers the hook and lifts the crate
  (function () {
    var wrap = document.getElementById('crane'); if (!wrap) return;
    var $ = function (id) { return document.getElementById(id); };
    var b1 = $('crB1'), b2 = $('crB2'), j1 = $('crJ1'), j2 = $('crJ2'), rope = $('crRope'), hook = $('crHook'), crate = $('crCrate'), sh = $('crSh');
    var P = { x: 463, y: 226 }, L1 = 140, L2 = 158, G = 330, CH = 50, rad = Math.PI / 180;
    var lerp = function (a, b, t) { return a + (b - a) * t; }, ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    function tip(u) {
      var a1 = lerp(185, 215, u) * rad, a2 = lerp(355, 170, u) * rad;
      var x1 = P.x + L1 * Math.cos(a1), y1 = P.y + L1 * Math.sin(a1);
      return { x1: x1, y1: y1, x2: x1 + L2 * Math.cos(a2), y2: y1 + L2 * Math.sin(a2) };
    }
    var end = tip(1), restTop = G - CH;
    function draw(p) {
      var t = tip(ease(clamp(p / .6, 0, 1)));
      b1.setAttribute('x1', P.x); b1.setAttribute('y1', P.y); b1.setAttribute('x2', t.x1); b1.setAttribute('y2', t.y1);
      b2.setAttribute('x1', t.x1); b2.setAttribute('y1', t.y1); b2.setAttribute('x2', t.x2); b2.setAttribute('y2', t.y2);
      j1.setAttribute('cx', t.x1); j1.setAttribute('cy', t.y1); j2.setAttribute('cx', t.x2); j2.setAttribute('cy', t.y2);
      var lower = clamp((p - .6) / .15, 0, 1), lift = ease(clamp((p - .75) / .25, 0, 1));
      var hy = lerp(t.y2 + 16, restTop - 4, ease(lower)) - lift * 90;
      rope.setAttribute('x1', t.x2); rope.setAttribute('y1', t.y2); rope.setAttribute('x2', t.x2); rope.setAttribute('y2', hy);
      hook.setAttribute('transform', 'translate(' + (t.x2 - 1).toFixed(1) + ' ' + hy.toFixed(1) + ')');
      var top = lower >= 1 ? hy + 14 : restTop;
      crate.setAttribute('transform', 'translate(' + (end.x2 - 32).toFixed(1) + ' ' + Math.min(top, restTop).toFixed(1) + ')');
      sh.setAttribute('cx', end.x2); sh.setAttribute('opacity', (.14 - lift * .08).toFixed(3));
    }
    if (reduce) { draw(1); return; }
    var ticking = false;
    function frame() {
      ticking = false;
      var r = wrap.getBoundingClientRect();
      draw(clamp((innerHeight * .92 - r.top) / (r.height + innerHeight * .35), 0, 1));
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    addEventListener('resize', frame); frame();
  })();

  // A6 · Costa Rica as a dot map; provinces light up when the map comes into view
  (function () {
    var map = document.getElementById('crMap'); if (!map) return;
    var NS = 'http://www.w3.org/2000/svg';
    var X = function (lon) { return (lon + 86) * 150 + 20; }, Y = function (lat) { return (11.35 - lat) * 150 + 10; };
    var OUT = [[-85.69,11.07],[-85.62,11.21],[-85.30,11.15],[-85.05,11.08],[-84.80,11.05],[-84.60,10.95],[-84.40,10.92],[-84.20,10.80],[-84.00,10.75],[-83.85,10.73],[-83.68,10.80],
      [-83.62,10.70],[-83.48,10.45],[-83.30,10.25],[-83.15,10.10],[-83.03,9.99],[-82.92,9.85],[-82.78,9.70],[-82.57,9.57],
      [-82.75,9.50],[-82.92,9.44],[-82.93,9.20],[-82.94,9.00],[-82.75,8.85],[-82.84,8.60],[-82.89,8.03],
      [-83.02,8.20],[-83.15,8.37],[-83.30,8.55],[-83.40,8.38],[-83.60,8.45],[-83.73,8.62],[-83.65,8.80],[-83.78,9.05],[-83.90,9.25],[-84.15,9.40],[-84.45,9.58],[-84.65,9.80],[-84.85,9.97],
      [-85.05,10.10],[-85.18,10.18],[-85.05,9.95],[-85.08,9.75],[-85.12,9.57],[-85.35,9.68],[-85.62,9.88],[-85.84,10.05],[-85.88,10.32],[-85.82,10.58],[-85.75,10.82]
    ].map(function (c) { return [X(c[0]), Y(c[1])]; });
    function inside(x, y) {
      var c = false;
      for (var i = 0, j = OUT.length - 1; i < OUT.length; j = i++) {
        var xi = OUT[i][0], yi = OUT[i][1], xj = OUT[j][0], yj = OUT[j][1];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
      }
      return c;
    }
    var dots = document.getElementById('crDots'), STEP = 9, all = [];
    for (var y = 6; y < 520; y += STEP) for (var x = 6; x < 560; x += STEP) {
      if (!inside(x, y)) continue;
      var d = document.createElementNS(NS, 'circle'); d.setAttribute('cx', x); d.setAttribute('cy', y); d.setAttribute('r', 2.7); d.setAttribute('class', 'crd');
      dots.appendChild(d); all.push(d);
    }
    var CAP = [['Liberia', -85.44, 10.63], ['Puntarenas', -84.83, 9.98], ['Alajuela', -84.21, 10.02], ['Heredia', -84.12, 10.0], ['San José', -84.08, 9.93], ['Cartago', -83.92, 9.86], ['Limón', -83.03, 9.99]];
    var hub = [X(-84.08), Y(9.93)], routes = document.getElementById('crRoutes'), pins = document.getElementById('crPins');
    CAP.forEach(function (c, i) {
      var x = X(c[1]), y = Y(c[2]);
      if (c[0] !== 'San José') {
        var mx = (hub[0] + x) / 2, my = Math.min(hub[1], y) - Math.abs(hub[0] - x) * .22 - 8;
        var r = document.createElementNS(NS, 'path'); r.setAttribute('d', 'M' + hub[0] + ' ' + hub[1] + ' Q' + mx + ' ' + my + ' ' + x + ' ' + y);
        r.setAttribute('class', 'cr-route'); routes.appendChild(r);
        var L = r.getTotalLength(); r.style.setProperty('--l', L); r.style.transitionDelay = (.2 + i * .15) + 's';
      }
      var g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'cr-pin'); g.style.transitionDelay = (.5 + i * .15) + 's';
      var lab = { 'Heredia': [6, -12], 'Alajuela': [-72, -6], 'San José': [-70, 22], 'Cartago': [10, 20], 'Puntarenas': [-88, 4], 'Liberia': [10, 4], 'Limón': [10, 4] }[c[0]];
      g.innerHTML = '<circle class="ring" cx="' + x + '" cy="' + y + '" r="11" fill="#ec5022" opacity=".22"/><circle cx="' + x + '" cy="' + y + '" r="5.5" fill="#ec5022" stroke="#fff" stroke-width="2"/><text x="' + (x + lab[0]) + '" y="' + (y + lab[1]) + '">' + c[0] + '</text>';
      pins.appendChild(g);
    });
    var items = document.querySelectorAll('#provList li');
    function light() {
      map.classList.add('lit');
      all.forEach(function (d) { d.classList.add('on'); });
      items.forEach(function (li, i) { setTimeout(function () { li.classList.add('on'); }, 300 + i * 150); });
    }
    if (reduce || !hasIO) { light(); return; }
    var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { light(); o.disconnect(); } }, { threshold: .35 });
    o.observe(map);
  })();

  // A8 · drivers tick what they have; the bar fills and the message updates
  (function () {
    var list = document.getElementById('req'); if (!list) return;
    var boxes = list.querySelectorAll('input'), bar = document.getElementById('reqBar'), msg = document.getElementById('reqMsg');
    function upd() {
      var n = [].filter.call(boxes, function (b) { return b.checked; }).length, total = boxes.length;
      bar.style.width = (n / total * 100) + '%';
      msg.classList.toggle('ok', n === total);
      msg.textContent = n === 0 ? T('{n} de {t}', { n: n, t: total }) : n === total ? T('¡Cumple todo! Suba su currículum y aplique.') : T('Tiene {n} de {t}. Puede aplicar igual y completar lo que falte.', { n: n, t: total });
    }
    boxes.forEach(function (b) { b.addEventListener('change', upd); });
    onLang(upd); upd();
  })();

  // A2 · three-step quote that ends in WhatsApp
  (function () {
    var form = document.getElementById('qform'); if (!form) return;
    var steps = form.querySelectorAll('.step-f'), cur = 1, picked = {};
    var back = document.getElementById('wizBack'), next = document.getElementById('wizNext'), send = document.getElementById('wizSend');
    var bar = document.getElementById('wizBar'), num = document.getElementById('wizN');
    form.querySelectorAll('.chips').forEach(function (g) {
      g.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', 'false');
        c.addEventListener('click', function () {
          g.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
          picked[g.dataset.name] = c; if (g.dataset.name === 'tipo') { next.disabled = false; setTimeout(function () { go(2); }, 220); }
        });
      });
    });
    function go(n) {
      cur = n;
      steps.forEach(function (s) { s.classList.toggle('on', +s.dataset.step === n); });
      bar.style.width = (n / 3 * 100) + '%';
      num.textContent = T('Paso {n} de 3', { n: n });
      back.hidden = n === 1; next.hidden = n === 3; send.hidden = n !== 3;
      next.disabled = n === 1 && !picked.tipo;
    }
    back.addEventListener('click', function () { go(cur - 1); });
    next.addEventListener('click', function () { go(cur + 1); });
    onLang(function () { num.textContent = T('Paso {n} de 3', { n: cur }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var lines = [T('Hola, quiero cotizar un transporte.')];
      if (picked.tipo) lines.push(T('Carga: {v}', { v: picked.tipo.textContent }));
      lines.push(T('Peso aproximado: {v}', { v: document.getElementById('q-peso').selectedOptions[0].textContent }));
      if (v('q-med')) lines.push(T('Medidas: {v}', { v: v('q-med') }));
      if (picked.equipo) lines.push(T('Equipo: {v}', { v: picked.equipo.textContent }));
      if (v('q-origen')) lines.push(T('Se recoge en: {v}', { v: v('q-origen') }));
      if (v('q-destino')) lines.push(T('Se entrega en: {v}', { v: v('q-destino') }));
      if (v('q-fecha')) lines.push(T('Fecha: {v}', { v: v('q-fecha') }));
      if (v('q-det')) lines.push(T('Detalles: {v}', { v: v('q-det') }));
      lines.push(T('Les adjunto fotos de la carga.'));
      window.open('https://wa.me/50689838585?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      if (window.__hscSend) window.__hscSend('whatsapp');
    });
  })();
})();
