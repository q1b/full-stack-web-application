<script lang="ts">
  import type { Todo } from "$lib/todo.type";
  import UnCompleteBtn from "./btns/undone.svelte";
  import CompleteBtn from "./btns/complete.svelte";
  import RemoveBtn from "./btns/remove.svelte";
  export let details : Todo;
</script>

{#if details.done}
  <UnCompleteBtn on:undone />  
{:else}
  <CompleteBtn on:complete />
{/if}

<div
  class="{details.done ? 'bg-green-300 line-through' : 'bg-sky-300'} transition-color  flex flex-wrap items-center font-medium tracking-wider text-sky-800 border-2 focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full rounded-lg p-2"
>
  {details.task}
</div>

<RemoveBtn on:remove />

