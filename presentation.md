layout: true

<div class="bottom">41<sup>st</sup> Internationalization and Unicode Conference • Oct 17<sup>th</sup>, 2017 — 
<a href="https://srl295.github.io">@srl295</a></div>
---
_background-image: url(img/node1.png)
class: center, middle, whitedrop



.centersml[![Intl](img/Intl.png)]
## as in Internationalization:
### Tools for Global Node.js Applications
 
&nbsp;
#### Steven R. Loomis, IBM
???
NOTE: Hey you, yeah you! An `Intl` capable browser is needed.
I use Safari 10. 

TITLE: Intl as in Internationalization: Tools for Global Node.js Applications

ABSTRACT: 

Node.js has become a popular platform, using JavaScript on the server, or in other environments outside of its traditional role in web browsers. This presentation will discuss challenges, lessons learned, and the latest status in enabling and making use of the Intl (EcmaScript-402) module support in Node.js, current status and what's next for JavaScript and Node.js globalization, and discuss techniques and best practices for Unicode and international support in Node.js applications.


Welcome to this presentation on Node internationalization
I'd like to start with a quote
---
class: center, middle, whitedrop

## _“i18n becoming increasingly important to the global adoption of Node.js”_

### —
Rod Vagg (@rvagg), “The Future of Node.js”, July 2016
---

# About This Person…

--
- IBM Global Foundations Technology Team
???
We make the technologies and best practices IBM needs to support a global audience.
--

 - [Globalization Pipeline](https://developer.ibm.com/open/ibm-bluemix-globalization-pipeline-service/)
???
I work on our Globalization Pipeline service which is just out of Beta
this month, and a number of technologies which I'll be discussing today including
--

- [Unicode](http://unicode.org)
???
You all use Unicode. Go join Unicode. Go support Unicode, adopt your favorite code point.
--

 - IBM’s Rep: [Unicode TC](http://unicode.org/consortium/utc.html)
 - Chair: [ULI-TC](http://unicode.org/uli)
 - Participant: [CLDR-TC](http://unicode.org/cldr) 
???
--

 - Participant: [ICU-TC](http://icu-project.org)
--
<br><small>International Components for Unicode</small> 
--
<br><small>(IBM’s lead for C/C++)</small>
???
 we will discuss more
--

- Node
  - [~~Intl WG~~ _Intl Team_](https://github.com/nodejs/Intl) Facilitator
  - CTC Observer/Past member

---

# Agenda

- What is `Intl`?
- How do I get it?
- How do I use it?
- Where is it going?
- Are there other options?
- What about Front-end and IoT

---

# ECMA-262/ECMA-402

- ECMA-262: ECMAScript language
 - Often called JavaScript
 - Specifies Unicode text even in 1st ed (1997)
--

- [ECMA-402](https://github.com/tc39/ecma402): `Intl` API
 - _Optional_
 - 1st Ed. 2010… 3rd Ed 2016
 - 4th Ed in progress

~~~
There's a great session on ECMA-402 just after this one, so don't miss that.
---

# Intl in Node.js

- Unicode support / `Intl` implementation from v8
--

.rightsml[![Heavy Books](img/heavybooks.jpg)]
???
…and the heavy lifting is done by 
--

 - C++: [ICU](http://icu-project.org) 
--

 - [CLDR](http://unicode.org/cldr) data (English by default for space)
--

- 2015: v0.12+ downloads: `Intl` available by default
???
early in 2015 when v0.12 shipped…
--

- 2016: v6.x+: source tree builds `Intl` by default.
- Node kept up with latest ICU (backport where possible)

???
And now, ICU is included in the source tree- more on that later.
---

# API
???
Let’s dig in to what the `Intl` APIs look like
--

## `Intl`
--

- `new Intl.NumberFormat(…)` 
???
Formats Numbers
--

- `new Intl.DateTimeFormat(…)`
???
Formatting Dates
--

- `new Intl.Collator(…)`
???
Collating… and if you're not sure what this here's a hint
---

# [IBM 77 Collator](https://www-03.ibm.com/ibm/history/exhibits/vintage/vintage_4506VV4004.html)
.centerbig[![IBM Collator](img/1024px-IBM_077_collator_at_CHM.agr.jpg)]
###### By [ArnoldReinhold](https://commons.wikimedia.org/wiki/File:IBM_077_collator_at_CHM.agr.jpg) (Own work) [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0), via Wikimedia Commons
???
This is one of IBM’s earlier collators, which put a deck of cards in correct sequence
In 1937, we were a few years off from full Unicode support, but we did have globalization
support pretty early on.
---

# Familiar Objects
- `Date`
- `Number`
- `String`
???
You don't need to use the Intl object directly to make
use of these facilities though. Some familiar players have been extended also.
---

# `Date`
--

- ~~`Date().toString()`~~
???
So, instead of calling the familiar toString() when you want to get a date…
--

- `Date().toLocaleString()`
???
… call toLocaleString and friends
--

<pre class='i18n-dates' ></pre>
---

# `Number`
--

- ~~`Number().toString()`~~
???
Similarly, instead of just converting a number to a string…
--


<pre class='i18n-numbers' ></pre>

???
Use the internationalized version.
---

# `String`

???
And what about our friend, String?
--

- ~~`'a' < 'b'`~~
???
This is a binary compare - not for humans
--

- ~~`'ü' === 'ü'`~~
???
Node returns "false" here. (left hand string.length = 2), Unicode normalization form.
--

- ~~`'I'.toLowerCase() === 'ı'.toLowerCase()`~~
???
Again this takes a too simplistic approach.
--

- `"abc".localeCompare("ábc")`
???
gets it right.
--

- `('u' + '̈').normalize("NFC") // "ü"`
???
Now we can compare the strings above.
--

- `'I'.toLocaleLowerCase('tr') === 'ı'.toLocaleLowerCase('tr')`
--

- `'Πατάτα'.toLocaleUpperCase('el') === 'ΠΑΤΑΤΑ'`
--

- `'𐓰'.toUpperCase() === '𐓈'`
// (U+104f0/U+104c8 - Osage - Unicode 9)
---

# Locale Parameter

--

- `new Date().toLocaleDateString()` // "default"

???
This will use your default locale for your environment
--

- `new Date().toLocaleDateString('es-US')` // "Hard Coded Locale"

???
But you can choose a specific locale.
--

- 
--
Server Side?

???
But we're about servers here, so…
--


```js
var Negotiator = require('negotiator');

http.createServer(function(req, res) {
  new Date().toLocaleDateString(new Negotiator(req).languages());
});
```
--

 -  https://github.com/nodejs/Intl/issues/10

---

# `DateTimeFormat.formatToParts`

<p class='i18n-ftp' ></p>

---
class: center, ultrawhitedrop
background-image: url(img/heavybooks.jpg)

# Data Size

???
Several pounds of Unicode and linguistic resources.
Did not bring these in my backpack.
---

# Data Size

* `node`
--

 - about 25 MiB
???
just the binary
--

* ICU’s locale data
--

 - for 200 languages
--

 - about 25 MiB
???
Houston, we have sticker shock
---

# Packaging

- Download from https://nodejs.org
--

- Or `configure` from the repo
--
 `:+1:`
--

 - 25 MiB binary
--
, English only
--

 - full APIs
???
No extra download - ICU source included with Node.
--

- `npm install full-icu`
--

 - wombats download extra 25 MiB
--

 - follow the directions*
<pre>node --icu-data-dir=… app.js</pre>
--

 - Full ICU data support
--

- `./configure --with-intl=full-icu --download=all`
???
I guess Pythons download ICU’s full source
grab yourself a ${BEVERAGE}
--

 - Full ICU data support, baked in 
--
🍰
---

# process.versions

```json
{
    "http_parser": "2.7.0",
    "node": "9.0.0-pre",
    "v8": "6.1.534.42",
    "uv": "1.15.0",
    "zlib": "1.2.11",
    "ares": "1.13.0",
    "modules": "58",
    "nghttp2": "1.25.0",
    "openssl": "1.0.2l",
    "icu": "60.1",
    "unicode": "10.0",
    "cldr": "32.0",
    "tz": "2017b"
}```

---

# Intl working group
---

# ~~Intl working group~~ 
# Intl team

https://github.com/nodejs/Intl
.gftt[![Intl Logo](img/Intl.png)]
--

- Functionality &amp; compliance (standards: ECMA, Unicode…)
--

- Support for Globalization/Internationalization issues
--

- Guidance and Best Practices
--

- Refinement of existing Intl implementation
---

# ECMA-402 process

- TC39 meeting
--

- Collaborate: https://github.com/tc39/ecma402/
???
Jump in…
---

# ECMA-402 future

## General trend: 
- “low level” support vs “high level” formatters
???
a Date format is great. But the focus now is raw materials so first class support can be written.
---

## ECMA-402 Upcoming:
- [Format to Parts](https://github.com/tc39/ecma402/issues/30)
--

- Plural Rules
--

 - ~~You have 0 friend(s)~~
???
None of you here, because, hey, you showed up to hear me.
--

 - **`one`** You have one friend
--
, **`other`** You have 0 friend**s**
--
, **`other`** You have 16,777,216 friend**s**
???
So in English, we only need two different classes
--

 - English: 0 dogs, 1 dog, 2 dogs, 3 dogs, 4 dogs
--

 - Welsh: 0 cŵn, 
???
kun
--
1 ci, 
???
ki
--
2 gi, 
???
--
3 ci, 
???
--
4 ci
???
--

- Locale Info
???
What are the valid locale ids? how do you process them?
--

 - Canonical Locales, Locale info
--

 - for building your own lookups

---

## In the Future:
- MessageFormat and other Formatters
- BreakIterator (text segmentation)
???

---

# Node.js core

- [WHATWG URL Parser](https://nodejs.org/api/url.html#url_the_whatwg_url_api)
- [Transcode  API](https://nodejs.org/api/buffer.html#buffer_buffer_transcode_source_fromenc_toenc) / [WHATWG Encoding](https://nodejs.org/api/util.html#util_class_util_textdecoder)
- Error Translation

---

# Challenges/What's next

- data size/ data stability
???
Not to mention time zones
--

- <sup>*</sup>[even better discoverability](https://github.com/nodejs/node/issues/3460)
???
Here's the asterisk from earlier.
--

<pre>$ npm install full-icu
$ node app.js</pre>
???
And that’s it!
--

- ECMA compliance testing
???
Imagine that…
--

- documentation and best practices
???
As npm says, You need some help. 
---

# Node libraries

???
Intl API does not deal with messages / resources
--

- [g11n-pipeline](https://github.com/IBM-Bluemix/gp-js-client) — _REST service for translation_
--

```js
mybundle.getStrings({ languageId: 'es'}, …)
    => { hello: '¡hola!', goodbye: '¡adiós!' }
```
--

- [Intl.js](https://github.com/andyearnshaw/Intl.js)
   — _latest ECMA-402 features_
--

- [cldr.js](https://github.com/rxaviers/cldrjs)
   — _access to full CLDR data_
--


- [strong-globalize](https://www.npmjs.com/package/strong-globalize)
   — _tools for globalizing JS code and HTML templates_
???
IBM Strongloop, Tetsuo Seto, built on top of g11n-pipeline
---

# The front-end landscape
--

- … as of November 2016, great!
--
 `:+1:`
--

 - `Intl` support in _all_ browsers
???
Thanks Safari 10
--

- go use `Intl`
--
 (+ polyfills) 
---

# The IoT landscape

- node builds tested with cross-platform build
- build node with `--without-intl` (pre v.6: `--with-intl=none`) to disable Intl
--

 - more and more features turned off without ICU
---
layout: false

# Thanks/Q&A

- Social: @srl295
- Slides/Contact:  https://git.io/srl295
- Email: `srloomis` <i>@</i>  `us.ibm.com`
- Mozilla MDN Intl: 
.shortlink[[mzl.la/1OSOtvf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)]
- Node Intl WG:   http://github.com/nodejs/Intl 

.bottom[made with [remark.js](http://remarkjs.com) • fork me on [GitHub](https://github.com/srl295/srl295-slides/tree/2017-10-17-iuc41-nodeintl)]
