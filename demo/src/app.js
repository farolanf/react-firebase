import React from 'react';
import firebase from './firebase'; 
import { firemixins } from '../../index';

const db = firebase.database();

export default React.createClass({
  
  mixins: [firemixins.database],

  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.setItem(this.selItems);
    this.bindAsArray(db.ref('/items'), 'items');
    this.bindAsObject(db.ref('/items'), 'itemsObj');
  },

  selChanged(e) {
    this.setItem(e.target);
  },

  setItem(sel) {
    const name = sel.options[sel.selectedIndex].value;
    this.setState({ item: name });
  },

  addItem() {
    const name = this.state.item;
    db.ref('/items').push({ name });
  },

  clearItems() {
    db.ref('/items').remove();
  },

  render() {
    const { items, itemsObj } = this.state;
    console.log(items);
    console.log(itemsObj);
    return (
      <div className="container">
        <h1>react-firebase Demo App</h1>
        <div className="row">
          <div className="col-xs-6 col-md-4 col-lg-3">
            <div className="form-group">
              <select className="form-control" onChange={this.selChanged}
              ref={ref => this.selItems = ref}>
                <option>Apple</option>
                <option>Orange</option>
                <option>Wheat</option>
                <option>Pear</option>
              </select>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary form-control" 
              onClick={this.addItem}>Add Item</button>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-danger form-control" 
              onClick={this.clearItems}>Clear Items</button>
            </div>
          </div>
          <div className="col-xs-6 col-md-4 col-lg-3">
            <div className="list-group">
              <div className="list-group-item disabled">ITEMS</div>
            {items && items.map(item => (
              <div key={item._key} className="list-group-item">
                {item.name}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  
});
