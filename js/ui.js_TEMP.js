createLaggiDiscoveryRelationUI() {
    const t = translations[document.documentElement.lang || 'hi'];
    this.elements.inputContainer.innerHTML = `
            <div class="calculator-card animate-fade-in" style="margin-bottom: var(--space-6); background: var(--bg-white);">
                <div style="padding: var(--space-4); background: var(--bg-primary); border-radius: var(--radius-lg); margin-bottom: var(--space-6); border: 1px solid var(--primary-100);">
                    <h4 style="color: var(--primary-600); margin-bottom: var(--space-3); font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                        <span>🔗</span> ${t.relationLabel} (Equality Method)
                    </h4>
                    
                    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                        <!-- Unit A Side -->
                        <div style="background: var(--bg-white); padding: 15px; border-radius: var(--radius-md); border: 1px solid var(--primary-100);">
                            <label class="section-label" style="font-size: 0.8rem; color: var(--primary-600); font-weight: 800;">SIDE CUSTOM A</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="number" id="qtyA" class="text-input" placeholder="0.00" style="flex: 1;">
                                <select id="unitAName" class="nav-select" style="flex: 1.2; padding: 10px; border-radius: var(--radius-md);">
                                    <optgroup label="Square Units (वर्ग इकाइयाँ)">
                                        <option value="वर्ग कड़ी" selected>वर्ग कड़ी (Sq Chain)</option>
                                        <option value="वर्ग फीट">वर्ग फीट (Sq Ft)</option>
                                        <option value="वर्ग हाथ">वर्ग हाथ (Sq Hand)</option>
                                        <option value="वर्ग मीटर">वर्ग मीटर (Sq Meter)</option>
                                        <option value="वर्ग गज">वर्ग गज (Sq Yard)</option>
                                    </optgroup>
                                    <optgroup label="Modern Area (आधुनिक)">
                                        <option value="डिसमिल">डिसमिल (Decimal)</option>
                                        <option value="एकड़">एकड़ (Acre)</option>
                                        <option value="हेक्टर">हेक्टर (Hectare)</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>

                        <div style="text-align: center; color: var(--primary-500); font-weight: 900; font-size: 1.2rem;">=</div>

                        <!-- Unit B Side -->
                        <div style="background: var(--bg-white); padding: 15px; border-radius: var(--radius-md); border: 1px solid var(--primary-100);">
                            <label class="section-label" style="font-size: 0.8rem; color: var(--primary-600); font-weight: 800;">SIDE CUSTOM B</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="number" id="qtyB" class="text-input" placeholder="0.00" style="flex: 1;">
                                <select id="unitBName" class="nav-select" style="flex: 1.2; padding: 10px; border-radius: var(--radius-md);">
                                    <optgroup label="Traditional Area (पारंपरिक)">
                                        <option value="धुर" selected>धुर (Dhur)</option>
                                        <option value="कट्ठा">कट्ठा (Kattha)</option>
                                        <option value="बीघा">बीघा (Bigha)</option>
                                        <option value="धुरकी">धुरकी (Dhurki)</option>
                                    </optgroup>
                                    <optgroup label="Square Units">
                                        <option value="वर्ग फीट">वर्ग फीट (Sq Ft)</option>
                                        <option value="डिसमिल">डिसमिल (Decimal)</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: var(--space-6);">
                        <button id="calculateRelationBtn" class="btn-calculate" style="width: 100%; margin: 0;">
                            ✨ ${t.calculateBtn} & Find Laggi
                        </button>
                    </div>
                </div>

                <div style="padding: var(--space-4); background: #fff8e1; border-radius: var(--radius-md); border: 1px dashed #ffd700; color: #856404; font-size: 0.85rem; line-height: 1.5;">
                    💡 <strong>Note:</strong> ${t.methodInfoNote}
                </div>
            </div>
        `;
}

displayLaggiDiscoveryRelationResult(data) {
    const t = translations[document.documentElement.lang || 'hi'];
    const laggiHath = data.laggiHath;
    const isValid = laggiHath >= 4 && laggiHath <= 12 && (Math.abs((laggiHath % 0.5) - 0) < 0.001 || Math.abs((laggiHath % 0.5) - 0.5) < 0.001);

    this.elements.resultArea.innerHTML = `
            <div class="animate-scale-in" style="background: var(--bg-white); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-xl); border: 1px solid var(--primary-100);">
                <div style="background: var(--gradient-ocean); color: white; padding: 25px; text-align: center;">
                    <div style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.9; margin-bottom: 8px;">${t.laggiLabel}</div>
                    <div style="font-size: 3.5rem; font-weight: 900; line-height: 1; text-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                        ${this.formatLaggiValue(laggiHath)} <span style="font-size: 1rem; opacity: 0.8;">हाथ (Hand)</span>
                    </div>
                    <div style="margin-top: 15px; display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(255,255,255,0.2); border-radius: var(--radius-full); font-size: 0.9rem; font-weight: bold;">
                        ${isValid ? '✅ ' + t.validLaggi : '❌ ' + t.invalidLaggi}
                    </div>
                </div>

                <div style="padding: 25px;">
                    <div style="margin-bottom: 25px; background: var(--bg-primary); padding: 15px; border-radius: var(--radius-md); border: 1px solid var(--primary-100);">
                        <div style="font-size: 0.8rem; font-weight: bold; color: var(--primary-600); text-transform: uppercase; margin-bottom: 10px;">${t.relationFormula}</div>
                        <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">
                            ${data.inputQtyA} ${data.unitA} = ${data.inputQtyB} ${data.unitB}
                        </div>
                    </div>

                    ${!isValid ? `
                    <div style="margin-bottom: 25px; padding: 15px; background: rgba(245, 101, 101, 0.1); border-left: 4px solid #f56565; border-radius: var(--radius-sm);">
                        <strong style="color: #c53030; font-size: 0.9rem; display: block; margin-bottom: 5px;">💡 सुझाव:</strong> 
                        निकटतम मान्य लग्गी मान <strong>${this.formatLaggiValue(data.nearestValid)} हाथ</strong> हो सकता है।
                    </div>
                    ` : ''}

                    <div style="margin-bottom: 25px;">
                        <div style="font-size: 0.8rem; font-weight: bold; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px;">${t.stepByStep}</div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${data.steps.map((step, idx) => `
                                <div style="display: flex; gap: 12px; align-items: flex-start;">
                                    <div style="width: 24px; height: 24px; background: var(--primary-100); color: var(--primary-700); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold; flex-shrink: 0; margin-top: 2px;">${idx + 1}</div>
                                    <div style="font-size: 0.95rem; color: var(--text-secondary);">${step}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div style="padding-top: 20px; border-top: 2px dashed var(--primary-100);">
                        <div style="font-size: 0.8rem; font-weight: bold; color: var(--primary-600); text-transform: uppercase; margin-bottom: 10px;">${t.summaryBox}</div>
                        <div style="background: linear-gradient(to right, var(--primary-50), var(--bg-white)); padding: 15px; border-left: 5px solid var(--primary-500); border-radius: var(--radius-sm);">
                            <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: var(--text-primary); font-weight: 600;">
                                ${data.summary}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <button id="resetLaggiDiscovery" class="btn-secondary" style="margin-top: 20px; width: 100%; justify-content: center;">
                🔄 Reset / फिर से शुरू करें
            </button>
        `;

    document.getElementById('resetLaggiDiscovery')?.addEventListener('click', () => {
        this.createLaggiDiscoveryRelationUI();
        this.elements.resultArea.innerHTML = '';
        // Trigger app listeners for the new UI
        window.dispatchEvent(new CustomEvent('laggiDiscoveryUIReset'));
    });
}
