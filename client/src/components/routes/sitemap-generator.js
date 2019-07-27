require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./sitemap-routes");
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://cravejs.com")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();