// ============================================
// ALPINE CREST CAPITAL – INTERACTIVITY
// Dark mode, mobile menu, valuation calculator,
// form submission, NDA download, toast, AOS init
// ============================================

// Initialize AOS (scroll animations)
AOS.init({ duration: 800, once: true, offset: 100 });

// ---------- DARK / LIGHT MODE ----------
const themeToggle = document.getElementById('themeToggle');
const darkIcon = document.getElementById('darkIcon');
const lightIcon = document.getElementById('lightIcon');
const html = document.documentElement;

// Load saved preference or system preference
const savedTheme = localStorage.getItem('alpine-theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
  updateIcons(savedTheme === 'dark');
} else {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  updateIcons(systemPrefersDark);
}

function updateIcons(isDark) {
  if (darkIcon) darkIcon.style.display = isDark ? 'none' : 'inline-block';
  if (lightIcon) lightIcon.style.display = isDark ? 'inline-block' : 'none';
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('alpine-theme', next);
  updateIcons(next === 'dark');
});

// ---------- MOBILE MENU ----------
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  // Close mobile menu when a link is clicked
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ---------- STICKY NAVBAR SHADOW ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ---------- VALUATION CALCULATOR ----------
const monthlyProfitInput = document.getElementById('monthlyProfit');
const multiplierSelect = document.getElementById('multiplier');
const calculateBtn = document.getElementById('calculateBtn');
const calcResult = document.getElementById('calcResult');

function calculateValuation() {
  const monthly = parseFloat(monthlyProfitInput.value);
  if (isNaN(monthly) || monthly <= 0) {
    calcResult.innerHTML = 'Please enter a valid monthly profit.';
    return;
  }
  const multiplier = parseFloat(multiplierSelect.value);
  const annual = monthly * 12;
  const valuation = annual * multiplier;
  calcResult.innerHTML = `Estimated valuation: $${valuation.toLocaleString()} USD (${multiplier}x annual profit)`;
}

if (calculateBtn) {
  calculateBtn.addEventListener('click', calculateValuation);
  calculateValuation(); // initial calculation
}

// ---------- SUBMISSION FORM (simulate email) ----------
const form = document.getElementById('acquisitionForm');
const toast = document.getElementById('toast');

function showToast(message) {
  if (toast) {
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const businessName = document.getElementById('businessName').value.trim();
    const website = document.getElementById('websiteUrl').value.trim();
    const monthlyRevenue = document.getElementById('monthlyRevenue').value.trim();
    const industry = document.getElementById('industry').value;
    const askingPrice = document.getElementById('askingPrice').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!businessName || !website || !monthlyRevenue || !industry || !askingPrice || !email || !description) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate back-end submission (mailto fallback)
    const subject = encodeURIComponent(`Acquisition Inquiry: ${businessName}`);
    const body = encodeURIComponent(
      `Business: ${businessName}\nWebsite: ${website}\nMonthly Revenue: $${monthlyRevenue}\nIndustry: ${industry}\nAsking Price: $${askingPrice}\nContact Email: ${email}\nDescription: ${description}`
    );
    // In production, replace with fetch POST to your server
    window.location.href = `mailto:deals@alpinecrestcapital.com?subject=${subject}&body=${body}`;
    
    showToast('Acquisition request submitted. Our team will respond within 48 hours.');
    form.reset();
    calculateValuation();
  });
}

// ---------- NDA DOWNLOAD (simulated PDF) ----------
 function downloadCV(e) {
        e.preventDefault();
        const a = document.createElement('a');
        a.href = encodeURI('assets/professional_Confidentiality_NDA.pdf');
        a.download = 'professional_Confidentiality_NDA.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    document.getElementById('download-cv-btn')?.addEventListener('click', downloadCV);
    document.getElementById('download-cv-exp')?.addEventListener('click', downloadCV);
    
