/* Daniels AMI Montessori — shared behaviour */
const SITE = {
  founded: 2014,             // EDIT: year Daniels opened (drives the "years" figures)
  whatsapp: "94770000000",   // EDIT: WhatsApp number, country code, no "+"
  email: "hello@danielsmontessori.lk" // EDIT
};

document.querySelectorAll('[data-years]').forEach(e => e.textContent = (new Date().getFullYear() - SITE.founded) + '+');
document.querySelectorAll('[data-year-now]').forEach(e => e.textContent = new Date().getFullYear());

/* mobile menu */
const burger = document.querySelector('.burger'), nav = document.querySelector('nav.primary');
if (burger) burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* lightbox: any link with data-lb inside a [data-gallery] group */
const lb = document.querySelector('.lightbox');
if (lb) {
  const img = lb.querySelector('img'), cap = lb.querySelector('p');
  let group = [], i = 0;
  const show = n => { i = (n + group.length) % group.length; const a = group[i]; img.src = a.href; img.alt = a.dataset.cap || ''; cap.textContent = a.dataset.cap || ''; lb.classList.add('open'); };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-lb]'); if (!a) return;
    e.preventDefault();
    const g = a.closest('[data-gallery]');
    group = [...g.querySelectorAll('a[data-lb]')].filter(x => !x.classList.contains('hide'));
    show(group.indexOf(a));
  });
  lb.querySelector('.lb-x').onclick = () => lb.classList.remove('open');
  lb.querySelector('.lb-p').onclick = () => show(i - 1);
  lb.querySelector('.lb-n').onclick = () => show(i + 1);
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
}

/* gallery filters */
const filters = document.querySelector('.filters');
if (filters) filters.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  filters.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('.photo-grid a, .masonry a').forEach(a => a.classList.toggle('hide', b.dataset.f !== 'all' && a.dataset.c !== b.dataset.f));
});

/* curriculum term tabs (opens on the current term) */
const tabs = document.querySelector('.tabs');
if (tabs) {
  const pick = t => {
    tabs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
    document.querySelectorAll('.term').forEach(x => x.classList.toggle('on', x.id === t));
  };
  tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) pick(b.dataset.t); });
  const m = new Date().getMonth();
  document.querySelectorAll('.mcol[data-m="' + m + '"]').forEach(c => { c.classList.add('now'); c.querySelector('h4').insertAdjacentHTML('beforeend', '<small>This month</small>'); });
  pick(m < 4 ? 'term1' : m < 8 ? 'term2' : 'term3');
}

/* forms → WhatsApp or e-mail */
document.querySelectorAll('form[data-send]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const lines = [f.dataset.title];
  f.querySelectorAll('input,select,textarea').forEach(el => { if (el.value.trim()) lines.push(`${el.dataset.label || el.name}: ${el.value.trim()}`); });
  const text = lines.join('\n');
  const href = f.dataset.send === 'email'
    ? `mailto:${SITE.email}?subject=${encodeURIComponent(f.dataset.title)}&body=${encodeURIComponent(text)}`
    : `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  const a = document.createElement('a');
  a.href = href; a.target = '_blank'; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
}));
