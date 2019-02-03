class GalleryComponent extends HTMLElement {

  get template() {
    const path = 'components/gallery/gallery.component.html';
    const link = document.querySelector(`link[rel="import"][href="${ path }"]`);
    return link.import.querySelector('template').innerHTML;
  }

  get $cache() {
    if (this._$cache) {
      return this._$cache;
    }
    this._$cache = {
      slot: this.shadowRoot.querySelector('slot'),
      cards: this.shadowRoot.getElementById('cards'),
      viewer: this.shadowRoot.getElementById('viewer'),
    }
    return this._$cache;
  }

  get handlers() {
    return {
      focusImage: (function (e) {
        this.$cache.viewer.innerHTML = '';
        this.$cache.viewer.appendChild(e.target.cloneNode());
        this.$cache.viewer.classList.add('viewer--visible');
      }).bind(this),
      hideViewer: (function (e) {
        if (!(e.target === this.$cache.viewer)) {
          return;
        }
        this.$cache.viewer.classList.remove('viewer--visible');
      }).bind(this)
    }
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }

  connectedCallback() {
    console.log('Gallery component ready');
    this.$cache.slot.addEventListener('slotchange', () => {
      this.images = this.$cache.slot.assignedNodes().filter(item => item.nodeName === 'IMG');
      this.images.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(img);
        this.$cache.cards.appendChild(card);
        img.addEventListener('click', this.handlers.focusImage);
      });
    })
    this.$cache.viewer.addEventListener('click', this.handlers.hideViewer);
  }
  
  disconnectedCallback() {
    console.log('Gallery component was removed');
    this.images.forEach(img => img.removeEventListener('click', this.handlers.focusImage));
    this.$cache.viewer.removeEventListener('click', this.handlers.hideViewer);
  }

}

// Define the new element
customElements.define('app-gallery', GalleryComponent);