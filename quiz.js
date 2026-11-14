'use strict';
(() => {
  const QUESTIONS = [
    { q: 'What does love mean in a tennis score?', options: ['Zero', 'A tied score', 'A winning serve'], answer: 0,
      why: 'Love means zero. Nobody knows for sure why: playing for love, meaning for nothing, is the likeliest explanation.' },
    { q: 'What happens at deuce?', options: ['The next point wins the game', 'A player must win two points in a row to take the game', 'The players play a tie-break'], answer: 1,
      why: 'At 40-40 a player must win two points in a row. Win one, and you have the advantage.' },
    { q: 'What winning margin is needed in a standard tie-break?', options: ['One point', 'Two points', 'Three points'], answer: 1,
      why: 'The first player to seven points wins the tie-break, but they must lead by two.' }
  ];
  const MESSAGES = ['Love. Read the story and try again.', 'A point on the board. Read the story and try again.',
                    'Advantage you. One more point to go.', 'Game, set and match. You know your tennis.'];
  const box = document.getElementById('quiz');
  const track = (n, d) => window.sfTrack && window.sfTrack(n, d);
  let i = 0, score = 0, results = [], started = false;
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  function dots() {
    const d = el('div', 'dots'); d.setAttribute('aria-hidden', 'true');
    QUESTIONS.forEach((_, k) => { const s = el('span'); if (k < results.length) s.className = results[k] ? 'good' : 'bad'; else if (k === i) s.className = 'on'; d.append(s); });
    return d;
  }
  function render() {
    box.replaceChildren();
    const item = QUESTIONS[i];
    const head = el('div', 'progress'); head.append(el('span', '', 'Question ' + (i + 1) + ' of ' + QUESTIONS.length), dots());
    const q = el('h2', 'q', item.q); q.id = 'q' + i; q.tabIndex = -1;
    const group = el('div', 'options'); group.setAttribute('role', 'group'); group.setAttribute('aria-labelledby', q.id);
    item.options.forEach((text, k) => {
      const b = el('button', 'opt'); b.type = 'button';
      b.append(el('span', 'key', 'ABC'[k]), el('span', '', text));
      b.addEventListener('click', () => answer(k, group));
      group.append(b);
    });
    box.append(head, q, group);
    if (i > 0) q.focus({ preventScroll: false });
  }
  function answer(k, group) {
    if (!started) { started = true; track('quiz_start', { story: 'BG02' }); }
    const item = QUESTIONS[i], ok = k === item.answer;
    results.push(ok); if (ok) score++;
    [...group.children].forEach((b, n) => {
      b.disabled = true;
      if (n === item.answer) { b.classList.add('correct'); b.setAttribute('aria-label', b.textContent.slice(1) + ', correct answer'); }
      else if (n === k) { b.classList.add('wrong'); b.setAttribute('aria-label', b.textContent.slice(1) + ', your answer'); }
      else b.classList.add('dim');
    });
    track('quiz_answer', { question: i + 1, correct: ok });
    const fb = el('div', 'feedback ' + (ok ? 'good' : 'bad')); fb.setAttribute('role', 'status');
    fb.append(el('strong', '', ok ? 'Correct' : 'Not quite'), el('span', '', item.why));
    const next = el('button', 'btn', i < QUESTIONS.length - 1 ? 'Next question' : 'See your score'); next.type = 'button';
    next.addEventListener('click', () => { i++; i < QUESTIONS.length ? render() : finish(); });
    const act = el('div', 'actions'); act.append(next);
    box.querySelector('.dots').replaceWith(dots());
    box.append(fb, act);
    next.focus({ preventScroll: true });
    fb.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  function finish() {
    track('quiz_complete', { score, of: QUESTIONS.length });
    box.replaceChildren();
    const head = el('div', 'progress'); head.append(el('span', '', 'Your result'), dots());
    const s = el('p', 'result-score'); s.append(document.createTextNode(String(score)), el('small', '', ' / ' + QUESTIONS.length));
    const h = el('h2', 'result-msg', MESSAGES[score]); h.tabIndex = -1;
    const n = el('p', 'result-note', 'From deuce, a player must win two points in a row. And nobody knows for sure where love comes from.');
    const act = el('div', 'actions');
    const read = el('a', 'btn', 'Read the full story'); read.href = window.sfStoryLink('BG02'); read.dataset.label = 'BG02 full story';
    read.addEventListener('click', () => track('cta_click', { cta: 'read_story', story: 'BG02' }));
    const again = el('button', 'btn ghost', 'Play again'); again.type = 'button';
    again.addEventListener('click', () => { i = 0; score = 0; results = []; started = false; track('quiz_restart'); render(); box.querySelector('.q').focus(); });
    act.append(read, again);
    box.append(head, s, h, n, act);
    h.focus({ preventScroll: true });
  }
  render();
  window.sfRelated('related', [
    { id: 'PP03', href: './challenge.html', kicker: 'Interactive challenge', title: 'Every Second Counts' },
    { id: 'BG03' }, { id: 'TP03' }
  ]);
})();
