// StoryFrame x ATP Tour: Indian Wells concept. All scene samples are anchored to world directions.
window.STORYFRAME_CONFIG = {
  "title": "StoryFrame · Tennis Paradise (concept)",
  "description": "An illustrative StoryFrame concept: look around a desert tennis stadium, gather its stories, then try the quiz and the timing challenge.",
  "destination": "https://storyframe.live/live/atp-indian-wells",
  "location": "INDIAN WELLS · TENNIS PARADISE",
  "scene": {
    "image": "./assets/scene-360.webp",
    "label": "Concept 360-degree scene of a desert tennis stadium at golden hour. Drag or use the arrow keys to look around.",
    "projection": "equirectangular",
    "initialYaw": 0,
    "initialPitch": -0.06,
    "birds": false,
    "viewFov": 70,
    "maxHorizontalFov": 96
  },
  "timing": {
    "exploreSeconds": 5,
    "transitionSeconds": 7.6
  },
  "audio": {
    "src": "./assets/desert-tennis.mp3",
    "volume": 0.7,
    "windVolume": 0.012,
    "birds": true
  },
  "narrative": "Late sun pours across the desert and the mountains turn violet above Indian Wells. Palms lean over the walkways. A ball kid crouches at the net post, ready to run. In the stands, a volunteer points a family to their seats. A serve cracks, the crowd breathes in and a rally begins. Every corner of this garden holds a story: the sand that became a stadium, the people who start work before dawn, the champions who arrived as teenagers, the date palms and canyons of the valley beyond. Some stories happen on the court. Many more happen all around it. Gather them, one scan at a time. StoryFrame puts the stories of Tennis Paradise in your hands.",
  "phone": {
    "previewOnly": false,
    "label": "Preview of the Tennis Paradise StoryFrame page",
    "logo": "./assets/live/logo.webp",
    "background": "./assets/live/background.webp",
    "welcome": [
      "Welcome to",
      "Tennis Paradise"
    ],
    "featured": {
      "title": "Welcome to Tennis Paradise",
      "image": "./assets/live/welcome.webp"
    },
    "categories": [
      { "title": "Tennis Paradise", "image": "./assets/live/category-0.webp" },
      { "title": "Behind the Scenes", "image": "./assets/live/category-1.webp" },
      { "title": "Beyond the Game", "image": "./assets/live/category-2.webp" },
      { "title": "Discover the Valley", "image": "./assets/live/category-3.webp" },
      { "title": "Powered by Partners", "image": "./assets/live/category-4.webp" }
    ]
  },
  // Interactive stories hosted here, linked from the live StoryFrame stories BG02 and PP03.
  "interactive": [
    { "id": "BG02", "label": "Take the quiz", "title": "Think You Know Tennis?", "href": "./quiz.html" },
    { "id": "PP03", "label": "Take the challenge", "title": "Every Second Counts", "href": "./challenge.html" }
  ],
  // Live StoryFrame story addresses, used by the related-story links on the interactive pages.
  "links": {
    "hub": "https://storyframe.live/live/atp-indian-wells",
    "stories": {
      "W01": "https://storyframe.live/live/atp-indian-wells/s/welcome-to-tennis-paradise",
      "TP01": "https://storyframe.live/live/atp-indian-wells/s/how-a-desert-became-tennis-paradise",
      "TP02": "https://storyframe.live/live/atp-indian-wells/s/the-stadium-that-changed-everything",
      "TP03": "https://storyframe.live/live/atp-indian-wells/s/where-legends-were-made",
      "TP04": "https://storyframe.live/live/atp-indian-wells/s/the-magic-of-the-desert",
      "TP05": "https://storyframe.live/live/atp-indian-wells/s/more-than-a-tennis-garden",
      "BS01": "https://storyframe.live/live/atp-indian-wells/s/before-the-first-serve",
      "BS02": "https://storyframe.live/live/atp-indian-wells/s/the-people-behind-the-perfect-court",
      "BS03": "https://storyframe.live/live/atp-indian-wells/s/a-day-in-the-life-of-a-ball-kid",
      "BS04": "https://storyframe.live/live/atp-indian-wells/s/the-voices-of-tennis-paradise",
      "BS05": "https://storyframe.live/live/atp-indian-wells/s/when-the-lights-go-down",
      "BG01": "https://storyframe.live/live/atp-indian-wells/s/the-road-to-the-tour",
      "BG02": "https://storyframe.live/live/atp-indian-wells/s/love-deuce-and-the-rules-of-the-game",
      "BG03": "https://storyframe.live/live/atp-indian-wells/s/life-on-tour",
      "BG04": "https://storyframe.live/live/atp-indian-wells/s/the-next-generation",
      "BG05": "https://storyframe.live/live/atp-indian-wells/s/the-moments-that-define-a-career",
      "DV01": "https://storyframe.live/live/atp-indian-wells/s/beyond-tennis-paradise",
      "DV02": "https://storyframe.live/live/atp-indian-wells/s/made-in-the-valley",
      "DV03": "https://storyframe.live/live/atp-indian-wells/s/the-flavors-of-the-desert",
      "DV04": "https://storyframe.live/live/atp-indian-wells/s/from-local-courts-to-center-court",
      "DV05": "https://storyframe.live/live/atp-indian-wells/s/the-stories-written-in-the-landscape",
      "PP01": "https://storyframe.live/live/atp-indian-wells/s/the-next-generation-of-tennis",
      "PP02": "https://storyframe.live/live/atp-indian-wells/s/the-journey-behind-the-champion",
      "PP03": "https://storyframe.live/live/atp-indian-wells/s/every-second-counts",
      "PP04": "https://storyframe.live/live/atp-indian-wells/s/the-art-of-the-perfect-experience",
      "PP05": "https://storyframe.live/live/atp-indian-wells/s/discover-something-extraordinary"
    }
  },
  "concept": "An illustrative StoryFrame concept. Not an official ATP or BNP Paribas Open experience."
};
