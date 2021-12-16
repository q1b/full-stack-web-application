import type { RequestHandler } from "@sveltejs/kit"

let todos: Todo[] = [];

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: todos
  }
}


export const post: RequestHandler<{}, FormData> = ( request ) =>  {
  // name attr of input 
  todos.push({
    date: new Date(),
    text: request.body.get("text"),
    done: false,
  });
  return {
    status: 303,
    headers:{
      location: "/"
    }
  }
}