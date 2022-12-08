# JBuild

## Installation
To install this repository...
1. `git clone https://github.com/joejuma/jbuild.git` to clone a local version of this repository.
2. `cd` into the repository.
3. (Optional) `npm install` to install the dependencies if you want to build standalone executables.
4. You should be all set!

## Usage

### Development
If you've installed this repo as per the above instructions...
1. `npm run dev ./path/to/entrypoint.js ./path/to/output.js`
    * `entrypoint.js` is the entrypoint for your JavaScript program.
    * `output.js` is what you want the bundled file to be named.
2. It should now show some text as it analyzes your project, and you're all set!
3. The bundled file should be found wherever the output path you provided is.

### Build
If you want to build a standalone executable once you've done all of the installation instructions...
1. `npm run build`
    * It should now take a moment.
2. A set of executables for macos, linux and windows should now be located in the `dist` directory.
3. You're all set to use it as a standalone executable using similar syntax as under `Development`. 
    * For example (on Windows): `./jbuild-win.exe ./path/to/entrypoint.js ./path/to/output.js`
    * `entrypoint.js` is the entrypoint for your JavaScript program.
    * `output.js` is the bundle name you wish for the output.

## About
### What is it?
A JavaScript code bundler with simple web JavaScript in mind.

### What does it do?
Takes multi-file JavaScript projects and merges the code together into a single file. That's all it does: no name mangling, no compression, no minification.

### Where & When to use it?
If you want to use multiple files to create a JavaScript library that can be used in a website via the `<script type="text/javascript">` tag, just like how basic web libraries like jQuery are used or all of JavaScript behaved prior to 2011.

### When NOT to use it?
* You just want to verbatim smash all your JavaScript files together into one. Use Bunchee instead.
* You want to compile a multi-file JavaScript project into a single-file module that's loaded using `<script type="module">`. Use Browserify or ESBuild instead.
* You want to create a complex blob-file that is used to deploy an application and can have a large variety of different assets compiled into it. Use WebPack in that case.

### Why was it made?
Frustration. Other JavaScript bundlers created unnecessary complexities to have a simple web library. These alternatives were more focused on bundled blob-files for monolithici web applications, or didn't properly strip node-only JS when bundling for web. There was no solution if you just wanted a web library with no major hassle. I personally felt that if I needed to have a bundler and static-server running to load modules that had limited scope in a web-page that it was too many parts when I could just bundle down the files and load them using a script tag.