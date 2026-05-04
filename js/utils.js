(function(){
  const fx=1600;
  function showToast(message){const d=document.createElement('div');d.className='fixed top-4 right-4 glass px-4 py-2 rounded-xl z-50 fade-up';d.textContent=message;document.body.appendChild(d);setTimeout(()=>d.remove(),1800)}
  function openModal(content){const m=document.getElementById('globalModal'); if(!m) return; m.innerHTML=`<div class='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4'><div class='glass rounded-2xl p-5 max-w-lg w-full modal-enter'>${content}<button id='closeModalBtn' class='chip mt-4'>Close</button></div></div>`; m.querySelector('#closeModalBtn').onclick=()=>{m.innerHTML='';};}
  window.KEMO_UTILS={money:(n,c)=>c==='USD'?`$${Number(n||0).toLocaleString()}`:`TZS ${(Number(n||0)*fx).toLocaleString()}`,guest:(x)=>x&&x.name&&x.name.trim()?x.name:'Guest Client',title:(x)=>x&&x.title?x.title:'Luxury Tanzania Experience',dest:(x)=>x&&x.destination?x.destination:'Tanzania',amount:(x)=>Number(x&&x.priceUSD||0),pay:(x)=>x&&x.paymentStatus?x.paymentStatus:'Pending',status:(x)=>x&&x.status?x.status:'Pending',ref:()=>`KEMO-OS-${Math.floor(10000+Math.random()*89999)}`,showToast,openModal};
})();
