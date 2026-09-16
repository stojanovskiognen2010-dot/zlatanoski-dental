/* Zlatanoski Dental — page behaviour. No dependencies. */
(() => {
  'use strict';
  window.__zd = true;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const PHONE = '+38970391114';
  const EMAIL = 'pzuzlatanoski@yahoo.com';
  const MAP_EMBED = 'https://maps.google.com/maps?q=Zlatanoski%20Dental%2C%20Ohrid&ll=41.1179907,20.8015811&z=17&output=embed';

  /* ------------------------------------------------------------------ i18n */
  // Macedonian lives in the HTML; English replaces it by key.
  const EN = {
    'skip': 'Skip to content',
    'brand.home': 'Zlatanoski Dental — back to top',
    'nav.label': 'Main navigation',
    'nav.about': 'About',
    'nav.results': 'Results',
    'nav.services': 'Services',
    'nav.doctor': 'Doctor',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'lang.label': 'Language',
    'menu.label': 'Menu',
    'cta.book': 'Book an appointment',

    'hero.title': 'Dedicated to healthy smiles for all ages',
    'hero.lead': 'Oral surgery and dentistry in the heart of Ohrid.',
    'hero.proof': '5.0 on Google · 100% recommend on Facebook',
    'hero.coords': 'Ohrid · 41.118° N · 20.802° E',
    'hero.cardAlt': 'A patient’s smile after treatment at the practice',
    'hero.cardBtn': 'See the before and after results',
    'hero.cardCap': 'A result from our practice',

    'about.statement': 'For more than 10 years we have been giving our patients their smiles back — with a steady hand, honest advice and a lot of care.',
    'reasons.title': 'Why patients keep coming back',
    'reasons.1.t': 'Oral surgery specialist',
    'reasons.1.d': 'Surgical procedures, from wisdom teeth to implants, are carried out by a specialist in oral surgery.',
    'reasons.2.t': 'Over 10 years of experience',
    'reasons.2.d': 'For more than a decade we have cared for the smiles of Ohrid locals and visitors to the city.',
    'reasons.3.t': 'Health Insurance Fund contract',
    'reasons.3.d': 'We are contracted with the national Health Insurance Fund for specialist oral surgery care.',
    'reasons.4.t': 'For all generations',
    'reasons.4.d': 'Healthy smiles at every age — for children, parents and grandparents.',
    'reasons.5.t': 'Results you can see',
    'reasons.5.d': 'Look at our patients’ smiles before and after treatment.',
    'reasons.6.t': 'Morning or evening visits',
    'reasons.6.d': 'We are open 9–14 and 17–20, so you can find a time even after work.',

    'welcome.label': 'Welcome',
    'welcome.a': 'Welcome to',
    'welcome.name': 'Zlatanoski Dental.',
    'welcome.sub': 'Book an appointment and take the first step towards a healthy smile.',

    'results.title': 'Before and after — the results speak for themselves.',
    'results.sub': 'Smiles of patients from our practice.',
    'results.track': 'Before and after results',
    'results.before': 'Before',
    'results.after': 'After',
    'results.c1': 'Replacing missing teeth',
    'results.c2': 'Cosmetic restoration',
    'results.c3': 'Closing a gap',
    'results.c4': 'Restoring broken teeth',
    'results.c5': 'Full-mouth rehabilitation',
    'results.c6': 'Restoring a damaged tooth',
    'results.alt1': 'Top: missing front teeth. Bottom: a complete smile after treatment.',
    'results.alt2': 'Top: broken, discoloured front teeth. Bottom: bright, natural teeth after treatment.',
    'results.alt3': 'Top: a gap where front teeth were missing. Bottom: the gap closed and a full smile.',
    'results.alt4': 'Top: broken front teeth. Bottom: restored teeth after treatment.',
    'results.alt5': 'Top: badly damaged and missing teeth. Bottom: new upper and lower teeth.',
    'results.alt6': 'Top: a broken front tooth. Bottom: the tooth restored after treatment.',
    'results.prev': 'Previous result',
    'results.next': 'Next result',

    'services.title': 'Services',
    'svc.1.t': 'Oral surgery',
    'svc.1.d': 'Surgical procedures in the mouth, performed by a specialist — precisely and under local anaesthesia.',
    'svc.2.t': 'Dental implants',
    'svc.2.d': 'A lasting replacement for a lost tooth that looks and works like a natural one.',
    'svc.3.t': 'Prosthetics',
    'svc.3.d': 'Crowns, bridges and dentures for a complete, comfortable smile.',
    'svc.4.t': 'Cosmetic dentistry',
    'svc.4.d': 'Restoring broken and discoloured teeth for a natural, bright smile.',
    'svc.5.t': 'Fillings & root canals',
    'svc.5.d': 'Treating decay and saving the natural tooth.',
    'svc.6.t': 'Tooth & wisdom tooth removal',
    'svc.6.d': 'Including impacted wisdom teeth.',
    'svc.7.t': 'Visit with a referral',
    'svc.7.d': 'Specialist oral surgery care through the Health Insurance Fund.',

    'doctor.title': 'The doctor behind the smiles',
    'doctor.lead': 'A small practice where every patient knows their doctor.',
    'doctor.name': 'Dr. Goran Zlatanoski',
    'doctor.role': 'Oral surgery specialist',
    'doctor.text': 'Dr. Goran has run the practice in Ohrid for more than a decade. Patients have come back to him for years — for small treatments and for completely new smiles.',
    'stats.years': 'years in Ohrid',
    'stats.ratingValue': '5.0',
    'stats.rating': 'Google rating',
    'stats.fb': 'recommend on Facebook',

    'faq.title': 'Before you come — answers to common questions.',
    'faq.1.q': 'How do I book an appointment?',
    'faq.1.a': 'Call <a href="tel:+38970391114">070 391 114</a> during opening hours, email <a href="mailto:pzuzlatanoski@yahoo.com">pzuzlatanoski@yahoo.com</a>, or send a request with the “Book an appointment” button. We will contact you to confirm the time.',
    'faq.2.q': 'Can I come with a referral?',
    'faq.2.a': 'Yes. The practice has a contract with the Health Insurance Fund for specialist oral surgery care. Call us before your visit to check what your referral covers.',
    'faq.3.q': 'Does wisdom tooth removal hurt?',
    'faq.3.a': 'The procedure is done under local anaesthesia, so you should not feel pain during it. Afterwards you will get instructions for an easier recovery.',
    'faq.4.q': 'Do you see children?',
    'faq.4.a': 'Yes — we are dedicated to healthy smiles for all ages, from the youngest to the oldest patients.',
    'faq.5.q': 'What should I do if I have severe pain or swelling?',
    'faq.5.a': 'Call us right away on <a href="tel:+38970391114">070 391 114</a> and describe your symptoms — we will tell you when to come in.',
    'faq.6.q': 'What are your opening hours?',
    'faq.6.a': 'Monday to Friday, 09:00–14:00 and 17:00–20:00. We are closed on Saturdays and Sundays.',

    'contact.title': 'You’ll find us easily.',
    'map.label': '2 Dejan Vojvoda St, Ohrid',
    'map.load': 'Show the map',
    'map.note': 'The map loads from Google Maps.',
    'contact.lead': 'In the centre of Ohrid, at 2 Dejan Vojvoda Street.',
    'contact.phoneLabel': 'Phone',
    'contact.emailLabel': 'Email',
    'contact.hoursLabel': 'Opening hours',
    'hours.week': 'Monday – Friday',
    'hours.weekend': 'Saturday & Sunday',
    'hours.closed': 'Closed',
    'contact.directions': 'Directions to the practice',
    'contact.call': 'Call us',

    'footer.intro': 'Zlatanoski specialist oral surgery practice — dedicated to healthy smiles for all ages.',
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.addressText': '2 Dejan Vojvoda St<br>6000 Ohrid, North Macedonia',
    'footer.hours': 'Opening hours',
    'footer.hoursText': 'Mon – Fri: 9–14 and 17–20<br>Saturday & Sunday: closed',
    'footer.follow': 'Follow us',
    'footer.top': 'Back to top ↑',

    'book.title': 'Book an appointment',
    'book.close': 'Close',
    'book.lead': 'Send us a request and we will contact you to confirm the time.',
    'book.call': 'Fastest by phone:',
    'book.name': 'Full name',
    'book.phone': 'Phone',
    'book.service': 'Service',
    'opt.checkup': 'Check-up & consultation',
    'opt.other': 'Other',
    'book.when': 'When suits you?',
    'book.morning': 'Morning (9–14)',
    'book.evening': 'Evening (17–20)',
    'book.any': 'Any time',
    'book.msg': 'Message (optional)',
    'book.sms': 'Send SMS',
    'book.email': 'Send email',
    'book.note': 'The request is sent from your own phone or email. This page does not store any data.',
  };

  // strings built in code, in both languages
  const TEXT = {
    mk: {
      'meta.title': 'Златаноски Дентал — орална хирургија и стоматологија во Охрид',
      'menu.open': 'Отвори мени',
      'menu.close': 'Затвори мени',
      'cta.bookFor': 'Закажи',
      'status.open': 'Отворено сега · до {t}',
      'status.today': 'Затворено · отвораме денес во {t}',
      'status.tomorrow': 'Затворено · отвораме утре во {t}',
      'status.monday': 'Затворено · отвораме во понеделник во {t}',
      'map.title': 'Мапа: Златаноски Дентал, Дејан Војвода 2, Охрид',
      'book.error': 'Внесете име и телефонски број за да може да ве контактираме.',
      'book.subject': 'Барање за термин',
      'book.l.name': 'Име',
      'book.l.phone': 'Телефон',
      'book.l.service': 'Услуга',
      'book.l.when': 'Време',
      'book.l.msg': 'Порака',
      'book.sentSms': 'Се отвора апликацијата за пораки. Ако не се отвори, јавете ни се на 070 391 114.',
      'book.sentEmail': 'Се отвора вашиот e-mail. Ако не се отвори, пишете ни на pzuzlatanoski@yahoo.com.',
    },
    en: {
      'meta.title': 'Zlatanoski Dental — oral surgery & dentistry in Ohrid',
      'menu.open': 'Open menu',
      'menu.close': 'Close menu',
      'cta.bookFor': 'Book',
      'status.open': 'Open now · until {t}',
      'status.today': 'Closed · opens today at {t}',
      'status.tomorrow': 'Closed · opens tomorrow at {t}',
      'status.monday': 'Closed · opens Monday at {t}',
      'map.title': 'Map: Zlatanoski Dental, 2 Dejan Vojvoda St, Ohrid',
      'book.error': 'Please enter your name and phone number so we can contact you.',
      'book.subject': 'Appointment request',
      'book.l.name': 'Name',
      'book.l.phone': 'Phone',
      'book.l.service': 'Service',
      'book.l.when': 'Time',
      'book.l.msg': 'Message',
      'book.sentSms': 'Your messages app is opening. If it doesn’t, call us on 070 391 114.',
      'book.sentEmail': 'Your email app is opening. If it doesn’t, write to pzuzlatanoski@yahoo.com.',
    },
  };

  let lang = 'mk';
  const t = (key) => TEXT[lang][key] || TEXT.mk[key] || key;
  const originals = new Map();

  function captureOriginals() {
    $$('[data-i18n]').forEach((el) => originals.set(el, { html: el.innerHTML, attrs: {} }));
    $$('[data-i18n-attr]').forEach((el) => {
      const entry = originals.get(el) || { attrs: {} };
      el.dataset.i18nAttr.split('|').forEach((pair) => {
        const attr = pair.split(':')[0];
        entry.attrs[attr] = el.getAttribute(attr);
      });
      originals.set(el, entry);
    });
  }

  function applyLanguage(next) {
    lang = next === 'en' ? 'en' : 'mk';
    const en = lang === 'en';
    document.documentElement.lang = lang;
    document.title = t('meta.title');

    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = en && EN[key] !== undefined ? EN[key] : originals.get(el).html;
    });
    $$('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split('|').forEach((pair) => {
        const [attr, key] = pair.split(':');
        const value = en && EN[key] !== undefined ? EN[key] : originals.get(el).attrs[attr];
        if (value != null) el.setAttribute(attr, value);
      });
    });
    $$('[data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));

    splitWords();
    labelBookButtons();
    updateMenuLabel();
    updateStatus();
    updateNav();
    try { localStorage.setItem('zd-lang', lang); } catch (e) { /* storage blocked */ }
  }

  /* --------------------------------------------- statement lit word by word */
  function splitWords() {
    $$('[data-words]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'w';
        span.textContent = word;
        el.append(span);
        if (i < words.length - 1) el.append(' ');
      });
    });
    lightWords();
  }

  function lightWords() {
    $$('[data-words]').forEach((el) => {
      const words = el.querySelectorAll('.w');
      if (reducedMotion.matches) { words.forEach((w) => w.classList.add('is-lit')); return; }
      const rect = el.getBoundingClientRect();
      const start = innerHeight * 0.85;   // first word lights when the text top reaches here
      const end = innerHeight * 0.45;     // last word lights when the text bottom reaches here
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    });
  }

  /* -------------------------------------------------- header nav progress */
  const navLinks = $$('[data-nav] a');
  const navTargets = navLinks.map((a) => document.getElementById(a.hash.slice(1)));
  const navBar = $('.nav__bar');

  function updateNav() {
    const line = innerHeight * 0.4;
    let current = -1;
    navTargets.forEach((section, i) => { if (section && section.getBoundingClientRect().top <= line) current = i; });
    navLinks.forEach((a, i) => { if (i === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (!navBar) return;
    const active = navLinks[current];
    if (!active || !active.offsetParent) { navBar.style.width = '0px'; return; }
    const listLeft = navBar.parentElement.getBoundingClientRect().left;
    navBar.style.width = `${active.getBoundingClientRect().right - listLeft}px`;
  }

  /* ------------------------------------------------------------ phone menu */
  const menuBtn = $('[data-menu]');
  const mnav = $('[data-mnav]');

  function updateMenuLabel() {
    const label = $('[data-menu-label]');
    if (label && menuBtn) label.textContent = t(menuBtn.getAttribute('aria-expanded') === 'true' ? 'menu.close' : 'menu.open');
  }
  function openMenu() {
    mnav.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-open');
    updateMenuLabel();
  }
  function closeMenu() {
    if (!mnav || mnav.hidden) return;
    mnav.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-open');
    updateMenuLabel();
  }
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', () => (mnav.hidden ? openMenu() : closeMenu()));
    $$('a', mnav).forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mnav.hidden) { closeMenu(); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 1181px)').addEventListener('change', (e) => { if (e.matches) closeMenu(); });
  }

  /* ------------------------------------------------------- reveal on scroll */
  function setupReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------- contour lines (Lake Ohrid depth map feel) */
  function seeded(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let x = Math.imul(a ^ (a >>> 15), 1 | a);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawContours(svg) {
    const W = 1000;
    const H = Number(svg.dataset.h || 1000);
    const rand = seeded(Number(svg.dataset.seed || 1));
    const rings = Number(svg.dataset.rings || 20);
    const cx = W * Number(svg.dataset.cx || 0.5);
    const cy = H * Number(svg.dataset.cy || 0.5);
    const squeeze = 0.72; // the lake is taller than it is wide
    // the same wave shape for every ring (drifting a little) keeps rings from crossing
    const waves = [2, 3, 4, 6].map((k) => ({
      k,
      amp: ((0.04 + rand() * 0.06) * (k === 2 ? 1.6 : 1)) / Math.sqrt(k - 1),
      phase: rand() * Math.PI * 2,
      drift: (rand() - 0.5) * 0.06,
    }));
    const reach = Math.hypot(Math.max(cx, W - cx) / squeeze, Math.max(cy, H - cy)) * 1.08;
    const step = reach / rings;
    const n = 56;
    const f = (v) => v.toFixed(1);
    let d = '';
    for (let i = 1; i <= rings; i++) {
      const r = step * (i - 0.4);
      const pts = [];
      for (let j = 0; j < n; j++) {
        const th = (j / n) * Math.PI * 2;
        let wobble = 0;
        waves.forEach((w) => { wobble += w.amp * Math.sin(w.k * th + w.phase + w.drift * i); });
        pts.push([cx + Math.cos(th) * r * (1 + wobble) * squeeze, cy + Math.sin(th) * r * (1 + wobble)]);
      }
      // smooth closed curve: quadratic segments through the midpoints
      const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      const m0 = mid(pts[n - 1], pts[0]);
      d += `M${f(m0[0])} ${f(m0[1])}`;
      for (let j = 0; j < n; j++) {
        const m = mid(pts[j], pts[(j + 1) % n]);
        d += `Q${f(pts[j][0])} ${f(pts[j][1])} ${f(m[0])} ${f(m[1])}`;
      }
      d += 'Z';
    }
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('focusable', 'false');
    const ns = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(ns, 'g');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    g.append(path);
    svg.replaceChildren(g);
  }

  /* ------------------------------------------------------- results carousel */
  const track = $('[data-track]');
  const prevBtn = $('[data-prev]');
  const nextBtn = $('[data-next]');
  const counter = $('[data-count]');

  function cardStep() {
    const card = track.querySelector('.case');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  }
  function updateCounter() {
    if (!track) return;
    const total = track.querySelectorAll('.case').length;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    const index = atEnd ? total - 1 : Math.round(track.scrollLeft / cardStep());
    const pad = (v) => String(v).padStart(2, '0');
    counter.textContent = `${pad(index + 1)} / ${pad(total)}`;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = atEnd;
  }
  if (track) {
    const go = (dir) => track.scrollBy({ left: dir * cardStep(), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    prevBtn.addEventListener('click', () => go(-1));
    nextBtn.addEventListener('click', () => go(1));
    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; updateCounter(); });
    }, { passive: true });
  }

  /* ------------------------------------------------------ opening status */
  const OPEN_SLOTS = [[9 * 60, 14 * 60], [17 * 60, 20 * 60]]; // Monday–Friday

  function skopjeNow() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Skopje', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date());
    const get = (type) => (parts.find((p) => p.type === type) || {}).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
  }
  const clock = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

  function updateStatus() {
    const el = $('[data-status]');
    const { day, minutes } = skopjeNow();
    const weekday = day >= 1 && day <= 5;

    $$('[data-days]').forEach((cell) => {
      cell.classList.toggle('is-today', cell.dataset.days === (weekday ? '1-5' : '6-0'));
    });
    if (!el) return;

    let text;
    let open = false;
    if (weekday) {
      const slot = OPEN_SLOTS.find(([from, to]) => minutes >= from && minutes < to);
      const later = OPEN_SLOTS.find(([from]) => minutes < from);
      if (slot) { open = true; text = t('status.open').replace('{t}', clock(slot[1])); }
      else if (later) text = t('status.today').replace('{t}', clock(later[0]));
    }
    if (!text) {
      // after Friday evening or at the weekend the next opening is Monday morning
      const mondayNext = day === 5 || day === 6;
      text = t(mondayNext ? 'status.monday' : 'status.tomorrow').replace('{t}', clock(OPEN_SLOTS[0][0]));
    }
    el.textContent = text;
    el.classList.toggle('is-open', open);
  }

  /* ------------------------------------------------------- booking dialog */
  const dialog = $('#book');
  const form = $('[data-book-form]');
  const errorBox = $('[data-book-error]');
  const sentBox = $('[data-book-sent]');

  function labelBookButtons() {
    $$('[data-book]').forEach((btn) => {
      const holder = btn.closest('.svc, .svc-row');
      const title = holder && holder.querySelector('h3');
      if (title) btn.setAttribute('aria-label', `${t('cta.bookFor')}: ${title.textContent.trim()}`);
    });
  }

  function openBooking(service) {
    if (!dialog) return;
    closeMenu();
    if (service && form.elements.service.querySelector(`option[value="${service}"]`)) form.elements.service.value = service;
    errorBox.hidden = true;
    sentBox.hidden = true;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }
  function closeBooking() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  if (dialog && form) {
    let opener = null;
    $$('[data-book]').forEach((btn) => btn.addEventListener('click', () => { opener = btn; openBooking(btn.dataset.book); }));
    $$('[data-book-close]').forEach((btn) => btn.addEventListener('click', closeBooking));
    // a click on the backdrop lands on the dialog element itself
    dialog.addEventListener('click', (e) => { if (e.target === dialog) closeBooking(); });
    dialog.addEventListener('close', () => { if (opener && document.contains(opener) && opener.offsetParent) opener.focus(); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const via = e.submitter && e.submitter.dataset.send === 'email' ? 'email' : 'sms';
      const name = form.elements.fullname.value.trim();
      const phone = form.elements.phone.value.trim();
      if (!name || phone.replace(/\D/g, '').length < 6) {
        errorBox.textContent = t('book.error');
        errorBox.hidden = false;
        (name ? form.elements.phone : form.elements.fullname).focus();
        return;
      }
      errorBox.hidden = true;

      const select = form.elements.service;
      const when = form.querySelector('input[name="when"]:checked');
      const message = form.elements.message.value.trim();
      const lines = [
        t('book.subject'),
        `${t('book.l.name')}: ${name}`,
        `${t('book.l.phone')}: ${phone}`,
        `${t('book.l.service')}: ${select.options[select.selectedIndex].textContent.trim()}`,
        `${t('book.l.when')}: ${when ? when.nextElementSibling.textContent.trim() : '-'}`,
      ];
      if (message) lines.push(`${t('book.l.msg')}: ${message}`);
      const body = encodeURIComponent(lines.join('\n'));

      // "?&body=" is understood by both iOS and Android messaging apps
      const href = via === 'email'
        ? `mailto:${EMAIL}?subject=${encodeURIComponent(`${t('book.subject')} — ${name}`)}&body=${body}`
        : `sms:${PHONE}?&body=${body}`;
      sentBox.textContent = t(via === 'email' ? 'book.sentEmail' : 'book.sentSms');
      sentBox.hidden = false;
      window.location.href = href;
    });
  }

  /* ------------------------------------------------------------- map */
  const mapBtn = $('[data-map-load]');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const box = $('[data-map]');
      const frame = document.createElement('iframe');
      frame.src = MAP_EMBED;
      frame.title = t('map.title');
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.allowFullscreen = true;
      box.append(frame);
      box.classList.add('is-loaded');
      $('.map__foot', box).remove();
    });
  }

  /* ------------------------------------------------------------- start */
  captureOriginals();
  $$('[data-contours]').forEach(drawContours);
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  let initial = 'mk';
  try {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    initial = fromUrl || localStorage.getItem('zd-lang') || 'mk';
  } catch (e) { /* storage blocked */ }
  applyLanguage(initial);

  $$('[data-lang]').forEach((btn) => btn.addEventListener('click', () => { if (btn.dataset.lang !== lang) applyLanguage(btn.dataset.lang); }));

  setupReveal();
  updateCounter();

  let scheduled = false;
  const onScroll = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; lightWords(); updateNav(); });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { onScroll(); updateCounter(); });
  setInterval(updateStatus, 60 * 1000);
  // fonts change text widths, which moves the nav progress bar
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateNav);
})();
