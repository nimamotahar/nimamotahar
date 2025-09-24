/* ===== PARTICLES SYSTEM ===== */
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

/* ===== CARD TOGGLE ===== */
const learnBtn = document.getElementById('learn-more');
const cardContent = document.querySelector('.card-content');
const defaultHTML = cardContent.innerHTML;

function showMore() {
  learnBtn.style.opacity = 0; // fade out Learn More
  setTimeout(() => {
    learnBtn.style.display = 'none';
    cardContent.style.opacity = 0;

    setTimeout(() => {
      cardContent.innerHTML = `
        <h1 class="typing-header"></h1>
        <p class="fade-paragraph">👋 Nima here | ex-architect working in tech 💻 | Feel free to say hi!</p>
        <a href="#" class="button pulse-button" id="back-btn">Back</a>
      `;
      const header = cardContent.querySelector('.typing-header');
      const paragraph = cardContent.querySelector('.fade-paragraph');
      const backBtn = cardContent.querySelector('#back-btn');

      cardContent.style.opacity = 1;

      // Typing animation
      const text = "👋 Nima here";
      let i = 0;
      function type() {
        if (i < text.length) {
          header.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, 100);
        }
      }
      type();

      // Cursor interaction
      setupCursorEffect([header, paragraph, backBtn]);

      // Back button
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cardContent.style.opacity = 0;
        setTimeout(() => {
          cardContent.innerHTML = defaultHTML;
          learnBtn.style.display = 'inline-block';
          setTimeout(() => learnBtn.style.opacity = 1, 50);
        }, 300);
      });

    }, 300);
  }, 300);
}

learnBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showMore();
});

/* ===== CURSOR EFFECT ===== */
function setupCursorEffect(elements) {
  function moveHandler(e) {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 100){
        const angle = Math.atan2(dy, dx);
        const force = (100 - dist)/100 * 5;
        el.style.transform = `translate(${Math.cos(angle)*force}px, ${Math.sin(angle)*force}px) scale(${1 + force/100})`;
        el.style.textShadow = `0 0 ${force*1.5}px #fff`;
      } else {
        el.style.transform = 'translate(0,0) scale(1)';
        el.style.textShadow = '';
      }
    });
  }
  document.addEventListener('mousemove', moveHandler, { once: false });
}
