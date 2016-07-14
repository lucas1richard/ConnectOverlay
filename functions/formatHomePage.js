function formatHomePage() {
	var actualCode = '(' + function() {
		window.MainTable = document.querySelector(".HomePage");
		MainTable.removeAttribute("border");
		MainTable.setAttribute("class","HomePage table table-condensed");
		MainTable.tBodies[0].removeChild(MainTable.rows[1]);
		for(var i=0; i<MainTable.rows.length; i++) {
			MainTable.rows[i].removeChild(MainTable.rows[i].children[1]);
			var committee = MainTable.rows[i].firstElementChild.innerText.split(" - ")[0];
			if(MainTable.rows[i].querySelectorAll("td")[4]) {
				if(MainTable.rows[i].querySelectorAll("td")[4].firstElementChild) {
					var button = MainTable.rows[i].querySelectorAll("td")[4].firstElementChild;
					button.value = committee;

					MainTable.rows[i].firstElementChild.removeChild(MainTable.rows[i].firstElementChild.firstChild);
					MainTable.rows[i].firstElementChild.appendChild(button);
				}
				MainTable.rows[i].removeChild(MainTable.rows[i].querySelectorAll("td")[4]);
				if(MainTable.rows[i].querySelectorAll("td")[1].firstElementChild) {
					MainTable.rows[i].querySelectorAll("td")[1].firstElementChild.value = "Ballots";
				}
				if(MainTable.rows[i].querySelectorAll("td")[2].firstElementChild) {
					MainTable.rows[i].querySelectorAll("td")[2].firstElementChild.value = "Records";
				}
			}
			if(MainTable.rows[i].querySelectorAll("th")[4]) {
				MainTable.rows[i].removeChild(MainTable.rows[i].querySelectorAll("th")[4]);
			}
		}
		MainTable.style.maxWidth = "1000px";
		MainTable.style.margin = "auto";
		window.SurveyTable = document.querySelectorAll(".HomePage")[2];
		SurveyTable.parentNode.removeChild(SurveyTable);
		window.ContactTable = document.querySelectorAll(".HomePage")[1];
		ContactTable.parentNode.removeChild(ContactTable);

	} + ')();';
	
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}