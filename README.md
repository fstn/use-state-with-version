# useStateWithVersion React Hook

Custom hook to include a version check for useState which was previously available for setState in class components. 

## Installation

`npm install use-state-with-version`

## Usage

```
import React from 'react';

import useStateWithVersion from 'use-state-with-version';

const App = () => {
  const [object, setObject] = useStateWithVersion({});

  return (
    <div>
    </div>
  );
};
```

## Contribute

* `git clone git@github.com:fstn/use-state-with-version.git`
* `cd use-state-with-version`
* `npm install`
* `npm run test`

### More

* [Publishing a Node Package to NPM](https://www.robinwieruch.de/publish-npm-package-node/)
* [Node.js Testing Setup](https://www.robinwieruch.de/node-js-testing-mocha-chai/)
* [React Testing Setup](https://www.robinwieruch.de/react-testing-tutorial/)
