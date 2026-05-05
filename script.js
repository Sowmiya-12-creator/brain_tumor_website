/* script.js — PBEDS Brain Tumor Detection Website */

// ============================
// LOADER
// ============================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initReveal();
    animateMetricCircles();
  }, 1800);
});

// ============================
// NEURAL NETWORK CANVAS
// ============================
(function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createNodes() {
    nodes = [];
    const count = Math.floor((W * H) / 18000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const nodeColor = isDark ? 'rgba(59,158,255,' : 'rgba(59,100,200,';
    const lineColor = isDark ? 'rgba(59,158,255,' : 'rgba(59,100,200,';

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor + '0.6)';
      ctx.fill();
    });

    const maxDist = 120;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.3;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = lineColor + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  createNodes();
  draw();
  window.addEventListener('resize', () => { resize(); createNodes(); });
})();

// ============================
// NAVBAR
// ============================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scroll class
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Active link tracking
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('open');
  if (hamburger.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ============================
// DARK MODE TOGGLE
// ============================
const darkToggle = document.getElementById('darkToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;

darkToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

// ============================
// REVEAL ANIMATION (IntersectionObserver)
// ============================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================
// METRIC CIRCLE ANIMATION
// ============================
function animateMetricCircles() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circles = entry.target.querySelectorAll('.circle-progress');
        circles.forEach(c => {
          const pct = parseFloat(c.style.getPropertyValue('--pct'));
          c.style.strokeDashoffset = `calc(264 - (264 * ${pct} / 100))`;
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const resultsSec = document.getElementById('results');
  if (resultsSec) obs.observe(resultsSec);
}

// ============================
// DEMO — UPLOAD & ANALYSIS
// ============================
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');
const previewImg = document.getElementById('previewImg');
const clearBtn = document.getElementById('clearUpload');
const analyzeBtn = document.getElementById('analyzeBtn');

// Drag & drop
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) handleFile(file);
});
uploadZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) handleFile(fileInput.files[0]);
});

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    previewImg.src = e.target.result;
    uploadZone.style.display = 'none';
    uploadPreview.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

clearBtn.addEventListener('click', () => {
  fileInput.value = '';
  previewImg.src = '';
  uploadPreview.style.display = 'none';
  uploadZone.style.display = 'flex';
  resetResult();
});

// Analysis simulation
const resultPlaceholder = document.getElementById('resultPlaceholder');
const resultOutput = document.getElementById('resultOutput');
const analyzingState = document.getElementById('analyzingState');
const pipelineSteps = [
  document.getElementById('ps1'),
  document.getElementById('ps2'),
  document.getElementById('ps3'),
  document.getElementById('ps4'),
  document.getElementById('ps5'),
];

analyzeBtn.addEventListener('click', () => {
  if (!previewImg.src || previewImg.src === window.location.href) {
    showToast('Please upload an MRI scan first!', 'error');
    return;
  }
  startAnalysis();
});

function startAnalysis() {
  resultPlaceholder.style.display = 'none';
  resultOutput.style.display = 'none';
  analyzingState.style.display = 'block';
  analyzeBtn.disabled = true;
  analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

  // Reset pipeline steps
  pipelineSteps.forEach(s => {
    s.classList.remove('done');
    s.querySelector('i').className = 'fas fa-circle';
  });

  const durations = [600, 900, 1100, 800, 500];
  let total = 0;
  durations.forEach((dur, i) => {
    total += dur;
    setTimeout(() => {
      pipelineSteps[i].classList.add('done');
      pipelineSteps[i].querySelector('i').className = 'fas fa-check-circle';
    }, total - dur + 200);
  });

  setTimeout(() => {
    showResult();
  }, total + 400);
}

const tumorTypes = ['Glioma', 'Meningioma', 'Pituitary Tumor'];
const randomTumor = () => tumorTypes[Math.floor(Math.random() * tumorTypes.length)];
const randomConf = () => (92 + Math.random() * 7).toFixed(1);
const randomTime = () => (1.8 + Math.random() * 0.8).toFixed(2);

function showResult() {
  analyzingState.style.display = 'none';
  resultOutput.style.display = 'block';
  analyzeBtn.disabled = false;
  analyzeBtn.innerHTML = '<i class="fas fa-brain"></i> Analyze MRI Scan';

  const hasTumor = Math.random() > 0.25;
  const tumorType = hasTumor ? randomTumor() : 'N/A';
  const conf = randomConf();
  const time = randomTime();

  const statusEl = document.getElementById('resultStatus');
  statusEl.textContent = hasTumor ? '⚠ Tumor Detected' : '✓ No Tumor Detected';
  statusEl.className = 'result-status ' + (hasTumor ? 'tumor' : 'normal');

  document.getElementById('tumorDetected').textContent = hasTumor ? 'Yes' : 'No';
  document.getElementById('tumorType').textContent = tumorType;
  document.getElementById('confidence').textContent = conf + '%';
  document.getElementById('inferenceTime').textContent = time + 's';

  const confFill = document.getElementById('confFill');
  confFill.style.width = '0%';
  setTimeout(() => { confFill.style.width = conf + '%'; }, 100);
}

function resetResult() {
  resultPlaceholder.style.display = 'block';
  resultOutput.style.display = 'none';
  analyzingState.style.display = 'none';
}

// Download report (simulated)
document.getElementById('downloadReport').addEventListener('click', () => {
  showToast('Report generation requires the backend server. See README for setup.', 'info');
});

// Contact form
document.getElementById('sendMsg').addEventListener('click', () => {
  const inputs = document.querySelectorAll('.form-input');
  let filled = true;
  inputs.forEach(i => { if (!i.value.trim()) { filled = false; i.style.borderColor = 'var(--accent-red)'; } else i.style.borderColor = ''; });
  if (filled) {
    document.getElementById('msgSuccess').style.display = 'flex';
    inputs.forEach(i => { i.value = ''; i.style.borderColor = ''; });
    setTimeout(() => { document.getElementById('msgSuccess').style.display = 'none'; }, 4000);
  } else {
    showToast('Please fill all fields before sending.', 'error');
  }
});

// ============================
// TOAST NOTIFICATIONS
// ============================
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; z-index: 9998;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px 20px;
    font-family: var(--font-body); font-size: 0.85rem;
    color: var(--text); box-shadow: var(--shadow);
    display: flex; align-items: center; gap: 10px;
    max-width: 320px; backdrop-filter: blur(12px);
    animation: toast-in 0.3s ease;
    border-left: 3px solid ${type === 'error' ? 'var(--accent-red)' : type === 'info' ? 'var(--accent-blue)' : 'var(--accent-green)'};
  `;
  const icon = type === 'error' ? 'fa-exclamation-circle' : type === 'info' ? 'fa-info-circle' : 'fa-check-circle';
  const color = type === 'error' ? 'var(--accent-red)' : type === 'info' ? 'var(--accent-blue)' : 'var(--accent-green)';
  toast.innerHTML = `<i class="fas ${icon}" style="color:${color}"></i>${message}`;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = '@keyframes toast-in{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}';
  document.head.appendChild(style);

  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================
// BAR ANIMATIONS (DATASET)
// ============================
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill, .cls-fill').forEach(b => {
        b.style.animationPlayState = 'running';
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.class-dist, .class-bars').forEach(el => {
  el.querySelectorAll('.bar-fill, .cls-fill').forEach(b => b.style.animationPlayState = 'paused');
  barObs.observe(el);
});

// ============================
// SMOOTH SECTION TRANSITIONS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ============================
// PARTICLE CURSOR TRAIL (SUBTLE)
// ============================
(function initCursorTrail() {
  let mouseX = 0, mouseY = 0;
  const particles = [];

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (Math.random() > 0.7) spawnParticle(mouseX, mouseY);
  });

  function spawnParticle(x, y) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:fixed; left:${x}px; top:${y}px;
      width:4px; height:4px; border-radius:50%;
      background:rgba(59,158,255,0.5);
      pointer-events:none; z-index:9997;
      transform:translate(-50%,-50%);
      transition:all 0.8s ease;
    `;
    document.body.appendChild(p);
    particles.push(p);

    requestAnimationFrame(() => {
      p.style.transform = `translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40+20}px) scale(0)`;
      p.style.opacity = '0';
    });

    setTimeout(() => { p.remove(); }, 900);
  }
})();

// ============================
// COUNTER ANIMATION (STATS)
// ============================
function animateCounter(el, target, suffix = '', decimals = 0) {
  const duration = 2000;
  const start = performance.now();
  const startVal = 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (target - startVal) * eased;
    el.textContent = current.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(n => {
        const text = n.textContent;
        if (text.includes('%')) animateCounter(n, parseFloat(text), '%', 1);
        else if (text.includes(',')) animateCounter(n, parseInt(text.replace(',', '')), '', 0);
        else animateCounter(n, parseInt(text), '', 0);
      });
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObs.observe(heroStats);

// ============================
// FLOW STEP HIGHLIGHT
// ============================
const flowSteps = document.querySelectorAll('.flow-step');
flowSteps.forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.08}s`;
});

// ============================
// TECH CARD TILT EFFECT
// ============================
document.querySelectorAll('.tech-card, .feature-card, .future-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(400px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log(`
  ╔══════════════════════════════════════╗
  ║   PBEDS Brain Tumor Detection AI    ║
  ║   Final Year Engineering Project    ║
  ║   2024–2025 | Anna University       ║
  ╚══════════════════════════════════════╝
  All systems initialized. Neural network active.
`);
