var thColor = "rgb(235, 243, 249)";
var borderColor = "#d8e7f3";
var inptxtColor = "black";
var threed = false;

chrome.storage.sync.get({
	backgroundColor:"rgb(235, 243, 249)", 
	// borderColor:"rgb(195, 218, 238)",
	borderColor:"#d8e7f3",
	inpBorderColor:"gray",
	inpColor:"white",
	inptxtColor:"black",
	threed:false,
	changeStyles:true
}, function(item) { 
	thColor = item.backgroundColor; 
	borderColor = item.borderColor; 
	inpColor = item.inpColor; 
	inptxtColor = item.inptxtColor; 
	inpBorderColor = item.inpBorderColor; 
	threed = item.threed; 
	/*if(changeStyles)*/ generalCSSChanges();
});





if(window.location.href.search("index.cfm") != -1 || document.querySelectorAll("[name=SearchCommitteePages]")[1] ||
	window.location.href.search("vcc.cfm") != -1 || window.location.href.search("reports.cfm") != -1 || 
	window.location.href.search("News.cfm") != -1) {
	replaceNavBar();
}




// Changes attributes of all elements with a specified attribute
function doToAll(selector, obj) {
	var tmp = document.querySelectorAll(selector);
	for(key in obj) {
		for(var i=tmp.length-1;i>-1;i--){
			tmp[i].setAttribute(key,obj[key]);
			if(obj[key] == "remove") tmp[i].removeAttribute(key);
		}
	}
}



function changeCSSofAll(selector, obj) {
	var tmp = document.querySelectorAll(selector);
	for(key in obj) {
		for(var i=tmp.length-1;i>-1;i--){
			tmp[i].style[key] = obj[key];
		}
	}
}



// Constructor for the navigation menu items on the bottom row
function MenuItem(obj) {
	for(key in obj) {
		this[key] = obj[key];

		this.divObj = document.createElement("a");
		
		this.divObj.setAttribute("href",this.href);
		this.divObj.appendChild(document.createTextNode(this.txt));

		if(window.location.href == this.href) { 
			this.divObj.setAttribute("class","text-center btn btn-primary col-xs-2 btn-sm"); 
		} else {
			this.divObj.setAttribute("class","text-center btn btn-default col-xs-2 active btn-sm");
		}
	}
}



// Constructor for the navigation menu items on the top row
function SmallMenuItem(obj) {
	for(key in obj) {
		this[key] = obj[key];

		this.divObj = document.createElement("a");
		if(this.href) {
			this.divObj.setAttribute("href",this.href);
			this.divObj.appendChild(document.createTextNode(this.txt));
		}
		if(window.location.href == this.href) { 
			this.divObj.setAttribute("class","text-center btn btn-primary col-xs-1 btn-sm"); 
		} else {
			this.divObj.setAttribute("class","text-center btn btn-default col-xs-1 btn-sm active");
		}
	}
}



// Constructor for each row of the menu
function MenuRow() {
	this.divObj = document.createElement("div");
	this.divObj.setAttribute("class","row");
}





function quickViewTool() {
	var div = document.createElement("div");
	div.setAttribute("class","form-inline");
	// div.setAttribute("class","btn btn-default active form-inline col-md-2");
	//div.setAttribute("style","background-color:#ffffcc;");
	var inp = document.createElement("input");
	inp.id = "quickView";
	inp.placeholder = "Quick View";
	inp.setAttribute("class","form-control input-sm");
	inp.setAttribute("style","height:22px; padding:1px; margin:0px; max-width:90px;");
	inp.setAttribute("onkeypress", "autoQuickView(event)");
	inp.setAttribute("onclick", "clearVal(this)");

	recordBtn = document.createElement("button");
	recordBtn.setAttribute("class","btn btn-xs btn-default");
	recordBtn.setAttribute("onclick","openRecord(document.getElementById('quickView').value);");
	recordBtn.innerText = "Record";

	ballotBtn = document.createElement("button");
	ballotBtn.setAttribute("class","btn btn-xs btn-default");
	ballotBtn.setAttribute("onclick","openBallot(document.getElementById('quickView').value);");
	ballotBtn.innerText = "Ballot";

	div.appendChild(inp);
	div.appendChild(recordBtn);
	div.appendChild(ballotBtn);

	return div;
}

function extensionOpts() {
	var optsURL = chrome.extension.getURL('options.html');
}



// Performs the actual navbar replacement referencing the constructors above
function replaceNavBar() {
	var topbar1 = document.querySelector("#top-bar1");
		topbar1.parentNode.removeChild(topbar1);
	var topbar1 = document.querySelector(".SlimHeaderImage1");
		topbar1.parentNode.removeChild(topbar1);
	var topbar1 = document.querySelector(".SlimHeaderright1");
		topbar1.parentNode.removeChild(topbar1);
	var overTopRow = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(11) > tbody > tr");
		overTopRow.innerHTML = "";
		overTopRow.style.height = "20px";
		overTopLinks = {
			"ASME":"http://www.asme.org/",
			"Logout":"index.cfm?DelCookie=True&amp;Action=CommitteePage&amp;NoToolbar=yes",
			"Publications":"https://www.asme.org/shop/standards",
			"C&S Connect":"/csconnect/index.cfm",
			"Committee Central":"/csconnect/CommitteePages.cfm",
			"Meetings":"http://calendar.asme.org/home.cfm?EventTypeID=4",
			"Staff":"/csconnect/CommitteePages.cfm?view=CFStaffSearch",
			"ASME Directory":"http://intranet.asmestaff.org/forms/files/ASME_Staff_Directory.pdf",
			"ADP":"https://workforcenow.adp.com/public/index.htm"
		};
		
	var logoutBtnTd = document.createElement("td");
		
	window.ul = document.createElement("ul");
		ul.className = "nav nav-pills";
		
	for(m in overTopLinks) {
		var li = document.createElement("li");
		var logoutlnk = document.createElement("a");
			logoutlnk.href = overTopLinks[m];
			logoutlnk.innerText = m;
			logoutlnk.style.color = "#337ab7";

		if(m == "ASME Directory") logoutlnk.setAttribute("target","_blank");

		li.appendChild(logoutlnk);
		ul.appendChild(li);
	}

	var li = document.createElement("li");
	var placeholder2 = quickViewTool();
		logoutlnk.href = overTopLinks[m];

		li.appendChild(placeholder2);
		ul.appendChild(li);
	logoutBtnTd.appendChild(ul);
	overTopRow.appendChild(logoutBtnTd);
	placeholder2.style.height = "34px";
	placeholder2.style.paddingTop = "7px";

	var bottomMenu = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(14)");
	var bottomRow = new MenuRow();
	bottomMenu.parentNode.replaceChild(bottomRow.divObj, bottomMenu);

	var topMenu = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(13)");
	var topRow = new MenuRow();
	topMenu.parentNode.replaceChild(topRow.divObj, topMenu);

	var links = {
		myCommitteePage: new MenuItem({txt:"Committee Page",href:"https://cstools.asme.org/csconnect/CommitteePages.cfm?ChooseCommittee=yes"}),
		search: new SmallMenuItem({txt:"Search",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=Search"}),
		ansi: new SmallMenuItem({txt:"ANSI",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=ANSISubmittals"}),
		staff: new MenuItem({txt:"Staff",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=Staff"}),
		vcc: new SmallMenuItem({txt:"VCC",href:"https://cstools.asme.org/csconnect/vcc.cfm"}),
		as11: new SmallMenuItem({txt:"AS-11",href:"https://cstools.asme.org/csconnect/CommitteePages.cfm?View=AS11"}),
		reports: new SmallMenuItem({txt:"Reports",href:"https://cstools.asme.org/csconnect/reports.cfm"}),
		news: new SmallMenuItem({txt:"News",href:"https://cstools.asme.org/csconnect/News.cfm?AnnouncementFormID=1"}),
		
		myProfile: new MenuItem({txt:"My Profile",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=ContactInformation"}),
		ballots: new MenuItem({txt:"Ballots",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=OpenBallots"}),
		negativesResponses: new MenuItem({txt:"Negatives & Responses",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=SummaryofNegatives"}),
		myItems: new MenuItem({txt:"My Items",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=ProjectManagerRecords"}),
		customTracking: new MenuItem({txt:"Custom Tracking",href:"https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=CustomTracking"}),
		help: new MenuItem({txt:"Help",href:"https://cstools.asme.org/csconnect/News.cfm?AnnouncementFormID=2"})
	}

	var optsURL = chrome.extension.getURL('options.html');

	bottomRow.divObj.appendChild(links.myProfile.divObj);
	bottomRow.divObj.appendChild(links.ballots.divObj);
	bottomRow.divObj.appendChild(links.negativesResponses.divObj);
	bottomRow.divObj.appendChild(links.myItems.divObj);
	bottomRow.divObj.appendChild(links.customTracking.divObj);
	bottomRow.divObj.appendChild(links.help.divObj);

	var actualCode = '' + 
	   function openRecord(txt) {
	   	if(txt.search("RC") != -1 || txt.search("Rc") != -1 || txt.search("rC") != -1 || txt.search("rc") != -1) {
	   		window.open("https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=Search&Ballot=" + txt);
	   		return;
	   	}
	   	record = txt.split("-");
	   	window.open("https://cstools.asme.org/csconnect/SearchAction.cfm?TrackingNumber="+record[1]+"&YearOpened="+record[0]+"&NoToolbar=yes");
	   } + '' +
	   function openBallot(txt) {
	   	ballot = txt.split("-");
	   	if(txt.search("RC") != -1 || txt.search("Rc") != -1 || txt.search("rC") != -1 || txt.search("rc") != -1) {
	   		window.open("https://cstools.asme.org/csconnect/index.cfm?ViewTabMode=Search&Ballot=" + txt);
	   		return;
	   	}
	   	window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber="+ballot[1]+"&BallotYearOpened="+ballot[0]+"&NoToolbar=yes");

	   } + '' + function autoQuickView(e) { if(e.keycode==13 || e.which==13) {openRecord(document.getElementById('quickView').value);} } + 
	   '' + 
	   function clearVal(element) {
	   		element.value = "";
	   };
	   

	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);

	var placeholder1 = new MenuItem({txt:"Extension Options ",href:optsURL});
	var manifest = chrome.runtime.getManifest();

	var smll = document.createElement("small");
	smll.innerText = "(V "+manifest.version+")";

	chrome.storage.sync.get({version:""}, function(v) {
		if(v.version != manifest.version) {
			//placeholder1.divObj.style.backgroundColor = "";
		}
	});



	placeholder1.divObj.appendChild(smll);

	placeholder1.divObj.setAttribute("target","_blank");
	placeholder1.divObj.setAttribute("style","background-color:#ffffcc");

	topRow.divObj.appendChild(placeholder1.divObj);
	topRow.divObj.appendChild(links.myCommitteePage.divObj);
	topRow.divObj.appendChild(links.search.divObj);
	topRow.divObj.appendChild(links.ansi.divObj);
	topRow.divObj.appendChild(links.staff.divObj);
	topRow.divObj.appendChild(links.vcc.divObj);
	topRow.divObj.appendChild(links.as11.divObj);
	topRow.divObj.appendChild(links.reports.divObj);
	topRow.divObj.appendChild(links.news.divObj);

	$(topRow.divObj).before(ul);
	var banner = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(8)");
		banner.parentNode.removeChild(banner);
		document.querySelector("br").parentNode.removeChild(document.querySelector("br"));
		document.querySelector("br").parentNode.removeChild(document.querySelector("br"));
}









function formatViewComponentBallot() {
	var record = document.querySelectorAll("#BallotInfo > tbody > tr:nth-child(2) > td:nth-child(1)")[1].innerText;
	setTimeout(function() {
		if(window.location.href.indexOf("SendReminder") != -1) {
			chrome.storage.sync.get({remindersSent:[]}, function(r) {
				for(var i=0; i<r.remindersSent.length; i++) {
					console.log(r.remindersSent[i]);
					if(r.remindersSent[i] == record) {
						alert("Reminder was already sent today");
						return;
					}
				}
				document.querySelector("input[name=EmailReminder]").click();
				r.remindersSent.push(record);
				chrome.storage.sync.set({remindersSent:r.remindersSent}, function() {
					window.close();
				});
			});
		}
	},500);
}










function formatViewMemberBallot() {
	console.log("member ballot");
	var record = document.querySelector("#BallotInfo > tbody > tr:nth-child(2) > td:nth-child(1)").innerText;
	document.body.onload = function() {
		if(window.location.href.indexOf("SendReminder") != -1) {
			chrome.storage.sync.get({remindersSent:[]}, function(r) {
				for(var i=0; i<r.remindersSent.length; i++) {
					if(r.remindersSent[i] == record) {
						alert("Reminder was already sent today");
						return;
					}
				}
				document.querySelector("input[name=EmailReminder]").click();
				r.remindersSent.push(record);
				chrome.storage.sync.set({remindersSent:r.remindersSent}, function() {
					window.close();
				});
			});
		}
	}
}











function formatNewComponentRecord() {
    var actualCode = '(' + function() {
		var subType = document.querySelector("select");
		subType.style.backgroundColor = "#ffffe5";
		
		subType.value = "2";
		var str = document.getElementById("CommitteeResponsibleField").value;
		document.querySelectorAll("select[name=Committee]")[1].style.backgroundColor = "#ffffe5";
	    document.querySelectorAll("select[name=Committee]")[1].value = str.slice(0,5).concat("0000");

	    var boardOption = document.querySelector("option[value=" + str.slice(0,3).concat("000000") + "]")
	    boardOption.style.backgroundColor = "#ffffe5";
	    
	    var boardSelect = document.querySelector("select[name=Committee]");
    	AddAutoCompleteOption(
	    	boardOption.value,
	    	boardOption.text,
	    	'txtCommittee',10, null
	    );

	} + ')();';
	insertScript(actualCode);
}

function insertScript(actualCode) {
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}



function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function countComments(unique, commentArray) {
	var count = 0;
	for(var i=0; i<commentArray.length; i++) {
		if(commentArray[i] == unique) {
			count++;
		}
	}
	return count;
}

function dateInput(numDays) {
	if(!numDays) numDays = 0;
	var day = new Date();
	var dat = new Date(day.valueOf());
    var addedDays = new Date(dat.setDate(dat.getDate() + numDays));
    
    var dd = "" + addedDays.getDate();
    var mm = addedDays.getMonth()+1;

    if(dd < 10) dd = "0" + addedDays.getDate();
    if(mm < 10) mm = "0" + (addedDays.getMonth() + 1);

    return(mm + "/" + dd + "/" + addedDays.getFullYear());
}















function formatSearch() {
	var actualCode = '(' + function() {
		window.FirstTable = document.querySelectorAll(".HomePage")[0];
		window.MainTable = document.querySelectorAll(".HomePage")[1];
		window.SearchTable = document.querySelectorAll(".HomePage")[2];
		FirstTable.style.maxWidth = "8000px";
		FirstTable.style.minWidth = "800px";
		FirstTable.style.margin = "auto";
		MainTable.style.maxWidth = "1000px";
		MainTable.style.minWidth = "800px";
		MainTable.style.margin = "auto";
		SearchTable.style.maxWidth = "1000px";
		SearchTable.style.minWidth = "800px";
		SearchTable.style.margin = "auto";
		document.querySelector("[name=QuickSearch]").setAttribute("action","SearchAction.cfm?QuickSearch=yes&NoToolbar=yes");
		document.querySelector("[name=AdvancedSearch]").setAttribute("action","SearchForm.cfm");
		document.querySelector("[name=SearchType]").children[0].selected = true;
		document.querySelector("[name=AdvancedSearchType]").children[0].selected = true;
		document.querySelector("select[name=Search]").children[2].selected = true;
		document.querySelector("[name=QuickSearchKeyword]").focus();
		if(window.location.href.search("Ballot") != -1) {
			console.log("enabled");
			var str = window.location.href;
			str = str.substring(str.lastIndexOf("&Ballot=")+8,str.length);
			document.querySelector("[name=QuickSearch]").setAttribute("action","NewBallotForm.cfm?Update=no&QuickSearch=yes&NoToolbar=yes&Ballot=" + str);
			document.querySelector("[name=QuickSearchKeyword]").value = str;
			document.querySelector("[name=Search]").click();
			setTimeout(function() {
				window.close();
			}, 10);
		}
	} + ')();';
	
	insertScript(actualCode);
}



function formatVCC() {
	doToAll("select",{"style":"remove"});
	if(window.location.href.search("SendEmail") != -1) {
		addEmailListBtn();
		return;
	}
	var actualCode = '(' + function() {
		window.committeeSel = document.getElementById("Committee");
		committeeSel.style.width = "100%";
	} + ')();';
	chrome.storage.sync.get({committees:[]}, function(item) {
		var committeeResponsible = document.getElementById("Committee");
		var thisCommittee = document.getElementById("Committee");
		committeeResponsible.firstElementChild.innerText = "----------------------------------";
		for(var j=0; j<item.committees.length; j++) {
			var option = document.createElement("option");
			option.value = item.committees[j].num;
			option.innerText = item.committees[j].committee;
			$(committeeResponsible).prepend(option);
			thisCommittee.value = item.committees[j].num;
		}
		committeeResponsible.firstElementChild.selected = true;
	});
	
	insertScript(actualCode);
}



function formatAS11() {
	changeCSSofAll(".CommitteePage tr td", {"padding":"0.5em"});
	doToAll(".CommitteePage tr td", {"onmouseover":"this.style.backgroundColor = '#f2f2f2'"});
	doToAll(".CommitteePage tr td", {"onmouseleave":"this.style.backgroundColor = 'white'"});
	var actualCode = '(' + function() {
		document.OverView.ShowLink.value='N10000000,O10000000';
		document.OverView.action='CommitteePages.cfm#LinkO10000000'; 
		document.OverView.submit();
		window.MainTable = document.querySelectorAll(".CommitteePage")[1];
		doToAll("td div",{"style":"remove"});
	} + ')();' + "" + function doToAll(selector, obj) {
		var tmp = document.querySelectorAll(selector);
		for(key in obj) {
			for(var i=tmp.length-1;i>-1;i--){
				tmp[i].setAttribute(key,obj[key]);
				if(obj[key] == "remove") tmp[i].removeAttribute(key);
			}
		}
	};
	console.log(actualCode);
	insertScript(actualCode);
}





function formatStaff() {
	var actualCode = '(' + function() {
		window.ItemTypeID = document.getElementById("ItemTypeID");
		window.ANSIBallotType = document.getElementById("AnsiBallotType");
		window.BallotType = document.querySelector("[name=BallotType]");
		window.HomePageTables = document.querySelectorAll(".HomePage");
		ItemTypeID.firstElementChild.selected = true;
		BallotType.firstElementChild.selected = true;
		ANSIBallotType.firstElementChild.selected = true;
	} + ')();';
	changeCSSofAll(".Homepage th", {
		"textAlign":"center"
	});
	chrome.storage.sync.get({committees:[]}, function(item) {
		var committeeResponsible = document.getElementById("SelectedCommitteeResponsible");
		var thisCommittee = document.getElementById("thisCommitteeResponsible");
		committeeResponsible.firstElementChild.innerText = "----------------------------------";
		for(var j=0; j<item.committees.length; j++) {
			var option = document.createElement("option");
			option.value = item.committees[j].num;
			option.innerText = item.committees[j].committee;
			$(committeeResponsible).prepend(option);
			thisCommittee.value = item.committees[j].num;
		}
		committeeResponsible.firstElementChild.selected = true;
		var option = document.createElement("option");
			option.innerText = "Select Committee:";
		$(committeeResponsible).prepend(option);
	});
	
	insertScript(actualCode);
}



function addEmailListBtn() {
	var actualCode = '(' + function() {
		var committeeName = document.querySelector("#Search > table.DetailPage > tbody > tr:nth-child(1) > th > b");
		var btn = document.createElement("span");
			btn.innerText = "Create Email List";
			btn.setAttribute("class","btn btn-primary");
			btn.addEventListener("click", function() {
				var reloadBTN = document.createElement("button");
				reloadBTN.innerText = "Back";
				reloadBTN.className = "btn btn-default";
				reloadBTN.style.marginLeft = "100px";
				reloadBTN.style.marginTop = "50px";
				reloadBTN.addEventListener("click", function() {
					location.reload();
				});
				var uniqueEmails = {};
				var emails = document.querySelectorAll("a[href^='mailto']");
				var myList = "";
				for(var i=0; i<emails.length; i++) {
					if(!uniqueEmails[emails[i].innerHTML]) {
						uniqueEmails[emails[i].innerHTML] = 1;
						myList += emails[i].innerHTML + ";<br/>";
					}
				}
				document.body.innerHTML = "";
				document.body.appendChild(reloadBTN);
				var div = document.createElement("div");
				div.style.paddingLeft = "100px";
				div.style.paddingTop = "100px";
				div.innerHTML = myList;
				document.body.appendChild(div);
			});
			committeeName.appendChild(btn);
	} + ')();'
	insertScript(actualCode);
}






function formatSearchBallots() {
	console.log("formatSearchBallots");
	var str = window.location.href;
	if(str.search("Ballot=") == -1) return;
// 	str = str.substring(str.lastIndexOf("&Ballot=")+8,str.length);
// 	console.log("[value=" + str + "]");
	var actualCode = "(" + function() {

		console.log(document.querySelector("[type=Button]").onclick);
		var str = document.querySelector("[type=Button]").onclick.toString();
		var ballotnum = str.substring(str.lastIndexOf("BallotNumber")+13,str.lastIndexOf("&BallotYearOpened"));
		var yearnum = str.substring(str.lastIndexOf("YearOpened=")+11,str.lastIndexOf("&NoToolbar"));
		window.open("https://cstools.asme.org/csconnect/NewBallotForm.cfm?check=no&BallotNumber="+ballotnum+"&BallotYearOpened="+yearnum+"&NoToolbar=yes");
		setTimeout(function() {
			window.close();
		}, 10);
	
	} + ")();";
	
	insertScript(actualCode);
}


function formatNewEntireDocumentRecord() {
	document.querySelector("#ItemDescription > tbody > tr:nth-child(6) > td:nth-child(1)").className = "form form-inline";
}

function formatViewEntireDocumentRecord() {
	var reformatDiv = document.createElement("div");
	var updateBtn = document.createElement("button");
		updateBtn.className = "btn btn-default btn-xs";
	    updateBtn.innerText = "Update Record";
	    updateBtn.setAttribute("onclick","openUpdateWindow();");
	reformatDiv.appendChild(updateBtn);
	document.querySelector(".pagehdg").appendChild(reformatDiv);

	var actualCode = function openUpdateWindow() {
		var currentHref = window.location.href;
			currentHref = currentHref.replace("SearchAction", "UpdateRecordForm");
			currentHref += "&Action=Update";
			window.location.href = currentHref;
	};
	insertScript(actualCode);
}