class ScriptLoader {
  constructor(prefix, basePath) {
    this.prefix = prefix;
    this.basePath = basePath;
    this.scriptsLoaded = new Set();
    this.elementsProcessed = new Set();
  }

  loadScripts() {
    const allElements = document.getElementsByTagName('*');
    Array.from(allElements).forEach(element => {
      if (!this.elementsProcessed.has(element)) {
        this.processElement(element);
        this.elementsProcessed.add(element);
      }
    });
  }

  processElement(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName.startsWith(this.prefix) && !this.scriptsLoaded.has(tagName)) {
      const scriptUrl = `${this.basePath}${tagName}.js`;
      this.insertScript(scriptUrl);
      this.scriptsLoaded.add(tagName);
    }
  }

  insertScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'module';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.crossOrigin = 'anonymous';
    script.onload = () => console.log(`${url} loaded.`);
    script.onerror = () => console.error(`Failed to load ${url}`);
    document.head.appendChild(script);
  }

  debounce(callback, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(this, args), delay);
    };
  }

}

// Usage
document.addEventListener('DOMContentLoaded', () => {
  const loader = new ScriptLoader('bw-', './lit/js/');
  loader.loadScripts();

  // Also load scripts when new elements are added dynamically
  const observer = new MutationObserver(mutations => {
    const newElements = [];
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          newElements.push(node);
        }
      });
    });

    // Process only new elements
    newElements.forEach(element => loader.processElement(element));
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
