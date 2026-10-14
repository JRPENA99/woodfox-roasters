/**
 * The site's only JavaScript (a few KB). Everything works without it;
 * this adds the mobile menu, header state, gentle reveals, the hero video
 * and friendlier form handling.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* Header: solid background once the page scrolls past the hero ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
if (header?.classList.contains('is-overlay')) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Mobile menu ----------------------------------------------------------- */
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (toggle && menu && header) {
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    header.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    const text = toggle.querySelector('.menu-text');
    if (text) text.textContent = open ? 'Close' : 'Menu';
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => e.matches && setOpen(false));
}

/* Reveal on scroll ------------------------------------------------------ */
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* Hero video ------------------------------------------------------------ */
const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
const videoBtn = document.querySelector<HTMLButtonElement>('[data-video-toggle]');
if (video) {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  // Phones get the still photograph: the film is large, and data matters on mobile.
  const wideEnough = window.matchMedia('(min-width: 768px)').matches;
  const allowVideo = wideEnough && !reduceMotion.matches && !conn?.saveData;

  const setLabel = () => {
    if (!videoBtn) return;
    const paused = video.paused;
    videoBtn.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    videoBtn.dataset.state = paused ? 'paused' : 'playing';
  };

  if (allowVideo) {
    // Sources are attached by JS so the large file never loads when motion is reduced.
    const src = video.dataset.src;
    if (src) {
      const source = document.createElement('source');
      source.src = src;
      source.type = video.dataset.type || 'video/mp4';
      video.appendChild(source);
      video.autoplay = true;
      video.load();
      video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
      video.play().catch(() => setLabel());
    }
    if (videoBtn) videoBtn.hidden = false;
  }

  video.addEventListener('play', setLabel);
  video.addEventListener('pause', setLabel);
  videoBtn?.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
}

/* Forms ----------------------------------------------------------------- */
/**
 * Forms post to the endpoint set in src/config/site.ts. With no endpoint they
 * open the visitor's email app, addressed to the business inbox, with the
 * submitted fields written out as plain text.
 */
document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const say = (msg: string, state: 'success' | 'error' | '' = '') => {
    if (!status) return;
    status.textContent = msg;
    status.dataset.state = state;
  };

  const validate = () => {
    let firstInvalid: HTMLElement | null = null;
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[required], [pattern]').forEach((el) => {
      const ok = el.checkValidity();
      el.setAttribute('aria-invalid', String(!ok));
      if (!ok && !firstInvalid) firstInvalid = el;
    });
    return firstInvalid as HTMLElement | null;
  };

  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true' && el.checkValidity()) el.setAttribute('aria-invalid', 'false');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = validate();
    if (invalid) {
      say('Please check the highlighted fields.', 'error');
      invalid.focus();
      return;
    }

    const data = new FormData(form);
    if (data.get('company_website')) return; // honeypot

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      const to = form.dataset.mailto;
      if (!to) return say('This form is not available right now. Please try again later.', 'error');
      const labels: Record<string, string> = {
        topic: 'Topic', name: 'Name', email: 'Email', business: 'Business', phone: 'Phone',
        business_type: 'Business type', estimated_needs: 'Estimated coffee needs', message: 'Message',
      };
      const lines: string[] = [];
      for (const [k, v] of data.entries()) {
        if (!(k in labels) || typeof v !== 'string' || !v.trim()) continue;
        // Plain text only; trimmed and length-capped by the inputs' maxlength.
        const clean = v.replace(/[\u0000-\u0008\u000B-\u001F]/g, '').trim();
        lines.push(k === 'message' ? `\n${clean}` : `${labels[k]}: ${clean}`);
      }
      const business = data.get('business');
      const subject = `${form.dataset.subject || 'Website inquiry'}${business ? ` – ${String(business).slice(0, 80)}` : ''}`;
      const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      submit?.setAttribute('disabled', '');
      say('Opening your email app…');
      window.location.href = href;
      setTimeout(() => {
        submit?.removeAttribute('disabled');
        say(`Your email app should now show your message, ready to send. If nothing opened, email us at ${to}.`, 'success');
      }, 900);
      return;
    }

    submit?.setAttribute('disabled', '');
    say('Sending…');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say(form.dataset.success || 'Thank you. We’ll be in touch.', 'success');
    } catch {
      say('Something went wrong sending this. Please try again, or email us directly.', 'error');
    } finally {
      submit?.removeAttribute('disabled');
    }
  });
});
