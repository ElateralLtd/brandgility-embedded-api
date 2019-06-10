class BrandgilityEmbeddedApi {
  #handlersByAction = null;
  #targetWindow = null;
  #identityKey = null;

  constructor(targetWindow) {
    this.#handlersByAction = new Map();
    this.#targetWindow = targetWindow;
    this.#identityKey = '@BrandgilityEmbeddedApi';

    window.addEventListener('message', this.#handleMessage);
  }

  #handleMessage = (event) => {
    const expectedEventSource = event.source === this.#targetWindow;
    const expectedEventType = Boolean(event.data) && event.data.identityKey === this.#identityKey;
    const expectedEvent = expectedEventSource && expectedEventType;

    if (expectedEvent) {
      if (this.#handlersByAction.has(event.data.action)) {
        this.#handlersByAction.get(event.data.action).forEach((handler) => {
          handler(event.data.payload);
        });
      } else {
        // eslint-disable-next-line max-len
        console.warn(`BrandgilityEmbeddedApi: no handler was defined for "${event.data.action}" action`);
      }
    }
  }

  on(action, handler) {
    const handlers = this.#handlersByAction.get(action) || [];

    this.#handlersByAction.set(action, [...handlers, handler]);
  }

  emit(action, payload) {
    this.#targetWindow.postMessage({ identityKey: this.#identityKey, action, payload }, '*');
  }

  destroy() {
    window.removeEventListener('message', this.#handleMessage);
  }
}

export default BrandgilityEmbeddedApi;
