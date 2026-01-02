// Component Loader - Dynamically loads HTML components
class ComponentLoader {
    static async loadComponent(componentPath, targetElementId) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            const html = await response.text();
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.innerHTML = html;
            }
            return true;
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            return false;
        }
    }

    static async loadAll() {
        const components = [
            { path: 'components/header.html', target: 'headerContainer' },
            { path: 'components/lander.html', target: 'landerContainer' },
            { path: 'components/modals.html', target: 'modalsContainer' },
            { path: 'components/calculator-interface.html', target: 'calcInterfaceContainer' },
            { path: 'components/footer.html', target: 'footerContainer' }
        ];

        const loadPromises = components.map(comp =>
            this.loadComponent(comp.path, comp.target)
        );

        await Promise.all(loadPromises);
        console.log('✅ All components loaded successfully');
    }
}

// Auto-load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ComponentLoader.loadAll());
} else {
    ComponentLoader.loadAll();
}
