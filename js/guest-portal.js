document.addEventListener('DOMContentLoaded',()=>{
const root=document.getElementById('guestPortalRoot'); if(!root) return;
const u=window.KEMO_UTILS,st=window.KEMO_STORAGE; const b=st.get('bookings',[]);
root.innerHTML=`<h1 class='hfont text-4xl'>Guest Travel Portal</h1><div class='my-3'><a class='chip' href='./experiences.html'>Browse Experiences</a> <a class='chip' href='./booking.html'>Open Booking Engine</a></div><div id='list' class='space-y-2'></div>`;
const list=document.getElementById('list');
function draw(){const all=st.get('bookings',[]);list.innerHTML=all.length?all.map((x,i)=>`<div class='glass p-3 rounded-xl'>${x.ref||'-'} • ${u.guest(x)} • ${u.title(x)} <span class='chip'>${u.status(x)}</span> <button data-v='${i}' class='chip'>View Invoice</button> <button data-c='${i}' class='chip'>Cancel</button></div>`).join(''):`<div class='glass p-4'>No journeys yet. Explore luxury experiences to create your first booking.</div>`;list.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{if(!confirm('Cancel this booking?'))return;const i=+b.dataset.c;const a=st.get('bookings',[]);if(a[i]){a[i].status='Cancelled';st.set('bookings',a);draw();}});list.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const i=+b.dataset.v;const x=st.get('bookings',[])[i]||{};u.openModal(`<h3 class='hfont text-2xl'>Invoice</h3><p>${u.guest(x)} • ${u.title(x)}</p><p>${u.money(u.amount(x),'USD')}</p>`);});}
 draw();
});
