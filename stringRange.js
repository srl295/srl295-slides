/** 
 * Take a string like 'fub fud~f' into ['fub','fud','fue','fuf'] 
 * See: http://www.unicode.org/reports/tr35/#String_Range
 **/
function stringRangeToArray(str) {
    return str.split(' ').map(w => {
        w = w.trim();
        if (w === '') return null;
        w = w.split('~');
        if (w.length === 1) return w;
        const y = w[1];
        const x = w[0];
        const s = x.substr(x.length - y.length);
        const p = x.substr(0, x.length - s.length);

        var r = [];
        if (y.length == 1) {
            // Loop throuh P+S … P+Y
            for(var i=s.codePointAt(0); i <= y.codePointAt(0); i++) {
                r.push(p + String.fromCodePoint(i));
            }
        } else {
            // CLDR validity data only has the form ab~c
            throw new Error('Unimplemented: y of size >1');
        }
        return r;
    }).reduce((t, v) => {
        // merge all of the arrays
        if(v) t = t.concat(v);
        return t;
    },[]);
}

// console.dir(stringRangeToArray('  a b cc d'));
// console.dir(stringRangeToArray('  fub fud~f '));
