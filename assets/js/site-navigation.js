(function () {
  'use strict';

  function getPageKey() {
    var page = window.location.pathname.split('/').pop().toLowerCase();

    if (page === 'about.html') return 'about';
    if (page === 'news.html' || page === 'news-grid.html') return 'news';
    if (page === 'contact.html') return 'contact';
    if (page === 'tea-brokering.html' || page === 'rubber-brokering.html' ||
        page === 'produce-brokering.html' || page === 'warehouse-service.html' ||
        page === 'logistics-service.html' || page === 'paper-sacks.html') {
      return 'service';
    }
    return 'home';
  }

  function languageSelector() {
    return [
      '<div class="lang-selector-wrapper">',
      '  <button type="button" class="lang-btn" aria-label="Select Language">',
      '    <svg class="lang-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '      <circle cx="12" cy="12" r="10"/>',
      '      <path d="M2 12h20"/>',
      '      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
      '    </svg>',
      '    <span id="current-lang-text">EN</span>',
      '    <svg class="lang-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '      <path d="M6 9l6 6 6-6"/>',
      '    </svg>',
      '  </button>',
      '  <div class="lang-dropdown">',
      '    <a href="#" class="lang-item active" data-lang="en"><span class="flag">🇬🇧</span> English <span class="native">EN</span></a>',
      '    <a href="#" class="lang-item" data-lang="si"><span class="flag">🇱🇰</span> Sinhala <span class="native">සිංහල</span></a>',
      '    <a href="#" class="lang-item" data-lang="ta"><span class="flag">🇮🇳</span> Tamil <span class="native">தமிழ்</span></a>',
      '    <a href="#" class="lang-item" data-lang="zh"><span class="flag">🇨🇳</span> Chinese <span class="native">中文</span></a>',
      '    <a href="#" class="lang-item" data-lang="ja"><span class="flag">🇯🇵</span> Japanese <span class="native">日本語</span></a>',
      '    <a href="#" class="lang-item" data-lang="ar"><span class="flag">🇦🇪</span> Arabic <span class="native">العربية</span></a>',
      '    <a href="#" class="lang-item" data-lang="ru"><span class="flag">🇷🇺</span> Russian <span class="native">Русский</span></a>',
      '    <a href="#" class="lang-item" data-lang="de"><span class="flag">🇩🇪</span> German <span class="native">Deutsch</span></a>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function menuMarkup(pageKey) {
    var active = {
      home: pageKey === 'home' ? ' class="active"' : '',
      about: pageKey === 'about' ? ' class="active"' : '',
      service: pageKey === 'service' ? ' class="has-dropdown active"' : ' class="has-dropdown"',
      news: pageKey === 'news' ? ' class="active"' : '',
      contact: pageKey === 'contact' ? ' class="active"' : ''
    };

    return [
      '<ul>',
      '  <li' + active.home + '><a href="index.html">Home</a></li>',
      '  <li' + active.about + '><a href="about.html">About Us</a></li>',
      '  <li' + active.service + '>',
      '    <a href="#">Service</a>',
      '    <ul class="submenu">',
      '      <li class="has-dropdown"><a href="#">Brokering <i class="fas fa-angle-right"></i></a>',
      '        <ul class="submenu">',
      '          <li><a href="tea-brokering.html">Tea</a></li>',
      '          <li><a href="rubber-brokering.html">Rubber</a></li>',
      '          <li><a href="produce-brokering.html">Commodities</a></li>',
      '        </ul>',
      '      </li>',
      '      <li class="has-dropdown"><a href="#">Logistics <i class="fas fa-angle-right"></i></a>',
      '        <ul class="submenu">',
      '          <li><a href="warehouse-service.html">Warehouse</a></li>',
      '          <li><a href="logistics-service.html">Logistics</a></li>',
      '        </ul>',
      '      </li>',
      '      <li class="has-dropdown"><a href="#">Packing Materials <i class="fas fa-angle-right"></i></a>',
      '        <ul class="submenu"><li><a href="paper-sacks.html">Paper Sacks</a></li></ul>',
      '      </li>',
      '    </ul>',
      '  </li>',
      '  <li><a href="index.html#annual-reports">Annual Reports</a></li>',
      '  <li' + active.news + '><a href="news.html">Blog</a></li>',
      '  <li' + active.contact + '><a href="contact.html">Contact Us</a></li>',
      '</ul>'
    ].join('');
  }

  function init() {
    var header = document.querySelector('#header-sticky');
    if (!header) return;

    var nav = header.querySelector('#mobile-menu');
    var pageKey = getPageKey();
    if (nav) nav.innerHTML = menuMarkup(pageKey);

    header.querySelectorAll('.logo img').forEach(function (image) {
      image.src = 'assets/img/logo/user-asia-siyaka-logo.png';
      image.alt = 'Asia Siyaka Commodities PLC';
    });

    var headerRight = header.querySelector('.header-right');
    var menuWrapper = header.querySelector('.mean__menu-wrapper');
    if (headerRight && menuWrapper && !headerRight.querySelector('.lang-selector-wrapper')) {
      menuWrapper.insertAdjacentHTML('afterend', languageSelector());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
