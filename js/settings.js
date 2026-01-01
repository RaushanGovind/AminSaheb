// js/settings.js - सेटिंग्स मैनेजर

class SettingsManager {
    constructor(app) {
        this.app = app;
        const defaultPrecisions = {
            "बीघा": 4, "कट्ठा": 4, "धुर": 4, "धुर्की": 4, "फुर्की": 4, "चुरकी": 4, "कनमा": 4,
            "डिसमिल": 4, "एकड़": 4, "हेक्टेयर": 4,
            "वर्ग फीट": 2, "वर्ग मीटर": 2, "वर्ग गज": 2, "कड़ी": 2, "हाथ": 2, "फीट": 2
        };

        try {
            this.settings = JSON.parse(localStorage.getItem('calculatorSettings')) || {
                lang: 'hi',
                theme: 'clean',
                font: 'var(--font-primary)',
                accentColor: '#3b82f6',
                tradPrecision: 4,
                stdPrecision: 4,
                defaultCalc: 'none',
                unitPrecisions: defaultPrecisions
            };

            // Merge defaults in case new units were added
            this.settings.unitPrecisions = { ...defaultPrecisions, ...this.settings.unitPrecisions };
        } catch (e) {
            this.settings = {
                lang: 'hi',
                theme: 'clean',
                font: 'var(--font-primary)',
                accentColor: '#3b82f6',
                tradPrecision: 4,
                stdPrecision: 4,
                defaultCalc: 'none',
                unitPrecisions: defaultPrecisions
            };
        }
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateUnitPrecisionGrid();
        this.applySettings();
        this.updateUIStrings();
    }

    populateUnitPrecisionGrid() {
        const grid = document.getElementById('unitPrecisionGrid');
        if (!grid) return;
        grid.innerHTML = '';

        for (let unit in this.settings.unitPrecisions) {
            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.gap = '2px';

            const label = document.createElement('label');
            label.style.fontSize = '0.7em';
            label.style.color = 'var(--text-muted)';
            label.textContent = unit;

            const select = document.createElement('select');
            select.className = 'select-input';
            select.style.padding = '4px';
            select.style.fontSize = '0.85em';

            for (let i = 0; i <= 8; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.textContent = i;
                if (i === this.settings.unitPrecisions[unit]) opt.selected = true;
                select.appendChild(opt);
            }

            select.onchange = (e) => {
                this.settings.unitPrecisions[unit] = parseInt(e.target.value);
                this.save();
                if (this.app) this.app.handleConversion();
            };

            div.appendChild(label);
            div.appendChild(select);
            grid.appendChild(div);
        }
    }

    setupEventListeners() {
        const elements = {
            settingsBtn: document.getElementById('settingsBtn'),
            settingsModal: document.getElementById('settingsModal'),
            closeSettings: document.getElementById('closeSettings'),
            langHi: document.getElementById('langHi'),
            langEn: document.getElementById('langEn'),
            fontSelect: document.getElementById('fontSelect'),
            colorPicker: document.getElementById('accentColorPicker'),
            tradPrecision: document.getElementById('tradPrecision'),
            stdPrecision: document.getElementById('stdPrecision'),
            defaultCalc: document.getElementById('defaultCalcSelect'),
            resetBtn: document.getElementById('resetSettings'),
            themeOptions: document.querySelectorAll('.theme-option')
        };

        if (elements.settingsBtn) elements.settingsBtn.onclick = () => elements.settingsModal.classList.remove('hidden');
        if (elements.closeSettings) elements.closeSettings.onclick = () => elements.settingsModal.classList.add('hidden');

        const themeToggleBtn = document.getElementById('themeToggleBtn');
        if (themeToggleBtn) {
            themeToggleBtn.onclick = () => {
                const currentTheme = this.settings.theme;
                const nextTheme = (currentTheme === 'dark' ? 'clean' : 'dark');
                this.applyTheme(nextTheme);
            };
        }

        window.onclick = (e) => {
            if (e.target === elements.settingsModal) elements.settingsModal.classList.add('hidden');
        };

        if (elements.langHi) elements.langHi.onchange = () => this.updateSetting('lang', 'hi');
        if (elements.langEn) elements.langEn.onchange = () => this.updateSetting('lang', 'en');
        if (elements.fontSelect) elements.fontSelect.onchange = (e) => this.updateSetting('font', e.target.value);
        if (elements.colorPicker) elements.colorPicker.onchange = (e) => this.updateSetting('accentColor', e.target.value);
        if (elements.tradPrecision) elements.tradPrecision.onchange = (e) => this.updateSetting('tradPrecision', parseInt(e.target.value));
        if (elements.stdPrecision) elements.stdPrecision.onchange = (e) => this.updateSetting('stdPrecision', parseInt(e.target.value));
        if (elements.defaultCalc) elements.defaultCalc.onchange = (e) => this.updateSetting('defaultCalc', e.target.value);

        elements.themeOptions.forEach(opt => {
            opt.onclick = () => {
                this.updateSetting('theme', opt.dataset.theme);
                this.applyTheme(opt.dataset.theme);
                elements.themeOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
            };
        });

        if (elements.resetBtn) {
            elements.resetBtn.onclick = () => {
                localStorage.removeItem('calculatorSettings');
                location.reload();
            };
        }
    }

    updateSetting(key, value) {
        this.settings[key] = value;
        this.save();
        this.applySettings();
        if (key === 'lang') this.updateUIStrings();

        if (key === 'tradPrecision' || key === 'stdPrecision') {
            if (this.app) {
                this.app.handleConversion();
            }
        }
    }

    save() {
        localStorage.setItem('calculatorSettings', JSON.stringify(this.settings));
    }

    applySettings() {
        document.body.style.fontFamily = this.settings.font;
        const theme = themes[this.settings.theme] || themes.default;

        // Use user's selected accent color if it was custom, otherwise use theme primary
        const primary = this.settings.accentColor || theme.primary;

        document.documentElement.style.setProperty('--primary-500', primary);
        document.documentElement.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${primary} 0%, ${primary}dd 100%)`);

        // Apply theme-specific variables if not overridden
        if (theme.bg) document.documentElement.style.setProperty('--bg-main', theme.bg);
        if (theme.card) document.documentElement.style.setProperty('--bg-card', theme.card);
        if (theme.text) document.documentElement.style.setProperty('--text-primary', theme.text);
        if (theme.secondary) document.documentElement.style.setProperty('--gradient-secondary', `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`);

        // Handle background white replacement for dark/clean themes
        const bgWhite = theme.bgWhite || (this.settings.theme === 'dark' ? '#1e293b' : '#ffffff');
        document.documentElement.style.setProperty('--bg-white', bgWhite);

        // Toggle animations based on theme distraction level
        if (this.settings.theme === 'clean' || this.settings.theme === 'dark') {
            document.body.classList.add('no-animation');
        } else {
            document.body.classList.remove('no-animation');
        }

        const langHi = document.getElementById('langHi');
        const langEn = document.getElementById('langEn');
        const fontSelect = document.getElementById('fontSelect');
        const colorPicker = document.getElementById('accentColorPicker');
        const tradPrecision = document.getElementById('tradPrecision');
        const stdPrecision = document.getElementById('stdPrecision');
        const defaultCalc = document.getElementById('defaultCalcSelect');

        if (langHi) langHi.checked = this.settings.lang === 'hi';
        if (fontSelect) fontSelect.value = this.settings.font;
        if (colorPicker) colorPicker.value = this.settings.accentColor;
        if (tradPrecision) tradPrecision.value = this.settings.tradPrecision || 4;
        if (stdPrecision) stdPrecision.value = this.settings.stdPrecision || 4;
        if (defaultCalc) defaultCalc.value = this.settings.defaultCalc || 'none';

        const activeTheme = document.querySelector(`.theme-option[data-theme="${this.settings.theme}"]`);
        if (activeTheme) {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
            activeTheme.classList.add('active');
        }
    }

    applyTheme(themeKey) {
        const theme = themes[themeKey];
        if (theme) {
            this.settings.theme = themeKey;
            this.settings.accentColor = theme.primary; // Sync accent color with theme
            this.save();
            this.applySettings();
        }
    }

    updateUIStrings() {
        const t = translations[this.settings.lang];
        if (!t) return;

        const safeSetText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        safeSetText('mainTitle', t.mainTitle);
        safeSetText('mainTagline', t.mainTagline);
        safeSetText('settingsModalTitle', t.settingsTitle);
        safeSetText('langLabel', t.langLabel);
        safeSetText('themeLabel', t.themeLabel);
        safeSetText('fontLabel', t.fontLabel);
        safeSetText('colorLabel', t.colorLabel);
        safeSetText('precisionLabel', t.precisionLabel);
        safeSetText('tradPrecisionLabel', t.tradPrecisionLabel);
        safeSetText('stdPrecisionLabel', t.stdPrecisionLabel);
        safeSetText('resetSettings', t.resetBtn);

        const selectorTitleEl = document.querySelector('.selector-title');
        if (selectorTitleEl) {
            selectorTitleEl.innerHTML = `<span class="title-icon">🧮</span> ${t.selectorTitle}`;
        }

        const backBtnEl = document.getElementById('backBtn');
        if (backBtnEl) {
            backBtnEl.innerHTML = `<span>←</span> <span>${t.backBtn}</span>`;
        }

        const infoHeaderEl = document.querySelector('.info-card h3');
        if (infoHeaderEl) {
            infoHeaderEl.innerHTML = t.featuresTitle;
        }

        const featureItems = document.querySelectorAll('.info-card li');
        const featureKeys = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'];
        featureItems.forEach((li, index) => {
            if (featureKeys[index] && t[featureKeys[index]]) {
                li.textContent = t[featureKeys[index]];
            }
        });

        // Re-render dynamic cards to reflect language changes
        if (this.app && this.app.ui) {
            this.app.ui.renderCalculatorCards();
        }
    }
}
