class UIManager {
    constructor() {
        this.elements = {
            selector: document.getElementById('calculatorSelector'),
            interface: document.getElementById('calculatorInterface'),
            calcTitle: document.getElementById('calcTitle'),
            backBtn: document.getElementById('backBtn'),
            unitSection: document.getElementById('unitSection'),
            unitType: document.getElementById('unitType'),
            inputContainer: document.getElementById('inputContainer'),
            basicCalculatorContainer: document.getElementById('basicCalculatorContainer'),
            calcDisplay: document.getElementById('calcDisplay'),
            calculateBtnContainer: document.getElementById('calculateBtnContainer'),
            calculateBtn: document.getElementById('calculateBtn'),
            resultArea: document.getElementById('resultArea'),
            laggiSection: document.getElementById('laggiSection'),
            areaLaggiHands: document.getElementById('areaLaggiHands'),
            sliderContainer: document.querySelector('.slider-container'),
            sliderDots: document.querySelector('.slider-dots'),
            headerNav: document.getElementById('headerNavSelect'),
            headerNavContainer: document.getElementById('headerNavContainer'),
            homeBtn: document.getElementById('homeBtn'),
            aboutModal: document.getElementById('aboutModal'),
            privacyModal: document.getElementById('privacyModal'),
            aboutBtn: document.getElementById('aboutBtn'),
            privacyBtn: document.getElementById('privacyBtn'),
            closeAbout: document.getElementById('closeAbout'),
            closePrivacy: document.getElementById('closePrivacy'),
            proModal: document.getElementById('proModal'),
            closePro: document.getElementById('closePro'),
            goProBtn: document.getElementById('goProBtn'),
            historyBtn: document.getElementById('historyBtn'),
            historyModal: document.getElementById('historyModal'),
            closeHistory: document.getElementById('closeHistory'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            historyList: document.getElementById('historyList')
        };
        this.renderCalculatorCards();
        this.populateHeaderNav();
        this.setupSliderListeners();
        this.initializeHistoryListeners();
    }

    populateHeaderNav() {
        if (!this.elements.headerNav) return;
        if (typeof calculatorCards === 'undefined') return;

        const categories = {
            "General Tools": ["basic", "length"],
            "Geometry / ज्यामिति": ["triangle", "square", "rectangle"],
            "Land Area Tools / क्षेत्रफल": ["area", "landConverter", "specialArea", "landEstimator"],
            "Advanced Tools / एडवांस्ड": ["laggiDiscoveryRelation", "plotPartition"]
        };

        let html = '<option value="" disabled selected>Calculator चुनें... (Select)</option>';

        for (const [category, ids] of Object.entries(categories)) {
            html += `<optgroup label="${category}">`;
            ids.forEach(id => {
                const card = calculatorCards.find(c => c.id === id);
                if (card) {
                    // Use the full bilingual title from calculatorTitles if available, otherwise fallback to card.title
                    const name = calculatorTitles[id] || card.title;
                    html += `<option value="${card.id}">${card.icon} ${name}</option>`;
                }
            });
            html += `</optgroup>`;
        }

        this.elements.headerNav.innerHTML = html;
    }

    initializeHistoryListeners() {
        if (this.elements.historyBtn) {
            this.elements.historyBtn.addEventListener('click', () => {
                this.renderHistory();
                this.elements.historyModal.classList.remove('hidden');
            });
        }
        if (this.elements.closeHistory) {
            this.elements.closeHistory.addEventListener('click', () => {
                this.elements.historyModal.classList.add('hidden');
            });
        }
        if (this.elements.clearHistoryBtn) {
            this.elements.clearHistoryBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all history?')) {
                    localStorage.removeItem('amin_calc_history');
                    this.renderHistory();
                }
            });
        }
    }

    saveToHistory(title, details, result) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            title: title,
            details: details,
            result: result
        };

        let history = JSON.parse(localStorage.getItem('amin_calc_history') || '[]');
        history.unshift(historyItem);
        if (history.length > 50) history.pop(); // Limit to 50 items
        localStorage.setItem('amin_calc_history', JSON.stringify(history));
    }

    renderHistory() {
        if (!this.elements.historyList) return;

        const history = JSON.parse(localStorage.getItem('amin_calc_history') || '[]');
        this.elements.historyList.innerHTML = '';

        if (history.length === 0) {
            this.elements.historyList.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">No history records found</div>';
            return;
        }

        history.forEach(item => {
            const div = document.createElement('div');
            div.style.cssText = 'background: #f8f9fa; padding: 12px; border-radius: 8px; border-left: 4px solid #11998e; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 8px;';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong style="color: #333;">${item.title}</strong>
                    <small style="color: #888;">${item.timestamp}</small>
                </div>
                <div style="font-size: 0.9rem; color: #555; margin-bottom: 5px;">${item.details}</div>
                <div style="font-size: 1rem; color: #11998e; font-weight: 600;">= ${item.result}</div>
            `;
            this.elements.historyList.appendChild(div);
        });
    }

    formatLaggiValue(val) {
        const whole = Math.floor(val);
        const fraction = val - whole;
        let fracStr = '';
        if (fraction === 0.25) fracStr = '¼';
        else if (fraction === 0.5) fracStr = '½';
        else if (fraction === 0.75) fracStr = '¾';
        return fracStr ? `${whole}${fracStr}` : `${whole}`;
    }

    renderCalculatorCards() {
        const grid = document.querySelector('.slider-track');
        if (!grid || typeof calculatorCards === 'undefined') return;

        const lang = document.documentElement.lang || 'hi';
        const t = (translations[lang] && translations[lang].cardData) ? translations[lang].cardData : null;

        grid.innerHTML = calculatorCards.map((card, index) => {
            const data = (t && t[card.id]) ? t[card.id] : card;
            return `
                <div class="calc-type-card ${index === 0 ? 'active-slide' : ''}" data-calc-type="${card.id}" data-index="${index}">
                    <div class="card-icon ${card.color || ''}" ${card.style ? `style="${card.style}"` : ''}>
                        ${card.tag || card.icon}
                    </div>
                    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                        <h3 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary);">${data.title}</h3>
                        <p class="card-description" style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1rem;">${data.desc}</p>
                    </div>
                    <div class="card-features" style="justify-content: center; gap: 8px;">
                        ${data.features.map(f => `<span>${f}</span>`).join('')}
                    </div>
                    <button class="btn-calculate" style="width: 100%; margin-top: 1.5rem; height: 50px; font-weight: bold; font-size: 1rem;">GO / शुरू करें</button>
                </div>
            `;
        }).join('');

        // Render Dots
        if (this.elements.sliderDots) {
            this.elements.sliderDots.innerHTML = calculatorCards.map((_, i) =>
                `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
            ).join('');
        }
    }

    setupSliderListeners() {
        if (!this.elements.sliderContainer) return;

        this.elements.sliderContainer.addEventListener('scroll', () => {
            this.updateActiveSlide();
        });

        // Click on dots to scroll
        const dots = this.elements.sliderDots.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                this.scrollToIndex(index);
            });
        });
    }

    updateActiveSlide() {
        const track = document.querySelector('.slider-track');
        const cards = track.querySelectorAll('.calc-type-card');
        const dots = this.elements.sliderDots.querySelectorAll('.dot');
        const containerWidth = this.elements.sliderContainer.offsetWidth;
        const scrollLeft = this.elements.sliderContainer.scrollLeft;

        const activeIndex = Math.round(scrollLeft / (cards[0].offsetWidth + 24)); // 24 is gap

        cards.forEach((card, i) => {
            if (i === activeIndex) {
                card.classList.add('active-slide');
            } else {
                card.classList.remove('active-slide');
            }
        });

        dots.forEach((dot, i) => {
            if (i === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    scrollToIndex(index) {
        const cards = document.querySelectorAll('.calc-type-card');
        if (cards[index]) {
            const left = index * (cards[0].offsetWidth + 24);
            this.elements.sliderContainer.scrollTo({
                left: left,
                behavior: 'smooth'
            });
        }
    }

    showSelector() {
        this.elements.selector.classList.remove('hidden');
        this.elements.interface.classList.add('hidden');
        // headerNavContainer is kept visible for direct access
        if (this.elements.headerNavContainer) {
            this.elements.headerNavContainer.classList.remove('hidden');
        }

        // Ensure slider state is updated when shown
        setTimeout(() => this.updateActiveSlide(), 50);
    }

    hideSelector() {
        this.elements.selector.classList.add('hidden');
        this.elements.interface.classList.remove('hidden');
        this.elements.headerNavContainer.classList.remove('hidden');
    }

    setTitle(calcType) {
        const titleKey = (calcType === 'heron') ? 'triangle' : calcType;
        const title = calculatorTitles[titleKey] || '';
        this.elements.calcTitle.textContent = title;

        // Update header nav select
        if (this.elements.headerNav) {
            this.elements.headerNav.value = calcType;
        }
    }

    showLander() {
        const landerPage = document.getElementById('landerPage');
        if (landerPage) {
            landerPage.classList.remove('hidden');
            landerPage.classList.remove('fade-out');
        }
        this.elements.selector.classList.add('hidden');
        this.elements.interface.classList.add('hidden');
    }

    toggleAbout(show) {
        if (show) this.elements.aboutModal.classList.remove('hidden');
        else this.elements.aboutModal.classList.add('hidden');
    }

    togglePrivacy(show) {
        if (show) this.elements.privacyModal.classList.remove('hidden');
        else this.elements.privacyModal.classList.add('hidden');
    }

    togglePro(show) {
        if (show) this.elements.proModal.classList.remove('hidden');
        else this.elements.proModal.classList.add('hidden');
    }

    showUnitSection(units) {
        this.elements.unitType.innerHTML = '';

        for (let unit in units) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unitDisplayNames[unit] || unit;
            this.elements.unitType.appendChild(option);
        }

        this.elements.unitSection.classList.remove('hidden');
    }

    hideUnitSection() {
        this.elements.unitSection.classList.add('hidden');
    }

    showLaggiSection() {
        this.elements.laggiSection.classList.remove('hidden');
    }

    hideLaggiSection() {
        this.elements.laggiSection.classList.add('hidden');
    }

    populateLaggiDropdown() {
        this.elements.areaLaggiHands.innerHTML = '';
        for (let i = 4; i <= 12; i += 0.25) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${this.formatLaggiValue(i)} हाथ (Hand)`;
            if (i === 5.5) option.selected = true;
            this.elements.areaLaggiHands.appendChild(option);
        }
    }

    showBasicCalculator() {
        this.elements.basicCalculatorContainer.classList.remove('hidden');
    }

    hideBasicCalculator() {
        this.elements.basicCalculatorContainer.classList.add('hidden');
    }

    createConversionInput() {
        this.elements.inputContainer.innerHTML = `
      <div class="calc-section">
        <label class="section-label">
          <span class="label-icon">✍️</span>
          मात्रा दर्ज करें
        </label>
        <div class="input-with-unit">
          <input 
            type="number" 
            id="conversionInput" 
            class="text-input" 
            placeholder="जैसे 5.5"
            step="0.01"
            min="0"
          />
          <div id="unitSuffix" class="input-unit-suffix hidden"></div>
        </div>
      </div>
    `;
    }

    updateUnitSuffix() {
        const selectedUnit = this.elements.unitType.value;
        const suffix = document.getElementById('unitSuffix');
        if (suffix && selectedUnit) {
            suffix.textContent = selectedUnit;
            suffix.classList.remove('hidden');
        } else if (suffix) {
            suffix.classList.add('hidden');
        }
    }

    createSpecialGroupSelector() {
        const t = translations[document.documentElement.lang || 'hi'];
        this.elements.inputContainer.innerHTML = `
            <div class="special-top-row" style="margin-bottom: var(--space-6);">
                <div class="calc-section" style="flex: 1.5;">
                    <label class="section-label">
                        <span class="label-icon">📂</span>
                        ${t.inputGroupLabel || 'कहाँ से (From)'}
                    </label>
                    <select id="specialGroupSelect" class="select-input">
                        <option value="extended" selected>1. ${t.compositeFormat || 'बीघा-धुर-धुरकी'}</option>
                        <option value="kanma">2. ${t.kanbaFormat || 'बीघा-कट्ठा-धुर-कनबा'}</option>
                        <option value="modern">3. ${t.standardFormat || 'हेक्टर-एकड़-डिसमिल'}</option>
                    </select>
                </div>
                <div class="calc-section" style="flex: 1.5;">
                    <label class="section-label">
                        <span class="label-icon">🎯</span>
                        कहाँ तक (To)
                    </label>
                    <select id="specialTargetSelect" class="select-input">
                        <option value="all" selected>All Units (सभी इकाइयाँ)</option>
                        <option value="extended">1. ${t.compositeFormat || 'बीघा-धुर-धुरकी'}</option>
                        <option value="kanma">2. ${t.kanbaFormat || 'बीघा-कट्ठा-धुर-कनबा'}</option>
                        <option value="modern">3. ${t.standardFormat || 'हेक्टर-एकड़-डिसमिल'}</option>
                    </select>
                </div>
                <div class="calc-section" style="flex: 1;">
                    <label class="section-label">
                        <span class="label-icon">📐</span>
                        लग्गी
                    </label>
                    <select id="areaLaggiHandsSpecial" class="select-input"></select>
                </div>
            </div>
            <div id="specialFieldsContainer"></div>
        `;

        const laggiSelect = document.getElementById('areaLaggiHandsSpecial');
        if (laggiSelect) {
            for (let i = 4; i <= 12; i += 0.25) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${this.formatLaggiValue(i)} हाथ (Hand)`;
                if (i === 5.5) option.selected = true;
                laggiSelect.appendChild(option);
            }
        }
    }

    createSpecialFields(group) {
        const container = document.getElementById('specialFieldsContainer');
        if (!container) return;

        let fields = [];
        if (group === 'extended') {
            fields = [
                { label: 'बीघा', key: 'bigha' },
                { label: 'कट्ठा', key: 'katha' },
                { label: 'धुर', key: 'dhur' },
                { label: 'धुरकी', key: 'dhurki' },
                { label: 'फुरकी', key: 'furki' },
                { label: 'चुरकी', key: 'churki' }
            ];
        } else if (group === 'kanma') {
            fields = [
                { label: 'बीघा', key: 'bigha' },
                { label: 'कट्ठा', key: 'katha' },
                { label: 'धुर', key: 'dhur' },
                { label: 'कनबा', key: 'kanma' }
            ];
        } else if (group === 'modern') {
            fields = [
                { label: 'हेक्टर', key: 'hectare' },
                { label: 'एकड़', key: 'acre' },
                { label: 'डिसमिल', key: 'decimal' }
            ];
        }

        container.innerHTML = `
            <div style="background: rgba(102, 126, 234, 0.05); padding: 15px; border-radius: var(--radius-lg); border: 1px solid var(--accent-100);">
                <label class="section-label" style="margin-bottom: 12px; font-size: 0.85em; opacity: 0.8;">✍️ मात्रा दर्ज करें (Enter Values):</label>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
                    ${fields.map(f => `
                        <div style="display: flex; flex-direction: column; align-items: center; min-width: 65px; flex: 1;">
                            <span style="font-size: 0.7em; font-weight: bold; color: var(--text-muted); margin-bottom: 4px;">${f.label}</span>
                            <input type="number" class="text-input special-field-input" data-key="${f.key}" placeholder="0" 
                                style="padding: 10px 5px; text-align: center; font-size: 1.1em; border-radius: var(--radius-md); width: 100%;" />
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    createEstimatorUI() {
        const t = translations[document.documentElement.lang || 'hi'];
        this.elements.inputContainer.innerHTML = `
            <div class="special-top-row" style="margin-bottom: var(--space-6);">
                <div class="calc-section">
                    <label class="section-label">
                        <span class="label-icon">📂</span>
                        ${t.inputGroupLabel || 'इनपुट समूह चुनें'}
                    </label>
                    <select id="estimatorGroupSelect" class="select-input">
                        <option value="extended" selected>1. ${t.compositeFormat || 'बीघा-धुर-धुरकी-फुरकी-चुरकी'}</option>
                        <option value="kanma">2. ${t.kanbaFormat || 'बीघा-कट्ठा-धुर-कनबा'}</option>
                        <option value="modern">3. ${t.standardFormat || 'हेक्टर-एकड़-डिसमिल'}</option>
                    </select>
                </div>
                <div class="calc-section">
                    <label class="section-label">
                        <span class="label-icon">📐</span>
                        लग्गी
                    </label>
                    <select id="estimatorLaggi" class="select-input"></select>
                </div>
            </div>

            <div id="estimatorHeader" style="display: grid; padding: 10px 15px; background: var(--bg-primary); border-radius: var(--radius-md) var(--radius-md) 0 0; border: 1px solid var(--accent-100); border-bottom: none; margin-top: 20px;"></div>
            
            <div id="estimatorRowsContainer" style="display: flex; flex-direction: column; border: 1px solid var(--accent-100); border-top: none; border-radius: 0 0 var(--radius-md) var(--radius-md); background: var(--bg-white); overflow: hidden;"></div>
            
            <button id="addRowBtn" class="btn-secondary" style="margin-top: var(--space-4); width: 100%; justify-content: center; padding: 14px; font-weight: bold; border: 2px dashed var(--accent-300); background: rgba(102, 126, 234, 0.05); color: var(--primary-600);">
                ${t.addRowBtn || '+ पंक्ति जोड़ें'}
            </button>

            <div id="liveTotalContainer" style="margin-top: var(--space-6); padding: var(--space-4); background: var(--gradient-primary); color: white; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); display: none;">
                <div style="font-size: 0.8em; opacity: 0.9; margin-bottom: 5px; text-align: center;">कुल अनुमानित रकबा (Live Total)</div>
                <div id="liveTotalDisplay" style="text-align: center; font-weight: bold; font-size: 1.3em;"></div>
                <div id="liveTotalSubDisplay" style="text-align: center; font-size: 0.85em; opacity: 0.9; margin-top: 5px; border-top: 1px dashed rgba(255,255,255,0.3); padding-top: 5px;"></div>
            </div>
        `;

        const laggiSelect = document.getElementById('estimatorLaggi');
        for (let i = 4; i <= 12; i += 0.25) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${this.formatLaggiValue(i)} हाथ (Hand)`;
            if (i === 5.5) option.selected = true;
            laggiSelect.appendChild(option);
        }
    }

    updateEstimatorHeader(group) {
        const header = document.getElementById('estimatorHeader');
        if (!header) return;

        let fields = [];
        if (group === 'extended') {
            fields = ['बीघा', 'कट्ठा', 'धुर', 'धुरकी', 'फुरकी', 'चुरकी'];
        } else if (group === 'kanma') {
            fields = ['बीघा', 'कट्ठा', 'धुर', 'कनबा'];
        } else if (group === 'modern') {
            fields = ['हेक्टर', 'एकड़', 'डिसमिल'];
        }

        const cols = fields.length + 1; // +1 for index and remove button
        header.style.gridTemplateColumns = `40px repeat(${fields.length}, 1fr) 40px`;
        header.innerHTML = `
            <div style="font-size: 0.7em; font-weight: bold; color: var(--text-muted); text-align: center;">#</div>
            ${fields.map(f => `<div style="font-size: 0.7em; font-weight: bold; color: var(--text-muted); text-align: center;">${f}</div>`).join('')}
            <div></div>
        `;
    }

    addEstimatorRow(index, group) {
        const container = document.getElementById('estimatorRowsContainer');
        const rowDiv = document.createElement('div');
        rowDiv.className = 'estimator-row';
        rowDiv.dataset.index = index;
        rowDiv.style.display = 'grid';
        rowDiv.style.alignItems = 'center';
        rowDiv.style.padding = '10px 15px';
        rowDiv.style.borderBottom = '1px solid var(--accent-50);';
        rowDiv.style.background = index % 2 === 0 ? 'var(--bg-white)' : 'rgba(0,0,0,0.01)';

        let fields = [];
        if (group === 'extended') {
            fields = ['bigha', 'katha', 'dhur', 'dhurki', 'furki', 'churki'];
        } else if (group === 'kanma') {
            fields = ['bigha', 'katha', 'dhur', 'kanba'];
        } else if (group === 'modern') {
            fields = ['hectare', 'acre', 'decimal'];
        }

        rowDiv.style.gridTemplateColumns = `40px repeat(${fields.length}, 1fr) 40px`;
        rowDiv.innerHTML = `
            <div style="font-weight: bold; opacity: 0.5; font-size: 0.8em; text-align: center;">${index + 1}</div>
            ${fields.map(f => `
                <div style="padding: 0 4px;">
                    <input type="number" class="text-input row-input" data-key="${f}" placeholder="0" 
                        style="padding: 8px 2px; font-size: 0.95em; text-align: center; border-radius: 4px; border: 1px solid var(--accent-100); width: 100%; box-sizing: border-box;">
                </div>
            `).join('')}
            <button class="remove-row-btn" style="background: none; border: none; color: var(--accent-300); cursor: pointer; font-size: 1.2em; display: flex; justify-content: center; align-items: center;">
                ${index > 0 ? '&times;' : ''}
            </button>
        `;

        container.appendChild(rowDiv);

        rowDiv.style.transform = 'scale(0.95)';
        setTimeout(() => rowDiv.style.transform = 'scale(1)', 10);

        const removeBtn = rowDiv.querySelector('.remove-row-btn');
        if (removeBtn && index > 0) {
            removeBtn.addEventListener('click', () => {
                rowDiv.remove();
                // We don't need to manually trigger updateLiveTotal here 
                // as the app.js should handle it if needed via observers or listeners
            });
        }
    }

    createTriangleToggle(currentMode) {
        const isHeron = currentMode === 'heron';
        return `
            <div style="display: flex; justify-content: center; margin-bottom: var(--space-8); background: var(--bg-primary); padding: 8px; border-radius: var(--radius-xl); border: 2px solid var(--primary-100); box-shadow: var(--shadow-inner);">
                <div style="display: flex; background: var(--bg-white); border-radius: var(--radius-lg); padding: 5px; width: 100%; max-width: 450px; gap: 5px;">
                    <button id="triangleModeBase" class="btn-group-select ${!isHeron ? 'active' : ''}" style="flex: 1; justify-content: center; padding: 12px; font-size: 0.9em; flex-direction: column; gap: 2px;">
                        <span style="font-size: 1.2em;">🔺</span>
                        <div style="font-weight: 700;">Base & Height / आधार एवं ऊंचाई</div>
                    </button>
                    <button id="triangleModeHeron" class="btn-group-select ${isHeron ? 'active' : ''}" style="flex: 1; justify-content: center; padding: 12px; font-size: 0.9em; flex-direction: column; gap: 2px;">
                        <span style="font-size: 1.2em;">📐</span>
                        <div style="font-weight: 700;">Three Sides / तीन भुजाएं</div>
                    </button>
                </div>
            </div>
        `;
    }

    createShapeInputs(shapeType) {
        const shape = shapeFormulas[shapeType];
        if (!shape) return;

        const inputCount = shape.inputs.length;
        const gridCols = inputCount > 3 ? 'repeat(auto-fit, minmax(80px, 1fr))' : `repeat(${inputCount}, 1fr)`;

        const inputsHTML = shape.inputs.map(input => `
            <div class="input-group" style="animation: slideInUp 0.3s ease-out; margin-bottom: 0;">
                <label class="input-label" style="font-size: 0.8em; justify-content: center; margin-bottom: 5px;">
                    <span>${input.name}</span>
                </label>
                <div style="position: relative;">
                    <input 
                        type="number" 
                        data-key="${input.key}"
                        class="text-input shape-input" 
                        placeholder="0"
                        step="0.01"
                        min="0"
                        style="padding-right: 45px; text-align: center; font-weight: 700; font-size: 1.1em; height: 50px;"
                    />
                    <span class="shape-unit-suffix" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 0.75em; font-weight: 600; color: var(--primary-400); pointer-events: none;">फीट</span>
                </div>
            </div>
        `).join('');

        let toggleHTML = '';
        if (shapeType === 'triangle' || shapeType === 'heron') {
            toggleHTML = this.createTriangleToggle(shapeType);
        }

        this.elements.inputContainer.innerHTML = `
            ${toggleHTML}
            
            <div class="calc-section" style="margin-bottom: var(--space-6);">
                <label class="section-label" style="justify-content: center;">
                    <span class="label-icon">📏</span>
                    मापन की इकाई (Input Unit)
                </label>
                <select id="shapeGlobalUnit" class="select-input" style="font-weight: 700; text-align: center; height: 50px; font-size: 1.05em; border: 2px solid var(--primary-100);">
                    ${Object.keys(lengthUnits).map(u => `<option value="${u}" ${u === 'फीट' ? 'selected' : ''}>${unitDisplayNames[u] || u}</option>`).join('')}
                </select>
            </div>

            <div class="input-grid" style="grid-template-columns: ${gridCols}; gap: 10px; background: var(--bg-primary); padding: 15px; border-radius: var(--radius-lg); border: 1px dashed var(--primary-200);">
                ${inputsHTML}
            </div>

            <div id="liveShapeResult" style="margin-top: 15px; padding: 15px; background: rgba(102, 126, 234, 0.08); border-radius: var(--radius-lg); border: 2px solid var(--primary-100); display: none; text-align: center; animation: slideInUp 0.3s ease-out;">
                <div style="font-size: 0.75em; color: var(--primary-600); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Live Result / लाइव परिणाम</div>
                <div id="liveShapeAreaDisplay" style="font-size: 1.4em; font-weight: 900; color: var(--primary-700); line-height: 1.2;"></div>
            </div>
            
            <!-- Bilingual Laggi Selector -->
            <div class="calc-section" style="margin-top: var(--space-8); padding-top: var(--space-6); border-top: 2px solid var(--bg-primary);">
                <label class="section-label" style="display: flex; flex-direction: column; align-items: flex-start; gap: 5px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="label-icon">📏</span>
                        Laggi Size / लग्गी का माप
                    </div>
                    <small style="font-weight: normal; color: var(--text-muted); padding-left: 36px;">
                        (Required for Bigha/Kattha conversion)
                    </small>
                </label>
                <select id="shapeLaggiHands" class="select-input" style="font-weight: 700; color: var(--primary-700);"></select>
            </div>

            <div style="padding: var(--space-4); background: linear-gradient(to right, rgba(102, 126, 234, 0.1), transparent); border-left: 4px solid var(--primary-300); border-radius: var(--radius-sm); margin-top: var(--space-6); color: var(--text-secondary); font-size: 0.9em;">
                <strong style="color: var(--primary-600);">Formula / सूत्र:</strong> ${shape.formula}
            </div>
        `;

        const laggiSelect = document.getElementById('shapeLaggiHands');
        if (laggiSelect) {
            for (let i = 4; i <= 12; i += 0.25) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${this.formatLaggiValue(i)} Hands / हाथ`;
                if (i === 5.5) option.selected = true;
                laggiSelect.appendChild(option);
            }
        }
    }

    updateShapeUnitDisplay(unit) {
        const suffixes = document.querySelectorAll('.shape-unit-suffix');
        suffixes.forEach(s => {
            s.textContent = unit;
        });
    }

    updateLiveShapeArea(area, unit) {
        const container = document.getElementById('liveShapeResult');
        const display = document.getElementById('liveShapeAreaDisplay');
        if (!container || !display) return;

        if (area > 0) {
            container.style.display = 'block';
            display.innerHTML = `${area.toFixed(2)} <small style="font-size: 0.6em; opacity: 0.8;">वर्ग ${unit} (Sq. ${unit})</small>`;
        } else {
            container.style.display = 'none';
        }
    }

    createLaggiInputs() {
        this.elements.inputContainer.innerHTML = `
      <div class="input-grid">
        <div class="input-group">
          <label class="input-label">
            <span>📏</span> लग्गी की लंबाई (हाथ में)
          </label>
          <input 
            type="number" 
            id="laggiHands" 
            class="text-input" 
            placeholder="जैसे 4, 5.5, 6.5"
            step="0.25"
            min="4"
            max="12"
          />
        </div>
        <div class="input-group">
          <label class="input-label">
            <span>📏</span> जमीन की लंबाई (लग्गी में)
          </label>
          <input 
            type="number" 
            id="landLength" 
            class="text-input" 
            placeholder="जैसे 10"
            step="0.01"
            min="0"
          />
        </div>
        <div class="input-group">
          <label class="input-label">
            <span>📏</span> जमीन की चौड़ाई (लग्गी में)
          </label>
          <input 
            type="number" 
            id="landWidth" 
            class="text-input" 
            placeholder="जैसे 5"
            step="0.01"
            min="0"
          />
        </div>
      </div>
      <div style="padding: var(--space-4); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius-sm); margin-top: var(--space-4); color: var(--text-secondary); font-size: var(--font-sm);">
        🚩 <strong>नियम:</strong> 1 हाथ = 18 इंच | 1 धुर = 1 वर्ग लग्गी
      </div>
    `;
    }

    showCalculateButton() {
        this.elements.calculateBtnContainer.classList.remove('hidden');
    }

    hideCalculateButton() {
        this.elements.calculateBtnContainer.classList.add('hidden');
    }

    getLaggiValueForShape() {
        const laggiSelect = document.getElementById('shapeLaggiHands');
        return laggiSelect ? parseFloat(laggiSelect.value) : 5.5;
    }

    clearAll() {
        this.elements.inputContainer.innerHTML = '';
        this.elements.resultArea.innerHTML = '';
        this.hideUnitSection();
        this.hideLaggiSection();
        this.hideCalculateButton();
        this.hideBasicCalculator();
    }

    getPrecision(unit, settings) {
        if (settings.unitPrecisions && settings.unitPrecisions[unit] !== undefined) {
            return settings.unitPrecisions[unit];
        }
        const traditionalUnits = ["धुर", "कट्ठा", "बीघा", "कनबा", "धुरकी", "फुरकी", "चुरकी"];
        if (traditionalUnits.includes(unit)) return settings.tradPrecision || 4;
        return settings.stdPrecision || 4;
    }

    displayConversionResults(value, selectedUnit, units, baseValue, isArea = false, laggiHands = 5.5, settings = {}, targetUnit = 'all') {
        // Save to History
        const type = isArea ? 'Area Conversion' : 'Length Conversion';
        const details = isArea ? `Input: ${value} ${selectedUnit} (@${laggiHands}h)` : `Input: ${value} ${selectedUnit}`;
        this.saveToHistory(type, details, `${isArea ? 'See breakdown' : 'Converted to all units'}`);

        if (!isArea) {
            let html = `
                <div style="margin-bottom: var(--space-6);">
                    <strong class="result-highlight">${value} ${selectedUnit}</strong> के बराबर है:
                </div>
            `;
            for (let unit in units) {
                const converted = baseValue / units[unit];
                const p = this.getPrecision(unit, settings);
                html += `
                    <div class="result-item">
                        <span>👉</span>
                        <span>${converted.toFixed(p)} ${unit}</span>
                    </div>
                `;
            }
            this.elements.resultArea.innerHTML = html;
            return;
        }

        const totalSqFt = baseValue;
        const dynamicUnits = getDynamicAreaUnits(laggiHands);
        const totalDhur = totalSqFt / dynamicUnits["धुर"];

        const lb = Calculator.getLaggiBreakdown(totalDhur);
        const sb = Calculator.getStandardBreakdown(totalSqFt);

        let html = `
            <div style="background: var(--gradient-primary); color: white; padding: 15px; text-align: center; border-radius: var(--radius-md) var(--radius-md) 0 0; margin-bottom: 0;">
                <h3 style="margin:0; font-size: 1.2em;">📊 भूमि विवरण रिपोर्ट (Detailed Report)</h3>
                <small style="opacity: 0.9;">लग्गी का मान: ${this.formatLaggiValue(laggiHands)} हाथ</small>
            </div>
            
            <div style="background: var(--bg-white); border: 2px solid var(--accent-500); padding: 15px; margin-bottom: var(--space-4); border-radius: 0 0 var(--radius-md) var(--radius-md); box-shadow: var(--shadow-md);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="color: var(--text-muted); font-size: 0.9em; display: block; margin-bottom: 5px;">कुल रकबा (पारंपरिक):</span>
                    <div style="font-size: 1.5em; font-weight: bold; color: var(--accent-600); line-height: 1.4;">
                        ${lb.bigha} बीघा - ${lb.katha} कट्ठा - ${lb.dhur} धुर
                        <div style="font-size: 0.7em; color: var(--text-primary); margin-top: 5px;">
                            ${lb.dhurki} धुरकी ${lb.furki} फुरकी ${lb.churki} चुरकी
                        </div>
                    </div>
                </div>

                <div style="text-align: center; padding-top: 15px; border-top: 1px dashed #ddd;">
                    <span style="color: var(--text-muted); font-size: 0.9em; display: block; margin-bottom: 5px;">कुल रकबा (आधुनिक):</span>
                    <div style="font-size: 1.5em; font-weight: bold; color: #2f855a; line-height: 1.4;">
                        ${sb.hectare} हेक्टर - ${sb.acre} एकड़ - ${sb.decimal} डिसमिल
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 10px; font-weight: bold; color: var(--text-primary); border-bottom: 2px solid var(--accent-200); padding-bottom: 5px;">
                🔄 ${targetUnit === 'all' ? 'सभी इकाइयों में विवरण:' : `विशेष परिणाम: ${targetUnit}`}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        `;

        let unitsToShow = [];
        if (targetUnit === 'all') {
            unitsToShow = [
                "बीघा", "कट्ठा", "धुर", "धुरकी", "कनबा", "फुरकी", "चुरकी",
                "डिसमिल", "एकड़", "हेक्टर",
                "वर्ग फीट", "वर्ग मीटर", "वर्ग गज", "वर्ग इंच", "वर्ग कड़ी", "वर्ग हाथ"
            ];
        } else if (targetUnit === 'extended') {
            unitsToShow = ["बीघा", "कट्ठा", "धुर", "धुरकी", "फुरकी", "चुरकी"];
        } else if (targetUnit === 'kanma') {
            unitsToShow = ["बीघा", "कट्ठा", "धुर", "कनबा"];
        } else if (targetUnit === 'modern') {
            unitsToShow = ["हेक्टर", "एकड़", "डिसमिल", "वर्ग फीट", "वर्ग मीटर"];
        }

        unitsToShow.forEach(unit => {
            if (!dynamicUnits[unit]) return;
            const converted = totalSqFt / dynamicUnits[unit];
            const p = this.getPrecision(unit, settings);

            html += `
                <div class="result-item" style="padding: 10px; flex-direction: column; align-items: flex-start; gap: 2px; border-left: 4px solid var(--accent-400); background: var(--bg-white);">
                    <span style="font-size: 0.75em; color: var(--text-muted);">${unit}</span>
                    <strong style="font-size: 1.1em;">${converted.toFixed(p)}</strong>
                </div>
            `;
        });

        html += `</div>`;
        this.elements.resultArea.innerHTML = html;
    }

    displayShapeResult(shapeType, area, settings, laggiHands = 5.5) {
        const shape = shapeFormulas[shapeType];

        // Save to History
        this.saveToHistory(
            `Geometry Area (${shape.name})`,
            `Calculated Area`,
            `${area.toFixed(2)} Sq Ft`
        );

        const selectedUnit = document.getElementById('shapeGlobalUnit')?.value || 'फीट';

        // Dynamic area units based on Laggi
        const dynamicUnits = getDynamicAreaUnits(laggiHands);
        const totalDhur = area / dynamicUnits["धुर"];
        const lb = Calculator.getLaggiBreakdown(totalDhur);
        const sb = Calculator.getStandardBreakdown(area);

        // Calculate area in selected unit
        // area is in Sq Ft.
        const unitFactor = lengthUnits[selectedUnit] / 12;
        const areaInSelectedUnit = area / (unitFactor * unitFactor);

        let html = `
            <div style="background: var(--gradient-primary); color: white; padding: 25px 20px; text-align: center; border-radius: var(--radius-lg) var(--radius-lg) 0 0; margin-bottom: 0; box-shadow: var(--shadow-lg);">
                <div style="font-size: 2.8em; margin-bottom: 12px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));">${shape.icon}</div>
                <h3 style="margin:0; font-size: 1.5em; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                    ${shape.name} Area
                </h3>
                <div style="font-size: 1.1em; opacity: 0.9; margin-top: 5px;">${shape.name} का क्षेत्रफल</div>
                
                <div style="margin-top: 15px; background: rgba(255,255,255,0.15); padding: 12px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.3); display: flex; flex-direction: column; gap: 4px;">
                    <div style="font-size: 1.8em; font-weight: 900; letter-spacing: 1px;">
                        ${areaInSelectedUnit.toFixed(2)} <span style="font-size: 0.6em; font-weight: 600;">Sq. ${selectedUnit}</span>
                    </div>
                    <div style="font-size: 0.9em; opacity: 0.8; font-weight: 600;">
                        ${areaInSelectedUnit.toFixed(2)} वर्ग ${selectedUnit}
                    </div>
                </div>

                <div style="margin-top: 12px; font-size: 0.85em; background: rgba(0,0,0,0.2); display: inline-block; padding: 5px 15px; border-radius: var(--radius-full); font-weight: 600;">
                    Laggi / लग्गी: ${this.formatLaggiValue(laggiHands)} हाथ
                </div>
            </div>
            
            <div style="background: var(--bg-white); border: 2px solid var(--primary-100); padding: 25px; margin-bottom: var(--space-6); border-radius: 0 0 var(--radius-lg) var(--radius-lg); box-shadow: var(--shadow-xl);">
                <!-- Traditional Section -->
                <div style="text-align: center; margin-bottom: 30px; position: relative;">
                    <span style="color: var(--primary-600); font-weight: 600; font-size: 0.85em; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 12px;">
                        Traditional Area / पारंपरिक रकबा
                    </span>
                    <div style="padding: 15px; background: var(--bg-primary); border-radius: var(--radius-md); border: 1px solid var(--primary-100);">
                        <div style="font-size: 1.8em; font-weight: 900; color: var(--primary-700); line-height: 1.2;">
                            ${lb.bigha} <small style="font-size: 0.5em;">Bigha</small> - ${lb.katha} <small style="font-size: 0.5em;">Kattha</small> - ${lb.dhur} <small style="font-size: 0.5em;">Dhur</small>
                        </div>
                        <div style="font-size: 0.9em; color: var(--text-secondary); margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 8px;">
                            ${lb.dhurki} Dhurki, ${lb.furki} Furki, ${lb.churki} Churki
                        </div>
                    </div>
                </div>

                <!-- Modern Section -->
                <div style="text-align: center; padding-top: 20px; border-top: 2px dashed var(--primary-100);">
                    <span style="color: #2f855a; font-weight: 600; font-size: 0.85em; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 12px;">
                        Modern Area / आधुनिक रकबा
                    </span>
                    <div style="padding: 15px; background: #f0fff4; border-radius: var(--radius-md); border: 1px solid #c6f6d5;">
                        <div style="font-size: 1.6em; font-weight: 800; color: #276749; line-height: 1.2;">
                            ${sb.hectare} <small style="font-size: 0.5em;">Hec</small> - ${sb.acre} <small style="font-size: 0.5em;">Acre</small> - ${sb.decimal} <small style="font-size: 0.5em;">Dec</small>
                        </div>
                        <div style="font-size: 1em; color: #2f855a; font-weight: 600; margin-top: 10px;">
                            Total: ${area.toFixed(this.getPrecision('वर्ग फीट', settings))} Sq. Ft.
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 15px; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 10px;">
                <span style="background: var(--gradient-primary); width: 4px; height: 20px; border-radius: 2px;"></span>
                All Units / सभी इकाइयाँ
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px;">
        `;

        const unitsToShow = [
            "बीघा", "कट्ठा", "धुर", "धुरकी", "कनबा", "डिसमिल", "एकड़", "हेक्टर",
            "वर्ग फीट", "वर्ग मीटर", "वर्ग गज", "वर्ग कड़ी"
        ];

        unitsToShow.forEach(unit => {
            if (!dynamicUnits[unit]) return;
            const converted = area / dynamicUnits[unit];
            const p = this.getPrecision(unit, settings);

            // Map common units to English for bilingual display
            const unitEngMap = {
                "बीघा": "Bigha", "कट्ठा": "Kattha", "धुर": "Dhur", "धुरकी": "Dhurki",
                "कनबा": "Kanba", "डिसमिल": "Decimal", "एकड़": "Acre", "हेक्टर": "Hectare",
                "वर्ग फीट": "Sq. Ft.", "वर्ग मीटर": "Sq. Mt.", "वर्ग गज": "Sq. Yard", "वर्ग कड़ी": "Sq. Chain"
            };

            html += `
                <div class="result-item" style="padding: 12px; border-radius: var(--radius-md); background: var(--bg-white); border: 1px solid var(--primary-100); box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                    <div style="font-size: 0.7em; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">${unitEngMap[unit] || unit}</div>
                    <div style="font-size: 1.1em; font-weight: 700; color: var(--text-primary); margin: 2px 0;">${converted.toFixed(p)}</div>
                    <div style="font-size: 0.65em; color: var(--text-light);">${unit}</div>
                </div>
            `;
        });

        html += `</div>`;
        this.elements.resultArea.innerHTML = html;
        this.elements.resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    displayLaggiResult(results, settings) {
        let html = `
      <div style="margin-bottom: var(--space-6);">
        <h4 style="color: var(--primary-500); margin-bottom: var(--space-3);">📏 मापन विवरण (Dimensions):</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
          <div class="result-area" style="min-height: auto; padding: var(--space-3);">
            <div style="font-weight: bold; border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom: 5px;">लंबाई</div>
            <div style="font-size: 0.9em;">हाथ: ${parseFloat(results.length.hand).toFixed(this.getPrecision('हाथ', settings))}</div>
            <div style="font-size: 0.9em;">फीट: ${parseFloat(results.length.feet).toFixed(this.getPrecision('फीट', settings))}</div>
          </div>
          <div class="result-area" style="min-height: auto; padding: var(--space-3);">
            <div style="font-weight: bold; border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom: 5px;">चौड़ाई</div>
            <div style="font-size: 0.9em;">हाथ: ${parseFloat(results.width.hand).toFixed(this.getPrecision('हाथ', settings))}</div>
            <div style="font-size: 0.9em;">फीट: ${parseFloat(results.width.feet).toFixed(this.getPrecision('फीट', settings))}</div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: var(--space-6);">
        <h4 style="color: var(--primary-500); margin-bottom: var(--space-3);">📐 पारंपरिक इकाइयाँ (Traditional Units):</h4>
        <div class="input-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); margin-bottom: var(--space-4);">
          <div class="result-item" style="flex-direction: column; align-items: flex-start; gap: 2px;">
            <span style="font-size: 0.8em; color: var(--text-muted); font-weight: normal;">बीघा</span>
            <strong style="font-size: 1.1em;">${parseFloat(results.area.bigha).toFixed(this.getPrecision('बीघा', settings))}</strong>
          </div>
          <div class="result-item" style="flex-direction: column; align-items: flex-start; gap: 2px;">
            <span style="font-size: 0.8em; color: var(--text-muted); font-weight: normal;">कट्ठा</span>
            <strong style="font-size: 1.1em;">${parseFloat(results.area.katha).toFixed(this.getPrecision('कट्ठा', settings))}</strong>
          </div>
          <div class="result-item" style="flex-direction: column; align-items: flex-start; gap: 2px;">
            <span style="font-size: 0.8em; color: var(--text-muted); font-weight: normal;">धुर</span>
            <strong style="font-size: 1.1em;">${parseFloat(results.area.dhur).toFixed(this.getPrecision('धुर', settings))}</strong>
          </div>
          <div class="result-item" style="flex-direction: column; align-items: flex-start; gap: 2px; background: var(--gradient-success); color: white; border: none;">
            <span style="font-size: 0.8em; color: rgba(255,255,255,0.8); font-weight: normal;">डिसमिल (Decimal)</span>
            <strong style="font-size: 1.1em;">${parseFloat(results.area.decimal).toFixed(this.getPrecision('डिसमिल', settings))}</strong>
          </div>
        </div>
      </div>

      <div style="margin-top: var(--space-6);">
        <h4 style="color: var(--primary-500); margin-bottom: var(--space-3);">📐 आधुनिक क्षेत्रफल (Standard Area):</h4>
        <div class="result-item"><span>•</span> ${parseFloat(results.area.sqFeet).toFixed(this.getPrecision('वर्ग फीट', settings))} वर्ग फीट</div>
        <div class="result-item"><span>•</span> ${parseFloat(results.area.sqMeter).toFixed(this.getPrecision('वर्ग मीटर', settings))} वर्ग मीटर</div>
      </div>
    `;
        this.elements.resultArea.innerHTML = html;
    }

    displayLandMicroResults(value, selectedUnit, baseDhur, settings) {
        let html = `
            <div style="margin-bottom: var(--space-6);">
                <strong class="result-highlight">${value} ${selectedUnit}</strong> के बराबर है:
            </div>
            <div class="input-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3);">
        `;

        for (let unit in landMicroUnits) {
            const converted = baseDhur / landMicroUnits[unit];
            const p = this.getPrecision(unit, settings);
            html += `
                <div class="result-item" style="flex-direction: column; align-items: flex-start; gap: 2px;">
                    <span style="font-size: 0.8em; color: var(--text-muted); font-weight: normal;">${unit}</span>
                    <strong style="font-size: 1.1em;">${converted.toFixed(p)}</strong>
                </div>
            `;
        }

        html += `</div>`;

        const lb = Calculator.getLaggiBreakdown(baseDhur);
        html += `
            <div style="margin-top: var(--space-6); padding: var(--space-4); background: var(--gradient-primary); color: white; border-radius: var(--radius-md); text-align: center;">
                <h4 style="margin-bottom: var(--space-2); color: white; opacity: 0.9;">कुल पारंपरिक ब्रेकडाउन:</h4>
                <div style="font-size: 1.25em; font-weight: bold;">
                    ${lb.bigha} बीघा ${lb.katha} कट्ठा ${lb.dhur} धुर ${lb.dhurki} धुरकी ${lb.furki} फुरकी ${lb.churki} चुरकी
                </div>
            </div>
        `;

        this.elements.resultArea.innerHTML = html;
    }

    displayError(message) {
        this.elements.resultArea.innerHTML = `
      <div style="color: var(--accent-500); text-align: center; padding: var(--space-6);">
        <span style="font-size: var(--font-3xl);">⚠️</span>
        <div style="margin-top: var(--space-3); font-weight: var(--font-semibold);">${message}</div>
      </div>
    `;
    }

    displayLaggiFinderResult(value, unit, laggiHath, isValid, nearestValid) {
        const statusText = isValid ? "मान्य लग्गी" : "अमान्य लग्गी";
        const statusColor = isValid ? "var(--gradient-success)" : "var(--accent-500)";
        const suggestHtml = !isValid ? `
            <div style="margin-top: 15px; padding: 12px; background: rgba(102, 126, 234, 0.1); border-left: 4px solid var(--accent-500); border-radius: var(--radius-sm);">
                <strong style="color: var(--accent-600);">💡 सुझाव:</strong> 
                निकटतम मान्य लग्गी मान <strong>${nearestValid} हाथ</strong> हो सकता है।
            </div>
        ` : '';

        this.elements.resultArea.innerHTML = `
            <div style="background: var(--bg-white); border: 2px solid ${isValid ? '#48bb78' : '#f56565'}; padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 2.5em; margin-bottom: 10px;">${isValid ? '✅' : '❌'}</div>
                    <h3 style="margin: 0; color: ${isValid ? '#2f855a' : '#c53030'};">${statusText}</h3>
                </div>

                <p style="font-size: 1.1em; line-height: 1.6; color: var(--text-primary);">
                    1 धुर का मान <strong>${value} ${unit}</strong> होने पर उस क्षेत्र में चलने वाली लग्गी की लम्बाई <strong>${laggiHath.toFixed(1)} हाथ</strong> है। लग्गी का यह मान आपके द्वारा दिए गए क्षेत्रफल के अनुसार <strong>${statusText}</strong> है।
                </p>

                ${suggestHtml}
            </div>
        `;
    }

    createLaggiDiscoveryRelationUI() {
        this.elements.inputContainer.innerHTML = `
            <div class="calc-layout-advanced animate-fade-in">
                <!-- Info Note -->
                <div style="background: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; border-radius: var(--radius-md); margin-bottom: 25px;">
                    <strong style="color: #856404;">ℹ️ महत्वपूर्ण सूचना (Important Note):</strong>
                    <p style="margin: 8px 0 0; color: #856404; font-size: 0.95em;">
                        यह विधि अनुमान आधारित है और उपयोगकर्ता द्वारा दिए गए यूनिट संबंध (Relation) पर आधारित गणना करती है।<br>
                        <em>This method is estimation-based and calculates based on the unit relation provided by the user.</em>
                    </p>
                </div>

                <!-- Section 1: Define Relation -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: var(--radius-lg); margin-bottom: 25px;">
                    <h3 style="margin: 0 0 20px; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span>🔗</span> खंड 1 — संबंध परिभाषित करें (Section 1 — Define Relation)
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem;">
                                इकाई A का नाम (Unit A Name)
                            </label>
                            <input type="text" id="unitAName" class="text-input" placeholder="जैसे: धुर, बीघा" 
                                style="background: white; color: #333; width: 100%; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem;">
                                इकाई B का नाम (Unit B Name)
                            </label>
                            <input type="text" id="unitBName" class="text-input" placeholder="जैसे: वर्ग फीट" 
                                style="background: white; color: #333; width: 100%; box-sizing: border-box;">
                        </div>
                    </div>

                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem;">
                            संबंध दर्ज करें (Relation) — 1 इकाई A = ? इकाई B
                        </label>
                        <input type="number" id="relationValue" class="text-input" placeholder="जैसे: 400" step="0.01"
                            style="background: white; color: #333; width: 100%; box-sizing: border-box;">
                        <small style="display: block; margin-top: 5px; opacity: 0.9; font-size: 0.85rem;">
                            उदाहरण: अगर 1 धुर = 400 वर्ग फीट, तो "400" दर्ज करें
                        </small>
                    </div>
                </div>

                <!-- Section 2: Enter Measurement Value -->
                <div style="background: #f8f9fa; padding: 25px; border-radius: var(--radius-lg); border: 2px solid #e9ecef;">
                    <h3 style="margin: 0 0 20px; font-size: 1.3rem; color: #495057; display: flex; align-items: center; gap: 10px;">
                        <span>📊</span> खंड 2 — माप मान दर्ज करें (Section 2 — Enter Measurement Value)
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <!-- Option A -->
                        <div style="background: white; padding: 20px; border-radius: var(--radius-md); border: 2px solid #667eea; box-shadow: var(--shadow-sm);">
                            <h4 style="margin: 0 0 15px; color: #667eea; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                                <span>🅰️</span> विकल्प A (Option A)
                            </h4>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #495057; font-size: 0.9rem;">
                                इकाई A में मात्रा (Quantity in Unit A)
                            </label>
                            <input type="number" id="quantityA" class="text-input" placeholder="0.00" step="0.01"
                                style="width: 100%; box-sizing: border-box; margin-bottom: 15px;">
                            <button id="convertAtoB" class="btn-calculate" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 0.95rem; padding: 12px;">
                                <span>→</span> इकाई B में बदलें और लग्गी खोजें
                            </button>
                            <small style="display: block; margin-top: 8px; color: #6c757d; text-align: center;">
                                Convert to Unit B & Find Laggi
                            </small>
                        </div>

                        <!-- Option B -->
                        <div style="background: white; padding: 20px; border-radius: var(--radius-md); border: 2px solid #764ba2; box-shadow: var(--shadow-sm);">
                            <h4 style="margin: 0 0 15px; color: #764ba2; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                                <span>🅱️</span> विकल्प B (Option B)
                            </h4>
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #495057; font-size: 0.9rem;">
                                इकाई B में मात्रा (Quantity in Unit B)
                            </label>
                            <input type="number" id="quantityB" class="text-input" placeholder="0.00" step="0.01"
                                style="width: 100%; box-sizing: border-box; margin-bottom: 15px;">
                            <button id="convertBtoA" class="btn-calculate" style="width: 100%; background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); font-size: 0.95rem; padding: 12px;">
                                <span>←</span> इकाई A में बदलें और लग्गी खोजें
                            </button>
                            <small style="display: block; margin-top: 8px; color: #6c757d; text-align: center;">
                                Convert to Unit A & Find Laggi
                            </small>
                        </div>
                    </div>

                    <div style="margin-top: 20px; text-align: center;">
                        <button id="clearLaggiRelation" class="btn-secondary" style="min-width: 200px;">
                            🔄 सब साफ करें (Clear All)
                        </button>
                    </div>
                </div>

                <!-- Results Area -->
                <div id="laggiRelationResults" style="margin-top: 25px;"></div>
            </div>
        `;

        // Event Listeners
        document.getElementById('convertAtoB').addEventListener('click', () => this.handleLaggiRelationConversion('AtoB'));
        document.getElementById('convertBtoA').addEventListener('click', () => this.handleLaggiRelationConversion('BtoA'));
        document.getElementById('clearLaggiRelation').addEventListener('click', () => this.clearLaggiRelationInputs());
    }

    clearLaggiRelationInputs() {
        document.getElementById('unitAName').value = '';
        document.getElementById('unitBName').value = '';
        document.getElementById('relationValue').value = '';
        document.getElementById('quantityA').value = '';
        document.getElementById('quantityB').value = '';
        document.getElementById('laggiRelationResults').innerHTML = '';
    }

    handleLaggiRelationConversion(direction) {
        const unitAName = document.getElementById('unitAName').value.trim();
        const unitBName = document.getElementById('unitBName').value.trim();
        const relationValue = parseFloat(document.getElementById('relationValue').value);
        const quantityA = parseFloat(document.getElementById('quantityA').value);
        const quantityB = parseFloat(document.getElementById('quantityB').value);

        // Validation
        if (!unitAName || !unitBName) {
            this.showLaggiRelationError('कृपया दोनों इकाइयों के नाम दर्ज करें। (Please enter both unit names)');
            return;
        }

        if (!relationValue || relationValue <= 0) {
            this.showLaggiRelationError('कृपया एक मान्य संबंध मान दर्ज करें। (Please enter a valid relation value)');
            return;
        }

        if (direction === 'AtoB') {
            if (!quantityA || quantityA <= 0) {
                this.showLaggiRelationError('कृपया इकाई A में मान्य मात्रा दर्ज करें। (Please enter valid quantity in Unit A)');
                return;
            }
            if (quantityB && quantityB > 0) {
                this.showLaggiRelationWarning('दोनों फील्ड भरे हैं। केवल इकाई A का उपयोग किया जाएगा। (Both fields filled. Only Unit A will be used.)');
            }
            this.calculateLaggiFromRelation(unitAName, unitBName, relationValue, quantityA, 'AtoB');
        } else {
            if (!quantityB || quantityB <= 0) {
                this.showLaggiRelationError('कृपया इकाई B में मान्य मात्रा दर्ज करें। (Please enter valid quantity in Unit B)');
                return;
            }
            if (quantityA && quantityA > 0) {
                this.showLaggiRelationWarning('दोनों फील्ड भरे हैं। केवल इकाई B का उपयोग किया जाएगा। (Both fields filled. Only Unit B will be used.)');
            }
            this.calculateLaggiFromRelation(unitAName, unitBName, relationValue, quantityB, 'BtoA');
        }
    }

    calculateLaggiFromRelation(unitA, unitB, relation, quantity, direction) {
        let convertedValue, laggiValue;
        let formula, steps, summary;

        if (direction === 'AtoB') {
            // A to B: ResultB = ValueA × Relation
            convertedValue = quantity * relation;
            formula = `${quantity} ${unitA} × ${relation} = ${convertedValue.toFixed(2)} ${unitB}`;

            // Estimate Laggi (assuming धुर relationship)
            laggiValue = Math.sqrt(relation / 400) * 5.5; // Heuristic estimation

            steps = `
                <strong>चरण 1:</strong> संबंध = 1 ${unitA} = ${relation} ${unitB}<br>
                <strong>चरण 2:</strong> ${unitA} में दिया गया मान = ${quantity}<br>
                <strong>चरण 3:</strong> ${unitB} में परिणाम = ${quantity} × ${relation} = ${convertedValue.toFixed(2)}<br>
                <strong>चरण 4:</strong> अनुमानित लग्गी = ${laggiValue.toFixed(2)} हाथ
            `;

            summary = `${quantity} ${unitA} = ${convertedValue.toFixed(2)} ${unitB}`;
        } else {
            // B to A: ResultA = ValueB ÷ Relation
            convertedValue = quantity / relation;
            formula = `${quantity} ${unitB} ÷ ${relation} = ${convertedValue.toFixed(2)} ${unitA}`;

            // Estimate Laggi
            laggiValue = Math.sqrt(relation / 400) * 5.5;

            steps = `
                <strong>चरण 1:</strong> संबंध = 1 ${unitA} = ${relation} ${unitB}<br>
                <strong>चरण 2:</strong> ${unitB} में दिया गया मान = ${quantity}<br>
                <strong>चरण 3:</strong> ${unitA} में परिणाम = ${quantity} ÷ ${relation} = ${convertedValue.toFixed(2)}<br>
                <strong>चरण 4:</strong> अनुमानित लग्गी = ${laggiValue.toFixed(2)} हाथ
            `;

            summary = `${quantity} ${unitB} = ${convertedValue.toFixed(2)} ${unitA}`;
        }

        this.displayLaggiRelationResults(unitA, unitB, relation, convertedValue, laggiValue, formula, steps, summary, direction);
    }

    displayLaggiRelationResults(unitA, unitB, relation, convertedValue, laggiValue, formula, steps, summary, direction) {
        // Save to History
        this.saveToHistory(
            `Laggi Discovery (${direction === 'AtoB' ? unitA + ' to ' + unitB : unitB + ' to ' + unitA})`,
            `Relation: 1 ${unitA} = ${relation} ${unitB}`,
            `${summary}, Laggi ≈ ${laggiValue.toFixed(2)}`
        );
        const resultsDiv = document.getElementById('laggiRelationResults');

        resultsDiv.innerHTML = `
            <div class="result-card animate-scale-up" style="background: white; border: 3px solid #667eea; border-radius: var(--radius-xl); padding: 30px; box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);">
                <!-- Laggi Value Highlight -->
                <div style="background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); padding: 25px; border-radius: var(--radius-lg); text-align: center; margin-bottom: 25px; box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);">
                    <h3 style="margin: 0 0 10px; color: #333; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px;">
                        🎯 लग्गी का मान (Laggi Value)
                    </h3>
                    <div style="font-size: 2.5rem; font-weight: 950; color: #000; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                        ${laggiValue.toFixed(2)} हाथ
                    </div>
                    <small style="display: block; margin-top: 10px; color: #666; font-weight: 600;">
                        (Approximately ${laggiValue.toFixed(2)} Hand)
                    </small>
                </div>

                <!-- Converted Value -->
                <div style="background: #f8f9fa; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px; border-left: 5px solid #667eea;">
                    <h4 style="margin: 0 0 12px; color: #667eea; font-size: 1.1rem;">
                        📊 गणना परिणाम (Calculation Result)
                    </h4>
                    <div style="font-size: 1.4rem; font-weight: 700; color: #333;">
                        ${summary}
                    </div>
                </div>

                <!-- Formula Used -->
                <div style="background: #e3f2fd; padding: 15px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 10px; color: #1976d2; font-size: 1rem;">
                        📐 उपयोग किया गया सूत्र (Relation Formula Used)
                    </h4>
                    <code style="display: block; padding: 10px; background: white; border-radius: var(--radius-sm); font-size: 1rem; color: #333;">
                        ${formula}
                    </code>
                </div>

                <!-- Step-by-Step Explanation -->
                <div style="background: #fff3e0; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px; color: #f57c00; font-size: 1.1rem;">
                        📝 चरण-दर-चरण व्याख्या (Step-by-step Calculation)
                    </h4>
                    <div style="line-height: 1.8; color: #333;">
                        ${steps}
                    </div>
                </div>

                <!-- Summary Box -->
                <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 20px; border-radius: var(--radius-md); color: white; text-align: center;">
                    <h4 style="margin: 0 0 10px; font-size: 1.1rem; opacity: 0.95;">
                        ✅ अंतिम निष्कर्ष (Final Summary)
                    </h4>
                    <p style="margin: 0; font-size: 1.1rem; font-weight: 600; line-height: 1.6;">
                        संबंध के आधार पर, <strong>${laggiValue.toFixed(2)} हाथ</strong> की लग्गी का अनुमान है।<br>
                        <em style="font-size: 0.9rem; opacity: 0.9;">Based on the relation, estimated Laggi is ${laggiValue.toFixed(2)} Hand.</em>
                    </p>
                </div>
            </div>
        `;
    }

    showLaggiRelationError(message) {
        const resultsDiv = document.getElementById('laggiRelationResults');
        resultsDiv.innerHTML = `
            <div style="background: #fee; border: 2px solid #f56565; padding: 20px; border-radius: var(--radius-md); text-align: center;">
                <span style="font-size: 3rem;">⚠️</span>
                <p style="margin: 15px 0 0; color: #c53030; font-weight: 600; font-size: 1.1rem;">
                    ${message}
                </p>
            </div>
        `;
    }

    showLaggiRelationWarning(message) {
        const resultsDiv = document.getElementById('laggiRelationResults');
        resultsDiv.innerHTML = `
            <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: var(--radius-md); text-align: center;">
                <span style="font-size: 3rem;">⚡</span>
                <p style="margin: 15px 0 0; color: #856404; font-weight: 600; font-size: 1.1rem;">
                    ${message}
                </p>
            </div>
        `;
    }

    createPlotPartitionUI() {
        const lang = translations[window.currentLang || 'hi'];

        this.elements.inputContainer.innerHTML = `
            <div class="calc-layout-advanced animate-fade-in">
                <!-- Plot Type Selector -->
                <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 20px; border-radius: var(--radius-lg); margin-bottom: 25px; box-shadow: 0 8px 20px rgba(17, 153, 142, 0.3);">
                    <h3 style="margin: 0 0 15px; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span>🏢</span> ${lang.plotType || 'Plot Type / प्लॉट का प्रकार'}
                    </h3>
                    <select id="plotTypeSelect" class="select-input" style="background: white; color: #333; width: 100%; font-size: 1.05rem; padding: 12px;">
                        <option value="residential">🏡 ${lang.residentialPlot || 'Residential Plot (आवासीय प्लॉट)'}</option>
                        <option value="other">🌾 ${lang.generalPlot || 'Other Land Type (अन्य भूमि — कृषि/व्यावसायिक)'}</option>
                    </select>
                </div>

                <!-- Residential Method Container -->
                <div id="residentialMethod" class="partition-method">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px; border: 1px solid #dee2e6;">
                        <h4 style="margin: 0 0 15px; color: #495057; display: flex; align-items: center; gap: 8px;">
                            <span>📊</span> Total Land Details / कुल भूमि विवरण
                        </h4>
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px;">
                            <div>
                                <label class="section-label">${lang.totalLandToDivide || 'Total Area / कुल क्षेत्रफल'}</label>
                                <input type="number" id="totalArea" class="text-input" placeholder="0.00" step="0.01">
                            </div>
                            <div>
                                <label class="section-label">Unit / इकाई</label>
                                <select id="areaUnit" class="select-input">
                                    <option value="dhur">धुर (Dhur)</option>
                                    <option value="kattha">कट्ठा (Kattha)</option>
                                    <option value="bigha">बीघा (Bigha)</option>
                                    <option value="decimal">डिसमिल (Decimal)</option>
                                    <option value="sqft" selected>वर्ग फीट (Sq Ft)</option>
                                    <option value="sqmeter">वर्ग मीटर (Sq M)</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label class="section-label">${lang.plotLength || 'Plot Length / लंबाई'} (Ft)</label>
                                <input type="number" id="plotLength" class="text-input" placeholder="0.00" step="0.01">
                            </div>
                            <div>
                                <label class="section-label">${lang.plotWidth || 'Plot Width / चौड़ाई'} (Frontage Ft)</label>
                                <input type="number" id="plotWidth" class="text-input" placeholder="0.00" step="0.01">
                            </div>
                        </div>
                    </div>

                    <!-- 🏢 Plot Shape Selector (Phase 3) -->
                    <div style="background: #f3e5f5; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px; border-left: 4px solid #9c27b0;">
                        <h4 style="margin: 0 0 15px; color: #6a1b9a; display: flex; align-items: center; gap: 8px;">
                            <span>🏢</span> Plot Shape / प्लॉट का आकार
                        </h4>
                        <select id="plotShape" class="select-input" style="margin-bottom: 15px;">
                            <option value="rectangle" selected>📐 Rectangle Plot (आयताकार)</option>
                            <option value="corner">🔶 Corner Plot (कोने वाला प्लॉट)</option>
                            <option value="lshape">🔲 L-Shape Plot (एल आकार)</option>
                        </select>

                        <!-- Corner Plot Additional Input -->
                        <div id="cornerInputs" style="display: none; margin-top: 15px; padding: 15px; background: rgba(255,255,255,0.5); border-radius: var(--radius-sm);">
                            <label class="section-label">Corner Chamfer / Cut (कोने की कटाई) - Ft</label>
                            <input type="number" id="cornerChamfer" class="text-input" placeholder="0" step="0.1" value="0">
                            <small style="display: block; margin-top: 5px; color: #6a1b9a;">यदि कोने में कटाई है तो दर्ज करें</small>
                        </div>

                        <!-- L-Shape Additional Inputs -->
                        <div id="lshapeInputs" style="display: none; margin-top: 15px; padding: 15px; background: rgba(255,255,255,0.5); border-radius: var(--radius-sm);">
                            <p style="margin: 0 0 10px; font-size: 0.9rem; color: #6a1b9a;">एल-आकार दो rectangles से बना है:</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <div>
                                    <label class="section-label">Section 1 Length (Ft)</label>
                                    <input type="number" id="lshapeLen1" class="text-input" placeholder="0" step="0.1">
                                </div>
                                <div>
                                    <label class="section-label">Section 1 Width (Ft)</label>
                                    <input type="number" id="lshapeWidth1" class="text-input" placeholder="0" step="0.1">
                                </div>
                                <div>
                                    <label class="section-label">Section 2 Length (Ft)</label>
                                    <input type="number" id="lshapeLen2" class="text-input" placeholder="0" step="0.1">
                                </div>
                                <div>
                                    <label class="section-label">Section 2 Width (Ft)</label>
                                    <input type="number" id="lshapeWidth2" class="text-input" placeholder="0" step="0.1">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="background: #e3f2fd; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                        <h4 style="margin: 0 0 15px; color: #1976d2;">⚙️ ${lang.partitionBasis || 'Partition Settings / विभाजन सेटिंग्स'}</h4>
                        
                        <div style="margin-bottom: 15px;">
                            <label class="section-label">${lang.heirsCount || 'Number of Heirs / हिस्सेदारों की संख्या'}</label>
                            <input type="number" id="heirsCount" class="text-input" value="2" min="2" max="10">
                        </div>

                        <div style="margin-bottom: 15px;">
                            <label class="section-label">${lang.partitionSide || 'Partition Direction / विभाजन की दिशा'}</label>
                            <select id="partitionDirection" class="select-input">
                                <option value="width">${lang.fromWidth || 'From Width Side / चौड़ाई की तरफ से (Frontage)'}</option>
                                <option value="length">${lang.fromLength || 'From Length Side / लंबाई की तरफ से'}</option>
                            </select>
                        </div>

                        <div>
                            <label class="section-label">${lang.distributionMode || 'Distribution Mode / वितरण का तरीका'}</label>
                            <select id="distributionMode" class="select-input">
                                <option value="equalFrontage" selected>${lang.frontageShare || 'Equal Frontage / बराबर फ्रंट'}</option>
                                <option value="equalArea">${lang.equalShare || 'Equal Area / बराबर क्षेत्रफल'}</option>
                                <option value="proportionate">${lang.propFrontageArea || 'Proportionate Frontage + Area / आनुपातिक'}</option>
                                <option value="fixedFrontage">${lang.fixedFrontageOne || 'Fixed Frontage to One / एक को निश्चित'}</option>
                                <option value="custom">${lang.customFrontDepth || 'Custom Length/Depth / कस्टम माप'}</option>
                            </select>
                        </div>
                    </div>

                    <!-- 🚧 Road Preference Options -->
                    <div style="background: #fff3e0; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px; border-left: 4px solid #ff9800;">
                        <h4 style="margin: 0 0 15px; color: #e65100; display: flex; align-items: center; gap: 8px;">
                            <span>🚧</span> Road-Side Preference / सड़क की तरफ प्राथमिकता
                        </h4>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="radio" name="roadPreference" value="all" checked style="width: 18px; height: 18px;">
                                <span style="font-weight: 500;">All heirs get road frontage / सभी को सड़क वाला हिस्सा</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="radio" name="roadPreference" value="selected" style="width: 18px; height: 18px;">
                                <span style="font-weight: 500;">Only selected heirs get frontage / चयनित को ही</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="radio" name="roadPreference" value="one" style="width: 18px; height: 18px;">
                                <span style="font-weight: 500;">One heir gets full frontage / एक को पूरा फ्रंट</span>
                            </label>
                        </div>
                    </div>

                    <!-- 📏 Minimum Frontage Rule -->
                    <div style="background: #fce4ec; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px; border-left: 4px solid #e91e63;">
                        <h4 style="margin: 0 0 15px; color: #c2185b; display: flex; align-items: center; gap: 8px;">
                            <span>📏</span> Minimum Frontage Rule / न्यूनतम फ्रंट नियम
                        </h4>
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; align-items: center;">
                            <div>
                                <label class="section-label">Minimum Required Frontage / न्यूनतम आवश्यक फ्रंट</label>
                                <input type="number" id="minFrontage" class="text-input" value="10" step="0.5" min="0" placeholder="10">
                            </div>
                            <div>
                                <label class="section-label">Unit</label>
                                <select id="minFrontageUnit" class="select-input">
                                    <option value="ft" selected>Feet (फीट)</option>
                                    <option value="m">Meter (मीटर)</option>
                                </select>
                            </div>
                        </div>
                        <small style="display: block; margin-top: 10px; color: #c2185b; font-size: 0.9rem;">
                            ⚠️ If any share < minimum, system will warn and suggest adjustments
                        </small>
                    </div>

                    <!-- ⭐ Smart Assist Feature -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 20px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);">
                        <h4 style="margin: 0 0 15px; color: white; display: flex; align-items: center; gap: 8px;">
                            <span>⭐</span> Smart Assist — Auto Suggest Best Layout
                        </h4>
                        <p style="margin: 0 0 15px; color: white; opacity: 0.95; font-size: 0.95rem;">
                            System will evaluate and suggest the best partition layout based on usability, minimum leftover, and frontage access.
                        </p>
                        <button id="smartAssistBtn" class="btn-secondary" style="width: 100%; background: white; color: #667eea; font-weight: 600; border: none;">
                            🤖 Get Smart Recommendations / स्मार्ट सुझाव पाएं
                        </button>
                    </div>
                </div>

                <!-- General/Other Method Container -->
                <div id="otherMethod" class="partition-method" style="display: none;">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                        <h4 style="margin: 0 0 15px; color: #495057;">📊 Total Land Details / कुल भूमि विवरण</h4>
                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px;">
                            <div>
                                <label class="section-label">${lang.totalLandToDivide || 'Total Area / कुल क्षेत्रफल'}</label>
                                <input type="number" id="totalAreaOther" class="text-input" placeholder="0.00" step="0.01">
                            </div>
                            <div>
                                <label class="section-label">Unit / इकाई</label>
                                <select id="areaUnitOther" class="select-input">
                                    <option value="dhur">धुर (Dhur)</option>
                                    <option value="kattha">कट्ठा (Kattha)</option>
                                    <option value="bigha">बीघा (Bigha)</option>
                                    <option value="decimal">डिसमिल (Decimal)</option>
                                    <option value="sqft" selected>वर्ग फीट (Sq Ft)</option>
                                    <option value="sqmeter">वर्ग मीटर (Sq M)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style="background: #e8f5e9; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                        <h4 style="margin: 0 0 15px; color: #2e7d32;">⚙️ Distribution Settings / वितरण सेटिंग्स</h4>
                        
                        <div style="margin-bottom: 15px;">
                            <label class="section-label">${lang.heirsCount || 'Number of Heirs / हिस्सेदारों की संख्या'}</label>
                            <input type="number" id="heirsCountOther" class="text-input" value="2" min="2" max="20">
                        </div>

                        <div>
                            <label class="section-label">Share Basis / हिस्से का आधार</label>
                            <select id="shareBasis" class="select-input">
                                <option value="equal">${lang.equalShare || 'Equal Share / बराबर हिस्सा'}</option>
                                <option value="percentage">${lang.percentageShare || 'Percentage (%) / प्रतिशत'}</option>
                                <option value="ratio">${lang.ratioShare || 'Ratio Share / अनुपात'}</option>
                                <option value="customArea">Custom Area Entry / कस्टम क्षेत्रफल</option>
                            </select>
                        </div>
                    </div>

                    <div id="heirInputsOtherContainer" style="display: none; background: #fff; padding: 20px; border: 2px dashed #2e7d32; border-radius: var(--radius-md); margin-bottom: 20px;">
                        <h4 style="margin: 0 0 15px; color: #2e7d32;">👥 Share Details / हिस्सों का विवरण</h4>
                        <div id="heirInputsOther"></div>
                    </div>
                </div>

                <!-- Calculate Button -->
                <div style="margin-top: 25px; text-align: center;">
                    <button id="calculatePartition" class="btn-calculate" style="min-width: 300px; font-size: 1.1rem; padding: 15px 30px;">
                        🧮 Calculate Partition / बंटवारा गणना करें
                    </button>
                </div>

                <!-- Results Area -->
                <div id="partitionResults" style="margin-top: 30px;"></div>
            </div>
        `;

        // Event Listeners
        const plotTypeSelect = document.getElementById('plotTypeSelect');
        const residentialMethod = document.getElementById('residentialMethod');
        const otherMethod = document.getElementById('otherMethod');
        const shareBasis = document.getElementById('shareBasis');
        const heirsCountOther = document.getElementById('heirsCountOther');

        // Toggle between Residential and Other methods
        plotTypeSelect.addEventListener('change', () => {
            if (plotTypeSelect.value === 'residential') {
                residentialMethod.style.display = 'block';
                otherMethod.style.display = 'none';
            } else {
                residentialMethod.style.display = 'none';
                otherMethod.style.display = 'block';
            }
        });

        // Show/hide heir inputs for Other method
        const updateOtherHeirInputs = () => {
            const container = document.getElementById('heirInputsOtherContainer');
            const inputsDiv = document.getElementById('heirInputsOther');
            const basis = shareBasis.value;
            const count = parseInt(heirsCountOther.value) || 2;

            if (basis === 'equal') {
                container.style.display = 'none';
                return;
            }

            container.style.display = 'block';
            let html = '';

            for (let i = 1; i <= count; i++) {
                const label = basis === 'percentage' ? '% Share' :
                    basis === 'ratio' ? 'Ratio' : 'Area';
                const placeholder = basis === 'percentage' ? '0-100' :
                    basis === 'ratio' ? '1' : '0.00';

                html += `
                    <div style="margin-bottom: 12px; display: grid; grid-template-columns: 120px 1fr; gap: 10px; align-items: center;">
                        <label style="font-weight: 600; color: #495057;">Heir ${i} / हिस्सेदार ${i}:</label>
                        <input type="number" id="heirOther${i}" class="text-input" placeholder="${placeholder}" step="0.01">
                        <span style="grid-column: 2; font-size: 0.85rem; color: #6c757d;">${label}</span>
                    </div>
                `;
            }

            inputsDiv.innerHTML = html;
        };

        shareBasis.addEventListener('change', updateOtherHeirInputs);
        heirsCountOther.addEventListener('input', updateOtherHeirInputs);

        // Calculate button
        document.getElementById('calculatePartition').addEventListener('click', () => {
            this.handlePlotPartitionCalculation();
        });

        // Smart Assist button
        document.getElementById('smartAssistBtn').addEventListener('click', () => {
            this.runSmartAssist();
        });

        // Plot Shape selector
        const plotShapeSelect = document.getElementById('plotShape');
        const cornerInputs = document.getElementById('cornerInputs');
        const lshapeInputs = document.getElementById('lshapeInputs');

        plotShapeSelect.addEventListener('change', () => {
            const shape = plotShapeSelect.value;
            cornerInputs.style.display = shape === 'corner' ? 'block' : 'none';
            lshapeInputs.style.display = shape === 'lshape' ? 'block' : 'none';
        });
    }

    handlePlotPartitionCalculation() {
        const plotType = document.getElementById('plotTypeSelect').value;

        if (plotType === 'residential') {
            this.calculateResidentialPartition();
        } else {
            this.calculateGeneralPartition();
        }
    }

    calculateResidentialPartition() {
        const totalArea = parseFloat(document.getElementById('totalArea').value);
        const unit = document.getElementById('areaUnit').value;
        const length = parseFloat(document.getElementById('plotLength').value);
        const width = parseFloat(document.getElementById('plotWidth').value);
        const heirsCount = parseInt(document.getElementById('heirsCount').value);
        const direction = document.getElementById('partitionDirection').value;
        const mode = document.getElementById('distributionMode').value;

        if (!totalArea || !length || !width || !heirsCount) {
            this.displayError('कृपया सभी आवश्यक फील्ड भरें। (Please fill all required fields)');
            return;
        }

        // Convert area to sq ft for calculation
        const unitToSqFt = { dhur: 400, kattha: 8000, bigha: 160000, decimal: 435.6, sqft: 1, sqmeter: 10.764 };
        const totalAreaSqFt = totalArea * (unitToSqFt[unit] || 1);

        let results = [];

        if (mode === 'equalFrontage') {
            const frontagePerHeir = direction === 'width' ? width / heirsCount : length / heirsCount;
            const depth = direction === 'width' ? length : width;

            for (let i = 1; i <= heirsCount; i++) {
                results.push({
                    heir: `Heir ${i} / हिस्सेदार ${i}`,
                    frontage: frontagePerHeir.toFixed(2),
                    depth: depth.toFixed(2),
                    areaSqFt: (frontagePerHeir * depth).toFixed(2)
                });
            }
        } else if (mode === 'equalArea') {
            const areaPerHeir = totalAreaSqFt / heirsCount;
            const dimension = direction === 'width' ? width : length;
            const calculatedDepth = areaPerHeir / dimension;

            for (let i = 1; i <= heirsCount; i++) {
                results.push({
                    heir: `Heir ${i} / हिस्सेदार ${i}`,
                    frontage: direction === 'width' ? dimension.toFixed(2) : calculatedDepth.toFixed(2),
                    depth: direction === 'width' ? calculatedDepth.toFixed(2) : dimension.toFixed(2),
                    areaSqFt: areaPerHeir.toFixed(2)
                });
            }
        }

        this.displayResidentialPartitionResults(results, { unit, totalArea, length, width, mode, direction });
    }

    calculateGeneralPartition() {
        const totalArea = parseFloat(document.getElementById('totalAreaOther').value);
        const unit = document.getElementById('areaUnitOther').value;
        const heirsCount = parseInt(document.getElementById('heirsCountOther').value);
        const basis = document.getElementById('shareBasis').value;

        if (!totalArea || !heirsCount) {
            this.displayError('कृपया सभी आवश्यक फील्ड भरें। (Please fill all required fields)');
            return;
        }

        const unitToSqFt = { dhur: 400, kattha: 8000, bigha: 160000, decimal: 435.6, sqft: 1, sqmeter: 10.764 };
        const totalAreaSqFt = totalArea * (unitToSqFt[unit] || 1);

        let results = [];

        if (basis === 'equal') {
            const sharePerHeir = totalAreaSqFt / heirsCount;
            for (let i = 1; i <= heirsCount; i++) {
                results.push({
                    heir: `Heir ${i}`,
                    share: sharePerHeir.toFixed(2),
                    percentage: (100 / heirsCount).toFixed(2)
                });
            }
        }

        this.displayGeneralPartitionResults(results, { unit, totalArea, basis });
    }

    displayResidentialPartitionResults(results, metadata) {
        // Save to History
        this.saveToHistory(
            `Residential Partition (${metadata.mode})`,
            `Total: ${metadata.totalArea} ${metadata.unit}, Heirs: ${results.length}`,
            `Heir 1 Frontage: ${results[0].frontage} ft`
        );

        const resultsDiv = document.getElementById('partitionResults');
        const roadPref = document.querySelector('input[name="roadPreference"]:checked')?.value || 'all';
        const minFrontage = parseFloat(document.getElementById('minFrontage').value) || 10;
        const minUnit = document.getElementById('minFrontageUnit').value;

        // Convert all areas to multiple units
        const unitToSqFt = { dhur: 400, kattha: 8000, bigha: 160000, decimal: 435.6, sqft: 1, sqmeter: 10.764 };

        let html = `
            <div id="registryOutputDocument" class="result-card" style="background: white; border: 3px solid #11998e; border-radius: var(--radius-xl); padding: 30px; box-shadow: 0 20px 50px rgba(17, 153, 142, 0.2);">
                <!-- Header Section -->
                <div style="text-align: center; border-bottom: 3px solid #11998e; padding-bottom: 20px; margin-bottom: 25px;">
                    <h2 style="margin: 0 0 10px; color: #11998e; font-size: 1.8rem; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>🏡</span> Land Partition Document / भूमि बंटवारा दस्तावेज
                    </h2>
                    <p style="margin: 0; color: #6c757d; font-size: 1rem;">Registry / Mutation Friendly Output</p>
                </div>

                <!-- Export Buttons -->
                <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 25px; flex-wrap: wrap;">
                    <button onclick="window.print()" class="btn-secondary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px;">
                        <span>🖨️</span> Print Layout / प्रिंट करें
                    </button>
                    <button onclick="window.print()" class="btn-secondary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #e91e63; color: white; border: none;">
                        <span>📄</span> Save as PDF
                    </button>
                    <button onclick="document.querySelector('.partition-table-copy')?.select(); document.execCommand('copy');" class="btn-secondary" style="display: flex; align-items: center; gap: 8px; padding: 10px 20px;">
                        <span>📊</span> Copy Table / कॉपी करें
                    </button>
                </div>

                <!-- Summary Info -->
                <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 25px; border-left: 5px solid #11998e;">
                    <h4 style="margin: 0 0 15px; color: #2e7d32; font-size: 1.2rem;">📊 Partition Summary / विभाजन सारांश</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; font-size: 0.95rem;">
                        <div><strong>Plot Type:</strong> Residential</div>
                        <div><strong>Total Area:</strong> ${metadata.totalArea} ${metadata.unit}</div>
                        <div><strong>Plot Dimensions:</strong> ${metadata.length} × ${metadata.width} ft</div>
                        <div><strong>Number of Heirs:</strong> ${results.length}</div>
                        <div><strong>Distribution Mode:</strong> ${metadata.mode}</div>
                        <div><strong>Road Preference:</strong> ${roadPref === 'all' ? 'All heirs' : roadPref === 'one' ? 'One heir' : 'Selected'}</div>
                        <div><strong>Min Frontage:</strong> ${minFrontage} ${minUnit === 'm' ? 'meter' : 'feet'}</div>
                        <div><strong>Direction:</strong> ${metadata.direction === 'width' ? 'From Width' : 'From Length'}</div>
                    </div>
                </div>

                <!-- 🗺️ Visual Diagram -->
                ${this.generatePartitionDiagram(results, metadata)}

                <!-- Individual Heir Details (Registry Format) -->
                <h4 style="margin: 30px 0 20px; color: #495057; border-bottom: 2px solid #dee2e6; padding-bottom: 10px;">
                    👥 Heir-wise Allocation / हिस्सेदार-वार आवंटन
                </h4>`;

        results.forEach((heir, idx) => {
            const areaSqFt = parseFloat(heir.areaSqFt);

            // Convert to all units
            const conversions = {
                dhur: (areaSqFt / 400).toFixed(4),
                kattha: (areaSqFt / 8000).toFixed(4),
                bigha: (areaSqFt / 160000).toFixed(4),
                decimal: (areaSqFt / 435.6).toFixed(4),
                sqMeter: (areaSqFt / 10.764).toFixed(2),
                sqFt: areaSqFt.toFixed(2)
            };

            // Check frontage warning
            const frontageValue = parseFloat(heir.frontage);
            const frontageWarning = frontageValue < minFrontage ?
                `<span style="color: #e91e63;">⚠️ Below minimum (${minFrontage} ${minUnit})</span>` :
                `<span style="color: #28a745;">✅ Valid</span>`;

            html += `
                <div style="background: #ffffff; border: 2px solid #dee2e6; border-radius: var(--radius-lg); padding: 25px; margin-bottom: 20px; page-break-inside: avoid;">
                    <!-- Heir Header -->
                    <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 15px; border-radius: var(--radius-md); margin-bottom: 20px;">
                        <h5 style="margin: 0 0 10px; font-size: 1.3rem;">Heir ${idx + 1} / हिस्सेदार ${idx + 1}</h5>
                        <input type="text" placeholder="Enter Name / नाम दर्ज करें" 
                               class="text-input heir-name-input" 
                               style="background: white; color: #333; border: none; width: 100%; max-width: 300px; padding: 8px 12px;"
                               data-heir="${idx + 1}">
                    </div>

                    <!-- Dimensions -->
                    <div style="background: #f8f9fa; padding: 15px; border-radius: var(--radius-md); margin-bottom: 15px;">
                        <h6 style="margin: 0 0 12px; color: #495057; font-size: 1rem; font-weight: 600;">📏 Plot Dimensions / प्लॉट के आयाम</h6>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
                            <div style="background: white; padding: 10px; border-radius: var(--radius-sm); border-left: 3px solid #11998e;">
                                <small style="color: #6c757d; display: block; margin-bottom: 4px;">Frontage (सामने)</small>
                                <strong style="font-size: 1.1rem; color: #11998e;">${heir.frontage} ft</strong>
                                <div style="margin-top: 4px; font-size: 0.85rem;">${frontageWarning}</div>
                            </div>
                            <div style="background: white; padding: 10px; border-radius: var(--radius-sm); border-left: 3px solid #764ba2;">
                                <small style="color: #6c757d; display: block; margin-bottom: 4px;">Depth (गहराई)</small>
                                <strong style="font-size: 1.1rem; color: #764ba2;">${heir.depth} ft</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Area Conversions -->
                    <div style="background: #fff3e0; padding: 15px; border-radius: var(--radius-md); margin-bottom: 15px;">
                        <h6 style="margin: 0 0 12px; color: #e65100; font-size: 1rem; font-weight: 600;">📐 Area in All Units / सभी इकाइयों में क्षेत्रफल</h6>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; font-size: 0.9rem;">
                            <div><strong>धुर (Dhur):</strong> ${conversions.dhur}</div>
                            <div><strong>कट्ठा (Kattha):</strong> ${conversions.kattha}</div>
                            <div><strong>बीघा (Bigha):</strong> ${conversions.bigha}</div>
                            <div><strong>डेसिमल:</strong> ${conversions.decimal}</div>
                            <div><strong>Sq Ft:</strong> ${conversions.sqFt}</div>
                            <div><strong>Sq M:</strong> ${conversions.sqMeter}</div>
                        </div>
                    </div>

                    <!-- Share Basis & Remarks -->
                    <div style="background: #e3f2fd; padding: 15px; border-radius: var(--radius-md);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <strong style="color: #1976d2;">Share Basis:</strong>
                                <p style="margin: 5px 0 0; color: #495057;">${metadata.mode === 'equalFrontage' ? 'Equal Frontage' : metadata.mode === 'equalArea' ? 'Equal Area' : 'Proportionate'}</p>
                            </div>
                            <div>
                                <strong style="color: #1976d2;">Remarks / टिप्पणी:</strong>
                                <p style="margin: 5px 0 0; color: #495057;">
                                    ${frontageValue < minFrontage ? 'Adjusted - Below Minimum' : 'Exact Division'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Summary Table for Copy
        html += `
                <!-- Hidden Table for Copy Function -->
                <textarea class="partition-table-copy" style="position: absolute; left: -9999px;">
Heir\tFrontage (ft)\tDepth (ft)\tArea (Sq Ft)\tArea (Dhur)\tArea (Kattha)\tRemarks
`;
        results.forEach((heir, idx) => {
            const areaSqFt = parseFloat(heir.areaSqFt);
            html += `${idx + 1}\t${heir.frontage}\t${heir.depth}\t${areaSqFt.toFixed(2)}\t${(areaSqFt / 400).toFixed(4)}\t${(areaSqFt / 8000).toFixed(4)}\tExact\n`;
        });
        html += `</textarea>

                <!-- Footer -->
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #dee2e6; text-align: center; color: #6c757d; font-size: 0.9rem;">
                    <p style="margin: 0;">
                        <strong>💡 Document Usage Tip:</strong> यह दस्तावेज registry office और mutation purposes के लिए तैयार है।<br>
                        Use "Print" for hard copy or "Save as PDF" for digital records.
                    </p>
                    <p style="margin: 10px 0 0;">
                        Generated by अमीन साहेब Land Calculator | © 2026
                    </p>
                </div>
            </div>
        `;

        resultsDiv.innerHTML = html;
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    displayGeneralPartitionResults(results, metadata) {
        // Save to History
        this.saveToHistory(
            `General Partition (${metadata.basis})`,
            `Total: ${metadata.totalArea} ${metadata.unit}, Heirs: ${results.length}`,
            `Heir 1 Share: ${results[0].share} sq ft`
        );
        const resultsDiv = document.getElementById('partitionResults');

        let html = `
            <div class="result-card" style="background: white; border: 3px solid #2e7d32; border-radius: var(--radius-xl); padding: 30px;">
                <h3 style="margin: 0 0 20px; color: #2e7d32; text-align: center;">
                    🌾 General Land Partition Results
                </h3>
                
                <div style="display: grid; gap: 15px;">`;

        results.forEach(heir => {
            html += `
                <div style="background: #f1f8f4; padding: 15px; border-radius: var(--radius-md);">
                    <strong>${heir.heir}:</strong> ${heir.share} sq ft (${heir.percentage}%)
                </div>
            `;
        });

        html += `</div></div>`;
        resultsDiv.innerHTML = html;
    }

    // ⭐ SMART ASSIST METHOD
    runSmartAssist() {
        const totalArea = parseFloat(document.getElementById('totalArea').value);
        const unit = document.getElementById('areaUnit').value;
        const length = parseFloat(document.getElementById('plotLength').value);
        const width = parseFloat(document.getElementById('plotWidth').value);
        const heirsCount = parseInt(document.getElementById('heirsCount').value);
        const minFrontage = parseFloat(document.getElementById('minFrontage').value) || 10;
        const minUnit = document.getElementById('minFrontageUnit').value;

        if (!totalArea || !length || !width || !heirsCount) {
            this.displayError('कृपया सभी फील्ड भरें। (Please fill all fields for Smart Assist)');
            return;
        }

        // Convert min frontage to feet if needed
        const minFrontFt = minUnit === 'm' ? minFrontage * 3.28084 : minFrontage;

        // Calculate 3 layouts
        const layout1 = this.calculateLayout('equalArea', totalArea, unit, length, width, heirsCount, minFrontFt);
        const layout2 = this.calculateLayout('equalFrontage', totalArea, unit, length, width, heirsCount, minFrontFt);
        const layout3 = this.calculateLayout('proportionate', totalArea, unit, length, width, heirsCount, minFrontFt);

        // Evaluate and score each layout
        const scored = [
            { ...layout1, name: 'Equal Area / बराबर क्षेत्रफल', mode: 'equalArea' },
            { ...layout2, name: 'Equal Frontage / बराबर फ्रंट', mode: 'equalFrontage' },
            { ...layout3, name: 'Proportionate / आनुपातिक', mode: 'proportionate' }
        ].map(layout => ({
            ...layout,
            score: this.scoreLayout(layout, minFrontFt)
        }));

        // Find best option
        scored.sort((a, b) => b.score - a.score);
        const recommended = scored[0];

        // Display Smart Assist results
        this.displaySmartAssistResults(scored, recommended, minFrontFt);
    }

    calculateLayout(mode, totalArea, unit, length, width, heirsCount, minFrontFt) {
        const unitToSqFt = { dhur: 400, kattha: 8000, bigha: 160000, decimal: 435.6, sqft: 1, sqmeter: 10.764 };
        const totalAreaSqFt = totalArea * (unitToSqFt[unit] || 1);

        let results = [];
        let warnings = [];

        if (mode === 'equalFrontage') {
            const frontagePerHeir = width / heirsCount;
            const depth = length;

            for (let i = 1; i <= heirsCount; i++) {
                results.push({
                    frontage: frontagePerHeir.toFixed(2),
                    depth: depth.toFixed(2),
                    area: (frontagePerHeir * depth).toFixed(2)
                });
            }

            if (frontagePerHeir < minFrontFt) {
                warnings.push(`⚠️ Frontage ${frontagePerHeir.toFixed(1)} ft < minimum ${minFrontFt} ft`);
            }

        } else if (mode === 'equalArea') {
            const areaPerHeir = totalAreaSqFt / heirsCount;
            const calculatedFrontage = width;
            const calculatedDepth = areaPerHeir / calculatedFrontage;

            for (let i = 1; i <= heirsCount; i++) {
                results.push({
                    frontage: calculatedFrontage.toFixed(2),
                    depth: calculatedDepth.toFixed(2),
                    area: areaPerHeir.toFixed(2)
                });
            }

            if (calculatedFrontage < minFrontFt) {
                warnings.push(`⚠️ Frontage ${calculatedFrontage.toFixed(1)} ft < minimum ${minFrontFt} ft`);
            }

        } else if (mode === 'proportionate') {
            // Balanced approach: Try to keep both frontage and area reasonable
            const avgFrontage = width / heirsCount;
            const avgDepth = length / heirsCount;
            const avgArea = totalAreaSqFt / heirsCount;

            for (let i = 1; i <= heirsCount; i++) {
                results.push({
                    frontage: avgFrontage.toFixed(2),
                    depth: avgDepth.toFixed(2),
                    area: avgArea.toFixed(2)
                });
            }

            if (avgFrontage < minFrontFt) {
                warnings.push(`⚠️ Frontage ${avgFrontage.toFixed(1)} ft < minimum ${minFrontFt} ft`);
            }
        }

        return { results, warnings, totalAreaUsed: results.reduce((sum, r) => sum + parseFloat(r.area), 0) };
    }

    scoreLayout(layout, minFrontFt) {
        let score = 100;

        // Penalty for frontage below minimum
        const frontages = layout.results.map(r => parseFloat(r.frontage));
        const minActualFrontage = Math.min(...frontages);
        if (minActualFrontage < minFrontFt) {
            score -= (minFrontFt - minActualFrontage) * 2; // Heavy penalty
        }

        // Reward for uniform distribution
        const frontageStdDev = this.calculateStdDev(frontages);
        score -= frontageStdDev * 0.5;

        // Penalty for leftover/waste
        const areas = layout.results.map(r => parseFloat(r.area));
        const totalUsed = areas.reduce((sum, a) => sum + a, 0);
        const waste = Math.abs(layout.totalAreaUsed - totalUsed);
        score -= waste * 0.1;

        // Bonus for practical usability (frontage > 15 ft is good)
        if (minActualFrontage > 15) {
            score += 10;
        }

        return Math.max(0, score);
    }

    calculateStdDev(values) {
        const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
        const squareDiffs = values.map(v => Math.pow(v - avg, 2));
        const avgSquareDiff = squareDiffs.reduce((sum, v) => sum + v, 0) / values.length;
        return Math.sqrt(avgSquareDiff);
    }

    displaySmartAssistResults(scoredLayouts, recommended, minFrontFt) {
        const resultsDiv = document.getElementById('partitionResults');

        let html = `
            <div class="result-card animate-scale-up" style="background: white; border: 3px solid #667eea; border-radius: var(--radius-xl); padding: 30px; box-shadow: 0 25px 60px rgba(102, 126, 234, 0.25);">
                <h3 style="margin: 0 0 10px; color: #667eea; text-align: center; font-size: 1.6rem; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <span>⭐</span> Smart Assist Recommendations
                </h3>
                <p style="text-align: center; color: #6c757d; margin: 0 0 25px;">
                    System analyzed ${scoredLayouts.length} layouts based on usability, min frontage & waste minimization
                </p>

                <!-- Recommended Option -->
                <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 25px; border-radius: var(--radius-lg); margin-bottom: 25px; color: white; box-shadow: 0 10px 30px rgba(17, 153, 142, 0.3);">
                    <h4 style="margin: 0 0 15px; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span>✅</span> RECOMMENDED — ${recommended.name}
                    </h4>
                    <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: var(--radius-md); margin-bottom: 15px;">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                            <div>
                                <small style="opacity: 0.9;">Score</small>
                                <div style="font-size: 1.5rem; font-weight: 700;">${recommended.score.toFixed(1)}/100</div>
                            </div>
                            <div>
                                <small style="opacity: 0.9;">Min Frontage</small>
                                <div style="font-size: 1.5rem; font-weight: 700;">${Math.min(...recommended.results.map(r => parseFloat(r.frontage))).toFixed(1)} ft</div>
                            </div>
                            <div>
                                <small style="opacity: 0.9;">Heirs</small>
                                <div style="font-size: 1.5rem; font-weight: 700;">${recommended.results.length}</div>
                            </div>
                        </div>
                    </div>
                    ${recommended.warnings.length > 0 ? `
                        <div style="background: rgba(255,152,0,0.2); padding: 10px; border-radius: var(--radius-sm); font-size: 0.9rem;">
                            ${recommended.warnings.join('<br>')}
                        </div>
                    ` : ''}
                    <button onclick="document.getElementById('distributionMode').value='${recommended.mode}'" 
                            class="btn-secondary" style="width: 100%; margin-top: 15px; background: white; color: #11998e; font-weight: 600; border: none;">
                        🎯 पूरा कैलकुलेशन के लिए Auto-select करें
                    </button>
                </div>

                <!-- Comparison Table -->
                <h4 style="margin: 0 0 15px; color: #495057;">📊 Layout Comparison / तुलना</h4>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
                        <thead>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Layout</th>
                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">Score</th>
                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">Min Frontage</th>
                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

        scoredLayouts.forEach((layout, index) => {
            const minFront = Math.min(...layout.results.map(r => parseFloat(r.frontage)));
            const isRecommended = layout.mode === recommended.mode;
            const statusColor = minFront >= minFrontFt ? '#28a745' : '#ffc107';
            const statusText = minFront >= minFrontFt ? '✅ Valid' : '⚠️ Below Min';

            html += `
                <tr style="background: ${isRecommended ? '#e7f4ff' : 'white'}; ${isRecommended ? 'font-weight: 600;' : ''}">
                    <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
                        ${layout.name} ${isRecommended ? '<span style="color: #11998e;">🏆</span>' : ''}
                    </td>
                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6;">
                        ${layout.score.toFixed(1)}
                    </td>
                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6;">
                        ${minFront.toFixed(1)} ft
                    </td>
                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6; color: ${statusColor};">
                        ${statusText}
                    </td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>

                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: var(--radius-md); font-size: 0.9rem; color: #6c757d;">
                    <strong>💡 Tip:</strong> Recommended layout balances frontage usability, minimum requirements, and practical division. 
                    आप ऊपर दिए गए बटन से Auto-select कर सकते हैं या manually mode चुन सकते हैं।
                </div>
            </div>
        `;

        resultsDiv.innerHTML = html;
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        resultsDiv.innerHTML = html;
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    generatePartitionDiagram(results, metadata) {
        // Calculate aspect ratio for SVG
        const length = parseFloat(metadata.length);
        const width = parseFloat(metadata.width);
        const aspectRatio = width / length;

        // Base SVG dimensions
        const svgWidth = 600;
        const svgHeight = svgWidth * (metadata.direction === 'width' ? (length / width) : (width / length));
        const limitedHeight = Math.min(svgHeight, 400); // Limit height

        let svgContent = '';
        let currentPos = 0;
        const totalDimension = metadata.direction === 'width' ? width : length;
        const scaleFactor = metadata.direction === 'width' ? (svgWidth / width) : (limitedHeight / length);

        results.forEach((heir, index) => {
            const dimension = parseFloat(metadata.direction === 'width' ? heir.frontage : heir.depth);
            const partSize = dimension * scaleFactor;

            // Generate distinct color for each heir
            const hue = (index * 137.5) % 360;
            const color = `hsla(${hue}, 70%, 80%, 0.6)`;
            const borderColor = `hsla(${hue}, 70%, 40%, 1)`;

            if (metadata.direction === 'width') {
                // Vertical partitions (Frontage division)
                svgContent += `
                    <rect x="${currentPos}" y="0" width="${partSize}" height="100%" 
                          fill="${color}" stroke="${borderColor}" stroke-width="2"/>
                    <text x="${currentPos + partSize / 2}" y="50%" dominant-baseline="middle" text-anchor="middle" 
                          font-weight="bold" font-size="20" fill="#333">H${index + 1}</text>
                    <text x="${currentPos + partSize / 2}" y="60%" dominant-baseline="middle" text-anchor="middle" 
                          font-size="14" fill="#555">${dimension} ft</text>
                `;
                currentPos += partSize;
            } else {
                // Horizontal partitions (Length/Depth division)
                const partH = (parseFloat(heir.depth) / length) * limitedHeight;
                svgContent += `
                    <rect x="0" y="${currentPos}" width="100%" height="${partH}" 
                          fill="${color}" stroke="${borderColor}" stroke-width="2"/>
                    <text x="50%" y="${currentPos + partH / 2}" dominant-baseline="middle" text-anchor="middle" 
                          font-weight="bold" font-size="20" fill="#333">H${index + 1}</text>
                    <text x="50%" y="${currentPos + partH / 2 + 20}" dominant-baseline="middle" text-anchor="middle" 
                          font-size="14" fill="#555">${heir.depth} ft</text>
                `;
                currentPos += partH;
            }
        });

        // Add Road Indicator
        const roadMarker = metadata.direction === 'width'
            ? `<rect x="0" y="${limitedHeight - 10}" width="100%" height="10" fill="#333"/><text x="50%" y="${limitedHeight + 20}" text-anchor="middle" font-size="14">ROAD (सड़क)</text>`
            : `<rect x="0" y="0" width="10" height="100%" fill="#333"/><text x="-15" y="50%" transform="rotate(-90 -15,50%)" text-anchor="middle" font-size="14">ROAD</text>`;

        return `
            <div style="margin: 20px 0; padding: 15px; background: white; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
                <h4 style="margin: 0 0 15px; color: #495057;">🗺️ Partition Map / नक्शा</h4>
                <svg viewBox="0 0 ${svgWidth} ${limitedHeight + 30}" style="width: 100%; max-height: 300px; background: #fafafa;">
                    ${svgContent}
                    ${roadMarker}
                </svg>
            </div>
        `;
    }
}
