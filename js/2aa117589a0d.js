
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1SXP4LP19F');
(function(){
  function canal(u){ u = String(u || ''); return u.indexOf('wa.me/') > -1 ? 'whatsapp' : u.indexOf('tel:') === 0 ? 'telefono' : u.indexOf('mailto:') === 0 ? 'correo' : ''; }
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var c = canal(a.getAttribute('href')); if (c) gtag('event', 'contacto_' + c, { pagina: location.pathname });
  }, true);
  var abrir = window.open;
  window.open = function(u){ if (canal(u) === 'whatsapp') gtag('event', 'cotizacion_formulario', { pagina: location.pathname }); return abrir.apply(window, arguments); };
})();
