# StoryFrame · Tennis Paradise (ATP Tour concept)

A standalone static experience for the ATP Tour bid, built on the Inter Miami experience template. No build step,
no npm dependencies, no API keys.

- `index.html`: the immersive 360 scene of a desert tennis stadium. Look around, gather the stories, then see the
  live StoryFrame page on the phone. "Enter StoryFrame" opens https://storyframe.live/live/atp-indian-wells .
- `quiz.html`: **Think You Know Tennis?** (story BG02). Three questions with instant, accessible feedback and a
  results screen.
- `challenge.html`: **Every Second Counts** (story PP03). A three-serve reaction challenge with best and average
  time, an illustrative partner offer and related stories.
- `track.js`: baseline engagement tracking. Every page view, quiz answer, challenge attempt, CTA and outbound click
  goes to `window.dataLayer` (ready for a tag manager) and to Vercel Web Analytics custom events if that is
  enabled on the project. `?src=qr` on any address marks a QR-originated visit.

## Publish

Hosted from GitHub (TechAI-Trivandi/storyframeinteractiveatp) on Vercel as the project `storyframeinteractiveatp`
(https://storyframeinteractiveatp.vercel.app). Every push to `main` redeploys. There is no build step: the files sit
at the repository root, the framework is Other and the output directory is `.` (`vercel.json` is included).
Optional: enable Web Analytics in the Vercel project to see the events.

## Deep links and QR codes

- Experience: `/` (QR: `/?src=qr`)
- Quiz: `/quiz.html` (QR: `/quiz.html?src=qr`)
- Challenge: `/challenge.html` (QR: `/challenge.html?src=qr`)

The live StoryFrame stories BG02 and PP03 link to the quiz and the challenge. The related-story links on these pages
point to the live StoryFrame stories set in `experience.config.js` (`links.stories`).

## Customise

Edit `experience.config.js` for the scene, narrative, destination, phone preview and links.

This is an illustrative concept, not an official ATP or tournament experience. See `credits.html`.
