(function(){
const root=document.getElementById('bookingRoot'); if(!root) return;
const id=new URLSearchParams(location.search).get('id'); const data=window.KEMO_DATA||[]; const st=window.KEMO_STORAGE; const u=window.KEMO_UTILS; const c=localStorage.getItem('currency')||'USD';
const p=data.find(x=>String(x.id)===String(id))||data[0]; if(!p){root.innerHTML='No experience available.';return;}
root.innerHTML=`<h1 class='hfont text-4xl'>Premium Booking Engine</h1><div class='glass p-4 rounded-xl mt-4'><p>${p.title}</p><p>${u.money(p.priceUSD,c)}</p><input id='name' class='bg-slate-900 p-2 rounded w-full my-2' placeholder='Full name'><button id='bookBtn' class='chip'>Confirm Booking</button><div id='confirm' class='mt-2'></div></div>`;
const btn=document.getElementById('bookBtn'); if(btn) btn.onclick=()=>{const name=(document.getElementById('name')||{}).value||'Guest Client'; const ref=u.ref(); st.push('bookings',{ref,name,title:p.title,destination:p.destination,priceUSD:p.priceUSD,status:'Confirmed',paymentStatus:'Paid'}); const cf=document.getElementById('confirm'); if(cf) cf.innerHTML=`Booking Confirmed: ${ref} <a href='guest-portal.html' class='underline'>View Guest Portal</a>`;};
})();
