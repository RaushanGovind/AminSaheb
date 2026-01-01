// js/ui.js - यूजर इंटरफेस मैनेजर

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
            areaLaggiHands: document.getElementById('areaLaggiHands')
        };
        this.renderCalculatorCards();
    }

    renderCalculatorCards() {
        const grid = document.querySelector('.calculator-grid');
        if (!grid || typeof calculatorCards === 'undefined') return;

        const lang = document.documentElement.lang || 'hi';
        const t = (translations[lang] && translations[lang].cardData) ? translations[lang].cardData : null;

        grid.innerHTML = calculatorCards.map(card => {
            const data = (t && t[card.id]) ? t[card.id] : card;
            return `
                <div class="calc-type-card" data-calc-type="${card.id}">
                    <div class="card-icon ${card.color || ''}" ${card.style ? `style="${card.style}"` : ''}>
                        ${card.tag || card.icon}
                    </div>
                    <h3 class="card-title">${data.title}</h3>
                    <p class="card-description">${data.desc}</p>
                    <div class="card-features">
                        ${data.features.map(f => `<span>${f}</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    showSelector() {
        this.elements.selector.classList.remove('hidden');
        this.elements.interface.classList.add('hidden');
    }

    hideSelector() {
        this.elements.selector.classList.add('hidden');
        this.elements.interface.classList.remove('hidden');
    }

    setTitle(calcType) {
        this.elements.calcTitle.textContent = calculatorTitles[calcType] || '';
    }

    showUnitSection(units) {
        this.elements.unitType.innerHTML = '';

        for (let unit in units) {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
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
            option.textContent = `${i} हाथ`;
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
                        <option value="extended" selected>1. ${t.compositeFormat || 'बीघा-धुर-धुर्की'}</option>
                        <option value="kanma">2. ${t.kanmaFormat || 'बीघा-कट्ठा-धुर-कनमा'}</option>
                        <option value="modern">3. ${t.standardFormat || 'हेक्टेयर-एकड़-डिसमिल'}</option>
                    </select>
                </div>
                <div class="calc-section" style="flex: 1.5;">
                    <label class="section-label">
                        <span class="label-icon">🎯</span>
                        कहाँ तक (To)
                    </label>
                    <select id="specialTargetSelect" class="select-input">
                        <option value="all" selected>All Units (सभी इकाइयाँ)</option>
                        <option value="extended">1. ${t.compositeFormat || 'बीघा-धुर-धुर्की'}</option>
                        <option value="kanma">2. ${t.kanmaFormat || 'बीघा-कट्ठा-धुर-कनमा'}</option>
                        <option value="modern">3. ${t.standardFormat || 'हेक्टेयर-एकड़-डिसमिल'}</option>
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
                option.textContent = `${i} हाथ`;
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
                { label: 'धुर्की', key: 'dhurki' },
                { label: 'फुर्की', key: 'furki' },
                { label: 'चुरकी', key: 'churki' }
            ];
        } else if (group === 'kanma') {
            fields = [
                { label: 'बीघा', key: 'bigha' },
                { label: 'कट्ठा', key: 'katha' },
                { label: 'धुर', key: 'dhur' },
                { label: 'कनमा', key: 'kanma' }
            ];
        } else if (group === 'modern') {
            fields = [
                { label: 'हेक्टेयर', key: 'hectare' },
                { label: 'एकड़', key: 'acre' },
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
                <div class="calc-section" style="flex: 2;">
                    <label class="section-label">
                        <span class="label-icon">📂</span>
                        ${t.inputGroupLabel || 'इनपुट समूह चुनें'}
                    </label>
                    <select id="estimatorGroupSelect" class="select-input">
                        <option value="extended" selected>1. ${t.compositeFormat || 'बीघा-धुर-धुर्की-फुर्की-चुरकी'}</option>
                        <option value="kanma">2. ${t.kanmaFormat || 'बीघा-कट्ठा-धुर-कनमा'}</option>
                        <option value="modern">3. ${t.standardFormat || 'हेक्टेयर-एकड़-डिसमिल'}</option>
                    </select>
                </div>
                <div class="calc-section" style="flex: 1;">
                    <label class="section-label">
                        <span class="label-icon">📐</span>
                        लग्गी
                    </label>
                    <select id="estimatorLaggi" class="select-input"></select>
                </div>
            </div>
            
            <div id="estimatorRowsContainer" style="display: flex; flex-direction: column; gap: var(--space-4);"></div>
            
            <div id="liveTotalContainer" style="margin-top: var(--space-6); padding: var(--space-4); background: var(--gradient-primary); color: white; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); display: none;">
                <div style="font-size: 0.8em; opacity: 0.9; margin-bottom: 5px; text-align: center;">कुल अनुमानित रकबा (Live Total)</div>
                <div id="liveTotalDisplay" style="text-align: center; font-weight: bold; font-size: 1.3em;"></div>
                <div id="liveTotalSubDisplay" style="text-align: center; font-size: 0.85em; opacity: 0.9; margin-top: 5px; border-top: 1px dashed rgba(255,255,255,0.3); padding-top: 5px;"></div>
            </div>

            <button id="addRowBtn" class="btn-secondary" style="margin-top: var(--space-4); width: 100%; justify-content: center; padding: 14px; font-weight: bold; border: 2px dashed var(--accent-300); background: rgba(102, 126, 234, 0.05);">
                ${t.addRowBtn || '+ पंक्ति जोड़ें'}
            </button>
        `;

        const laggiSelect = document.getElementById('estimatorLaggi');
        for (let i = 4; i <= 12; i += 0.25) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i} हाथ`;
            if (i === 5.5) option.selected = true;
            laggiSelect.appendChild(option);
        }
    }

    addEstimatorRow(index, group) {
        const container = document.getElementById('estimatorRowsContainer');
        const rowDiv = document.createElement('div');
        rowDiv.className = 'estimator-row';
        rowDiv.dataset.index = index;
        rowDiv.style.padding = 'var(--space-4)';
        rowDiv.style.background = 'var(--bg-white)';
        rowDiv.style.borderRadius = 'var(--radius-lg)';
        rowDiv.style.border = '1px solid var(--accent-100)';
        rowDiv.style.boxShadow = 'var(--shadow-sm)';
        rowDiv.style.transition = 'all 0.3s ease';

        let fields = [];
        if (group === 'extended') {
            fields = [
                { label: 'B', key: 'bigha' },
                { label: 'K', key: 'katha' },
                { label: 'D', key: 'dhur' },
                { label: 'Dk', key: 'dhurki' },
                { label: 'F', key: 'furki' },
                { label: 'C', key: 'churki' }
            ];
        } else if (group === 'kanma') {
            fields = [
                { label: 'B', key: 'bigha' },
                { label: 'K', key: 'katha' },
                { label: 'D', key: 'dhur' },
                { label: 'Km', key: 'kanma' }
            ];
        } else if (group === 'modern') {
            fields = [
                { label: 'Hec', key: 'hectare' },
                { label: 'Acr', key: 'acre' },
                { label: 'Dec', key: 'decimal' }
            ];
        }

        rowDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: bold; opacity: 0.7;"># ${index + 1}</span>
                ${index > 0 ? `<button class="remove-row-btn" style="background: none; border: none; color: var(--accent-500); cursor: pointer; font-size: 1.2em;">&times;</button>` : ''}
            </div>
            <div class="input-grid" style="grid-template-columns: repeat(auto-fit, minmax(75px, 1fr)); gap: 10px;">
                ${fields.map(f => `
                    <div class="input-group">
                        <label style="font-size: 0.75em; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px; display: block; text-align: center;">${f.label}</label>
                        <input type="number" class="text-input row-input" data-key="${f.key}" placeholder="0" style="padding: 10px 5px; font-size: 1em; text-align: center; border-radius: var(--radius-md); border: 2px solid var(--accent-100);">
                    </div>
                `).join('')}
            </div>
        `;

        container.appendChild(rowDiv);
        rowDiv.style.transform = 'scale(0.95)';
        setTimeout(() => rowDiv.style.transform = 'scale(1)', 10);

        const removeBtn = rowDiv.querySelector('.remove-row-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => rowDiv.remove());
        }
    }

    createShapeInputs(shapeType) {
        const shape = shapeFormulas[shapeType];
        if (!shape) return;

        const inputsHTML = shape.inputs.map(input => `
      <div class="input-group">
        <label class="input-label">
          <span>📏</span>
          ${input.name} ${input.unit ? `(${input.unit})` : ''}
        </label>
        <input 
          type="number" 
          data-key="${input.key}"
          class="text-input shape-input" 
          placeholder="मान दर्ज करें"
          step="0.01"
          min="0"
        />
      </div>
    `).join('');

        this.elements.inputContainer.innerHTML = `
      <div class="input-grid">
        ${inputsHTML}
      </div>
      <div style="padding: var(--space-4); background: rgba(102, 126, 234, 0.1); border-radius: var(--radius-sm); margin-top: var(--space-4); color: var(--text-secondary);">
        <strong>सूत्र:</strong> ${shape.formula}
      </div>
    `;
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
        const traditionalUnits = ["धुर", "कट्ठा", "बीघा", "कनमा", "धुरकी", "फुरकी", "चुरकी"];
        if (traditionalUnits.includes(unit)) return settings.tradPrecision || 4;
        return settings.stdPrecision || 4;
    }

    displayConversionResults(value, selectedUnit, units, baseValue, isArea = false, laggiHands = 5.5, settings = {}, targetUnit = 'all') {
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
                <small style="opacity: 0.9;">लग्गी का मान: ${laggiHands} हाथ</small>
            </div>
            
            <div style="background: var(--bg-white); border: 2px solid var(--accent-500); padding: 15px; margin-bottom: var(--space-4); border-radius: 0 0 var(--radius-md) var(--radius-md); box-shadow: var(--shadow-md);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="color: var(--text-muted); font-size: 0.9em; display: block; margin-bottom: 5px;">कुल रकबा (पारंपरिक):</span>
                    <div style="font-size: 1.5em; font-weight: bold; color: var(--accent-600); line-height: 1.4;">
                        ${lb.bigha} बीघा - ${lb.katha} कट्ठा - ${lb.dhur} धुर
                        <div style="font-size: 0.7em; color: var(--text-primary); margin-top: 5px;">
                            ${lb.dhurki} धुर्की ${lb.furki} फुर्की ${lb.churki} चुरकी
                        </div>
                    </div>
                </div>

                <div style="text-align: center; padding-top: 15px; border-top: 1px dashed #ddd;">
                    <span style="color: var(--text-muted); font-size: 0.9em; display: block; margin-bottom: 5px;">कुल रकबा (आधुनिक):</span>
                    <div style="font-size: 1.5em; font-weight: bold; color: #2f855a; line-height: 1.4;">
                        ${sb.hectare} हेक्टेयर - ${sb.acre} एकड़ - ${sb.decimal} डिसमिल
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
                "बीघा", "कट्ठा", "धुर", "धुर्की", "कनमा", "फुरकी", "चुरकी",
                "डिसमिल", "एकड़", "हेक्टेयर",
                "वर्ग फीट", "वर्ग मीटर", "वर्ग गज", "वर्ग इंच", "वर्ग कड़ी", "वर्ग हाथ"
            ];
        } else if (targetUnit === 'extended') {
            unitsToShow = ["बीघा", "कट्ठा", "धुर", "धुर्की", "फुरकी", "चुरकी"];
        } else if (targetUnit === 'kanma') {
            unitsToShow = ["बीघा", "कट्ठा", "धुर", "कनमा"];
        } else if (targetUnit === 'modern') {
            unitsToShow = ["हेक्टेयर", "एकड़", "डिसमिल", "वर्ग फीट", "वर्ग मीटर"];
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

    displayShapeResult(shapeType, area, settings) {
        const shape = shapeFormulas[shapeType];
        const p_feet = this.getPrecision('वर्ग फीट', settings);

        let html = `
      <div style="margin-bottom: var(--space-6);">
        <div style="font-size: var(--font-2xl); margin-bottom: var(--space-3);">
          ${shape.icon}
        </div>
        <strong class="result-highlight">${shape.name} का क्षेत्रफल:</strong>
      </div>
      <div style="margin-bottom: var(--space-4);">
        <div class="result-item" style="font-size: var(--font-lg); border-left-width: 6px;">
          <span>📊</span>
          <strong>${area.toFixed(p_feet)} वर्ग फीट</strong>
        </div>
      </div>
      <div style="margin-top: var(--space-6); padding-top: var(--space-6); border-top: 2px solid rgba(102, 126, 234, 0.2);">
        <strong style="display: block; margin-bottom: var(--space-3);">अन्य इकाइयों में:</strong>
    `;

        const dynamicUnits = getDynamicAreaUnits(5.5);

        for (let unit in dynamicUnits) {
            const converted = area / dynamicUnits[unit];
            const p = this.getPrecision(unit, settings);
            html += `
        <div class="result-item">
          <span>•</span>
          <span>${converted.toFixed(p)} ${unit}</span>
        </div>
      `;
        }

        html += `</div>`;
        this.elements.resultArea.innerHTML = html;
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
                    ${lb.bigha} बीघा ${lb.katha} कट्ठा ${lb.dhur} धुर ${lb.dhurki} धुर्की ${lb.furki} फुर्की ${lb.churki} चुरकी
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
}
