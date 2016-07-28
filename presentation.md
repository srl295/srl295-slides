layout: true

<div class="bottom">NodeSummit 2016 SF — <a href="https://srl295.github.io">@srl295</a></div>
---
_background-image: url(img/node1.png)
class: center, middle, whitedrop


.centersml[![Node Logo](img/Intl.png)]

# `Intl` as in Internationalization
### Tools for Global Node.js Applications
&nbsp;
#### Steven R. Loomis, IBM
???
Welcome to this presentation on Node internationalization
---

# About me

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
--

 - Rep: [Unicode TC](http://unicode.org/consortium/utc.html)
 - Chair: [ULI-TC](http://unicode.org/uli)
 - Participant: [CLDR-TC](http://unicode.org/cldr) 
???
--

 - Participant: [ICU-TC](http://icu-project.org) (IBM’s lead for C/C++)
???
I'm IBM’s technical lead for the C/C++ side of ICU, which we will discuss more
--

- Node
  - [Intl WG](https://github.com/nodejs/Intl) Facilitator
  - CTC Observer

---

# Agenda

- Background of Intl in node
- APIs
- Future
- Libraries
- Front-end, IoT
- Q&A

---

# ECMA-262/ECMA-402

- ECMA-262: ECMAScript language
 - Often called JavaScript
 - Specifies Unicode text even in 1st ed (1997)
--

- [ECMA-402](https://github.com/tc39/ecma402): `Intl` API
 - _Optional_
 - 1st Ed. 2010… 3rd Ed 2016

---

# Intl in Node.js

- Unicode support / `Intl` implementation from v8
 - Uses [ICU](http://icu-project.org)
 - (English by default for space)
--

- 2015: v0.12+ downloads: `Intl` available by default
--

- 2016: v6.x+: source tree builds `Intl` by default.
--


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
--


<pre class='i18n-dates' ></pre>
---

# `Number`
--

- ~~`Number().toString()`~~
--


<tt class='i18n-numbers' ></tt>

---

# `String`

- ~~`'a' < 'b'`~~
--

- ~~`'a' === 'b'`~~
--

- ~~`'A'.toLowerCase() === 'a'.toLowerCase()`~~
--

- `"abc".localeCompare("ábc")`
--

- `"u¨".normalize("NFC")			=== "ü"`
--

- `"i".toLocaleUpperCase()` / `"I".toLocaleLowerCase()`
--

 - _coming soon to a v8 near you_
 - API available today
---

# Locale Parameter

--
- `new Date().toLocaleDateString()` // "default"

--
- `new Date().toLocaleDateString('es-US')` // "Hard Coded Locale"

--

- Server Side?
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

- `npm install full-icu` to get full data, or rebuild Node.

---

# Intl working group

https://github.com/nodejs/Intl
.gftt[![Intl Logo](img/Intl.png)]
- Functionality &amp; compliance (standards: ECMA, Unicode…)
- Support for Globalization and Internationalization issues that come up in the tracker
- Guidance and Best Practices
- Refinement of existing Intl implementation

---

# ECMA-402 process

- Collaborate: https://github.com/tc39/ecma402/

---

# EMCA-402 future

## General trend: 
- “low level” support vs “high level” formatters

## Upcoming:
- Format to Parts
- Plural Rules
- Locale Info

## In the Future:
- MessageFormat and other Formatters
???

TODO:  add one liners explaining FTP and why MessageFormat is future

---

# Challenges/What's next

- data size/ stability
 - even better discoverability
- ECMA compliance
- documentation and best practices

---

# Node libraries

- [g11n-pipeline](https://github.com/IBM-Bluemix/gp-js-client)
 - load translations from RESTful service
```
mybundle.getStrings({ languageId: 'es'}, …)
    => { hello: '¡hola!', goodbye: '¡adiós!' }
```
 - [Intl.js](https://github.com/andyearnshaw/Intl.js)
  - polyfill of latest ECMA-402 features
 - [cldr.js](https://github.com/rxaviers/cldrjs)
  - access to full CLDR data


---

# The front-end landscape

- In July 2016 - pretty good
 - `Intl` support in "most" browsers (if you count Safari Tech Preview)

---

# The IoT landscape

- node builds tested with cross-platform build
- build node with `--without-intl` (pre v.6: `--with-intl=none`) to disable Intl

---
layout: false

# Thanks/Q&A

- Social: @srl295
- Slides/Contact:  https://git.io/srl295
- Email: `srloomis` <i>@</i>  `us.ibm.com`
- Mozilla Dev Network- Intl: 
.shortlink[[mzl.la/1OSOtvf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)]
- Node Intl WG:   http://github.com/nodejs/Intl 

.bottom[made with [remark.js](http://remarkjs.com) • fork me on [GitHub](https://github.com/srl295/srl295-slides/tree/2016-07-NodeSummit)]
