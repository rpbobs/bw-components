document.addEventListener("DOMContentLoaded", function () {
  const allComponents = document.querySelectorAll('bw-pdp-accordion, bw-pdp-accordion-item, bw-ytembed, bw-columns, bw-fw-banner, bw-2col-layout, bw-bgbanner-card, bw-overline-lists, bw-overline-list, bw-icon-list, bw-icon-lists');

  const componentMap = {
    'bw-pdp-accordion': './lit/js/bw-pdp-accordion.js',
    'bw-pdp-accordion-item': './lit/js/bw-pdp-accordion-item.js',
    'bw-ytembed': './lit/js/bw-ytembed.js',
    'bw-columns': './lit/js/bw-columns.js',
    'bw-fw-banner': './lit/js/bw-fw-banner.js',
    'bw-2col-layout': './lit/js/bw-2col-layout.js',
    'bw-bgbanner-card': './lit/js/bw-bgbanner-card.js',
    'bw-overline-lists': './lit/js/bw-overline-lists.js',
    'bw-overline-list': './lit/js/bw-overline-list.js',
    'bw-icon-list': './lit/js/bw-icon-list.js',
    'bw-icon-lists': './lit/js/bw-icon-lists.js'
  };

  const importComponent = (tagName) => {
    if (componentMap[tagName]) {
      import(componentMap[tagName])
        .then(() => console.log(`Loaded ${tagName}`))
        .catch(err => console.error(`Failed to load ${tagName}`, err));
    }
  };

  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let component = entry.target;
          let tagName = component.tagName.toLowerCase();

          if (component.getAttribute('data-lazyload') !== 'false') {
            importComponent(tagName);
            observer.unobserve(component);
          }
        }
      });
    });

    allComponents.forEach(component => {
      if (component.getAttribute('data-lazyload') !== 'false') {
        observer.observe(component);
      } else {
        let tagName = component.tagName.toLowerCase();
        importComponent(tagName);
      }
    });
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    allComponents.forEach(component => {
      let tagName = component.tagName.toLowerCase();
      if (component.getAttribute('data-lazyload') !== 'false') {
        importComponent(tagName);
      }
    });
  }
});
