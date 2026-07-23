// All page content is rendered server-side at build time; this file only
// wires up a few bits of pure client-side interaction: the prose/bullets
// mode toggle, the mobile sidebar drawer, and collapsing/expanding a
// sidebar tree branch. Collapse state isn't persisted (no localStorage) —
// each page load recomputes which branches start open server-side, based
// on where you are, so this only ever affects the current page view.

document.addEventListener('click', (e) => {
  const treeToggle = e.target.closest('.tree-toggle');
  if (treeToggle) {
    const li = treeToggle.closest('li');
    const isOpen = li.classList.toggle('tree-open');
    treeToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    return;
  }
  const modeBtn = e.target.closest('.mode-toggle button');
  if (modeBtn) {
    const toggle = modeBtn.parentElement;
    const card = toggle.closest('.card');
    toggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    modeBtn.classList.add('active');
    const isProse = modeBtn.dataset.mode === 'prose';
    card.querySelector(':scope > .content-prose').classList.toggle('active', isProse);
    card.querySelector(':scope > .content-bullets').classList.toggle('active', !isProse);
    return;
  }
  const toggleBtn = e.target.closest('.sidebar-toggle');
  if (toggleBtn) {
    document.body.classList.toggle('sidebar-open');
    return;
  }
});
