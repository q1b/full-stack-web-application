<script lang="ts">
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();
</script>
<button on:click={()=>{ dispatch('add') }} class="relative group">
  <svg xmlns="http://www.w3.org/2000/svg" class="inactive-svg text-sky-500" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" class="frontsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <!---->
</button>