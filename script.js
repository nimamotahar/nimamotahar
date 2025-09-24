// PARTICLES
const colors = ['#fff', '#ffeb3b', '#00bcd4', '#e91e63', '#4caf50'];
const numParticles = 40;
const particles = [];

for(let i=0;i<numParticles;i++){
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random()*8 + 3;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = Math.random()*window.innerWidth + 'px';
  p.style.top = Math.random()*window.innerHeight + 'px';
  p.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
  p.style.opacity = Math.random()*0.6 + 0.4;
  p.dataset.size = size;
  p.vx = (Math.random()-0.5)*1.2;
  p.vy = (Math.random()-0.5)*1.2;

  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.width = size/2 + 'px';
  trail.style.height = size/2 + 'px';
  trail.style.backgroundColor = p.style.backgroundColor;
  trail.style.left = p.style.left;
  trail.style.top = p.style.top;
  document.body.appendChild(trail);
  p.trail = trail;

  document.body.appendChild(p);
  particles.push(p);
}

function animateParticles(){
  particles.forEach(p=>{
    let x = parseFloat(p.style.left);
    let y = parseFloat(p.style.top);

    x += p.vx;
    y += p.vy;

    if(x < 0 || x > window.innerWidth) p.vx *= -1;
    if(y < 0 || y > window.innerHeight) p.vy *= -1;

    p.style.left = x + 'px';
    p.style.top = y + 'px';

    const tx = parseFloat(p.trail.style.left);
    const ty = parseFloat(p.trail.style.top);
    p.trail.style.left = tx + (x - tx) * 0.2 + 'px';
    p.trail.style.top = ty + (y - ty) * 0.2 + 'px';
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

document.addEventListener('mousemove', e=>{
  particles.forEach(p=>{
    const px = parseFloat(p.style.left);
    const py = parseFloat(p.style.top);
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist<120){
      const angle = Math.atan2(dy, dx);
      const force = (120-dist)/120 * 10;
      p.style.transform = `translate(${Math.cos(angle)*force}px, ${Math.sin(angle)*force}px) scale(${1+force/20})`;
      p.trail.style.transform = `translate(${Math.cos(angle)*force*0.5
