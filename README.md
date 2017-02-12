# react-firebase

Integrates react and firebase.

## Installation

```bash
npm i -S react-firebase
```
## Usage

```js
const firebase = require('firebase/app');
require('firebase/database');

const firemixins = require('react-firebase').firemixins;

React.createClass({

  mixins: [firemixins.database],

  getInitialState() {
    return {};
  },

  componentDidMount() {
    const db = firebase.database();
    this.bindAsArray(db.ref('/items'), 'items');
    this.bindAsObject(db.ref('/options'), 'options');
  },

  render() {
    const items = this.state.items;
    const options = this.state.options;

    // TODO: use items and options
  },

});
```

## License
MIT