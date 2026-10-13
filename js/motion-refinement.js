(()=>{
 const screen=document.getElementById('screen');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,hero=null,ball=null,cord=null,effects=[],origin=0;
 function stop(){cancelAnimationFrame(frame);frame=0}
 function tick(now){
  if(!hero?.isConnected||document.hidden||reduced.matches){stop();return}
  if(!origin)origin=now;
  const t=(now-origin)*Math.PI*2/14000;
  const x=24*Math.sin(t),y=9*Math.sin(2*t),r=3*Math.sin(t);
  ball.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${r.toFixed(2)} 1546 200)`);
  cord.setAttribute('d',`M1531 0 Q${1533+x*.35} 60 ${1536+x} ${115+y}`);
  effects.forEach(el=>el.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)})`));
  frame=requestAnimationFrame(tick);
 }
 function sync(){
  stop();hero=screen.querySelector('.indie-hero');
  ball=hero?.querySelector('.original-ball-motion');cord=hero?.querySelector('.original-ball-cord');
  effects=hero?[...hero.querySelectorAll('.disco-effects,.orbit-effects')]:[];
  if(ball&&cord&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);
 }
 new MutationObserver(sync).observe(screen,{childList:true});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
})();
