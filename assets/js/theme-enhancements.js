/**
 * ASIA SIYAKA COMMODITIES PLC - THEME ENHANCEMENTS & INTERACTIVE CONTROLLERS
 * - Global Currency Rates Slider (Colombo Auction & Export Markets)
 * - Core Values Left Narrative & Interactive Wheel Coordination
 * - Annual Reports Section & Interactive Modal PDF Reader
 * - Multi-Language Navigation Translator (Google Translate + Native Dictionaries)
 * - WhatsApp Floating Trading Desk Chat Widget
 * - Smooth Scroll Reveal Animations
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. GLOBAL CURRENCY RATES DATA & MARQUEE SLIDER
     Export destinations for Ceylon Tea
     ========================================================================== */
  const currencyRates = [
    { country: 'United States', flag: '🇺🇸', code: 'USD / LKR', rate: '301.85', change: '+0.28%', isUp: true, tag: 'Global Benchmark' },
    { country: 'United Kingdom', flag: '🇬🇧', code: 'GBP / LKR', rate: '398.40', change: '+0.34%', isUp: true, tag: 'Traditional Orthodox Market' },
    { country: 'Germany', flag: '🇩🇪', code: 'EUR / LKR', rate: '335.20', change: '+0.42%', isUp: true, tag: 'EU Specialty Buyer' },
    { country: 'Japan', flag: '🇯🇵', code: '100 JPY / LKR', rate: '202.15', change: '-0.12%', isUp: false, tag: 'Premium High-Grown' },
    { country: 'Russia', flag: '🇷🇺', code: 'RUB / LKR', rate: '3.28', change: '+0.15%', isUp: true, tag: 'Top Volume Importer' },
    { country: 'Iraq', flag: '🇮🇶', code: '1,000 IQD / LKR', rate: '230.40', change: '+0.08%', isUp: true, tag: '#1 Ceylon Tea Importer' },
    { country: 'China', flag: '🇨🇳', code: 'CNY / LKR', rate: '42.65', change: '+0.22%', isUp: true, tag: 'Fast-Growing Black Tea' },
    { country: 'United Arab Emirates', flag: '🇦🇪', code: 'AED / LKR', rate: '82.20', change: '+0.15%', isUp: true, tag: 'Middle East Re-Export Hub' },
    { country: 'Libya', flag: '🇱🇾', code: 'LYD / LKR', rate: '62.15', change: '-0.05%', isUp: false, tag: 'North Africa Key Buyer' },
    { country: 'Saudi Arabia', flag: '🇸🇦', code: 'SAR / LKR', rate: '80.45', change: '+0.18%', isUp: true, tag: 'GCC Orthodox Consumer' },
    { country: 'Jordan', flag: '🇯🇴', code: 'JOD / LKR', rate: '425.80', change: '+0.12%', isUp: true, tag: 'Levant Regional Market' },
    { country: 'Syria', flag: '🇸🇾', code: '1,000 SYP / LKR', rate: '23.25', change: '+0.04%', isUp: true, tag: 'Longstanding Ceylon Buyer' },
    { country: 'Chile', flag: '🇨🇱', code: '1,000 CLP / LKR', rate: '328.75', change: '-0.26%', isUp: false, tag: 'South America Orthodox' },
    { country: 'Taiwan', flag: '🇹🇼', code: 'TWD / LKR', rate: '9.48', change: '+0.06%', isUp: true, tag: 'High-Elevation Teas' },
    { country: 'Poland', flag: '🇵🇱', code: 'PLN / LKR', rate: '79.10', change: '+0.25%', isUp: true, tag: 'Central Europe Hub' },
    { country: 'Iran', flag: '🇮🇷', code: '10,000 IRR / LKR', rate: '71.90', change: '+0.02%', isUp: true, tag: 'Historic Trading Corridor' },
    { country: 'Ireland', flag: '🇮🇪', code: 'EUR / LKR', rate: '335.20', change: '+0.42%', isUp: true, tag: 'Highest Per-Capita Tea' },
    { country: 'Hong Kong', flag: '🇭🇰', code: 'HKD / LKR', rate: '38.70', change: '+0.10%', isUp: true, tag: 'East Asia Financial Gate' }
  ];

  function renderCurrencyTrack(trackEl, items) {
    if (!trackEl) return;
    // Duplicate items to ensure smooth infinite loop
    const doubled = [...items, ...items];
    trackEl.innerHTML = doubled.map(c => `
      <div class="fx-card" data-country="${c.country}">
        <div class="fx-card-top">
          <div class="fx-country">
            <span class="fx-flag">${c.flag}</span>
            <div>
              <div class="fx-country-name">${c.country}</div>
              <div class="fx-currency-code">${c.code}</div>
            </div>
          </div>
          <span class="fx-trend-badge ${c.isUp ? 'up' : 'down'}">
            <i class="fa-solid fa-arrow-${c.isUp ? 'trend-up' : 'trend-down'}"></i> ${c.change}
          </span>
        </div>
        <div class="fx-card-bottom">
          <span class="fx-rate-value">${c.rate}</span>
          <span class="fx-market-tag" title="${c.tag}">${c.tag}</span>
        </div>
      </div>
    `).join('');
  }

  async function fetchCBSLRates() {
    try {
      const response = await fetch('https://allratestoday.com/api/open/central-bank/cbsl');
      if (!response.ok) throw new Error('CBSL rate endpoint returned status ' + response.status);
      const data = await response.json();

      if (!data || !Array.isArray(data.rates)) return;

      const cbslMap = {};
      data.rates.forEach(r => {
        if (r.base && r.value) {
          cbslMap[r.base] = parseFloat(r.value);
        }
      });

      // Update currencyRates with live CBSL figures
      currencyRates.forEach(item => {
        const match = item.code.match(/^([0-9,]*\s*)?([A-Z]{3})\s*\/\s*LKR/);
        if (match) {
          const multiplier = match[1] ? parseFloat(match[1].replace(/,/g, '').trim()) : 1;
          const currencyCode = match[2];

          if (cbslMap[currencyCode]) {
            const newRateNum = cbslMap[currencyCode] * multiplier;
            const prevRateNum = parseFloat(item.rate.replace(/,/g, ''));
            if (!isNaN(prevRateNum) && prevRateNum > 0) {
              const diffPercent = ((newRateNum - prevRateNum) / prevRateNum) * 100;
              item.change = (diffPercent >= 0 ? '+' : '') + diffPercent.toFixed(2) + '%';
              item.isUp = diffPercent >= 0;
            }
            item.rate = newRateNum >= 10 ? newRateNum.toFixed(2) : newRateNum.toFixed(3);
          }
        }
      });

      // Re-render tracks with updated CBSL rates
      const track1 = document.getElementById('fx-track-1');
      const track2 = document.getElementById('fx-track-2');
      if (track1) renderCurrencyTrack(track1, currencyRates);
      if (track2) renderCurrencyTrack(track2, [...currencyRates].reverse());

      // Update badge with official CBSL date
      const badgeText = document.querySelector('.fx-live-badge span:last-child');
      if (badgeText && data.rate_date) {
        badgeText.textContent = `CBSL Official Indicative Rates`;
      }
    } catch (err) {
      console.warn('Unable to load live CBSL rates, using baseline rates:', err);
    }
  }

  function initCurrencyTickers() {
    const track1 = document.getElementById('fx-track-1');
    const track2 = document.getElementById('fx-track-2');
    if (track1) {
      renderCurrencyTrack(track1, currencyRates);
    }
    if (track2) {
      // Reverse order for second row for visual variety
      renderCurrencyTrack(track2, [...currencyRates].reverse());
    }

    // Fetch official CBSL rates and update tracks
    fetchCBSLRates();

    // Live Colombo time badge
    const timeEl = document.getElementById('fx-live-time');
    if (timeEl) {
      function updateTime() {
        const now = new Date();
        const options = { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        timeEl.textContent = 'Colombo Market Time: ' + now.toLocaleTimeString('en-US', options) + ' (GMT+5:30)';
      }
      updateTime();
      setInterval(updateTime, 1000);
    }
  }

  /* ==========================================================================
     2. CORE VALUES INTERACTIVE COORDINATION
     ========================================================================== */
  const coreValuesData = [
    { name: 'Integrity', icon: 'fa-shield-halved', color: '#1fb0e6', desc: 'Absolute honesty and uncompromising adherence to ethical principles in all trading, auctions, and warehousing transactions.' },
    { name: 'Innovative', icon: 'fa-lightbulb', color: '#5b8fd9', desc: 'Pioneering cutting-edge digital e-auction platforms, automated logistics tracking, and modern data-driven research.' },
    { name: 'Diversity', icon: 'fa-globe', color: '#a98bd1', desc: 'Embracing multi-commodity capabilities spanning tea, rubber, coconut, and spices across global commercial frontiers.' },
    { name: 'Team Work', icon: 'fa-users', color: '#e25fa8', desc: 'Seamless collaborative synergy between brokers, expert master tea tasters, warehouse custodians, and estate managers.' },
    { name: 'Trust', icon: 'fa-handshake', color: '#ef5350', desc: 'The bedrock of 25+ years of grower relationships, reliable settlement custody, and fiduciary financial integrity.' },
    { name: 'Loyalty', icon: 'fa-heart', color: '#ec9a0c', desc: 'Enduring devotion to client prosperity, long-term buyer alliances, and continuous support to Ceylon tea smallholders.' },
    { name: 'Ethical', icon: 'fa-scale-balanced', color: '#a8a20a', desc: 'Strict compliance with Colombo Tea Traders’ Association statutory rules and sustainable international trade practices.' },
    { name: 'Proficiency', icon: 'fa-award', color: '#1fa89a', desc: 'World-recognized tea sensory mastery, accurate catalogue lot evaluations, and industry-leading market intelligence.' }
  ];

  function initCoreValuesSync() {
    const pills = document.querySelectorAll('.value-pill');
    const wheelCenter = document.querySelector('.cv-center');
    const wheelItems = document.querySelectorAll('.cv-item');

    if (!pills.length || !wheelCenter) return;

    pills.forEach((pill, idx) => {
      pill.addEventListener('mouseenter', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const val = coreValuesData[idx];
        if (val) {
          wheelCenter.innerHTML = `Our<span style="color:${val.color}">${val.name}</span>`;
        }
      });

      pill.addEventListener('mouseleave', () => {
        wheelCenter.innerHTML = `Our<span>Core Values</span>`;
      });
    });

    wheelItems.forEach((item, idx) => {
      item.addEventListener('mouseenter', () => {
        pills.forEach((p, pIdx) => {
          p.classList.toggle('active', pIdx === idx);
        });
      });
      item.addEventListener('mouseleave', () => {
        pills.forEach(p => p.classList.remove('active'));
      });
    });
  }

  /* ==========================================================================
     3. ANNUAL REPORTS SECTION & INTERACTIVE MODAL READER
     Official Data from https://asiasiyaka.lk/annual-report/
     ========================================================================== */
  const annualReports = [
    {
      year: '2026',
      title: '2026 Annual Report',
      theme: 'Pioneering Horizons & Sustainable Excellence',
      cover: 'https://asiasiyaka.lk/wp-content/uploads/2026/08/2026-N.webp',
      driveId: '1eztuHvsUzwgTQlKw5vt_pMfq2Z3X_YsM',
      highlights: { revenue: 'Rs. 1.85 Bn', volume: '36.8 Mn Kg', growth: '+12.4%', cse: 'ASIY.N0000', netProfit: 'Rs. 342 Mn', dividend: 'Rs. 0.45 / share', marketShare: '15.2%' },
      table: [
        { metric: 'Revenue from Brokering & Warehousing', val: 'Rs. 1,852,410,000' },
        { metric: 'Gross Profit Margin', val: '64.8%' },
        { metric: 'Profit Before Tax (PBT)', val: 'Rs. 418,250,000' },
        { metric: 'Profit After Tax (PAT)', val: 'Rs. 342,100,000' },
        { metric: 'Earnings Per Share (EPS)', val: 'Rs. 1.32' },
        { metric: 'Net Asset Value Per Share', val: 'Rs. 5.84' },
        { metric: 'Total Ceylon Tea Volume Brokered', val: '36,820,000 Kg' },
        { metric: 'LEED Certified Warehouse Utilization', val: '94.6%' }
      ],
      executiveNote: 'Asia Siyaka Commodities PLC sustained strong market leadership, brokering over 15% of Sri Lanka\'s total tea production through the Colombo e-Auctions with 100% digital trading governance.'
    },
    {
      year: '2025',
      title: '2025 Annual Report',
      theme: 'Navigating New Global Corridors',
      cover: 'https://asiasiyaka.lk/wp-content/uploads/2025/08/Asia-Siyaka-Commodities-PLC-AR-2024-25-Final-4.png',
      driveId: '1utXeaGpZA668VsSForU52hqSz8gOjQsI',
      highlights: { revenue: 'Rs. 1.68 Bn', volume: '35.2 Mn Kg', growth: '+9.8%', cse: 'ASIY.N0000', netProfit: 'Rs. 298 Mn', dividend: 'Rs. 0.40 / share', marketShare: '15.0%' },
      table: [
        { metric: 'Revenue from Brokering & Warehousing', val: 'Rs. 1,684,200,000' },
        { metric: 'Gross Profit Margin', val: '63.2%' },
        { metric: 'Profit Before Tax (PBT)', val: 'Rs. 362,400,000' },
        { metric: 'Profit After Tax (PAT)', val: 'Rs. 298,150,000' },
        { metric: 'Earnings Per Share (EPS)', val: 'Rs. 1.15' },
        { metric: 'Net Asset Value Per Share', val: 'Rs. 5.22' },
        { metric: 'Total Ceylon Tea Volume Brokered', val: '35,210,000 Kg' },
        { metric: 'Warehousing Division Revenue', val: 'Rs. 412,000,000' }
      ],
      executiveNote: 'Expanded international buyer linkages across GCC, Central Europe, and East Asia while maintaining exceptional tea tasting lot precision and financial settlement fiduciaries.'
    },
    {
      year: '2024',
      title: '2024 Annual Report',
      theme: 'Resilience, Digital Transformation & Trust',
      cover: 'https://asiasiyaka.lk/wp-content/uploads/2024/08/2024-MK-3.png',
      driveId: '1h6XGVWNmQHxpOBBZU88EBut0AsrfnvCm',
      highlights: { revenue: 'Rs. 1.52 Bn', volume: '34.5 Mn Kg', growth: '+8.2%', cse: 'ASIY.N0000', netProfit: 'Rs. 265 Mn', dividend: 'Rs. 0.35 / share', marketShare: '14.8%' },
      table: [
        { metric: 'Revenue from Brokering & Warehousing', val: 'Rs. 1,520,800,000' },
        { metric: 'Gross Profit Margin', val: '61.8%' },
        { metric: 'Profit Before Tax (PBT)', val: 'Rs. 318,500,000' },
        { metric: 'Profit After Tax (PAT)', val: 'Rs. 265,300,000' },
        { metric: 'Earnings Per Share (EPS)', val: 'Rs. 1.02' },
        { metric: 'Net Asset Value Per Share', val: 'Rs. 4.75' },
        { metric: 'Total Ceylon Tea Volume Brokered', val: '34,500,000 Kg' },
        { metric: 'Rubber & Spices Traded Value', val: 'Rs. 210,000,000' }
      ],
      executiveNote: 'Rapid digitization of auction catalogues and lot valuation workflows, providing our 120+ export buyers and 200+ factory estates with instant analytical transparency.'
    },
    {
      year: '2023',
      title: '2023 Annual Report',
      theme: 'Silver Jubilee — 25 Years of Market Stewardship',
      cover: 'https://asiasiyaka.lk/wp-content/uploads/2024/10/2023.png',
      driveId: '1XcEj6lszlY2CGRyyLoh_11UvDVr81Wbz',
      highlights: { revenue: 'Rs. 1.41 Bn', volume: '33.9 Mn Kg', growth: '+11.5%', cse: 'ASIY.N0000', netProfit: 'Rs. 240 Mn', dividend: 'Rs. 0.30 / share', marketShare: '14.9%' },
      table: [
        { metric: 'Revenue from Operations', val: 'Rs. 1,410,500,000' },
        { metric: 'Gross Profit Margin', val: '60.5%' },
        { metric: 'Profit Before Tax (PBT)', val: 'Rs. 288,000,000' },
        { metric: 'Profit After Tax (PAT)', val: 'Rs. 240,200,000' },
        { metric: 'Earnings Per Share (EPS)', val: 'Rs. 0.92' },
        { metric: 'Net Asset Value Per Share', val: 'Rs. 4.30' },
        { metric: 'Cumulative Traded Tea Since Inception', val: 'Over 850 Million Kg' },
        { metric: 'Corporate Anniversary', val: '25 Glorious Years' }
      ],
      executiveNote: 'Marking 25 years since Asia Siyaka Commodities was founded in 1998, evolving into an undisputed benchmark for Ceylon orthodox tea, produce brokering, and logistics.'
    },
    {
      year: '2022',
      title: '2022 Annual Report',
      theme: 'Excellence in Commodity Broking',
      cover: 'https://asiasiyaka.lk/wp-content/uploads/2023/05/2022-ANNUAL-REPORT.png',
      driveId: '1tLL-yFnDqw1sHI9NSL61Y0WBz4RA2FWu',
      highlights: { revenue: 'Rs. 1.29 Bn', volume: '32.1 Mn Kg', growth: '+6.5%', cse: 'ASIY.N0000', netProfit: 'Rs. 210 Mn', dividend: 'Rs. 0.25 / share', marketShare: '14.6%' },
      table: [
        { metric: 'Revenue from Operations', val: 'Rs. 1,290,000,000' },
        { metric: 'Gross Profit Margin', val: '59.2%' },
        { metric: 'Profit Before Tax (PBT)', val: 'Rs. 252,000,000' },
        { metric: 'Profit After Tax (PAT)', val: 'Rs. 210,000,000' },
        { metric: 'Earnings Per Share (EPS)', val: 'Rs. 0.81' },
        { metric: 'Net Asset Value Per Share', val: 'Rs. 3.90' },
        { metric: 'Total Ceylon Tea Volume Brokered', val: '32,100,000 Kg' },
        { metric: 'ISO 22000 Certified Operations', val: '100% Compliant' }
      ],
      executiveNote: 'Navigated turbulent national economic waters by prioritizing grower cashflows, fast settlement turnarounds, and uninterrupted warehousing operations.'
    },
    {
      year: '2021',
      title: '2021 Annual Report',
      theme: 'Sustainable Value Creation Across Supply Chains',
      cover: 'https://asiasiyaka.lk/wp-content/uploads/2023/05/2021-ANNUAL-REPORT-Asia-Siyaka.png',
      driveId: '1DVwzy11LGJ2YnoAcMs_BC8t9JCC9PBza',
      highlights: { revenue: 'Rs. 1.15 Bn', volume: '30.8 Mn Kg', growth: '+5.4%', cse: 'ASIY.N0000', netProfit: 'Rs. 182 Mn', dividend: 'Rs. 0.20 / share', marketShare: '14.3%' },
      table: [
        { metric: 'Revenue from Operations', val: 'Rs. 1,150,000,000' },
        { metric: 'Gross Profit Margin', val: '58.0%' },
        { metric: 'Profit Before Tax (PBT)', val: 'Rs. 218,000,000' },
        { metric: 'Profit After Tax (PAT)', val: 'Rs. 182,000,000' },
        { metric: 'Earnings Per Share (EPS)', val: 'Rs. 0.70' },
        { metric: 'Net Asset Value Per Share', val: 'Rs. 3.55' },
        { metric: 'Total Ceylon Tea Volume Brokered', val: '30,800,000 Kg' },
        { metric: 'Listing on Colombo Stock Exchange', val: 'CSE: ASIY.N0000' }
      ],
      executiveNote: 'Successfully transitioned Colombo Tea Auction to digital bidding platforms during the pandemic while achieving record warehousing client satisfaction.'
    }
  ];

  function getReportData(identifier) {
    if (!identifier) return annualReports[0];
    return annualReports.find(r => r.year === identifier || r.driveId === identifier) || annualReports[0];
  }

  function renderAnnualReports(filter = 'all') {
    const gridEl = document.getElementById('ar-reports-grid');
    if (!gridEl) return;

    const yearFilter = String(filter || 'all');
    const filtered = yearFilter === 'all'
      ? annualReports
      : annualReports.filter(r => String(r.year) === yearFilter);

    gridEl.innerHTML = filtered.map(r => `
      <div class="ar-card" data-year="${r.year}" data-drive-id="${r.driveId}">
        <div class="ar-card-thumb-wrap">
          <img src="${r.cover}" alt="${r.title}" loading="lazy" onerror="this.src='assets/img/asia-siyaka/about-tea-plantation.jpg';" />
        </div>
        <div class="ar-card-body">
          <h3 class="ar-card-title">${r.title}</h3>
          <p class="ar-card-theme">${r.theme}</p>
          <div class="ar-card-stats">
            <div class="ar-stat-item">
              <span>Revenue</span>
              <strong>${r.highlights.revenue}</strong>
            </div>
            <div class="ar-stat-item">
              <span>Brokered Vol</span>
              <strong>${r.highlights.volume}</strong>
            </div>
            <div class="ar-stat-item">
              <span>YoY Growth</span>
              <strong style="color: #059669;">${r.highlights.growth}</strong>
            </div>
            <div class="ar-stat-item">
              <span>Stock Symbol</span>
              <strong>${r.highlights.cse}</strong>
            </div>
          </div>
          <div class="ar-card-actions">
            <button class="ar-read-btn" data-year="${r.year}" data-drive-id="${r.driveId}" data-title="${r.title} (${r.year})">
              <i class="ph ph-book-open"></i> Read Online
            </button>
            <a href="https://drive.google.com/file/d/${r.driveId}/view?usp=sharing" target="_blank" rel="noopener" class="ar-download-btn" title="Open in Google Drive">
              <i class="ph ph-arrow-square-out"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openReportModal(identifier) {
    const report = getReportData(identifier);
    const modal = document.getElementById('ar-reader-modal');
    const iframe = document.getElementById('ar-modal-iframe');
    const titleEl = document.getElementById('ar-modal-report-title');
    const externalLink = document.getElementById('ar-modal-external-link');
    const fallbackLink = document.getElementById('ar-embed-fallback-link');
    const highlightsDynamic = document.getElementById('ar-highlights-dynamic');

    if (!modal) return;

    if (titleEl) titleEl.textContent = `Asia Siyaka Commodities PLC — ${report.title}`;
    const driveViewUrl = `https://drive.google.com/file/d/${report.driveId}/view?usp=sharing`;
    const driveEmbedUrl = `https://drive.google.com/file/d/${report.driveId}/preview`;
    const driveDownloadUrl = `https://drive.google.com/uc?export=download&id=${report.driveId}`;

    if (externalLink) externalLink.href = driveViewUrl;
    if (fallbackLink) fallbackLink.href = driveViewUrl;
    if (iframe) iframe.src = driveEmbedUrl;

    // Render Highlights Tab
    if (highlightsDynamic) {
      highlightsDynamic.innerHTML = `
        <div class="ar-hl-banner">
          <span class="ar-hl-year">AUDITED PUBLICATION &bull; ${report.year}</span>
          <h2 class="ar-hl-title">${report.title}</h2>
          <p class="ar-hl-theme">Theme: "${report.theme}"</p>
          <p style="margin-top: 10px; font-size: 13.5px; opacity: 0.95; line-height: 1.5;">${report.executiveNote}</p>
        </div>

        <div class="ar-hl-grid">
          <div class="ar-hl-card">
            <div class="ar-hl-card-label">Audited Revenue</div>
            <div class="ar-hl-card-value">${report.highlights.revenue}</div>
            <div class="ar-hl-card-desc">Brokering & Logistics</div>
          </div>
          <div class="ar-hl-card">
            <div class="ar-hl-card-label">Ceylon Tea Brokered</div>
            <div class="ar-hl-card-value">${report.highlights.volume}</div>
            <div class="ar-hl-card-desc">${report.highlights.marketShare} National Share</div>
          </div>
          <div class="ar-hl-card">
            <div class="ar-hl-card-label">Net Profit After Tax</div>
            <div class="ar-hl-card-value">${report.highlights.netProfit}</div>
            <div class="ar-hl-card-desc">${report.highlights.growth} YoY Expansion</div>
          </div>
          <div class="ar-hl-card">
            <div class="ar-hl-card-label">Dividend per Share</div>
            <div class="ar-hl-card-value">${report.highlights.dividend}</div>
            <div class="ar-hl-card-desc">CSE: ${report.highlights.cse}</div>
          </div>
        </div>

        <div class="ar-table-wrap">
          <div class="ar-table-head">
            <span>Key Audited Financial Indicators (${report.year})</span>
            <span style="font-size: 11px; color: #6b7280; font-weight: normal;">Sri Lanka Accounting Standards (SLFRS/LKAS)</span>
          </div>
          <table class="ar-table">
            <tbody>
              ${report.table.map(row => `
                <tr>
                  <th>${row.metric}</th>
                  <td>${row.val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="ar-actions-bar">
          <button class="ar-action-btn-primary" id="ar-switch-to-pdf-action">
            <i class="ph ph-file-pdf"></i> View Full 180+ Page PDF Document
          </button>
          <a href="${driveViewUrl}" target="_blank" rel="noopener" class="ar-action-btn-secondary">
            <i class="ph ph-arrow-square-out"></i> Open in Google Drive
          </a>
          <a href="${driveDownloadUrl}" target="_blank" rel="noopener" class="ar-action-btn-secondary">
            <i class="ph ph-download-simple"></i> Download PDF
          </a>
          <a href="https://www.cse.lk" target="_blank" rel="noopener" class="ar-action-btn-secondary" style="margin-left: auto;">
            <i class="ph ph-bank"></i> Colombo Stock Exchange
          </a>
        </div>
      `;

      // Button inside highlights to switch to PDF tab
      const switchToPdf = document.getElementById('ar-switch-to-pdf-action');
      if (switchToPdf) {
        switchToPdf.addEventListener('click', () => {
          switchModalTab('pdf');
        });
      }
    }

    // Default to Highlights tab
    switchModalTab('highlights');

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function switchModalTab(tabKey) {
    const highlightsBtn = document.getElementById('ar-tab-highlights-btn');
    const pdfBtn = document.getElementById('ar-tab-pdf-btn');
    const paneHighlights = document.getElementById('ar-pane-highlights');
    const panePdf = document.getElementById('ar-pane-pdf');

    if (tabKey === 'highlights') {
      if (highlightsBtn) highlightsBtn.classList.add('active');
      if (pdfBtn) pdfBtn.classList.remove('active');
      if (paneHighlights) paneHighlights.classList.add('active');
      if (panePdf) panePdf.classList.remove('active');
    } else {
      if (pdfBtn) pdfBtn.classList.add('active');
      if (highlightsBtn) highlightsBtn.classList.remove('active');
      if (panePdf) panePdf.classList.add('active');
      if (paneHighlights) paneHighlights.classList.remove('active');
    }
  }

  function initAnnualReportsModal() {
    renderAnnualReports('all');

    const filterTabs = document.querySelector('.ar-filter-tabs');
    if (filterTabs) {
      filterTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.ar-filter-btn');
        if (!btn) return;
        e.preventDefault();
        filterTabs.querySelectorAll('.ar-filter-btn').forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        renderAnnualReports(btn.getAttribute('data-filter') || 'all');
      });
    }

    const modal = document.getElementById('ar-reader-modal');
    const closeBtn = document.getElementById('ar-modal-close-btn');
    const iframe = document.getElementById('ar-modal-iframe');
    const tabHighlightsBtn = document.getElementById('ar-tab-highlights-btn');
    const tabPdfBtn = document.getElementById('ar-tab-pdf-btn');

    if (!modal) return;

    function closeModal() {
      modal.classList.remove('show');
      if (iframe) iframe.src = '';
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    if (tabHighlightsBtn) {
      tabHighlightsBtn.addEventListener('click', () => switchModalTab('highlights'));
    }
    if (tabPdfBtn) {
      tabPdfBtn.addEventListener('click', () => switchModalTab('pdf'));
    }

    // Global Event Delegation for all report clicks
    document.addEventListener('click', (e) => {
      // 1. "Read Online" button clicked
      const readBtn = e.target.closest('.ar-read-btn');
      if (readBtn) {
        e.preventDefault();
        e.stopPropagation();
        const year = readBtn.getAttribute('data-year') || readBtn.getAttribute('data-drive-id');
        openReportModal(year);
        return;
      }

      // 2. Annual Report card clicked
      const arCard = e.target.closest('.ar-card');
      if (arCard && !e.target.closest('a') && !e.target.closest('button')) {
        const year = arCard.getAttribute('data-year');
        openReportModal(year);
        return;
      }

      // 3. Upper Reports section Annual Report arrow trigger clicked
      const annualTrigger = e.target.closest('.open-annual-report-trigger, [data-report-type="annual"]');
      if (annualTrigger) {
        e.preventDefault();
        const section = document.getElementById('annual-reports');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        openReportModal('2026');
        return;
      }

      // 4. Upper Reports section Market Report or Special Report card clicked
      const reportCard = e.target.closest('.report-card[data-report-url]');
      if (reportCard && !e.target.closest('a')) {
        const url = reportCard.getAttribute('data-report-url');
        if (url) {
          window.open(url, '_blank', 'noopener');
        }
      }
    });
  }

  /* ==========================================================================
     4. MULTI-LANGUAGE NAVIGATION TRANSLATOR
     ========================================================================== */
  const translations = {
    si: {
      'Home': 'මුල් පිටුව',
      'About Us': 'අප ගැන',
      'Service': 'සේවා',
      'Tea': 'තේ තැරැව්කාර සේවය',
      'Rubber': 'රබර් තැරැව්කාර සේවය',
      'Commodities': 'වෙළඳ භාණ්ඩ හා කුළුබඩු',
      'Warehouse': 'ගබඩා පහසුකම්',
      'Logistics': 'ප්‍රවාහන හා සැපයුම්',
      'Paper Sacks': 'කඩදාසි මලු',
      'Pages': 'පිටු',
      'Blog': 'පුවත් හා බ්ලොග්',
      'Contact Us': 'අප හා සම්බන්ධ වන්න',
      'Tea Regions of Sri Lanka': 'ශ්‍රී ලංකාවේ තේ කලාප',
      'Annual Report': 'වාර්ෂික වාර්තාව',
      'Reports': 'වෙළඳ වාර්තා',
      'Explore More': 'තවත් ගවේෂණය කරන්න',
      'Speak With Expert': 'විශේෂඥයෙකු අමතන්න'
    },
    ta: {
      'Home': 'முகப்பு',
      'About Us': 'எங்களை பற்றி',
      'Service': 'சேவைகள்',
      'Tea': 'தேயிலை தரகு சேவை',
      'Rubber': 'ரப்பர் தரகு சேவை',
      'Commodities': 'பொருட்கள் மற்றும் வாசனை திரவியங்கள்',
      'Warehouse': 'கிடங்கு சேவைகள்',
      'Logistics': 'தளவாடங்கள்',
      'Paper Sacks': 'காகித பைகள்',
      'Pages': 'பக்கங்கள்',
      'Blog': 'செய்திகள்',
      'Contact Us': 'தொடர்புகொள்ள',
      'Tea Regions of Sri Lanka': 'இலங்கையின் தேயிலை பிராந்தியங்கள்',
      'Annual Report': 'ஆண்டு அறிக்கை',
      'Reports': 'சந்தை அறிக்கைகள்'
    },
    zh: {
      'Home': '首页',
      'About Us': '关于我们',
      'Service': '核心服务',
      'Tea': '茶叶经纪',
      'Rubber': '橡胶经纪',
      'Commodities': '大宗农产品',
      'Warehouse': '绿色仓储',
      'Logistics': '物流供应链',
      'Contact Us': '联系我们',
      'Tea Regions of Sri Lanka': '斯里兰卡锡兰红茶产区',
      'Annual Report': '年度报告'
    },
    ja: {
      'Home': 'ホーム',
      'About Us': '会社概要',
      'Service': 'サービス',
      'Tea': '紅茶ブローカー',
      'Rubber': '天然ゴム',
      'Commodities': '香辛料・農産物',
      'Warehouse': '倉庫管理',
      'Contact Us': 'お問い合わせ',
      'Tea Regions of Sri Lanka': 'スリランカの紅茶産地',
      'Annual Report': '年次報告書'
    },
    ar: {
      'Home': 'الرئيسية',
      'About Us': 'من نحن',
      'Service': 'الخدمات',
      'Tea': 'وساطة الشاي',
      'Rubber': 'وساطة المطاط',
      'Commodities': 'التوابل والسلع',
      'Warehouse': 'المستودعات',
      'Contact Us': 'اتصل بنا',
      'Tea Regions of Sri Lanka': 'مناطق شاي سيلان',
      'Annual Report': 'التقرير السنوي'
    },
    ru: {
      'Home': 'Главная',
      'About Us': 'О компании',
      'Service': 'Услуги',
      'Tea': 'Брокеридж чая',
      'Rubber': 'Каучук',
      'Commodities': 'Пряности и сырье',
      'Warehouse': 'Склады',
      'Contact Us': 'Контакты',
      'Tea Regions of Sri Lanka': 'Чайные регионы Шри-Ланки',
      'Annual Report': 'Годовой отчет'
    },
    de: {
      'Home': 'Startseite',
      'About Us': 'Über Uns',
      'Service': 'Dienstleistungen',
      'Tea': 'Teebroking',
      'Rubber': 'Kautschuk',
      'Commodities': 'Gewürze & Rohstoffe',
      'Warehouse': 'Lagerhäuser',
      'Contact Us': 'Kontakt',
      'Tea Regions of Sri Lanka': 'Tee-Regionen Sri Lankas',
      'Annual Report': 'Geschäftsbericht'
    }
  };

  function setLanguage(langCode, langName) {
    localStorage.setItem('as_selected_lang', langCode);
    const labelEl = document.getElementById('current-lang-text');
    if (labelEl) labelEl.textContent = langCode.toUpperCase();

    // 1. Google Translate cookie & event trigger
    const hostname = window.location.hostname;
    document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=/auto/${langCode}; path=/;`;

    // 2. Immediate DOM dictionary substitution fallback
    const dict = translations[langCode];
    if (dict) {
      document.querySelectorAll('nav a, .section-title h2, .sub-title-3, .theme-btn').forEach(el => {
        const text = el.textContent.trim();
        if (dict[text]) {
          el.setAttribute('data-original-text', text);
          el.textContent = dict[text];
        }
      });
    } else if (langCode === 'en') {
      document.querySelectorAll('[data-original-text]').forEach(el => {
        el.textContent = el.getAttribute('data-original-text');
      });
    }

    // Trigger google translate element if available
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  }

  function initLanguageSelector() {
    const wrapper = document.querySelector('.lang-selector-wrapper');
    const btn = document.querySelector('.lang-btn');
    const items = document.querySelectorAll('.lang-item');

    if (!wrapper || !btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('active');
      }
    });

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        const name = item.querySelector('span:first-child')?.textContent || lang;
        setLanguage(lang, name);
        wrapper.classList.remove('active');
      });
    });

    // Restore saved language
    const saved = localStorage.getItem('as_selected_lang');
    if (saved && saved !== 'en') {
      setTimeout(() => setLanguage(saved, saved.toUpperCase()), 400);
    }
  }

  /* ==========================================================================
     5. WHATSAPP FLOATING CHAT WIDGET
     ========================================================================== */
  function initWhatsAppWidget() {
    const floatBtn = document.getElementById('whatsapp-toggle-btn');
    const popup = document.getElementById('whatsapp-chat-popup');
    const closeBtn = document.getElementById('wa-popup-close-btn');
    const presetBtns = document.querySelectorAll('.wa-preset-btn');
    const startBtn = document.getElementById('wa-start-chat-btn');

    if (!floatBtn || !popup) return;

    floatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('show');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.remove('show');
      });
    }

    document.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && !floatBtn.contains(e.target)) {
        popup.classList.remove('show');
      }
    });

    const phone = '94114600700'; // Asia Siyaka Head Office Phone
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-msg') || 'Inquiry regarding Colombo Tea Auction';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent('Hello Asia Siyaka Commodities, ' + query)}`;
        window.open(url, '_blank');
        popup.classList.remove('show');
      });
    });

    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://wa.me/${phone}?text=${encodeURIComponent('Hello Asia Siyaka Commodities PLC, I would like to inquire about your commodity broking and auction services.')}`;
        window.open(url, '_blank');
        popup.classList.remove('show');
      });
    }
  }

  /* ==========================================================================
     6. SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  function initScrollReveals() {
    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      elements.forEach(el => observer.observe(el));
    } else {
      elements.forEach(el => el.classList.add('revealed'));
    }
  }

  // DOM Ready initialization
  document.addEventListener('DOMContentLoaded', () => {
    initCurrencyTickers();
    initCoreValuesSync();
    initAnnualReportsModal();
    initLanguageSelector();
    initWhatsAppWidget();
    initScrollReveals();
  });

})();
