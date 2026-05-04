document.addEventListener('DOMContentLoaded',()=>{
const root=document.getElementById('operatorPortalRoot'); if(!root) return;
const b=window.KEMO_STORAGE.get('bookings',[]);document.getElementById('incoming').innerHTML=`<h1 class='hfont text-4xl'>Operator Portal</h1><div class='my-2'><a class='chip' href='#incoming'>View Incoming Bookings</a> <a class='chip' href='#expmanage'>Manage Experiences</a> <a class='chip' href='./admin.html'>Open Admin Command Center</a></div><div class='glass p-3'>Incoming: ${b.length}</div>`;document.getElementById('expmanage').innerHTML="<div class='glass p-3 mt-3'>Experience management section</div>";
});
