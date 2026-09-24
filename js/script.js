document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async (e) => {
  if (form.action.includes('YOUR_FORM_ID')) {
    e.preventDefault();
    formNote.textContent = 'Contact form isn\'t connected yet — see setup instructions.';
    formNote.style.color = '#6E6E5C';
    return;
  }
  e.preventDefault();

  if (window.grecaptcha && grecaptcha.getResponse().length === 0) {
    formNote.textContent = 'Please check the "I\'m not a robot" box before sending.';
    formNote.style.color = '#6E6E5C';
    return;
  }

  const data = new FormData(form);
  formNote.textContent = 'Sending...';
  formNote.style.color = '';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      formNote.textContent = 'Thanks! Your message has been sent.';
      form.reset();
    } else {
      formNote.textContent = 'Something went wrong. Please try again or email us directly.';
    }
  } catch (err) {
    formNote.textContent = 'Something went wrong. Please try again or email us directly.';
  } finally {
    if (window.grecaptcha) grecaptcha.reset();
  }
});
