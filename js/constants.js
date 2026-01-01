// js/constants.js - इकाइयों और अनुवादों का डेटा

const lengthUnits = {
    "कड़ी": 7.92,
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
    "धुरकी": 1 / 20,
    "फुरकी": 1 / 400,
    "चुरकी": 1 / 8000,
    "कनबा": 1 / 16
};

const unitDisplayNames = {
    // Length
    "कड़ी": "कड़ी (Chain)",
    "हाथ": "हाथ (Hand)",
    "बित्ता": "बित्ता (Span)",
    "फीट": "फीट (Feet)",
    "मीटर": "मीटर (Meter)",
    "डेग": "डेग (Step)",
    "गज": "गज (Yard)",
    "सेंटीमीटर": "सेंटीमीटर (CM)",
    "इंच": "इंच (Inch)",
    // Area / Land
    "बीघा": "बीघा (Bigha)",
    "कट्ठा": "कट्ठा (Kattha)",
    "धुर": "धुर (Dhur)",
    "धुरकी": "धुरकी (Dhurki)",
    "फुरकी": "फुरकी (Furki)",
    "चुरकी": "चुरकी (Churki)",
    "कनबा": "कनबा (Kanma)",
    "डिसमिल": "डिसमिल (Decimal)",
    "एकड़": "एकड़ (Acre)",
    "हेक्टर": "हेक्टर (Hectare)",
    "वर्ग फीट": "वर्ग फीट (Sq Ft)",
    "वर्ग मीटर": "वर्ग मीटर (Sq Meter)",
    "वर्ग गज": "वर्ग गज (Sq Yard)",
    "वर्ग इंच": "वर्ग इंच (Sq Inch)",
    "वर्ग कड़ी": "वर्ग कड़ी (Sq Chain)",
    "वर्ग हाथ": "वर्ग हाथ (Sq Hand)"
};

const calculatorTitles = {
    basic: "Basic Calculator / बेसिक कैलकुलेटर",
    length: "Length Calculator / लंबाई कैलकुलेटर",
    area: "Area Calculator / क्षेत्रफल कैलकुलेटर",
    triangle: "Triangle Area / त्रिभुज का क्षेत्रफल",
    heron: "Heron's Formula / हीरोन का सूत्र",
    square: "Square Area / वर्ग का क्षेत्रफल",
    rectangle: "Rectangle Area / आयत का क्षेत्रफल",
    laggi: "Laggi Land Measurement / लग्गी मापन",
    landConverter: "Land Unit Converter",
    specialArea: "Special Area Converter",
    landEstimator: "Land Area Estimator",
    laggiFinder: "Laggi Discovery (लग्गी पहचान)"
};

const calculatorCards = [
    { id: 'basic', icon: '🔢', color: 'gradient-blue', tag: '🔢', title: 'Basic Calculator', desc: 'बेसिक अंकगणितीय', features: ['➕ जोड़', '➖ घटाव', '✖️ गुणा', '➗ भाग'] },
    { id: 'length', icon: '📏', color: 'gradient-purple', tag: '📏', title: 'Length Calculator', desc: 'लंबाई रूपांतरण', features: ['हाथ', 'फीट', 'मीटर', 'गज'] },
    { id: 'area', icon: '📐', color: 'gradient-pink', tag: '📐', title: 'Area Calculator', desc: 'क्षेत्रफल रूपांतरण', features: ['बीघा', 'एकड़', 'हेक्टर', 'वर्ग फीट'] },
    { id: 'triangle', icon: '🔺', color: 'gradient-orange', tag: '🔺', title: 'Triangle Area', desc: 'त्रिभुज का क्षेत्रफल', features: ['आधार × ऊंचाई ÷ 2', "Heron's Formula"] },
    { id: 'square', icon: '🟦', color: 'gradient-green', tag: '🟦', title: 'Square Area', desc: 'वर्ग का क्षेत्रफल', features: ['भुजा × भुजा'] },
    { id: 'rectangle', icon: '▭', color: 'gradient-cyan', tag: '▭', title: 'Rectangle Area', desc: 'आयत का क्षेत्रफल', features: ['लंबाई × चौड़ाई'] },
    { id: 'landConverter', icon: '🔄', color: 'gradient-purple', tag: '🔄', title: 'Land Unit Converter', desc: 'इकाई कनवर्टर', features: ['बीघा-कट्ठा-धुर', 'धुरकी-फुरकी-चुरकी'], style: 'background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);' },
    { id: 'specialArea', icon: '🗺️', color: 'gradient-ocean', tag: '🗺️', title: 'Special Area Converter', desc: 'विशेष क्षेत्रफल कनवर्टर', features: ['मिश्रित इनपुट', 'हेक्टर-एकड़-डिसमिल', 'बीघा-कट्ठा-कनबा'], style: 'background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);' },
    { id: 'landEstimator', icon: '🏗️', color: 'gradient-yellow', tag: '🏗️', title: 'Land Area Estimator', desc: 'रकबा का जोड (कुल रकबा)', features: ['मल्टी-रो (Multi-Row)', 'क्षेत्रफल का जोड़', 'बीघा-धुर-डिसमिल'], style: 'background: var(--gradient-yellow);' },
    { id: 'laggiFinder', icon: '🔍', color: 'gradient-primary', tag: '<span>🔍</span>', title: 'Laggi Discovery', desc: 'लग्गी पहचान (Find Laggi)', features: ['क्षेत्रफल से लग्गी', 'मान्य/अमान्य जाँच', 'सुझाव एवं नियम'], style: 'background: var(--gradient-primary); box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);' }
];

const precisionUnits = [
    'बीघा', 'कट्ठा', 'धुर', 'धुरकी', 'फुरकी', 'चुरकी', 'कनबा',
    'वर्ग फीट', 'वर्ग मीटर', 'एकड़', 'हेक्टर', 'डेसिमल', 'वर्ग गज'
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
        feature4: "🗺️ विशेष क्षेत्र कनवर्टर (Trad/Kanba/Modern)",
        feature5: "🏗️ भूमि अनुमानक (बहु-पंक्ति जोड़)",
        feature6: "🔍 लग्गी पहचान (Discovery Calculator)",
        unitLabel: "इकाई चुनें",
        inputLabel: "मात्रा दर्ज करें",
        laggiLabel: "लग्गी का माप (हाथ में)",
        precisionLabel: "दशमलव स्थान (Precision)",
        tradPrecisionLabel: "पारंपरिक (Bigha/etc)",
        stdPrecisionLabel: "मानक (SqFt/etc)",
        fontSizeLabel: "फ़ॉन्ट का आकार (Font Size)",
        textColorLabel: "फ़ॉन्ट का रंग (Text Color)",
        specialConverter: "विशेष क्षेत्र कनवर्टर",
        inputGroupLabel: "इनपुट समूह (Input Group)",
        compositeFormat: "1. मिश्रित प्रारूप (Composite)",
        kanbaFormat: "2. कनबा प्रारूप (Kanba)",
        standardFormat: "3. मानक प्रारूप (Standard)",
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
            basic: { title: "Basic Calculator / अंकगणितीय कैलकुलेटर", desc: "बेसिक गणना", features: ['➕ जोड़', '➖ घटाव', '✖️ गुणा', '➗ भाग'] },
            length: { title: "Length / लंबाई", desc: "रूपांतरण", features: ['हाथ (Hand)', 'फीट (Feet)', 'मीटर (Meter)', 'गज (Yard)'] },
            area: { title: "Area / क्षेत्रफल", desc: "क्षेत्रफल रूपांतरण", features: ['बीघा (Bigha)', 'एकड़ (Acre)', 'हेक्टर (Hectare)', 'कड़ी (Chain)'] },
            triangle: { title: "Triangle / त्रिभुज", desc: "क्षेत्रफल गणना", features: ['Standard', "Heron's Formula"] },
            square: { title: "Square / वर्ग", desc: "क्षेत्रफल गणना", features: ['Side × Side'] },
            rectangle: { title: "Rectangle / आयत", desc: "क्षेत्रफल गणना", features: ['Length × Width'] },
            landConverter: { title: "Land Units / भूमि इकाइयाँ", desc: "पारंपरिक इकाइयाँ", features: ['बीघा-कट्ठा-धुर', 'धुरकी-फुरकी'] },
            specialArea: { title: "Special Area / विशेष क्षेत्र", desc: "मिश्रित इनपुट", features: ['Trad/Modern Mix', 'Multi-Unit'] },
            landEstimator: { title: "Estimator / रकबा जोड़", desc: "कुल रकबा", features: ['Multi-Row Adding', 'Custom Laggi'] },
            laggiFinder: { title: "Laggi Finder / लग्गी पहचान", desc: "सही लग्गी खोजें", features: ['Area to Laggi', 'Validation'] }
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
        fontSizeLabel: "Font Size (फ़ॉन्ट आकार)",
        textColorLabel: "Font Color (फ़ॉन्ट रंग)",
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
        inputGroupLabel: "Select Input Group (इनपुट समूह)",
        compositeFormat: "1. Composite (बीघा-धुर-धुरकी)",
        kanbaFormat: "2. Kanba (बीघा-कट्ठा-कनबा)",
        standardFormat: "3. Modern (हेक्टर-एकड़-डिसमिल)",
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
            basic: { title: "अंकगणितीय कैलकुलेटर / Basic Calculator", desc: "Basic Math Tasks", features: ['➕ Add', '➖ Sub', '✖️ Multi', '➗ Div'] },
            length: { title: "लंबाई / Length", desc: "Unit Conversion", features: ['Hand', 'Feet', 'Meter', 'Yard'] },
            area: { title: "क्षेत्रफल / Area", desc: "Area Conversion", features: ['Bigha', 'Acre', 'Hectare', 'Sq Ft'] },
            triangle: { title: "त्रिभुज / Triangle", desc: "Area Calculation", features: ['Standard', "Heron's Formula"] },
            square: { title: "वर्ग / Square", desc: "Area Calculation", features: ['Side × Side'] },
            rectangle: { title: "आयत / Rectangle", desc: "Area Calculation", features: ['Length × Width'] },
            landConverter: { title: "भूमि इकाइयाँ / Land Units", desc: "Micro Units", features: ['Bigha-Katha-Dhur', 'Dhurki-Furki'] },
            specialArea: { title: "विशेष क्षेत्र / Special Area", desc: "Mixed Input Formats", features: ['Mixed Groups', 'All Units'] },
            landEstimator: { title: "रकबा जोड़ / Estimator", desc: "Add multiple plots", features: ['Multi-Row Addition', 'Total Area'] },
            laggiFinder: { title: "लग्गी पहचान / Laggi Finder", desc: "Find Your Laggi", features: ['Area to Laggi', 'Validation'] }
        }
    }
};

const themes = {
    default: {
        name: "Classic",
        primary: "#667eea",
        secondary: "#764ba2",
        bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        card: "rgba(255, 255, 255, 0.98)",
        text: "#1a202c"
    },
    clean: {
        name: "Professional",
        primary: "#3b82f6",
        secondary: "#1e40af",
        bg: "#f8fafc",
        card: "#ffffff",
        text: "#0f172a"
    },
    dark: {
        name: "Dark Modern",
        primary: "#6366f1",
        secondary: "#4338ca",
        bg: "#0f172a",
        card: "#1e293b",
        text: "#f8fafc"
    },
    sunset: {
        name: "Sunset",
        primary: "#f093fb",
        secondary: "#f5576c",
        bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        card: "rgba(255, 255, 255, 0.95)",
        text: "#1a202c"
    },
    ocean: {
        name: "Ocean",
        primary: "#4facfe",
        secondary: "#00f2fe",
        bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        card: "rgba(255, 255, 255, 0.95)",
        text: "#0f4c75"
    },
    forest: {
        name: "Forest",
        primary: "#10b981",
        secondary: "#059669",
        bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        card: "rgba(255, 255, 255, 0.95)",
        text: "#064e3b"
    }
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
