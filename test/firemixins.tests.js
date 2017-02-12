import _ from 'lodash';
import chai from 'chai';
import sinon from 'sinon';
import firemixins from '../lib/firemixins';

chai.should();

describe('firemixins database', () => {

  function createRef() {
    const ref = {
      on() {},
      off() {},
    };
    sinon.spy(ref, 'on');
    sinon.spy(ref, 'off');
    return ref;
  }

  const baseComponent = {
    state: {},

    setState(state) {
      this.state = state;
    },
  };

  const component = _.extend(baseComponent, firemixins.database);
  let ref;

  const users = {
    jinan: {
      name: 'Lin Jinan',
      age: '22',
    },
    jan: {
      name: 'Jenny',
      age: '25',
    },
  };

  const Snapshot = function(key, obj) {

    Object.defineProperty(this, 'key', { value: key });

    this.hasChildren = function () {
      return Object.keys(obj).length > 0;
    };

    this.val = function() {
      return obj;
    },

    this.forEach = function(func) {
      for (const key of Object.keys(obj)) {
        const child = new Snapshot(key, obj[key]);
        if (func(child)) {
          break;
        }
      }
    };
  };

  const snap = new Snapshot('users', users);

  beforeEach(() => {
    component.binds.splice(0);
    ref = createRef();
  });

  it('calls refs.on', () => {
    component.bindAsObject(ref, 'items');
    ref.on.callCount.should.equal(1);    
    ref.on.args[0].length.should.equal(2);
    ref.on.args[0][0].should.equal('value');    
    ref.on.args[0][1].should.be.a('function');    
  });

  it('calls refs.off', () => {
    component.bindAsObject(ref, 'items');
    component.componentWillUnmount();
    ref.off.callCount.should.equal(1);    
    ref.off.args[0].length.should.equal(2);
    ref.off.args[0][0].should.equal('value');    
    ref.off.args[0][1].should.be.a('function');    
    ref.off.args[0][1].should.equal(ref.on.args[0][1]);    
  });

  it('adds bind', () => {
    component.bindAsObject(ref, 'items');
    component.binds.length.should.equal(1);
    const bind = component.binds[0];
    bind.ref.should.equal(ref);
    bind.callback.should.equal(ref.on.args[0][1]);    
  });

  it('adds item as object', () => {
    component.bindAsObject(ref, 'users');
    const callback = ref.on.args[0][1];
    callback(snap);
    component.state.should.have.property('users');
    const item = component.state.users;
    item.should.be.a('object');
    item.should.not.be.an.instanceof(Array);
    item._key.should.equal('users');
    item['jinan'].should.equal(users['jinan']);
    item['jan'].should.equal(users['jan']);
  });

  it('adds item as array', () => {
    component.bindAsArray(ref, 'users');
    const callback = ref.on.args[0][1];
    callback(snap);
    component.state.should.have.property('users');
    const item = component.state.users;
    item.should.be.an.instanceof(Array);
    const jinan = _.extend({ _key: 'jinan' }, users['jinan']);
    const jan = _.extend({ _key: 'jan' }, users['jan']);
    item[0].should.deep.equal(jinan);
    item[1].should.deep.equal(jan);
  });  

});