// js/utils.js - सहायक फ़ंक्शन

const getDynamicAreaUnits = (laggiHands) => {
    const laggiFt = laggiHands * 1.5;
    const dhurFt = laggiFt * laggiFt;
    const dhurkiFt = dhurFt / 20;
    const furkiFt = dhurkiFt / 20;
    const churkiFt = furkiFt / 20;

    return {
        "बीघा": dhurFt * 400,
        "कट्ठा": dhurFt * 20,
        "धुर": dhurFt,
        "धुरकी": dhurkiFt,
        "फुरकी": furkiFt,
        "चुरकी": churkiFt,
        "कनबा": dhurFt / 16,
        "डिसमिल": 435.6,
        "एकड़": 43560,
        "हेक्टर": 107639,
        "वर्ग इंच": 1 / 144,
        "वर्ग फीट": 1,
        "वर्ग कड़ी": (7.92 / 12) ** 2,
        "वर्ग बित्ता": (9 / 12) ** 2,
        "वर्ग मीटर": 10.7639,
        "वर्ग डेग": (33 / 12) ** 2,
        "वर्ग गज": 9,
        "वर्ग हाथ": 2.25
    };
};
