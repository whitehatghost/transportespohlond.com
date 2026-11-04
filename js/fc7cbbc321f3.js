
// Scripted preview of the AI agents (recruiting + quotes). Nothing is stored or sent.
(function () {
  var WA = 'https://wa.me/50689838585?text=';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var kb = function (n) { return n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; };

  function Chat(root, flow) {
    this.root = root; this.flow = flow;
    this.b = root.querySelector('.chat-b');
    this.form = root.querySelector('.chat-f');
    this.input = this.form.querySelector('input[type=text]');
    this.sendBtn = this.form.querySelector('.send');
    this.attach = this.form.querySelector('.js-attach');
    this.st = root.querySelector('.st');
    this.picker = document.createElement('input');
    this.picker.type = 'file'; this.picker.accept = '.pdf,.doc,.docx,image/*'; this.picker.hidden = true;
    root.appendChild(this.picker);
    var self = this;
    this.form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = self.input.value.trim();
      if (v && self._text) { var r = self._text; self._text = null; self.input.value = ''; self.lock(); self.me(v); r(v); }
    });
    this.attach.addEventListener('click', function () { self.picker.click(); });
    this.picker.addEventListener('change', function () { if (self.picker.files[0]) self.offer(self.picker.files[0]); self.picker.value = ''; });
    this.run = 0; this.started = false;
  }
  Chat.prototype.start = function () {
    var self = this, id = ++this.run;
    this.started = true; this.b.innerHTML = ''; this.lock(); this._text = this._file = null;
    this.flow(this, function () { if (id !== self.run) throw 'reset'; }).catch(function () {});
  };
  Chat.prototype.add = function (node) { this.b.appendChild(node); this.b.scrollTop = this.b.scrollHeight; return node; };
  Chat.prototype.el = function (cls, html) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; return this.add(d); };
  Chat.prototype.say = async function (html, ms) {
    var id = this.run;
    var t = this.el('typing', '<i></i><i></i><i></i>');
    this.st.textContent = T('Escribiendo…');
    await sleep(ms || Math.min(1700, 450 + html.replace(/<[^>]+>/g, '').length * 14));
    t.remove(); this.st.textContent = T('En línea');
    if (id !== this.run) throw 'reset';
    this.el('msg bot', html);
  };
  Chat.prototype.me = function (text) { this.el('msg me', esc(text)); };
  Chat.prototype.lock = function () { this.input.disabled = this.sendBtn.disabled = this.attach.disabled = true; this.attach.classList.remove('hot'); this.input.placeholder = T('Escriba aquí…'); };
  Chat.prototype.choose = function (opts) {
    var self = this, id = this.run;
    return new Promise(function (res, rej) {
      var box = self.el('opts', '');
      opts.forEach(function (o) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'opt'; b.textContent = o;
        b.onclick = function () { box.remove(); if (id !== self.run) return rej('reset'); self.me(o); res(o); };
        box.appendChild(b);
      });
      self.b.scrollTop = self.b.scrollHeight;
    });
  };
  Chat.prototype.ask = function (ph) {
    var self = this;
    this.input.disabled = this.sendBtn.disabled = false; this.input.placeholder = ph;
    if (matchMedia('(hover:hover)').matches) this.input.focus({ preventScroll: true });
    return new Promise(function (res) { self._text = res; });
  };
  Chat.prototype.askFile = function () {
    var self = this;
    this.attach.disabled = false; this.attach.classList.add('hot');
    return new Promise(function (res) { self._file = res; });
  };
  Chat.prototype.fileMsg = function (f) {
    this.el('msg me file', '<svg><use href="#i-doc"/></svg><span>' + esc(f.name) + '<small>' + kb(f.size) + '</small></span>');
  };
  Chat.prototype.offer = function (f) {
    this.cv = f;
    if (this._file) { var r = this._file; this._file = null; this.lock(); this.fileMsg(f); r(f); }
  };
  Chat.prototype.card = function (title, badge, ok, rows) {
    this.el('ficha', '<div class="ficha-h">' + esc(title) + '<span class="' + (ok ? '' : 'no') + '">' + esc(badge) + '</span></div><dl>' +
      rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>');
  };
  Chat.prototype.link = function (label, href, onclick) {
    var a = document.createElement('a'); a.className = 'btn btn-wa'; a.style.alignSelf = 'flex-start'; a.style.fontSize = '14px'; a.style.padding = '11px 18px';
    a.innerHTML = '<svg><use href="#i-wa"/></svg>' + esc(label);
    if (href) { a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.classList.add('js-wa'); }
    if (onclick) { a.href = '#'; a.onclick = function (e) { e.preventDefault(); onclick(); }; a.querySelector('svg').remove(); }
    this.add(a);
  };
  Chat.prototype.again = async function (label) { await this.choose([label || T('Empezar de nuevo')]); this.start(); };

  // Recruiting agent
  async function recruitFlow(c, alive) {
    await c.say(T('¡Hola! Soy el asistente de reclutamiento de <b>Transportes Pohlond</b>.'));
    await c.say(T('Le hago unas preguntas rápidas y le paso su ficha a Recursos Humanos. Toma unos 2 minutos. ¿Cómo se llama?'));
    var name = await c.ask(T('Nombre y apellido')); alive();
    var first = name.split(T(' '))[0];
    await c.say(T('Mucho gusto, {n}. ¿Qué licencia de conducir tiene?', { n: esc(first) }));
    var lic = await c.choose(['B1', 'B2', 'B3', T('Otra')]);
    if (lic === T('Otra')) {
      await c.say(T('Gracias por su interés. Por ahora buscamos choferes con licencia B1, B2 o B3, así que esta vez no puedo pasar su solicitud.'));
      await c.say(T('Cuando abramos un puesto para su licencia lo publicaremos en nuestro Facebook. ¡Mucho éxito!'));
      return c.again();
    }
    await c.say(T('¿Cuántos años de experiencia tiene manejando camión?'));
    var exp = await c.choose([T('Menos de 2 años'), T('De 2 a 4 años'), T('Más de 4 años')]);
    if (exp === T('Menos de 2 años')) {
      await c.say(T('Le agradezco la sinceridad. Para este puesto pedimos al menos 2 años de experiencia manejando camión.'));
      await c.say(T('Le invitamos a aplicar de nuevo cuando la tenga. ¡Mucho éxito, {n}!', { n: esc(first) }));
      return c.again();
    }
    await c.say(T('Excelente. ¿En qué zona vive?'));
    var zona = await c.ask(T('Ej.: Alajuelita')); alive();
    await c.say(T('Anotado. El trabajo es dentro del GAM. ¿Qué horario puede trabajar?'));
    var hor = await c.choose([T('Diurno'), T('Nocturno'), T('Mixto'), T('Cualquiera')]);
    await c.say(T('¿Cuál es su aspiración salarial mensual?'));
    var sal = await c.ask(T('Ej.: ₡450 000')); alive();
    await c.say(T('¿Tiene al día la hoja de delincuencia y la lista de trabajos anteriores de la CCSS?'));
    var docs = await c.choose([T('Sí, ambas'), T('Me falta alguna')]);
    if (c.cv) {
      await c.say(T('Ya tengo el currículum que subió: <b>{f}</b>.', { f: esc(c.cv.name) }));
    } else {
      await c.say(T('Por último, adjunte su currículum con el clip o en el recuadro de al lado. Puede ser PDF, Word o una foto.'));
      await c.askFile(); alive();
    }
    await c.say(T('Preparando su ficha…'), 1400);
    var ok = docs === T('Sí, ambas');
    c.card(T('Ficha para RH'), ok ? T('Cumple requisitos') : T('Revisar documentos'), ok, [
      [T('Candidato'), name], [T('Licencia'), lic], [T('Experiencia'), exp], [T('Zona'), zona], [T('Horario'), hor],
      [T('Aspiración'), sal], [T('Documentos'), ok ? T('Al día') : T('Pendientes')], [T('Currículum'), c.cv ? c.cv.name : '—']
    ]);
    await sleep(500); alive();
    await c.say(T('¡Listo, {n}! Toque el botón para enviar su ficha a Recursos Humanos por WhatsApp y adjunte ahí su currículum.', { n: esc(first) }) + (ok ? '' : T(' Mientras tanto, vaya sacando los documentos que le faltan.')));
    var ficha = [T('Hola, quiero aplicar como chofer.'), T('Nombre: {v}', { v: name }), T('Licencia: {v}', { v: lic }), T('Experiencia: {v}', { v: exp }), T('Zona: {v}', { v: zona }),
      T('Horario: {v}', { v: hor }), T('Aspiración salarial: {v}', { v: sal }), T('Documentos: {v}', { v: ok ? T('Al día') : T('Pendientes') }), T('Les adjunto mi currículum.')].join('\n');
    c.link(T('Enviar mi ficha por WhatsApp'), WA + encodeURIComponent(ficha));
    return c.again();
  }

  // General assistant (quotes)
  async function assistFlow(c, alive) {
    await c.say(T('¡Hola! Soy el asistente virtual de <b>Transportes Pohlond</b>. ¿En qué le ayudo?'));
    var o = await c.choose([T('Cotizar un transporte'), T('Trabajar como chofer'), T('Hablar con una persona')]);
    if (o === T('Trabajar como chofer')) {
      await c.say(T('¡Qué bien! Le atiende nuestro asistente de reclutamiento: le hace unas preguntas y recibe su currículum.'));
      c.link(T('Ir a «Trabaje con nosotros»'), null, function () { closePanel(); document.getElementById('trabaje').scrollIntoView({ behavior: 'smooth' }); if (!recruit.started) recruit.start(); });
      return c.again(T('Volver al inicio'));
    }
    if (o === T('Hablar con una persona')) {
      await c.say(T('Claro. Le comunico por WhatsApp con nuestro equipo.'));
      c.link(T('Abrir WhatsApp'), WA + encodeURIComponent(T('Hola, quiero hablar con alguien de Transportes Pohlond')));
      return c.again(T('Volver al inicio'));
    }
    await c.say(T('Con gusto. ¿Qué necesita mover?'));
    var tipo = await c.choose([T('Mercadería'), T('Maquinaria o equipo'), T('Materiales'), T('Carga especial')]);
    await c.say(T('¿Dónde se recoge la carga?'));
    var de = await c.ask(T('Ej.: Santa Ana')); alive();
    await c.say(T('¿Y dónde se entrega?'));
    var a = await c.ask(T('Ej.: Heredia')); alive();
    await c.say(T('¿Para cuándo lo necesita?'));
    var cuando = await c.choose([T('Hoy o mañana'), T('Esta semana'), T('Más adelante')]);
    await c.say(T('¿Hace falta montacargas o grúa para cargar o descargar?'));
    var eq = await c.choose([T('Montacargas'), T('Grúa'), T('No sé, que me asesoren'), T('No hace falta')]);
    c.card(T('Resumen de cotización'), T('Listo'), true, [[T('Carga'), tipo], [T('Recoger en'), de], [T('Entregar en'), a], [T('Para'), cuando], [T('Equipo'), eq]]);
    await sleep(400); alive();
    await c.say(T('Le paso este resumen a nuestro equipo por WhatsApp para que le coticen.'));
    var msg = [T('Hola, quiero cotizar un transporte.'), T('Carga: {v}', { v: tipo }), T('Recoger en: {v}', { v: de }), T('Entregar en: {v}', { v: a }), T('Para: {v}', { v: cuando }), T('Equipo: {v}', { v: eq })].join('\n');
    c.link(T('Enviar por WhatsApp'), WA + encodeURIComponent(msg));
    return c.again(T('Volver al inicio'));
  }

  var recruit = new Chat(document.getElementById('recruit'), recruitFlow);
  recruit.root.querySelector('.js-restart').addEventListener('click', function () { recruit.cv = null; resetDrop(); recruit.start(); });
  if ('IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { seen.disconnect(); if (!recruit.started) recruit.start(); } }, { threshold: 0.35 });
    seen.observe(recruit.root);
  } else recruit.start();

  // CV dropzone feeds the recruiting chat
  var drop = document.getElementById('drop'), cvInput = document.getElementById('cvFile'), dropFile = null;
  function resetDrop() { drop.classList.remove('ok'); dropFile = null; document.getElementById('dropT').textContent = T('Suba aquí su currículum'); document.getElementById('dropS').textContent = T('PDF, Word o foto. Arrástrelo o toque para elegirlo.'); }
  function dropOk(f) { document.getElementById('dropT').textContent = T('Recibido: {f}', { f: f.name }); document.getElementById('dropS').textContent = T('{s} · Adjúntelo también en WhatsApp al enviar su ficha.', { s: kb(f.size) }); }
  function takeCV(f) {
    if (!f) return;
    drop.classList.add('ok'); dropFile = f; dropOk(f);
    if (!recruit.started) recruit.start();
    recruit.offer(f);
    if (innerWidth < 1080) recruit.root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  cvInput.addEventListener('change', function () { takeCV(cvInput.files[0]); cvInput.value = ''; });
  ['dragenter', 'dragover'].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (t) { drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
  drop.addEventListener('drop', function (e) { takeCV(e.dataTransfer.files[0]); });

  // Floating assistant
  var panel = document.getElementById('cpanel'), fab = document.getElementById('fab'), tip = document.getElementById('fabTip');
  var assist = new Chat(document.getElementById('assist'), assistFlow);
  function openPanel() { document.body.classList.add('chat-open'); panel.classList.add('open'); fab.classList.add('on'); fab.setAttribute('aria-expanded', 'true'); tip.classList.remove('show'); if (!assist.started) assist.start(); }
  function closePanel() { document.body.classList.remove('chat-open'); panel.classList.remove('open'); fab.classList.remove('on'); fab.setAttribute('aria-expanded', 'false'); }
  fab.addEventListener('click', function () { panel.classList.contains('open') ? closePanel() : openPanel(); });
  assist.root.querySelector('.js-close').addEventListener('click', closePanel);
  document.querySelectorAll('.js-open').forEach(function (b) { b.addEventListener('click', openPanel); });
  // Switching language refreshes the dynamic texts and restarts any chat already on screen
  onLang(function () {
    if (dropFile) dropOk(dropFile); else resetDrop();
    [recruit, assist].forEach(function (c) { c.st.textContent = T('En línea'); c.input.placeholder = T('Escriba aquí…'); if (c.started) c.start(); });
  });
  // The button only appears once the visitor leaves the hero, so it never covers the first screen.
  // The tip shows once, can be dismissed, and stays dismissed for the session.
  var fabRow = document.getElementById('fabRow'), tipOff = false;
  try { tipOff = sessionStorage.getItem('pohlond-tip') === '1'; } catch (e) {}
  document.getElementById('tipX').addEventListener('click', function () {
    tip.classList.remove('show'); tipOff = true;
    try { sessionStorage.setItem('pohlond-tip', '1'); } catch (e) {}
  });
  function fabVis() {
    var nearEnd = scrollY + innerHeight > document.documentElement.scrollHeight - 160;
    fabRow.classList.toggle('vis', (scrollY > innerHeight * 0.7 && !nearEnd) || panel.classList.contains('open'));
  }
  addEventListener('scroll', fabVis, { passive: true }); fabVis();
  addEventListener('scroll', function nudge() {
    if (scrollY < innerHeight * 1.2) return;
    removeEventListener('scroll', nudge);
    setTimeout(function () { if (!assist.started && !tipOff) { tip.classList.add('show'); setTimeout(function () { tip.classList.remove('show'); }, 8000); } }, 2500);
  }, { passive: true });
})();
