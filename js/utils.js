(function(){
  const fx=1600;
  window.KEMO_UTILS={
    money:(n,c)=>c==='USD'?`$${Number(n||0).toLocaleString()}`:`TZS ${(Number(n||0)*fx).toLocaleString()}`,
    guest:(x)=>x&&x.name&&x.name.trim()?x.name:'Guest Client',
    ref:()=>`KEMO-OS-${Math.floor(10000+Math.random()*89999)}`,
    toast:(m)=>{const d=document.createElement('div');d.className='fixed top-4 right-4 glass px-4 py-2 rounded-xl z-50';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),1600);}
  }
})();
