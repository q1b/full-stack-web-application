<script lang="ts">
  import type { Todo } from "$lib/todo.type";
  import { flip } from "svelte/animate"
  import { fade } from "svelte/transition";
	function fadeUp(node, { duration,delay }) {
		return {
			duration,
      delay,
			css: (t,u) => {				
				return `
            opacity: ${t};
						transform: scale(${t}) translateY(${u * 70}px);
            `
          },
        };
      }
  let inputRef:HTMLInputElement;
  import AddBtn from "$lib/components/btns/add.svelte";
  import Todoitem from "$lib/components/Todoitem.svelte";
import { onMount } from "svelte";

  function genId(){
    return  '_' + Math.random().toString(36).substr(2, 9)
  }

  let tasks: Todo[] = [];

  let updateTasks = (newTasks) => {
    tasks = [...newTasks];
  }
  let addTask = (newTask) => {
    tasks = [newTask,...tasks];
  }
  onMount(()=>{
    tasks = JSON.parse( localStorage.getItem('FUL_TASKS') ) ?? [];

    updateTasks = ( newTasks:Todo[] ) => {
      tasks = [...newTasks];
      localStorage.setItem('FUL_TASKS',JSON.stringify(tasks));
    }
    
    addTask = ( newTask:Todo ) => {
      tasks = [...tasks,newTask];
      localStorage.setItem('FUL_TASKS',JSON.stringify(tasks));
    }
  }) 

  const addItem = () => {
    let temp:Todo = {
      _id: genId(),
      created_on:new Date(),
      done:false,
      priority:1,
      task: inputRef.value
    };
    inputRef.value = '';
    addTask(temp);
    // tasks = [temp,...tasks];
  }

  const removeItem = ( _id: string ) => {
    let temp = []; 
    for (var i = tasks.length - 1; i >= 0; i--) {
     if ( tasks[i]._id === _id ) continue
      temp = [tasks[i],...temp]
    }
    updateTasks(temp);
    // tasks = [...temp];
  }

  const updateItem = (_id:string) =>  {
    let temp:Todo[] = []; 
    for (var i = tasks.length - 1; i >= 0; i--) {
      if ( tasks[i]._id === _id ) {
        temp = [ {
          _id:tasks[i]._id,
          created_on: tasks[i].created_on,
          priority:tasks[i].priority,
          task:tasks[i].task,
          done: !tasks[i].done
        },
        ...temp]
        continue
      }
      temp = [tasks[i],...temp]
    }
    updateTasks(temp)
  }

</script>

<article class="w-full px-3 grid grid-cols-6 gap-y-6 place-items-center">
  <div class="w-full col-span-full flex items-center gap-x-3 justify-center">
    <div class="w-7" />
    <input
      bind:this={inputRef}
      on:keypress={(e)=>{
        switch (e.code) {
          case 'Enter':
            addItem();
            break;
          default:
            break;
        }
      }}
      type="text"
      name="task"
      aria-label="add a todo"
      placeholder="+ Add todo"
      class="placeholder:text-slate-300 font-code text-slate-900 bg-white border-2 font-medium focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full h-10 rounded-lg px-2"
    />
    <AddBtn on:add={addItem} />
  </div>

  <div class="mt-4 col-span-full flex w-full flex-col gap-y-6">
    {#each [...tasks.filter(t => t.done),...tasks.filter(t => !t.done)] as todo (todo._id)}
      <div animate:flip in:fadeUp={{duration:200,delay:200}} out:fade={{duration:200}} class="w-full flex items-center gap-x-3 justify-center"  >
        <Todoitem details={todo}
          on:remove={()=>{ removeItem(todo._id) }}
          on:complete={()=>{ updateItem(todo._id) }} 
          on:undone={()=>{ updateItem(todo._id) }}
        />
      </div>
    {/each}
  </div>
</article>
