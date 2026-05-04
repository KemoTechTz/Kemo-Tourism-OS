(function(){
function currentKey(){const p=location.pathname.split('/').pop()||'index.html';return ({'index.html':'overview','':'overview','experiences.html':'experiences','experience-details.html':'experiences','booking.html':'booking','guest-portal.html':'guest','operator-portal.html':'operator','admin.html':'admin'})[p]||'overview';}
function renderNavbarActiveState(){const key=document.body.dataset.page||currentKey();document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('nav-active',a.dataset.nav===key));}
function initMobileMenu(){const b=document.getElementById('menuBtn'),m=document.getElementById('mobileMenu'); if(!b||!m)return; b.onclick=()=>m.classList.toggle('open');}
function initScrollReveal(){const els=document.querySelectorAll('[data-reveal]'); if(!els.length)return; const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.15}); els.forEach(el=>io.observe(el));}
function initPageEnter(){document.querySelector('main')?.classList.add('page-enter');}
function initBackToTop(){const btn=document.getElementById('backTop'); if(!btn)return; window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>300)); btn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});}
function initNavbarScroll(){const nav=document.querySelector('header'); if(!nav)return; window.addEventListener('scroll',()=>nav.classList.toggle('soft-glow',window.scrollY>10));}
function animateCounters(){document.querySelectorAll('[data-count]').forEach(el=>{const target=+el.dataset.count||0;let n=0;const step=Math.max(1,Math.ceil(target/30));const t=setInterval(()=>{n+=step; if(n>=target){n=target;clearInterval(t)} el.textContent=target>999?n.toLocaleString():n;},20);});}
window.KEMO_APP={renderNavbarActiveState,initMobileMenu,initScrollReveal,initPageEnter,initBackToTop,initNavbarScroll,animateCounters};
document.addEventListener('DOMContentLoaded',()=>{renderNavbarActiveState();initMobileMenu();initScrollReveal();initPageEnter();initBackToTop();initNavbarScroll();animateCounters();});
})();
