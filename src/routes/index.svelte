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
  import { flip } from "svelte/animate"
  import { fade } from "svelte/transition";
  import { enhance } from "$lib/actions/enhance";

	function fadeUp(node, { duration }) {
		return {
			duration,
			css: (t,u) => {				
				return `
            opacity: ${t};
						transform: scale(${t}) translateY(${u * 70}px);
					`
			}
		};
	}

  
  import AddBtn from "$lib/components/btns/add.svelte";

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

<article class="w-full px-10 grid grid-cols-6 gap-y-6 place-items-center">
  <form
    class="w-full col-span-full flex items-center gap-x-3 justify-center"
    action="/todos.json"
    method="post"
    use:enhance={{result:processNewTodosResult}}
  >
    <div class="w-7" />
    <input
      type="text"
      name="task"
      aria-label="add a todo"
      placeholder="+ Add todo"
      class="placeholder:text-slate-300 font-code text-slate-900 bg-white border-2 font-medium focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full h-10 rounded-lg px-2"
    />
    <AddBtn />
  </form>

  <div class="mt-10 col-span-full flex w-full flex-col gap-y-6">
    {#each [...tasks.filter(t => t.done),...tasks.filter(t => !t.done)] as todo (todo._id)}
      <div animate:flip={{delay:200}} in:fadeUp={{duration:200}} out:fade={{duration:200}} class="w-full flex items-center gap-x-3 justify-center"  >
        <Todoitem details={todo} {processDeletedItem} {processCheckedItem} />
      </div>
    {/each}
  </div>
</article>
