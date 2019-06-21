# How to embed Brandgility's configurator into an iframe:
- get the id of template to be configured from Brandgility application
- copy and paste below code into your page/component, replace `:id` in `src` attribute with your template's id:
```html
<iframe
  style={{ width: '100%', height: '100%', border: 'none' }}
  src="<BRANDGILITY_ENDPOINT>/embedded-template-configure/{new|edit}/:id" />
```

# API library
*Brandgility embedded api library allows you to issue commands to Brandgility configurator in embedded mode*

## Methods

| method | description | parameters |
|:-----:|:-----:|:-----:|:-----:|
| `on` | subscribes to event | eventName: <`String`>, callback: <`Function`> |
| `emit` | triggers an event | eventName: <`String`>, argument: <`Any`> |

*****

## Events to listen
### To subscribe on event use `on` method:
```js
brandgilityEmbeddedApi.on('load', () => console.info('loaded'));
```

| event | description | arguments |
|:-----:|-----|:-----:|
| `load` | load event | entity { `type`: <`String`> , id: <`String`> } |
| `save` | success save event | id of saved item <`Number`> |
| `error` | error event | error { `message`: <`String`> } |

*****

## Events to trigger
### To trigger an event use `emit` method:
```js
brandgilityEmbeddedApi.emit('save');
```

| event | description | parameters |
|:-----:|-----|:-----:|
| `save` | saves a current version of template | - |
| `saveAs` | creates a new saved customization from an existing saved customization | new item { `name`: <`String`>, `comments`: <`String`> } |

