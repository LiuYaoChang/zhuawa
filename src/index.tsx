import FPromise from './FPromise/p_01'
import { add, getA, a } from './Es/index'
import './Es/Event'
import { ObjectFactory } from './Es/ObjectFactory'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
function noop ():void {}

// let a: number = getA()

console.log('before edit:', a)
add(10);
console.log('after edit:', a)
const promise = new FPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello fake promise')
  }, 1000)
}).then((data) => {
  console.log('resolve:', data);
  return data + '1';
}, noop)
.then((res) => {
  console.log('chain function:', res);
}, noop)

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello promise')
  }, 1000)
}).then((data) => {
  console.log('resolve:', data);
  return data + '1';
}, noop)
.then((res) => {
  throw new Error('cause some exception')
  console.log('chain function:', res);
}, noop)
.catch(err => {
  console.error('catch', err)
})
console.log('1', p1);

function Dog(name: String) {
  this.name = name
}

const dog = ObjectFactory(Dog, 'Sam')

console.log('dog name: ', dog.name)

ReactDOM.render(<App />, document.querySelector('#root'));
