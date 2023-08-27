const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('index.js')
	eleventyConfig.addPassthroughCopy('bundle.css')
	eleventyConfig.addPassthroughCopy('prism-rose-pine-main-alt.css')
	eleventyConfig.addPassthroughCopy('posts/**/*.png')

	eleventyConfig.addPlugin(syntaxHighlight)

	const markdownItOpts = {
		html: true,
		xhtmlout: true,
	}
	eleventyConfig.setLibrary('md', markdownIt(markdownItOpts))
}

