// js/constants.js - इकाइयों और अनुवादों का डेटा

const lengthUnits = {
    "कड़ी": 7.92,
    "हाथ": 18,
    "बित्ता": 9,
    "फीट": 12,
    "मीटर": 39.37,
    "डेग": 33,
    "गज": 36,
    "सेंटीमीटर": 0.3937,
    "इंच": 1
};

const landMicroUnits = {
    "बीघा": 400,
    "कट्ठा": 20,
    "धुर": 1,
    "धुर्की": 1 / 20,
    "फुर्की": 1 / 400,
    "चुरकी": 1 / 8000,
    "कनमा": 1 / 16
};

const calculatorTitles = {
    basic: "🔢 Basic Calculator",
    length: "📏 Length Calculator",
    area: "📐 Area Calculator",
    triangle: "🔺 Triangle Area Calculator",
    square: "🟦 Square Area Calculator",
    rectangle: "▭ Rectangle Area Calculator",
    laggi: "📐 Laggi Land Measurement",
    landConverter: "🔄 Land Unit Converter",
    specialArea: "🗺️ Special Area Converter",
    landEstimator: "🏗️ Land Area Estimator",
    laggiFinder: "🔍 Laggi Discovery (लग्गी पहचान)",
    heron: "📐 Heron's Formula Calculator"
};

const calculatorCards = [
    { id: 'basic', icon: '🔢', color: 'gradient-blue', tag: '🔢', title: 'Basic Calculator', desc: 'बेसिक अंकगणितीय', features: ['➕ जोड़', '➖ घटाव', '✖️ गुणा', '➗ भाग'] },
    { id: 'length', icon: '📏', color: 'gradient-purple', tag: '📏', title: 'Length Calculator', desc: 'लंबाई रूपांतरण', features: ['हाथ', 'फीट', 'मीटर', 'गज'] },
    { id: 'area', icon: '📐', color: 'gradient-pink', tag: '📐', title: 'Area Calculator', desc: 'क्षेत्रफल रूपांतरण', features: ['बीघा', 'एकड़', 'हेक्टेयर', 'वर्ग फीट'] },
    { id: 'triangle', icon: '🔺', color: 'gradient-orange', tag: '🔺', title: 'Triangle Area', desc: 'त्रिभुज का क्षेत्रफल', features: ['आधार × ऊंचाई ÷ 2'] },
    { id: 'heron', icon: '📐', color: 'gradient-pink', tag: '📐', title: "Heron's Formula", desc: 'विषमबाहु त्रिभुज', features: ['तीन भुजाएं (a, b, c)'] },
    { id: 'square', icon: '🟦', color: 'gradient-green', tag: '🟦', title: 'Square Area', desc: 'वर्ग का क्षेत्रफल', features: ['भुजा × भुजा'] },
    { id: 'rectangle', icon: '▭', color: 'gradient-cyan', tag: '▭', title: 'Rectangle Area', desc: 'आयत का क्षेत्रफल', features: ['लंबाई × चौड़ाई'] },
    { id: 'landConverter', icon: '🔄', color: 'gradient-purple', tag: '🔄', title: 'Land Unit Converter', desc: 'इकाई कनवर्टर', features: ['बीघा-कट्ठा-धुर', 'धुर्की-फुर्की-चुरकी'], style: 'background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);' },
    { id: 'specialArea', icon: '🗺️', color: 'gradient-ocean', tag: '🗺️', title: 'Special Area Converter', desc: 'विशेष क्षेत्रफल कनवर्टर', features: ['मिश्रित इनपुट', 'हेक्टेयर-एकड़-डिसमिल', 'बीघा-कट्ठा-कनमा'], style: 'background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);' },
    { id: 'landEstimator', icon: '🏗️', color: 'gradient-yellow', tag: '🏗️', title: 'Land Area Estimator', desc: 'रकबा का जोड (कुल रकबा)', features: ['मल्टी-रो (Multi-Row)', 'क्षेत्रफल का जोड़', 'बीघा-धुर-डिसमिल'], style: 'background: var(--gradient-yellow);' },
    { id: 'laggiFinder', icon: '🔍', color: 'gradient-primary', tag: '<span>🔍</span>', title: 'Laggi Discovery', desc: 'लग्गी पहचान (Find Laggi)', features: ['क्षेत्रफल से लग्गी', 'मान्य/अमान्य जाँच', 'सुझाव एवं नियम'], style: 'background: var(--gradient-primary); box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);' }
];

const precisionUnits = [
    'बीघा', 'कट्ठा', 'धुर', 'धुर्की', 'फुर्की', 'चुरकी', 'कनमा',
    'वर्ग फीट', 'वर्ग मीटर', 'एकड़', 'हेक्टेयर', 'डेसिमल', 'वर्ग गज'
];

const translations = {
    hi: {
        mainTitle: "अमीन साहेब",
        mainTagline: "सटीक गणना, आसान तरीका",
        selectorTitle: "अपना कैलकुलेटर चुनें",
        settingsTitle: "सेटिंग्स (Settings)",
        langLabel: "भाषा (Language)",
        themeLabel: "थीम (Theme)",
        fontLabel: "फ़ॉन्ट स्टाइल (Font Style)",
        colorLabel: "मुख्य रंग (Accent Color)",
        resetBtn: "डिफ़ॉल्ट पर सेट करें",
        backBtn: "वापस जाएं",
        calculateBtn: "गण्ना करें",
        featuresTitle: "✨ विशेषताएं",
        feature1: "🔢 बेसिक अंकगणितीय कैलकुलेटर",
        feature2: "📐 लग्गी आधारित पारंपरिक मापन",
        feature3: "🔄 पारंपरिक और आधुनिक इकाइयों में रूपांतरण",
        feature4: "🗺️ विशेष क्षेत्र कनवर्टर (Trad/Kanma/Modern)",
        feature5: "🏗️ भूमि अनुमानक (बहु-पंक्ति जोड़)",
        feature6: "🔍 लग्गी पहचान (Discovery Calculator)",
        unitLabel: "इकाई चुनें",
        inputLabel: "मात्रा दर्ज करें",
        laggiLabel: "लग्गी का माप (हाथ में)",
        precisionLabel: "दशमलव स्थान (Precision)",
        tradPrecisionLabel: "पारंपरिक (Bigha/etc)",
        stdPrecisionLabel: "मानक (SqFt/etc)",
        specialConverter: "विशेष क्षेत्र कनवर्टर",
        inputGroupLabel: "इनपुट समूह चुनें",
        compositeFormat: "मिश्रित प्रारूप (Bigha-Kattha-Dhur)",
        kanmaFormat: "कनमा प्रारूप (Bigha-Kattha-Dhur-Kanma)",
        standardFormat: "मानक प्रारूप (Hectare-Acre-Decimal)",
        landEstimator: "भूमि अनुमानक (Estimator)",
        addRowBtn: "+ पंक्ति जोड़ें",
        totalEstimate: "कुल अनुमानित क्षेत्रफल",
        laggiFinder: "लग्गी पहचान कैलकुलेटर",
        laggiFinderDesc: "क्षेत्रफल के आधार पर सही लग्गी का पता लगाएं",
        validLaggi: "मान्य लग्गी",
        invalidLaggi: "अमान्य लग्गी",
        suggestedLaggi: "सुझाई गई मान्य लग्गी",
        footerText: "© 2026 अमीन साहेब | Made with ❤️ in India",
        cardData: {
            basic: { title: "Basic Calculator", desc: "बेसिक अंकगणितीय", features: ['➕ जोड़', '➖ घटाव', '✖️ गुणा', '➗ भाग'] },
            length: { title: "Length Calculator", desc: "लंबाई रूपांतरण", features: ['हाथ', 'फीट', 'मीटर', 'गज'] },
            area: { title: "Area Calculator", desc: "क्षेत्रफल रूपांतरण", features: ['बीघा', 'एकड़', 'हेक्टेयर', 'वर्ग फीट'] },
            triangle: { title: "Triangle Area", desc: "त्रिभुज का क्षेत्रफल", features: ['आधार × ऊंचाई ÷ 2'] },
            square: { title: "Square Area", desc: "वर्ग का क्षेत्रफल", features: ['भुजा × भुजा'] },
            rectangle: { title: "Rectangle Area", desc: "आयत का क्षेत्रफल", features: ['लंबाई × चौड़ाई'] },
            landConverter: { title: "Land Unit Converter", desc: "इकाई कनवर्टर", features: ['बीघा-कट्ठा-धुर', 'धुर्की-फुर्की-चुरकी'] },
            specialArea: { title: "Special Area Converter", desc: "विशेष क्षेत्रफल कनवर्टर", features: ['मिश्रित इनपुट', 'हेक्टेयर-एकड़-डिसमिल'] },
            landEstimator: { title: "Land Area Estimator", desc: "रकबा का जोड (कुल रकबा)", features: ['मल्टी-रो (Multi-Row)', 'क्षेत्रफल का जोड़'] },
            laggiFinder: { title: "Laggi Discovery", desc: "लग्गी पहचान (Find Laggi)", features: ['क्षेत्रफल से लग्गी', 'मान्य/अमान्य जाँच'] },
            heron: { title: "Heron's Formula", desc: "विषमबाहु त्रिभुज", features: ["भुजा ए, बी, सी", "Heron's Formula"] }
        }
    },
    en: {
        mainTitle: "Amin Saheb",
        mainTagline: "Accurate Calculation, Easy Way",
        selectorTitle: "Choose Your Calculator",
        settingsTitle: "Settings",
        langLabel: "Language",
        themeLabel: "Theme",
        fontLabel: "Font Style",
        colorLabel: "Accent Color",
        resetBtn: "Reset to Default",
        backBtn: "Back",
        calculateBtn: "Calculate",
        featuresTitle: "✨ Features",
        feature1: "🔢 Basic Arithmetic Calculator",
        feature2: "📐 Laggi Based Traditional Measurement",
        feature3: "🔄 Convert between Traditional & Modern Units",
        feature4: "🗺️ Special Area Converter",
        feature5: "🏗️ Land Area Estimator",
        feature6: "🔍 Laggi Discovery Utility",
        unitLabel: "Select Unit",
        inputLabel: "Enter Value",
        laggiLabel: "Laggi Size (in Hands)",
        precisionLabel: "Decimal Precision",
        tradPrecisionLabel: "Traditional (Bigha/etc)",
        stdPrecisionLabel: "Standard (SqFt/etc)",
        specialConverter: "Special Area Converter",
        inputGroupLabel: "Select Input Group",
        compositeFormat: "Composite (Bigha-Kattha-Dhur-etc)",
        kanmaFormat: "Kanma (Bigha-Kattha-Dhur-Kanma)",
        standardFormat: "Standard (Hectare-Acre-Decimal)",
        landEstimator: "Land Area Estimator",
        addRowBtn: "+ Add Row",
        totalEstimate: "Total Estimated Area",
        laggiFinder: "Laggi Discovery Calculator",
        laggiFinderDesc: "Find correct Laggi based on area",
        validLaggi: "Valid Laggi",
        invalidLaggi: "Invalid Laggi",
        suggestedLaggi: "Suggested Valid Laggi",
        footerText: "© 2026 Amin Saheb | Made with ❤️ in India",
        cardData: {
            basic: { title: "Basic Calculator", desc: "Basic Arithmetic", features: ['➕ Add', '➖ Sub', '✖️ Multi', '➗ Div'] },
            length: { title: "Length Calculator", desc: "Unit Conversion", features: ['Hand', 'Feet', 'Meter', 'Yard'] },
            area: { title: "Area Calculator", desc: "Area Conversion", features: ['Bigha', 'Acre', 'Hectare', 'Sq Ft'] },
            triangle: { title: "Triangle Area", desc: "Triangle Calculation", features: ['Base × Height ÷ 2'] },
            square: { title: "Square Area", desc: "Square Calculation", features: ['Side × Side'] },
            rectangle: { title: "Rectangle Area", desc: "Rectangle Calculation", features: ['Length × Width'] },
            landConverter: { title: "Land Unit Converter", desc: "Micro Units", features: ['Bigha-Katha-Dhur', 'Micro-Churki'] },
            specialArea: { title: "Special Area Converter", desc: "Multi-Format Area", features: ['Mixed Input', 'Hectare-Acre-Decimal'] },
            landEstimator: { title: "Land Area Estimator", desc: "Aggregate Area", features: ['Multi-Row Adding', 'Total Estimate'] },
            laggiFinder: { title: "Laggi Discovery", desc: "Find Your Laggi", features: ['Area to Laggi', 'Validation Utility'] },
            heron: { title: "Heron's Formula", desc: "Scalene Triangle", features: ["Sides a, b, c", "Heron's Formula"] }
        }
    }
};

const themes = {
    default: { primary: "#667eea", secondary: "#764ba2" },
    sunset: { primary: "#f093fb", secondary: "#f5576c" },
    ocean: { primary: "#4facfe", secondary: "#00f2fe" },
    forest: { primary: "#52fa5a", secondary: "#4facfe" },
    royal: { primary: "#30cfd0", secondary: "#330867" }
};

const shapeFormulas = {
    triangle: {
        name: "त्रिभुज",
        icon: "🔺",
        title: "Triangle Area",
        inputs: [
            { name: "आधार (Base)", key: "base", unit: "फीट" },
            { name: "ऊंचाई (Height)", key: "height", unit: "फीट" }
        ],
        calculate: (values) => {
            const { base, height } = values;
            return (base * height) / 2;
        },
        formula: "क्षेत्रफल = (आधार × ऊंचाई) ÷ 2"
    },
    heron: {
        name: "Heron (त्रिभुज)",
        icon: "📐",
        title: "Heron's Formula",
        inputs: [
            { name: "Side a", key: "a", unit: "फीट" },
            { name: "Side b", key: "b", unit: "फीट" },
            { name: "Side c", key: "c", unit: "फीट" }
        ],
        calculate: (values) => {
            const { a, b, c } = values;
            if (a + b <= c || a + c <= b || b + c <= a) {
                throw new Error("ये भुजाएं एक मान्य त्रिभुज नहीं बनाती हैं!");
            }
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        },
        formula: "s = (a+b+c)/2; Area = √(s(s-a)(s-b)(s-c))"
    },
    square: {
        name: "वर्ग",
        icon: "🟦",
        title: "Square Area",
        inputs: [
            { name: "भुजा (Side)", key: "side", unit: "फीट" }
        ],
        calculate: (values) => {
            const { side } = values;
            return side * side;
        },
        formula: "क्षेत्रफल = भुजा × भुजा"
    },
    rectangle: {
        name: "आयत",
        icon: "▭",
        title: "Rectangle Area",
        inputs: [
            { name: "लंबाई (Length)", key: "length", unit: "फीट" },
            { name: "चौड़ाई (Width)", key: "width", unit: "फीट" }
        ],
        calculate: (values) => {
            const { length, width } = values;
            return length * width;
        },
        formula: "क्षेत्रफल = लंबाई × चौड़ाई"
    }
};
