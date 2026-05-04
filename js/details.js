document.addEventListener('DOMContentLoaded',()=>{
const root=document.getElementById('detailsRoot'); if(!root) return;
const id=new URLSearchParams(location.search).get('id');const p=(window.KEMO_DATA||[]).find(x=>String(x.id)===String(id))||(window.KEMO_DATA||[])[0]; if(!p){root.innerHTML='No experience data.';return;}
root.innerHTML=`<a href='./experiences.html' class='chip'>Back to Experiences</a><div class='grid lg:grid-cols-3 gap-4 mt-4'><div class='lg:col-span-2'><img src='${p.image}' class='rounded-2xl h-80 w-full object-cover hover:scale-[1.02] transition'><h1 class='hfont text-4xl mt-3'>${p.title}</h1></div><aside class='glass p-4 rounded-2xl sticky top-24 h-fit'><a href='./booking.html?id=${p.id}' class='chip soft-glow'>Reserve Experience</a><button id='quoteBtn' class='chip mt-2'>Request Custom Quote</button></aside></div>`;
const q=document.getElementById('quoteBtn'); if(q) q.onclick=()=>window.KEMO_UTILS.showToast('Custom quote request saved in demo mode.');
});
