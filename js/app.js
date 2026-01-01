// js/app.js - मुख्य एप्लीकेशन क्लास

class SmartCalculatorApp {
    constructor() {
        this.ui = new UIManager();
        this.settings = new SettingsManager(this);
        this.currentMode = null;
        this.basicCalc = null;
        this.initializeEventListeners();
        this.applyDefaultCalculator();
    }

    applyDefaultCalculator() {
        const defaultCalc = this.settings.settings.defaultCalc;
        if (defaultCalc && defaultCalc !== 'none') {
            this.startApp();
            setTimeout(() => {
                this.switchToCalculator(defaultCalc);
            }, 100);
        }
    }

    startApp() {
        const landerPage = document.getElementById('landerPage');
        const header = document.querySelector('.header');
        const mainApp = document.getElementById('mainApp');
        const mainFooter = document.getElementById('mainFooter');

        if (landerPage) landerPage.classList.add('fade-out');

        setTimeout(() => {
            if (landerPage) landerPage.classList.add('hidden');
            if (header) header.classList.remove('hidden');
            if (mainApp) mainApp.classList.remove('hidden');
            if (mainFooter) mainFooter.classList.remove('hidden');

            this.ui.showSelector();

            if (mainApp) mainApp.classList.add('fade-in');
        }, 500);
    }

    initializeEventListeners() {
        // Event Delegation for Slider Cards
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.calc-type-card');
            if (card && this.ui.elements.selector.contains(card)) {
                const calcType = card.dataset.calcType;
                this.switchToCalculator(calcType);
            }
        });

        // Header Navigation Dropdown
        if (this.ui.elements.headerNav) {
            this.ui.elements.headerNav.addEventListener('change', (e) => {
                const calcType = e.target.value;
                if (calcType === 'none') {
                    this.goBack();
                } else {
                    this.switchToCalculator(calcType);
                }
            });
        }

        if (this.ui.elements.homeBtn) {
            this.ui.elements.homeBtn.addEventListener('click', () => {
                this.currentMode = null;
                this.ui.showLander();
                if (this.ui.elements.headerNav) this.ui.elements.headerNav.value = 'none';
            });
        }

        this.ui.elements.backBtn.addEventListener('click', () => {
            this.goBack();
        });

        // AdSense Compliance Modals
        if (this.ui.elements.aboutBtn) {
            this.ui.elements.aboutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.ui.toggleAbout(true);
            });
        }
        if (this.ui.elements.privacyBtn) {
            this.ui.elements.privacyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.ui.togglePrivacy(true);
            });
        }
        if (this.ui.elements.closeAbout) {
            this.ui.elements.closeAbout.addEventListener('click', () => this.ui.toggleAbout(false));
        }
        if (this.ui.elements.closePrivacy) {
            this.ui.elements.closePrivacy.addEventListener('click', () => this.ui.togglePrivacy(false));
        }

        if (this.ui.elements.goProBtn) {
            this.ui.elements.goProBtn.addEventListener('click', () => this.ui.togglePro(true));
        }
        if (this.ui.elements.closePro) {
            this.ui.elements.closePro.addEventListener('click', () => this.ui.togglePro(false));
        }

        this.ui.elements.calculateBtn.addEventListener('click', () => {
            this.handleCalculate();
        });

        this.ui.elements.unitType.addEventListener('change', () => {
            this.ui.updateUnitSuffix();
            this.handleConversion();
        });

        this.ui.elements.areaLaggiHands.addEventListener('change', () => {
            if (this.currentMode === 'area') this.handleAreaConversion();
        });

        this.ui.elements.inputContainer.addEventListener('input', (e) => {
            if (e.target.id === 'conversionInput') {
                this.handleConversion();
            }
        });
    }

    handleConversion() {
        if (this.currentMode === 'length') this.handleLengthConversion();
        if (this.currentMode === 'area') this.handleAreaConversion();
        if (this.currentMode === 'landConverter') this.handleLandMicroConversion();
        if (this.currentMode === 'laggiFinder') this.handleLaggiFinderCalculation();
    }

    switchToCalculator(calcType) {
        this.currentMode = calcType;

        // Ensure lander is hidden and mainApp is shown
        const landerPage = document.getElementById('landerPage');
        const mainApp = document.getElementById('mainApp');
        const mainFooter = document.getElementById('mainFooter');

        if (landerPage) landerPage.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        if (mainFooter) mainFooter.classList.remove('hidden');

        this.ui.hideSelector();
        this.ui.setTitle(calcType);
        this.ui.clearAll();

        switch (calcType) {
            case 'basic':
                this.setupBasicCalculator();
                break;
            case 'length':
                this.setupLengthCalculator();
                break;
            case 'area':
                this.setupAreaCalculator();
                break;
            case 'triangle':
                this.setupTriangleCalculator(calcType);
                break;
            case 'square':
            case 'rectangle':
                this.setupShapeCalculator(calcType);
                break;
            case 'laggi':
                this.setupLaggiCalculator();
                break;
            case 'landConverter':
                this.setupLandConverter();
                break;
            case 'specialArea':
                this.setupSpecialArea();
                break;
            case 'landEstimator':
                this.setupLandEstimator();
                break;
            case 'laggiFinder':
                this.setupLaggiFinder();
                break;
            case 'heron':
                this.setupTriangleCalculator(calcType);
                break;
        }
    }

    goBack() {
        this.currentMode = null;

        // Ensure we show the app grid, not lander
        const landerPage = document.getElementById('landerPage');
        const mainApp = document.getElementById('mainApp');
        const mainFooter = document.getElementById('mainFooter');

        if (landerPage) landerPage.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        if (mainFooter) mainFooter.classList.remove('hidden');

        this.ui.showSelector();
        this.ui.clearAll();
        if (this.ui.elements.headerNav) {
            this.ui.elements.headerNav.value = 'none';
        }
    }

    setupBasicCalculator() {
        this.ui.showBasicCalculator();
        this.basicCalc = new BasicCalculator(this.ui.elements.calcDisplay);

        const calcButtons = document.querySelectorAll('.calc-btn');
        calcButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const value = btn.dataset.value;

                switch (action) {
                    case 'number':
                        this.basicCalc.appendNumber(value);
                        break;
                    case 'operator':
                        this.basicCalc.setOperation(value);
                        break;
                    case 'equals':
                        this.basicCalc.calculate();
                        break;
                    case 'clear':
                        this.basicCalc.clear();
                        break;
                    case 'delete':
                        this.basicCalc.delete();
                        break;
                    case 'sqrt':
                        this.basicCalc.sqrt();
                        break;
                    case 'sqr':
                        this.basicCalc.sqr();
                        break;
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (this.currentMode !== 'basic') return;
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                this.basicCalc.appendNumber(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                this.basicCalc.setOperation(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.basicCalc.calculate();
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                this.basicCalc.clear();
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                this.basicCalc.delete();
            }
        });
    }

    setupLengthCalculator() {
        this.ui.showUnitSection(lengthUnits);
        this.ui.createConversionInput();
        this.ui.updateUnitSuffix();
    }

    setupAreaCalculator() {
        const dynamicUnits = getDynamicAreaUnits(5.5);
        this.ui.showUnitSection(dynamicUnits);
        this.ui.populateLaggiDropdown();
        this.ui.showLaggiSection();
        this.ui.createConversionInput();
        this.ui.updateUnitSuffix();
    }

    setupShapeCalculator(shapeType) {
        this.ui.createShapeInputs(shapeType);
        this.ui.showCalculateButton();
        this.attachShapeUnitListener();
    }

    setupTriangleCalculator(shapeType) {
        this.ui.createShapeInputs(shapeType);
        this.ui.showCalculateButton();
        this.attachShapeUnitListener();

        const baseBtn = document.getElementById('triangleModeBase');
        const heronBtn = document.getElementById('triangleModeHeron');

        if (baseBtn) {
            baseBtn.addEventListener('click', () => {
                this.switchToCalculator('triangle');
            });
        }
        if (heronBtn) {
            heronBtn.addEventListener('click', () => {
                this.switchToCalculator('heron');
            });
        }
    }

    setupLaggiCalculator() {
        this.ui.createLaggiInputs();
        this.ui.showCalculateButton();
    }

    attachShapeUnitListener() {
        const unitSelect = document.getElementById('shapeGlobalUnit');
        const inputs = document.querySelectorAll('.shape-input');

        if (unitSelect) {
            this.ui.updateShapeUnitDisplay(unitSelect.value);
            unitSelect.addEventListener('change', (e) => {
                this.ui.updateShapeUnitDisplay(e.target.value);
                this.updateLiveShapeCalculation();
            });
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => this.updateLiveShapeCalculation());
        });
    }

    updateLiveShapeCalculation() {
        const globalUnit = document.getElementById('shapeGlobalUnit')?.value || 'फीट';
        const inputs = document.querySelectorAll('.shape-input');
        const values = {};
        let allFilled = true;

        inputs.forEach(input => {
            const val = parseFloat(input.value);
            if (isNaN(val) || val <= 0) {
                allFilled = false;
            }
            const key = input.dataset.key;
            values[key] = (val * lengthUnits[globalUnit]) / 12;
        });

        if (!allFilled) {
            this.ui.updateLiveShapeArea(0);
            return;
        }

        try {
            const areaInSqFt = Calculator.calculateShape(this.currentMode, values);
            const unitFactor = lengthUnits[globalUnit] / 12;
            const areaInSelectedUnit = areaInSqFt / (unitFactor * unitFactor);
            this.ui.updateLiveShapeArea(areaInSelectedUnit, globalUnit);
        } catch (e) {
            this.ui.updateLiveShapeArea(0);
        }
    }

    setupLandConverter() {
        this.ui.showUnitSection(landMicroUnits);
        this.ui.createConversionInput();
        this.ui.updateUnitSuffix();
    }

    setupSpecialArea() {
        this.specialGroup = 'extended';
        this.ui.hideUnitSection();
        this.ui.hideLaggiSection();
        this.ui.createSpecialGroupSelector();
        this.ui.createSpecialFields('extended');
        this.ui.showCalculateButton();

        const groupSelect = document.getElementById('specialGroupSelect');
        if (groupSelect) {
            groupSelect.addEventListener('change', (e) => {
                this.specialGroup = e.target.value;
                this.ui.createSpecialFields(this.specialGroup);
            });
        }
    }

    setupLandEstimator() {
        this.estimatorRows = 0;
        this.estimatorGroup = 'extended';
        this.ui.hideUnitSection();
        this.ui.hideLaggiSection();
        this.ui.createEstimatorUI();
        this.ui.updateEstimatorHeader(this.estimatorGroup);
        this.ui.showCalculateButton();

        const groupSelect = document.getElementById('estimatorGroupSelect');
        const addBtn = document.getElementById('addRowBtn');

        const addNewRow = () => {
            this.ui.addEstimatorRow(this.estimatorRows, this.estimatorGroup);
            this.estimatorRows++;
            this.updateLiveTotal();

            const lastRow = document.querySelector(`.estimator-row[data-index="${this.estimatorRows - 1}"]`);
            lastRow.querySelectorAll('.row-input').forEach(input => {
                input.addEventListener('input', () => this.updateLiveTotal());
            });

            // Add listener to remove buttons to update live total after deletion
            const removeBtn = lastRow.querySelector('.remove-row-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    setTimeout(() => this.updateLiveTotal(), 50);
                });
            }
        };

        addNewRow();

        if (groupSelect) {
            groupSelect.addEventListener('change', (e) => {
                this.estimatorGroup = e.target.value;
                this.estimatorRows = 0;
                this.ui.updateEstimatorHeader(this.estimatorGroup);
                document.getElementById('estimatorRowsContainer').innerHTML = '';
                this.updateLiveTotal();
                addNewRow();
            });
        }

        const laggiSelect = document.getElementById('estimatorLaggi');
        if (laggiSelect) {
            laggiSelect.addEventListener('change', () => this.updateLiveTotal());
        }

        if (addBtn) {
            addBtn.addEventListener('click', addNewRow);
        }
    }

    setupLaggiFinder() {
        const units = getDynamicAreaUnits(5.5); // Just for units list
        this.ui.showUnitSection(units);
        this.ui.createConversionInput();
        this.ui.updateUnitSuffix();
        this.ui.showCalculateButton();
    }

    updateLiveTotal() {
        const rows = document.querySelectorAll('.estimator-row');
        const laggiHands = parseFloat(document.getElementById('estimatorLaggi')?.value) || 5.5;
        const dynamicUnits = getDynamicAreaUnits(laggiHands);

        let totalSqFt = 0;
        let hasValue = false;

        rows.forEach(row => {
            const rowInputs = row.querySelectorAll('.row-input');
            const values = {};
            rowInputs.forEach(input => {
                const val = parseFloat(input.value) || 0;
                values[input.dataset.key] = val;
                if (val > 0) hasValue = true;
            });

            if (this.estimatorGroup === 'extended' || this.estimatorGroup === 'kanma') {
                const dhur = values.bigha * 400 + values.katha * 20 + values.dhur + (values.dhurki || 0) / 20 + (values.furki || 0) / 400 + (values.churki || 0) / 8000 + (values.kanma || 0) / 16;
                totalSqFt += dhur * dynamicUnits["धुर"];
            } else if (this.estimatorGroup === 'modern') {
                totalSqFt += (values.hectare * 107639) + (values.acre * 43560) + (values.decimal * 435.6);
            }
        });

        const container = document.getElementById('liveTotalContainer');
        const display = document.getElementById('liveTotalDisplay');
        const subDisplay = document.getElementById('liveTotalSubDisplay');

        if (!hasValue || !container) {
            if (container) container.style.display = 'none';
            return;
        }

        container.style.display = 'block';

        const totalDhur = totalSqFt / dynamicUnits["धुर"];
        const lb = Calculator.getLaggiBreakdown(totalDhur);
        const sb = Calculator.getStandardBreakdown(totalSqFt);

        if (this.estimatorGroup === 'extended' || this.estimatorGroup === 'kanma') {
            display.textContent = `${lb.bigha} बीघा ${lb.katha} कट्ठा ${lb.dhur} धुर`;
            subDisplay.textContent = `${sb.hectare} हे० ${sb.acre} एकड़ ${sb.decimal} डिसमिल`;
        } else {
            display.textContent = `${sb.hectare} हेक्टर ${sb.acre} एकड़ ${sb.decimal} डिसमिल`;
            subDisplay.textContent = `${lb.bigha} बीघा ${lb.katha} कट्ठा ${lb.dhur} धुर`;
        }
    }

    handleLengthConversion() {
        const input = document.getElementById('conversionInput');
        const selectedUnit = this.ui.elements.unitType.value;
        const value = Calculator.validateInput(input.value);

        if (!value || !selectedUnit) {
            this.ui.elements.resultArea.innerHTML = '';
            return;
        }

        const baseValue = Calculator.convertLength(value, selectedUnit);
        this.ui.displayConversionResults(value, selectedUnit, lengthUnits, baseValue, false, 5.5, this.settings.settings);
    }

    handleAreaConversion() {
        const input = document.getElementById('conversionInput');
        const selectedUnit = this.ui.elements.unitType.value;
        const laggiHands = parseFloat(document.getElementById('areaLaggiHands').value) || 5.5;
        const value = Calculator.validateInput(input.value);

        if (!value || !selectedUnit) {
            this.ui.elements.resultArea.innerHTML = '';
            return;
        }

        const baseValue = Calculator.convertArea(value, selectedUnit, laggiHands);
        const dynamicUnits = getDynamicAreaUnits(laggiHands);
        this.ui.displayConversionResults(value, selectedUnit, dynamicUnits, baseValue, true, laggiHands, this.settings.settings);
    }

    handleLandMicroConversion() {
        const input = document.getElementById('conversionInput');
        const selectedUnit = this.ui.elements.unitType.value;
        const value = Calculator.validateInput(input.value);

        if (!value || !selectedUnit) {
            this.ui.elements.resultArea.innerHTML = '';
            return;
        }

        const baseDhur = value * landMicroUnits[selectedUnit];
        this.ui.displayLandMicroResults(value, selectedUnit, baseDhur, this.settings.settings);
    }

    handleCalculate() {
        if (this.currentMode === 'laggi') {
            this.handleLaggiCalculation();
            return;
        }
        if (this.currentMode === 'specialArea') {
            this.handleSpecialAreaCalculation();
            return;
        }
        if (this.currentMode === 'landEstimator') {
            this.handleLandEstimatorCalculation();
            return;
        }
        if (this.currentMode === 'laggiFinder') {
            this.handleLaggiFinderCalculation();
            return;
        }

        const globalUnit = document.getElementById('shapeGlobalUnit')?.value || 'फीट';
        const inputs = document.querySelectorAll('.shape-input');
        const values = {};
        inputs.forEach(input => {
            const val = parseFloat(input.value) || 0;
            const key = input.dataset.key;
            values[key] = (val * lengthUnits[globalUnit]) / 12;
        });

        try {
            const area = Calculator.calculateShape(this.currentMode, values);
            const laggiHands = this.ui.getLaggiValueForShape();
            this.ui.displayShapeResult(this.currentMode, area, this.settings.settings, laggiHands);
        } catch (error) {
            this.ui.displayError(error.message);
        }
    }

    handleSpecialAreaCalculation() {
        const inputs = document.querySelectorAll('.special-field-input');
        const values = {};
        inputs.forEach(input => {
            values[input.dataset.key] = parseFloat(input.value) || 0;
        });

        const laggiHands = parseFloat(document.getElementById('areaLaggiHandsSpecial').value) || 5.5;
        const dynamicUnits = getDynamicAreaUnits(laggiHands);

        let baseSqFt = 0;
        if (this.specialGroup === 'extended') {
            const totalDhur = values.bigha * 400 + values.katha * 20 + values.dhur + (values.dhurki || 0) / 20 + (values.furki || 0) / 400 + (values.churki || 0) / 8000;
            baseSqFt = totalDhur * dynamicUnits["धुर"];
        } else if (this.specialGroup === 'kanma') {
            const totalDhur = values.bigha * 400 + values.katha * 20 + values.dhur + (values.kanma || 0) / 16;
            baseSqFt = totalDhur * dynamicUnits["धुर"];
        } else if (this.specialGroup === 'modern') {
            baseSqFt = values.hectare * 107639 + values.acre * 43560 + values.decimal * 435.6;
        }

        const targetUnit = document.getElementById('specialTargetSelect')?.value || 'all';
        this.ui.displayConversionResults(0, 'Composite', dynamicUnits, baseSqFt, true, laggiHands, this.settings.settings, targetUnit);
    }

    handleLandEstimatorCalculation() {
        const rows = document.querySelectorAll('.estimator-row');
        const laggiHands = parseFloat(document.getElementById('estimatorLaggi').value) || 5.5;
        const dynamicUnits = getDynamicAreaUnits(laggiHands);

        let totalSqFt = 0;
        rows.forEach(row => {
            const rowInputs = row.querySelectorAll('.row-input');
            const values = {};
            rowInputs.forEach(input => {
                values[input.dataset.key] = parseFloat(input.value) || 0;
            });

            if (this.estimatorGroup === 'extended') {
                const dhur = values.bigha * 400 + values.katha * 20 + values.dhur + values.dhurki / 20 + values.furki / 400 + values.churki / 8000;
                totalSqFt += dhur * dynamicUnits["धुर"];
            } else if (this.estimatorGroup === 'kanma') {
                const dhur = values.bigha * 400 + values.katha * 20 + values.dhur + values.kanma / 16;
                totalSqFt += dhur * dynamicUnits["धुर"];
            } else if (this.estimatorGroup === 'modern') {
                totalSqFt += (values.hectare * 107639) + (values.acre * 43560) + (values.decimal * 435.6);
            }
        });

        const t = translations[document.documentElement.lang || 'hi'];
        this.ui.displayConversionResults(0, t.totalEstimate || 'Total', dynamicUnits, totalSqFt, true, laggiHands, this.settings.settings);
    }

    handleLaggiCalculation() {
        const laggiHands = parseFloat(document.getElementById('laggiHands').value);
        const landLength = parseFloat(document.getElementById('landLength').value);
        const landWidth = parseFloat(document.getElementById('landWidth').value);

        if (isNaN(laggiHands) || isNaN(landLength) || isNaN(landWidth) || laggiHands < 4 || laggiHands > 12) {
            this.ui.displayError('कृपया सही मान दर्ज करें (लग्गी 4-12 हाथ के बीच हो)');
            return;
        }

        const laggiInch = laggiHands * 18;
        const lengthInch = landLength * laggiInch;
        const widthInch = landWidth * laggiInch;
        const totalSqInch = lengthInch * widthInch;
        const totalSqFeet = totalSqInch / 144;
        const totalDhur = landLength * landWidth;

        const results = {
            length: {
                hand: (lengthInch / 18),
                feet: (lengthInch / 12)
            },
            width: {
                hand: (widthInch / 18),
                feet: (widthInch / 12)
            },
            area: {
                dhur: totalDhur,
                katha: (totalDhur / 20),
                bigha: (totalDhur / 400),
                decimal: (totalSqFeet / 435.6),
                sqFeet: totalSqFeet,
                sqMeter: (totalSqFeet / 10.7639)
            }
        };

        this.ui.displayLaggiResult(results, this.settings.settings);
    }

    handleLaggiFinderCalculation() {
        const input = document.getElementById('conversionInput');
        const selectedUnit = this.ui.elements.unitType.value;
        const value = parseFloat(input.value);

        if (isNaN(value) || value <= 0) {
            this.ui.displayError('कृपया क्षेत्रफल का सही मान दर्ज करें।');
            return;
        }

        // 1. Convert input area to Square Inches
        const dynamicUnits = getDynamicAreaUnits(5.5); // Using 5.5 as base just to get standard unit scaling (like SqFt, etc)
        const areaInSqFt = value * dynamicUnits[selectedUnit];
        const areaInSqInch = areaInSqFt * 144;

        // 2. Logic: Laggi_Length_in_inches = √(Area)
        const laggiInch = Math.sqrt(areaInSqInch);
        const laggiHath = laggiInch / 18;

        // Validation Rule:
        const isValid = laggiHath >= 4 && laggiHath <= 12 && (Math.abs((laggiHath % 0.5) - 0) < 0.001 || Math.abs((laggiHath % 0.5) - 0.5) < 0.001);

        // Suggest nearest valid
        let nearestValid = Math.round(laggiHath * 2) / 2;
        if (nearestValid < 4) nearestValid = 4;
        if (nearestValid > 12) nearestValid = 12;

        this.ui.displayLaggiFinderResult(value, selectedUnit, laggiHath, isValid, nearestValid);
    }
}
