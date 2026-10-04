/**
 * Cart, stored in the visitor's browser (localStorage). No accounts or server.
 * Checkout hands these lines to the payment provider (see src/pages/checkout.astro).
 */
import { getProduct, subscription } from '../data/products';

export type Line = {
  id: string;
  size: string;
  grind: string | null;
  qty: number;
  /** Subscription frequency id, or null for a one-time purchase. */
  sub: string | null;
};

const KEY = 'woodfox-cart-v1';

export const keyOf = (l: Line) => [l.id, l.size, l.grind ?? '-', l.sub ?? 'once'].join('|');

export function getCart(): Line[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw.filter((l: Line) => getProduct(l.id)) : [];
  } catch {
    return [];
  }
}

function save(lines: Line[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable: cart lasts for this page only */
  }
  document.dispatchEvent(new CustomEvent('cart:change', { detail: lines }));
}

export function addLine(line: Line) {
  const lines = getCart();
  const existing = lines.find((l) => keyOf(l) === keyOf(line));
  if (existing) existing.qty = Math.min(existing.qty + line.qty, 20);
  else lines.push(line);
  save(lines);
}

export function setQty(key: string, qty: number) {
  const lines = getCart()
    .map((l) => (keyOf(l) === key ? { ...l, qty: Math.max(0, Math.min(qty, 20)) } : l))
    .filter((l) => l.qty > 0);
  save(lines);
}

export function clearCart() {
  save([]);
}

/** Unit price in cents for a line, including the subscription discount. */
export function unitPrice(l: Line) {
  const p = getProduct(l.id);
  const size = p?.sizes.find((s) => s.id === l.size) ?? p?.sizes[0];
  if (!size) return 0;
  return l.sub ? Math.round(size.price * (1 - subscription.discount)) : size.price;
}

export const count = (lines = getCart()) => lines.reduce((n, l) => n + l.qty, 0);

/* Header badge + quick-add buttons ---------------------------------------- */
function renderBadge() {
  const n = count();
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.textContent = String(n);
    el.closest('a')?.setAttribute('aria-label', `Cart, ${n} item${n === 1 ? '' : 's'}`);
  });
}
renderBadge();
document.addEventListener('cart:change', renderBadge);
window.addEventListener('storage', (e) => e.key === KEY && renderBadge());

let toastTimer: number | undefined;
export function toast(message: string) {
  let el = document.querySelector<HTMLElement>('[data-toast]');
  if (!el) {
    el = document.createElement('div');
    el.dataset.toast = '';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.innerHTML = `<span></span><a href="/checkout/">View cart →</a>`;
  el.querySelector('span')!.textContent = message;
  el.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el!.classList.remove('is-visible'), 3500);
}

document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-add]');
  if (!btn) return;
  const p = getProduct(btn.dataset.id || '');
  if (!p) return;
  addLine({ id: p.id, size: btn.dataset.size || p.sizes[0].id, grind: p.grinds ? 'whole' : null, qty: 1, sub: null });
  btn.dataset.added = '';
  const label = btn.textContent;
  btn.textContent = 'Added ✓';
  setTimeout(() => {
    delete btn.dataset.added;
    btn.textContent = label;
  }, 1600);
  toast(`${p.name} added to your cart.`);
});
