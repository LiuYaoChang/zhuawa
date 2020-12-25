
/**
 * 1. create an object
 * 2. __proto__ 属性指向构建函数的原型
 * 3. 改变 this 值
 * @param constructor 
 * @param args 
 */
export function ObjectFactory(...arg: any[]) {
  const instance: any = new Object();
  const args: any[] = Array.prototype.slice.call(arguments, 0)
  const ctor: Function = args[0]
  instance.__proto__ = ctor.prototype
  const res: unknown = ctor.apply(instance, args.slice(1))

  return (typeof res === 'object') ? res : instance
}

