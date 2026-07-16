document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-gpt-source-tabs]').forEach((tabset) => {
    const tabs = Array.from(tabset.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabset.querySelectorAll('[role="tabpanel"]'));

    const activate = (nextTab, moveFocus = false) => {
      tabs.forEach((tab) => {
        const selected = tab === nextTab;
        tab.classList.toggle('is-active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== nextTab.getAttribute('aria-controls');
      });

      if (moveFocus) nextTab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = null;

        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;

        if (nextIndex !== null) {
          event.preventDefault();
          activate(tabs[nextIndex], true);
        }
      });
    });
  });
});
