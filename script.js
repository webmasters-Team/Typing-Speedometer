window.addEventListener("load",app);

function app() {
	var oldStrLen = 0,
		charsEachSec = [],
		getWPM = () => {
			let arrow = document.querySelector(".arrow"),
				display = [
					document.getElementById("h"),
					document.getElementById("t"),
					document.getElementById("o"),
				],
				strLen = document.querySelector("textarea").value.length,
				wpm = 0;

			// unless field is cleared, get WPM based on average characters typed per second
			if (strLen > 0) {
				let charsDurSec = strLen - oldStrLen,
					charSum = 0,
					wordLen = 5,
					maxWords = 60;

				charsEachSec.push(charsDurSec);

				// use last n words for average
				if (charsEachSec.length > maxWords)
					charsEachSec.shift();

				for (var c of charsEachSec)
					charSum += c;

				// calculate WPM
				let avgChars = charSum / charsEachSec.length,
					wps = avgChars / wordLen,
					wpmCalc = Math.round(wps * 60),
					hardLimit = 999;

				if (wpmCalc > 0 && wpmCalc <= hardLimit)
					wpm = wpmCalc;
				else if (wpmCalc > hardLimit)
					wpm = hardLimit;

			} else {
				charsEachSec = [];
			}

			// make old string length equal to newest one before calculating WPM again
			oldStrLen = strLen;

			// set ceiling for and rotate arrow
			let maxWpm = 120,
				arrowWpm = wpm < maxWpm ? wpm : maxWpm;

			arrow.style.transform = "rotate(" + ((arrowWpm * 2) - 120) + "deg) translateY(-72%)";

			// make WPM string, clean digits, redisplay digits
			let wpmStr = wpm.toString();

			for (var d of display)
				d.className = "_";

			for (var i in wpmStr)
				display[display.length - 1 - i].className = "_" + wpmStr[wpmStr.length - 1 - i];
		};
	
	// runtime loop
	var run = () => {
		getWPM();
		setTimeout(run,1e3);
	};
	run();
}