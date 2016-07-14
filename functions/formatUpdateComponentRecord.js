function formatUpdateComponentRecord() {
	window.onload = function() {
		if(window.location.href.indexOf("CheckPublished") != -1) {
			document.getElementById("ItemLevelID").value = 11;
			document.querySelector("body > table > tbody > tr:nth-child(2) > td > form > input.btn.btn-primary.btn-xs").click();
		}
	}
}