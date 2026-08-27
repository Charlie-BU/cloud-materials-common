import type { Action } from '../Action';
import { define, observable, action } from '@formily/reactive';

export class ActionHistory {
  history: Action[] = [];

  constructor() {
    // 将 ActionHistory 的属性变为响应式，这样 TableEditor 中的 hasActionHistory 属性才能变为响应式
    define(this, {
      history: observable,
      count: observable.computed,
      push: action,
      pop: action,
      clear: action,
    });
  }

  push(action: Action) {
    this.history.push(action);
  }

  pop() {
    return this.history.pop();
  }

  clear() {
    this.history = [];
  }

  get count() {
    return this.history.length;
  }
}
