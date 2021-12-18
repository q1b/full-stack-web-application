import type { RequestHandler } from "@sveltejs/kit"

import { api } from "./_api";

export const get: RequestHandler = (request) => {
  return api(request);
}

export const post: RequestHandler<{}, FormData> = (request) => {
  return api(request, {
    created_at: new Date(),
    priority:1,
    task: request.body.get("task"),
    done: false
  });
}
