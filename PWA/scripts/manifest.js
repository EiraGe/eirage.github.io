var myDynamicManifest = {
    name: "App name",
    short_name: "short",
    start_url: "https://rocky-bird-hurricane.glitch.me/",
    scope: "https://rocky-bird-hurricane.glitch.me/",
    background_color: "#000000",
    theme_color: "#0f4a73",
    display: "standalone",
    icons: [
      {
        src: "https://cdn.glitch.global/47d0beff-5ce8-4100-bbba-d262d86aa082/icon.png?v=1676299860418",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  const stringManifest = JSON.stringify(myDynamicManifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  document
    .querySelector("#my-manifest-placeholder")
    .setAttribute("href", manifestURL);