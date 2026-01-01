// js/main.js - एप्लीकेशन इनीशियलाइजेशन

document.addEventListener('DOMContentLoaded', () => {
    // Check if classes are loaded globally (non-module approach)
    if (typeof SmartCalculatorApp !== 'undefined') {
        window.appInstance = new SmartCalculatorApp();
        console.log('✅ स्मार्ट कैलकुलेटर 2.0 (Classic Modular) शुरू हो गया है!');

        // Lander Logic
        const startBtn = document.getElementById('startBtn');
        const landerPage = document.getElementById('landerPage');
        const header = document.querySelector('.header');
        const mainApp = document.getElementById('mainApp');
        const mainFooter = document.getElementById('mainFooter');

        if (startBtn && landerPage) {
            startBtn.addEventListener('click', () => {
                if (window.appInstance) {
                    window.appInstance.startApp();
                } else {
                    // Fallback if appInstance is not yet ready
                    landerPage.classList.add('fade-out');
                    setTimeout(() => {
                        landerPage.classList.add('hidden');
                        if (header) header.classList.remove('hidden');
                        if (mainApp) mainApp.classList.remove('hidden');
                        if (mainFooter) mainFooter.classList.remove('hidden');
                    }, 500);
                }
            });
        }
    } else {
        console.error('❌ Error: SmartCalculatorApp is not defined. Check script loading order.');
    }
});
