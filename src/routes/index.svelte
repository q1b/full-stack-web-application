<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ fetch }) => {
    const res = await fetch("/todos.json");

    if (res.ok) {
      const todos = await res.json();
      const tasks = todos.tasks;
      return {
        props: {
          tasks, // which is passed to script
        },
      };
    }

    const { message } = await res.json();

    return {
      error: new Error(message),
    };
  };
</script>

<script lang="ts">
  import type { Todo } from "$lib/todo.type";
  import { enhance } from "$lib/actions/enhance";
  import AddBtn from "$lib/components/btns/add.svelte";
  import RemoveBtn from "$lib/components/btns/remove.svelte";
  import UndoneBtn from "$lib/components/btns/undone.svelte";
  // import CompleteBtn from "$lib/components/btns/complete.svelte"
  import Todoitem from "$lib/components/Todoitem.svelte";
  export let tasks: Todo[];
  const processNewTodosResult = async ( res: Response) => {
    const newTask = await res.json();
    tasks = [ newTask ,...tasks]
  }
</script>

<article class="w-full px-10 flex flex-col items-center gap-y-6">
  <form
    class="w-full flex items-center gap-x-3 justify-center"
    action="/todos.json"
    method="post"
  >
    <div class="w-7 " />
    <input
      type="text"
      name="task"
      aria-label="add a todo"
      placeholder="+ Add todo"
      class="placeholder:text-slate-300 font-code text-slate-900 bg-white border-2 font-medium focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full h-10 rounded-lg px-2"
    />
    <AddBtn />
  </form>
  <!-- Done Component -->
  <!-- <div class="w-full flex items-center gap-x-3 justify-center">
    <UndoneBtn />
    <div
      class="bg-green-300 line-through flex flex-wrap items-center font-medium tracking-wider text-sky-800 border-2 focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full rounded-lg p-2"
    >
      asdasdasdasdasd
    </div>
    <RemoveBtn />
  </div> -->

  {#each tasks as todo}
    <div class="w-full flex items-center gap-x-3 justify-center">
      <Todoitem details={todo} />
    </div>
  {/each}
</article>
