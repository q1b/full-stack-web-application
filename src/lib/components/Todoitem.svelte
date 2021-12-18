<script lang="ts">
  import type { Todo } from "$lib/todo.type";
  import UnCompleteBtn from "./btns/undone.svelte";
  import CompleteBtn from "./btns/complete.svelte";
  import RemoveBtn from "./btns/remove.svelte";
  export let details : Todo;
</script>

<form action="/todos/{details._id}.json?_method=patch" method="post">
  <input type="hidden" name="done" value="{ details.done ? '' : 'true' }" />
  {#if details.done}
  <UnCompleteBtn />  
  {:else}
  <CompleteBtn />
  {/if}
</form>

<div
  class="{details.done ? 'bg-green-300 line-through' : 'bg-sky-300'}  flex flex-wrap items-center font-medium tracking-wider text-sky-800 border-2 focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full rounded-lg p-2"
>
  {details.task}
</div>

<form action="/todos/{details._id}.json?_method=delete" method="post">
  <RemoveBtn />
</form>
