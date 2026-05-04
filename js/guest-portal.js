(function(){
const root=document.getElementById('guestPortalRoot'); if(!root) return;
const b=window.KEMO_STORAGE.get('bookings',[]); const w=window.KEMO_STORAGE.get('wishlist',[]); const u=window.KEMO_UTILS;
root.innerHTML=`<h1 class='hfont text-4xl'>Guest Travel Portal</h1><div class='glass p-4 rounded-xl mt-3'>Bookings: ${b.length} • Saved: ${w.length}</div><div class='glass p-4 rounded-xl mt-3'>${b.map((x,i)=>`<div>${x.ref||'-'} • ${u.guest(x)} • ${x.title||'-'} • ${x.status||'Pending'} <button data-c='${i}' class='underline'>Cancel</button></div>`).join('')||'No bookings yet.'}</div>`;
root.querySelectorAll('[data-c]').forEach(btn=>btn.onclick=()=>{const i=+btn.dataset.c; const all=window.KEMO_STORAGE.get('bookings',[]); if(all[i]){all[i].status='Cancelled'; window.KEMO_STORAGE.set('bookings',all); location.reload();}})
})();
