/* Zlatanoski Dental — page behaviour. No dependencies and no scroll listeners (observers only). */
(() => {
  'use strict';
  window.__zd = true;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const PHONE = '+38970391114';
  const EMAIL = 'pzuzlatanoski@yahoo.com';
  const MAP_EMBED = 'https://maps.google.com/maps?q=Zlatanoski%20Dental%2C%20Ohrid&ll=41.1179907,20.8015811&z=17&output=embed';
  const OPEN_SLOTS = [[9 * 60, 14 * 60], [17 * 60, 20 * 60]]; // Monday–Friday
  const BOOK_DAYS_AHEAD = 60;
  const SLOT_MINUTES = 30;

  /* ------------------------------------------------------------------ i18n */
  // Macedonian lives in the HTML; English replaces it by key.
  const EN = {
    'skip': 'Skip to content',
    'brand.home': 'Zlatanoski Dental — back to top',
    'nav.label': 'Main navigation',
    'nav.therapies': 'Therapies',
    'nav.results': 'Results',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'lang.label': 'Language',
    'menu.label': 'Menu',
    'cta.book': 'Book an appointment',

    'hero.badge': 'Dr. Goran Zlatanoski · Oral surgery specialist',
    'hero.title1': 'Dedicated to healthy smiles',
    'hero.title2': 'for all ages.',
    'hero.lead': 'Oral surgery, implants, braces and cosmetic dentistry in the centre of Ohrid. More than 10 years of experience and a contract with the national Health Insurance Fund.',
    'hero.stat1': 'Years of experience',
    'hero.stat2': 'Google rating',
    'hero.stat3': 'Therapies',
    'hero.proof': '<strong>5.0</strong> on Google · <strong>100%</strong> recommend on Facebook',
    'quick.badge': 'Book online',
    'quick.title': 'Book an appointment in one minute',
    'quick.text': 'Choose a therapy, a day and a time. We will call you to confirm the appointment.',
    'quick.o1': 'Check-up or pain',
    'quick.o1d': 'Toothache, swelling or advice',
    'quick.o2': 'Tooth or wisdom tooth removal',
    'quick.o2d': 'An impacted wisdom tooth or a damaged tooth',
    'quick.o3': 'Implants and new teeth',
    'quick.o3d': 'Implants, crowns, bridges, dentures',
    'quick.o4': 'Braces and aligners',
    'quick.o4d': 'Straightening your teeth',
    'quick.all': 'Show all 19 therapies',

    'band.label': 'Key numbers',
    'band.1': 'Years of experience',
    'band.1d': 'A specialist practice in Ohrid',
    'band.2': 'Google rating',
    'band.2d': 'The top score from patients',
    'band.3': 'Recommend on Facebook',
    'band.3d': 'Based on 11 reviews',
    'band.4v': 'FZO',
    'band.4': 'Health Insurance Fund',
    'band.4d': 'Specialist oral surgery with a referral',
    'band.note': 'Ratings from Google Maps and Facebook, September 2026.',

    'th.eyebrow': 'Therapies',
    'th.title1': 'Everything for your smile,',
    'th.title2': 'in one place.',
    'th.text': 'Pick a category and click a therapy to book an appointment.',
    'th.cats': 'Categories',
    'cat.all': 'All',
    'cat.surgery': 'Surgery',
    'cat.ortho': 'Orthodontics',
    'cat.cosmetic': 'Cosmetic',
    'cat.prosthetics': 'Prosthetics',
    'cat.general': 'General dentistry',
    't.book': 'Book',
    't.extraction': 'Tooth extraction',
    't.extraction.d': 'Removing damaged teeth under local anaesthesia.',
    't.wisdom': 'Wisdom tooth removal',
    't.wisdom.d': 'Surgical removal of impacted wisdom teeth.',
    't.implants': 'Dental implants',
    't.implants.d': 'A lasting, natural-looking replacement for a lost tooth.',
    't.apicoectomy': 'Apicoectomy',
    't.apicoectomy.d': 'Surgery at the tip of the root to save the tooth.',
    't.bonegraft': 'Bone grafting',
    't.bonegraft.d': 'Rebuilding bone so implants can be placed securely.',
    't.braces': 'Fixed braces',
    't.braces.d': 'Metal or ceramic braces for straight teeth.',
    't.aligners': 'Clear aligners',
    't.aligners.d': 'Clear trays that straighten teeth discreetly.',
    't.kidsortho': 'Removable appliances for kids',
    't.kidsortho.d': 'Appliances that guide the growth of children’s teeth and jaws.',
    't.whitening': 'Teeth whitening',
    't.whitening.d': 'A brighter smile by several shades.',
    't.veneers': 'Veneers',
    't.veneers.d': 'Thin shells for a beautiful shape and colour of the front teeth.',
    't.composite': 'Tooth-coloured fillings',
    't.composite.d': 'Fillings that match your teeth and disappear in a smile.',
    't.crowns': 'Crowns',
    't.crowns.d': 'Protecting and restoring a damaged tooth.',
    't.bridges': 'Bridges',
    't.bridges.d': 'A fixed replacement for one or more missing teeth.',
    't.dentures': 'Dentures',
    't.dentures.d': 'Full or partial dentures for comfortable chewing.',
    't.checkup': 'Check-up & consultation',
    't.checkup.d': 'An exam, advice and a clear treatment plan.',
    't.fillings': 'Fillings',
    't.fillings.d': 'Treating decay and protecting the tooth.',
    't.rootcanal': 'Root canal treatment',
    't.rootcanal.d': 'Saving the tooth when the nerve is affected.',
    't.cleaning': 'Scale & polish',
    't.cleaning.d': 'Professional cleaning for healthy gums.',
    't.kids': 'Children’s dentistry',
    't.kids.d': 'A gentle approach for our youngest patients.',
    'th.note': 'Have a referral from your dentist? Oral surgery exams are also covered through the Health Insurance Fund — choose “Check-up & consultation”.',

    'res.eyebrow': 'Results',
    'res.title1': 'Smiles that',
    'res.title2': 'came back.',
    'res.hint': 'Drag the line to see before and after.',
    'res.before': 'Before',
    'res.after': 'After',
    'res.slider': 'Compare before and after',
    'res.2chip': 'Cosmetic',
    'res.2title': 'Bright front teeth instead of broken ones',
    'res.2a': 'After: bright, natural front teeth',
    'res.2b': 'Before: broken, discoloured front teeth',
    'res.4chip': 'Restoration',
    'res.4title': 'Broken front teeth rebuilt',
    'res.4a': 'After: restored front teeth',
    'res.4b': 'Before: broken front teeth',
    'res.5chip': 'Full rehabilitation',
    'res.5title': 'New upper and lower teeth',
    'res.5a': 'After: new upper and lower teeth',
    'res.5b': 'Before: badly damaged and missing teeth',
    'res.6chip': 'Cosmetic',
    'res.6title': 'A chipped front tooth repaired',
    'res.6a': 'After: the front tooth repaired',
    'res.6b': 'Before: a chipped front tooth',
    'ref.title': 'Have a referral from your dentist?',
    'ref.text': 'We are contracted with the Health Insurance Fund for specialist oral surgery. Book an exam — we’ll tell you everything to bring.',
    'ref.btn': 'Book an exam',

    'rev.eyebrow': 'Reviews',
    'rev.title1': 'What our',
    'rev.title2': 'patients say.',
    'rev.list': 'Patient reviews',
    'rev.stars': '5 out of 5 stars',
    'rev.q1': '“The best dental surgery in Macedonia! Thank you Dr Goran for many years of great service.”',
    'rev.q2': '“Zlatanoski surgery is definitely the best in Ohrid. Excellent service! Outstanding results!”',
    'rev.q3': '“Great service thanks to Dr. Goran :)”',
    'rev.i1': 'MG', 'rev.i2': 'BB', 'rev.i3': 'MG',
    'rev.n1': 'Mimi G.', 'rev.n2': 'Biljana B.', 'rev.n3': 'Mitko Gj.',
    'rev.summary': '<strong>5.0</strong> / 5 on Google Maps · <strong>100%</strong> recommend on Facebook',
    'rev.all': 'All reviews →',
    'rev.note': 'Excerpts from public Google Maps reviews.',

    'c.eyebrow': 'Contact',
    'c.title1': 'Find us',
    'c.title2': 'in the centre of Ohrid.',
    'c.text': 'Call us or drop by during opening hours. We’re easy to find.',
    'c.address': '2 Dejan Vojvoda St',
    'c.city': '6000 Ohrid, North Macedonia',
    'c.showMap': 'Show map',
    'c.directions': 'Directions',
    'c.hours': 'Opening hours',
    'c.week': 'Monday – Friday',
    'c.weekend': 'Saturday & Sunday',
    'c.closed': 'Closed',
    'c.phone': 'Phone',
    'c.phoneNote': 'Calling during opening hours is quickest.',
    'c.online': 'Email & Facebook',

    'f.title1': 'Your smile deserves',
    'f.title2': 'a specialist.',
    'f.text': 'Book an appointment online in one minute. We’ll explain everything clearly, step by step.',
    'f.call': 'Call: 070 391 114',
    'f.small': '2 Dejan Vojvoda St, Ohrid · Mon – Fri: 9–14 & 17–20',
    'footer.name': 'Zlatanoski Dental',
    'footer.nav': 'Footer',
    'footer.legal': '© 2026 Zlatanoski specialist oral surgery practice. The content of this page is not medical advice.',
    'footer.tags': 'Oral surgery · Implants · Orthodontics · Cosmetic · Ohrid',
    'mbar.btn': 'Book',

    'bk.close': 'Close',
    'bk.dateLead': 'Pick a day and time that suit you. We confirm the appointment with a phone call.',
    'bk.prev': 'Previous month',
    'bk.next': 'Next month',
    'bk.name': 'Full name',
    'bk.phone': 'Phone',
    'bk.note': 'Note (optional)',
    'bk.notePh': 'For example: pain in the lower left tooth',
    'bk.first': 'This is my first visit',
    'bk.confirmLead': 'Check your details and send the request.',
    'bk.sms': 'Send request (SMS)',
    'bk.email': 'Send by email',
    'bk.fine': 'The request is sent from your own phone or email. The appointment is yours once we call to confirm it.',
    'bk.doneTitle': 'Almost done!',
    'bk.ics': 'Add to calendar',
    'bk.call': 'Call: 070 391 114',
    'bk.back': 'Back',
    'bk.edit': 'Back — change the request',
    'bk.steps': 'Steps',
    'bk.s1': 'Therapy',
    'bk.s2': 'Time',
    'bk.s3': 'Details',
    'bk.s4': 'Confirm',
  };

  // strings built in code, in both languages
  const TEXT = {
    mk: {
      'meta.title': 'Златаноски Дентал — орална хирургија и стоматологија во Охрид',
      'status.open': 'Отворено сега · до {t}',
      'status.today': 'Затворено · отвораме денес во {t}',
      'status.tomorrow': 'Затворено · отвораме утре во {t}',
      'status.monday': 'Затворено · отвораме во понеделник во {t}',
      'map.title': 'Мапа: Златаноски Дентал, Дејан Војвода 2, Охрид',
      'bk.step': 'Чекор {n} од 4',
      'bk.stepDone': 'Барањето е подготвено',
      'bk.t1': 'Изберете терапија',
      'bk.t2': 'Изберете ден и час',
      'bk.t3': 'Вашите податоци',
      'bk.t4': 'Потврдете го барањето',
      'bk.tDone': 'Уште само еден клик',
      'bk.continue': 'Продолжи',
      'bk.review': 'Прегледај',
      'bk.pickDay': 'Изберете ден во календарот за да ги видите часовите.',
      'bk.morning': 'Наутро',
      'bk.evening': 'Попладне',
      'bk.errName': 'Внесете го вашето име.',
      'bk.errPhone': 'Внесете телефонски број за да може да ви се јавиме.',
      'bk.sTherapy': 'Терапија',
      'bk.sWhen': 'Термин',
      'bk.sName': 'Име',
      'bk.sPhone': 'Телефон',
      'bk.sFirst': 'Прва посета',
      'bk.sNote': 'Забелешка',
      'bk.yes': 'Да',
      'bk.msgTitle': 'Барање за термин — Златаноски Дентал',
      'bk.doneSms': 'Се отвори апликацијата за пораки со вашето барање. Притиснете „Испрати“ — потоа ќе ви се јавиме да го потврдиме терминот.',
      'bk.doneEmail': 'Се отвори вашиот e-mail со барањето. Испратете го — потоа ќе ви се јавиме да го потврдиме терминот.',
      'bk.icsTitle': 'Златаноски Дентал (чека потврда)',
      'bk.icsPlace': 'ул. Дејан Војвода 2, 6000 Охрид',
      'bk.icsNote': 'Барање за термин. Ординацијата ќе се јави да го потврди. Тел: 070 391 114',
    },
    en: {
      'meta.title': 'Zlatanoski Dental — oral surgery & dentistry in Ohrid',
      'status.open': 'Open now · until {t}',
      'status.today': 'Closed · opens today at {t}',
      'status.tomorrow': 'Closed · opens tomorrow at {t}',
      'status.monday': 'Closed · opens Monday at {t}',
      'map.title': 'Map: Zlatanoski Dental, 2 Dejan Vojvoda St, Ohrid',
      'bk.step': 'Step {n} of 4',
      'bk.stepDone': 'Request ready',
      'bk.t1': 'Choose a therapy',
      'bk.t2': 'Pick a day and time',
      'bk.t3': 'Your details',
      'bk.t4': 'Confirm your request',
      'bk.tDone': 'Just one more tap',
      'bk.continue': 'Continue',
      'bk.review': 'Review',
      'bk.pickDay': 'Pick a day in the calendar to see the times.',
      'bk.morning': 'Morning',
      'bk.evening': 'Evening',
      'bk.errName': 'Please enter your name.',
      'bk.errPhone': 'Please enter a phone number so we can call you.',
      'bk.sTherapy': 'Therapy',
      'bk.sWhen': 'Time',
      'bk.sName': 'Name',
      'bk.sPhone': 'Phone',
      'bk.sFirst': 'First visit',
      'bk.sNote': 'Note',
      'bk.yes': 'Yes',
      'bk.msgTitle': 'Appointment request — Zlatanoski Dental',
      'bk.doneSms': 'Your messages app opened with the request. Press “Send” — we will then call you to confirm the appointment.',
      'bk.doneEmail': 'Your email opened with the request. Send it — we will then call you to confirm the appointment.',
      'bk.icsTitle': 'Zlatanoski Dental (awaiting confirmation)',
      'bk.icsPlace': '2 Dejan Vojvoda St, 6000 Ohrid',
      'bk.icsNote': 'Appointment request. The practice will call to confirm. Tel: 070 391 114',
    },
  };

  // Chrome's Intl has no Macedonian, so dates are spelled out by hand
  const MONTHS = {
    mk: ['јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември', 'октомври', 'ноември', 'декември'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };
  const MONTHS_SHORT = {
    mk: ['јан', 'фев', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'ное', 'дек'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  const DAYS = { // Monday first
    mk: ['понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота', 'недела'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  };
  const DAYS_SHORT = {
    mk: ['пон', 'вто', 'сре', 'чет', 'пет', 'саб', 'нед'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };

  let lang = 'mk';
  const t = (key) => TEXT[lang][key] || TEXT.mk[key] || key;
  const originals = new Map();

  function captureOriginals() {
    $$('[data-i18n]').forEach((el) => originals.set(el, { html: el.innerHTML, attrs: {} }));
    $$('[data-i18n-attr]').forEach((el) => {
      const entry = originals.get(el) || { attrs: {} };
      el.dataset.i18nAttr.split('|').forEach((pair) => { const attr = pair.split(':')[0]; entry.attrs[attr] = el.getAttribute(attr); });
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
    $$('[data-num]').forEach((el) => { if (el.dataset.counted !== 'pending') showNumber(el, Number(el.dataset.num)); });
    updateStatus();
    if (dialog.open) renderBooking();
    try { localStorage.setItem('zd-lang', lang); } catch (e) { /* storage blocked */ }
  }

  /* ------------------------------------------------------------ Skopje time */
  function skopje(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Skopje', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(date);
    const get = (type) => (parts.find((p) => p.type === type) || {}).value;
    return {
      y: Number(get('year')), m: Number(get('month')), d: Number(get('day')),
      dow: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday')), // 0 = Monday
      minutes: Number(get('hour')) * 60 + Number(get('minute')),
    };
  }
  const pad = (n) => String(n).padStart(2, '0');
  const clock = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
  const dateKey = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
  const parseKey = (key) => key.split('-').map(Number);
  const utc = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
  const weekday = (y, m, d) => (utc(y, m, d).getUTCDay() + 6) % 7;
  const addDays = (y, m, d, n) => { const x = utc(y, m, d); x.setUTCDate(x.getUTCDate() + n); return [x.getUTCFullYear(), x.getUTCMonth() + 1, x.getUTCDate()]; };
  const daysInMonth = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();

  function longDate(key) {
    const [y, m, d] = parseKey(key);
    return `${DAYS[lang][weekday(y, m, d)]}, ${d} ${MONTHS[lang][m - 1]} ${y}`;
  }
  function shortDate(key) {
    const [y, m, d] = parseKey(key);
    return `${DAYS_SHORT[lang][weekday(y, m, d)]}, ${d} ${MONTHS_SHORT[lang][m - 1]}`;
  }

  /* ------------------------------------------------------ opening status */
  function updateStatus() {
    const { dow, minutes } = skopje();
    const weekdayOpen = dow >= 0 && dow <= 4;
    $$('[data-days]').forEach((cell) => cell.classList.toggle('is-today', cell.dataset.days === (weekdayOpen ? '1-5' : '6-0')));
    let text;
    let open = false;
    if (weekdayOpen) {
      const slot = OPEN_SLOTS.find(([from, to]) => minutes >= from && minutes < to);
      const later = OPEN_SLOTS.find(([from]) => minutes < from);
      if (slot) { open = true; text = t('status.open').replace('{t}', clock(slot[1])); }
      else if (later) text = t('status.today').replace('{t}', clock(later[0]));
    }
    // after Friday evening or at the weekend the next opening is Monday morning
    if (!text) text = t(dow === 4 || dow === 5 ? 'status.monday' : 'status.tomorrow').replace('{t}', clock(OPEN_SLOTS[0][0]));
    $$('[data-status]').forEach((el) => { el.textContent = text; el.classList.toggle('is-open', open); });
  }

  /* ------------------------------------------------------ header + menu */
  const header = $('[data-header]');
  const menuBtn = $('[data-menu]');
  function closeMenu() {
    if (!header.classList.contains('is-open')) return;
    header.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', () => {
    const open = !header.classList.contains('is-open');
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $$('#nav-links a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && header.classList.contains('is-open')) { closeMenu(); menuBtn.focus(); } });
  document.addEventListener('click', (e) => { if (!header.contains(e.target)) closeMenu(); });

  /* ------------------------------------------------------- therapy filter */
  const tabs = $$('[data-filter]');
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tabs.forEach((x) => x.setAttribute('aria-pressed', String(x === tab)));
    $$('.therapy').forEach((li) => { li.hidden = filter !== 'all' && li.dataset.cat !== filter; });
  }));

  /* ------------------------------------------------ before / after sliders */
  function setupCompare(fig) {
    const range = $('.compare__range', fig);
    let dragging = false;
    let moved = false;
    fig.dataset.touched = '';
    const set = (value) => {
      const v = Math.max(0, Math.min(100, value));
      fig.style.setProperty('--pos', `${v}%`);
      range.value = String(Math.round(v));
    };
    const fromEvent = (e) => { const r = fig.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };
    let startX = 0;
    let startY = 0;
    fig.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true; moved = false;
      startX = e.clientX; startY = e.clientY;
      fig.dataset.touched = '1';
      // mouse jumps straight to the pointer; touch waits for a clearly sideways move so vertical scrolling stays free
      if (e.pointerType === 'mouse') { moved = true; set(fromEvent(e)); fig.classList.add('is-dragging'); fig.setPointerCapture(e.pointerId); }
    });
    fig.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      if (!moved) {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);
        if (dx < 8 && dy < 8) return;
        if (dy >= dx) { dragging = false; return; } // a scroll, not a drag
        moved = true;
        fig.setPointerCapture(e.pointerId);
      }
      fig.classList.add('is-dragging'); set(fromEvent(e));
    });
    const end = (e) => {
      // a plain tap (no movement) moves the line to the tapped spot
      if (dragging && !moved && e.type === 'pointerup') set(fromEvent(e));
      dragging = false; fig.classList.remove('is-dragging');
    };
    fig.addEventListener('pointerup', end);
    fig.addEventListener('pointercancel', end);
    range.addEventListener('input', () => { fig.dataset.touched = '1'; set(Number(range.value)); });
  }
  $$('[data-compare]').forEach(setupCompare);

  // a one-time nudge shows the slider can be moved
  function hintCompare(fig) {
    if (reducedMotion.matches || fig.dataset.touched) return;
    const start = performance.now();
    const duration = 1400;
    const frame = (now) => {
      if (fig.dataset.touched) return;
      const p = Math.min(1, (now - start) / duration);
      const value = 50 + Math.sin(p * Math.PI * 2) * 14 * (1 - p * 0.3);
      fig.style.setProperty('--pos', `${p < 1 ? value : 50}%`);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------ numbers */
  function showNumber(el, value) {
    const decimals = Number(el.dataset.decimals || 0);
    let text = value.toFixed(decimals);
    if (lang === 'mk') text = text.replace('.', ',');
    el.textContent = text + (el.dataset.suffix || '');
  }
  function countUp(el) {
    const target = Number(el.dataset.num);
    if (reducedMotion.matches) { el.dataset.counted = 'done'; showNumber(el, target); return; }
    const start = performance.now();
    const duration = 900;
    const frame = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      showNumber(el, p < 1 ? target * eased : target);
      if (p < 1) requestAnimationFrame(frame); else el.dataset.counted = 'done';
    };
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------- contour lines (drawn once) */
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
    const rings = Number(svg.dataset.rings || 16);
    const cx = W * Number(svg.dataset.cx || 0.5);
    const cy = H * Number(svg.dataset.cy || 0.5);
    const squeeze = 0.72;
    // one wave shape for every ring (drifting a little) keeps the rings from crossing
    const waves = [2, 3, 4, 6].map((k) => ({
      k, amp: ((0.04 + rand() * 0.06) * (k === 2 ? 1.6 : 1)) / Math.sqrt(k - 1), phase: rand() * Math.PI * 2, drift: (rand() - 0.5) * 0.06,
    }));
    const reach = Math.hypot(Math.max(cx, W - cx) / squeeze, Math.max(cy, H - cy)) * 1.08;
    const step = reach / rings;
    const n = 44;
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
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.replaceChildren(path);
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
    });
  }

  /* ================================================== booking window */
  const dialog = $('[data-bk]');
  const bkBody = $('[data-bk-body]', dialog);
  const bkForm = $('form[data-pane="3"]', dialog);
  const nextBtn = $('[data-bk-next]', dialog);
  const backBtn = $('[data-bk-foot] [data-bk-back]', dialog);
  const state = { step: 1, therapy: null, cat: 'all', date: null, time: null, via: 'sms', viewY: 0, viewM: 0, opener: null };

  const therapies = () => $$('.therapy').map((li) => ({
    id: li.dataset.id, cat: li.dataset.cat, icon: li.dataset.icon, name: $('.therapy__name', li).textContent.trim(),
  }));
  const therapyName = (id) => (therapies().find((x) => x.id === id) || {}).name || '';
  const catName = (cat) => { const tab = $(`[data-filter="${cat}"] span`); return tab ? tab.textContent.trim() : cat; };

  function slotTimes() {
    const out = [];
    OPEN_SLOTS.forEach(([from, to], group) => { for (let m = from; m + SLOT_MINUTES <= to; m += SLOT_MINUTES) out.push({ group, minutes: m, time: clock(m) }); });
    return out;
  }
  function slotsFor(key) {
    const now = skopje();
    const all = slotTimes();
    if (key !== dateKey(now.y, now.m, now.d)) return all;
    return all.filter((s) => s.minutes >= now.minutes + 60); // today: at least an hour from now
  }
  function bookable(y, m, d) {
    const now = skopje();
    const key = dateKey(y, m, d);
    const today = dateKey(now.y, now.m, now.d);
    const last = dateKey(...addDays(now.y, now.m, now.d, BOOK_DAYS_AHEAD));
    if (key < today || key > last || weekday(y, m, d) > 4) return false;
    return slotsFor(key).length > 0;
  }
  function firstBookable() {
    const now = skopje();
    for (let i = 0; i <= BOOK_DAYS_AHEAD; i++) {
      const [y, m, d] = addDays(now.y, now.m, now.d, i);
      if (bookable(y, m, d)) return dateKey(y, m, d);
    }
    return null;
  }

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function icon(id) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon'); svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(ns, 'use'); use.setAttribute('href', `#${id}`);
    svg.append(use);
    return svg;
  }

  // step 1
  function renderTherapyStep() {
    const chips = $('[data-bk-chips]', dialog);
    chips.replaceChildren(...tabs.map((tab) => {
      const b = el('button', 'chip', $('span', tab).textContent.trim());
      b.type = 'button';
      b.setAttribute('aria-pressed', String(state.cat === tab.dataset.filter));
      b.addEventListener('click', () => { state.cat = tab.dataset.filter; renderTherapyStep(); });
      return b;
    }));
    const list = $('[data-bk-list]', dialog);
    const items = therapies().filter((x) => state.cat === 'all' || x.cat === state.cat);
    list.replaceChildren(...items.map((x) => {
      const b = el('button', 'bk-item');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(state.therapy === x.id));
      const ic = el('span', 'bk-item__icon'); ic.append(icon(x.icon));
      const text = el('span', 'bk-item__text'); text.append(el('strong', '', x.name), el('small', '', catName(x.cat)));
      const check = el('span', 'bk-item__check'); check.append(icon('i-check'));
      b.append(ic, text, check);
      b.addEventListener('click', () => {
        state.therapy = x.id;
        renderTherapyStep();
        updateFoot();
        setTimeout(() => { if (state.step === 1 && state.therapy === x.id) go(2); }, 220);
      });
      return b;
    }));
  }

  // step 2
  function renderCalendar() {
    const now = skopje();
    if (!state.viewY) { state.viewY = now.y; state.viewM = now.m; }
    const { viewY: y, viewM: m } = state;
    const month = MONTHS[lang][m - 1];
    $('[data-cal-month]', dialog).textContent = `${month.charAt(0).toUpperCase()}${month.slice(1)} ${y}`;
    $('[data-cal-dow]', dialog).replaceChildren(...DAYS_SHORT[lang].map((name) => el('span', '', name)));

    const grid = $('[data-cal-grid]', dialog);
    const cells = [];
    for (let i = 0; i < weekday(y, m, 1); i++) cells.push(el('span'));
    const todayKey = dateKey(now.y, now.m, now.d);
    for (let d = 1; d <= daysInMonth(y, m); d++) {
      const key = dateKey(y, m, d);
      const b = el('button', 'cal__day', String(d));
      b.type = 'button';
      b.disabled = !bookable(y, m, d);
      b.setAttribute('aria-label', longDate(key));
      b.setAttribute('aria-pressed', String(state.date === key));
      if (key === todayKey) b.classList.add('is-today');
      b.addEventListener('click', () => {
        if (state.date !== key) state.time = null;
        state.date = key;
        renderCalendar(); renderSlots(); updateFoot();
      });
      cells.push(b);
    }
    grid.replaceChildren(...cells);

    const last = addDays(now.y, now.m, now.d, BOOK_DAYS_AHEAD);
    $('[data-cal-prev]', dialog).disabled = y < now.y || (y === now.y && m <= now.m);
    $('[data-cal-next]', dialog).disabled = y > last[0] || (y === last[0] && m >= last[1]);
  }
  function renderSlots() {
    const box = $('[data-slots]', dialog);
    if (!state.date) { box.replaceChildren(el('p', 'slots__empty', t('bk.pickDay'))); return; }
    const nodes = [el('p', 'slots__title', longDate(state.date))];
    const available = slotsFor(state.date);
    [['bk.morning', 'i-sun'], ['bk.evening', 'i-moon']].forEach(([label, ic], group) => {
      const times = available.filter((s) => s.group === group);
      if (!times.length) return;
      const wrap = el('div', 'slots__group');
      const head = el('p', 'slots__label'); head.append(icon(ic), document.createTextNode(t(label)));
      const grid = el('div', 'slots__grid');
      times.forEach((s) => {
        const b = el('button', 'slot', s.time);
        b.type = 'button';
        b.setAttribute('aria-pressed', String(state.time === s.time));
        b.addEventListener('click', () => { state.time = s.time; renderSlots(); updateFoot(); });
        grid.append(b);
      });
      wrap.append(head, grid);
      nodes.push(wrap);
    });
    box.replaceChildren(...nodes);
  }
  $('[data-cal-prev]', dialog).addEventListener('click', () => {
    state.viewM -= 1; if (state.viewM < 1) { state.viewM = 12; state.viewY -= 1; }
    renderCalendar();
  });
  $('[data-cal-next]', dialog).addEventListener('click', () => {
    state.viewM += 1; if (state.viewM > 12) { state.viewM = 1; state.viewY += 1; }
    renderCalendar();
  });

  // steps 3–4
  const details = () => ({
    name: bkForm.elements.fullname.value.trim(),
    phone: bkForm.elements.phone.value.trim(),
    note: bkForm.elements.note.value.trim(),
    first: bkForm.elements.first.checked,
  });
  function validateDetails() {
    const { name, phone } = details();
    const okName = name.length >= 2;
    const okPhone = phone.replace(/\D/g, '').length >= 8;
    bkForm.elements.fullname.setAttribute('aria-invalid', String(!okName));
    bkForm.elements.phone.setAttribute('aria-invalid', String(!okPhone));
    const error = $('[data-bk-error]', dialog);
    if (okName && okPhone) { error.hidden = true; return true; }
    error.textContent = t(okName ? 'bk.errPhone' : 'bk.errName');
    error.hidden = false;
    (okName ? bkForm.elements.phone : bkForm.elements.fullname).focus();
    return false;
  }
  function summaryRows() {
    const { name, phone, note, first } = details();
    const rows = [
      [t('bk.sTherapy'), therapyName(state.therapy)],
      [t('bk.sWhen'), `${longDate(state.date)} · ${state.time}`],
      [t('bk.sName'), name],
      [t('bk.sPhone'), phone],
    ];
    if (first) rows.push([t('bk.sFirst'), t('bk.yes')]);
    if (note) rows.push([t('bk.sNote'), note]);
    return rows;
  }
  function renderSummary(dl) {
    dl.replaceChildren(...summaryRows().flatMap(([k, v]) => [el('dt', '', k), el('dd', '', v)]));
  }
  $$('[data-bk-send]', dialog).forEach((btn) => btn.addEventListener('click', () => {
    const via = btn.dataset.bkSend;
    const { name } = details();
    const body = encodeURIComponent([t('bk.msgTitle'), ...summaryRows().map(([k, v]) => `${k}: ${v}`)].join('\n'));
    // "?&body=" is understood by both iOS and Android messaging apps
    const href = via === 'email'
      ? `mailto:${EMAIL}?subject=${encodeURIComponent(`${t('bk.msgTitle')} — ${name}`)}&body=${body}`
      : `sms:${PHONE}?&body=${body}`;
    state.via = via;
    go('done');
    window.location.href = href;
  }));
  $('[data-bk-ics]', dialog).addEventListener('click', () => {
    const [y, m, d] = parseKey(state.date);
    const [hh, mm] = state.time.split(':').map(Number);
    const end = hh * 60 + mm + SLOT_MINUTES;
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const esc = (s) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Zlatanoski Dental//Booking//MK', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      `UID:${Date.now()}@zlatanoski-dental`, `DTSTAMP:${stamp}`,
      `DTSTART:${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`,
      `DTEND:${y}${pad(m)}${pad(d)}T${pad(Math.floor(end / 60))}${pad(end % 60)}00`,
      `SUMMARY:${esc(`${t('bk.icsTitle')}: ${therapyName(state.therapy)}`)}`,
      `LOCATION:${esc(t('bk.icsPlace'))}`, `DESCRIPTION:${esc(t('bk.icsNote'))}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = el('a'); a.href = url; a.download = 'zlatanoski-termin.ics';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  });

  // navigation between steps
  const TITLES = { 1: 'bk.t1', 2: 'bk.t2', 3: 'bk.t3', 4: 'bk.t4', done: 'bk.tDone' };
  const detailsOk = () => { const { name, phone } = details(); return name.length >= 2 && phone.replace(/\D/g, '').length >= 8; };
  // the furthest step the visitor may jump to with what they have filled in so far
  function maxStep() {
    if (!state.therapy) return 1;
    if (!(state.date && state.time)) return 2;
    return detailsOk() ? 4 : 3;
  }
  function renderSteps() {
    const current = state.step === 'done' ? 5 : state.step;
    const allowed = state.step === 'done' ? 4 : maxStep();
    $$('[data-go]', dialog).forEach((btn) => {
      const n = Number(btn.dataset.go);
      const item = btn.parentElement;
      item.classList.toggle('is-done', n < current);
      item.classList.toggle('is-current', n === current);
      btn.disabled = n === current || n > allowed;
      if (n === current) btn.setAttribute('aria-current', 'step'); else btn.removeAttribute('aria-current');
    });
  }
  $$('[data-go]', dialog).forEach((btn) => btn.addEventListener('click', () => {
    const n = Number(btn.dataset.go);
    if (n === 4 && state.step === 3 && !validateDetails()) return;
    if (n <= (state.step === 'done' ? 4 : maxStep())) go(n);
  }));
  function goBack() {
    if (state.step === 'done') go(4);
    else if (state.step > 1) go(state.step - 1);
  }
  function updateFoot() {
    const step = state.step;
    renderSteps();
    $('[data-bk-foot]', dialog).hidden = step === 'done';
    backBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
    nextBtn.hidden = step === 4;
    $('[data-bk-next-label]', dialog).textContent = t(step === 3 ? 'bk.review' : 'bk.continue');
    nextBtn.disabled = (step === 1 && !state.therapy) || (step === 2 && !(state.date && state.time));
    const pick = $('[data-bk-pick]', dialog);
    const bits = [therapyName(state.therapy), state.date && shortDate(state.date), state.time].filter(Boolean);
    pick.textContent = bits.join(' · ');
  }
  function renderBooking() {
    const step = state.step;
    $$('[data-pane]', dialog).forEach((pane) => { pane.hidden = pane.dataset.pane !== String(step); });
    $('[data-bk-step]', dialog).textContent = step === 'done' ? t('bk.stepDone') : t('bk.step').replace('{n}', step);
    $('[data-bk-title]', dialog).textContent = t(TITLES[step]);
    if (step === 1) renderTherapyStep();
    if (step === 2) {
      if (!state.date) {
        state.date = firstBookable();
        if (state.date) { const [y, m] = parseKey(state.date); state.viewY = y; state.viewM = m; }
      }
      renderCalendar(); renderSlots();
    }
    if (step === 4) renderSummary($('[data-bk-summary]', dialog));
    if (step === 'done') {
      $('[data-bk-done-text]', dialog).textContent = t(state.via === 'email' ? 'bk.doneEmail' : 'bk.doneSms');
      renderSummary($('[data-bk-summary-done]', dialog));
    }
    updateFoot();
  }
  function go(step) {
    state.step = step;
    renderBooking();
    bkBody.scrollTop = 0;
    $('[data-bk-title]', dialog).focus({ preventScroll: true });
    if (step === 3 && !bkForm.elements.fullname.value) setTimeout(() => bkForm.elements.fullname.focus({ preventScroll: true }), 30);
  }
  nextBtn.addEventListener('click', () => {
    if (state.step === 1 && state.therapy) go(2);
    else if (state.step === 2 && state.date && state.time) go(3);
    else if (state.step === 3 && validateDetails()) go(4);
  });
  $$('[data-bk-back]', dialog).forEach((btn) => btn.addEventListener('click', goBack));
  bkForm.addEventListener('submit', (e) => { e.preventDefault(); if (validateDetails()) go(4); });

  // The phone / browser back button steps back inside the window instead of leaving the page:
  // one history entry is added while the window is open and re-added after each back press.
  let historyArmed = false;
  let ignoreNextPop = false;
  const armHistory = () => { try { history.pushState({ zdBooking: true }, ''); historyArmed = true; } catch (e) { historyArmed = false; } };
  window.addEventListener('popstate', () => {
    if (ignoreNextPop) { ignoreNextPop = false; return; }
    if (!dialog.open || !historyArmed) return;
    historyArmed = false;
    if (state.step === 1) { closeBooking(); return; }
    goBack();
    armHistory();
  });

  function openBooking(therapyId, opener) {
    closeMenu();
    if (state.step === 'done') { state.date = null; state.time = null; }
    const known = therapyId && therapies().some((x) => x.id === therapyId);
    if (known) { state.therapy = therapyId; state.step = 2; }
    else { state.step = 1; }
    state.opener = opener || null;
    renderBooking();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    document.documentElement.classList.add('bk-open');
    if (!historyArmed) armHistory();
    bkBody.scrollTop = 0;
    $('[data-bk-title]', dialog).focus({ preventScroll: true });
  }
  function closeBooking() { if (typeof dialog.close === 'function') dialog.close(); else { dialog.removeAttribute('open'); onClose(); } }
  function onClose() {
    document.documentElement.classList.remove('bk-open');
    // closed with the X, Escape or the backdrop: drop the history entry the window added
    if (historyArmed) { historyArmed = false; ignoreNextPop = true; history.back(); }
    if (state.opener && document.contains(state.opener)) state.opener.focus({ preventScroll: true });
  }
  dialog.addEventListener('close', onClose);
  $('[data-bk-close]', dialog).addEventListener('click', closeBooking);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeBooking(); });

  // every "book" button on the page opens the window; some pre-pick a therapy
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-book]');
    if (!trigger || dialog.contains(trigger)) return;
    e.preventDefault();
    openBooking(trigger.dataset.book, trigger);
  });

  /* ------------------------------------------------------------- observers */
  function observeOnce(targets, callback, options) {
    if (!('IntersectionObserver' in window)) { targets.forEach(callback); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { callback(entry.target); io.unobserve(entry.target); } });
    }, options);
    targets.forEach((target) => io.observe(target));
  }

  function setupObservers() {
    observeOnce($$('.reveal'), (node) => node.classList.add('is-in'), { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    $$('[data-num]').forEach((node) => { node.dataset.counted = 'pending'; showNumber(node, 0); });
    observeOnce($$('[data-num]'), countUp, { threshold: 0.6 });
    observeOnce($$('[data-compare]'), hintCompare, { threshold: 0.7 });

    if (!('IntersectionObserver' in window)) return;
    // header shade once the page moves
    new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting)).observe($('[data-top]'));

    // current section in the nav: whichever section crosses the middle of the screen
    const links = $$('#nav-links a');
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => { if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean).forEach((section) => navIO.observe(section));

    // phone bar: hidden while the booking card or the final band is on screen
    const mbar = $('[data-mbar]');
    const seen = { quick: true, final: false };
    const sync = () => mbar.classList.toggle('is-visible', !seen.quick && !seen.final);
    new IntersectionObserver(([entry]) => { seen.quick = entry.isIntersecting; sync(); }).observe($('[data-quick]'));
    new IntersectionObserver(([entry]) => { seen.final = entry.isIntersecting; sync(); }).observe($('[data-final]'));
  }

  /* ------------------------------------------------------------- start */
  captureOriginals();
  $$('[data-contours]').forEach(drawContours);
  $$('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  let initial = 'mk';
  try { initial = new URLSearchParams(location.search).get('lang') || localStorage.getItem('zd-lang') || 'mk'; } catch (e) { /* storage blocked */ }
  applyLanguage(initial);
  $$('[data-lang]').forEach((btn) => btn.addEventListener('click', () => { if (btn.dataset.lang !== lang) applyLanguage(btn.dataset.lang); }));

  setupObservers();
  setInterval(updateStatus, 60 * 1000);
})();
