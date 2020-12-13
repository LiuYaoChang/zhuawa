import FPromise from './FPromise/index'


function noop ():void {}


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