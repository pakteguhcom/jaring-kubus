/* ============ LAB MAYA — MENGENAL JARING-JARING KUBUS ============ */
(function(){
  "use strict";

  /* --------- TAB NAVIGATION + LOCK LOGIC --------- */
  const visited = { tujuan:false, panduan:false };
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const simTab = document.getElementById('tab-simulasi');

  /* --------- SIDEBAR TOGGLE --------- */
  const sbToggle = document.getElementById('sidebarToggle');
  if(sbToggle){
    sbToggle.addEventListener('click', ()=>{
      document.body.classList.toggle('sb-collapsed');
      document.getElementById('sidebar').classList.toggle('collapsed');
    });
    if(window.innerWidth < 900){
      document.body.classList.add('sb-collapsed');
      document.getElementById('sidebar').classList.add('collapsed');
    }
  }

  function setActive(name){
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab===name));
    panels.forEach(p => p.classList.toggle('active', p.id===('panel-'+name)));
    window.scrollTo({top:0, behavior:'smooth'});
    if(name==='tujuan') visited.tujuan = true;
    if(name==='panduan') visited.panduan = true;
    if(visited.tujuan && visited.panduan) simTab.classList.remove('locked');
  }
  const initialActive = document.querySelector('.tab.active');
  if(initialActive){
    const n = initialActive.dataset.tab;
    if(n==='tujuan') visited.tujuan = true;
    if(n==='panduan') visited.panduan = true;
  }
  tabs.forEach(t => t.addEventListener('click', ()=>{
    const target = t.dataset.tab;
    if(target==='simulasi' && t.classList.contains('locked')){
      t.animate([
        {transform:'translateX(0)'},{transform:'translateX(-6px)'},
        {transform:'translateX(6px)'},{transform:'translateX(0)'}
      ], {duration:280});
      showToast('Buka menu Tujuan dan Panduan Simulasi terlebih dahulu.');
      return;
    }
    setActive(target);
  }));
  document.querySelectorAll('[data-goto]').forEach(b => {
    b.addEventListener('click', ()=> setActive(b.dataset.goto));
  });
  document.getElementById('btn-open-sim').addEventListener('click', ()=>{
    if(simTab.classList.contains('locked')) return;
    setActive('simulasi');
  });

  function showToast(msg){
    let t = document.getElementById('toast');
    if(!t){
      t = document.createElement('div');
      t.id='toast';
      Object.assign(t.style,{
        position:'fixed',left:'50%',bottom:'32px',transform:'translateX(-50%)',
        background:'#0f2137',color:'#fff',padding:'12px 20px',borderRadius:'12px',
        fontWeight:'700',boxShadow:'0 10px 30px rgba(0,0,0,.25)',zIndex:9999,
        transition:'opacity .3s', opacity:'0'
      });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity='1';
    clearTimeout(t._to);
    t._to = setTimeout(()=>{ t.style.opacity='0'; }, 2400);
  }

  /* --------- 11 CUBE NETS DEFINITIONS --------- */
  const NETS = [
    { id:1, type:'1-4-1', cells:[
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},{f:'B',r:1,c:3},
      {f:'U',r:0,c:1},{f:'D',r:2,c:1}
    ]},
    { id:2, type:'1-4-1', cells:[
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},{f:'B',r:1,c:3},
      {f:'U',r:0,c:1},{f:'D',r:2,c:2}
    ]},
    { id:3, type:'1-4-1', cells:[
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},{f:'B',r:1,c:3},
      {f:'U',r:0,c:1},{f:'D',r:2,c:3}
    ]},
    { id:4, type:'1-4-1', cells:[
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},{f:'B',r:1,c:3},
      {f:'U',r:0,c:2},{f:'D',r:2,c:2}
    ]},
    { id:5, type:'1-4-1', cells:[
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},{f:'B',r:1,c:3},
      {f:'U',r:0,c:2},{f:'D',r:2,c:3}
    ]},
    { id:6, type:'1-4-1', cells:[
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},{f:'B',r:1,c:3},
      {f:'U',r:0,c:0},{f:'D',r:2,c:3}
    ]},
    { id:7, type:'1-3-2', cells:[
      {f:'U',r:0,c:1},
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},
      {f:'D',r:2,c:2},{f:'B',r:2,c:3}
    ]},
    { id:8, type:'1-3-2', cells:[
      {f:'U',r:0,c:0},
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},
      {f:'D',r:2,c:2},{f:'B',r:2,c:3}
    ]},
    { id:9, type:'1-3-2', cells:[
      {f:'U',r:0,c:2},
      {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},
      {f:'D',r:2,c:2},{f:'B',r:2,c:3}
    ]},
    { id:10, type:'2-2-2', cells:[
      {f:'U',r:0,c:0},{f:'L',r:0,c:1},
      {f:'F',r:1,c:1},{f:'R',r:1,c:2},
      {f:'D',r:2,c:2},{f:'B',r:2,c:3}
    ]},
    { id:11, type:'3-3', cells:[
      {f:'B',r:0,c:0},{f:'L',r:0,c:1},{f:'F',r:0,c:2},
      {f:'D',r:1,c:2},{f:'R',r:1,c:3},{f:'U',r:1,c:4}
    ]}
  ];

  const FACE_COLORS = {
    F:{fill:'#c9dfff',stroke:'#0b57c2',text:'#083a86',label:'Depan'},
    B:{fill:'#ffd6e5',stroke:'#b53071',text:'#6b1740',label:'Belakang'},
    U:{fill:'#fde3b8',stroke:'#c8630b',text:'#6b3d00',label:'Atas'},
    D:{fill:'#c6ead8',stroke:'#12764c',text:'#0a4a2c',label:'Bawah'},
    L:{fill:'#e0d6ff',stroke:'#4b34c8',text:'#2c1a86',label:'Kiri'},
    R:{fill:'#ffd4b8',stroke:'#c8560b',text:'#6a2f00',label:'Kanan'}
  };

  /* --------- NET PICKER (SVG previews) --------- */
  const netGrid = document.getElementById('netGrid');
  NETS.forEach((net) => {
    const card = document.createElement('div');
    card.className = 'net-card';
    card.dataset.id = net.id;
    const rows = Math.max(...net.cells.map(x=>x.r)) + 1;
    const cols = Math.max(...net.cells.map(x=>x.c)) + 1;
    const s = 22, pad = 4;
    const w = cols*s + pad*2, h = rows*s + pad*2;
    let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
    net.cells.forEach(cell => {
      const col = FACE_COLORS[cell.f];
      svg += `<rect x="${pad+cell.c*s}" y="${pad+cell.r*s}" width="${s}" height="${s}"
              fill="${col.fill}" stroke="${col.stroke}" stroke-width="1.4" rx="2"/>`;
    });
    svg += `</svg>`;
    card.innerHTML = svg + `<div class="lbl">Pola ${net.id} · ${net.type}</div>`;
    card.addEventListener('click', ()=> selectNet(net.id));
    netGrid.appendChild(card);
  });

  /* --------- 3D CUBE / HINGE FOLD (nested wrappers) --------- */
  const scene   = document.getElementById('scene');
  const cubeEl  = document.getElementById('cube');
  const foldSl  = document.getElementById('foldSlider');
  const foldVal = document.getElementById('foldVal');
  const netInfo = document.getElementById('netInfo');
  const FACE_SIZE = 96;
  const H = FACE_SIZE/2;

  let currentNet = null;
  let sceneRot = { x:-22, y:-32 };
  scene.style.transform = `rotateX(${sceneRot.x}deg) rotateY(${sceneRot.y}deg)`;

  // Auto-scale the scene so the flat net (pattern 11 is widest = 5 cells)
  // fits comfortably inside the viewport, avoiding clipping.
  function fitSceneScale(){
    const wrap = document.getElementById('sceneWrap') || scene.parentElement;
    if(!wrap) return;
    const availW = wrap.clientWidth  - 40;
    const availH = wrap.clientHeight - 40;
    // Widest flat extent is 5 * FACE_SIZE (pattern 11); tallest is 3 * FACE_SIZE.
    const needW = 5 * FACE_SIZE;
    const needH = 3 * FACE_SIZE + 40;
    const s = Math.min(1, availW/needW, availH/needH);
    scene.style.setProperty('--scene-scale', s.toFixed(3));
  }
  window.addEventListener('resize', fitSceneScale);
  setTimeout(fitSceneScale, 0);

  // Build BFS tree from F. Each node knows its (dc,dr) from parent and children.
  function buildTree(net){
    const key = (r,c)=> r+','+c;
    const map = new Map();
    net.cells.forEach(c => map.set(key(c.r,c.c),
      { r:c.r, c:c.c, f:c.f, parent:null, dc:0, dr:0, children:[] }));
    const F = net.cells.find(x => x.f==='F');
    const root = map.get(key(F.r,F.c));
    const q = [root]; const seen = new Set([key(F.r,F.c)]);
    while(q.length){
      const n = q.shift();
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{
        const nk = key(n.r+dr, n.c+dc);
        if(map.has(nk) && !seen.has(nk)){
          seen.add(nk);
          const ch = map.get(nk);
          ch.parent = n; ch.dc = dc; ch.dr = dr;
          n.children.push(ch);
          q.push(ch);
        }
      });
    }
    const rs = net.cells.map(c=>c.r), cs = net.cells.map(c=>c.c);
    const rC = (Math.min(...rs)+Math.max(...rs))/2;
    const cC = (Math.min(...cs)+Math.max(...cs))/2;
    return { root, flatOffset:{ x:(cC-F.c)*FACE_SIZE, y:(rC-F.r)*FACE_SIZE } };
  }

  // Build a DOM tree of nested hinge-wrappers so each child's rotation
  // naturally composes in its parent-face's local frame.
  function buildDOM(node, parent){
    // Face element (positioned at wrapper origin = face center).
    const face = document.createElement('div');
    face.className = 'face f-' + ({F:'front',B:'back',U:'top',D:'bottom',L:'left',R:'right'})[node.f];
    face.style.width = FACE_SIZE+'px';
    face.style.height = FACE_SIZE+'px';
    face.style.marginLeft = (-H)+'px';
    face.style.marginTop  = (-H)+'px';
    face.textContent = FACE_COLORS[node.f].label;
    parent.appendChild(face);
    node._face = face;
    // For each child: a hinge-wrapper sits at the shared edge center,
    // rotates about that edge, then holds the child's DOM subtree.
    node.children.forEach(ch => {
      const hinge = document.createElement('div');
      hinge.className = 'hinge';
      // Position hinge origin at edge midpoint relative to parent face center.
      hinge.style.left = (ch.dc * H) + 'px';
      hinge.style.top  = (ch.dr * H) + 'px';
      parent.appendChild(hinge);
      // Wrapper for child face: offset another half-edge past the hinge,
      // so child face center sits at (dc*FACE_SIZE, dr*FACE_SIZE) from parent center.
      const inner = document.createElement('div');
      inner.className = 'hinge-inner';
      inner.style.left = (ch.dc * H) + 'px';
      inner.style.top  = (ch.dr * H) + 'px';
      hinge.appendChild(inner);
      ch._hinge = hinge;
      buildDOM(ch, inner);
    });
  }

  function selectNet(id){
    currentNet = NETS.find(n=>n.id===id);
    currentNet._tree = buildTree(currentNet);
    cubeEl.innerHTML = '';
    buildDOM(currentNet._tree.root, cubeEl);
    document.querySelectorAll('.net-card').forEach(c=>{
      c.classList.toggle('active', +c.dataset.id===id);
    });
    netInfo.textContent = `Pola ${currentNet.id} — Tipe ${currentNet.type}. Geser slider atau tekan Lipat.`;
    foldSl.value = 0;
    applyFold(0);
  }

  function walkApply(node, angle){
    node.children.forEach(ch => {
      const rot = ch.dc !== 0
        ? `rotateY(${-ch.dc * angle}deg)`
        : `rotateX(${ ch.dr * angle}deg)`;
      ch._hinge.style.transform = rot;
      walkApply(ch, angle);
    });
  }

  function applyFold(pct){
    if(!currentNet){
      foldVal.textContent = Math.round(pct) + '%';
      foldSl.style.setProperty('--pct', pct + '%');
      return;
    }
    const t = pct/100;
    const angle = 90 * t;
    const { root, flatOffset } = currentNet._tree;
    // Shift so flat net is centered when unfolded; cube center hits origin when folded.
    const cx = -flatOffset.x * (1 - t);
    const cy = -flatOffset.y * (1 - t);
    const cz = -H * t;
    cubeEl.style.transform = `translate3d(${cx}px, ${cy}px, ${cz}px)`;
    fitSceneScale();
    walkApply(root, angle);
    foldVal.textContent = Math.round(pct) + '%';
    foldSl.style.setProperty('--pct', pct + '%');
  }

  foldSl.addEventListener('input', ()=> applyFold(+foldSl.value));

  document.getElementById('btnFold').addEventListener('click', ()=>{
    if(!currentNet){ showToast('Pilih pola jaring-jaring dulu.'); return; }
    animateFold(+foldSl.value, 100);
  });
  document.getElementById('btnUnfold').addEventListener('click', ()=>{
    if(!currentNet){ showToast('Pilih pola jaring-jaring dulu.'); return; }
    animateFold(+foldSl.value, 0);
  });
  document.getElementById('btnRotate').addEventListener('click', ()=>{
    sceneRot.y += 45;
    scene.style.transform = `rotateX(${sceneRot.x}deg) rotateY(${sceneRot.y}deg)`;
  });

  // Ease-in-out cubic gives a natural paper-folding feel.
  function animateFold(from, to){
    const dur = 1800;
    const start = performance.now();
    const ease = p => p<0.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2,3)/2;
    function step(now){
      const p = Math.min(1, (now-start)/dur);
      const v = from + (to-from)*ease(p);
      foldSl.value = Math.round(v);
      applyFold(v);
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  applyFold(0);
  selectNet(1);

  /* --------- QUIZ --------- */
  const QUIZ = [
    {
      type:'mcq',
      title:'Berapa banyak pola jaring-jaring kubus yang berbeda?',
      opts:['8 pola','10 pola','11 pola','12 pola'],
      answer:2,
      explain:'Jawaban benar: 11 pola. Terdiri dari 6 pola tipe 1-4-1, 3 pola tipe 1-3-2, 1 pola tipe 2-2-2, dan 1 pola tipe 3-3.'
    },
    {
      type:'mcq',
      title:'Jaring-jaring kubus tersusun atas berapa buah persegi yang kongruen?',
      opts:['4','5','6','8'],
      answer:2,
      explain:'Kubus memiliki 6 sisi berbentuk persegi yang kongruen.'
    },
    {
      type:'mcq-svg',
      title:'Perhatikan pola berikut. Apakah pola ini merupakan jaring-jaring kubus?',
      svgCells:[ {f:'L',r:1,c:0},{f:'F',r:1,c:1},{f:'R',r:1,c:2},{f:'B',r:1,c:3},
                 {f:'U',r:0,c:1},{f:'D',r:2,c:1} ],
      opts:['Ya, merupakan jaring-jaring kubus','Bukan jaring-jaring kubus'],
      answer:0,
      explain:'Pola tersebut adalah jaring-jaring tipe 1-4-1 (Latin Cross) dan merupakan salah satu dari 11 jaring-jaring kubus.'
    },
    {
      type:'mcq-svg',
      title:'Perhatikan pola berikut. Apakah pola ini merupakan jaring-jaring kubus?',
      svgCells:[ {f:'F',r:0,c:0},{f:'F',r:0,c:1},{f:'F',r:0,c:2},{f:'F',r:0,c:3},
                 {f:'F',r:1,c:0},{f:'F',r:1,c:1} ],
      opts:['Ya, merupakan jaring-jaring kubus','Bukan jaring-jaring kubus'],
      answer:1,
      explain:'Pola tipe 4-2 ini bukan jaring-jaring kubus. Jika dilipat, akan ada dua sisi yang saling menutupi.'
    },
    {
      type:'mcq',
      title:'Sebuah kubus memiliki panjang rusuk 6 cm. Berapakah luas permukaan kubus tersebut?',
      opts:['36 cm²','96 cm²','216 cm²','360 cm²'],
      answer:2,
      explain:'Luas permukaan = 6 × s² = 6 × 6² = 6 × 36 = 216 cm².'
    },
    {
      type:'mcq',
      title:'Jaring-jaring kubus dengan susunan dua baris masing-masing 3 persegi termasuk tipe?',
      opts:['Tipe 1-4-1','Tipe 1-3-2','Tipe 2-2-2','Tipe 3-3'],
      answer:3,
      explain:'Susunan dua baris berisi 3 persegi termasuk tipe 3-3, dan hanya ada 1 pola untuk tipe ini.'
    }
  ];

  const quizBox = document.getElementById('quiz');
  function renderQuiz(){
    quizBox.innerHTML = '';
    QUIZ.forEach((q,i) => {
      const card = document.createElement('div');
      card.className = 'q-card';
      let bodyHTML = '';
      if(q.type==='mcq-svg'){
        const rows = Math.max(...q.svgCells.map(x=>x.r)) + 1;
        const cols = Math.max(...q.svgCells.map(x=>x.c)) + 1;
        const s = 26, pad = 4;
        const w = cols*s + pad*2, h = rows*s + pad*2;
        let svg = `<svg class="q-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
        q.svgCells.forEach(cell => {
          const col = FACE_COLORS[cell.f];
          svg += `<rect x="${pad+cell.c*s}" y="${pad+cell.r*s}" width="${s}" height="${s}"
                  fill="${col.fill}" stroke="${col.stroke}" stroke-width="1.6" rx="3"/>`;
        });
        svg += `</svg>`;
        bodyHTML = svg;
      }
      const opts = q.opts.map((o,oi)=>
        `<label class="opt" data-oi="${oi}">
           <input type="radio" name="q${i}" value="${oi}"/>
           <span>${o}</span>
         </label>`
      ).join('');
      card.innerHTML = `
        <div class="q-head">
          <div class="q-num">${i+1}</div>
          <div class="q-title">${q.title}</div>
        </div>
        <div class="q-body">
          ${bodyHTML}
          <div class="opts">${opts}</div>
          <div class="q-explain"><b>Pembahasan:</b> ${q.explain}</div>
        </div>`;
      quizBox.appendChild(card);
    });
  }
  renderQuiz();

  document.getElementById('btnCheck').addEventListener('click', ()=>{
    let correct = 0;
    QUIZ.forEach((q,i)=>{
      const card = quizBox.children[i];
      const chosen = card.querySelector(`input[name="q${i}"]:checked`);
      card.classList.add('answered');
      card.querySelectorAll('.opt').forEach(op => op.classList.remove('correct','wrong'));
      const opts = card.querySelectorAll('.opt');
      opts[q.answer].classList.add('correct');
      if(chosen){
        const val = +chosen.value;
        if(val===q.answer) correct++;
        else opts[val].classList.add('wrong');
      }
    });
    const pct = Math.round(correct/QUIZ.length*100);
    let msg = '';
    if(pct===100) msg='🏆 Sempurna! Kamu hebat!';
    else if(pct>=80) msg='🌟 Bagus sekali!';
    else if(pct>=60) msg='👍 Cukup baik, terus berlatih.';
    else msg='💪 Ayo pelajari kembali materinya.';
    document.getElementById('score').textContent = `Skor: ${correct}/${QUIZ.length} (${pct}%) — ${msg}`;
  });
  document.getElementById('btnReset').addEventListener('click', ()=>{
    renderQuiz();
    document.getElementById('score').textContent = '';
  });

})();
