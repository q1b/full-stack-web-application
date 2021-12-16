<script lang="ts">
  const SITE = {
    title: "Astro Documentation",
    description: "Build faster websites with less client-side Javascript.",
  };

  const OPEN_GRAPH = {
    locale: "en_US",
    image: {
      src: "/ogImage.jpg?v=1",
      alt: "explore the space" + "explore the nature",
    },
    twitter: "XSukhpreet",
  };

  import { page } from "$app/stores";

  interface Props {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  }

  export let content: Props;
  // let canonicalURL:string;

  let canonicalURL = "https://" + $page.host + $page.path;
  const canonicalImageSrc = canonicalURL + content.imageSrc;
</script>

<svelte:head>
  <title>{content.title}</title>

  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png">
  <link rel="manifest" href="/favicon_io/site.webmanifest">

  <link rel="canonical" href={canonicalURL} />
  <!-- Google fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital@1&family=Jua&family=Nunito:ital,wght@0,500;1,500&family=Skranji&display=swap"
    rel="stylesheet"
  />
  <!-- OpenGraph Tags -->
  <meta property="og:title" content={content.title ?? SITE.title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:locale" content={OPEN_GRAPH.locale} />
  <meta property="og:image" content={canonicalImageSrc} />
  <meta property="og:image:alt" content={content.imageAlt} />
  <meta
    name="description"
    property="og:description"
    content={content.description ? content.description : SITE.description}
  />
  <meta property="og:site_name" content={SITE.title} />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={OPEN_GRAPH.twitter} />
  <meta name="twitter:title" content={content.title ?? SITE.title} />
  <meta
    name="twitter:description"
    content={content.description ? content.description : SITE.description}
  />
  <meta name="twitter:image" content={canonicalImageSrc} />
  <meta name="twitter:image:alt" content={content.imageAlt} />
</svelte:head>
