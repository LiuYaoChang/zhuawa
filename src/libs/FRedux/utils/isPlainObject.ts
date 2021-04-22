
export default function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    proto = Object.getPrototypeOf(obj);
  }

  return Object.getPrototypeOf(obj) === proto;
}