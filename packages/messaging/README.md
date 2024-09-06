# Messaging Package

This package contains code messaging api. 
To use the code in the package, you need to add the following to the package.json file.

```json
{
  "dependencies": {
    "@extension/messaging": "workspace:*"
  }
}
```

## Messaging API

You can use messaging api to send/receive messages between context.

### Usage

```typescript
import { messaging } from '@extension/messaging';

// Send message
messaging.send('message', { data: 'data' });

// Receive message
messaging.on('message', (payload) => {
  console.log(payload.data); // 'data'
  return 'response';
});
```

### Message Types

You should define message types in the `type.ts` file.

```typescript
export interface PayloadAndResponse<P = unknown, D = unknown> {
  payload: P;
  response: D;
}
/**
 * Define the type of messages
 * If you want to add a new message type, you can add it here.
 */
export interface Messages {
  greeting: PayloadAndResponse<string, string>;
  //...
}
```

Then you can take advantage of the message types in the `messaging` api.

```typescript
import { messaging } from '@extension/messaging';


messaging.send('greeting', "Hello").then((response) => {
  console.log(response); // Hi
});
```


```typescript
import { messaging } from '@extension/messaging';

messaging.on('greeting', (payload) => {
  console.log(payload); // Hello
  return 'Hi'; // response
});
```

### SendToCurrentTab

You can use `sendToCurrentTab` to send a message to the current tab.

```typescript
import { messaging } from '@extension/messaging';

messaging.sendToCurrentTab('message', "this is current tab!");
```

You can receive the message in the current tabs `content script`. (e.g. `content` or `content-ui`) 

```typescript
import { messaging } from '@extension/messaging';

messaging.on('message', (payload) => {
  // Do something
});
```