(function(){
  window.KEMO_APP={
    initNav: function(){
      const cur=document.getElementById('currencyToggle');
      const mode=document.getElementById('modeToggle');
      const currency=localStorage.getItem('currency')||'USD';
      if(cur){cur.textContent=currency;cur.onclick=()=>{const n=(localStorage.getItem('currency')||'USD')==='USD'?'TZS':'USD';localStorage.setItem('currency',n);location.reload();};}
      if(mode){mode.onclick=()=>document.documentElement.classList.toggle('dark');}
    }
  };
  document.addEventListener('DOMContentLoaded',()=>window.KEMO_APP.initNav());
})();
