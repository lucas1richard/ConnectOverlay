function formatOpenBallots() {


	var actualCode = '(' + function() {
	    window.ballotsTable = document.querySelector(".HomePage");
		for (var i=4; i < ballotsTable.rows.length; i++) {
			if(ballotsTable.rows[i].children[1]){
				var actionsTD = ballotsTable.rows[i].children[1];

				if(actionsTD.children[0])actionsTD.children[0].firstElementChild.style.fontWeight = "bold";
				if(actionsTD.children[1])actionsTD.children[1].firstElementChild.style.fontSize = "8px";
				if(actionsTD.children[2])actionsTD.children[2].firstElementChild.style.fontSize = "8px";
				var ballotType = ballotsTable.rows[i].children[4].innerText;
				ballotsTable.rows[i].children[4].style.fontSize = "10pt";
				if(ballotType.search("Membership") != -1) {
					ballotsTable.rows[i].children[4].innerHTML = "<span class='label label-danger'>" + ballotType + "</span>";
				}
				if(ballotType.search("Component") != -1) {
					ballotsTable.rows[i].children[4].innerHTML = "<span class='label label-primary'>" + ballotType + "</span>";
				}
				if(ballotType.search("Interpretation") != -1) {
					ballotsTable.rows[i].children[4].innerHTML = "<span class='label label-default'>" + ballotType + "</span>";
				}
				if(ballotType.search("Board") != -1) {
					ballotsTable.rows[i].children[4].innerHTML = "<span class='label label-success'>" + ballotType + "</span>";
				}
				if(ballotsTable.rows[i].querySelectorAll("td")[6]) {
					ballotsTable.rows[i].removeChild(ballotsTable.rows[i].querySelectorAll("td")[6]);
				}
				if(ballotsTable.rows[i].querySelectorAll("th")[6]) {
					ballotsTable.rows[i].removeChild(ballotsTable.rows[i].querySelectorAll("th")[6]);
				}
	
				// Check closing date and highlight if ballot should close
				if(checkClosure(ballotsTable.rows[i].children[5].innerText)) {
					ballotsTable.rows[i].children[0].children[0].setAttribute("class", "btn btn-xs btn-danger");
					ballotsTable.rows[i].children[5].setAttribute("style", "color:#cd4c4c; font-weight:bold;");
					ballotsTable.rows[i].children[5].setAttribute("title", "Due to close");
					ballotsTable.rows[i].children[3].setAttribute("style", "color:#cd4c4c; font-weight:bold;");
					ballotsTable.rows[i].children[3].setAttribute("title", "Due to close");
					ballotsTable.rows[i].children[2].setAttribute("style", "color:#cd4c4c; font-weight:bold;");
					ballotsTable.rows[i].children[2].setAttribute("title", "Due to close");
					actionsTD.children[0].firstElementChild.style.backgroundColor = "#ffffcc";
					actionsTD.children[0].firstElementChild.style.color = "#1c4263";
				}

				// Check if a voting reminder should be sent
				if(checkReminder(ballotsTable.rows[i].children[5].innerText)) {
					ballotsTable.rows[i].children[0].children[0].setAttribute("class", "btn btn-xs btn-primary");
					ballotsTable.rows[i].children[5].setAttribute("style", "color:blue; font-weight:bold;");
					ballotsTable.rows[i].children[5].setAttribute("title", "Send reminder");
					ballotsTable.rows[i].children[3].setAttribute("style", "color:blue; font-weight:bold;");
					ballotsTable.rows[i].children[3].setAttribute("title", "Send reminder");
					ballotsTable.rows[i].children[2].setAttribute("style", "color:blue; font-weight:bold;");
					ballotsTable.rows[i].children[2].setAttribute("title", "Send reminder");
					ballotsTable.rows[i].children[4].setAttribute("style", "color:blue; font-weight:bold;");
					ballotsTable.rows[i].children[4].setAttribute("title", "Send reminder");
					
					var addorNot = true;

					if(addorNot) {
						// Create the reminder button and append next to date
						var reminderBtn = document.createElement("span");
						reminderBtn.innerText = "Send reminder";
						reminderBtn.setAttribute("class","btn btn-xs btn-default");
						reminderBtn.style.fontSize = "7pt";
						var str = ballotsTable.rows[i].children[0].children[0].onclick.toString();
						var ballotnum = str.substring(str.lastIndexOf("BallotNumber")+13,str.lastIndexOf("&BallotYearOpened"));
						var yearnum = str.substring(str.lastIndexOf("YearOpened=")+11,str.lastIndexOf("&NoToolbar"));

						reminderBtn.setAttribute("onclick",'window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber='+ballotnum+'&BallotYearOpened='+yearnum+'&NoToolbar=yes&votesubmitted=0&SendReminder=yes");');
						ballotsTable.rows[i].children[5].innerHTML += "<br/>";
						ballotsTable.rows[i].children[5].appendChild(reminderBtn);
					}
				}
			}
		}
		if(ballotsTable.rows[2].querySelectorAll("th")[6]) {
			ballotsTable.rows[2].removeChild(ballotsTable.rows[2].querySelectorAll("th")[6]);
		}
		if(ballotsTable.rows[ballotsTable.rows.length-3].querySelectorAll("th")[6]) {
			ballotsTable.rows[ballotsTable.rows.length-3].removeChild(ballotsTable.rows[ballotsTable.rows.length-3].querySelectorAll("th")[6]);
		}
		ballotsTable.style.maxWidth = "1200px";
		ballotsTable.style.margin = "auto";
	} + ')();' + 
	function createReminderForm(Ballot) {
		var year = Ballot.split("-")[0];
		var num = Ballot.split("-")[1];
		window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber="+num+"&BallotYearOpened="+year+"&NoToolbar=yes&votesubmitted=0&SendReminder=yes");
	} + "" + function checkReminder(fut) {

		var future = new Date(fut);
		var today = new Date();

		return (Math.floor((future-today)/60/60/24/1000) == 6);

	} + "" + function checkClosure(dat) {

		var future = new Date(dat);
		var today = new Date();

		return (Math.floor((future-today)/60/60/24/1000) <= -2);

	};

	

	insertScript(actualCode);
}