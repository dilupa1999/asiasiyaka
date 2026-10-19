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
    { country: 'United States', flag: 'ðŸ‡ºðŸ‡¸', code: 'USD / LKR', rate: '301.85', change: '+0.28%', isUp: true, tag: 'Global Benchmark' },
    { country: 'United Kingdom', flag: 'ðŸ‡¬ðŸ‡§', code: 'GBP / LKR', rate: '398.40', change: '+0.34%', isUp: true, tag: 'Traditional Orthodox Market' },
    { country: 'Germany', flag: 'ðŸ‡©ðŸ‡ª', code: 'EUR / LKR', rate: '335.20', change: '+0.42%', isUp: true, tag: 'EU Specialty Buyer' },
    { country: 'Japan', flag: 'ðŸ‡¯ðŸ‡µ', code: '100 JPY / LKR', rate: '202.15', change: '-0.12%', isUp: false, tag: 'Premium High-Grown' },
    { country: 'Russia', flag: 'ðŸ‡·ðŸ‡º', code: 'RUB / LKR', rate: '3.28', change: '+0.15%', isUp: true, tag: 'Top Volume Importer' },
    { country: 'Iraq', flag: 'ðŸ‡®ðŸ‡¶', code: '1,000 IQD / LKR', rate: '230.40', change: '+0.08%', isUp: true, tag: '#1 Ceylon Tea Importer' },
    { country: 'China', flag: 'ðŸ‡¨ðŸ‡³', code: 'CNY / LKR', rate: '42.65', change: '+0.22%', isUp: true, tag: 'Fast-Growing Black Tea' },
    { country: 'United Arab Emirates', flag: 'ðŸ‡¦ðŸ‡ª', code: 'AED / LKR', rate: '82.20', change: '+0.15%', isUp: true, tag: 'Middle East Re-Export Hub' },
    { country: 'Libya', flag: 'ðŸ‡±ðŸ‡¾', code: 'LYD / LKR', rate: '62.15', change: '-0.05%', isUp: false, tag: 'North Africa Key Buyer' },
    { country: 'Saudi Arabia', flag: 'ðŸ‡¸ðŸ‡¦', code: 'SAR / LKR', rate: '80.45', change: '+0.18%', isUp: true, tag: 'GCC Orthodox Consumer' },
    { country: 'Jordan', flag: 'ðŸ‡¯ðŸ‡´', code: 'JOD / LKR', rate: '425.80', change: '+0.12%', isUp: true, tag: 'Levant Regional Market' },
    { country: 'Syria', flag: 'ðŸ‡¸ðŸ‡¾', code: '1,000 SYP / LKR', rate: '23.25', change: '+0.04%', isUp: true, tag: 'Longstanding Ceylon Buyer' },
    { country: 'Chile', flag: 'ðŸ‡¨ðŸ‡±', code: '1,000 CLP / LKR', rate: '328.75', change: '-0.26%', isUp: false, tag: 'South America Orthodox' },
    { country: 'Taiwan', flag: 'ðŸ‡¹ðŸ‡¼', code: 'TWD / LKR', rate: '9.48', change: '+0.06%', isUp: true, tag: 'High-Elevation Teas' },
    { country: 'Poland', flag: 'ðŸ‡µðŸ‡±', code: 'PLN / LKR', rate: '79.10', change: '+0.25%', isUp: true, tag: 'Central Europe Hub' },
    { country: 'Iran', flag: 'ðŸ‡®ðŸ‡·', code: '10,000 IRR / LKR', rate: '71.90', change: '+0.02%', isUp: true, tag: 'Historic Trading Corridor' },
    { country: 'Ireland', flag: 'ðŸ‡®ðŸ‡ª', code: 'EUR / LKR', rate: '335.20', change: '+0.42%', isUp: true, tag: 'Highest Per-Capita Tea' },
    { country: 'Hong Kong', flag: 'ðŸ‡­ðŸ‡°', code: 'HKD / LKR', rate: '38.70', change: '+0.10%', isUp: true, tag: 'East Asia Financial Gate' }
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
    { name: 'Ethical', icon: 'fa-scale-balanced', color: '#a8a20a', desc: 'Strict compliance with Colombo Tea Tradersâ€™ Association statutory rules and sustainable international trade practices.' },
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
      pdfUrl: 'assets/pdfs/2026.pdf',
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
      pdfUrl: 'assets/pdfs/2025.pdf',
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
      pdfUrl: 'assets/pdfs/2024.pdf',
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
      pdfUrl: 'assets/pdfs/2023.pdf',
      title: '2023 Annual Report',
      theme: 'Silver Jubilee â€” 25 Years of Market Stewardship',
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
      pdfUrl: 'assets/pdfs/2022.pdf',
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
      pdfUrl: 'assets/pdfs/2021.pdf',
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


  const pdfReader = { document: null, loadingTask: null, page: 1, renderToken: 0 };
  function isPdfSpread() { return window.innerWidth >= 900; }
  function setPdfStatus(message) { const status = document.getElementById('ar-pdf-status'); if (status) status.textContent = message; }
  function updatePdfControls() {
    const previous = document.getElementById('ar-pdf-prev'); const next = document.getElementById('ar-pdf-next'); const indicator = document.getElementById('ar-pdf-page-indicator'); const count = pdfReader.document ? pdfReader.document.numPages : 0; const lastVisiblePage = Math.min(pdfReader.page + (isPdfSpread() ? 1 : 0), count);
    if (previous) previous.disabled = !count || pdfReader.page <= 1; if (next) next.disabled = !count || lastVisiblePage >= count;
    if (indicator) indicator.textContent = count ? `Pages ${pdfReader.page}${lastVisiblePage > pdfReader.page ? `–${lastVisiblePage}` : ''} of ${count}` : 'Loading document…';
  }
  async function renderPdfPage(canvas, pageNumber, targetWidth) {
    const page = await pdfReader.document.getPage(pageNumber); const naturalViewport = page.getViewport({ scale: 1 }); const stage = document.getElementById('ar-pdf-stage'); const maximumHeight = Math.max((stage ? stage.clientHeight : 560) - 32, 260); const scale = Math.min(targetWidth / naturalViewport.width, maximumHeight / naturalViewport.height); const viewport = page.getViewport({ scale: Math.max(scale, 0.35) }); const density = window.devicePixelRatio || 1;
    canvas.width = Math.floor(viewport.width * density); canvas.height = Math.floor(viewport.height * density); canvas.style.width = `${Math.floor(viewport.width)}px`; canvas.style.height = `${Math.floor(viewport.height)}px`;
    await page.render({ canvasContext: canvas.getContext('2d', { alpha: false }), viewport, transform: density === 1 ? null : [density, 0, 0, density, 0, 0] }).promise;
  }
  async function renderPdfSpread() {
    if (!pdfReader.document) return; const token = ++pdfReader.renderToken; const stage = document.getElementById('ar-pdf-stage'); const firstCanvas = document.getElementById('ar-pdf-page-one'); const secondCanvas = document.getElementById('ar-pdf-page-two'); const secondWrap = document.getElementById('ar-pdf-page-two-wrap'); if (!stage || !firstCanvas || !secondCanvas || !secondWrap) return;
    const spread = isPdfSpread(); const secondPage = pdfReader.page + 1; secondWrap.hidden = !spread || secondPage > pdfReader.document.numPages; const pageWidth = Math.max((stage.clientWidth - (spread ? 44 : 24)) / (spread ? 2 : 1), 240);
    try { await renderPdfPage(firstCanvas, pdfReader.page, pageWidth); if (token !== pdfReader.renderToken) return; if (!secondWrap.hidden) await renderPdfPage(secondCanvas, secondPage, pageWidth); if (token !== pdfReader.renderToken) return; setPdfStatus(''); updatePdfControls(); }
    catch (error) { if (token !== pdfReader.renderToken) return; console.error('Unable to render annual report PDF.', error); setPdfStatus('This PDF preview could not be rendered. Use “Open PDF” to read the document.'); }
  }
  async function loadPdfPreview(url) {
    destroyPdfPreview(); if (typeof pdfjsLib === 'undefined') { setPdfStatus('Document preview is unavailable. Use “Open PDF” to read the document.'); return; }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; setPdfStatus('Loading document preview…'); updatePdfControls();
    try { pdfReader.loadingTask = pdfjsLib.getDocument(url); pdfReader.document = await pdfReader.loadingTask.promise; pdfReader.page = 1; await renderPdfSpread(); }
    catch (error) { console.error('Unable to load annual report PDF.', error); setPdfStatus('This PDF preview could not be loaded. Use “Open PDF” to read the document.'); }
  }
  function destroyPdfPreview() { pdfReader.renderToken += 1; if (pdfReader.loadingTask) pdfReader.loadingTask.destroy(); if (pdfReader.document) pdfReader.document.destroy(); pdfReader.document = null; pdfReader.loadingTask = null; pdfReader.page = 1; }
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
          <div class="ar-card-overlay">
            <span class="ar-year-badge">${r.year}</span>
          </div>
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
    const titleEl = document.getElementById('ar-modal-report-title');
    const externalLink = document.getElementById('ar-modal-external-link');
    const fallbackLink = document.getElementById('ar-embed-fallback-link');
    const highlightsDynamic = document.getElementById('ar-highlights-dynamic');

    if (!modal) return;

    if (titleEl) titleEl.textContent = `Asia Siyaka Commodities PLC â€” ${report.title}`;
    const pdfUrl = report.pdfUrl;
    const driveViewUrl = `https://drive.google.com/file/d/${report.driveId}/view?usp=sharing`;
    const driveDownloadUrl = pdfUrl;
    const localPdfLink = document.getElementById('ar-local-pdf-link');

    if (externalLink) externalLink.href = pdfUrl;
    if (localPdfLink) localPdfLink.href = pdfUrl;
    loadPdfPreview(pdfUrl);

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
    const tabHighlightsBtn = document.getElementById('ar-tab-highlights-btn');
    const tabPdfBtn = document.getElementById('ar-tab-pdf-btn');

    if (!modal) return;

    function closeModal() {
      modal.classList.remove('show');
      destroyPdfPreview();
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
    if (tabPdfBtn) { tabPdfBtn.addEventListener('click', () => switchModalTab('pdf')); }
    document.getElementById('ar-pdf-prev')?.addEventListener('click', () => { if (!pdfReader.document) return; pdfReader.page = Math.max(1, pdfReader.page - (isPdfSpread() ? 2 : 1)); renderPdfSpread(); });
    document.getElementById('ar-pdf-next')?.addEventListener('click', () => { if (!pdfReader.document) return; const step = isPdfSpread() ? 2 : 1; const lastStart = isPdfSpread() ? Math.max(1, pdfReader.document.numPages - 1) : pdfReader.document.numPages; pdfReader.page = Math.min(lastStart, pdfReader.page + step); renderPdfSpread(); });
    window.addEventListener('resize', () => { if (pdfReader.document) renderPdfSpread(); });

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
      'Home': 'à¶¸à·”à¶½à·Š à¶´à·’à¶§à·”à·€',
      'About Us': 'à¶…à¶´ à¶œà·à¶±',
      'Service': 'à·ƒà·šà·€à·',
      'Tea': 'à¶­à·š à¶­à·à¶»à·à·€à·Šà¶šà·à¶» à·ƒà·šà·€à¶º',
      'Rubber': 'à¶»à¶¶à¶»à·Š à¶­à·à¶»à·à·€à·Šà¶šà·à¶» à·ƒà·šà·€à¶º',
      'Commodities': 'à·€à·™à·…à¶³ à¶·à·à¶«à·Šà¶© à·„à· à¶šà·”à·…à·”à¶¶à¶©à·”',
      'Warehouse': 'à¶œà¶¶à¶©à· à¶´à·„à·ƒà·”à¶šà¶¸à·Š',
      'Logistics': 'à¶´à·Šâ€à¶»à·€à·à·„à¶± à·„à· à·ƒà·à¶´à¶ºà·”à¶¸à·Š',
      'Paper Sacks': 'à¶šà¶©à¶¯à·à·ƒà·’ à¶¸à¶½à·”',
      'Pages': 'à¶´à·’à¶§à·”',
      'News': 'à¶´à·”à·€à¶­à·Š',
      'Contact Us': 'à¶…à¶´ à·„à· à·ƒà¶¸à·Šà¶¶à¶±à·Šà¶° à·€à¶±à·Šà¶±',
      'Tea Regions of Sri Lanka': 'à·à·Šâ€à¶»à·“ à¶½à¶‚à¶šà·à·€à·š à¶­à·š à¶šà¶½à·à¶´',
      'Annual Report': 'à·€à·à¶»à·Šà·‚à·’à¶š à·€à·à¶»à·Šà¶­à·à·€',
      'Reports': 'à·€à·™à·…à¶³ à·€à·à¶»à·Šà¶­à·',
      'Explore More': 'à¶­à·€à¶­à·Š à¶œà·€à·šà·‚à¶«à¶º à¶šà¶»à¶±à·Šà¶±',
      'Speak With Expert': 'à·€à·’à·à·šà·‚à¶¥à¶ºà·™à¶šà·” à¶…à¶¸à¶­à¶±à·Šà¶±'
    },
    ta: {
      'Home': 'à®®à¯à®•à®ªà¯à®ªà¯',
      'About Us': 'à®Žà®™à¯à®•à®³à¯ˆ à®ªà®±à¯à®±à®¿',
      'Service': 'à®šà¯‡à®µà¯ˆà®•à®³à¯',
      'Tea': 'à®¤à¯‡à®¯à®¿à®²à¯ˆ à®¤à®°à®•à¯ à®šà¯‡à®µà¯ˆ',
      'Rubber': 'à®°à®ªà¯à®ªà®°à¯ à®¤à®°à®•à¯ à®šà¯‡à®µà¯ˆ',
      'Commodities': 'à®ªà¯Šà®°à¯à®Ÿà¯à®•à®³à¯ à®®à®±à¯à®±à¯à®®à¯ à®µà®¾à®šà®©à¯ˆ à®¤à®¿à®°à®µà®¿à®¯à®™à¯à®•à®³à¯',
      'Warehouse': 'à®•à®¿à®Ÿà®™à¯à®•à¯ à®šà¯‡à®µà¯ˆà®•à®³à¯',
      'Logistics': 'à®¤à®³à®µà®¾à®Ÿà®™à¯à®•à®³à¯',
      'Paper Sacks': 'à®•à®¾à®•à®¿à®¤ à®ªà¯ˆà®•à®³à¯',
      'Pages': 'à®ªà®•à¯à®•à®™à¯à®•à®³à¯',
      'News': 'à®šà¯†à®¯à¯à®¤à®¿à®•à®³à¯',
      'Contact Us': 'à®¤à¯Šà®Ÿà®°à¯à®ªà¯à®•à¯Šà®³à¯à®³',
      'Tea Regions of Sri Lanka': 'à®‡à®²à®™à¯à®•à¯ˆà®¯à®¿à®©à¯ à®¤à¯‡à®¯à®¿à®²à¯ˆ à®ªà®¿à®°à®¾à®¨à¯à®¤à®¿à®¯à®™à¯à®•à®³à¯',
      'Annual Report': 'à®†à®£à¯à®Ÿà¯ à®…à®±à®¿à®•à¯à®•à¯ˆ',
      'Reports': 'à®šà®¨à¯à®¤à¯ˆ à®…à®±à®¿à®•à¯à®•à¯ˆà®•à®³à¯'
    },
    zh: {
      'Home': 'é¦–é¡µ',
      'About Us': 'å…³äºŽæˆ‘ä»¬',
      'Service': 'æ ¸å¿ƒæœåŠ¡',
      'Tea': 'èŒ¶å¶ç»çºª',
      'Rubber': 'æ©¡èƒ¶ç»çºª',
      'Commodities': 'å¤§å®—å†œäº§å“',
      'Warehouse': 'ç»¿è‰²ä»“å‚¨',
      'Logistics': 'ç‰©æµä¾›åº”é“¾',
      'Contact Us': 'è”ç³»æˆ‘ä»¬',
      'Tea Regions of Sri Lanka': 'æ–¯é‡Œå…°å¡é”¡å…°çº¢èŒ¶äº§åŒº',
      'Annual Report': 'å¹´åº¦æŠ¥å‘Š'
    },
    ja: {
      'Home': 'ãƒ›ãƒ¼ãƒ ',
      'About Us': 'ä¼šç¤¾æ¦‚è¦',
      'Service': 'ã‚µãƒ¼ãƒ“ã‚¹',
      'Tea': 'ç´…èŒ¶ãƒ–ãƒ­ãƒ¼ã‚«ãƒ¼',
      'Rubber': 'å¤©ç„¶ã‚´ãƒ ',
      'Commodities': 'é¦™è¾›æ–™ãƒ»è¾²ç”£ç‰©',
      'Warehouse': 'å€‰åº«ç®¡ç†',
      'Contact Us': 'ãŠå•ã„åˆã‚ã›',
      'Tea Regions of Sri Lanka': 'ã‚¹ãƒªãƒ©ãƒ³ã‚«ã®ç´…èŒ¶ç”£åœ°',
      'Annual Report': 'å¹´æ¬¡å ±å‘Šæ›¸'
    },
    ar: {
      'Home': 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      'About Us': 'Ù…Ù† Ù†Ø­Ù†',
      'Service': 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
      'Tea': 'ÙˆØ³Ø§Ø·Ø© Ø§Ù„Ø´Ø§ÙŠ',
      'Rubber': 'ÙˆØ³Ø§Ø·Ø© Ø§Ù„Ù…Ø·Ø§Ø·',
      'Commodities': 'Ø§Ù„ØªÙˆØ§Ø¨Ù„ ÙˆØ§Ù„Ø³Ù„Ø¹',
      'Warehouse': 'Ø§Ù„Ù…Ø³ØªÙˆØ¯Ø¹Ø§Øª',
      'Contact Us': 'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
      'Tea Regions of Sri Lanka': 'Ù…Ù†Ø§Ø·Ù‚ Ø´Ø§ÙŠ Ø³ÙŠÙ„Ø§Ù†',
      'Annual Report': 'Ø§Ù„ØªÙ‚Ø±ÙŠØ± Ø§Ù„Ø³Ù†ÙˆÙŠ'
    },
    ru: {
      'Home': 'Ð“Ð»Ð°Ð²Ð½Ð°Ñ',
      'About Us': 'Ðž ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸',
      'Service': 'Ð£ÑÐ»ÑƒÐ³Ð¸',
      'Tea': 'Ð‘Ñ€Ð¾ÐºÐµÑ€Ð¸Ð´Ð¶ Ñ‡Ð°Ñ',
      'Rubber': 'ÐšÐ°ÑƒÑ‡ÑƒÐº',
      'Commodities': 'ÐŸÑ€ÑÐ½Ð¾ÑÑ‚Ð¸ Ð¸ ÑÑ‹Ñ€ÑŒÐµ',
      'Warehouse': 'Ð¡ÐºÐ»Ð°Ð´Ñ‹',
      'Contact Us': 'ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ñ‹',
      'Tea Regions of Sri Lanka': 'Ð§Ð°Ð¹Ð½Ñ‹Ðµ Ñ€ÐµÐ³Ð¸Ð¾Ð½Ñ‹ Ð¨Ñ€Ð¸-Ð›Ð°Ð½ÐºÐ¸',
      'Annual Report': 'Ð“Ð¾Ð´Ð¾Ð²Ð¾Ð¹ Ð¾Ñ‚Ñ‡ÐµÑ‚'
    },
    de: {
      'Home': 'Startseite',
      'About Us': 'Ãœber Uns',
      'Service': 'Dienstleistungen',
      'Tea': 'Teebroking',
      'Rubber': 'Kautschuk',
      'Commodities': 'GewÃ¼rze & Rohstoffe',
      'Warehouse': 'LagerhÃ¤user',
      'Contact Us': 'Kontakt',
      'Tea Regions of Sri Lanka': 'Tee-Regionen Sri Lankas',
      'Annual Report': 'GeschÃ¤ftsbericht'
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
