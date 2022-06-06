let saveBtn = document.getElementById("saveBtn");
let checkOp3 = document.getElementById('cb3');
let SWopExp = document.getElementById('SWoption');


document.getElementById("opt").style.display = 'none';


document.addEventListener("DOMContentLoaded", function(){
	chrome.storage.sync.get(function (v) {
		var st_cb1 = v.IpKeywordData;
		var st_cb2 = v.IpSummarizationData;
		var st_cb3 = v.IpSentenceData;
		var st_cb4 = v.IpShowAllData;
		var st_SWop = v.IpSWoption;
	

		var cb1 = document.getElementById('cb1');
		var cb2 = document.getElementById('cb2');
		var cb3 = document.getElementById('cb3');
		var cb4 = document.getElementById('cb4');

		var op1 = document.getElementById('SWop1');
		var op2 = document.getElementById('SWop2');

		cb1.checked = st_cb1;
		cb2.checked = st_cb2;
		cb3.checked = st_cb3;
		cb4.checked = st_cb4;


		var SWoption = st_SWop;
		var SwoptionExp = document.getElementById('exp');

		if(checkOp3.checked == !0){
			document.getElementById("opt").style.display = '';
			if(SWoption == "1"){
				SwoptionExp.textContent = "Search by sentence";
				op1.checked = true;
			} else {
				SwoptionExp.textContent = "Search by words";
				op2.checked = true;
			}

		} else {
			document.getElementById("opt").style.display = 'none';
		}
	});
});




checkOp3.addEventListener("click", async() => {

	if(checkOp3.checked == !0){
		document.getElementById("opt").style.display = '';
	} else {
		document.getElementById("opt").style.display = 'none';
	}
})

SWopExp.addEventListener("click", async() => {
	var SWoption = document.querySelector('input[name="SWoption"]:checked').value;
	var SwoptionExp = document.getElementById('exp');

	if(SWoption == "1"){
		SwoptionExp.textContent = "Search by sentence";
	} else {
		SwoptionExp.textContent = "Search by words";
	}
})


saveBtn.addEventListener("click", async () => {

  var cb1 = document.getElementById('cb1');
  var cb2 = document.getElementById('cb2');
  var cb3 = document.getElementById('cb3');
  var cb4 = document.getElementById('cb4');
  var op = document.querySelector('input[name="SWoption"]:checked').value;

 //var op = $('input[name="SWoption"]:checked').val();
  
  
  chrome.storage.sync.set({
	IpKeywordData: cb1.checked,
	IpSummarizationData: cb2.checked,
	IpSentenceData: cb3.checked,
	IpShowAllData:cb4.checked,
	IpSWoption: op
	
	}, function(){console.log('Value is set!');}
	);
	
});

