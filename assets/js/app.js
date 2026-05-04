const safeParse = (value, fallback) => {
  try { return JSON.parse(value); } catch { return fallback; }
};
const getStore = (k, fallback = []) => safeParse(localStorage.getItem(k), fallback);
const setStore = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const fx = 1600;
const ui = { currency: localStorage.getItem('currency') || 'USD', dark: localStorage.getItem('dark') === '1' };
if (ui.dark) document.documentElement.classList.add('dark');

const routeNames = {
  overview: 'Overview',
  'luxury-experiences': 'Luxury Experiences',
  'experience-details': 'Experience Details',
  'booking-engine': 'Booking Engine',
  'guest-portal': 'Guest Portal',
  'operator-portal': 'Operator Portal',
  'admin-command-center': 'Admin Command Center'
};

const app = document.getElementById('app');
const data = Array.isArray(window.KEMO_DATA) ? window.KEMO_DATA : [];
const fmt = (n) => ui.currency === 'USD' ? `$${Number(n || 0).toLocaleString()}` : `TZS ${(Number(n || 0) * fx).toLocaleString()}`;
const safeGuest = (b) => (b && typeof b.name === 'string' && b.name.trim()) ? b.name.trim() : 'Guest Client';

const qs = (sel) => document.querySelector(sel);
const toast = (m) => {
  const d = document.createElement('div');
  d.className = 'fixed top-4 right-4 glass px-4 py-2 rounded-xl z-50';
  d.innerText = m;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 1800);
};

function nav() {
  const items = Object.entries(routeNames).map(([k, v]) => `<a href='#${k}' class='hover:text-amber-300 transition'>${v}</a>`).join('');
  return `<header class='sticky top-0 z-40 backdrop-blur bg-[#07111fcc] border-b border-amber-200/20'><div class='max-w-7xl mx-auto p-4 flex justify-between items-center'><a href='#overview' class='hfont text-2xl'>Kemo Tourism OS</a><nav class='hidden lg:flex gap-4 text-sm'>${items}</nav><div class='flex gap-2'><button id='cur' class='chip'>${ui.currency}</button><button id='mode' class='chip'>${ui.dark ? 'Light' : 'Dark'}</button></div></div></header>`;
}

function experienceCard(p) {
  return `<article class='glass rounded-2xl overflow-hidden reveal'><img src='${p.image}' class='h-56 w-full object-cover'><div class='p-5 space-y-2'><div class='flex justify-between'><h3 class='font-semibold text-lg'>${p.title}</h3><span class='chip'>${p.luxuryLevel}</span></div><p class='text-sm text-slate-300'>${p.destination} • ${p.category} • ${p.duration} Days</p><p class='text-sm'>⭐ ${p.rating} (${p.reviews})</p><p class='text-amber-300 font-bold'>From ${fmt(p.priceUSD)}</p><div class='flex gap-2 pt-2'><a href='#experience-details?id=${p.id}' class='px-3 py-2 rounded bg-slate-800'>View Experience</a><a href='#booking-engine?id=${p.id}' class='px-3 py-2 rounded bg-amber-500 text-black font-semibold'>Reserve Now</a><button onclick='wish(${p.id})' class='px-3 py-2 rounded border border-amber-200/30'>Wishlist</button></div></div></article>`;
}
window.wish = (id) => {
  const w = getStore('wishlist', []);
  setStore('wishlist', w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  toast('Saved experiences updated');
};

function overview() { return `<section class='fade'><div class='relative min-h-[70vh] bg-cover bg-center' style='background-image:url(https://images.unsplash.com/photo-1621420770871-ffdb26ed9b8c?auto=format&fit=crop&w=1800&q=80)'><div class='absolute inset-0 bg-gradient-to-r from-[#07111fee] to-[#07111f88]'></div><div class='relative max-w-7xl mx-auto p-8 pt-20'><h1 class='text-5xl hfont max-w-4xl'>The Complete Booking Infrastructure for Premium Tanzania Tourism</h1><p class='mt-4 max-w-3xl text-slate-200'>A luxury digital booking platform for safari operators, hotels, travel agencies, and destination managers — built to showcase bookings, payments, guest portals, operator tools, and admin control in one premium system.</p></div></div><div class='max-w-7xl mx-auto p-8'><div class='grid md:grid-cols-3 gap-4'>${data.slice(0, 6).map(experienceCard).join('')}</div></div></section>`; }
function experiences() { return `<section class='max-w-7xl mx-auto p-8 fade'><h1 class='hfont text-4xl'>Luxury Experiences</h1><div class='glass p-4 rounded-2xl grid md:grid-cols-6 gap-2'><input id='q' placeholder='Search' class='bg-slate-900/60 p-2 rounded md:col-span-2'><select id='d' class='bg-slate-900/60 p-2 rounded'><option value=''>Destination</option>${[...new Set(data.map((x) => x.destination))].map((x) => `<option>${x}</option>`).join('')}</select><select id='c' class='bg-slate-900/60 p-2 rounded'><option value=''>Category</option>${[...new Set(data.map((x) => x.category))].map((x) => `<option>${x}</option>`).join('')}</select><select id='s' class='bg-slate-900/60 p-2 rounded'><option value='popularity'>Sort popularity</option><option value='premium'>Sort premium</option><option value='priceUSD'>Sort price</option><option value='rating'>Sort rating</option></select><button id='go' class='bg-amber-500 text-black rounded px-3'>Apply</button></div><div id='grid' class='grid md:grid-cols-3 gap-4 mt-5'></div></section>`; }
function details(id) { const p = data.find((x) => String(x.id) === String(id)) || data[0]; if (!p) return `<section class='p-8'>No data found.</section>`; return `<section class='fade'><div class='h-[56vh] bg-cover bg-center' style='background-image:url(${p.image})'></div><div class='max-w-7xl mx-auto p-8 grid lg:grid-cols-3 gap-5'><div class='lg:col-span-2'><h1 class='hfont text-4xl'>${p.title}</h1><p>${p.destination} • ⭐ ${p.rating} (${p.reviews})</p></div><aside class='glass p-5 rounded-2xl sticky top-24 h-fit'><p class='text-amber-300 font-bold text-2xl'>From ${fmt(p.priceUSD)} / guest</p><a href='#booking-engine?id=${p.id}' class='block text-center mt-4 bg-amber-500 text-black py-2 rounded font-semibold'>Reserve Experience</a></aside></div></section>`; }
function booking() { return `<section class='max-w-7xl mx-auto p-8 fade'><h1 class='hfont text-4xl'>Premium Booking Engine</h1><div class='grid lg:grid-cols-3 gap-5 mt-4'><div class='lg:col-span-2 glass p-5 rounded-2xl'><div id='flow'></div></div><aside class='glass p-5 rounded-2xl'><div id='summary'></div></aside></div></section>`; }
function guest() { const b = getStore('bookings', []), w = getStore('wishlist', []); return `<section class='max-w-7xl mx-auto p-8 fade'><h1 class='hfont text-4xl'>Guest Travel Portal</h1><div class='glass p-4 rounded-xl mt-4'>Bookings: ${b.length} • Saved: ${w.length}</div></section>`; }
function operator() { const b = getStore('bookings', []); return `<section class='max-w-7xl mx-auto p-8 fade'><h1 class='hfont text-4xl'>Operator Portal</h1><div class='glass p-4 rounded-xl mt-4'>Incoming bookings: ${b.length}</div></section>`; }
function admin() { const b = getStore('bookings', []); return `<section class='max-w-7xl mx-auto p-8 fade'><h1 class='hfont text-4xl'>Admin Command Center</h1><div class='glass p-4 rounded-xl mt-4'><table class='w-full text-sm'><tr><th>Reference</th><th>Guest</th><th>Experience</th></tr>${b.map((x) => `<tr><td>${x.ref || '-'}</td><td>${safeGuest(x)}</td><td>${x.title || '-'}</td></tr>`).join('')}</table></div></section>`; }

function initBooking(params) {
  const target = qs('#flow');
  if (!target) return;
  const id = params.get('id');
  const p = data.find((x) => String(x.id) === String(id)) || data[0];
  if (!p) { target.innerHTML = 'No experience available.'; return; }
  const ref = `KEMO-OS-${Math.floor(10000 + Math.random() * 89999)}`;
  target.innerHTML = `<div class='space-y-2'><p>Selected: ${p.title}</p><button id='confirm' class='bg-amber-500 text-black px-4 py-2 rounded'>Simulate Confirm Booking</button></div>`;
  const sum = qs('#summary'); if (sum) sum.innerHTML = `Base: ${fmt(p.priceUSD)}<br>Total: <b>${fmt(p.priceUSD * 1.18)}</b>`;
  const btn = qs('#confirm');
  if (btn) btn.onclick = () => {
    const bookings = getStore('bookings', []);
    bookings.push({ ref, name: 'Guest Client', title: p.title, destination: p.destination, priceUSD: p.priceUSD, status: 'Confirmed', paymentStatus: 'Paid' });
    setStore('bookings', bookings);
    target.innerHTML = `<div class='glass p-4 rounded-xl'>Booking Confirmed • ${ref}<br><a href='#guest-portal' class='underline'>View Guest Portal</a></div>`;
  };
}

function render() {
  if (!app) return;
  const h = location.hash.slice(1) || 'overview';
  const [r, q] = h.split('?');
  const params = new URLSearchParams(q || '');
  const page = Object.prototype.hasOwnProperty.call(routeNames, r) ? r : 'overview';

  app.innerHTML = nav() + `<main>${page === 'overview' ? overview() : page === 'luxury-experiences' ? experiences() : page === 'experience-details' ? details(params.get('id')) : page === 'booking-engine' ? booking() : page === 'guest-portal' ? guest() : page === 'operator-portal' ? operator() : admin()}</main>`;

  const cur = document.getElementById('cur');
  if (cur) cur.onclick = () => { ui.currency = ui.currency === 'USD' ? 'TZS' : 'USD'; localStorage.setItem('currency', ui.currency); render(); };
  const mode = document.getElementById('mode');
  if (mode) mode.onclick = () => { ui.dark = !ui.dark; localStorage.setItem('dark', ui.dark ? '1' : '0'); document.documentElement.classList.toggle('dark'); render(); };

  if (page === 'luxury-experiences') {
    const grid = qs('#grid'), qEl = qs('#q'), dEl = qs('#d'), cEl = qs('#c'), sEl = qs('#s'), go = qs('#go');
    const draw = () => {
      if (!grid || !qEl || !dEl || !cEl || !sEl) return;
      let d = [...data];
      d = d.filter((x) => x.title.toLowerCase().includes((qEl.value || '').toLowerCase()) && (!dEl.value || x.destination === dEl.value) && (!cEl.value || x.category === cEl.value));
      d.sort((a, b) => (b[sEl.value] || 0) - (a[sEl.value] || 0));
      grid.innerHTML = d.length ? d.map(experienceCard).join('') : `<div class='glass p-8 rounded-xl'>No experiences match this filter.</div>`;
    };
    if (go) go.onclick = draw;
    draw();
  }

  if (page === 'booking-engine') initBooking(params);
  document.querySelectorAll('.reveal').forEach((x, i) => setTimeout(() => x.classList.add('show'), i * 30));
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
render();
