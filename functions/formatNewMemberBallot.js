function formatNewMemberBallot() {
	document.getElementById("ProspectMemberID").parentElement.setAttribute("class","form form-inline");
	var DATECLOSED = document.getElementById("DateClosed");
    DATECLOSED.value = dateInput(14);

	DATECLOSED.parentElement.setAttribute("class","form form-inline");
	DATECLOSED.setAttribute("class","form-control");

	var actualCode = "(" + function() {
			window.ProspectMemberID = document.getElementById("ProspectMemberID");
			window.DeleteProspectMemberID = document.getElementById("DeleteProspectMemberID");
			window.BoardCommittee = document.getElementById("BoardCommittee");
			window.StandardsCommittee = document.getElementById("StandardsCommittee");
			window.Subcommittee = document.getElementById("SubCommittee");
			window.Description = document.querySelector("[name=Description]");
			window.Explanation = document.querySelector("[name=Explanation]");
			window.Remarks = document.querySelector("[name=Remarks]");
			ProspectMemberID.addEventListener("click", newmember);
			//var checkNew = window.setInterval(newmember, 1000);
			var addbtns = document.querySelectorAll("[name=Add], [name=Remove]");

			for(var i=0; i<addbtns.length; i++) {
				addbtns[i].addEventListener("click", newmember);
			}

		} + ")(); " + function newmember() {
			Description.value = "";
			Remarks.value = "";
			if(checkComplete()) {
				window.committeeBalloted = {board:[], standards:[], sub:[], committees: 0};
				for(var i=0; i<BoardCommittee.children.length; i++) {
					committeeBalloted.board.push(BoardCommittee.children[i].text);
					committeeBalloted.committees++;
				}
				for(var i=0; i<StandardsCommittee.children.length; i++) {
					committeeBalloted.standards.push(StandardsCommittee.children[i].text + " Standards Committee");
					committeeBalloted.committees++;
				}
				for(var i=0; i<Subcommittee.children.length; i++) {
					committeeBalloted.sub.push(Subcommittee.children[i].text);
					committeeBalloted.committees++;
				}

				Description.value = "Two week " + writeCommittees() + " membership ballot for the following:\n";
				Remarks.value = "Two week " + writeCommittees() + " membership ballot for the following:\n";

				for(var i=0; i<DeleteProspectMemberID.children.length; i++) {
					Description.value += " - " + DeleteProspectMemberID.children[i].text + "\n";
					Remarks.value += " - " + DeleteProspectMemberID.children[i].text + "\n";
				}
			}
		} + function checkComplete() {
			if(!DeleteProspectMemberID.children[0]) {
				return false;
			}
			if(!BoardCommittee.children[0] && !StandardsCommittee.children[0] && !Subcommittee.children[0]) {
				return false;
			}
			return true;
		} + function writeCommittees() {
			var out = "";
			for(committee in committeeBalloted) {
				if(committeeBalloted[committee].length > 0 && committee != "committees") {
					out += committeeBalloted[committee].join(" and ");
					if(committeeBalloted["committees"] > 1 && committee != "sub") out += ", ";
				}
			}
			return out;
		};
	insertScript(actualCode);
}

//<option value="N10060600~2742~1~~Z02">Mohammad Abutayeh for Appointment on B16 SC C Steel Flanges as Member </option>