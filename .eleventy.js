const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("dateISO", (d) =>
    new Date(d).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("dateReadable", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );

  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  eleventyConfig.addFilter("limit", (arr, n) =>
    Array.isArray(arr) ? arr.slice(0, n) : arr
  );

  eleventyConfig.addFilter("head", (arr, n) =>
    Array.isArray(arr) ? arr.slice(0, n) : arr
  );

  eleventyConfig.addFilter("slugify", (s) =>
    slugify(String(s), { lower: true, strict: true })
  );

  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    try {
      return new URL(path, base).toString();
    } catch (e) {
      return path;
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
