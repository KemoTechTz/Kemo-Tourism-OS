(function(){
const root=document.getElementById('adminRoot'); if(!root) return;
const st=window.KEMO_STORAGE, u=window.KEMO_UTILS, c=localStorage.getItem('currency')||'USD';
const b=st.get('bookings',[]);
root.innerHTML=`<h1 class='hfont text-4xl'>Admin Command Center</h1><div class='glass p-4 rounded-xl mt-3 overflow-auto'><table class='w-full text-sm'><tr><th>Reference</th><th>Guest</th><th>Experience</th><th>Amount</th><th>Status</th></tr>${b.map((x,i)=>`<tr><td>${x.ref||'-'}</td><td>${u.guest(x)}</td><td>${x.title||'-'}</td><td>${u.money(x.priceUSD,c)}</td><td><select data-s='${i}'><option ${x.status==='Confirmed'?'selected':''}>Confirmed</option><option ${x.status==='Pending'?'selected':''}>Pending</option><option ${x.status==='Completed'?'selected':''}>Completed</option><option ${x.status==='Cancelled'?'selected':''}>Cancelled</option></select></td></tr>`).join('')}</table></div>`;
root.querySelectorAll('[data-s]').forEach(sel=>sel.onchange=()=>{const i=+sel.dataset.s; const all=st.get('bookings',[]); if(all[i]){all[i].status=sel.value; st.set('bookings',all); u.toast('Status updated');}})
})();
