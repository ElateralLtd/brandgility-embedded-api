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

test('callback should be called with payload sent with action', () => {
  const payload = { someField: 'someValue' };
  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action, payload },
    source: iframe.contentWindow,
  });

  brandgilityEmbeddedApi.on(action, callback);

  window.dispatchEvent(messageEvent);

  expect(callback).toHaveBeenCalledWith(payload);
});

test('callback should NOT be called when received action from unexpected event source', (done) => {
  const differentIframe = document.createElement('iframe');

  document.body.append(differentIframe);

  const messageHandler = ({ data }) => {
    expect(data.action).toBe(action);
    expect(data.identityKey).toBe(identityKey);
    expect(callback).not.toHaveBeenCalled();

    window.removeEventListener('message', messageHandler);
    done();
  };
  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action },
    source: differentIframe.contentWindow,
  });

  brandgilityEmbeddedApi.on(action, callback);
  window.addEventListener('message', messageHandler);
  window.dispatchEvent(messageEvent);
});

test('callback should NOT be called when received unregistered action', () => {
  const messageEvent = new MessageEvent('message', {
    data: {
      action: 'different action',
      identityKey,
    },
    source: iframe.contentWindow,
  });

  brandgilityEmbeddedApi.on(action, callback);
  window.dispatchEvent(messageEvent);

  expect(callback).not.toHaveBeenCalled();
});

test('callback should NOT be called after destroy', () => {
  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action },
    source: iframe.contentWindow,
  });

  brandgilityEmbeddedApi.on(action, callback);
  brandgilityEmbeddedApi.destroy();
  window.dispatchEvent(messageEvent);

  expect(callback).not.toHaveBeenCalled();
});

test('callback in iframe should be called when emit is called with appropriate action', (done) => {
  iframe.contentWindow.addEventListener('message', ({ data }) => {
    expect(data.action).toBe(action);
    expect(data.identityKey).toBe(identityKey);
    done();
  });

  brandgilityEmbeddedApi.emit(action);
});
