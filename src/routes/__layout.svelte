<script lang="ts">
  import 'uno.css'
  import '@unocss/reset/tailwind.css'
  import MetaData from "$lib/components/metaData.svelte"
</script>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <MetaData content={{
    title:"Todo app",
    description:"I am working on this project in order to get a real life experience out of a project, and also for fun",
    imageSrc:"/og_image.jpg",
    imageAlt:"Todo_app for scale up, raise up"
  }} />
</head>
<body class="">
  <main class="z-10 relative flex flex-col items-center gap-y-10 pt-10">
    <h1 class="font-code text-7xl font-bold bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent leading-snug">Todo App</h1>
    <slot/>
  </main>
  <div style="mask-image:linear-gradient(180deg, white, rgba(255,255,255,0));background-image: url(/img/grid.svg);" class="absolute inset-0 bg-center"></div>
  <!-- <p class="font-code fixed bottom-4 left-4 font-bold bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent leading-snug">made with sveltekit MongoDb. </p> -->
</body>
</html>