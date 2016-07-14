function formatRecordSearchResults() {
	var results = document.querySelector(".ResultsPage").tBodies[0];
	for(var i=1; i<results.children.length; i++) {
		if(results.children[i].children[1]) {
			var level = results.children[i].children[1];
			if(level.innerText.search("Approved") != -1 && level.innerText.search("Board") != -1) {
				level.style.fontWeight = "bold";
				level.style.color = "#1aa3ff";
			}
			if(level.innerText.search("Approved") != -1 && level.innerText.search("Board") == -1) {
				level.style.fontWeight = "bold";
				level.style.color = "red";
			}
		}
	}

	var actualCode = "("+function() {
		var heading = document.querySelector(".pagehdg");
		var div = document.createElement("div");
		heading.appendChild(div);
		var span = document.createElement("span");
		span.innerText = "List Open Records";
		span.addEventListener("click",makeList);
		span.setAttribute("class","btn btn-primary btn-xs text-center");
		div.appendChild(span);
		var div2 = document.createElement("div");
		heading.appendChild(div2);
		//div2.innerText = "(More efficient with search for 'All Board Approved')";
		div.style.textAlign = "center";
		div2.style.textAlign = "center";
		div2.style.fontSize = "10pt";
		div2.style.fontWeight = "initial";
	}+")();" + function openRecords() {
		var i=2;
		var goThrough = window.setInterval(function(){
			if(recordNum = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table.ResultsPage > tbody > tr:nth-child("+i+") > td:nth-child(1) > div:nth-child(1) > input")) {
				var recordNum = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table.ResultsPage > tbody > tr:nth-child("+i+") > td:nth-child(1) > div:nth-child(1) > input").value;
				var year = recordNum.split("-")[0];
				var num = recordNum.split("-")[1];
				NewWindow('SearchAction.cfm?TrackingNumber='+num+'&YearOpened='+year+'&NoToolbar=yes&CheckPublished=yes');
				
				i++;	
			} else {
				window.clearInterval(goThrough);
				setNewStatus();
			}
			
		}, 2000);
	} + "" + function setNewStatus() {

	} + "" + function makeList() {
		var results = document.querySelector(".ResultsPage").tBodies[0];
		var links = [];
		var subjects = [];
		for(var i=1; i<results.children.length; i++) {
			if(results.children[i].children[1]) {
				var level = results.children[i].children[1];
				if(level.innerText.search("Proposal") != -1) {
					var link = results.children[i].children[0].firstElementChild.firstElementChild;
					var recordNum = link.value;
					var year = recordNum.split("-")[0];
					var num = recordNum.split("-")[1];
					var a = document.createElement("a");
					
					a.innerText = recordNum;
					a.href = 'SearchAction.cfm?TrackingNumber='+num+'&YearOpened='+year+'&NoToolbar=yes';
					a.target = "_blank";
					a.setAttribute("style","font-weight:bold");
					links.push(a);

					var subject = results.children[i].children[2].innerText;
					subjects.push(subject);
				}
			}
		}
		console.log(links);
		console.log(subjects);
		var parent = results.parentNode;
		parent.removeChild(results);

		for(var j=0; j<links.length; j++) {
			var div = document.createElement("div");
			var subjNode = document.createTextNode(" "+subjects[j]);
			div.appendChild(links[j]);
			div.appendChild(subjNode);
			parent.appendChild(div);
		}
	};
insertScript(actualCode);
}

// body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table.ResultsPage > tbody > tr:nth-child(3) > td:nth-child(4) > input

