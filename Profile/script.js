/* ============================================================
   DOM + Event Listeners
   ============================================================ */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const storeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const storeSet = (key, value) => { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } };

  /* ---------- 1) Translations ---------- */
  const translations = {
    en: {
      skip_link: 'Skip to content',
      brand_name: 'Gena Alotaibi',
      brand_aria: 'Gena Alotaibi, home',
      nav_home: 'Home', nav_about: 'About', nav_skills: 'Skills', nav_projects: 'Projects',
      nav_certificates: 'Certificates', nav_education: 'Education', nav_contact: 'Contact',
      theme_dark: 'Dark mode', theme_light: 'Light mode', menu_btn: 'Menu',

      hero_badge: 'Cooperative training at Shafra Games',
      hero_greeting: "Hi, I'm Gena",
      hero_role: 'Web Developer & Programmer',
      hero_bio: 'Programming and Web Development diploma student in my final semester, currently completing my cooperative training and building practical projects in web development, programming, and game development.',
      hero_btn_projects: 'View My Projects',
      hero_btn_contact: 'Contact Me',
      hero_img_alt: 'Illustration of a laptop displaying lines of code and brackets',
      hero_img_caption: 'Web developer from Riyadh',

      about_title: 'About Me',
      about_p1: "I'm a Programming and Web Development diploma student currently in my final semester and completing my cooperative training.",
      about_p2: "I'm interested in web development, UI design, programming, and game development. I enjoy turning ideas into practical projects and continuously improving my technical skills through hands-on experience.",
      quickfacts_aria: 'Quick facts',
      quickfacts_title: 'Quick facts',
      fact_specialty_label: 'Specialty',
      fact_specialty_value: 'Programming & Web Development',
      fact_training_label: 'Training at',
      traits_title: 'Personal skills',
      trait_1: 'Fast learner', trait_2: 'Time management', trait_3: 'Team player', trait_4: 'Initiative',

      skills_title: 'Skills',
      skills_subtitle: 'Technologies and tools I work with, grouped by area.',
      skills_cat_web: 'Web Development', skills_cat_prog: 'Programming',
      skills_cat_game: 'Game Development', skills_cat_tools: 'Tools',

      projects_title: 'Projects',
      projects_subtitle: 'Websites and systems I designed and built during my studies and training.',
      proj_view: 'View Project',

      proj1_name: 'Usar',
      proj1_desc: 'A web platform that brings home-based productive businesses together in one place, helping them manage products, inventory, orders, sales, and invoices.',
      proj1_img_alt: 'Illustration of the Osra website interface: navigation bar, banner and cards for home-based businesses',
      proj2_desc: "A web platform for rating and reviewing video games, where users share reviews and see each game's average rating.",
      proj2_img_alt: 'Illustration of the Rategames website interface: a game controller and a review list with star ratings',
      proj3_name: 'Library Management System',
      proj3_desc: 'A web system for managing library books and records, built without a database.',
      proj3_img_alt: 'Illustration of the library management website interface: book shelves and a data list',
      proj4_name: 'Student Management System',
      proj4_desc: 'A web system for managing student records with full CRUD operations — add, delete, and edit.',
      proj4_img_alt: 'Illustration of a student records table with edit and delete buttons',

      certificates_title: 'Certificates',
      cert_view: 'View certificate',
      cert1_name: 'Database Programming with PL/SQL', cert1_issuer: 'Oracle Academy',
      cert2_name: 'IT Essentials', cert2_issuer: 'Cisco Networking Academy',
      cert3_name: 'C# & Unity (4 courses)', cert3_issuer: 'Satr — Tuwaiq Academy',
      cert4_name: 'Unity Robotics Simulation Camp', cert4_issuer: 'Google Developer Groups — Qassim',

      education_title: 'Education',
      edu_diploma: 'Diploma in Programming and Web Development',
      edu_college: 'Digital Technical College, Riyadh',
      gpa_label: 'GPA', gpa_of5: '/ 5',
      gpa_aria: 'GPA 4.89 out of 5',
      edu_status_label: 'Current status',
      edu_status_value: 'Final semester — cooperative training at Shafra Games',

      contact_title: "Let's work together",
      contact_subtitle: 'Have a project or opportunity? Feel free to contact me.',
      copy_email: 'Copy', copy_email_aria: 'Copy email address', copy_email_done: 'Email copied',

      footer_rights: '©', footer_name: 'Gena Alotaibi', footer_top: 'Back to top'
    },
    ar: {
      skip_link: 'تخطي إلى المحتوى',
      brand_name: 'غنى العتيبي',
      brand_aria: 'غنى العتيبي، الصفحة الرئيسية',
      nav_home: 'الرئيسية', nav_about: 'نبذة', nav_skills: 'المهارات', nav_projects: 'المشاريع',
      nav_certificates: 'الشهادات', nav_education: 'التعليم', nav_contact: 'تواصل',
      theme_dark: 'الوضع الداكن', theme_light: 'الوضع الفاتح', menu_btn: 'القائمة',

      hero_badge: 'تدريب تعاوني في Shafra Games',
      hero_greeting: 'مرحبًا، أنا غنى',
      hero_role: 'مطورة ويب وبرمجة',
      hero_bio: 'طالبة دبلوم في تقنية البرمجة وتطوير الويب في آخر فصل دراسي لي، حاليًا أخوض تدريبي التعاوني وأبني مشاريع عملية في تطوير الويب والبرمجة وتطوير الألعاب.',
      hero_btn_projects: 'استعرض مشاريعي',
      hero_btn_contact: 'تواصل معي',
      hero_img_alt: 'رسم توضيحي: لابتوب تظهر على شاشته أسطر من الكود وأقواس برمجة',
      hero_img_caption: 'مطورة ويب من الرياض',

      about_title: 'نبذة عني',
      about_p1: 'أنا طالبة دبلوم في تقنية البرمجة وتطوير الويب، حاليًا في آخر فصل دراسي وأتم تدريبي التعاوني.',
      about_p2: 'أهتم بتطوير الويب وتصميم واجهات المستخدم والبرمجة وتطوير الألعاب. أستمتع بتحويل الأفكار إلى مشاريع عملية، وأطوّر مهاراتي التقنية باستمرار من خلال التجربة العملية.',
      quickfacts_aria: 'معلومات سريعة',
      quickfacts_title: 'معلومات سريعة',
      fact_specialty_label: 'التخصص',
      fact_specialty_value: 'تقنية البرمجة وتطوير الويب',
      fact_training_label: 'جهة التدريب',
      traits_title: 'المهارات الشخصية',
      trait_1: 'سرعة التعلم', trait_2: 'إدارة الوقت', trait_3: 'العمل ضمن فريق', trait_4: 'المبادرة',

      skills_title: 'المهارات',
      skills_subtitle: 'التقنيات والأدوات اللي أشتغل فيها، مقسّمة حسب المجال.',
      skills_cat_web: 'تطوير الويب', skills_cat_prog: 'البرمجة',
      skills_cat_game: 'تطوير الألعاب', skills_cat_tools: 'أدوات',

      projects_title: 'المشاريع',
      projects_subtitle: 'مواقع وأنظمة صممتها وطورتها خلال دراستي وتدريبي.',
      proj_view: 'زيارة الموقع',

      proj1_name: 'أُسَر',
      proj1_desc: 'منصة ويب تجمع الأسر المنتجة في مكان واحد، وتساعدها على إدارة منتجاتها ومخزونها وطلباتها ومبيعاتها وفواتيرها.',
      proj1_img_alt: 'رسم توضيحي لواجهة موقع أُسَر: شريط تنقل وبانر وبطاقات للأسر المنتجة',
      proj2_desc: 'منصة ويب لتقييم الألعاب ومراجعتها، يشارك فيها المستخدمون آرائهم ويشوفون متوسط تقييم كل لعبة.',
      proj2_img_alt: 'رسم توضيحي لواجهة موقع Rategames: يد ألعاب وقائمة مراجعات بنجوم التقييم',
      proj3_name: 'نظام إدارة مكتبة',
      proj3_desc: 'نظام ويب لإدارة كتب وسجلات المكتبة، مبني بدون قاعدة بيانات.',
      proj3_img_alt: 'رسم توضيحي لواجهة موقع إدارة المكتبة: رفوف كتب وقائمة بيانات',
      proj4_name: 'نظام إدارة بيانات الطلاب',
      proj4_desc: 'نظام ويب لإدارة سجلات الطلاب بعمليات إدخال كاملة: إضافة وحذف وتعديل.',
      proj4_img_alt: 'رسم توضيحي لجدول بيانات الطلاب مع أزرار التعديل والحذف',

      certificates_title: 'الشهادات',
      cert_view: 'عرض الشهادة',
      cert1_name: 'برمجة قواعد البيانات PL/SQL', cert1_issuer: 'أكاديمية Oracle',
      cert2_name: 'أساسيات تقنية المعلومات', cert2_issuer: 'أكاديمية سيسكو للشبكات',
      cert3_name: 'C# و Unity (4 دورات)', cert3_issuer: 'سطر — أكاديمية طويق',
      cert4_name: 'معسكر محاكاة الروبوتات بـ Unity', cert4_issuer: 'Google Developer Groups — القصيم',

      education_title: 'التعليم',
      edu_diploma: 'دبلوم تقنية البرمجة وتطوير الويب',
      edu_college: 'الكلية التقنية الرقمية، الرياض',
      gpa_label: 'المعدل التراكمي', gpa_of5: '/ 5',
      gpa_aria: 'المعدل التراكمي 4.89 من 5',
      edu_status_label: 'الحالة الحالية',
      edu_status_value: 'الفصل الأخير — تدريب تعاوني في Shafra Games',

      contact_title: 'لنعمل معًا',
      contact_subtitle: 'عندك مشروع أو فرصة عمل؟ لا تتردد بالتواصل معي.',
      copy_email: 'نسخ', copy_email_aria: 'نسخ البريد الإلكتروني', copy_email_done: 'تم نسخ البريد',

      footer_rights: '©', footer_name: 'غنى العتيبي', footer_top: 'العودة للأعلى'
    }
  };

  /* ---------- 2) Apply language ---------- */
  const langBtn = $('#langToggle');
  const langLabel = $('#langLabel');

  function applyLanguage(lang) {
    const dict = translations[lang];
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    html.dataset.lang = lang;

    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    $$('[data-i18n-alt]').forEach(el => {
      const key = el.dataset.i18nAlt;
      if (dict[key] !== undefined) el.setAttribute('alt', dict[key]);
    });
    $$('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    // theme label keeps reflecting current theme after language switch
    paintThemeLabel();
    langLabel.textContent = lang === 'ar' ? 'English' : 'العربية';
    document.title = lang === 'ar' ? 'غنى العتيبي | مطورة ويب' : 'Gena Alotaibi | Web Developer';
    storeSet('lang', lang);
  }

  langBtn.addEventListener('click', () => {
    const next = html.dataset.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(next);
  });

  /* ---------- 3) Theme (dark / light) ---------- */
  const themeBtn = $('#themeToggle');
  const themeLabel = $('#themeLabel');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const currentTheme = () => html.dataset.theme || (darkQuery.matches ? 'dark' : 'light');
  function paintThemeLabel() {
    const lang = html.dataset.lang || 'en';
    themeLabel.textContent = currentTheme() === 'dark' ? translations[lang].theme_light : translations[lang].theme_dark;
  }

  const savedTheme = storeGet('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') html.dataset.theme = savedTheme;

  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    storeSet('theme', next);
    paintThemeLabel();
  });
  darkQuery.addEventListener('change', paintThemeLabel);

  /* ---------- 4) Init language (saved > browser > default en) ---------- */
  const savedLang = storeGet('lang');
  const browserLang = (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
  applyLanguage(savedLang === 'ar' || savedLang === 'en' ? savedLang : browserLang);

  /* ---------- 5) Mobile menu ---------- */
  const menuBtn = $('#menuToggle');
  const nav = $('#mainNav');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- 6) Header shadow on scroll ---------- */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 7) Scrollspy ---------- */
  const navLinks = $$('.main-nav a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.setAttribute('aria-current', a.hash === '#' + entry.target.id ? 'location' : 'false'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section[id]').forEach(section => spy.observe(section));

  /* ---------- 8) GPA gauge animation ---------- */
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
  } else {
    setGauge(1);
  }

  /* ---------- 10) Footer year ---------- */
  const year = $('#year');
  year.textContent = new Date().getFullYear();
  year.dateTime = String(new Date().getFullYear());

  /* ---------- 11) Scroll progress bar ---------- */
  const progressBar = $('#scrollProgressBar');
  const paintProgress = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  };
  window.addEventListener('scroll', paintProgress, { passive: true });
  window.addEventListener('resize', paintProgress);
  paintProgress();

  /* ---------- 12) Reveal-on-scroll for cards and section heads ---------- */
  if (!reduceMotion) {
    const revealGroups = $$('.skills-grid, .project-grid, .cert-grid');
    revealGroups.forEach(group => {
      $$(':scope > *', group).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
      });
    });
    $$('.section-head, .about-grid > *, .edu-grid > *').forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => revealObserver.observe(el));
  }

  /* ---------- 13) Card spotlight (follows pointer) ---------- */
  const spotlightHosts = $$('.skill-card, .cert-card, .panel');
  const pointerFine = window.matchMedia('(pointer: fine)').matches;
  if (pointerFine) {
    spotlightHosts.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ---------- 14) Hero avatar tilt (desktop only, follows pointer) ---------- */
  const frame = $('.frame');
  const frameInner = $('.frame-inner');
  if (frame && frameInner && pointerFine && !reduceMotion) {
    frame.addEventListener('mousemove', e => {
      const rect = frame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      frameInner.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${py * -8}deg)`;
    });
    frame.addEventListener('mouseleave', () => { frameInner.style.transform = ''; });
  }

  /* ---------- 15) Button ripple on click ---------- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  /* ---------- 16) Toast helper ---------- */
  const toastEl = $('#toast');
  let toastTimer = null;
  function showToast(message) {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => { toastEl.hidden = true; }, 220);
    }, 2200);
  }

  /* ---------- 17) Copy email ---------- */
  const copyBtn = $('#copyEmailBtn');
  const EMAIL = 'Genaaldajani@gmail.com';
  copyBtn.addEventListener('click', async () => {
    const lang = html.dataset.lang || 'en';
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast(translations[lang].copy_email_done);
    } catch {
      showToast(EMAIL);
    }
  });
})();
