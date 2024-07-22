// lazy-loader.js
class LazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
  }

  observe(element) {
    this.observer.observe(element);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const componentName = element.tagName.toLowerCase();
        this.loadComponent(componentName, element);
        this.observer.unobserve(element);
      }
    });
  }

  async loadComponent(componentName, element) {
    try {
      await import(`./${componentName}.js`);
      console.log(`${componentName} loaded successfully`);
      // If the component requires initialization after load, do it here
    } catch (error) {
      console.error(`Error loading ${componentName}:`, error);
    }
  }
}

export const lazyLoader = new LazyLoader();