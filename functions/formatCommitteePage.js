function formatCommitteePage() {
  var committeename = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(8) > tbody > tr > td:nth-child(2) > div").innerText;
  console.log(committeename);
  replaceNavBar();
  $(ul).before(committeename);
  doToAll("a", {"style": "font-size:13px;"});
  doToAll("[alt='Click to Update']", {"style": "height:20px; width:25px;"});
  doToAll("[alt='Click to Delete']", {"style": "height:20px; width:25px;"});

  var actualCode = '(' + function() {

    window.headers = document.querySelectorAll(".LeftMenu .Header");
    window.LeftMenu = document.querySelector(".LeftMenu");
      LeftMenu.setAttribute("class","LeftMenu table table-condensed");
    window.Links = document.querySelectorAll(".Link a");
    window.links = document.querySelectorAll(".Detail");
    
    window.Meetings = {  title: headers[0],  links : [] };
    window.ThisCommittee = {  title: headers[1],  links : []  };
    window.Resources = {  title: headers[2],  links : []  };
    window.PublicInfo = {  title: headers[3],  links : []  };
    
    for(var i=0; i<headers.length; i++) {
      if(headers[i].children[1]) {
        headers[i].children[0].style.padding = "0.5em";
        headers[i].children[0].style.backgroundColor = "rgb(235, 243, 249)";
        headers[i].children[0].style.color = "black";
        headers[i].children[1].style.padding = "0.5em";
        headers[i].children[1].style.backgroundColor = "rgb(235, 243, 249)";
        headers[i].children[1].style.color = "black";
      }
    }

    for(var i=0; i<links.length; i++) {
      links[i].children[1].style.padding = "0.2em";
      links[i].children[1].style.backgroundColor = "white";
      links[i].children[1].style.border = "0px solid white";
      links[i].children[0].style.padding = "0.2em";
      links[i].children[0].style.backgroundColor = "white";
      links[i].children[0].style.border = "0px solid white";
      links[i].children[2].style.padding = "0.2em";
      links[i].children[2].style.backgroundColor = "white";
      links[i].children[2].style.border = "0px solid white";
      links[i].children[2].style.fontSize = "10pt";
      if($(LeftMenu.rows).index(links[i]) > $(LeftMenu.rows).index(Meetings.title) && 
        $(LeftMenu.rows).index(links[i]) < $(LeftMenu.rows).index(ThisCommittee.title)
        ) {
        Meetings.links.push(links[i]);
      }
      if($(LeftMenu.rows).index(links[i]) > $(LeftMenu.rows).index(ThisCommittee.title) && 
        $(LeftMenu.rows).index(links[i]) < $(LeftMenu.rows).index(Resources.title)
        ) {
        ThisCommittee.links.push(links[i]);
      }
      if($(LeftMenu.rows).index(links[i]) > $(LeftMenu.rows).index(Resources.title) && 
        $(LeftMenu.rows).index(links[i]) < $(LeftMenu.rows).index(PublicInfo.title)
        ) {
        Resources.links.push(links[i]);
      }
      if($(LeftMenu.rows).index(links[i]) > $(LeftMenu.rows).index(PublicInfo.title)
        ) {
        PublicInfo.links.push(links[i]);
      }
    }

    var staffLinks = LeftMenu.rows[0];

    document.querySelector("table tbody tr td table tbody tr").removeChild(document.querySelector("table tbody tr td table tbody tr td"));

    $(document.querySelector("table")).after("<div id='tablesDiv'></div>")
    window.tablesDiv = document.getElementById("tablesDiv");

    window.staffEdits = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td");
    
    window.staffEdits.children[0].removeChild(window.staffEdits.children[0].children[0]);
    window.staffEdits.children[0].innerText = "Home";
    staffEdits.children[0].className = "btn btn-default btn-xs";
    window.staffEdits.children[1].removeChild(window.staffEdits.children[1].children[0]);
    window.staffEdits.children[1].innerText = "Modify";
    staffEdits.children[1].className = "btn btn-default btn-xs";
    window.staffEdits.children[2].removeChild(window.staffEdits.children[2].children[0]);
    window.staffEdits.children[2].innerText = "File Maintenance";
    staffEdits.children[2].className = "btn btn-default btn-xs";

    insertAfter(SpanI(), staffEdits.children[0]);
    insertAfter(SpanI(), staffEdits.children[2]);

    var delbtns = document.querySelectorAll("[alt='Click to Delete']");
    for(var p=0; p<delbtns.length; p++) {
      var span = document.createElement("span");
      span.innerHTML = "&#8855;";
      span.style.color = "red";
      span.style.fontSize = "15px";
      span.setAttribute("title","Click to Delete");
      delbtns[p].parentNode.appendChild(span);
      delbtns[p].parentNode.removeChild(delbtns[p]);
    }

    var upbtns = document.querySelectorAll("[alt='Click to Update']");
    for(var p=0; p<upbtns.length; p++) {
      var span = document.createElement("span");
      span.innerHTML = "&#8859;";
      span.style.color = "blue";
      upbtns[p].parentNode.appendChild(span);
      span.style.fontSize = "15px";
      span.setAttribute("title","Click to Update");
      upbtns[p].parentNode.removeChild(upbtns[p]);
    }

    var addbtns = document.querySelectorAll("[alt='Click to Add to this menu']");
    for(var p=0; p<addbtns.length; p++) {
      var span = document.createElement("span");
      span.innerHTML = "&#8853;";
      span.style.color = "green";
      addbtns[p].parentNode.appendChild(span);
      span.style.fontSize = "15px";
      span.setAttribute("title","Click to Add to this menu");
      addbtns[p].parentNode.removeChild(addbtns[p]);
    }
  } + ')();' + function formatPDFLink() {
    window.pdfsLink = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(21) > td.Link > a");
    window.pdfsLink.style.color = "red";
  } + " " + function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  } + function SpanI() {
    var span = document.createElement("span");
    span.innerText = " | ";
    return span;
  };
  
  insertScript(actualCode);
  var emptyTable = document.querySelector("body > table:nth-child(2) > tbody > tr:nth-child(2) > td > table:nth-child(10)");
  emptyTable.parentNode.removeChild(emptyTable);
}
