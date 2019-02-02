class WordCountComponent extends HTMLElement {

  get link() {
    return document.querySelector(`link[rel="import"][href="${ this.path }"]`);
  }
  get template() {
    return this.link.import.querySelector('template').innerHTML;
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.path = 'components/word-count/word-count.component.html';
    this.shadowRoot.innerHTML = this.template;
  }

  connectedCallback() {
    console.log('Component is ready')
  }

  disconnectedCallback() {
    console.log('Component was removed');
  }

}

// Define the new element
customElements.define('app-word-count', WordCountComponent);