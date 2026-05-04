document.addEventListener('DOMContentLoaded',()=>{
const root=document.getElementById('experiencesRoot'); if(!root) return;
const data=window.KEMO_DATA||[]; const st=window.KEMO_STORAGE; const u=window.KEMO_UTILS; const c='USD';
const grid=document.getElementById('expGrid'); const search=document.getElementById('expSearch');
const card=(p)=>`<article class='glass rounded-2xl overflow-hidden card-hover fade-up' data-reveal><img src='${p.image}' class='h-52 w-full object-cover transition duration-300 hover:scale-105'><div class='p-4'><h3>${p.title}</h3><p>${p.destination}</p><a href='./experience-details.html?id=${p.id}' class='chip'>View Experience</a> <a href='./booking.html?id=${p.id}' class='chip'>Reserve Now</a> <button class='chip' data-w='${p.id}'>Wishlist</button></div></article>`;
function draw(){grid.innerHTML="<div class='shimmer h-20 rounded-xl'></div>";setTimeout(()=>{const q=(search.value||'').toLowerCase();const out=data.filter(x=>x.title.toLowerCase().includes(q));grid.innerHTML=out.map(card).join('')||"<div class='glass p-4'>No journeys yet. Explore luxury experiences to create your first booking.</div>";grid.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const id=+b.dataset.w;const w=st.get('wishlist',[]);st.set('wishlist',w.includes(id)?w.filter(x=>x!==id):[...w,id]);u.showToast('Wishlist updated');});window.KEMO_APP.initScrollReveal();},300)}
search.oninput=draw; draw();
});
