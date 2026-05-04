(function(){
  const safeParse=(v,f)=>{try{return JSON.parse(v);}catch{return f;}};
  window.KEMO_STORAGE={
    get:(k,f)=>safeParse(localStorage.getItem(k),f),
    set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)),
    push:(k,val)=>{const arr=safeParse(localStorage.getItem(k),[]);arr.push(val);localStorage.setItem(k,JSON.stringify(arr));}
  };
})();
