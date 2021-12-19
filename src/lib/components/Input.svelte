<script lang="ts">
  import AddBtn from "$lib/components/btns/add.svelte";
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher(); 
  export let inputRef;
</script>
  <div
    class="w-full col-span-full flex items-center gap-x-3 justify-center"
  >
    <div class="w-7" />
    <input
      bind:this={inputRef}
      on:keypress={(e)=>{
       switch(e.code){
          case "Enter":
            dispatch('enter');
          break;
          default:
            break;
       };
     }}
      type="text"
      name="task"
      aria-label="add a todo"
      placeholder="+ Add todo"
      class="placeholder:text-slate-300 font-code text-slate-900 bg-white border-2 font-medium focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full h-10 rounded-lg px-2"
    />
    <AddBtn on:add />
</div>