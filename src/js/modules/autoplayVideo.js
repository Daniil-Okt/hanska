export function autoplayVideo() {
  const lazyVideos = Array.from(document.querySelectorAll('video.lazy'));
  const centerPlayVideos = Array.from(
    document.querySelectorAll('video[data-play-center], video[data-play-сenter]')
  ).filter((video) => !video.hasAttribute('autoplay'));

  if (!lazyVideos.length && !centerPlayVideos.length) return;

  const setVideoPoster = (video) => {
    if (video.dataset.poster) {
      video.poster = video.dataset.poster;
      delete video.dataset.poster;
    }
  };

  const loadVideoSources = (video) => {
    const sources = video.querySelectorAll('source[data-src]');
    let hasLazySources = false;

    sources.forEach((source) => {
      source.src = source.dataset.src;
      delete source.dataset.src;
      hasLazySources = true;
    });

    if (hasLazySources) {
      video.load();
    }
  };

  const hydrateVideo = (video) => {
    setVideoPoster(video);
    loadVideoSources(video);
    video.classList.remove('lazy');
  };

  if (!('IntersectionObserver' in window)) {
    lazyVideos.forEach(hydrateVideo);
    return;
  }

  const lazyVideoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const video = entry.target;
        hydrateVideo(video);
        observer.unobserve(video);
      });
    },
    {
      root: null,
      rootMargin: '320px 0px',
      threshold: 0,
    }
  );

  lazyVideos.forEach((video) => lazyVideoObserver.observe(video));

  if (!centerPlayVideos.length) return;

  const centerPlayObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const video = entry.target;

        if (video.classList.contains('lazy')) {
          hydrateVideo(video);
        }

        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }

        observer.unobserve(video);
      });
    },
    {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    }
  );

  centerPlayVideos.forEach((video) => centerPlayObserver.observe(video));
}
