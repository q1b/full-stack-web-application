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
  // import CompleteBtn from "$lib/components/btns/complete.svelte"
  import Todoitem from "$lib/components/Todoitem.svelte";
  export let tasks: Todo[];

  const processNewTodosResult = async ( res: Response,form :HTMLFormElement ) => {
    const newTask = await res.json();
    tasks = [...newTask];
    form.reset();
  }
  
  const processDeletedItem = async ( res: Response ) => {
    const newArray = await res.json();
    tasks = [...newArray];
  }
  
  const processCheckedItem = async ( res: Response ) => {
    const newArray = await res.json();
    tasks = [...newArray];
  }

</script>

<article class="w-full px-10 flex flex-col items-center gap-y-6">
  <form
    class="w-full flex items-center gap-x-3 justify-center"
    action="/todos.json"
    method="post"
    use:enhance={{result:processNewTodosResult}}
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

  {#each tasks as todo}
    <div class="w-full flex items-center gap-x-3 justify-center"  >
      <Todoitem details={todo} {processDeletedItem} {processCheckedItem} />
    </div>
  {/each}
</article>
