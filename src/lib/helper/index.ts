import type { Todo } from "$lib/todo.type"
export const genId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export function genTask( text:string, priority?:number ) :Todo {
    return {
      done : false,
      created_on : new Date(),
      task : text,
      priority: priority ?? 1,
      _id : genId(),
    }
  }