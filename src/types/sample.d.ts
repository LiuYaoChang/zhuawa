declare namespace MyLib {
  function makeGreeting(s: string): string;
  let numberOfGreetings: number;
}

interface Widget {}

declare function getGreeting(n: number): Widget;

declare function getGreeting(s: string): Widget[];

interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}

declare function greet(setting: GreetingSettings): void;

export class Greeter {}

export class MyGreeter extends Greeter {}

type GreetingLike = string | (() => string) | MyGreeter;

declare function greet(g: GreetingLike): void;


declare namespace GreetingLib {
  interface LogOptions {
    verbose?: boolean;
  }
  interface AlertOptions {
    modal: boolean;
    title?: string;
    color?: string;
  }
}

declare var foo: number;
declare function greet(message: string): void;