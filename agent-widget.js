(function () {
  if (document.querySelector('.rx-concierge-launcher')) return;
  const apiBase = String(window.RAYNEXIS_API_URL || 'https://raynexis-landing-production.up.railway.app').replace(/\/$/, '');
  const state = {
    sessionId: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `rx-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    messages: [],
    lead: {},
    open: false,
    busy: false
  };

  const css = document.createElement('style');
  css.textContent = `
    .rx-concierge-launcher{position:fixed;right:24px;bottom:24px;z-index:80;border:0;border-radius:999px;background:#08c4ea;color:#001226;box-shadow:0 14px 32px rgba(0,0,0,.25);padding:14px 19px;font:700 14px/1.1 Inter,Arial,sans-serif;cursor:pointer;display:flex;align-items:center;gap:9px}
    .rx-concierge-launcher svg{width:19px;height:19px}
    .rx-concierge-panel{position:fixed;right:24px;bottom:82px;width:min(390px,calc(100vw - 32px));height:min(620px,calc(100vh - 110px));z-index:81;background:#061529;color:#f8fbff;border:1px solid rgba(76,219,247,.35);border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.4);display:none;overflow:hidden;font-family:Inter,Arial,sans-serif}
    .rx-concierge-panel.is-open{display:flex;flex-direction:column}
    .rx-concierge-head{display:flex;align-items:center;justify-content:space-between;padding:18px 18px 15px;border-bottom:1px solid rgba(255,255,255,.1);background:linear-gradient(135deg,#09264a,#061529)}
    .rx-concierge-head strong{display:block;font-size:15px}.rx-concierge-head span{display:block;color:#9bb3cd;font-size:11px;margin-top:4px}
    .rx-concierge-close{background:transparent;border:0;color:#d9effb;font-size:25px;line-height:1;cursor:pointer}
    .rx-concierge-messages{flex:1;overflow:auto;padding:18px 15px;display:flex;flex-direction:column;gap:11px}
    .rx-msg{max-width:88%;padding:11px 13px;border-radius:13px;font-size:13px;line-height:1.48;white-space:pre-wrap}.rx-msg.assistant{align-self:flex-start;background:#102d4d;color:#e8f5ff;border-bottom-left-radius:4px}.rx-msg.user{align-self:flex-end;background:#08c4ea;color:#001226;border-bottom-right-radius:4px}
    .rx-concierge-actions{padding:0 15px 8px;display:flex;flex-wrap:wrap;gap:7px}.rx-concierge-actions button{border:1px solid rgba(8,196,234,.6);border-radius:999px;background:transparent;color:#bff5ff;padding:8px 11px;font-size:12px;cursor:pointer}.rx-concierge-actions button:hover{background:rgba(8,196,234,.14)}
    .rx-concierge-compose{display:flex;gap:8px;padding:12px 15px 15px;border-top:1px solid rgba(255,255,255,.1)}.rx-concierge-compose input{min-width:0;flex:1;border:1px solid #2c4968;border-radius:10px;background:#0b213b;color:white;padding:11px 12px;outline:none}.rx-concierge-compose input:focus{border-color:#08c4ea}.rx-concierge-compose button{width:42px;border:0;border-radius:10px;background:#08c4ea;color:#001226;cursor:pointer}.rx-concierge-compose button:disabled{opacity:.5;cursor:wait}
    .rx-whatsapp-cta{width:100%;border:0;border-radius:10px;background:#16b364;color:#fff;padding:11px 12px;font-weight:700;cursor:pointer}.rx-concierge-note{font-size:10px;color:#86a0bb;padding:0 15px 11px}
    @media (max-width:600px){.rx-concierge-launcher{right:15px;bottom:15px}.rx-concierge-panel{right:15px;bottom:72px}}
  `;
  document.head.appendChild(css);

  const launcher = document.createElement('button');
  launcher.className = 'rx-concierge-launcher';
  launcher.type = 'button';
  launcher.innerHTML = '<i data-lucide="sparkles"></i><span>Ask Raynexis</span>';
  const panel = document.createElement('section');
  panel.className = 'rx-concierge-panel';
  panel.setAttribute('aria-label', 'Raynexis service concierge');
  panel.innerHTML = `
    <div class="rx-concierge-head"><div><strong>Raynexis Concierge</strong><span>Practical answers. Human help when you need it.</span></div><button class="rx-concierge-close" type="button" aria-label="Close">×</button></div>
    <div class="rx-concierge-messages"></div>
    <div class="rx-concierge-actions"></div>
    <form class="rx-concierge-compose"><input aria-label="Message the concierge" placeholder="Ask about a solution…" autocomplete="off"><button aria-label="Send" type="submit"><i data-lucide="arrow-up"></i></button></form>
    <div class="rx-concierge-note">Answers are based on Raynexis content. For a tailored response, the concierge will prepare a WhatsApp brief.</div>`;
  document.body.append(launcher, panel);
  const messagesHost = panel.querySelector('.rx-concierge-messages');
  const actionsHost = panel.querySelector('.rx-concierge-actions');
  const input = panel.querySelector('input');
  const sendButton = panel.querySelector('form button');

  function addMessage(role, text) {
    if (!text) return;
    state.messages.push({ role, content: text });
    const node = document.createElement('div');
    node.className = `rx-msg ${role}`;
    node.textContent = text;
    messagesHost.appendChild(node);
    messagesHost.scrollTop = messagesHost.scrollHeight;
  }
  function setActions(items) {
    actionsHost.innerHTML = '';
    (items || []).forEach(item => {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = item.label;
      button.addEventListener('click', () => item.action()); actionsHost.appendChild(button);
    });
  }
  function fallbackWhatsApp() {
    const text = encodeURIComponent('Hello Raynexis, I would like help choosing the right technology solution.');
    window.open(`https://wa.me/254707938295?text=${text}`, '_blank', 'noopener');
  }
  async function handoff() {
    if (!state.lead.name || !state.lead.phone) {
      addMessage('assistant', 'Before I open WhatsApp, please send your name and WhatsApp number.');
      return;
    }
    try {
      const response = await fetch(`${apiBase}/api/agent/whatsapp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: state.sessionId, lead: state.lead, transcript: state.messages }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to prepare WhatsApp.');
      addMessage('assistant', 'Your brief is ready. WhatsApp is opening with the context attached.');
      window.open(data.whatsappUrl, '_blank', 'noopener');
    } catch (_error) { fallbackWhatsApp(); }
  }
  async function send(text) {
    const value = String(text || '').trim(); if (!value || state.busy) return;
    state.busy = true; sendButton.disabled = true; setActions([]); addMessage('user', value); input.value = '';
    try {
      const response = await fetch(`${apiBase}/api/agent/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: state.sessionId, messages: state.messages, lead: state.lead }) });
      const data = await response.json();
      if (!response.ok) {
        addMessage('assistant', data.error || 'I can still connect you directly to WhatsApp.');
        setActions([{ label: 'Continue on WhatsApp', action: fallbackWhatsApp }]);
      } else {
        state.lead = { ...state.lead, ...(data.lead || {}) }; addMessage('assistant', data.reply);
        if (data.readyForWhatsApp) setActions([{ label: 'Continue on WhatsApp', action: handoff }]);
      }
    } catch (_error) { addMessage('assistant', 'The concierge is unavailable right now, but a Raynexis engineer is available on WhatsApp.'); setActions([{ label: 'Talk to a human', action: fallbackWhatsApp }]); }
    finally { state.busy = false; sendButton.disabled = false; input.focus(); }
  }
  function open() {
    state.open = true; panel.classList.add('is-open'); launcher.setAttribute('aria-expanded', 'true'); input.focus();
    if (!state.messages.length) { addMessage('assistant', 'Hi — I’m the Raynexis Concierge. What are you trying to improve: fleet visibility, digital growth, or technology and ICT operations?'); setActions([{ label: 'Find a service', action: () => send('I need help choosing a service.') }, { label: 'Talk to a human', action: fallbackWhatsApp }]); }
  }
  function close() { state.open = false; panel.classList.remove('is-open'); launcher.setAttribute('aria-expanded', 'false'); }
  launcher.addEventListener('click', () => state.open ? close() : open()); panel.querySelector('.rx-concierge-close').addEventListener('click', close); panel.querySelector('form').addEventListener('submit', event => { event.preventDefault(); send(input.value); });
  if (window.lucide) window.lucide.createIcons();
}());
