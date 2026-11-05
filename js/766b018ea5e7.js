
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
    this.mic = this.form.querySelector('.js-mic');
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
    if (this.mic) this.mic.addEventListener('click', function () { self.record(); });
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
  Chat.prototype.lock = function () { this.input.disabled = this.sendBtn.disabled = this.attach.disabled = true; if (this.mic && !this.rec) this.mic.disabled = true; this.attach.classList.remove('hot'); this.input.placeholder = T('Escriba aquí…'); };
  // Voice notes: recorded here, converted to 16 kHz mono WAV (what the transcriber always reads), one minute at most.
  async function toWav(blob) {
    var ac = new (window.AudioContext || window.webkitAudioContext)();
    var buf = await ac.decodeAudioData(await blob.arrayBuffer()); ac.close();
    var off = new OfflineAudioContext(1, Math.max(1, Math.ceil(buf.duration * 16000)), 16000);
    var src = off.createBufferSource(); src.buffer = buf; src.connect(off.destination); src.start();
    var pcm = (await off.startRendering()).getChannelData(0);
    var v = new DataView(new ArrayBuffer(44 + pcm.length * 2));
    var put = function (o, s) { for (var i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    put(0, 'RIFF'); v.setUint32(4, 36 + pcm.length * 2, true); put(8, 'WAVE'); put(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 16000, true);
    v.setUint32(28, 32000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); put(36, 'data'); v.setUint32(40, pcm.length * 2, true);
    for (var i = 0; i < pcm.length; i++) { var x = Math.max(-1, Math.min(1, pcm[i])); v.setInt16(44 + i * 2, x < 0 ? x * 0x8000 : x * 0x7fff, true); }
    return new Blob([v], { type: 'audio/wav' });
  }
  Chat.prototype.record = async function () {
    var self = this;
    if (this.rec) { this.rec.stop(); return; }
    var stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { this.el('msg bot', esc(T('El navegador no dejó usar el micrófono. Puede escribirme.'))); return; }
    var mr = new MediaRecorder(stream), parts = [], t0 = Date.now();
    this.rec = mr; this.mic.classList.add('rec'); this.mic.setAttribute('aria-label', T('Detener y enviar'));
    var tick = setInterval(function () { var s = Math.round((Date.now() - t0) / 1000); self.st.textContent = T('Grabando…') + ' 0:' + ('0' + s).slice(-2) + ' / 1:00'; }, 250);
    var limit = setTimeout(function () { if (mr.state === 'recording') mr.stop(); }, 60000);
    mr.ondataavailable = function (e) { if (e.data.size) parts.push(e.data); };
    mr.onstop = async function () {
      clearInterval(tick); clearTimeout(limit); stream.getTracks().forEach(function (t) { t.stop(); });
      self.rec = null; self.mic.classList.remove('rec'); self.mic.setAttribute('aria-label', T('Grabar nota de voz')); self.st.textContent = T('En línea');
      if (Date.now() - t0 < 700 || !self._voice) return;
      var wav;
      try { wav = await toWav(new Blob(parts, { type: mr.mimeType })); } catch (e) { self.el('msg bot', esc(T('No pude procesar el audio. Intente de nuevo o escríbame.'))); return; }
      var r = self._voice; self._voice = null; self.lock();
      wav.bubble = self.el('msg me', '🎤 ' + esc(T('Nota de voz')));
      r(wav);
    };
    mr.start();
  };
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

  // The live AI agent (Cloudflare Worker behind /api/asistente). The greeting and the first
  // buttons are fixed text, so they cost nothing; only real questions reach the model.
  var SES = 'pohlond-chat';
  function newSession() {
    var s = Array.prototype.map.call(crypto.getRandomValues(new Uint8Array(12)), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    try { localStorage.setItem(SES, s); } catch (e) {}
    return s;
  }
  function session() {
    var s; try { s = localStorage.getItem(SES); } catch (e) {}
    return s && /^[\w-]{12,40}$/.test(s) ? s : newSession();
  }
  // Waits for whatever the visitor sends next: typed text or a file (clip or the CV dropzone).
  function next(c) {
    if (c.cv && !c.cv.sent) { var f = c.cv; f.sent = true; c.fileMsg(f); return Promise.resolve(f); }
    c.input.disabled = c.sendBtn.disabled = c.attach.disabled = false; if (c.mic) c.mic.disabled = false; c.input.placeholder = T('Escriba aquí…');
    if (matchMedia('(hover:hover)').matches) c.input.focus({ preventScroll: true });
    return new Promise(function (res) {
      c._text = function (v) { c._file = c._voice = null; res(v); };
      c._file = function (f) { f.sent = true; c._text = c._voice = null; res(f); };
      c._voice = function (w) { c._text = c._file = null; res(w); };
    });
  }
  function chooseOrType(c, opts) {
    var box = c.el('opts', ''), done = false;
    return new Promise(function (res) {
      opts.forEach(function (o) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'opt'; b.textContent = o;
        b.onclick = function () { if (done) return; done = true; box.remove(); c._text = c._file = c._voice = null; c.lock(); c.me(o); res(o); };
        box.appendChild(b);
      });
      c.b.scrollTop = c.b.scrollHeight;
      next(c).then(function (v) { if (done) return; done = true; box.remove(); res(v); });
    });
  }
  async function converse(c, alive, section, first) {
    var send = first;
    for (;;) {
      var fd = new FormData();
      fd.append('sesion', session()); fd.append('seccion', section);
      fd.append('idioma', document.documentElement.lang === 'en' ? 'en' : 'es');
      if (send instanceof File) fd.append('archivo', send);
      else if (send instanceof Blob) fd.append('audio', send, 'nota.wav');
      else fd.append('texto', send);
      var t = c.el('typing', '<i></i><i></i><i></i>'); c.st.textContent = T('Escribiendo…');
      var j;
      try { var r = await fetch('/api/asistente', { method: 'POST', body: fd }); j = await r.json(); }
      catch (e) { j = { respuesta: T('No hubo conexión. Intente de nuevo o escríbanos al WhatsApp 8983 8585.') }; }
      t.remove(); c.st.textContent = T('En línea'); alive();
      // Show the visitor what the assistant understood from the voice note.
      if (send instanceof Blob && !(send instanceof File) && send.bubble && j.transcripcion) send.bubble.textContent = '🎤 «' + j.transcripcion + '»';
      var txt = j.error || j.respuesta || '';
      if (txt) c.el('msg bot', esc(txt).replace(/\n/g, '<br>'));
      if (j.whatsapp && j.whatsapp.mensaje) c.link(j.whatsapp.boton || T('Enviar por WhatsApp'), WA + encodeURIComponent(j.whatsapp.mensaje));
      send = await next(c); alive();
    }
  }

  // Recruiting agent
  async function recruitFlow(c, alive) {
    await c.say(T('¡Hola! Soy el asistente de reclutamiento de <b>Transportes Pohlond</b>.'));
    await c.say(T('Cuénteme un poco de usted o adjunte su currículum con el clip. Le hago unas preguntas y le dejo su ficha a Recursos Humanos.'));
    var first = await next(c); alive();
    await converse(c, alive, 'reclutamiento', first);
  }

  // General assistant (quotes, questions)
  async function assistFlow(c, alive) {
    await c.say(T('¡Hola! Soy el asistente virtual de <b>Transportes Pohlond</b>. ¿En qué le ayudo?'));
    var o = await chooseOrType(c, [T('Cotizar un transporte'), T('Trabajar como chofer'), T('Hablar con una persona')]); alive();
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
    await converse(c, alive, 'general', o === T('Cotizar un transporte') ? T('Quiero cotizar un transporte.') : o);
  }

  var recruit = new Chat(document.getElementById('recruit'), recruitFlow);
  recruit.root.querySelector('.js-restart').addEventListener('click', function () { recruit.cv = null; resetDrop(); newSession(); recruit.start(); });
  if ('IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { seen.disconnect(); if (!recruit.started) recruit.start(); } }, { threshold: 0.35 });
    seen.observe(recruit.root);
  } else recruit.start();

  // CV dropzone feeds the recruiting chat
  var drop = document.getElementById('drop'), cvInput = document.getElementById('cvFile'), dropFile = null;
  function resetDrop() { drop.classList.remove('ok'); dropFile = null; document.getElementById('dropT').textContent = T('Suba aquí su currículum'); document.getElementById('dropS').textContent = T('PDF, Word o foto. Arrástrelo o toque para elegirlo.'); }
  function dropOk(f) { document.getElementById('dropT').textContent = T('Recibido: {f}', { f: f.name }); document.getElementById('dropS').textContent = T('{s} · El asistente ya lo tiene.', { s: kb(f.size) }); }
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
