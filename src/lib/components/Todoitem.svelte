<script>
  import CompleteBtn from "./btns/complete.svelte";
  import RemoveBtn from "./btns/remove.svelte";
  export let value;
</script>

<form action="" method="">
  <input type="hidden" name="done" value="" />
  <CompleteBtn />
</form>
<div
  class="bg-sky-300  flex flex-wrap items-center font-medium tracking-wider text-sky-800 border-2 focus-within:scale-[1.01] focus-within:border-slate-500 focus:focus-within:outline-none transition-transform border-sky-50 max-w-lg w-full rounded-lg p-2"
>
  {value}  
</div>
<form action="" method="">
  <RemoveBtn />
</form>
