const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("prism-rose-pine-main-alt.css");
  eleventyConfig.addPassthroughCopy("posts/**/*.png");

  eleventyConfig.addPlugin(syntaxHighlight);
};
