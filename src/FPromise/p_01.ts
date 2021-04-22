

enum STATUS {
  PENDDING,
  FULLFILLED,
  REJECTED
}

export default class FPromise {
  status: STATUS = STATUS.PENDDING;
  callbacks: Function[] = [];
  value: any;
  constructor(handler) {
    this.status = STATUS.PENDDING
    handler(this._resolve.bind(this))
  }

  _resolve(val) {
    const {status, callbacks } = this
    if (status !== STATUS.PENDDING) return;

    this.status = STATUS.FULLFILLED;
    this.value = val;
    // 非PENDDING 状态不处理
    setTimeout(() => {
      this.flushCallback();
    }, 0)
  }

  flushCallback() {
    const val = this.value
    for (let cb of this.callbacks) {
      if (typeof cb === 'function') {
        cb(val);
      }
    }
  }
  _reject() {

  }

  // 1. 判断当前promise 的状态
  // 2. 如果不是pendding 状态，则根据状态选择调用 then 注册的
  then(onFulfilled, onRejected) {
    const self = this;
    const status = this.status;
    const inner = new Promise((resolve, reject) => {
      function innerFulfilled(val) {
        function _onFulFilled() {
          if (typeof onFulfilled !== 'function') {
            resolve(onFulfilled)
          } else {
            const res = onFulfilled(val);
            if (res && typeof res.then === 'function') {
              res.then(resolve);
            } else {
              resolve(res);
            }
          }
        }
        function _onRejected() {
          if (typeof onRejected !== 'function') {
            reject(onRejected)
          } else {
            const res = onRejected(val);
            if (res && typeof res.then === 'function') {
              res.then(null, reject);
            } else {
              reject(res);
            }
          }
        }
        const status = self.status;
        if (status === STATUS.FULLFILLED) {
          _onFulFilled();
        } else {
          _onRejected();
        }
        // 不是一个函数
      }
      if (status === STATUS.PENDDING) {
        this.callbacks.push(innerFulfilled)
      }
    })
    return inner
  }
}

// a.then().then().then();