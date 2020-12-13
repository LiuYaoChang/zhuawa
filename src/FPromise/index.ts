
enum PROMISE_STATUS {
  PENDING,
  FULLFILLED,
  REJECTED
}

interface IFPromise {
  status: PROMISE_STATUS;
  value: unknown;
  then: (resolve: unknown, reject: unknown) => FPromise;
  catch: () => void;
  _resolve: (val: any) => void;
  _fullfilledList: Array<FPromise>;
}

export default class FPromise implements IFPromise {
  status = PROMISE_STATUS.PENDING;
  value = '';
  _fullfilledList = [];
  constructor(handler: Function) {
    handler(this._resolve.bind(this))
  }

  // trigger promise and update status;
  _resolve(val: any) {
    if (this.status !== PROMISE_STATUS.PENDING) return;

    this.status = PROMISE_STATUS.FULLFILLED;
    this.value = val;
    setTimeout(() => {
      this.flushCallback()
    }, 0)
  }

  flushCallback() {
    const val = this.value
    for (let cb of this._fullfilledList) {
      if (typeof cb === 'function') {
        cb(val);
      }
    }
  }
  // .then method
  then(fullfilledCallback: unknown, rejectedCallback: unknown) {
    const { value, status } = this;

    const promise: FPromise = new FPromise((resolve: Function, reject: Function) => {
      const  compose = (val: any) => {
        // 不是一个function
        if (typeof fullfilledCallback !== 'function') {
          resolve(val)
        } else {
          const res: any = fullfilledCallback(val)

          if (res && typeof res.then === 'function') {
            res.then(resolve)
          } else {
            resolve(res)
          }
        }
      }

      if (status === PROMISE_STATUS.PENDING) {
        this._fullfilledList.push(compose)
      }
    })
    return promise;
  }
  
  // catch method
  catch() {

  }
}