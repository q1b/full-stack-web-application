<script lang="ts">
  import { enhance } from "$lib/actions/enhance";
  import type { Todo } from "$lib/todo.type";
  import UnCompleteBtn from "./btns/undone.svelte";
  import CompleteBtn from "./btns/complete.svelte";
  import RemoveBtn from "./btns/remove.svelte";
  export let details : Todo;
  export let processDeletedItem;
  export let processCheckedItem;
  let isRemoving;
</script>

<form action="/todos/{details._id}.json?_method=patch" method="post" use:enhance={{ result:processCheckedItem }} >
  <input type="hidden" name="done" value="{ details.done ? '' : 'true' }" />
  {#if details.done}
  <UnCompleteBtn />  
  {:else}
  <CompleteBtn />
  {/if}
</form>

<div
  class="{details.done ? 'bg-green-300 line-through' : 'bg-sky-300'} transition-color  flex flex-wrap items-center font-medium tracking-wider text-sky-800 border-2 focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full rounded-lg p-2"
>
  {details.task}
</div>

<form action="/todos/{details._id}.json?_method=delete" method="post" on:submit|preventDefault|once={()=>{isRemoving=true}} use:enhance={{result:processDeletedItem}}>
  <RemoveBtn bind:isRemoving  />
</form>
