# Brandgility's iframe embedding:
- get the id of template to be configured
- copy and paste this template into your page/component, `:id` in `src` attribute should be replaced with template's id:
```html
<iframe
  style={{ width: '100%', height: '100%', border: 'none' }}
  src="<BRANDGILITY_ENDPOINT>/embedded-template-configure/{new|edit}/:id" />
```

# API library
*Brandgility embedded api library allows you to use configurator*

## Methods

| method | description | params |
|:-----:|:-----:|:-----:|:-----:|
| on | subscribes to event | eventName: <`String`>, callback: <`function`> |
| emit | triggers an event | eventName: <`String`>, argument: <`Any`> |

*****

## Events to listen
### To subscribe on event use `on` method:
```js
brandgilityEmbeddedApi.on('load', () => console.info('loaded'));
```

| event |description|arguments|
|:-----:|-----|:-----:|
| load | load event | entity { `type`: <`String`> , id: <`String`> } |
| save | success save event | id of saved item <`Number`> |
| error | error event | error message <`String`> |

*****

## Events to emit
### To emit an event use `emit` method:
```js
brandgilityEmbeddedApi.emit('save');
```

| event |description | arguments |
|:-----:|-----|:-----:|
| save | save event | - |
