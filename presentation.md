layout: true

<div class="bottom">FEISGILTT @ LocWorld35 • Nov 1<sup>st</sup>, 2017 — 
<a href="https://srl295.github.io">@srl295</a></div>
---
_background-image: url(img/node1.png)
class: center, middle, whitedrop


.centersml[![Intl](img/ulilogo.png)]
## Unicode Localization Interoperability

&nbsp;
#### Steven R. Loomis, IBM
#### @srl295 | srloomis@us.ibm.com
---

# About Me…

--
- IBM Global Foundations Technology Team
???
We make the technologies and best practices IBM needs to support a global audience.
--

 - [Globalization Pipeline](https://developer.ibm.com/open/ibm-bluemix-globalization-pipeline-service/) — REST API to MT/HT
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

# Segmentation Exceptions: Problem

- Issue alluded to in Ján’s presentation
--

- “Hello Mr. Smith”: Per Unicode:
  - `Hello Mr.`
  - `Smith`

---

# Segmentation Exceptions: Solution

- Exception data
--

  - “Don’t break after Mr./Mrs./Ms./Ph.D.…”
--

  - DBPedia extracted terms
--

  - Compared against private corpora
--

  - in [CLDR](http://cldr.unicode.org), implmented in [ICU](http://icu-project.org)
--

  - BCP47:  `en`
--

**`-u-ss-standard`**

---

# `en.xml` (CLDR)

```xml
<ldml>
<identity>
<version number="$Revision$"/>
<language type="en"/>
</identity>
<segmentations>
<segmentation type="SentenceBreak">
<!-- From ULI data, http://uli.unicode.org -->
<suppressions type="standard">
<suppression>L.P.</suppression>
<suppression>Alt.</suppression>
<suppression>Approx.</suppression>
<suppression>E.G.</suppression>
<suppression>O.</suppression>
<suppression>Maj.</suppression>
```
---

# `it.xml` (CLDR)

```xml
<ldml>
<identity>
<version number="$Revision$"/>
<language type="it"/>
</identity>
<segmentations>
<segmentation type="SentenceBreak">
<!-- From ULI data, http://uli.unicode.org -->
<suppressions type="standard">
<suppression>N.B.</suppression>
<suppression>div.</suppression>
<suppression>a.C.</suppression>
<suppression>fig.</suppression>
<suppression>d.p.R.</suppression>
<suppression>c.c.p.</suppression>
<suppression>Cfr.</suppression>
```

---

# ICU C/J [FilteredBreakIterator](http://icu-project.org/apiref/icu4c/classicu_1_1FilteredBreakIteratorBuilder.html)

```c
suppressBreakAfter(u"Abbr");
```

---

# Rejected Proposal: Segmentation Exceptions
--

- Rejected by UTC (Unicode-TC)
--

- Rejected by ICU-TC
--

- Idea: `Hello, Dr.× Smith`
--

- special char to prevent break
--

## Status: will be ICU sample code 
  - [ICU#13317](http://bugs.icu-project.org/trac/ticket/13317)

---

# Publicly Available Specifications

- GMX-V 1.0
- SRX 2.0

---

# Word Count

- forthcoming document (Jan 2018)

---

# Pluralization

- investigating OMOS and TAPICC
- Semantic metadata?

---

# Segmentation markers for MT

--

- Use XLIFF!
---

# Liason / Participation

---
layout: false

# Thanks/Q&A

- Social: @srl295
- Slides/Contact:  https://git.io/srl295
  - [What you can make of LOD and ULI](https://www.slideshare.net/MarcoFossati/what-you-can-make-out-of-linked-data)
- Email: `srloomis@us.ibm.com`
- ULI-TC: https://unicode.org/uli
  - Liason report to UTC: [L2/17-402](https://www.unicode.org/L2/L2017/17402-uli-liaison-rept-oct-2017.pdf)
  - PAS: http://unicode.org/uli/pas/
  - Github: [unicode-org/uli-docs](https://github.com/unicode-org/uli-docs)

.bottom[made with [remark.js](http://remarkjs.com) • fork me on [GitHub](https://github.com/srl295/srl295-slides/tree/2017-10-17-iuc41-nodeintl)]
