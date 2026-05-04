(function(){
const root=document.getElementById('detailsRoot'); if(!root) return;
const id=new URLSearchParams(location.search).get('id'); const data=window.KEMO_DATA||[]; const u=window.KEMO_UTILS; const c=localStorage.getItem('currency')||'USD';
const p=data.find(x=>String(x.id)===String(id))||data[0]; if(!p){root.innerHTML='No experience data.';return;}
root.innerHTML=`<div class='h-[45vh] bg-cover bg-center rounded-2xl' style='background-image:url(${p.image})'></div><h1 class='hfont text-4xl mt-4'>${p.title}</h1><p>${p.destination} • ⭐ ${p.rating} (${p.reviews})</p><p class='text-amber-300 text-2xl'>From ${u.money(p.priceUSD,c)} / guest</p><a class='chip' href='booking.html?id=${p.id}'>Reserve Experience</a>`;
})();
