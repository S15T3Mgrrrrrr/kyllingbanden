/* ═══════════════════════════════════════════════════════════════════════
   app.js — All rendering and UI logic for Fjærkrebandittene Stratbook
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Module-level state ── */
let _countdownInterval = null;

/* ── Player tag helper ── */
function ptag(names) {
  const map = {
    'S15T3M':    ['s', 'S15T3M'],
    'Ole':       ['o', 'Ole'],
    'Olelelele': ['o', 'Ole'],
    'propit3':   ['p', 'propit3'],
    'G1zdani':   ['g', 'G1zdani'],
    'Birk':      ['b', 'Birk'],
    'Mekkis':    ['m', 'Mekkis'],
    'MEKKISSSS': ['m', 'Mekkis'],
  };
  return (names || [])
    .filter(n => n && n.trim())
    .map(n => {
      const e = map[n];
      return e ? `<span class="ptag ${e[0]}">${e[1]}</span>` : `<span class="ptag">${n}</span>`;
    })
    .join('');
}

/* ── Theme toggle ── */
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('fkb-theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
}

/* ── Clock ── */
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

/* ── Sidebar active highlight ── */
function setSidebarActive(el) {
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');
}

/* ─────────────────────────────────────────────────────────────────
   STRATS PAGE — render
   ───────────────────────────────────────────────────────────────── */
function renderStrats() {
  const container = document.getElementById('strat-content');
  if (!container) return;

  const html = mapOrder.map(key => {
    const map = maps[key];
    if (!map) return '';

    const strats = map.strats.map(s => {
      const steps = s.steps.map((step, i) => {
        const players = ptag(step.players);
        return `
          <li>
            <span class="step-num">${i + 1}</span>
            <div class="step-content">
              <span>${step.text}</span>
              ${players ? `<div class="step-players">${players}</div>` : ''}
            </div>
          </li>`;
      }).join('');

      const utils = s.utility.map(u => `
        <div class="util-item">
          <div class="util-name">${u.name}</div>
          <div class="util-detail">${u.detail}</div>
        </div>`).join('');

      const inspiredHtml = s.inspired
        ? `<div class="strat-inspired">Inspirert av ${s.inspired}</div>`
        : '';

      return `
        <div class="strat-card bracket" style="--card-accent: var(--orange);">
          <div class="card-top">
            <div class="card-top-info">
              <div class="strat-name">${s.name}</div>
              ${inspiredHtml}
            </div>
            <span class="badge ${s.badge}">${typeLabel[s.type] || s.type}</span>
          </div>
          <p class="desc">${s.desc}</p>
          <hr class="card-divider">
          <div>
            <div class="slabel">Gjennomføring</div>
            <ol class="steps">${steps}</ol>
          </div>
          ${utils ? `<hr class="card-divider"><div>
            <div class="slabel">Utility</div>
            <div class="util-row">${utils}</div>
          </div>` : ''}
        </div>`;
    }).join('');

    return `
      <section class="map-section" id="map-${key}">
        <div class="map-header">
          <div class="map-name">${map.name}</div>
          <div class="map-winrate">${map.meta}</div>
        </div>
        <div class="strat-grid fade-in">${strats}</div>
      </section>`;
  }).join('');

  container.innerHTML = html;
}

/* ─────────────────────────────────────────────────────────────────
   KAMPER PAGE — render
   ───────────────────────────────────────────────────────────────── */
function renderKamper() {
  _renderSeasonStats();
  _renderPlayedMatches();
  _renderUpcomingMatches();
  _renderNextMatch();
  _renderStandings();
  renderMapStats();
  renderPlayerStats();
}

function _renderSeasonStats() {
  const bar = document.getElementById('season-bar');
  if (!bar) return;
  const played = KAMPER.spilt;
  const wins   = played.filter(k => k.result === 'win').length;
  const losses = played.filter(k => k.result === 'loss').length;
  const draws  = played.filter(k => k.result === 'draw').length;

  let roundsWon = 0, roundsLost = 0;
  played.forEach(k => {
    (k.maps || []).forEach(m => { roundsWon += m.scoreUs; roundsLost += m.scoreThem; });
  });
  const diff = roundsWon - roundsLost;
  const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;

  let streak = 0;
  const sorted = [...played].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sorted.length > 0) {
    const first = sorted[0].result;
    for (const k of sorted) {
      if (k.result === first) streak++;
      else break;
    }
    streak = (first === 'win' ? '+' : '-') + streak;
  }

  bar.innerHTML = `
    <div class="stat-box wins"><div class="stat-value">${wins}</div><div class="stat-label">Seiere</div></div>
    <div class="stat-box losses"><div class="stat-value">${losses}</div><div class="stat-label">Tap</div></div>
    <div class="stat-box draws"><div class="stat-value">${draws}</div><div class="stat-label">Uavgjort</div></div>
    <div class="stat-box rounds"><div class="stat-value">${diffStr}</div><div class="stat-label">Runde diff</div></div>
    <div class="stat-box streak"><div class="stat-value">${streak || '–'}</div><div class="stat-label">Streak</div></div>`;
}

function _matchMapTagsHtml(maps) {
  if (!maps || maps.length === 0) return '';
  const tags = maps.map(m => {
    const cls = m.result === 'win' ? 'win' : m.result === 'loss' ? 'loss' : 'played';
    const score = m.scoreUs !== undefined ? ` ${m.scoreUs}–${m.scoreThem}` : '';
    return `<span class="map-tag ${cls}">${m.name}${score}</span>`;
  }).join('');
  return `<div class="match-map-tags">${tags}</div>`;
}

function _renderPlayedMatches() {
  const el = document.getElementById('played-list');
  if (!el) return;
  const sorted = [...KAMPER.spilt].sort((a, b) => new Date(b.date) - new Date(a.date));
  el.innerHTML = sorted.map(k => {
    const cls = k.result === 'win' ? 'win' : k.result === 'loss' ? 'loss' : 'draw';
    const badge = cls === 'win'
      ? `<span class="result-badge rb-win">Seier</span>`
      : cls === 'loss'
      ? `<span class="result-badge rb-loss">Tap</span>`
      : `<span class="result-badge rb-tbd">Uavgjort</span>`;
    const dateFmt = new Date(k.date).toLocaleDateString('no-NO', { day: 'numeric', month: 'short' });
    return `
      <div class="match-card ${cls}">
        <div class="match-meta">
          <div class="date">${dateFmt}</div>
          <div>${k.time || ''}</div>
          <div>${k.runde || ''}</div>
          <div>${k.format || ''}</div>
        </div>
        <div class="match-teams">
          <div class="match-team-row">
            <div class="team-name us">Fjærkrebandittene</div>
          </div>
          <div class="match-team-row">
            <div class="team-name">${k.opponent}</div>
          </div>
          ${_matchMapTagsHtml(k.maps)}
        </div>
        <div class="match-score">
          <div class="score-display">
            <span class="${k.result === 'win' ? 's-win' : 's-loss'}">${k.scoreUs}</span>
            <span class="s-sep">–</span>
            <span class="${k.result === 'loss' ? 's-win' : 's-loss'}">${k.scoreThem}</span>
          </div>
          ${badge}
        </div>
      </div>`;
  }).join('');
}

function _renderUpcomingMatches() {
  const el = document.getElementById('upcoming-list');
  if (!el) return;
  el.innerHTML = KAMPER.kommende.map(k => {
    const dateFmt = new Date(k.date).toLocaleDateString('no-NO', { day: 'numeric', month: 'short' });
    return `
      <div class="match-card upcoming">
        <div class="match-meta">
          <div class="date">${dateFmt}</div>
          <div>${k.time || ''}</div>
          <div>${k.runde || ''}</div>
          <div>${k.format || ''}</div>
        </div>
        <div class="match-teams">
          <div class="match-team-row">
            <div class="team-name us">Fjærkrebandittene</div>
          </div>
          <div class="match-team-row">
            <div class="team-name">${k.opponent}</div>
          </div>
        </div>
        <div class="match-score">
          <div class="score-tbd">TBD</div>
          <span class="result-badge rb-upcoming">${k.isNext ? 'Neste kamp' : 'Kommende'}</span>
        </div>
      </div>`;
  }).join('');
}

function _renderNextMatch() {
  const box = document.getElementById('next-match-box');
  if (!box) return;
  const next = KAMPER.kommende.find(k => k.isNext);
  if (!next) { box.style.display = 'none'; return; }

  const dateFmt = new Date(next.date).toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric', month: 'long' });

  const linkHtml = next.matchUrl
    ? `<a class="next-match-link" href="${next.matchUrl}" target="_blank" rel="noopener noreferrer">
         🔗 Se kamp på GGArena
       </a>`
    : '';

  box.innerHTML = `
    <div class="next-match-box">
      <div class="next-when">${next.runde} · ${next.format}</div>
      <div class="next-vs">
        <span class="us">FKB</span>
        <span class="vs">vs</span>
        ${next.opponent}
      </div>
      <div class="next-when">${dateFmt} kl. ${next.time}</div>
      <div id="countdown" class="countdown"></div>
      ${linkHtml}
    </div>`;

  _startCountdown(next.date, next.time);
}

function _startCountdown(dateStr, timeStr) {
  if (_countdownInterval) clearInterval(_countdownInterval);

  function tick() {
    const el = document.getElementById('countdown');
    if (!el) { clearInterval(_countdownInterval); return; }
    const target = new Date(`${dateStr}T${timeStr || '00:00'}:00`);
    const now    = new Date();
    const diff   = target - now;
    if (diff <= 0) {
      el.innerHTML = `<div style="grid-column:1/-1;text-align:center;font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--orange);letter-spacing:.1em;">LIVE NÅ 🟢</div>`;
      clearInterval(_countdownInterval);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    el.innerHTML = [
      { v: d, l: 'Dager' },
      { v: h, l: 'Timer' },
      { v: m, l: 'Min' },
      { v: s, l: 'Sek' },
    ].map(u => `
      <div class="cd-unit">
        <div class="cd-num">${String(u.v).padStart(2,'0')}</div>
        <div class="cd-label">${u.l}</div>
      </div>`).join('');
  }
  tick();
  _countdownInterval = setInterval(tick, 1000);
}

function _renderStandings() {
  const el = document.getElementById('standings-list');
  if (!el) return;
  const header = `
    <div class="standing-header">
      <span>#</span><span>Lag</span>
      <span>K</span><span>V</span><span>U</span><span>T</span>
      <span>Diff</span><span>P</span>
    </div>`;
  const rows = TABELL.map(t => `
    <div class="standing-row${t.withdrawn ? ' withdrawn' : ''}">
      <span class="standing-cell pos${t.us ? ' us' : ''}">${t.pos}</span>
      <span class="standing-cell name${t.us ? ' us' : ''}">${t.name}</span>
      <span class="standing-cell">${t.s}</span>
      <span class="standing-cell w">${t.w}</span>
      <span class="standing-cell">${t.u}</span>
      <span class="standing-cell l">${t.l}</span>
      <span class="standing-cell">${t.diff}</span>
      <span class="standing-cell pts${t.us ? ' us' : ''}">${t.p}</span>
    </div>`).join('');
  el.innerHTML = header + rows;
}

function renderMapStats() {
  const el = document.getElementById('map-stats-list');
  if (!el) return;
  el.innerHTML = KARTOVERSIKT.map(m => {
    const pct = m.pct !== null ? m.pct : null;
    const pctColor = pct === null ? 'var(--text3)'
      : pct >= 60  ? 'var(--green)'
      : pct >= 40  ? 'var(--yellow)'
      : 'var(--red)';
    const pctStr = pct !== null ? `${pct}%` : 'N/A';
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:11px;">
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;color:var(--text2);">${m.name}</span>
        <span style="display:flex;gap:10px;align-items:center;">
          <span style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text3);">${m.w}W–${m.l}L</span>
          <span style="font-family:'Share Tech Mono',monospace;font-size:12px;color:${pctColor};font-weight:700;">${pctStr}</span>
        </span>
      </div>`;
  }).join('');
}

function renderPlayerStats() {
  const el  = document.getElementById('player-stats-list');
  const hdr = document.getElementById('player-stats-header');
  if (!el) return;

  if (hdr) {
    hdr.innerHTML = `
      <span>Spiller</span>
      <span style="color:var(--green)">K</span>
      <span style="color:var(--yellow)">A</span>
      <span style="color:var(--red)">D</span>
      <span>ADR</span>
      <span style="color:var(--orange)">Rating</span>`;
  }

  const colorMap = { S15T3M: 'var(--c-s15)', propit3: 'var(--c-pro)', MEKKISSSS: 'var(--c-mek)', G1zdani: 'var(--c-g1z)', Birk: 'var(--c-birk)', Olelelele: 'var(--c-ole)' };

  const sorted = [...SPILLERSTATS.spillere].sort((a, b) => b.r - a.r);
  el.innerHTML = sorted.map(p => {
    const col = colorMap[p.name] || 'var(--text2)';
    const ratingColor = p.r >= 1.2 ? 'var(--green)' : p.r >= 1.0 ? 'var(--yellow)' : 'var(--red)';
    return `
      <div style="display:grid;grid-template-columns:1fr repeat(5,40px);align-items:center;gap:4px;padding:5px 0;border-bottom:1px solid var(--border);font-size:11px;">
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:${col};">${p.name}</span>
        <span style="text-align:center;font-family:'Share Tech Mono',monospace;color:var(--green);">${p.k}</span>
        <span style="text-align:center;font-family:'Share Tech Mono',monospace;color:var(--yellow);">${p.a}</span>
        <span style="text-align:center;font-family:'Share Tech Mono',monospace;color:var(--red);">${p.d}</span>
        <span style="text-align:center;font-family:'Share Tech Mono',monospace;color:var(--text2);">${p.adr}</span>
        <span style="text-align:center;font-family:'Share Tech Mono',monospace;font-weight:700;color:${ratingColor};">${p.r.toFixed(2)}</span>
      </div>`;
  }).join('');

  const meta = document.getElementById('player-stats-meta');
  if (meta) meta.textContent = SPILLERSTATS.kamp;
  const res  = document.getElementById('player-stats-result');
  if (res)  res.textContent = SPILLERSTATS.resultat;
}

/* ─────────────────────────────────────────────────────────────────
   SIDEBAR — IntersectionObserver for strats page
   ───────────────────────────────────────────────────────────────── */
function initSidebarObserver() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#map-"]');
  if (!sidebarLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const link = document.querySelector(`.sidebar-link[href="#${id}"]`);
        if (link) setSidebarActive(link);
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  document.querySelectorAll('.map-section').forEach(section => observer.observe(section));
}

/* ─────────────────────────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────────────────────────── */
function initPage() {
  /* Apply stored theme */
  const stored = localStorage.getItem('fkb-theme');
  const isLight = stored === 'light';
  document.documentElement.classList.toggle('light', isLight);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';

  /* Start clock */
  updateClock();
  setInterval(updateClock, 1000);

  /* Detect page and init accordingly */
  if (document.getElementById('strat-content')) {
    /* Strats page */
    renderStrats();
    initSidebarObserver();

    /* Set first sidebar link active initially */
    const firstLink = document.querySelector('.sidebar-link');
    if (firstLink) setSidebarActive(firstLink);
  } else if (document.getElementById('played-list')) {
    /* Kamper page */
    renderKamper();
  }
}

document.addEventListener('DOMContentLoaded', initPage);
