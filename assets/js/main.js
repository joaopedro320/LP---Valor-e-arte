/* Valor e Arte | LP | QH4 Growth */
(function () {
  'use strict';
  var WA_NUMBER = '5511972899613';
  var WA_DEFAULT = 'Olá! Vim pelo site da Valor e Arte e gostaria de um orçamento.';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.dataLayer = window.dataLayer || [];
  function track(event, data) { var o = { event: event }; for (var k in data) o[k] = data[k]; window.dataLayer.push(o); }
  function waLink(text) { return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text); }

  /* Ano */
  var ano = document.getElementById('ano'); if (ano) ano.textContent = new Date().getFullYear();

  /* Links de WhatsApp com mensagem padrão + rastreamento */
  document.querySelectorAll('.js-wa').forEach(function (a) {
    a.href = waLink(a.getAttribute('data-wa-text') || WA_DEFAULT);
  });
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    var isWa = el.classList.contains('js-wa');
    track(isWa ? 'whatsapp_click' : 'cta_click', { cta_id: el.getAttribute('data-track') });
  });

  /* Hero: desenho das linhas + parallax leve */
  window.addEventListener('load', function () { document.body.classList.add('is-loaded'); });
  setTimeout(function () { document.body.classList.add('is-loaded'); }, 1200);
  var heroImg = document.querySelector('.hero__media img');
  var header = document.querySelector('.site-header');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (heroImg && !reduce && y < window.innerHeight * 1.2) {
      heroImg.style.transform = 'scale(1.08) translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* Scroll reveal */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) : null;
  document.querySelectorAll('.reveal, .slash').forEach(function (el) { io ? io.observe(el) : el.classList.add('is-in'); });

  /* Produtos: imagem fixa troca conforme item em foco */
  var produtos = document.querySelectorAll('.produto');
  var stage = document.querySelectorAll('.produtos__stage img');
  function setProduto(i) {
    produtos.forEach(function (p) { p.classList.toggle('is-active', p.dataset.index === String(i)); });
    stage.forEach(function (s) { s.classList.toggle('is-active', s.dataset.stage === String(i)); });
  }
  produtos.forEach(function (p) { p.addEventListener('mouseenter', function () { setProduto(p.dataset.index); }); });
  if ('IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setProduto(en.target.dataset.index); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    produtos.forEach(function (p) { pio.observe(p); });
  }

  /* Materiais: abas acessíveis */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) { panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering'); }
    });
    if (focus) tab.focus();
    track('material_tab_view', { material: tab.textContent.trim() });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* Processo: linha de progresso */
  var steps = document.getElementById('steps');
  if (steps && 'IntersectionObserver' in window) {
    var items = steps.querySelectorAll('.step');
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        steps.style.setProperty('--progress', 1);
        items.forEach(function (it, k) { setTimeout(function () { it.classList.add('is-on'); }, reduce ? 0 : 250 + k * 240); });
        sio.disconnect();
      });
    }, { threshold: 0.4 });
    sio.observe(steps);
  }

  /* Vídeo: toca só quando visível */
  var video = document.querySelector('.assin__video video');
  if (video && 'IntersectionObserver' in window && !reduce) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { video.preload = 'auto'; var p = video.play(); if (p && p.catch) p.catch(function () {}); }
        else video.pause();
      });
    }, { threshold: 0.35 }).observe(video);
  }

  /* Galeria: lightbox */
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var lastFocus = null;
  function closeLb() { lb.classList.remove('is-open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  document.querySelectorAll('#masonry button').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = b.querySelector('img');
      lastFocus = b; lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
      lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
      lb.querySelector('.lightbox__close').focus();
    });
  });
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLb(); });

  /* FAQ: um aberto por vez + evento */
  var details = document.querySelectorAll('.faq details');
  details.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      details.forEach(function (o) { if (o !== d) o.open = false; });
      track('faq_open', { question: d.querySelector('summary').textContent.trim() });
    });
  });

  /* Formulário: máscara, validação, envio para WhatsApp */
  var form = document.getElementById('lead-form');
  if (form) {
    var btn = form.querySelector('[type="submit"]');
    var tel = form.querySelector('#f-tel');
    var started = false;
    tel.addEventListener('input', function () {
      var d = tel.value.replace(/\D/g, '').slice(0, 11);
      var out = d;
      if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      if (d.length > 6) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length === 11 ? 7 : 6) + '-' + d.slice(d.length === 11 ? 7 : 6);
      tel.value = out;
    });
    function refresh() { btn.disabled = !form.checkValidity(); }
    form.addEventListener('input', function () {
      if (!started) { started = true; track('form_start', { form_id: 'orcamento' }); }
      refresh();
    });
    form.addEventListener('change', refresh);
    form.querySelectorAll('input[required], select[required]').forEach(function (f) {
      f.addEventListener('blur', function () {
        var wrap = f.closest('.field');
        if (wrap && f.type !== 'radio') wrap.classList.toggle('is-invalid', !f.checkValidity() && f.value !== '');
      });
    });
    refresh();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { refresh(); return; }
      var fd = new FormData(form);
      var lines = [
        'Olá! Acabei de preencher o formulário no site da Valor e Arte.',
        '',
        '*Nome:* ' + fd.get('nome'),
        '*WhatsApp:* ' + fd.get('whatsapp'),
        '*Local da obra:* ' + fd.get('cidade'),
        '*Perfil:* ' + fd.get('perfil'),
        '*Preciso de:* ' + fd.get('peca'),
        '*Fase da obra:* ' + fd.get('fase'),
        '*Material:* ' + (fd.get('material') || 'Quero orientação')
      ];
      var msg = (fd.get('mensagem') || '').trim();
      if (msg) lines.push('*Mensagem:* ' + msg);
      var text = lines.join('\n');
      track('generate_lead', { form_id: 'orcamento', perfil: fd.get('perfil'), peca: fd.get('peca'), fase: fd.get('fase') });
      try { sessionStorage.setItem('va_wa_text', text); } catch (err) {}
      window.location.href = 'obrigado.html?m=' + encodeURIComponent(text);
    });
  }
})();
