// Plot Partition Calculator - Comprehensive implementation

// Create Plot Partition UI
function createPlotPartitionUI() {
    return `
        <div class="calc-layout-advanced animate-fade-in">
            <!-- Plot Type Selector -->
            <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 20px; border-radius: var(--radius-lg); margin-bottom: 25px;">
                <h3 style="margin: 0 0 15px; font-size: 1.3rem;">
                    🏢 Plot Type / प्लॉट का प्रकार
                </h3>
                <select id="plotTypeSelect" class="select-input" style="background: white; color: #333; width: 100%; font-size: 1.1rem;">
                    <option value="residential">🏡 Residential Plot (आवासीय प्लॉट)</option>
                    <option value="other">🌾 Other Land Type (अन्य भूमि — कृषि/व्यावसायिक)</option>
                </select>
            </div>

            <!-- Residential Method Container -->
            <div id="residentialMethod" class="partition-method">
                <!-- Total Area Input -->
                <div style="background: #f8f9fa; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px; color: #495057;">📊 Total Land Details / कुल भूमि विवरण</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px;">
                        <div>
                            <label class="section-label">Total Area / कुल क्षेत्रफल</label>
                            <input type="number" id="totalArea" class="text-input" placeholder="0.00" step="0.01">
                        </div>
                        <div>
                            <label class="section-label">Unit / इकाई</label>
                            <select id="areaUnit" class="select-input">
                                <option value="dhur">धुर (Dhur)</option>
                                <option value="kattha">कट्ठा (Kattha)</option>
                                <option value="bigha">बीघा (Bigha)</option>
                                <option value="decimal">डिसमिल (Decimal)</option>
                                <option value="sqft">वर्ग फीट (Sq Ft)</option>
                                <option value="sqmeter">वर्ग मीटर (Sq M)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Plot Dimensions -->
                <div style="background: #fff3e0; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px; color: #f57c00;">📏 Plot Dimensions / प्लॉट के आयाम</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <label class="section-label">Plot Length / लंबाई (Ft)</label>
                            <input type="number" id="plotLength" class="text-input" placeholder="0.00" step="0.01">
                        </div>
                        <div>
                            <label class="section-label">Plot Width / चौड़ाई (Ft)</label>
                            <input type="number" id="plotWidth" class="text-input" placeholder="0.00" step="0.01">
                        </div>
                    </div>
                </div>

                <!-- Partition Settings -->
                <div style="background: #e3f2fd; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px; color: #1976d2;">⚙️ Partition Settings / विभाजन सेटिंग्स</h4>
                    
                    <div style="margin-bottom: 15px;">
                        <label class="section-label">Number of Heirs / हिस्सेदारों की संख्या</label>
                        <input type="number" id="heirsCount" class="text-input" value="2" min="2" max="10">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label class="section-label">Partition Direction / विभाजन की दिशा</label>
                        <select id="partitionDirection" class="select-input">
                            <option value="width">From Width Side / चौड़ाई की तरफ से (Frontage Based)</option>
                            <option value="length">From Length Side / लंबाई की तरफ से</option>
                        </select>
                    </div>

                    <div>
                        <label class="section-label">Distribution Mode / वितरण का तरीका</label>
                        <select id="distributionMode" class="select-input">
                            <option value="equalFrontage" selected>Equal Frontage / बराबर फ्रंट</option>
                            <option value="equalArea">Equal Area / बराबर क्षेत्रफल</option>
                            <option value="proportionate">Proportionate Frontage + Area / आनुपातिक</option>
                            <option value="fixedFrontage">Fixed Frontage to One / एक को निश्चित फ्रंट</option>
                            <option value="custom">Custom Length/Depth / कस्टम माप</option>
                        </select>
                    </div>
                </div>

                <!-- Custom Shares (for fixedFrontage and custom modes) -->
                <div id="customSharesContainer" style="display: none; background: #fff; padding: 20px; border: 2px dashed #667eea; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px; color: #667eea;">👥 Custom Allocation / कस्टम आवंटन</h4>
                    <div id="heirInputs"></div>
                </div>
            </div>

            <!-- General/Other Method Container -->
            <div id="otherMethod" class="partition-method" style="display: none;">
                <!-- Total Area Input -->
                <div style="background: #f8f9fa; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px; color: #495057;">📊 Total Land Details / कुल भूमि विवरण</h4>
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px;">
                        <div>
                            <label class="section-label">Total Area / कुल क्षेत्रफल</label>
                            <input type="number" id="totalAreaOther" class="text-input" placeholder="0.00" step="0.01">
                        </div>
                        <div>
                            <label class="section-label">Unit / इकाई</label>
                            <select id="areaUnitOther" class="select-input">
                                <option value="dhur">धुर (Dhur)</option>
                                <option value="kattha">कट्ठा (Kattha)</option>
                                <option value="bigha">बीघा (Bigha)</option>
                                <option value="decimal">डिसमिल (Decimal)</option>
                                <option value="sqft">वर्ग फीट (Sq Ft)</option>
                                <option value="sqmeter">वर्ग मीटर (Sq M)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- General Partition Settings -->
                <div style="background: #e8f5e9; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <h4 style="margin: 0 0 15px; color: #2e7d32;">⚙️ Distribution Settings / वितरण सेटिंग्स</h4>
                    
                    <div style="margin-bottom: 15px;">
                        <label class="section-label">Number of Heirs / हिस्सेदारों की संख्या</label>
                        <input type="number" id="heirsCountOther" class="text-input" value="2" min="2" max="20">
                    </div>

                    <div>
                        <label class="section-label">Share Basis / हिस्से का आधार</label>
                        <select id="shareBasis" class="select-input">
                            <option value="equal">Equal Share / बराबर हिस्सा</option>
                            <option value="percentage">Percentage (%) / प्रतिशत</option>
                            <option value="ratio">Ratio Share / अनुपात</option>
                            <option value="customArea">Custom Area Entry / कस्टम क्षेत्रफल</option>
                        </select>
                    </div>
                </div>

                <!-- Custom Shares for Other Method -->
                <div id="customSharesOtherContainer" style="display: none; background: #fff; padding: 20px; border: 2px dashed #2e7d32; border-radius: var(--radius-md); margin-bottom: 20px;">
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
}
