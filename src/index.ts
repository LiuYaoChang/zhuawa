import FPromise from './FPromise/index'
import { add, getA, a } from './Es/index'
import { ObjectFactory } from './Es/ObjectFactory'
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
  return data;
}, noop).then((res) => {
  console.log('chain function:', res);
}, noop)

function Dog(name: String) {
  this.name = name
}

const dog = ObjectFactory(Dog, 'Sam')

console.log('dog name: ', dog.name)
