(function(){
const root=document.getElementById('experiencesRoot'); if(!root) return;
const data=window.KEMO_DATA||[]; const st=window.KEMO_STORAGE; const u=window.KEMO_UTILS; const c=localStorage.getItem('currency')||'USD';
const card=(p)=>`<article class='glass rounded-2xl overflow-hidden'><img src='${p.image}' class='h-52 w-full object-cover'><div class='p-4'><h3 class='font-semibold'>${p.title}</h3><p class='text-sm'>${p.destination} • ${p.category} • ${p.duration} days</p><p>⭐ ${p.rating} (${p.reviews})</p><p class='text-amber-300'>${u.money(p.priceUSD,c)}</p><a href='experience-details.html?id=${p.id}' class='chip'>View Experience</a> <a href='booking.html?id=${p.id}' class='chip'>Reserve Now</a> <button data-w='${p.id}' class='chip'>Wishlist</button></div></article>`;
const grid=document.getElementById('expGrid'); const search=document.getElementById('expSearch');
function draw(){const q=(search&&search.value||'').toLowerCase(); const out=data.filter(x=>x.title.toLowerCase().includes(q)); grid.innerHTML=out.map(card).join('')||"<div class='glass p-4'>No experiences found.</div>";grid.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const id=+b.dataset.w;const w=st.get('wishlist',[]);st.set('wishlist',w.includes(id)?w.filter(x=>x!==id):[...w,id]);u.toast('Wishlist updated');});}
if(search) search.oninput=draw; draw();
})();
