# How to embed Brandgility's configurator into an iframe:
- get the id of template to be configured from Brandgility application
- copy and paste below code into your page/component, replace `:id` in `src` attribute with your template's id:
```html
<iframe src="<BRANDGILITY_ENDPOINT>/embedded-template-configure/{new|edit}/:id" />
```

# API library
*Brandgility embedded api library allows you to issue commands to Brandgility configurator in embedded mode*

## Methods

| method | description | parameters |
|:-----:|:-----:|:-----:|:-----:|
| `on` | subscribes to event | eventName: <`string`>, callback: <`function`> |
| `emit` | triggers an event | eventName: <`string`>, argument: <serializable, see [The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)> |

*****

## Events to listen
### To subscribe on event use `on` method:
```js
brandgilityEmbeddedApi.on('load', () => console.info('loaded'));
```

| event | description | arguments |
|:-----:|-----|:-----:|
| `load` | load event | entity { `type`: <`string`> , id: <`string`> } |
| `save` | success save event | id of saved item <`string`> |
| `error` | error event | error { `message`: <`string`> } |

*****

## Events to trigger
### To trigger an event use `emit` method:
```js
brandgilityEmbeddedApi.emit('save');
```

| event | description | parameters |
|:-----:|-----|:-----:|
| `save` | saves a current version of template | - |
| `saveAs` | creates a new saved customization from an existing saved customization | new item { `name`: <`string`>, `comments`: <`string`> } |

