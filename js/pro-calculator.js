class ProCalculator {
    constructor() {
        this.historyLine = document.getElementById('historyLine');
        this.mainDisplay = document.getElementById('mainDisplay');
        this.currentExpression = '';
        this.lastResult = null;
        this.isScientific = false;

        // Themes: dark, light, amoled
        this.themes = ['dark', 'light', 'amoled'];
        this.currentThemeIndex = 0; // Starts with Dark (based on body class)

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateThemeLabel();
    }

    bindEvents() {
        // Number and Operator buttons
        document.querySelectorAll('.btn-num').forEach(btn => {
            btn.addEventListener('click', () => this.appendValue(btn.innerText));
        });

        document.querySelectorAll('.btn-operator').forEach(btn => {
            btn.addEventListener('click', () => {
                const op = btn.getAttribute('data-op');
                this.handleOperator(op, btn.innerText);
            });
        });

        document.querySelectorAll('.btn-sci').forEach(btn => {
            btn.addEventListener('click', () => {
                const op = btn.getAttribute('data-op');
                this.handleScientific(op);
            });
        });

        // Action buttons
        document.querySelector('[data-action="clear"]').addEventListener('click', () => this.clear());
        document.querySelector('[data-action="delete"]').addEventListener('click', () => this.delete());
        document.querySelector('.btn-equals').addEventListener('click', () => this.calculate());

        // Mode Toggles
        document.getElementById('basicModeBtn').addEventListener('click', () => this.setMode(false));
        document.getElementById('sciModeBtn').addEventListener('click', () => this.setMode(true));

        // Theme Toggle
        document.getElementById('themeCycleBtn').addEventListener('click', () => this.cycleTheme());

        // Keyboard support
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    appendValue(val) {
        if (this.currentExpression === '0' && val !== '.') {
            this.currentExpression = val;
        } else {
            this.currentExpression += val;
        }
        this.updateDisplay();
    }

    handleOperator(op, label) {
        // Basic mapping for display and internal math
        const lastChar = this.currentExpression.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            this.currentExpression = this.currentExpression.slice(0, -1);
        }

        let symbol = label;
        if (op === 'multiply') symbol = '*';
        if (op === 'divide') symbol = '/';
        if (op === 'subtract') symbol = '-';
        if (op === 'add') symbol = '+';
        if (op === 'mod') symbol = '%';

        this.currentExpression += symbol;
        this.updateDisplay();
    }

    handleScientific(op) {
        switch (op) {
            case 'sin': this.applyFunction('Math.sin'); break;
            case 'cos': this.applyFunction('Math.cos'); break;
            case 'tan': this.applyFunction('Math.tan'); break;
            case 'log': this.applyFunction('Math.log10'); break;
            case 'sqrt': this.applyFunction('Math.sqrt'); break;
            case 'pi': this.appendValue(Math.PI.toFixed(6)); break;
            case 'e': this.appendValue(Math.E.toFixed(6)); break;
            case 'pow': this.currentExpression += '**'; break;
        }
        this.updateDisplay();
    }

    applyFunction(fnName) {
        if (this.currentExpression === '' || this.currentExpression === '0') return;
        try {
            const currentVal = eval(this.currentExpression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-'));
            const result = eval(`${fnName}(${currentVal})`);
            this.historyLine.innerText = `${fnName}(${this.currentExpression})`;
            this.currentExpression = result.toString();
        } catch (e) {
            this.currentExpression = 'Error';
        }
    }

    calculate() {
        if (this.currentExpression === '') return;
        try {
            // Replace visual symbols with math symbols for eval
            let expr = this.currentExpression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/%/g, '/100');

            // Handle power operator if entered as text
            const result = eval(expr);

            this.historyLine.innerText = this.currentExpression + ' =';
            this.currentExpression = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
            this.lastResult = this.currentExpression;
        } catch (e) {
            this.currentExpression = 'Error';
        }
        this.updateDisplay();
    }

    clear() {
        this.currentExpression = '0';
        this.historyLine.innerText = '';
        this.updateDisplay();
    }

    delete() {
        if (this.currentExpression.length > 1) {
            this.currentExpression = this.currentExpression.slice(0, -1);
        } else {
            this.currentExpression = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        // Limit display length
        let displayValue = this.currentExpression;
        if (displayValue.length > 12) {
            displayValue = displayValue.substring(0, 12);
        }
        this.mainDisplay.innerText = displayValue || '0';

        // Font size adjustment for long expressions
        if (displayValue.length > 8) {
            this.mainDisplay.style.fontSize = '2rem';
        } else {
            this.mainDisplay.style.fontSize = '3rem';
        }
    }

    setMode(scientific) {
        this.isScientific = scientific;
        const sciKeys = document.getElementById('scientificKeys');
        const basicBtn = document.getElementById('basicModeBtn');
        const sciBtn = document.getElementById('sciModeBtn');

        if (scientific) {
            sciKeys.classList.remove('hidden');
            sciBtn.classList.add('active');
            basicBtn.classList.remove('active');
        } else {
            sciKeys.classList.add('hidden');
            sciBtn.classList.remove('active');
            basicBtn.classList.add('active');
        }
    }

    cycleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        const newTheme = this.themes[this.currentThemeIndex];

        document.body.className = `theme-${newTheme}`;
        this.updateThemeLabel();
    }

    updateThemeLabel() {
        const label = document.getElementById('themeLabel');
        const currentTheme = this.themes[this.currentThemeIndex];
        label.innerText = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    }

    handleKeyboard(e) {
        const key = e.key;
        if (/[0-9.]/.test(key)) this.appendValue(key);
        if (key === '+') this.handleOperator('add', '+');
        if (key === '-') this.handleOperator('subtract', '−');
        if (key === '*') this.handleOperator('multiply', '×');
        if (key === '/') this.handleOperator('divide', '÷');
        if (key === 'Enter' || key === '=') this.calculate();
        if (key === 'Backspace') this.delete();
        if (key === 'Escape') this.clear();
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    new ProCalculator();
});
