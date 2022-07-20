module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/img/");
  eleventyConfig.addPassthroughCopy("./src/*.js");
  eleventyConfig.addPassthroughCopy("./src/*.css");
  eleventyConfig.addWatchTarget("./src/styles/");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
