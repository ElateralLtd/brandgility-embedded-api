import BrandgilityEmbeddedApi from './lib';

let iframe;
let brandgilityEmbeddedApi;
let callback;

const identityKey = '@BrandgilityEmbeddedApi';
const action = 'some action';

beforeEach(() => {
  callback = jest.fn();
  iframe = document.createElement('iframe');
  document.body.append(iframe);
  brandgilityEmbeddedApi = new BrandgilityEmbeddedApi(iframe.contentWindow);
});

test('callback should be called when appropriate action has been received', () => {
  brandgilityEmbeddedApi.on(action, callback);

  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action },
    source: iframe.contentWindow,
  });

  window.dispatchEvent(messageEvent);

  expect(callback).toHaveBeenCalled();
});

test('callback should be called with payload sent with action', () => {
  const payload = {
    someField: 'someValue',
  };

  brandgilityEmbeddedApi.on(action, callback);

  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action, payload },
    source: iframe.contentWindow,
  });

  window.dispatchEvent(messageEvent);

  expect(callback).toHaveBeenCalledWith(payload);
});

test('callback should NOT be called when received action from unexpected event source', () => (
  new Promise((done) => {
    const differentIframe = document.createElement('iframe');

    document.body.append(differentIframe);

    const messageEvent = new MessageEvent('message', {
      data: { identityKey, action },
      source: differentIframe.contentWindow,
    });

    window.addEventListener('message', ({ data }) => {
      expect(data.action).toBe(action);
      expect(data.identityKey).toBe(identityKey);
      expect(callback).not.toHaveBeenCalled();
      done();
    });

    window.dispatchEvent(messageEvent);
  })
));

test('callback should NOT be called when received unregistered action', () => {
  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action },
    source: iframe.contentWindow,
  });

  window.dispatchEvent(messageEvent);

  expect(callback).not.toHaveBeenCalled();
});

test('callback should NOT be called after destroy', () => {
  brandgilityEmbeddedApi.on(action, callback);
  brandgilityEmbeddedApi.destroy();

  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action },
    source: iframe.contentWindow,
  });

  window.dispatchEvent(messageEvent);

  expect(callback).not.toHaveBeenCalled();
});

test('callback should be called when emit is called with appropriate action', () => (
  new Promise((done) => {
    iframe.contentWindow.addEventListener('message', ({ data }) => {
      expect(data.action).toBe(action);
      expect(data.identityKey).toBe(identityKey);
      done();
    });
    brandgilityEmbeddedApi.emit(action);
  })
));
