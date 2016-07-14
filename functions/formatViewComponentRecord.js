function formatViewComponentRecord() {
	window.onload = function() {
		if(window.location.href.indexOf("CheckPublished") != -1) {
			if(document.querySelector("#PublicationsLevel > tbody > tr:nth-child(4) > td:nth-child(2)") || document.querySelector("#ANSILevel > tbody > tr:nth-child(2) > td:nth-child(2)")) {
				var recordNum = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(2) > td:nth-child(1)").innerText;
				var year = recordNum.split("-")[0];
				var num = recordNum.split("-")[1];
				window.open('UpdateRecordForm.cfm?Action=Update&TrackingNumber='+num+'&YearOpened='+year+'&NoToolbar=yes&CheckPublished=yes');
				window.close();
			} else {
				window.close();
			}
		}
	}

	var reformatBtn = document.createElement("button");
	    reformatBtn.setAttribute("class","btn btn-primary btn-xs");
	    reformatBtn.innerText = "Format for Agenda";
	    reformatBtn.setAttribute("onclick","reformatForAgenda();");
	var reformatDiv = document.createElement("div");
	    reformatDiv.appendChild(reformatBtn);
	var createBallotBtn = document.createElement("button");
		createBallotBtn.className = "btn btn-primary btn-xs";
	    createBallotBtn.innerText = "Create Ballot";

	var updateBtn = document.createElement("button");
		updateBtn.className = "btn btn-default btn-xs";
	    updateBtn.innerText = "Update Record";
	    updateBtn.setAttribute("onclick","openUpdateWindow();");
	    reformatDiv.appendChild(updateBtn);


	    document.querySelector(".pagehdg").appendChild(reformatDiv);
	var emailDiv = document.querySelector("#ProjectManagerLevel > tbody > tr:nth-child(2) > td > div:nth-child(3)");
	var email = emailDiv.innerText;
		emailDiv.innerText = "";
	var record = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(2) > td:nth-child(1)").innerText;
	var subject = document.querySelector("#ItemDescription > tbody > tr:nth-child(2) > td").innerText;
	var tpm = document.querySelector("#ProjectManagerLevel > tbody > tr:nth-child(2) > td > div:nth-child(2)").innerText.split(", ")[0];
	chrome.storage.sync.get({userInfo:false}, function(item) {
		if(item.userInfo) {
			var lnk = document.createElement("a");
				lnk.href = "mailto:"+email+"?Subject=ASME%20Record%20"+record+":%20"+subject+"&body=Mr.%20"+tpm+",%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A"+item.userInfo.firstName+" "+item.userInfo.lastName;
				lnk.target="_top";
				lnk.innerText = email;
		} else {
			var lnk = document.createElement("a");
				lnk.href = "mailto:"+email+"?Subject=ASME%20Record%20"+record+":%20"+subject+"&body=Mr.%20"+tpm+",%0D%0A%0D%0A%0D%0A%0D%0ABest regards,";
				lnk.target="_top";
				lnk.innerText = email;
		}
		emailDiv.appendChild(lnk);
	});
	var commentsTable = document.querySelector("#LatestBallot > tbody > tr > td");
	var commentsLength = commentsTable.children.length-2;
	var comments = [];
	for(var i=8; i<commentsLength; i++) {
		if(commentsTable.children[i].tBodies[0].firstElementChild.children[1].children[1]){
			comments.push(commentsTable.children[i].tBodies[0].firstElementChild.children[1].children[1].innerText.split("\n")[2]);
		}
	}
	var uniqueComments = comments.filter( onlyUnique );
	if(uniqueComments.length < comments.length) {
		var msg = document.createElement("div");
		msg.style.color = "red";
		msg.style.fontWeight = "bold";
		msg.innerText = "There are duplicate comment responses";
		document.querySelector(".pagehdg").appendChild(msg);
	}
	
	var actualCode = "" + function reformatForAgenda() {
		doToAll(".Description, #EditorLevel, [name=AdditionalBPVInformation], [name=AdditionalBPVSubcommitteeInformation]",{"class":"hidden"});
		window.PublishTable = document.getElementById("PublicationsLevel");
		if(PublishTable.tBodies[0].firstElementChild.firstElementChild.innerText.indexOf("available at this time") != -1) {
			PublishTable.parentElement.removeChild(PublishTable);
			delete(PublishTable);
		}
		window.ANSITable = document.getElementsByName("ANSILevel")[document.getElementsByName("ANSILevel").length-1];
		if(ANSITable.tBodies[0]) {
			if(ANSITable.tBodies[0].firstElementChild.firstElementChild.innerText.indexOf("available at this time") != -1) {
				ANSITable.parentElement.removeChild(ANSITable);
				delete(ANSITable);
			}
		}
		var BallotHistoryTable = document.getElementById("BallotHistory");
			BallotHistoryTable.parentElement.removeChild(BallotHistoryTable);
		
		removeNones("#SubcommitteeLevel");
		removeNones("#ProjectManagerLevel");
		removeNones("#FileAttachmentsLevel");
		removeNones("#StaffAccessrmation");
		removeNones("#ItemDescription");
		doToAll("input, button, p", {"class":"hidden"});
		doToAll("[style]", {"style":"remove"});
		doToAll("[bordercolor]", {"bordercolor":"remove"});
		doToAll("th", {"style":"background-color:white; color:black; border:1px solid white;"});

 
		document.querySelector("body > table > tbody > tr:nth-child(1) > td > table:nth-child(8)").setAttribute("class","hidden");
		document.querySelector("body > table > tbody > tr:nth-child(1) > td > table:nth-child(11)").setAttribute("class","hidden");
		document.querySelector("body > table > tbody > tr:nth-child(1) > td > span").setAttribute("class","hidden");
		document.querySelector("body > table > tbody > tr:nth-child(2) > td > div").setAttribute("class","hidden");
		document.querySelector("body > table > tbody > tr:nth-child(2) > td > table:nth-child(4)").setAttribute("class","hidden");
		document.querySelector("body > table > tbody > tr:nth-child(2) > td > table.DetailPage > tbody > tr > td > table:nth-child(15)").setAttribute("class","hidden");

		var StaffAccess = document.querySelector("#StaffAccessrmation");
			for(var i=2; i<10; i++) {
				StaffAccess.rows[i].setAttribute("class","hidden");
			}
		var staffNotes = document.querySelector("body > table > tbody > tr:nth-child(2) > td > table.DetailPage > tbody > tr > td > table:nth-child(13) > tbody > tr:nth-child(4) > td");
			if(staffNotes.innerText.indexOf("None") != -1) {
				staffNotes.parentElement.previousElementSibling.setAttribute("class","hidden");
				staffNotes.parentElement.setAttribute("class","hidden");
			}
		doToAll("br",{"parent":"removeFrom"});
		doToAll("body > table > tbody > tr:nth-child(2) > td > table:nth-child(7)",{"parent":"removeFrom"});

		var theRecord = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(2) > td:nth-child(1)");
		var recordLink = document.createElement("a");
		recordLink.href = window.location.href;
		recordLink.innerText = theRecord.innerText;

		while(theRecord.firstChild) {
			theRecord.removeChild(theRecord.firstChild);
		}

		theRecord.appendChild(recordLink);

		var THs = document.querySelectorAll("th");
		for(var j=0; j<THs.length; j++) {
			THs[j].innerText = THs[j].innerText.split(". ")[1];
		}

		document.body.style.width = "850px";
	} + "" + function doToAll(selector, obj) {
		var tmp = document.querySelectorAll(selector);
		for(key in obj) {
			for(var i=tmp.length-1;i>-1;i--){
				tmp[i].setAttribute(key,obj[key]);
				if(obj[key] == "remove") tmp[i].removeAttribute(key);
				if(key == "parent" && obj[key] == "removeFrom") tmp[i].parentElement.removeChild(tmp[i]);
			}
		}
	} + "" + function removeNones(TableSelector) {
		var Table = document.querySelector(TableSelector);
			for(var i=1; i<Table.rows.length; i+=2){
				if(Table.rows[i].firstElementChild.innerText.indexOf("None") != -1) {
					Table.rows[i].setAttribute("class","hidden");
					Table.rows[i-1].setAttribute("class","hidden");
				}
			}
	} + "" + function openUpdateWindow() {
		var currentHref = window.location.href;
			currentHref = currentHref.replace("SearchAction", "UpdateRecordForm");
			console.log(currentHref);
			currentHref += "&Action=Update";
			window.location.href = currentHref;
	};// + "" + function createBallot() {
	// 	var ballotForm = document.createElement("form");
	// 	<input type="hidden" id="CreateBallotCommitteeResponsible" name="CommitteeResponsible" value="N10060600">
	// 	var strUser = e.options[e.selectedIndex].value;
	// 	if (strUser.length > 15) {
	// 		document.CreateBallot.action=strUser;
	// 		document.CreateBallot.submit();
	// 	}else	
	// 	if (SelectCommitteeResponsible('CreateBallot.CommitteeResponsible') == true){
	// 		document.getElementById('CreateBallotCommitteeResponsible').value= document.getElementById('thisCommitteeResponsible').value;
	// 		document.CreateBallot.action='NewBallotForm.cfm';
	// 		document.CreateBallot.submit();
	// 	}
	// };
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);

	
	
}

function SpanI() {
	var span = document.createElement("span");
	span.innerText = " | ";
	return span;
}

function createBallot() {
	var CommitteeResponsible = document.querySelector("#StaffAccessrmation > tbody > tr:nth-child(2) > td:nth-child(2)").innerText;
	var theCommittee;
	for(var i=0; i<allCommittees.length; i++) {
		if(allCommittees[i].committee.search(CommitteeResponsible) != -1) {
			theCommittee = allCommittees[i].num;
			console.log(theCommittee);
		}

	}
	var record = document.querySelector("[name=BCNumber]").value;
	var lastBallotCheck = document.querySelector("#LatestBallot").rows[0].children[0].children.length;
	var subject = document.querySelector("#ItemDescription > tbody > tr:nth-child(2) > td").innerText;
	var level = 2;
	if(lastBallotCheck == 0) level = 3;
	chrome.storage.sync.set({"recordBallot":record, "level":level, "subject":subject}, function() {
		var ballotForm = document.createElement("form");
			ballotForm.setAttribute("method","post");
			ballotForm.setAttribute("name","CreateBallot");
			ballotForm.setAttribute("action","NewBallotForm.cfm");
			ballotForm.setAttribute("target","_blank");
		var CommitteeResponsible = document.createElement("input");
			CommitteeResponsible.setAttribute("type","hidden");
			CommitteeResponsible.setAttribute("id","CreateBallotCommitteeResponsible");
			CommitteeResponsible.setAttribute("name","CommitteeResponsible");
			CommitteeResponsible.setAttribute("value",theCommittee);
		ballotForm.appendChild(CommitteeResponsible);
		ballotForm.submit();
	});
	// 	var strUser = e.options[e.selectedIndex].value;
	// 	if (strUser.length > 15) {
	// 		document.CreateBallot.action=strUser;
	// 		document.CreateBallot.submit();
	// 	}else	
	// 	if (SelectCommitteeResponsible('CreateBallot.CommitteeResponsible') == true){
	// 		document.getElementById('CreateBallotCommitteeResponsible').value= document.getElementById('thisCommitteeResponsible').value;
	// 		document.CreateBallot.action='NewBallotForm.cfm';
	// 		document.CreateBallot.submit();
	// 	}
}