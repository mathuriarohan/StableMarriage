function initialize() {
	men = document.getElementById("nm").value;
	form = document.getElementById("preference");
	var counter = 0;
	form.innerHTML = "Input Male Preferences Here, with females numbered 0-" + (men - 1) + " <br>"
	for (var i = 0; i < men; i++) {
		form.innerHTML += i + " ";
		for (var j = 0; j < men; j++) {
			form.innerHTML += '<input type = "number" style = "width:30px;" class = "numInput" id ="a' + counter + '">';
			counter++;
		}
		form.innerHTML += "<br>"
	}
	form.innerHTML += "Input Female Preferences Here, with males numbered 0-" + (men - 1) + " <br>"
	for (var i = 0; i < men; i++) {
		form.innerHTML += i + " ";
		for (var j = 0; j < men; j++) {
			form.innerHTML += '<input type = "number" style = "width:30px;" class = "numInput" id ="a' + counter + '">';
			counter++;
		}
		form.innerHTML += "<br>"
	}
	form.innerHTML += '<input type = "submit" onClick = "pickUpData(); return false;">'
}

function pickUpData() {
	men = document.getElementById("nm").value;
	var malePref = new Array(men);
	var femalePref = new Array(men);
	var counter = 0;
	for (var i = 0; i < men; i++) {
		malePref[i] = new Array(men);
		for (var j = 0; j < men; j++) {
			malePref[i][j] = document.getElementById("a" + counter).value;
			counter +=  1;
		}
	}
	for (var i = 0; i < men; i++) {
		femalePref[i] = new Array(men);
		for (var j = 0; j < men; j++) {
			femalePref[i][j] = document.getElementById("a" + counter).value;
			counter += 1;
		}
	}
	var pairings = allPairings(malePref.length);
	var output = document.getElementById("output");
	output.innerHTML = "This is a list of all stable pairings. Couples have the male index first, followed by the female index.";
	for (var i = 0; i < pairings.length; i++) {
		if (pairings[i].isStable(malePref, femalePref)) {
			output.innerHTML += "<br>" + pairings[i].toString();
		}
	}
}

function allPairings(length) {
	var femaleUsed = new Array(length);
	for (var i = 0; i < length; i++) {
		femaleUsed[i] = false;
	}
	var pairingSet = new Array(length);
	return allPairingsHelper([].concat(pairingSet), [].concat(), length);
}

function allPairingsHelper(pairingSet, femaleUsed, length) {
	if (length == 0) {
		var p = new Pairing(pairingSet.length);
		for (var i = 0; i < pairingSet.length; i++) {
			p.inputCouple(i, pairingSet[i]);
		}
		return [p];
	}
	var returnArray = [];
	for (var i = 0; i < pairingSet.length; i++) {
		if (!femaleUsed[i]) {
			nPS = [].concat(pairingSet);
			nFU = [].concat(femaleUsed);
			nPS[length - 1] = i;
			nFU[i] = true;
			returnArray = returnArray.concat(allPairingsHelper(nPS, nFU, length - 1));
		}
	}
	return returnArray;
}

function Pairing(length) {
	this.l = length;
	this.females = new Array(length);
	this.males = new Array(length);
}
Pairing.prototype.inputCouple = function(male, female) {
	this.females[male] = female;
	this.males[female] = male;
}
Pairing.prototype.toString = function() {
	var output = "";
	for (var i = 0; i < this.l; i++) {
		output += "{ " + i + ", " + this.females[i] + "} ";
	}
	return output;
}

Pairing.prototype.isStable = function(malePref, femalePref) {
	for (var male = 0; male < malePref.length; male++) {
		var pair = this.females[male];
		for (var i = 0; i < malePref.length; i++) {
			if (pair == malePref[male][i]) {
				break;
			}
			var female = malePref[male][i];
			for (var k = 0; k < this.l; k++) {
				if (this.males[female] == femalePref[female][k]) {
					break;
				} else if (male == femalePref[female][k]) {
					return false;
				}
			}
		}
	}
	return true;
}

