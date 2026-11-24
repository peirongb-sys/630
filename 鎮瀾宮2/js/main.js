(() => {
  'use strict';

  // 使用台灣時區取得時間，不依賴裝置目前設定的時區。
  function getTaiwanTime() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return { hour: Number(values.hour), minute: Number(values.minute) };
  }

  function updateOpeningStatus() {
    const status = document.getElementById('opening-status');
    const detail = document.getElementById('opening-detail');
    const row = status?.closest('.status-row');
    if (!status || !detail || !row) return;
    const { hour, minute } = getTaiwanTime();
    const minutes = hour * 60 + minute;
    row.classList.remove('is-warning', 'is-closed');
    if (minutes < 16 * 60) {
      status.textContent = '今日開放中（建議 16:00 前入場）';
      detail.textContent = `台灣時間 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}｜距建議入場時間約 ${Math.floor((16 * 60 - minutes) / 60)} 小時 ${((16 * 60 - minutes) % 60)} 分`;
    } else if (minutes < 17 * 60) {
      row.classList.add('is-warning');
      status.textContent = '即將閉館！文化廳 17:00 準時關閉';
      detail.textContent = `台灣時間 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}｜請把握最後入場時間`;
    } else {
      row.classList.add('is-closed');
      status.textContent = '今日已閉館（每日 17:00 準時關閉）';
      detail.textContent = `台灣時間 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}｜請安排明日參觀`;
    }
  }
  updateOpeningStatus();
  window.setInterval(updateOpeningStatus, 60_000);

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.setAttribute('aria-label', expanded ? '開啟導覽選單' : '關閉導覽選單');
    nav?.classList.toggle('is-open', !expanded);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', '開啟導覽選單');
  }));

  // 工藝卡使用原生 dialog；支援 Esc、背景點擊與明確關閉按鈕。
  document.querySelectorAll('[data-modal]').forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.modal);
    if (!dialog) return;
    trigger.addEventListener('click', () => dialog.showModal());
    dialog.querySelector('.modal-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  // 五媽祖頁籤遵循 tablist 鍵盤操作慣例。
  const tabs = [...document.querySelectorAll('.mazu-tab')];
  function selectTab(tab, moveFocus = false) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    if (moveFocus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[next], true);
    });
  });

  // 分類篩選同時更新卡片顯示與全部項目數量。
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const placeCards = [...document.querySelectorAll('.place-card')];
  const emptyMessage = document.querySelector('.filter-empty');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let visibleCount = 0;
    placeCards.forEach((card) => {
      const visible = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
  }));
})();
