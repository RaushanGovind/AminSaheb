// js/calculator.js - मुख्य गणना लॉजिक और बेसिक कैलकुलेटर

class Calculator {
    static convertLength(value, fromUnit) {
        return value * lengthUnits[fromUnit];
    }

    static convertArea(value, fromUnit, laggiHands = 5.5) {
        const dynamicUnits = getDynamicAreaUnits(laggiHands);
        return value * dynamicUnits[fromUnit];
    }

    static calculateShape(shapeType, values) {
        const shape = shapeFormulas[shapeType];
        if (!shape) {
            throw new Error('अमान्य आकार प्रकार');
        }

        for (let key in values) {
            const val = parseFloat(values[key]);
            if (isNaN(val) || val <= 0) {
                throw new Error('कृपया सभी मानों में सकारात्मक संख्याएं दर्ज करें');
            }
            values[key] = val;
        }

        return shape.calculate(values);
    }

    static getLaggiBreakdown(totalDhur) {
        let remaining = totalDhur;
        const bigha = Math.floor(remaining / 400);
        remaining %= 400;
        const katha = Math.floor(remaining / 20);
        remaining %= 20;
        const dhur = Math.floor(remaining);
        remaining = (remaining - dhur) * 20;
        const dhurki = Math.floor(remaining);
        remaining = (remaining - dhurki) * 20;
        const furki = Math.floor(remaining);
        remaining = (remaining - furki) * 20;
        const churki = Math.round(remaining);
        return { bigha, katha, dhur, dhurki, furki, churki };
    }

    static getStandardBreakdown(sqFt) {
        let remaining = sqFt;
        const hectare = Math.floor(remaining / 107639);
        remaining %= 107639;
        const acre = Math.floor(remaining / 43560);
        remaining %= 43560;
        const decimal = Math.round(remaining / 435.6 * 100) / 100;
        return { hectare, acre, decimal };
    }

    static validateInput(input) {
        const num = parseFloat(input);
        if (isNaN(num) || num <= 0) {
            return false;
        }
        return num;
    }
}

class BasicCalculator {
    constructor(displayElement) {
        this.display = displayElement;
        this.expressionEl = document.getElementById('calcExpression');
        this.resultEl = document.getElementById('calcResult');
        this.expression = '0';
        this.result = '';
        this.shouldReset = false;
        this.updateDisplay();
    }

    updateDisplay() {
        let displayStr = this.expression.replace(/\*/g, '×').replace(/\//g, '÷');
        this.expressionEl.textContent = displayStr || '0';
        this.resultEl.textContent = this.result;
        this.adjustFontSize();
    }

    adjustFontSize() {
        const length = this.expressionEl.textContent.length;
        if (length > 25) {
            this.expressionEl.style.fontSize = '0.8rem';
        } else if (length > 18) {
            this.expressionEl.style.fontSize = '0.9rem';
        } else {
            this.expressionEl.style.fontSize = '';
        }

        const resLength = this.resultEl.textContent.length;
        if (resLength > 20) {
            this.resultEl.style.fontSize = '1.2rem';
        } else if (resLength > 15) {
            this.resultEl.style.fontSize = '1.6rem';
        } else {
            this.resultEl.style.fontSize = '';
        }
    }

    clear() {
        this.expression = '0';
        this.result = '';
        this.shouldReset = false;
        this.updateDisplay();
    }

    delete() {
        if (this.expression === 'Error' || this.expression.length <= 1) {
            this.expression = '0';
        } else {
            this.expression = this.expression.slice(0, -1);
        }
        this.tryLiveCalculate();
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.shouldReset || this.expression === 'Error') {
            this.expression = (number === '.') ? '0.' : number;
            this.shouldReset = false;
        } else {
            if (this.expression === '0' && number !== '.') {
                this.expression = number;
            } else {
                const parts = this.expression.split(/[\+\-\*\/]/);
                const lastPart = parts[parts.length - 1];
                if (number === '.' && lastPart.includes('.')) return;
                this.expression += number;
            }
        }
        this.tryLiveCalculate();
        this.updateDisplay();
    }

    setOperation(op) {
        if (this.expression === 'Error') return;
        const lastChar = this.expression.slice(-1);
        const operators = ['+', '-', '*', '/'];

        if (operators.includes(lastChar)) {
            this.expression = this.expression.slice(0, -1) + op;
        } else {
            if (this.shouldReset) this.shouldReset = false;
            this.expression += op;
        }
        this.updateDisplay();
    }

    tryLiveCalculate() {
        // Only try to calculate if it ends with a number and has an operator
        const operators = ['+', '-', '*', '/'];
        if (operators.some(op => this.expression.includes(op)) && !operators.includes(this.expression.slice(-1))) {
            try {
                const result = Function('"use strict";return (' + this.expression + ')')();
                this.result = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
            } catch (e) {
                this.result = '';
            }
        } else {
            this.result = '';
        }
    }

    sqrt() {
        this.calculate();
        if (this.expression !== 'Error') {
            const val = parseFloat(this.expression);
            if (val < 0) {
                this.expression = 'Error';
            } else {
                this.expression = Math.sqrt(val).toString();
            }
            this.result = this.expression;
            this.shouldReset = true;
            this.updateDisplay();
        }
    }

    sqr() {
        this.calculate();
        if (this.expression !== 'Error') {
            const val = parseFloat(this.expression);
            this.expression = (val * val).toString();
            this.result = this.expression;
            this.shouldReset = true;
            this.updateDisplay();
        }
    }

    calculate() {
        if (this.expression === 'Error') return;
        try {
            let exp = this.expression;
            if (['+', '-', '*', '/'].includes(exp.slice(-1))) exp = exp.slice(0, -1);
            const result = Function('"use strict";return (' + exp + ')')();
            this.expression = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
            this.result = this.expression;
            this.shouldReset = true;
            this.updateDisplay();
        } catch (e) {
            this.expression = 'Error';
            this.result = '';
            this.updateDisplay();
        }
    }
}
