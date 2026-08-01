/* ============================================================
   DJAGBLETEY — Frank Quarshie for Ada
   ------------------------------------------------------------
   ▶ EDIT THIS BLOCK. Everything the campaign team needs to
     change lives here. No other file needs touching.
   ============================================================ */
const CAMPAIGN = {
  candidate:   'Frank Quarshie Djagbletey',
  constituency:'Ada Constituency',

  // Digits only, full international format, no "+" and no spaces.
  // Example for Ghana: 233241234567
  whatsapp:    '233559468385',

  email:       'campaign@example.org',
  phone:       '0559 468 385 · 0202 390 068',

  /* Social accounts. Paste the full URL into `url` and the link goes live.
     Leave url empty and it renders greyed-out and unclickable, so nothing
     ever ships pointing at the wrong account. Delete rows you don't use;
     reorder them to change the order shown on the page. */
  socials: [
    { name:'WhatsApp Channel', icon:'whatsapp',  url:'', handle:'Daily campaign updates' },
    { name:'Facebook',         icon:'facebook',  url:'', handle:'' },
    { name:'TikTok',           icon:'tiktok',    url:'', handle:'' },
    { name:'Instagram',        icon:'instagram', url:'', handle:'' },
    { name:'X',                icon:'x',         url:'', handle:'' },
    { name:'YouTube',          icon:'youtube',   url:'', handle:'' }
  ],

  // Ghana general election. Update if the EC sets a different date.
  electionDate: '2028-12-07T07:00:00+00:00',

  // Seeds the public pledge counter so it doesn't start at zero.
  pledgeSeed: 1284
};

/* Communities across the Ada area.
   VERIFY against the Electoral Commission's electoral-area list before print. */
const COMMUNITIES = [
  { name:'Ada Foah',   zone:'Coastal',  x:212, y:216 },
  { name:'Big Ada',    zone:'Coastal',  x:190, y:196 },
  { name:'Kasseh',     zone:'Central',  x:160, y:152 },
  { name:'Azizanya',   zone:'Coastal',  x:244, y:232 },
  { name:'Totope',     zone:'Coastal',  x:168, y:228 },
  { name:'Otrokper',   zone:'Central',  x:190, y:168 },
  { name:'Toflokpo',   zone:'Inland',   x:116, y:128 },
  { name:'Koluedor',   zone:'Inland',   x:78,  y:142 },
  { name:'Anyamam',    zone:'Coastal',  x:140, y:214 },
  { name:'Bonikope',   zone:'Coastal',  x:104, y:192 },
  { name:'Pute',       zone:'Central',  x:196, y:120 },
  { name:'Luhuose',    zone:'Inland',   x:48,  y:180 },
  { name:'Wasakuse',   zone:'Inland',   x:88,  y:100 },
  { name:'Matsekope',  zone:'Central',  x:150, y:84  },
  { name:'Kewunor',    zone:'Coastal',  x:280, y:208 },
  { name:'Goi',        zone:'Central',  x:232, y:132 },
  { name:'Alorkpem',   zone:'Inland',   x:54,  y:116 },
  { name:'Salom',      zone:'Central',  x:254, y:172 }
];

/* The six Charter issues, offered for ranking. */
const ISSUES = [
  { id:'songor',  label:'Songor salt rights',     note:'Community access, transparent leases, real royalties' },
  { id:'sea',     label:'Sea defence',            note:'Protect Totope, Azizanya and the Ada shoreline' },
  { id:'fishing', label:'Fishing & the estuary',  note:'Cold chain, gear, fair rules, support for processors' },
  { id:'jobs',    label:'Jobs for young people',  note:'Skills hub, apprenticeships, start-up capital' },
  { id:'tourism', label:'Tourism & Asafotufiami', note:'Keep visitor money in Ada hands' },
  { id:'water',   label:'Water & sanitation',     note:'Potable water where the groundwater is saline' },
  { id:'health',  label:'Health facilities',      note:'Staff, supplies and referral transport' },
  { id:'roads',   label:'Roads & transport',      note:'Feeder roads maintained on a published schedule' },
  { id:'schools', label:'Schools & teachers',     note:'Classrooms, furniture and teacher housing' },
  { id:'farming', label:'Farming & irrigation',   note:'Inputs, markets and water for Ada farmers' }
];

/* ============================================================
   Helpers
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const store = {
  get(k, fb){ try { return JSON.parse(localStorage.getItem('ada.' + k)) ?? fb; } catch { return fb; } },
  set(k, v){ try { localStorage.setItem('ada.' + k, JSON.stringify(v)); } catch {} }
};

let toastTimer;
function toast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3600);
}

function waLink(text){
  return `https://wa.me/${CAMPAIGN.whatsapp}?text=${encodeURIComponent(text)}`;
}

/* Share-card surface. Declared here, not in the share block at the bottom,
   because drawCard() is called from the ranker long before that block runs. */
const canvas = $('#shareCanvas');
const ctx = canvas.getContext('2d');
const seal = new Image();
seal.src = 'images/seal.jpg';
seal.onload = () => drawCard();

/* ============================================================
   Contact details + socials
   ============================================================ */
$('#wayEmail').textContent = CAMPAIGN.email;
$('#wayPhone').textContent = CAMPAIGN.phone;
$('#yr').textContent = new Date().getFullYear();

/* ============================================================
   Social links
   ============================================================ */
const SOCIAL_ICONS = {
  whatsapp:'<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Z"/>',
  facebook:'<path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2C11.55 2 9.7 3.66 9.7 6.7v2.62H6.61v3.56H9.7V22h3.68v-9.12h3.09l.47-3.56h-3.56V7.05c0-1.03.28-1.73 1.74-1.73Z"/>',
  tiktok:'<path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.68c.27 0 .52.04.76.12v-3.2a5.87 5.87 0 0 0-.76-.05 5.79 5.79 0 1 0 5.79 5.79V9.01a7.35 7.35 0 0 0 4.28 1.37V7.29a4.29 4.29 0 0 1-3.33-1.47Z"/>',
  instagram:'<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Z"/><path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z"/><circle cx="18.41" cy="5.59" r="1.44"/>',
  x:'<path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93Zm-1.29 19.49h2.04L6.49 3.24H4.3Z"/>',
  youtube:'<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12Z"/>'
};

const svgIcon = key =>
  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SOCIAL_ICONS[key] || ''}</svg>`;

/* Icon-only row (footer) */
function renderSocialIcons(el){
  if (!el) return;
  el.innerHTML = CAMPAIGN.socials.map(s => {
    const live = s.url && s.url.trim();
    return live
      ? `<a class="soc" href="${s.url}" target="_blank" rel="noopener"
            aria-label="${s.name}" title="${s.name}">${svgIcon(s.icon)}</a>`
      : `<span class="soc is-unset" role="img" aria-label="${s.name} — link not set yet"
            title="${s.name} — add the URL in app.js">${svgIcon(s.icon)}</span>`;
  }).join('');
}

/* Labelled rows (join panel) — only accounts that are actually live */
function renderSocialRows(el){
  if (!el) return;
  const live = CAMPAIGN.socials.filter(s => s.url && s.url.trim());
  if (!live.length){ el.closest('.socials-block')?.remove(); return; }
  el.innerHTML = live.map(s => `
    <a class="soc-row" href="${s.url}" target="_blank" rel="noopener">
      <span class="soc-row-ico">${svgIcon(s.icon)}</span>
      <span><b>${s.name}</b>${s.handle ? `<small>${s.handle}</small>` : ''}</span>
      <span class="soc-row-go" aria-hidden="true">↗</span>
    </a>`).join('');
}

renderSocialIcons($('#footerSocials'));
renderSocialRows($('#joinSocials'));

{
  const unset = CAMPAIGN.socials.filter(s => !s.url || !s.url.trim()).map(s => s.name);
  if (unset.length){
    console.info(`[Djagbletey] Social links not set yet: ${unset.join(', ')}. ` +
                 `Add the URLs in the CAMPAIGN.socials block at the top of app.js.`);
  }
}

/* ============================================================
   Nav
   ============================================================ */
const nav = $('#nav');
addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 40), { passive:true });

const burger = $('#burger');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
$$('#navLinks a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* Active-section highlight — tracks which section is in view so the nav
   always shows where you are, not just a static list of links. */
{
  const navLinks = $$('#navLinks a[href^="#"]:not(.m-cta)');
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin:'-45% 0px -50% 0px', threshold:0 });

  sections.forEach(s => spy.observe(s));
}

/* ============================================================
   Countdown
   ============================================================ */
const target = new Date(CAMPAIGN.electionDate).getTime();
const pad = n => String(n).padStart(2, '0');

function tick(){
  const diff = target - Date.now();
  if (diff <= 0){
    $('#countdown').innerHTML =
      '<div class="countdown-label">Election day is here<small>Go and vote. Take three people with you.</small></div>';
    return;
  }
  const s = Math.floor(diff / 1000);
  $('#cdD').textContent = Math.floor(s / 86400);
  $('#cdH').textContent = pad(Math.floor(s / 3600) % 24);
  $('#cdM').textContent = pad(Math.floor(s / 60) % 60);
  $('#cdS').textContent = pad(s % 60);
}
tick();
setInterval(tick, 1000);

/* ============================================================
   Ticker
   ============================================================ */
{
  const words = [...COMMUNITIES.map(c => c.name), 'Kakepami!', 'Return', 'Rebuild', 'Represent'];
  const line = () => `<span>${words.join('</span><span>')}</span>`;
  $('#ticker').innerHTML = line() + line();   // doubled for a seamless loop
}

/* ============================================================
   Scroll reveal
   ============================================================ */
{
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
  $$('.rv').forEach(el => io.observe(el));
}

/* ============================================================
   Priority ranker
   ============================================================ */
const MAX_PICKS = 3;
let picks = store.get('picks', []).filter(id => ISSUES.some(i => i.id === id)).slice(0, MAX_PICKS);

/* Declared up here because drawCard() reads it, and drawCard() runs
   during the first renderPicks() — before the communities block below. */
let activeCommunity = null;

const chipsEl = $('#chips');
chipsEl.innerHTML = ISSUES.map(i =>
  `<button type="button" class="chip" data-id="${i.id}"><span class="rank"></span>${i.label}</button>`
).join('');

function renderPicks(){
  $$('.chip', chipsEl).forEach(chip => {
    const idx = picks.indexOf(chip.dataset.id);
    chip.classList.toggle('on', idx > -1);
    chip.setAttribute('aria-pressed', String(idx > -1));
    $('.rank', chip).textContent = idx > -1 ? idx + 1 : '';
  });

  const list = $('#mandateList');
  if (!picks.length){
    list.innerHTML = '<li class="mandate-empty" style="border:0">Nothing selected yet. ' +
      'Choose the issues you would want raised on the floor of Parliament for Ada.</li>';
  } else {
    list.innerHTML = picks.map((id, n) => {
      const i = ISSUES.find(x => x.id === id);
      return `<li style="animation-delay:${n * .07}s"><b>${n + 1}</b>` +
             `<div>${i.label}<small>${i.note}</small></div></li>`;
    }).join('');
  }

  $('#mandateBar').style.width = (picks.length / MAX_PICKS * 100) + '%';
  $('#sendMandate').disabled = !picks.length;
  store.set('picks', picks);
  drawCard();
}

chipsEl.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  const id = chip.dataset.id;
  const at = picks.indexOf(id);

  if (at > -1){
    picks.splice(at, 1);
  } else if (picks.length >= MAX_PICKS){
    toast(`Three at a time. Remove one first — that is the point of choosing.`);
    return;
  } else {
    picks.push(id);
  }
  renderPicks();
});

$('#sendMandate').addEventListener('click', () => {
  const lines = picks.map((id, n) => `${n + 1}. ${ISSUES.find(x => x.id === id).label}`).join('\n');
  const name = $('#pName').value.trim();
  const comm = $('#pComm').value;
  const msg =
    `*My mandate for Ada*\n\n${lines}\n\n` +
    (name ? `From: ${name}\n` : '') +
    (comm ? `Community: ${comm}\n` : '') +
    `\nReturn. Rebuild. Represent. …Kakepami!`;
  window.open(waLink(msg), '_blank', 'noopener');
});

renderPicks();

/* ============================================================
   Communities: list + map, kept in sync
   ============================================================ */
const listEl = $('#commList');
const pinsEl = $('#pins');

pinsEl.innerHTML = COMMUNITIES.map(c => `
  <g class="map-pin" data-name="${c.name}" tabindex="0" role="button" aria-label="${c.name}">
    <circle cx="${c.x}" cy="${c.y}" r="5" fill="#d62828" stroke="rgba(255,255,255,.65)" stroke-width="1.2"></circle>
    <text x="${c.x}" y="${c.y - 11}" text-anchor="middle" font-size="9.5"
          font-family="Lato,sans-serif" fill="rgba(255,255,255,.72)">${c.name}</text>
  </g>`).join('');

function renderCommunities(filter = ''){
  const q = filter.trim().toLowerCase();
  const hits = COMMUNITIES.filter(c => c.name.toLowerCase().includes(q));

  listEl.innerHTML = hits.length
    ? hits.map(c => `
        <li class="comm-item${c.name === activeCommunity ? ' on' : ''}" data-name="${c.name}">
          <span class="comm-dot"></span>
          <span><b>${c.name}</b><small>Organising in progress</small></span>
          <span class="comm-zone">${c.zone}</span>
        </li>`).join('')
    : `<li class="comm-item" style="cursor:default">
         <span><b>Not listed yet</b><small>Tell us and we will send an organiser to your community.</small></span>
       </li>`;
}

function selectCommunity(name){
  activeCommunity = name;
  renderCommunities($('#commSearch').value);
  $$('.map-pin', pinsEl).forEach(p => p.classList.toggle('on', p.dataset.name === name));

  const sel = $('#pComm');
  if ([...sel.options].some(o => o.value === name)) sel.value = name;
  drawCard();
}

$('#commSearch').addEventListener('input', e => renderCommunities(e.target.value));
listEl.addEventListener('click', e => {
  const item = e.target.closest('.comm-item[data-name]');
  if (item) selectCommunity(item.dataset.name);
});
pinsEl.addEventListener('click', e => {
  const pin = e.target.closest('.map-pin');
  if (pin) selectCommunity(pin.dataset.name);
});
pinsEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' '){
    const pin = e.target.closest('.map-pin');
    if (pin){ e.preventDefault(); selectCommunity(pin.dataset.name); }
  }
});

renderCommunities();

/* Community dropdown on the pledge form */
$('#pComm').innerHTML =
  '<option value="" disabled selected>Select your community…</option>' +
  COMMUNITIES.map(c => `<option>${c.name}</option>`).join('') +
  '<option>Other / not listed</option><option>Diaspora</option>';

/* ============================================================
   Voter readiness checklists (saved per device)
   ============================================================ */
$$('.check').forEach(ul => {
  const key   = 'chk.' + ul.dataset.key;
  const saved = store.get(key, []);
  const items = $$('li', ul);

  items.forEach((li, i) => {
    $('.box', li).innerHTML =
      '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" ' +
      'stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5.5 5.5L20 7"/></svg>';
    li.classList.toggle('done', saved.includes(i));

    li.addEventListener('click', () => {
      li.classList.toggle('done');
      store.set(key, items.reduce((a, el, n) => (el.classList.contains('done') && a.push(n), a), []));
    });
  });
});

/* ============================================================
   Pledge form → WhatsApp
   ============================================================ */
const countEl = $('#pledgeCount');
let pledges = store.get('pledges', CAMPAIGN.pledgeSeed);

function renderCount(to){
  const from = Number(String(countEl.textContent).replace(/\D/g, '')) || 0;
  const t0 = performance.now();
  let done = false;

  const step = (t) => {
    if (done) return;
    const k = Math.min((t - t0) / 900, 1);
    const eased = 1 - Math.pow(1 - k, 3);
    countEl.textContent = Math.round(from + (to - from) * eased).toLocaleString();
    if (k < 1) requestAnimationFrame(step); else done = true;
  };
  requestAnimationFrame(step);

  // rAF is throttled in hidden tabs. Guarantee the real number lands regardless.
  setTimeout(() => { done = true; countEl.textContent = to.toLocaleString(); }, 1000);
}

$('#pledgeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // NB: use f.elements — f.name would return the form's own name attribute.
  const el = e.target.elements;
  const name = el.name.value.trim();
  const phone = el.phone.value.trim();
  const comm = el.community.value;
  const role = el.role.value;
  const note = el.message.value.trim();

  const top = picks.length
    ? '\nMy top priorities:\n' + picks.map((id, n) => `${n + 1}. ${ISSUES.find(x => x.id === id).label}`).join('\n')
    : '';

  const msg =
    `*I stand with Ada* — ${CAMPAIGN.candidate}\n\n` +
    `Name: ${name}\nPhone: ${phone}\nCommunity: ${comm}\nHelping with: ${role}\n` +
    top +
    (note ? `\n\nWhat Ada needs first:\n${note}` : '') +
    `\n\nReturn. Rebuild. Represent. …Kakepami!`;

  pledges += 1;
  store.set('pledges', pledges);
  renderCount(pledges);
  drawCard();
  toast('Opening WhatsApp — press send there to reach the campaign.');
  window.open(waLink(msg), '_blank', 'noopener');
});

renderCount(pledges);

/* ============================================================
   Share card (canvas)
   ============================================================ */
function roundRect(x, y, w, h, r){
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCard(){
  const W = canvas.width, H = canvas.height;
  const name = ($('#pName')?.value || '').trim();
  const comm = activeCommunity || $('#pComm')?.value || '';

  // Background — deep NDC green, matching the page field
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#006b3f');
  bg.addColorStop(.55, '#0a1310');
  bg.addColorStop(1, '#0a0b0b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Glow
  const glow = ctx.createRadialGradient(W * .8, H * .18, 0, W * .8, H * .18, W * .8);
  glow.addColorStop(0, 'rgba(214,40,40,.30)');
  glow.addColorStop(1, 'rgba(214,40,40,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Red frame
  ctx.strokeStyle = 'rgba(214,40,40,.55)';
  ctx.lineWidth = 3;
  roundRect(28, 28, W - 56, H - 56, 34);
  ctx.stroke();

  // Seal
  if (seal.complete && seal.naturalWidth){
    const d = 190, cx = W / 2, cy = 210;
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, d / 2, 0, Math.PI * 2); ctx.clip();
    ctx.drawImage(seal, cx - d / 2, cy - d / 2, d, d);
    ctx.restore();
    ctx.strokeStyle = 'rgba(224,94,94,.85)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, d / 2 + 6, 0, Math.PI * 2); ctx.stroke();
  }

  ctx.textAlign = 'center';

  // "I stand with"
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.font = '500 26px Lato, sans-serif';
  ctx.fillText('I  S T A N D  W I T H', W / 2, 380);

  // ADA
  const redGrad = ctx.createLinearGradient(W * .2, 0, W * .8, 0);
  redGrad.addColorStop(0, '#e05e5e');
  redGrad.addColorStop(.5, '#d62828');
  redGrad.addColorStop(1, '#ffd9d2');
  ctx.fillStyle = redGrad;
  ctx.font = '800 150px "Montserrat", Lato, sans-serif';
  ctx.fillText('ADA', W / 2, 505);

  // Supporter name
  ctx.fillStyle = '#fff';
  ctx.font = '800 40px "Montserrat", Lato, sans-serif';
  ctx.fillText(name ? name.toUpperCase() : 'ADD YOUR NAME', W / 2, 580);

  if (comm){
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.font = '500 24px Lato, sans-serif';
    ctx.fillText(comm.toUpperCase(), W / 2, 618);
  }

  // Priorities
  let y = 690;
  if (picks.length){
    ctx.fillStyle = 'rgba(224,94,94,.85)';
    ctx.font = '600 19px Lato, sans-serif';
    ctx.fillText('MY PRIORITIES FOR ADA', W / 2, y);
    y += 42;
    ctx.font = '600 28px "Montserrat", Lato, sans-serif';
    ctx.fillStyle = '#fff';
    picks.forEach((id, n) => {
      ctx.fillText(`${n + 1}.  ${ISSUES.find(x => x.id === id).label}`, W / 2, y);
      y += 44;
    });
  }

  // Ghana stripe
  const sw = 210, sx = (W - sw) / 2, sy = 848;
  ['#ce1126', '#fcd116', '#006b3f'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.fillRect(sx + i * (sw / 3), sy, sw / 3, 7);
  });

  // Slogan
  ctx.fillStyle = '#fff';
  ctx.font = '800 34px "Montserrat", Lato, sans-serif';
  ctx.fillText('RETURN · REBUILD · REPRESENT', W / 2, 908);

  ctx.fillStyle = 'rgba(255,255,255,.45)';
  ctx.font = '500 22px Lato, sans-serif';
  ctx.fillText(`${CAMPAIGN.candidate}  ·  …Kakepami!`, W / 2, 946);
}

$('#pName').addEventListener('input', drawCard);
$('#pComm').addEventListener('change', drawCard);
drawCard();

$('#dlCard').addEventListener('click', () => {
  const a = document.createElement('a');
  a.download = 'i-stand-with-ada.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
  toast('Card saved. Post it, and tag the campaign.');
});

$('#shareCard').addEventListener('click', async () => {
  const text = `I stand with Ada. Return. Rebuild. Represent. …Kakepami! — ${CAMPAIGN.candidate}`;
  try {
    const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
    const file = new File([blob], 'i-stand-with-ada.png', { type:'image/png' });

    if (navigator.canShare?.({ files:[file] })){
      await navigator.share({ files:[file], text });
    } else if (navigator.share){
      await navigator.share({ text, url:location.href });
    } else {
      window.open(waLink(text + '\n' + location.href), '_blank', 'noopener');
    }
  } catch (err) {
    if (err?.name !== 'AbortError') toast('Sharing is not available here — try Download instead.');
  }
});
