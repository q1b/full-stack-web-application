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
<body>
  
</body>
</html>
<slot/>
