# JBuild

## Installation
Work in progress. An NPM repository and/or compiled executable is not yet produced. Therefore you can `git clone https://github.com/joejuma/jbuild.git` to install the locale repository which can be used by following the "development" usage instructions below.

## Usage

### Development
If you've installed this repo, ```npm run dev ./path/to/entrypoint.js ./path/to/output.js``` where "entrypoint.js" is the start of your program, and "output.js" is the output location you want the bundled file.

### Release
If you've installed the released tool, ```jbuild ./path/to/entrypoint.js ./path/to/output.js``` with "entrypoint.js" as the start of your program, and "output.js" as the output location you want the bundled file. This behavior is not currently supported as a bundled output executable has not been built.

## About
### What is it?
A JavaScript bundler designed with making JavaScript libraries for use in webpages.

### What does it do?
Takes multi-file JavaScript projects and merges their code together into a single file. That's all it does: no name mangling, no compression, no minification.

### Where & When to use it?
If you want to use multiple files to create a JavaScript library that can be used in a website via the `<script type="text/javascript">` tag, just like how basic web libraries like jQuery are used or all of JavaScript behaved prior to 2011.

### When NOT to use it?
* You just want to verbatim smash all your JavaScript files together into one. Use Bunchee instead.
* You want to compile a multi-file JavaScript project into a single-file module. Use Browserify or ESBuild instead.
* You want to create a complex blob-file that is used to deploy an application and can have a large variety of different assets compiled into it. Use WebPack in that case.

### Why was it made?
Other JavaScript bundlers created annoying unnecessary complexity to bundle simple web libraries. These alternatives were more focused on bundled blob-files for monolithic deployed web applications *only* or didn't properly strip node-only JS when bundling for the web. There was no solution if you just wanted a web library with no major hassle.