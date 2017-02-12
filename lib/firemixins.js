
const firemixins = {

  database: {

    binds: [],

    bindAsObject(ref, name) {
      const callback = this.bindAsObjectCallback.bind(this, name);
      this.bind(ref, callback);
    },

    bindAsArray(ref, name) {
      const callback = this.bindAsArrayCallback.bind(this, name);
      this.bind(ref, callback);
    },

    bind(ref, callback) {
      ref.on('value', callback);
      this.addBind(ref, callback);
    },

    addBind(ref, callback) {
      this.binds.push({ ref, callback });
    },

    createItem(snap) {
      const item = {
        _key: snap.key,
      };
      const val = snap.val();
      if (val && typeof val === 'object') {
        for (const key of Object.keys(val)) {
          item[key] = val[key];
        }
      }
      else {
        item._value = val;
      }
      return item;
    },

    createArray(snap) {
      if (snap.hasChildren()) {
        const items = [];
        snap.forEach(child => {
          items.push(this.createItem(child));
          return false;
        });
        return items;
      }
      else {
        return [this.createItem(snap)];
      }
    },

    bindAsObjectCallback(name, snap) {
      const state = {};
      state[name] = this.createItem(snap);
      this.setState(state);
    },

    bindAsArrayCallback(name, snap) {
      const state = {};
      state[name] = this.createArray(snap);
      this.setState(state);
    },

    componentWillUnmount() {
      for (const bind of this.binds) {
        bind.ref.off('value', bind.callback);
      }
    },
  },

};

module.exports = firemixins;