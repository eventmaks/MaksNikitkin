(()=>{
  const body=document.body;
  const splash=document.getElementById('splash-screen');
  const title=document.getElementById('splash-title');
  const canvas=document.getElementById('smoke-canvas');
  if(!body||!splash||!title||!canvas)return;

  let timers=[];
  let raf=0;
  let startedAt=0;
  let gl=null,program=null,buffer=null;
  let uniforms={};
  let reduced=false;
  let dpr=1;
  let smokeSeed=Math.random()*10;

  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
  const later=(fn,ms)=>timers.push(setTimeout(fn,ms));
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=(a,b,x)=>{x=clamp((x-a)/(b-a),0,1);return x*x*(3-2*x)};

  function splitTitle(){
    if(title.dataset.split==='1')return;
    const text=(title.textContent||'Соберите свой вечер').trim();
    title.textContent='';
    title.dataset.split='1';
    text.split(/\s+/).forEach((word,wi)=>{
      const ws=document.createElement('span');
      ws.className='splash-word';ws.setAttribute('aria-hidden','true');
      [...word].forEach((ch,ci)=>{
        const s=document.createElement('span');
        s.className='splash-letter';s.textContent=ch;s.setAttribute('aria-hidden','true');
        const n=wi*17+ci;
        const side=n%2?1:-1;
        s.style.setProperty('--letter-x',`${side*(7+(n%5)*4)}px`);
        s.style.setProperty('--letter-y',`${-(24+(n%7)*4)}px`);
        s.style.setProperty('--letter-rot',`${side*(.6+(n%4)*.65)}deg`);
        s.style.setProperty('--letter-scale',`${1.035+(n%4)*.018}`);
        s.style.setProperty('--letter-delay',`${(n%7)*38}ms`);
        s.style.setProperty('--letter-dur',`${700+(n%5)*55}ms`);
        ws.appendChild(s);
      });
      title.appendChild(ws);
    });
  }

  const vertex=`
    attribute vec2 a_position;
    void main(){gl_Position=vec4(a_position,0.0,1.0);}
  `;
  const fragment=`
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_intensity;
    uniform float u_focus;
    uniform float u_seed;

    float hash(vec2 p){
      vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));
      p3+=dot(p3,p3.yxz+33.33);
      return fract((p3.x+p3.y)*p3.z);
    }
    float noise(vec2 p){
      vec2 i=floor(p),f=fract(p);
      f=f*f*(3.0-2.0*f);
      float a=hash(i);
      float b=hash(i+vec2(1.0,0.0));
      float c=hash(i+vec2(0.0,1.0));
      float d=hash(i+vec2(1.0,1.0));
      return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
    }
    float fbm4(vec2 p){
      float v=0.0;
      float a=.53;
      mat2 r=mat2(.80,.60,-.60,.80);
      for(int i=0;i<4;i++){
        v+=a*noise(p);
        p=r*p*2.03+vec2(17.13,9.17);
        a*=.50;
      }
      return v;
    }
    float fbm5(vec2 p){
      float v=0.0;
      float a=.52;
      mat2 r=mat2(.78,.63,-.63,.78);
      for(int i=0;i<5;i++){
        v+=a*noise(p);
        p=r*p*2.01+vec2(11.70,7.90);
        a*=.50;
      }
      return v;
    }
    float plume(vec2 uv,vec2 c,vec2 s){
      vec2 d=(uv-c)/s;
      return exp(-dot(d,d)*1.42);
    }

    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution.xy;
      float aspect=u_resolution.x/u_resolution.y;
      vec2 p=vec2((uv.x-.5)*aspect,uv.y-.5);
      float t=u_time;
      float seed=u_seed;

      // Buoyancy: smoke rises, while low-frequency turbulence pushes it sideways.
      vec2 q=p*1.82;
      q.y-=t*.115;
      q.x+=sin(q.y*1.55+t*.31+seed*2.0)*.055;

      float curlA=fbm4(q*.78+vec2(t*.032+seed*3.1,4.7));
      float curlB=fbm4(q*.82+vec2(8.1+seed*4.3,-t*.027));
      vec2 curl=vec2(curlA-.5,curlB-.5);
      q+=curl*1.58;

      // Two differently moving density layers keep the cloud from looking like one flat texture.
      vec2 q2=q*1.07+vec2(.29*sin(t*.21+seed),-.16*cos(t*.17+seed*2.0));
      float broadA=fbm5(q*.78+vec2(seed*5.7,-t*.038));
      float broadB=fbm4(q2*.92+vec2(6.2+seed*2.4,-t*.072));
      float detail=fbm4(q*2.05+curl*.86+vec2(-t*.072,t*.025+seed));
      float filament=fbm4(q*4.55+curl*1.15+vec2(t*.11,-t*.19+seed*8.0));

      // Real smoke has rounded billows with torn, semi-transparent boundaries and internal voids.
      float billow=1.0-abs(detail*2.0-1.0);
      billow=billow*billow;
      float field=broadA*.46+broadB*.26+detail*.20+billow*.08;
      float holes=fbm4(q*2.75+vec2(13.7+seed*6.0,-t*.13));
      field-=smoothstep(.58,.84,holes)*.13;

      // Emission comes from the lower sides and rolls through the title region during the transition.
      float env=0.0;
      env+=plume(uv,vec2(.02,.06),vec2(.31,.62))*.72;
      env+=plume(uv,vec2(.98,.05),vec2(.31,.62))*.72;
      env+=plume(uv,vec2(.23,.24),vec2(.34,.40))*.38;
      env+=plume(uv,vec2(.77,.23),vec2(.34,.40))*.38;
      env+=plume(uv,vec2(.50,.43),vec2(.55,.31))*(.20+u_focus*.82);
      env=clamp(env,0.0,1.30);

      // Slightly different thresholds make a dense body, translucent rolling edge and hair-thin wisps.
      float driven=field+env*.105;
      float body=smoothstep(.44,.67,driven)*env;
      float core=smoothstep(.57,.77,driven)*env;
      float edge=max(body-core,0.0);
      float wisps=smoothstep(.61,.78,filament+broadA*.17+env*.08)*smoothstep(.08,.76,env);
      wisps*=1.0-smoothstep(.48,.88,core);
      float smoke=clamp(core*.96+edge*.72+wisps*.25,0.0,1.0);

      // Pseudo-volume lighting: bright rolling fronts, darker overlapping interiors.
      float lightField=fbm4(q*.93+vec2(-.24,.19)+vec2(seed*1.9,0.0));
      float shade=clamp((lightField-broadA)*1.55+.50,0.0,1.0);
      float fineShade=clamp((filament-detail)*.62+.50,0.0,1.0);
      float lit=smoothstep(.18,.86,shade*.76+fineShade*.24);

      vec3 shadow=vec3(.285,.292,.300);
      vec3 mid=vec3(.455,.465,.475);
      vec3 highlight=vec3(.675,.685,.692);
      vec3 grey=mix(shadow,mid,lit);
      grey=mix(grey,highlight,smoothstep(.62,1.0,lit)*edge*.72);

      // Dense regions remain translucent; edges disappear first, like real dissipating smoke.
      float alpha=(core*.47+edge*.31+wisps*.105)*(.20+u_intensity*.94);
      alpha*=mix(.80,1.0,smoothstep(.20,.66,env));
      alpha*=smoothstep(0.0,.035,uv.y)*smoothstep(1.0,.955,uv.y);
      alpha=clamp(alpha,0.0,.62);

      gl_FragColor=vec4(grey,alpha);
    }
  `;

  function shader(type,src){
    const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s)||'shader compile');
    return s;
  }
  function initGL(){
    try{
      gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false,preserveDrawingBuffer:false});
      if(!gl)return false;
      const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);
      program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'program link');
      gl.useProgram(program);
      buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const loc=gl.getAttribLocation(program,'a_position');
      gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
      uniforms.res=gl.getUniformLocation(program,'u_resolution');
      uniforms.time=gl.getUniformLocation(program,'u_time');
      uniforms.intensity=gl.getUniformLocation(program,'u_intensity');
      uniforms.focus=gl.getUniformLocation(program,'u_focus');
      uniforms.seed=gl.getUniformLocation(program,'u_seed');
      gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
      return true;
    }catch(e){gl=null;return false;}
  }
  function resize(){
    const scale=window.innerWidth<=640?.72:.86;
    dpr=Math.min(window.devicePixelRatio||1,1.6)*scale;
    const w=Math.max(1,Math.round(innerWidth*dpr)),h=Math.max(1,Math.round(innerHeight*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';}
    if(gl)gl.viewport(0,0,w,h);
  }
  function smokeLevel(ms){
    const s=ms/1000;
    if(s<.22)return smooth(0,.22,s)*.28;
    if(s<1.20)return .28+.025*Math.sin(s*2.3);
    if(s<1.75)return .30+smooth(1.20,1.75,s)*.66;
    if(s<2.20)return .96;
    if(s<2.95)return .96*(1-smooth(2.20,2.95,s));
    return 0;
  }
  function focusLevel(ms){
    const s=ms/1000;
    if(s<1.05)return .08;
    if(s<1.70)return .08+smooth(1.05,1.70,s)*.92;
    if(s<2.25)return 1.0;
    return 1.0-smooth(2.25,2.90,s);
  }
  function render(now){
    if(!gl||!startedAt)return;
    const ms=now-startedAt;
    resize();
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(uniforms.res,canvas.width,canvas.height);
    gl.uniform1f(uniforms.time,ms/1000);
    gl.uniform1f(uniforms.intensity,smokeLevel(ms));
    gl.uniform1f(uniforms.focus,focusLevel(ms));
    gl.uniform1f(uniforms.seed,smokeSeed);
    gl.drawArrays(gl.TRIANGLES,0,6);
    if(ms<3150)raf=requestAnimationFrame(render);else raf=0;
  }

  function reset(){
    clearTimers();
    if(raf){cancelAnimationFrame(raf);raf=0}
    body.classList.remove('splash-show','splash-leave','splash-reveal','splash-fade','splash-done');
    body.classList.add('splash-active');
    splash.removeAttribute('hidden');
    startedAt=0;
    if(gl){resize();gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT)}
  }
  function finish(){
    body.classList.remove('splash-active','splash-show','splash-leave','splash-reveal','splash-fade');
    body.classList.add('splash-done');
    splash.setAttribute('hidden','');
    if(raf){cancelAnimationFrame(raf);raf=0}
  }
  function play(){
    reset();splitTitle();smokeSeed=Math.random()*10;reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){
      requestAnimationFrame(()=>{body.classList.add('splash-show');later(()=>body.classList.add('splash-reveal'),1750);later(()=>body.classList.add('splash-fade'),2300);later(finish,1250)});
      return;
    }
    if(!gl)initGL();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      startedAt=performance.now();
      body.classList.add('splash-show');
      if(gl)raf=requestAnimationFrame(render);
      later(()=>body.classList.add('splash-leave'),1250);
      later(()=>body.classList.add('splash-reveal'),1750);
      later(()=>body.classList.add('splash-fade'),2300);
      later(finish,3000);
    }));
  }
  function start(){if(document.visibilityState==='visible')play();else document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')play()},{once:true});}

  splitTitle();
  addEventListener('resize',resize,{passive:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  addEventListener('pageshow',e=>{if(e.persisted)play()});
})();
