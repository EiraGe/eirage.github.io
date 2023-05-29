var myDynamicManifest = {
    name: "Test App",
    short_name: "Test",
    start_url: "https://pwa.eirage.com/Install/index.html",
    scope: "https://pwa.eirage.com/Install/",
    background_color: "#000000",
    theme_color: "#0f4a73",
    display: "standalone",
    icons: [{
      "src": "https:/pwa.eirage.com/images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "https:/pwa.eirage.com/images/icon-512x512.png",
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