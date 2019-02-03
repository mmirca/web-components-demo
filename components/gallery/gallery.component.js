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
    }
    return this._$cache;
  }

  get handlers() {
    return {
      // reset: (() => {
      //   this.$cache.textarea.value = '';
      //   this.handlers.updateCount();
      // }).bind(this)
    }
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }

  connectedCallback() {
    console.log('Component is ready');
    this.$cache.slot.addEventListener('slotchange', () => {
      this.images = this.$cache.slot.assignedNodes().filter(item => item.nodeName === 'IMG');
      this.images.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(img);
        this.$cache.cards.appendChild(card);
      })
    })
  }
  
  disconnectedCallback() {
    console.log('Component was removed');
  }

}

// Define the new element
customElements.define('app-gallery', GalleryComponent);