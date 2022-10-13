const local_api = "http://localhost:3000/";

function newTask(desc) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		description: desc,
		done: false,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch(local_api, requestOptions)
		.then((response) => response.text())
		.then((result) => loadTasks())
		.catch((error) => console.log("error", error));
}

function loadTasks() {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	fetch(local_api, requestOptions)
		.then((response) => response.text())
		.then((result) => showTasks(result))
		.catch((error) => console.log("error", error));
}

function showTasks(result) {
	var jdata = JSON.parse(result);
	var newline = "";
	document.getElementById("tasklist").innerHTML = "";
	for (var i = 0; i < jdata.length; i++) {
		console.log(jdata[i]);
		newline = jdata[i].description;
		if (jdata[i].done) {
			newline += " (done)";
		} else {
			newline +=
				" <a href=\"javascript:doneTask('" +
				jdata[i]._id +
				"')\">(not done)</a>";
		}
		document.getElementById("tasklist").innerHTML +=
			"<li>" + newline + " (" + jdata[i]._id + ")</li>";
	}
}

function doneTask(taskid) {
	var requestOptions = {
		method: "DELETE",
	};

	fetch(local_api + taskid, requestOptions)
		.then((response) => response.text())
		.then((result) => loadTasks())
		.catch((error) => console.log("error", error));
}
