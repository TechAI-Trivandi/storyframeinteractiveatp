'use strict';
(() => {
  const SERVES = 3, RETURNER_MS = 500;
  const court = document.getElementById('court'), status = document.getElementById('status'), ball = document.getElementById('ball');
  const times = document.getElementById('times'), result = document.getElementById('result');
  const track = (n, d) => window.sfTrack && window.sfTrack(n, d);
  let state = 'idle', n = 0, results = [], timer = null, t0 = 0, started = false, faults = 0;
  const say = (big, small) => { status.replaceChildren(document.createTextNode(big)); if (small) { const s = document.createElement('small'); s.textContent = small; status.append(s); } };
  const fmt = ms => (ms / 1000).toFixed(3).replace(/^0/, '0') + ' s';
  function setCourt(cls) { court.classList.remove('wait', 'go', 'early'); if (cls) court.classList.add(cls); }
  function serve() {
    state = 'wait'; setCourt('wait');
    say('Wait for the serve…', 'Serve ' + (n + 1) + ' of ' + SERVES);
    ball.style.left = (22 + Math.random() * 56) + '%'; ball.style.top = (18 + Math.random() * 64) + '%';
    timer = setTimeout(() => { state = 'go'; setCourt('go'); say('TAP'); t0 = performance.now(); }, 1300 + Math.random() * 2400);
  }
  function tap() {
    if (state === 'idle' || state === 'between') {
      if (!started) { started = true; track('challenge_start', { story: 'PP03' }); }
      result.hidden = true; serve(); return;
    }
    if (state === 'wait') {
      clearTimeout(timer); faults++; state = 'between'; setCourt('early');
      say('Fault: too soon', 'Wait for the ball. Tap to try again.');
      track('challenge_fault', { serve: n + 1 });
      return;
    }
    if (state === 'go') {
      const ms = Math.round(performance.now() - t0);
      results.push(ms); n++;
      times.children[n - 1].querySelector('strong').textContent = fmt(ms);
      track('challenge_attempt', { serve: n, ms });
      setCourt('');
      if (n < SERVES) { state = 'between'; say(fmt(ms), 'Tap for serve ' + (n + 1) + ' of ' + SERVES); }
      else finish();
    }
  }
  function finish() {
    state = 'done';
    const best = Math.min(...results), avg = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
    track('challenge_complete', { best, avg, faults });
    say(fmt(best), 'Your best reaction');
    const msg = best < 200 ? 'Lightning. You would see that serve coming.' : best < 300 ? 'Sharp. You would get your racket on it.' : 'Good effort. That serve might just get past you.';
    result.replaceChildren();
    const h = document.createElement('p'); h.className = 'result-msg'; h.textContent = msg;
    const p = document.createElement('p'); p.className = 'result-note';
    p.textContent = 'Your best was ' + fmt(best) + ' and your average ' + fmt(avg) + '. A returner has about ' + (RETURNER_MS / 1000).toFixed(1) + ' seconds to read the serve, move and swing.';
    const offer = document.createElement('div'); offer.className = 'offer';
    const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = 'Partner offer · illustrative';
    const op = document.createElement('p'); op.textContent = 'In a live campaign, a timing or technology partner could reward every player here with an offer, and see starts, completions and claims.';
    const ob = document.createElement('button'); ob.type = 'button'; ob.className = 'btn'; ob.textContent = 'Claim the partner offer';
    ob.addEventListener('click', () => { track('cta_click', { cta: 'partner_offer', story: 'PP03' }); toast('This is an illustrative partner offer. No partner is attached to this concept.'); });
    offer.append(tag, op, ob);
    const act = document.createElement('div'); act.className = 'actions';
    const again = document.createElement('button'); again.type = 'button'; again.className = 'btn ghost'; again.textContent = 'Play again';
    again.addEventListener('click', reset);
    const read = document.createElement('a'); read.className = 'btn ghost'; read.textContent = 'Read the story'; read.href = window.sfStoryLink('PP03'); read.dataset.label = 'PP03 full story';
    read.addEventListener('click', () => track('cta_click', { cta: 'read_story', story: 'PP03' }));
    act.append(again, read);
    result.append(h, p, offer, act); result.hidden = false;
    h.tabIndex = -1; h.focus({ preventScroll: true });
    result.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  function reset() {
    clearTimeout(timer); state = 'idle'; n = 0; results = []; faults = 0; setCourt('');
    [...times.children].forEach(d => d.querySelector('strong').textContent = '·');
    result.hidden = true; say('Tap to start', 'Serve 1 of ' + SERVES); track('challenge_restart'); court.focus();
  }
  function toast(text) {
    let t = document.querySelector('.toast'); if (!t) { t = document.createElement('p'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
    t.textContent = text; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => t.hidden = true, 4200);
  }
  // pointerdown is faster than click for a reaction game; keyboard users use the button's own click.
  court.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button === 0) { e.preventDefault(); tap(); } });
  court.addEventListener('click', e => { if (e.detail === 0) tap(); });
  window.sfRelated('related', [
    { id: 'BG02', href: './quiz.html', kicker: 'Interactive quiz', title: 'Think You Know Tennis?' },
    { id: 'BS03' }, { id: 'PP02' }
  ]);
})();
