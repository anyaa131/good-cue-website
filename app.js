const DATA_URL = '/data/site.json';

function esc(value) {
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[ch]);
}

function list(items) {
  return (items || []).map(item => `<li>${esc(item)}</li>`).join('');
}

async function loadSite() {
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('site.json could not be loaded');
    const d = await res.json();

    document.title = `${d.site.name} | ${d.site.subtitle}`;
    document.querySelector('meta[name="description"]').setAttribute('content', d.site.description);
    const logo = document.querySelector('.brand img');
    logo.src = d.site.logo;
    logo.alt = d.site.logo_alt || d.site.name;

    document.querySelector('[data-nav-offers]').textContent = d.navigation.offers;
    document.querySelector('[data-nav-about]').textContent = d.navigation.about;
    document.querySelector('[data-nav-contact]').textContent = d.navigation.contact;

    const h = d.hero;
    document.querySelector('[data-hero-eyebrow]').textContent = h.eyebrow;
    document.querySelector('[data-hero-title]').textContent = h.title;
    document.querySelector('[data-hero-text]').textContent = h.text;
    document.querySelector('[data-hero-primary]').textContent = h.primary_button;
    document.querySelector('[data-hero-secondary]').textContent = h.secondary_button;
    document.querySelector('[data-hero-kicker]').textContent = h.card_kicker;
    document.querySelector('[data-hero-card-title]').textContent = h.card_title;
    document.querySelector('[data-hero-card-text]').textContent = h.card_text;

    document.querySelector('[data-offers-eyebrow]').textContent = d.offers.eyebrow;
    document.querySelector('[data-offers-title]').textContent = d.offers.title;
    document.querySelector('[data-offers-intro]').textContent = d.offers.intro;
    document.querySelector('[data-offers-note]').textContent = d.offers.small_note;
    const detailPages = [
      '/erste-hilfe.html',
      '/notfallmedizin.html',
      '/kommunikation-team.html'
    ];
    document.querySelector('[data-service-cards]').innerHTML = d.offers.items.map((item, index) => {
      const href = detailPages[index];
      return `
        <article class="service-card">
          <div class="card-number">${esc(item.number)}</div>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
          <ul>${list(item.bullets)}</ul>
          <a class="card-link" href="${href}">Mehr erfahren <span aria-hidden="true">→</span></a>
        </article>
      `;
    }).join('');

    document.querySelector('[data-approach-eyebrow]').textContent = d.approach.eyebrow;
    document.querySelector('[data-approach-title]').textContent = d.approach.title;
    document.querySelector('[data-approach-text]').textContent = d.approach.text;
    document.querySelector('[data-values]').innerHTML = d.approach.values.map(v => `<div><strong>${esc(v.label)}</strong><span>${esc(v.text)}</span></div>`).join('');

    document.querySelector('[data-brand-eyebrow]').textContent = d.brand_section.eyebrow;
    document.querySelector('[data-brand-title]').textContent = d.brand_section.title;
    document.querySelector('[data-brand-text]').textContent = d.brand_section.text;

    document.querySelector('[data-contact-eyebrow]').textContent = d.contact.eyebrow;
    document.querySelector('[data-contact-title]').textContent = d.contact.title;
    document.querySelector('[data-contact-text]').textContent = d.contact.text;
    document.querySelector('[data-contact-label]').textContent = d.contact.label;
    const mail = document.querySelector('[data-email]');
    mail.textContent = d.site.email;
    mail.href = `mailto:${d.site.email}`;
    document.querySelector('[data-contact-note]').textContent = d.contact.placeholder_note;

    document.querySelector('[data-imprint-title]').textContent = d.legal.imprint_title;
    document.querySelector('[data-imprint-body]').textContent = d.legal.imprint_body;
    document.querySelector('[data-privacy-title]').textContent = d.legal.privacy_title;
    document.querySelector('[data-privacy-body]').textContent = d.legal.privacy_body;

    const statsSection = document.querySelector('#zahlen');
    if (d.stats?.enabled) {
      document.querySelector('[data-stats]').innerHTML = d.stats.items.map(s => `
        <article class="stat-card"><strong>${esc(s.number)}</strong><p>${esc(s.text)}</p></article>
      `).join('');
      document.querySelector('[data-stats-note]').textContent = d.stats.source_note;
      statsSection.hidden = false;
    } else {
      statsSection.hidden = true;
    }

    document.querySelectorAll('[data-current-name]').forEach(el => el.textContent = d.site.name);
    document.querySelector('[data-footer-subtitle]').textContent = d.site.subtitle;
  } catch (err) {
    console.error(err);
    document.body.classList.add('content-load-error');
  }
}

document.addEventListener('DOMContentLoaded', loadSite);
