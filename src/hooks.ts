import type { Handle } from "@sveltejs/kit"

export const handle:Handle = async ( { request, resolve } ) => {
  if(request.query.has('_method')){
    // console.log(request.method)
    request.method = request.query.get("_method").toUpperCase();
    // console.log(request.method)
  }
  // -> Acctually execute the code in our api
  const response = await resolve(request); 
  return response
}