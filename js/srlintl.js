// 1. change all the slide numbers into localized
$(function(){
	var allNumbers = document.getElementsByClassName('remark-slide-number');
	if(!allNumbers) {
		console.log('No slide numbers');
	} else {
		for(var k=0;k<allNumbers.length;k++) {
//			console.log(.textContent);
			var n = allNumbers[k].childNodes[0];
			var s = n.textContent.split('/');
			n.textContent = Number(s[0]).toLocaleString("hi")+'/'+Number(s[1]).toLocaleString("hi");
		}
	}
});
//console.log(allNumbers.length);
//.childNodes[0].textContent
