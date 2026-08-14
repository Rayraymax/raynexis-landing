const RAYNEXIS_KEY = 'raynexis-platform-v1';
const API_BASE = String(window.RAYNEXIS_API_URL || '').replace(/\/$/, '');
const backendEnabled = Boolean(API_BASE && !API_BASE.includes('YOUR-RAILWAY'));

const defaultData = {
  settings: {
    company: 'Raynexis Solutions',
    tagline: 'Technology. Solutions. Future.',
    phone: '0707 938 295',
    whatsapp: '254707938295',
    email: 'rayraymax49@gmail.com',
    address: 'Nairobi, Kenya',
    heroEyebrow: 'TECHNOLOGY · INNOVATION · IMPACT',
    heroTitle: 'Technology that keeps your business <span>running.</span>',
    heroDescription: 'Reliable ICT support, fleet intelligence, secure systems, and digital solutions built for ambitious Kenyan businesses.',
    facebook: 'https://www.facebook.com/raynexissolutions',
    instagram: 'https://www.instagram.com/raynexissolutions',
    tiktok: 'https://www.tiktok.com/@raynexissolutions'
  },

  services: [
    {
      id: 'fleet',
      title: 'Fleet & Telematics',
      category: 'Fleet',
      icon: 'radio-tower',
      description: 'GPS tracking, speed limiter installation, fuel monitoring, and actionable fleet visibility.',
      price: 'KES 15,000',
      shortDescription: 'Real-time tracking, route optimization, driver behavior monitoring and comprehensive fleet reports.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85',
      altText: 'Fleet of trucks on a highway',
      features: ['Live vehicle tracking', 'Geofencing and alerts', 'Fuel and route reporting'],
      published: true
    },
    {
      id: 'digital',
      title: 'Digital & Brand',
      category: 'Digital',
      icon: 'palette',
      description: 'Content, brand identity, social media, and campaigns that make your business memorable.',
      price: 'KES 25,000',
      shortDescription: 'Tailored web and mobile applications designed to streamline your operations and drive growth.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
      altText: 'Developer working on a digital product',
      published: true
    },
    {
      id: 'technology',
      title: 'Technology & Insight',
      category: 'Technology',
      icon: 'code-2',
      description: 'Web, ICT support, analytics, and advisory systems that turn operations into momentum.',
      price: 'KES 30,000',
      shortDescription: 'Reliable IT systems, cloud solutions, network management and enterprise support you can count on.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
      altText: 'Blue-lit server racks in a data centre',
      published: true
    },
    {
      id: 'gps',
      title: 'GPS Fleet Tracking',
      category: 'Fleet',
      icon: 'map-pin',
      description: 'Real-time fleet visibility, route history, geofencing, and driver performance reporting.',
      price: 'KES 15,000',
      published: true
    },
    {
      id: 'security',
      title: 'Security Systems & CCTV',
      category: 'Technology',
      icon: 'shield-check',
      description: 'Protect your premises with smart CCTV, access control, and alarm solutions.',
      price: 'KES 18,000',
      published: true
    },
    {
      id: 'web',
      title: 'Web Development',
      category: 'Technology',
      icon: 'globe-2',
      description: 'Modern, responsive websites and web platforms designed to convert and grow.',
      price: 'KES 30,000',
      published: true
    },
    {
      id: 'support',
      title: 'Managed ICT Support',
      category: 'Technology',
      icon: 'headphones',
      description: 'Proactive monitoring, helpdesk support, and IT management for productive teams.',
      price: 'KES 20,000 / month',
      published: true
    },
    {
      id: 'social',
      title: 'Social Media Campaigns',
      category: 'Digital',
      icon: 'megaphone',
      description: 'A consistent content system that builds awareness and qualified demand.',
      price: 'KES 20,000',
      published: true
    }
  ],

  projects: [
    {
      id: 'project-1',
      title: 'Fleet visibility programme',
      client: 'Uzima Logistics',
      description: 'GPS, fuel monitoring, and reporting for a growing logistics operation.',
      image: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe83?auto=format&fit=crop&w=1200&q=85',
      results: ['28% reduction in fuel costs', '35% faster deliveries', '100% fleet visibility'],
      published: true
    },
    {
      id: 'project-2',
      title: 'Secure premises rollout',
      client: 'Naivas Retail',
      description: 'A coordinated CCTV and access-control deployment for a Nairobi SME.',
      image: 'https://images.unsplash.com/photo-1601598851547-4302969d9c7c?auto=format&fit=crop&w=1200&q=85',
      results: ['99.9% system uptime', '40% faster issue resolution', '20% lower support costs'],
      published: true
    }
  ],

  testimonials: [
    {
      id: 'testimonial-1',
      title: 'Brian Mwangi · Head of Operations',
      description: 'Raynexis has been instrumental in strengthening our security and IT infrastructure. Their team is responsive, professional and truly dependable.',
      published: true
    }
  ],

  team: [
    {
      id: 'team-1',
      title: 'Raymond · Founder',
      description: 'Client strategy, technology delivery, and partner success.',
      published: true
    }
  ],

  pages: [
    {
      id: 'page-home',
      title: 'Home',
      description: 'Hero, pillars, trust strip, proof, and footer.',
      slug: '/',
      seoTitle: 'Raynexis Solutions | Technology that keeps your business running',
      seoDescription: 'Reliable technology, fleet intelligence, and digital solutions built for ambitious Kenyan businesses.',
      sections: [
        { id: 'hero', label: 'Hero', type: 'hero', visible: true, data: { headline: 'Technology that keeps your business running', subheadline: 'Raynexis delivers smart tracking, custom software and reliable IT solutions that help you operate efficiently, reduce costs and stay ahead of the competition.' } },
        { id: 'trust', label: 'Trust logos', type: 'trust', visible: true, data: { logos: ['Modern Coast', 'Uzima Logistics', 'Kenchem', 'naivas', 'Britam'] } },
        { id: 'pillars', label: 'Pillars', type: 'pillars', visible: true, data: {} },
        { id: 'stats', label: 'Stats band', type: 'stats', visible: true, data: { stats: [{ value: '200+', label: 'Deployments' }, { value: '24/7', label: 'Support' }, { value: '5+', label: 'Years' }] } },
        { id: 'cases', label: 'Case studies', type: 'cases', visible: true, data: {} },
        { id: 'cta', label: 'CTA band', type: 'cta', visible: true, data: { headline: 'Let’s power your business forward.', body: 'Get expert advice and a tailored solution for your needs.' } }
      ],
      published: true
    },
    {
      id: 'page-services',
      title: 'Services',
      description: 'Filterable service catalogue and contact panel.',
      published: true
    },
    {
      id: 'page-contact',
      title: 'Contact',
      description: 'Qualifying inquiry form and WhatsApp conversion path.',
      published: true
    }
  ],

  inquiries: [
    {
      id: 'demo-1',
      name: 'Brian Mwangi',
      phone: '0712 345 678',
      email: 'brian@example.com',
      service: 'Security Systems & CCTV',
      fleet: '—',
      message: 'Looking for CCTV and access control for a new office.',
      status: 'New',
      created: '2026-08-11T08:24:00Z'
    },
    {
      id: 'demo-2',
      name: 'Amina Hassan',
      phone: '0722 456 789',
      email: 'amina@example.com',
      service: 'Web Development',
      fleet: '—',
      message: 'We need a modern website for our logistics company.',
      status: 'Contacted',
      created: '2026-08-09T11:15:00Z'
    },
    {
      id: 'demo-3',
      name: 'David Kariuki',
      phone: '0701 223 344',
      email: 'david@example.com',
      service: 'Fleet & Telematics',
      fleet: '25 vehicles',
      message: 'Please share the fleet audit process and timeline.',
      status: 'Won',
      created: '2026-08-05T14:40:00Z'
    }
  ]
};


function getData() {
  try {
    const stored = JSON.parse(localStorage.getItem(RAYNEXIS_KEY));

    if (!stored) {
      return structuredClone(defaultData);
    }

    return {
      ...structuredClone(defaultData),
      ...stored,
      settings: {
        ...defaultData.settings,
        ...(stored.settings || {})
      }
    };
  } catch {
    return structuredClone(defaultData);
  }
}


function cacheData(data) {
  localStorage.setItem(RAYNEXIS_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('raynexis-data-updated'));
}


async function apiRequest(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  const token = sessionStorage.getItem('raynexis-admin-token');

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || 'Request failed.');
  }

  return body;
}


function saveData(data) {
  cacheData(data);

  if (backendEnabled && document.querySelector('[data-admin]')) {
    void apiRequest('/api/admin/state', {
      method: 'PUT',
      body: JSON.stringify(data)
    }).catch(error => {
      console.error(
        'Could not save admin changes:',
        error.message
      );
    });
  }
}


function esc(value = '') {
  return String(value).replace(
    /[&<>'"]/g,
    char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#039;',
      '"': '&quot;'
    }[char])
  );
}


function icon(name, size = 19) {
  return `<i data-lucide="${name}" width="${size}" height="${size}"></i>`;
}


function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 1.8
      }
    });
  }
}


function waLink(
  message = 'Hello Raynexis Solutions, I would like to learn more about your services.'
) {
  return `https://wa.me/${getData().settings.whatsapp}?text=${encodeURIComponent(message)}`;
}


function phoneLink() {
  return `tel:+${getData().settings.whatsapp}`;
}


function formatDate(iso) {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(iso));
}


function hydrateSite() {
  const data = getData();
  const { settings } = data;

  const page = (data.pages || []).find(item => item.published && (item.slug === location.pathname.replace(/\\/g, '/') || (location.pathname.endsWith('index.html') && item.slug === '/')));
  if (page?.seoTitle) document.title = page.seoTitle;
  if (page?.seoDescription) document.querySelector('meta[name="description"]')?.setAttribute('content', page.seoDescription);

  document.querySelectorAll('[data-setting]').forEach(el => {
    const key = el.dataset.setting;

    if (settings[key] !== undefined) {
      el.innerHTML = settings[key];
    }
  });

  document.querySelectorAll('[data-phone-link]').forEach(el => {
    el.href = phoneLink();
    el.textContent = settings.phone;
  });

  document.querySelectorAll('[data-wa-link]').forEach(el => {
    el.href = waLink(el.dataset.waMessage || settings.whatsappMessage);
  });

  document.querySelectorAll('[data-email-link]').forEach(el => {
    el.href = `mailto:${settings.email}`;
    el.textContent = settings.email;
  });

  document.querySelectorAll('[data-social]').forEach(el => {
    if (settings[el.dataset.social]) {
      el.href = settings[el.dataset.social];
    }
  });

  const testimonial = data.testimonials?.find(
    item => item.published
  );

  if (testimonial) {
    const quote = document.querySelector(
      '[data-testimonial-copy]'
    );

    const author = document.querySelector(
      '[data-testimonial-author]'
    );

    if (quote) {
      quote.textContent = `“${testimonial.description}”`;
    }

    if (author) {
      author.textContent =
        testimonial.title.split('·')[0].trim();
    }
  }
}


function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  toggle?.addEventListener('click', () => {
    nav.classList.toggle('open');

    toggle.setAttribute(
      'aria-expanded',
      nav.classList.contains('open')
    );
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}


function renderPillars() {
  const host = document.querySelector('[data-pillars]');

  if (!host) return;

  const pillars = getData().services.filter(
    item =>
      ['fleet', 'digital', 'technology'].includes(item.id) &&
      item.published
  );

  host.innerHTML = pillars
    .map(
      item => `
        <article class="pillar-card">
          ${item.image ? `<img class="pillar-image" src="${esc(item.image)}" alt="${esc(item.altText || item.title)}" loading="lazy">` : ''}
          <div class="pillar-icon">
            ${icon(item.icon, 27)}
          </div>

          <div>
            <h3>${esc(item.title)}</h3>

            <p>${esc(item.description)}</p>

            <a
              class="text-link"
              href="services.html?category=${encodeURIComponent(item.category)}"
            >
              Explore pillar ${icon('arrow-up-right', 16)}
            </a>
          </div>
        </article>
      `
    )
    .join('');

  renderIcons();
}


function renderServices(filter = 'All') {
  const host = document.querySelector(
    '[data-services-grid]'
  );

  if (!host) return;

  const data = getData();

  const services = data.services.filter(
    item =>
      item.published &&
      (filter === 'All' || item.category === filter)
  );

  host.innerHTML =
    services
      .map(
        item => `
          <article class="service-card">
            ${item.image ? `<div class="service-image"><img src="${esc(item.image)}" alt="${esc(item.altText || item.title)}" loading="lazy"></div>` : ''}
            <div class="service-top">
              <div class="service-icon">
                ${icon(item.icon, 25)}
              </div>

              <span class="pill blue">
                ${esc(item.category)}
              </span>
            </div>

            <h3>${esc(item.title)}</h3>

            <p>${esc(item.description)}</p>

            <div class="price-row">
              <span>
                Starting from
                <strong>${esc(item.price)}</strong>
              </span>

              <a
                class="text-link"
                href="contact.html?service=${encodeURIComponent(item.title)}"
              >
                Request quote ${icon('arrow-right', 16)}
              </a>
            </div>
          </article>
        `
      )
      .join('') ||
    '<p class="muted">No published services in this category yet.</p>';

  renderIcons();
}


function initServices() {
  if (!document.querySelector('[data-services-grid]')) {
    return;
  }

  renderServices();

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document
        .querySelectorAll('[data-filter]')
        .forEach(item => item.classList.remove('active'));

      button.classList.add('active');

      renderServices(button.dataset.filter);
    });
  });

  const param = new URLSearchParams(location.search)
    .get('category');

  if (param) {
    const button = [
      ...document.querySelectorAll('[data-filter]')
    ].find(item => item.dataset.filter === param);

    button?.click();
  }
}

function renderHomeSections() {
  const data = getData();
  const homePage = (data.pages || []).find(page => page.slug === '/') || data.pages?.[0];
  const section = type => homePage?.sections?.find(item => item.type === type)?.data || {};
  const sectionVisible = type => homePage?.sections?.find(item => item.type === type)?.visible !== false;
  const setSectionVisible = (type, selector) => { const element = document.querySelector(selector); if (element) element.hidden = !sectionVisible(type); };
  setSectionVisible('hero', '.hero'); setSectionVisible('trust', '.trust-strip'); setSectionVisible('pillars', '.hero-cards'); setSectionVisible('stats', '.impact'); setSectionVisible('cases', '.case-band'); setSectionVisible('cta', '.home-cta');
  const heroData = section('hero');
  if (heroData.headline) document.querySelector('[data-setting="heroTitle"]')?.replaceChildren(document.createTextNode(heroData.headline));
  if (heroData.subheadline) document.querySelector('[data-setting="heroDescription"]')?.replaceChildren(document.createTextNode(heroData.subheadline));
  const trustHost = document.querySelector('[data-home-trust]');
  if (trustHost) trustHost.innerHTML = (section('trust').logos || ['Safaricom', 'EQUITY', 'KCB', 'Britam', 'NCBA', 'Bata']).map(logoName => `<span>${esc(logoName)}</span>`).join('');
  const statsHost = document.querySelector('.impact-grid');
  const configuredStats = section('stats').stats || [];
  if (statsHost && configuredStats.length) {
    const quote = statsHost.querySelector('.quote-card')?.outerHTML || '';
    statsHost.innerHTML = configuredStats.slice(0, 3).map((stat, index) => `<article class="stat-card"><i data-lucide="${['rocket', 'headphones', 'shield-check'][index]}" width="34"></i><strong>${esc(stat.value)}</strong><h3>${esc(stat.label)}</h3><p>${esc(stat.description || '')}</p></article>`).join('') + quote;
  }
  const ctaData = section('cta');
  const cta = document.querySelector('.home-cta');
  if (ctaData.headline && cta) { cta.querySelector('h2').textContent = ctaData.headline; cta.querySelector('p').textContent = ctaData.body || ''; }
  const serviceHost = document.querySelector('[data-home-services]');
  if (serviceHost) {
    serviceHost.innerHTML = data.services.filter(item => item.published).slice(0, 3).map(item => `<article class="home-service-card"><div class="home-service-image">${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.altText || item.title)}" loading="lazy">` : icon(item.icon, 28)}</div><div class="home-service-copy"><span class="eyebrow">${esc(item.category)}</span><h3>${esc(item.title)}</h3><p>${esc(item.shortDescription || item.description)}</p><div class="home-service-meta"><strong>${esc(item.price || 'Talk to us')}</strong><a class="text-link" href="contact.html?service=${encodeURIComponent(item.title)}">Explore ${icon('arrow-up-right', 15)}</a></div></div></article>`).join('');
  }
  const caseHost = document.querySelector('[data-home-cases]');
  if (caseHost) {
    caseHost.innerHTML = (data.projects || []).filter(item => item.published).slice(0, 2).map(item => `<article class="home-case-card">${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy">` : ''}<div><span class="eyebrow">${esc(item.client || 'Case study')}</span><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="case-results">${(item.results || []).slice(0, 3).map(result => `<span>${esc(result)}</span>`).join('')}</div></div></article>`).join('');
  }
  renderIcons();
}


function initContactForm() {
  const form = document.querySelector(
    '[data-contact-form]'
  );

  if (!form) return;

  const service = new URLSearchParams(location.search)
    .get('service');

  if (service) {
    const serviceField = form.querySelector(
      '[name="service"]'
    );

    if (serviceField) {
      serviceField.value = service;
    }
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const status = form.querySelector('.form-status');

    if (!form.reportValidity()) {
      return;
    }

    const payload = Object.fromEntries(
      new FormData(form)
    );

    if (backendEnabled) {
      try {
        await apiRequest('/api/inquiries', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      } catch (error) {
        status.textContent = error.message;
        return;
      }
    } else {
      const data = getData();
      data.inquiries.unshift({ ...payload, id: `inq-${Date.now()}`, status: 'New', created: new Date().toISOString() });
      saveData(data);
    }

    try {
      const lead = new URLSearchParams(
        new FormData(form)
      );

      lead.set('form-name', 'contact-lead');

      await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded'
        },
        body: lead.toString()
      });
    } catch {
      // Netlify collects this form after deployment.
    }

    status.textContent =
      'Thanks — we’ll get back to you shortly.';

    form.classList.add('submitted');
    form.reset();

    const message =
      `Hello Raynexis Solutions, I am ${payload.name}. ` +
      `I need help with ${payload.service || 'your services'}. ` +
      `${payload.message || ''}`;

    window.open(
      waLink(message),
      '_blank',
      'noopener'
    );
  });
}


function initAdmin() {
  const root = document.querySelector('[data-admin]');

  if (!root) return;

  let section =
    location.hash.replace('#', '') || 'dashboard';

  const navigate = next => {
    section = next;
    location.hash = next;
    renderAdmin();
  };

  document
    .querySelectorAll('[data-admin-nav]')
    .forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        navigate(link.dataset.adminNav);
      });
    });

  document
    .querySelector('[data-admin-menu]')
    ?.addEventListener('click', () => {
      document
        .querySelector('.admin-sidebar')
        ?.classList.toggle('open');
    });

  document
    .querySelector('[data-admin-logout]')
    ?.addEventListener('click', () => {
      sessionStorage.removeItem(
        'raynexis-admin-token'
      );

      location.href = 'admin-login.html';
    });

  window.addEventListener('hashchange', () => {
    section =
      location.hash.replace('#', '') || 'dashboard';

    renderAdmin();
  });


  function renderAdmin() {
    const data = getData();

    document
      .querySelectorAll('[data-admin-nav]')
      .forEach(link => {
        link.classList.toggle(
          'active',
          link.dataset.adminNav === section
        );
      });

    const titles = {
      dashboard: 'Dashboard',
      services: 'Services',
      inquiries: 'Inquiries',
      settings: 'Settings',
      projects: 'Projects',
      testimonials: 'Testimonials',
      team: 'Team',
      pages: 'Pages'
    };

    const title = document.querySelector(
      '[data-admin-title]'
    );

    if (title) {
      title.textContent =
        titles[section] || 'Dashboard';
    }

    const content = document.querySelector(
      '[data-admin-content]'
    );

    if (!content) {
      console.error(
        'Admin content container not found.'
      );
      return;
    }

    if (section === 'services') {
      content.innerHTML = servicesView(data);
    } else if (section === 'inquiries') {
      content.innerHTML = inquiriesView(data);
    } else if (section === 'settings') {
      content.innerHTML = settingsView(data);
    } else if (
      ['projects', 'testimonials', 'team', 'pages']
        .includes(section)
    ) {
      content.innerHTML =
        collectionView(data, section);
    } else {
      content.innerHTML =
        dashboardView(data);
    }

    bindAdmin();
    renderIcons();
  }


  function dashboardView(data) {
    return `
      <div class="admin-stats">

        <div class="admin-stat">
          <span>New inquiries</span>
          <strong>
            ${data.inquiries.filter(
              i => i.status === 'New'
            ).length}
          </strong>
          <small>+12% from last 7 days</small>
        </div>

        <div class="admin-stat">
          <span>Services live</span>
          <strong>
            ${data.services.filter(
              s => s.published
            ).length}
          </strong>
          <small>+5% from last month</small>
        </div>

        <div class="admin-stat">
          <span>Projects</span>
          <strong>24</strong>
          <small>+8% from last month</small>
        </div>

        <div class="admin-stat">
          <span>Avg response</span>
          <strong>2h</strong>
          <small>-10% from last 7 days</small>
        </div>

      </div>

      <div class="admin-panel">

        <div class="admin-panel-head">
          <div>
            <span class="eyebrow">Overview</span>
            <h2>Welcome back</h2>
          </div>

          <a
            class="btn btn-primary btn-sm"
            href="#services"
          >
            Manage services
            ${icon('arrow-right', 15)}
          </a>
        </div>

        <p class="muted">
          Your public site is powered by editable content.
          Update services, contact details, SEO, and lead
          statuses from this workspace.
        </p>

        <div
          class="inquiry-grid"
          style="margin-top:22px"
        >
          ${data.inquiries
            .slice(0, 3)
            .map(inquiryCard)
            .join('')}
        </div>

      </div>
    `;
  }


  function servicesView(data) {
    return `
      <div class="admin-panel">

        <div class="admin-panel-head">
          <div>
            <span class="eyebrow">
              Content manager
            </span>
            <h2>Services</h2>
          </div>

          <button
            class="btn btn-primary btn-sm"
            data-new-service
          >
            ${icon('plus', 16)}
            New service
          </button>
        </div>

        <div class="admin-toolbar">
          <span class="muted">
            ${data.services.length}
            service records · changes save to this browser
          </span>

          <input
            class="search-input"
            data-service-search
            placeholder="Search services…"
          >
        </div>

        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody data-service-rows>
              ${serviceRows(data.services)}
            </tbody>
          </table>
        </div>

      </div>
    `;
  }


  function serviceRows(services) {
    return services
      .map(
        item => `
          <tr
            data-service-row
            data-search="${esc(
              `${item.title} ${item.category}`
                .toLowerCase()
            )}"
          >
            <td>
              <strong>${esc(item.title)}</strong>
            </td>

            <td>${esc(item.category)}</td>

            <td>${esc(item.price)}</td>

            <td>
              <button
                class="switch ${
                  item.published ? 'on' : ''
                }"
                aria-label="Toggle publish"
                data-toggle-service="${esc(item.id)}"
              ></button>
            </td>

            <td>
              ${formatDate(new Date().toISOString())}
            </td>

            <td>
              <div class="table-actions">

                <button
                  class="icon-btn"
                  data-edit-service="${esc(item.id)}"
                  title="Edit"
                >
                  ${icon('pencil', 16)}
                </button>

                <button
                  class="icon-btn danger"
                  data-delete-service="${esc(item.id)}"
                  title="Delete"
                >
                  ${icon('trash-2', 16)}
                </button>

              </div>
            </td>
          </tr>
        `
      )
      .join('');
  }


  function collectionView(data, collection) {
    const label =
      collection === 'team'
        ? 'Team member'
        : collection.slice(0, -1);

    return `
      <div class="admin-panel">

        <div class="admin-panel-head">

          <div>
            <span class="eyebrow">
              Content manager
            </span>

            <h2>
              ${esc(
                collection[0].toUpperCase() +
                collection.slice(1)
              )}
            </h2>
          </div>

          <button
            class="btn btn-primary btn-sm"
            data-new-content="${esc(collection)}"
          >
            ${icon('plus', 16)}
            New ${esc(label)}
          </button>

        </div>

        <p class="muted">
          Create, edit, publish, unpublish, reorder,
          or delete this content without touching code.
        </p>

        <div
          class="inquiry-grid"
          style="margin-top:20px"
        >
          ${data[collection]
            .map(
              item => `
                <article class="inquiry-card">

                  <header>
                    <h3>${esc(item.title)}</h3>

                    <button
                      class="switch ${
                        item.published ? 'on' : ''
                      }"
                      data-toggle-content="${esc(
                        collection
                      )}:${esc(item.id)}"
                      aria-label="Toggle publish"
                    ></button>
                  </header>

                  <p>
                    ${esc(item.description)}
                  </p>

                  <div class="table-actions">

                    <button
                      class="icon-btn"
                      data-edit-content="${esc(
                        collection
                      )}:${esc(item.id)}"
                      title="Edit"
                    >
                      ${icon('pencil', 16)}
                    </button>

                    <button
                      class="icon-btn danger"
                      data-delete-content="${esc(
                        collection
                      )}:${esc(item.id)}"
                      title="Delete"
                    >
                      ${icon('trash-2', 16)}
                    </button>

                  </div>

                </article>
              `
            )
            .join('')}
        </div>

      </div>
    `;
  }


  function inquiriesView(data) {
    return `
      <div class="admin-panel">

        <div class="admin-panel-head">
          <div>
            <span class="eyebrow">
              Lead pipeline
            </span>

            <h2>Inquiries</h2>
          </div>

          <span class="muted">
            ${data.inquiries.length}
            total leads
          </span>
        </div>

        <div class="admin-toolbar">

          <span class="muted">
            Move each lead through New,
            Contacted, or Won.
          </span>

          <input
            class="search-input"
            data-inquiry-search
            placeholder="Search inquiries…"
          >

        </div>

        <div
          class="inquiry-grid"
          data-inquiry-list
        >
          ${data.inquiries
            .map(inquiryCard)
            .join('')}
        </div>

      </div>
    `;
  }


  function inquiryCard(item) {
    const tone =
      item.status === 'Won'
        ? 'green'
        : item.status === 'Contacted'
          ? 'gold'
          : 'blue';

    return `
      <article
        class="inquiry-card"
        data-inquiry-card
        data-search="${esc(
          `${item.name} ${item.service} ${item.email}`
            .toLowerCase()
        )}"
      >

        <header>
          <h3>${esc(item.name)}</h3>

          <span class="pill ${tone}">
            ${esc(item.status)}
          </span>
        </header>

        <p class="meta">
          ${esc(item.phone || '')}
          ·
          ${esc(item.email || '')}
          <br>
          ${formatDate(item.created)}
        </p>

        <p>
          <strong>Service:</strong>
          ${esc(item.service || 'General inquiry')}
        </p>

        <p>
          ${esc(item.message || 'No message provided.')}
        </p>

        <select
          data-inquiry-status="${esc(item.id)}"
        >
          <option
            ${item.status === 'New' ? 'selected' : ''}
          >
            New
          </option>

          <option
            ${item.status === 'Contacted' ? 'selected' : ''}
          >
            Contacted
          </option>

          <option
            ${item.status === 'Won' ? 'selected' : ''}
          >
            Won
          </option>
        </select>

      </article>
    `;
  }


  function settingsView(data) {
    const s = data.settings;

    return `
      <div class="admin-panel">

        <div class="admin-panel-head">
          <div>
            <span class="eyebrow">
              Platform settings
            </span>

            <h2>
              Business details & SEO
            </h2>
          </div>
        </div>

        <form data-settings-form>

          <div class="settings-grid">

            ${settingField(
              'Company name',
              'company',
              s.company
            )}

            ${settingField(
              'Tagline',
              'tagline',
              s.tagline
            )}

            ${settingField(
              'Phone number',
              'phone',
              s.phone
            )}

            ${settingField(
              'WhatsApp number',
              'whatsapp',
              s.whatsapp
            )}

            ${settingField(
              'Email',
              'email',
              s.email
            )}

            ${settingField(
              'Address',
              'address',
              s.address
            )}

            ${settingField(
              'Hero eyebrow',
              'heroEyebrow',
              s.heroEyebrow
            )}

            ${settingField(
              'Hero title (HTML allowed)',
              'heroTitle',
              s.heroTitle
            )}

            <div class="field full">
              <label>Hero description</label>

              <textarea name="heroDescription">${esc(
                s.heroDescription
              )}</textarea>
            </div>

            ${settingField(
              'Facebook URL',
              'facebook',
              s.facebook
            )}

            ${settingField(
              'Instagram URL',
              'instagram',
              s.instagram
            )}

            ${settingField(
              'TikTok URL',
              'tiktok',
              s.tiktok
            )}

          </div>

          <div class="form-actions">

            <button
              class="btn btn-primary"
              type="submit"
            >
              Save settings
              ${icon('check', 16)}
            </button>

            <span class="form-status"></span>

          </div>

        </form>

      </div>
    `;
  }


  function settingField(label, name, value) {
    return `
      <div class="field">

        <label>${esc(label)}</label>

        <input
          name="${esc(name)}"
          value="${esc(value)}"
          required
        >

      </div>
    `;
  }


  function bindAdmin() {

    document
      .querySelector('[data-new-service]')
      ?.addEventListener('click', () => {
        openDrawer();
      });


    document
      .querySelectorAll('[data-edit-service]')
      .forEach(btn => {
        btn.addEventListener('click', () => {
          const item = getData().services.find(
            item =>
              item.id === btn.dataset.editService
          );

          if (item) {
            openDrawer(item);
          }
        });
      });


    document
      .querySelectorAll('[data-delete-service]')
      .forEach(btn => {
        btn.addEventListener('click', () => {

          if (!confirm('Delete this service?')) {
            return;
          }

          const data = getData();

          data.services =
            data.services.filter(
              item =>
                item.id !==
                btn.dataset.deleteService
            );

          saveData(data);
          renderAdmin();
        });
      });


    document
      .querySelectorAll('[data-toggle-service]')
      .forEach(btn => {
        btn.addEventListener('click', () => {

          const data = getData();

          const item = data.services.find(
            s =>
              s.id ===
              btn.dataset.toggleService
          );

          if (!item) return;

          item.published = !item.published;

          saveData(data);
          renderAdmin();
        });
      });


    document
      .querySelector('[data-new-content]')
      ?.addEventListener('click', event => {

        const collection =
          event.currentTarget.dataset.newContent;

        openContentDrawer(collection);
      });


    document
      .querySelectorAll('[data-edit-content]')
      .forEach(btn => {

        btn.addEventListener('click', () => {

          const [
            collection,
            id
          ] =
            btn.dataset.editContent.split(':');

          const item =
            getData()[collection]?.find(
              item => item.id === id
            );

          if (item) {
            openContentDrawer(
              collection,
              item
            );
          }
        });
      });


    document
      .querySelectorAll('[data-toggle-content]')
      .forEach(btn => {

        btn.addEventListener('click', () => {

          const [
            collection,
            id
          ] =
            btn.dataset.toggleContent.split(':');

          const data = getData();

          const item =
            data[collection]?.find(
              entry => entry.id === id
            );

          if (!item) return;

          item.published = !item.published;

          saveData(data);
          renderAdmin();
        });
      });


    document
      .querySelectorAll('[data-delete-content]')
      .forEach(btn => {

        btn.addEventListener('click', () => {

          const [
            collection,
            id
          ] =
            btn.dataset.deleteContent.split(':');

          if (!confirm('Delete this item?')) {
            return;
          }

          const data = getData();

          if (!Array.isArray(data[collection])) {
            return;
          }

          data[collection] =
            data[collection].filter(
              entry => entry.id !== id
            );

          saveData(data);
          renderAdmin();
        });
      });


    document
      .querySelector('[data-service-search]')
      ?.addEventListener('input', event => {

        const query =
          event.target.value.toLowerCase();

        document
          .querySelectorAll('[data-service-row]')
          .forEach(row => {
            row.hidden =
              !row.dataset.search.includes(query);
          });
      });


    document
      .querySelector('[data-inquiry-search]')
      ?.addEventListener('input', event => {

        const query =
          event.target.value.toLowerCase();

        document
          .querySelectorAll('[data-inquiry-card]')
          .forEach(card => {
            card.hidden =
              !card.dataset.search.includes(query);
          });
      });


    document
      .querySelectorAll('[data-inquiry-status]')
      .forEach(select => {

        select.addEventListener('change', () => {

          const data = getData();

          const item =
            data.inquiries.find(
              i =>
                i.id ===
                select.dataset.inquiryStatus
            );

          if (!item) return;

          item.status = select.value;

          saveData(data);

          if (
            backendEnabled &&
            !String(item.id).startsWith('demo-')
          ) {
            void apiRequest(
              `/api/admin/inquiries/${item.id}`,
              {
                method: 'PATCH',
                body: JSON.stringify({
                  status: item.status
                })
              }
            ).catch(error =>
              alert(error.message)
            );
          }

          renderAdmin();
        });
      });


    document
      .querySelector('[data-settings-form]')
      ?.addEventListener('submit', event => {

        event.preventDefault();

        const data = getData();

        Object.assign(
          data.settings,
          Object.fromEntries(
            new FormData(event.target)
          )
        );

        saveData(data);

        const status =
          event.target.querySelector(
            '.form-status'
          );

        if (status) {
          status.textContent = 'Saved';

          setTimeout(() => {
            status.textContent = '';
          }, 2200);
        }
      });
  }


  /*
   * SERVICE DRAWER
   */
  function openDrawer(item = {}) {

    let backdrop =
      document.querySelector(
        '[data-drawer-backdrop]'
      );

    if (!backdrop) {
      backdrop =
        document.createElement('div');

      backdrop.className =
        'drawer-backdrop';

      backdrop.setAttribute(
        'data-drawer-backdrop',
        ''
      );

      backdrop.innerHTML =
        '<aside class="drawer"></aside>';

      document.body.appendChild(backdrop);
    }

    let drawer =
      backdrop.querySelector('.drawer');

    if (!drawer) {
      drawer =
        document.createElement('aside');

      drawer.className = 'drawer';

      backdrop.appendChild(drawer);
    }

    backdrop.classList.add('open');

    drawer.innerHTML = `
      <div class="drawer-head">

        <h2>
          ${item.id
            ? 'Edit service'
            : 'New service'}
        </h2>

        <button
          class="icon-btn"
          type="button"
          data-close-drawer
        >
          ${icon('x', 19)}
        </button>

      </div>

      <form data-service-form>

        ${settingField(
          'Title',
          'title',
          item.title || ''
        )}

        ${settingField(
          'Category',
          'category',
          item.category || 'Technology'
        )}

        <div class="field">
          <label>Description</label>

          <textarea
            name="description"
            required
          >${esc(item.description || '')}</textarea>
        </div>

        ${settingField(
          'Starting price',
          'price',
          item.price || 'KES '
        )}

        <div class="field">

          <label>Icon name</label>

          <input
            name="icon"
            value="${esc(
              item.icon || 'sparkles'
            )}"
            placeholder="e.g. globe-2"
            required
          >

        </div>

        <div class="field">

          <label>
            <input
              type="checkbox"
              name="published"
              ${
                item.published !== false
                  ? 'checked'
                  : ''
              }
            >
            Published on website
          </label>

        </div>

        <div class="drawer-actions">

          <button
            class="btn btn-primary"
            type="submit"
          >
            Save changes
          </button>

          <button
            class="btn btn-outline"
            type="button"
            data-close-drawer
          >
            Cancel
          </button>

        </div>

      </form>
    `;

    renderIcons();

    drawer
      .querySelectorAll('[data-close-drawer]')
      .forEach(btn => {

        btn.addEventListener('click', () => {
          backdrop.classList.remove('open');
        });
      });

    const form =
      drawer.querySelector(
        '[data-service-form]'
      );

    if (!form) return;

    form.addEventListener(
      'submit',
      event => {

        event.preventDefault();

        const formData =
          new FormData(event.target);

        const data = getData();

        const next = {
          id:
            item.id ||
            `service-${Date.now()}`,

          title:
            formData.get('title'),

          category:
            formData.get('category'),

          description:
            formData.get('description'),

          price:
            formData.get('price'),

          icon:
            formData.get('icon'),

          published:
            formData.get('published') === 'on'
        };

        const index =
          data.services.findIndex(
            service =>
              service.id === next.id
          );

        if (index >= 0) {
          data.services[index] = next;
        } else {
          data.services.push(next);
        }

        saveData(data);

        backdrop.classList.remove('open');

        renderAdmin();
      }
    );
  }


  /*
   * FIXED CONTENT DRAWER
   *
   * This replaces the broken version that was
   * causing:
   *
   * Cannot set properties of null
   * (setting 'innerHTML')
   */
  function openContentDrawer(
    collection,
    item = {}
  ) {

    if (!collection) {
      console.error(
        'openContentDrawer: collection is missing.'
      );
      return;
    }

    const data = getData();

    if (!Array.isArray(data[collection])) {
      console.error(
        `Unknown content collection: ${collection}`
      );
      return;
    }

    /*
     * Find or create the drawer backdrop.
     */
    let backdrop =
      document.querySelector(
        '[data-drawer-backdrop]'
      );

    if (!backdrop) {

      backdrop =
        document.createElement('div');

      backdrop.className =
        'drawer-backdrop';

      backdrop.setAttribute(
        'data-drawer-backdrop',
        ''
      );

      backdrop.innerHTML =
        '<aside class="drawer"></aside>';

      document.body.appendChild(backdrop);
    }


    /*
     * Find or create the actual drawer.
     */
    let drawer =
      backdrop.querySelector('.drawer');

    if (!drawer) {

      drawer =
        document.createElement('aside');

      drawer.className = 'drawer';

      backdrop.appendChild(drawer);
    }


    /*
     * Make sure we definitely have a valid
     * drawer before touching innerHTML.
     */
    if (!drawer) {
      console.error(
        'Drawer element could not be created.'
      );
      return;
    }


    backdrop.classList.add('open');


    /*
     * Convert collection name to a friendly
     * singular label.
     */
    let label = collection;

    if (collection === 'team') {
      label = 'Team member';
    } else if (collection.endsWith('s')) {
      label = collection.slice(0, -1);
    }


    /*
     * Draw the content editor.
     */
    drawer.innerHTML = `
      <div class="drawer-head">

        <h2>
          ${item.id ? 'Edit' : 'New'}
          ${esc(label)}
        </h2>

        <button
          class="icon-btn"
          type="button"
          data-close-drawer
          aria-label="Close drawer"
        >
          ${icon('x', 19)}
        </button>

      </div>


      <form data-content-form>

        ${settingField(
          'Title',
          'title',
          item.title || ''
        )}


        <div class="field">

          <label>Description</label>

          <textarea
            name="description"
            required
          >${esc(
            item.description || ''
          )}</textarea>

        </div>


        <div class="field">

          <label>
            <input
              type="checkbox"
              name="published"
              ${
                item.published !== false
                  ? 'checked'
                  : ''
              }
            >

            Published on website
          </label>

        </div>


        <div class="drawer-actions">

          <button
            class="btn btn-primary"
            type="submit"
          >
            Save changes
          </button>

          <button
            class="btn btn-outline"
            type="button"
            data-close-drawer
          >
            Cancel
          </button>

        </div>

      </form>
    `;


    renderIcons();


    /*
     * Close buttons.
     */
    drawer
      .querySelectorAll('[data-close-drawer]')
      .forEach(btn => {

        btn.addEventListener(
          'click',
          () => {
            backdrop.classList.remove(
              'open'
            );
          }
        );
      });


    /*
     * Content form.
     */
    const form =
      drawer.querySelector(
        '[data-content-form]'
      );

    if (!form) {
      console.error(
        'Content form could not be created.'
      );
      return;
    }


    form.addEventListener(
      'submit',
      event => {

        event.preventDefault();

        const formData =
          new FormData(event.target);

        const data = getData();

        const next = {
          id:
            item.id ||
            `${collection}-${Date.now()}`,

          title:
            String(
              formData.get('title') || ''
            ).trim(),

          description:
            String(
              formData.get('description') || ''
            ).trim(),

          published:
            formData.get('published') === 'on'
        };


        /*
         * Make sure collection exists.
         */
        if (!Array.isArray(data[collection])) {
          data[collection] = [];
        }


        /*
         * Update existing item or create new one.
         */
        const index =
          data[collection].findIndex(
            entry =>
              entry.id === next.id
          );

        if (index >= 0) {
          data[collection][index] = {
            ...data[collection][index],
            ...next
          };
        } else {
          data[collection].push(next);
        }


        /*
         * Save locally + Railway backend.
         */
        saveData(data);


        /*
         * Close drawer.
         */
        backdrop.classList.remove(
          'open'
        );


        /*
         * Refresh admin UI.
         */
        renderAdmin();
      }
    );
  }
}


function initAdminLogin() {

  const form =
    document.querySelector(
      '[data-admin-login]'
    );

  if (!form) return;

  const message =
    form.querySelector(
      '[data-login-message]'
    );

  form.addEventListener(
    'submit',
    async event => {

      event.preventDefault();

      if (!backendEnabled) {

        message.textContent =
          'Backend not connected yet. Add your Railway URL in api-config.js.';

        return;
      }

      const button =
        form.querySelector(
          'button[type="submit"]'
        );

      button.disabled = true;

      message.textContent =
        'Signing in…';

      try {

        const payload =
          Object.fromEntries(
            new FormData(form)
          );

        const result =
          await apiRequest(
            '/api/auth/login',
            {
              method: 'POST',
              body: JSON.stringify(
                payload
              )
            }
          );

        sessionStorage.setItem(
          'raynexis-admin-token',
          result.token
        );

        location.href =
          new URLSearchParams(
            location.search
          ).get('return') ||
          'admin.html';

      } catch (error) {

        message.textContent =
          error.message;

        button.disabled = false;
      }
    }
  );
}


document.addEventListener(
  'DOMContentLoaded',
  () => {

    hydrateSite();

    initNav();

    renderPillars();

    renderHomeSections();

    initServices();

    initContactForm();

    if (!window.__newAdminApp) initAdmin();

    initAdminLogin();

    renderIcons();


    /*
     * Load public content from Railway.
     */
    if (
      backendEnabled &&
      !document.querySelector(
        '[data-admin]'
      ) &&
      !document.querySelector(
        '[data-admin-login]'
      )
    ) {

      void apiRequest(
        '/api/public/bootstrap'
      )
        .then(remote => {

          cacheData({
            ...getData(),
            ...remote
          });

          hydrateSite();

          renderPillars();

          renderServices();

          renderHomeSections();
        })
        .catch(error => {

          console.warn(
            'API unavailable:',
            error.message
          );
        });
    }
  }
);
