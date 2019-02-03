class WordCountComponent extends HTMLElement {

  get template() {
    const path = 'components/word-count/word-count.component.html';
    const link = document.querySelector(`link[rel="import"][href="${ path }"]`);
    return link.import.querySelector('template').innerHTML;
  }

  get $cache() {
    if (this._$cache) {
      return this._$cache;
    }
    this._$cache = {
      textarea: this.shadowRoot.getElementById('textarea'),
      wordcount: this.shadowRoot.getElementById('wordcount'),
      charcount: this.shadowRoot.getElementById('charcount'),
      reset: this.shadowRoot.getElementById('reset'),
    }
    return this._$cache;
  }

  get handlers() {
    if (this._handlers) {
      return this._handlers;
    }
    this._handlers = {
      updateCount: (() => {
        if (!this.$cache.textarea.value) {
          this.wordCount = 0;
          this.charCount = 0;
          return;
        }
        const split = this.$cache.textarea.value.trim().split(' ');
        this.wordCount = split.length;
        this.charCount = split.join('').length;
      }).bind(this),
      reset: (() => {
        this.$cache.textarea.value = '';
        this.handlers.updateCount();
      }).bind(this)
    }
    return this._handlers;
  }

  set wordCount(count) {
    this.$cache.wordcount.innerText = count;
  }

  set charCount(count) {
    this.$cache.charcount.innerText = count;
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }

  connectedCallback() {
    console.info('Word-count component ready');
    this.$cache.textarea.addEventListener('keyup', this.handlers.updateCount);
    this.handlers.updateCount();
    this.$cache.reset.addEventListener('click', this.handlers.reset);
  }
  
  disconnectedCallback() {
    console.info('Word-count component was removed');
    this.$cache.textarea.removeEventListener('keyup', this.handlers.updateCount);
    this.$cache.reset.removeEventListener('click', this.handlers.reset);
  }

}

// Define the new element
customElements.define('app-word-count', WordCountComponent);