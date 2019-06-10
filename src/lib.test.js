import BrandgilityEmbeddedApi from './lib';

test('instance should be an instance of BrandgilityEmbeddedApi', () => {
  const brandgilityEmbeddedApi = new BrandgilityEmbeddedApi(window);

  expect(brandgilityEmbeddedApi).toBeInstanceOf(BrandgilityEmbeddedApi);
});
