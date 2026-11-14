'use strict';
// Shared helpers for the interactive story pages: story titles, live StoryFrame links and related-story cards.
window.SF_STORIES = {
  BG02: { cat: 'Beyond the Game', title: 'Love, Deuce & the Rules of the Game' },
  BG03: { cat: 'Beyond the Game', title: 'Life on Tour' },
  TP03: { cat: 'Tennis Paradise', title: 'Where Legends Were Made' },
  BS03: { cat: 'Behind the Scenes', title: 'A Day in the Life of a Ball Kid' },
  PP02: { cat: 'Powered by Partners', title: 'The Journey Behind the Champion' },
  PP03: { cat: 'Powered by Partners', title: 'Every Second Counts' }
};
window.sfStoryLink = id => {
  const c = window.STORYFRAME_CONFIG || {}, links = c.links || {};
  return (links.stories && links.stories[id]) || links.hub || c.destination || './';
};
window.sfRelated = (container, items) => {
  const box = document.getElementById(container);
  if (!box) return;
  items.forEach(item => {
    const s = window.SF_STORIES[item.id] || {};
    const a = document.createElement('a');
    a.className = 'rel';
    a.href = item.href || window.sfStoryLink(item.id);
    a.dataset.label = item.id;
    const img = document.createElement('img');
    img.src = './assets/stories/' + item.id + '-thumb.webp'; img.alt = ''; img.loading = 'lazy';
    const txt = document.createElement('div');
    const k = document.createElement('span'); k.textContent = item.kicker || s.cat || '';
    const t = document.createElement('strong'); t.textContent = item.title || s.title || '';
    txt.append(k, t);
    const ar = document.createElement('b'); ar.className = 'arrow'; ar.setAttribute('aria-hidden', 'true'); ar.textContent = '→';
    a.append(img, txt, ar);
    a.addEventListener('click', () => window.sfTrack && window.sfTrack('related_click', { to: item.id }));
    box.append(a);
  });
  const note = document.getElementById('concept-note');
  const c = window.STORYFRAME_CONFIG || {};
  if (note && c.concept) note.textContent = c.concept;
};
(() => {
  const top = document.querySelector('.sp-top');
  if (!top) return;
  const onScroll = () => top.classList.toggle('solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
