Putting ICU to Work for IUC44, 2020-10-14-icuwork-s1t3
###

Presentation slides for the 44th [Internationalization and Unicode® Conference](https://www.unicodeconference.org/)

Author
===

[Steven R. Loomis—@srl295](https://github.com/srl295)

Sample Code
===

- [https://github.com/unicode-org/icu-demos.git](https://github.com/unicode-org/icu-demos/tree/iuc44/iucsamples) (`iuc44` tag)

Docker images used: (source code in this repo + <https://github.com/unicode-org/icu-docker.git>)
```shell
docker run --rm -it srl295/icu-demo:ubuntu
docker run --rm -it srl295/icu-demo:fedora-j
```

Abstract
===

>This tutorial gives attendees everything they need to know to get started with working with Unicode text in computer systems using the International Components for Unicode library (ICU). ICU is a very popular internationalization solution, and is hosted by Unicode itself. While it vastly simplifies the internationalization of products, there can be a learning curve.
>
>The goal of this tutorial is to help new users of ICU install and use the library. The tutorial will walk through code snippets and examples to illustrate common usage models, followed by demonstration applications and discussion of core features and conventions, advanced techniques and how to obtain further information. It is helpful if participants are familiar with Java, C, or C++ programming. Issues relating to ICU4C/C++ as well as ICU4J (Java) will be discussed. After the tutorial, participants should be able to install and use ICU for solving their internationalization problems.
>
>Topics include: Installation (C++ libraries, Java .jar files, Java SPI for JDK integration), verification of installation, introduction and detailed usage analysis of ICU’s frameworks (normalization, formatting with the fluent API, calendars, collation, break iteration, Unicode properties, transliteration). We will also cover the packaging of ICU data, integrating ICU into an applications development process, and how to get involved in the ICU development community.


Hacking
===

- edit `presentation.md` ( see https://remarkjs.com )
- `npm run server`  will serve on http://127.0.0.1:1337
- **while the above server is running**, `npm run pdf` will export to `out.pdf`
- Note: on my mac I had to do `export PUPPETEER_EXECUTABLE_PATH=/Applications/Chromium.app/Contents/MacOS/Chromium` first

Thanks
===
Past editor: Shane Carr

-----
[`bit.ly/iuc44-icu`](http://bit.ly/iuc44-icu) redirects here.
