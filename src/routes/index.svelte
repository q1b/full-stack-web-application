<script lang="ts">
  import type { Todo } from "$lib/todo.type";
  import { flip } from "svelte/animate"
  import { fade } from "svelte/transition";
	function fadeUp(node, { duration, delay }) {
		return {
			duration,
      delay,
			css: (t,u) => {				
				return `
            opacity: ${t};
						transform: scale(${t}) translateY(${u * 70}px);
					`
			}
		};
	}

  import Todoitem from "$lib/components/Todoitem.svelte";
  import Input from "$lib/components/Input.svelte";
  import { genTask } from "$lib/helper/index"
import { onMount } from "svelte";

  let inputRef: HTMLInputElement;
  let tasks: Todo[] = [];
  let addToTasks = ( task: Todo ) => {
    tasks = [task,...tasks];
  }
  let updateTasks = ( newTasks: Todo[] ) => {
    tasks = [...newTasks];
  }
  
  onMount(()=>{
    let storedTasks = JSON.parse(localStorage.getItem('FUL_TASKS')) ?? [];
    tasks = storedTasks;
    updateTasks = ( newTasks: Todo[] ) => {
      tasks = [...newTasks];
      localStorage.setItem('FUL_TASKS',JSON.stringify(tasks));
    }
    addToTasks = ( task: Todo ) => {
      tasks = [task,...tasks];
      localStorage.setItem('FUL_TASKS',JSON.stringify(tasks));
    }
  })

  function addTask() {
    let task:Todo = genTask(inputRef.value);
    inputRef.value = '';
    addToTasks(task);
  }
  
  function deleteTask( _id:string ){
    let temp:Todo[] = []
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if( element._id === _id ) continue
      temp = [element,...temp];
    }        
    updateTasks(temp);
  }

  function updateTask( _id: string ){
    let temp:Todo[] = []
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if( element._id === _id ) {
        element.done = !element.done
      }
      temp = [element,...temp];
    }
    updateTasks(temp);
  }
</script>

<article class="w-full px-10 grid grid-cols-6 gap-y-6 place-items-center">
  <Input bind:inputRef on:enter={()=>{
    addTask()
  }} on:add={()=>{ addTask() }} />
  <div class="mt-10 col-span-full flex w-full flex-col items-center gap-y-6">
    {#each tasks as todo (todo._id)}
      <div animate:flip in:fadeUp={{duration:200,delay:200}} out:fade={{duration:200}} class="w-full flex items-center gap-x-3 justify-center">
        <Todoitem 
          details={todo}
          on:complete={()=>{ updateTask( todo._id ) }}
          on:remove={()=>{ deleteTask( todo._id ) }}
          on:undone={()=>{ updateTask( todo._id ) }}
        />
      </div>
    {/each}
  </div>
</article>