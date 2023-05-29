var myDynamicManifest = {
    name: "Test App",
    short_name: "Test",
    start_url: ".",
    scope: ".",
    background_color: "#000000",
    theme_color: "#0f4a73",
    display: "standalone",
    icons: [{
      "src": "/images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  };
  const stringManifest = JSON.stringify(myDynamicManifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  document
    .querySelector("#my-manifest-placeholder")
    .setAttribute("href", manifestURL);