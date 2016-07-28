

var SHORT_BLINK = 5000;
var TINY_BLINK = 2000;

// Bunch o' numbers
var NUM_LOCLIST = [
    'en',
    'gu-u-nu-gujr',
    'en-u-nu-roman',
    'ar',

    'et-u-nu-ethi',
    'he-u-nu-hebr',
    'mn-u-nu-mong',
    'ja-u-nu-hant'
];

// 
$(function() {
    function forea(x, y) {
        var a = $(x);
        if(!a || a.length === 0) {
            console.log('None: ' + x);
        } else {
            for(var k=0;k<x.length;k++) {
                y(a[k]);
            }
        }
    }
    var n =0;
    var doWhat = function() {
        n++;
        // console.log(n);
        forea('.i18n-numbers', function(x) {
            if(x) {
                $(x).text(doEval(
                    "new Number(2016).toLocaleString('"+NUM_LOCLIST[n%NUM_LOCLIST.length]+"')"
                ));
            } 
        });
    };
    doWhat(); // once
    window.setInterval(doWhat, TINY_BLINK);
});


// Bunch o' numbers
var DATE_LOCLIST = [
    'en',
    'ja-u-ca-japanese',
    'he-u-nu-hebr-ca-hebrew',
    'mt'
];

// 
$(function() {
    function forea(x, y) {
        var a = $(x);
        if(!a || a.length === 0) {
            // console.log('None: ' + x);
        } else {
            for(var k=0;k<x.length;k++) {
                y(a[k]);
            }
        }
    }
    var n =0;
    var doWhat = function() {
        n++;
        // console.log(n);
        forea('.i18n-dates', function(x) {
            if(x) {
                $(x).text(doEval(
                    "new Date().toLocaleString('"+DATE_LOCLIST[n%DATE_LOCLIST.length]+"')\n"
                ) + '\n\n' +
                doEval(
                    "new Date().toLocaleDateString('"+DATE_LOCLIST[n%DATE_LOCLIST.length]+"',\n {month:'long', day: 'numeric', year: 'numeric'})\n"
                ) + '\n\n' +
                doEval(
                    "new Date().toLocaleTimeString('"+DATE_LOCLIST[n%DATE_LOCLIST.length]+"')\n"
                ) + '\n'  );
            } 
        });
    };
    doWhat(); // once
    window.setInterval(doWhat, TINY_BLINK);
});

function doEval(x) {
    return x+ ' //' + eval(x);
};


// 1. change all the slide numbers into localized
$(function(){
       var allNumbers = document.getElementsByClassName('remark-slide-number');
       if(true) {
            // disabled
        } else if(!allNumbers) {
               console.log('No slide numbers');
       } else {
               for(var k=0;k<allNumbers.length;k++) {
                   console.log(k + '/' + NUM_LOCLIST.length);
//                     console.log(.textContent);
                       var n = allNumbers[k].childNodes[0];
                       var s = n.textContent.split('/');
                        var pageNo = Number(s[0]); // the page number
                        var inWhat = NUM_LOCLIST[pageNo % (NUM_LOCLIST.length)];
                       n.textContent = Number(s[0]).toLocaleString("en")+'/'+Number(s[1]).toLocaleString(inWhat);
                       allNumbers[k].setAttribute('title', inWhat);
               }
       }
});
// console.log(allNumbers.length);
// .childNodes[0].textContent
