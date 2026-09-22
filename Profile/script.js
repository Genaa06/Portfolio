/* ============================================================
   DOM + Event Listeners
   ملاحظة: كل قسم مكتوب عليه نوع الـ DOM أو الـ Event المستخدم
   ============================================================ */
(() => {
  'use strict';

  // DOM: اختصارات لـ querySelector و querySelectorAll
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const EMAIL = 'Genaaldajani@gmail.com';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // DOM: إنشاء عنصر جديد (createElement) وإضافته للصفحة (append)
  function toast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.append(el);
    setTimeout(() => el.remove(), 2600);
  }

  /* ---------- 1) الوضع الداكن / الفاتح ---------- */
  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  const themeLabel = $('#themeLabel');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const storeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const storeSet = (key, value) => { try { localStorage.setItem(key, value); } catch { /* التخزين غير متاح */ } };
  const currentTheme = () => root.dataset.theme || (darkQuery.matches ? 'dark' : 'light');   // DOM: dataset
  const paintThemeLabel = () => { themeLabel.textContent = currentTheme() === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'; };

  const savedTheme = storeGet('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  paintThemeLabel();

  // Event: click
  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    storeSet('theme', next);
    paintThemeLabel();
  });
  // Event: change (تغيّر إعداد الجهاز)
  darkQuery.addEventListener('change', paintThemeLabel);

  /* ---------- 2) قائمة الجوال ---------- */
  const menuBtn = $('#menuToggle');
  const nav = $('#mainNav');
  const setMenu = open => {
    nav.classList.toggle('open', open);                        // DOM: classList
    menuBtn.setAttribute('aria-expanded', String(open));       // DOM: setAttribute
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });   // Event delegation
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); }); // Event: keydown

  /* ---------- 3) ظل الهيدر عند التمرير ---------- */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });   // Event: scroll
  onScroll();

  /* ---------- 4) تمييز القسم الحالي في القائمة (IntersectionObserver) ---------- */
  const navLinks = $$('.main-nav a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.setAttribute('aria-current', a.hash === '#' + entry.target.id ? 'location' : 'false'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section[id]').forEach(section => spy.observe(section));

  

  /* ---------- 6) فلتر المهارات ---------- */
  const skillFilters = $('#skillFilters');
  const skillItems = $$('#skillList li');
  skillFilters.addEventListener('click', e => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    $$('button', skillFilters).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    skillItems.forEach(li => {
      li.hidden = btn.dataset.filter !== 'all' && li.dataset.cat !== btn.dataset.filter;   // DOM: hidden + dataset
    });
  });

  /* ---------- 7) فلتر المشاريع + عدّاد ---------- */
  const projectFilters = $('#projectFilters');
  const projects = $$('#projectGrid .project');
  const countEl = $('#projectCount');
  const countText = n => (n === 1 ? 'مشروع واحد' : n === 2 ? 'مشروعان' : `${n} مشاريع`);

  projectFilters.addEventListener('click', e => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    $$('button', projectFilters).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    let visible = 0;
    projects.forEach(card => {
      const show = btn.dataset.filter === 'all' || card.dataset.type === btn.dataset.filter;
      card.hidden = !show;
      if (show) visible++;
    });
    countEl.textContent = countText(visible);
  });

  /* ---------- 8) نافذة تفاصيل المشروع ---------- */
  const dlg = $('#projectDialog');
  $('#projectGrid').addEventListener('click', e => {
    const btn = e.target.closest('.details-btn');
    if (!btn) return;
    const card = btn.closest('article.project');       // DOM: traversal (closest)
    const img = $('img', card);
    $('#dlgTitle').textContent = $('h3', card).textContent;
    $('#dlgText').textContent = btn.dataset.details;
    $('#dlgImg').src = img.src;
    $('#dlgImg').alt = img.alt;
    // DOM: إنشاء عناصر li جديدة للتقنيات
    $('#dlgTags').replaceChildren(...$$('.tags li', card).map(li => {
      const item = document.createElement('li');
      item.textContent = li.textContent;
      return item;
    }));
    if (typeof dlg.showModal === 'function') dlg.showModal();
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });   // إغلاق بالضغط خارج النافذة

  /* ---------- 9) عدّاد المعدل التراكمي ---------- */
  const GPA = 4.89, GPA_MAX = 5, CIRC = 2 * Math.PI * 54;
  const gaugeArc = $('#gaugeArc');
  const gaugeNum = $('#gaugeNum');
  const setGauge = progress => {
    gaugeArc.style.strokeDashoffset = CIRC * (1 - (GPA / GPA_MAX) * progress);
    gaugeNum.textContent = (GPA * progress).toFixed(2);
  };
  if (!reduceMotion) {
    setGauge(0);
    new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const start = performance.now(), duration = 1200;
      const step = now => {
        const t = Math.min((now - start) / duration, 1);
        setGauge(1 - Math.pow(1 - t, 3));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 }).observe($('.gauge'));
  }

  /* ---------- 10) نسخ البريد ---------- */
  $('#copyEmail').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast('تم نسخ البريد الإلكتروني');
    } catch {
      toast('انسخ البريد يدويًا: ' + EMAIL);
    }
  });

  /* ---------- 11) (تم حذف نموذج التواصل) ---------- */

  /* ---------- 12) سنة الفوتر ---------- */
  const year = $('#year');
  year.textContent = new Date().getFullYear();
  year.dateTime = String(new Date().getFullYear());
})();
