import BrandgilityEmbeddedApi from './lib';

test('callback should be called when appropriate action + key has been received', () => {
  const callback = jest.fn();
  const iframe = document.createElement('iframe');
  const identityKey = '@BrandgilityEmbeddedApi';
  const action = 'some action';

  document.body.append(iframe);

  const brandgilityEmbeddedApi = new BrandgilityEmbeddedApi(iframe.contentWindow);

  brandgilityEmbeddedApi.on(action, callback);

  const messageEvent = new MessageEvent('message', {
    data: { identityKey, action },
    source: iframe.contentWindow,
  });

  window.dispatchEvent(messageEvent);

  expect(callback).toHaveBeenCalled();
});
