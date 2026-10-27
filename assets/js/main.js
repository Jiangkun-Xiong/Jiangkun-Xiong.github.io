(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const config = window.SITE_CONFIG || {};
  const configScript = $('[data-site-config]');
  const base = configScript ? new URL('../../', configScript.src) : new URL('./', location.href);
  const languageToggle = $('#language-toggle');
  const menuToggle = $('#menu-toggle');
  const nav = $('#primary-nav');
  let lang = 'en';
  let category = 'all';
  try {
    const saved = localStorage.getItem('jx-language');
    if (saved === 'en' || saved === 'zh') lang = saved;
  } catch (_) { /* Storage is optional, including for local-file previews. */ }

  function closeMenu(returnFocus = false) {
    if (!nav || !menuToggle) return;
    const wasOpen = nav.classList.contains('open');
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (wasOpen && returnFocus) menuToggle.focus();
  }

  function filterProjects() {
    const list = $('[data-project-list]');
    if (!list) return;
    const query = ($('#project-search')?.value || '').trim().toLocaleLowerCase();
    let count = 0;
    $$('[data-category]', list).forEach(card => {
      const visible = (category === 'all' || card.dataset.category === category)
        && (card.dataset.search || '').toLocaleLowerCase().includes(query);
      card.hidden = !visible;
      if (visible) count++;
    });
    $('#no-results').hidden = count > 0;
    $('#result-count').textContent = lang === 'zh' ? `${count} 个项目` : `${count} ${count === 1 ? 'project' : 'projects'}`;
  }

  function setLanguage(next) {
    lang = next;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    $$('[data-en][data-zh]').forEach(el => { el.textContent = el.dataset[lang]; });
    $$('[data-aria-en]').forEach(el => { el.setAttribute('aria-label', lang === 'zh' ? el.dataset.ariaZh : el.dataset.ariaEn); });
    $$('[data-placeholder-en]').forEach(el => { el.placeholder = lang === 'zh' ? el.dataset.placeholderZh : el.dataset.placeholderEn; });
    if (languageToggle) {
      languageToggle.textContent = lang === 'zh' ? 'EN' : '中文';
      languageToggle.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换为中文');
    }
    document.title = (lang === 'zh' ? document.body.dataset.titleZh : document.body.dataset.titleEn) + ' | Jiangkun Xiong';
    try { localStorage.setItem('jx-language', lang); } catch (_) { /* Optional. */ }
    filterProjects();
  }

  function checkedUrl(value, allowLocal = false) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value.trim(), allowLocal ? base : undefined);
      if (url.protocol === 'https:' || (allowLocal && (url.protocol === 'file:' || (url.protocol === 'http:' && url.origin === base.origin)))) return url.href;
    } catch (_) { /* Leave invalid or empty links hidden. */ }
    return '';
  }

  function enableLink(el, url, external = true) {
    if (!url) return;
    el.href = url;
    el.hidden = false;
    if (external) {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
  }

  const profileUrl = config.githubUsername && /^[A-Za-z0-9-]+$/.test(config.githubUsername)
    ? `https://github.com/${config.githubUsername}` : '';
  $$('[data-config-link]').forEach(el => {
    const key = el.dataset.configLink;
    if (key === 'github') enableLink(el, profileUrl);
    if (key === 'cv') enableLink(el, checkedUrl(config.cvFile, true));
    if (key === 'portfolio') enableLink(el, checkedUrl(config.portfolioFile, true));
    if (key === 'email' && typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
      enableLink(el, 'mailto:' + config.email, false);
    }
  });
  $$('[data-repo]').forEach(el => enableLink(el, checkedUrl(config.projects?.[el.dataset.repo]?.repository)));
  $$('[data-project-site]').forEach(el => enableLink(el, checkedUrl(config.projects?.[el.dataset.projectSite]?.website)));
  $$('[data-portrait]').forEach(el => {
    const url = checkedUrl(config.portraitFile, true);
    if (url) { el.src = url; el.hidden = false; }
  });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  $$('[data-updated]').forEach(el => { el.textContent = config.lastUpdated || '2026-10'; });

  languageToggle?.addEventListener('click', () => setLanguage(lang === 'en' ? 'zh' : 'en'));
  menuToggle?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 781px)').addEventListener?.('change', event => { if (event.matches) closeMenu(); });
  $$('.filter').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    $$('.filter').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterProjects();
  }));
  $('#project-search')?.addEventListener('input', filterProjects);

  // Decorative stars. Draw once; the SVG respects reduced-motion in CSS.
  const canvas = $('#star-canvas');
  const ctx = canvas?.getContext('2d');
  if (ctx) {
    function drawStars() {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      let seed = 97;
      const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
      for (let i = 0; i < 85; i++) {
        const x = random() * width, y = random() * height, r = .4 + random() * .7;
        ctx.globalAlpha = .15 + random() * .45; ctx.fillStyle = '#d3e5db';
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    drawStars();
    window.addEventListener('resize', drawStars, { passive: true });
  }
  setLanguage(lang);
})();
