Riff 🎸
=======

This is a collection of TypeScript functions which I have carried with me over
the years as I have started playing more with it.

Story
=====

I wanted to build a sandbox to play more with TypeScript and WebAssembly so I
started building a dockerized container environment in the Summer of 2018.

I ended up shelving it for a while but then came back and found that dockerized
container environments make GREAT zero install dev environments. Everything set
up on a single command. The limitation being that on non-Linux based hosts you
cannot share the host networking configuration with the client.

However on Linux hosts this approach is ideal. I can put on my Python hat for
when I need 🐍, I can put on my Deno hat when I need EcmaScript 🦕. What I
ended up creating was a frontend/backend monolith repository for creating and
running WebAssembly modules running in a Deno powered Docker container (using
[this image](https://github.com/hayd/deno-docker)).

The organization of the project maximizes the shared code surface across both
the server and client.

Description by the Author
=========================

These are the patterns I have used many times across projects which eschew
frameworks in favor of re-usable composable functional (sometimes) patterns.

This is a gift. An application programing environment where everything is
potentially a function. Leading way to a more expressive programming paradigm.

Code Organization
=================

While Deno has no assumptions about a default filename to export files from the
unofficial standard is to export a `mod.ts` file from each directory.

**CONTENT_GOES_HERE**

TODO
====

This repository is unburdened by unit tests at present.

