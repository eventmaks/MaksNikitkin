(()=>{
  const prefersReduced=()=>window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last=0;

  function showWow(x,y){
    const now=performance.now();
    if(now-last<80)return;
    last=now;

    const el=document.createElement('span');
    el.className='wow-pop';
    el.textContent='Wow';
    document.body.appendChild(el);

    const r=el.getBoundingClientRect();
    const pad=10;
    const px=Math.max(pad,Math.min(window.innerWidth-r.width-pad,x-r.width/2));
    const py=Math.max(pad,Math.min(window.innerHeight-r.height-pad,y-r.height/2));
    el.style.left=px+'px';
    el.style.top=py+'px';

    if(prefersReduced()){
      el.animate([
        {opacity:0,transform:'translateY(2px) scale(.92)'},
        {opacity:1,transform:'translateY(0) scale(1)',offset:.25},
        {opacity:0,transform:'translateY(-10px) scale(1.01)'}
      ],{duration:420,easing:'ease-out',fill:'forwards'}).finished.finally(()=>el.remove());
      return;
    }

    const tilt=(Math.random()*10-5).toFixed(1);
    const drift=(Math.random()*12-6).toFixed(1);
    el.animate([
      {opacity:0,transform:`translate(0,5px) rotate(${tilt}deg) scale(.72)`,filter:'blur(2px)'},
      {opacity:1,transform:`translate(0,-2px) rotate(${tilt}deg) scale(1.04)`,filter:'blur(0)',offset:.28},
      {opacity:.92,transform:`translate(${drift}px,-11px) rotate(${tilt}deg) scale(1)`,filter:'blur(0)',offset:.62},
      {opacity:0,transform:`translate(${drift}px,-26px) rotate(${tilt}deg) scale(.96)`,filter:'blur(1.4px)'}
    ],{duration:720,easing:'cubic-bezier(.18,.8,.2,1)',fill:'forwards'}).finished.finally(()=>el.remove());
  }

  window.addEventListener('pointerdown',e=>{
    if(e.button!==undefined&&e.button!==0)return;
    showWow(e.clientX,e.clientY);
  },{passive:true});
})();
