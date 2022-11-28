# JBuild

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

## Installation
Work in progress. I haven't built it yet, so I don't know how it will be installed yet. Ideally, ```npm install --save-dev jbuild```.  

## Usage
Hopefully, once it's ready: ```jbuild ./path/to/index.js ./path/to/outfile.js```