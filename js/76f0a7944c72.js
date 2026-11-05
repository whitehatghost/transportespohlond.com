
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1SXP4LP19F');
(function(){
  function canal(u){ u = String(u || ''); return u.indexOf('wa.me/') > -1 ? 'whatsapp' : u.indexOf('tel:') === 0 ? 'telefono' : u.indexOf('mailto:') === 0 ? 'correo' : ''; }
  // Every WhatsApp message says which page it came from, so Nina knows what the person was looking at.
  function conOrigen(u){
    try {
      var x = new URL(u, location.href); if (x.hostname.indexOf('wa.me') < 0) return u;
      var t = x.searchParams.get('text') || 'Hola, quiero información.';
      if (t.indexOf('[Vengo de') > -1) return u;
      var pag = (document.title.split(' · ')[0] || 'Inicio').trim();
      // encodeURIComponent, not searchParams.set: that one writes spaces as "+", which WhatsApp can show literally.
      return x.origin + x.pathname + '?text=' + encodeURIComponent(t + '\n\n[Vengo de la página: ' + pag + ']');
    } catch (e) { return u; }
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var c = canal(a.getAttribute('href')); if (c) gtag('event', 'contacto_' + c, { pagina: location.pathname });
    if (c === 'whatsapp') a.href = conOrigen(a.href);
  }, true);
  var abrir = window.open;
  window.open = function(u){ if (canal(u) === 'whatsapp') { gtag('event', 'cotizacion_formulario', { pagina: location.pathname }); arguments[0] = conOrigen(u); } return abrir.apply(window, arguments); };
})();
