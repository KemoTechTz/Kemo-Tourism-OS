(function(){
const root=document.getElementById('operatorPortalRoot'); if(!root) return;
const b=window.KEMO_STORAGE.get('bookings',[]);
root.innerHTML=`<h1 class='hfont text-4xl'>Operator Portal</h1><div class='glass p-4 rounded-xl mt-3'>Incoming bookings: ${b.length}</div>`;
})();
