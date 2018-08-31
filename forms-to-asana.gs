// Sets Asana API Key
function AuthData()
{
	return {"Authorization": "Basic " + Utilities.base64Encode("Asana-Personal-Access-Token" + ":" + "")};
}

// Simulates PHP's date function
Date.prototype.format=function(e){var t="";var n=Date.replaceChars;for(var r=0;r<e.length;r++){var i=e.charAt(r);if(r-1>=0&&e.charAt(r-1)=="\\"){t+=i}else if(n[i]){t+=n[i].call(this)}else if(i!="\\"){t+=i}}return t};Date.replaceChars={shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d:function(){return(this.getDate()<10?"0":"")+this.getDate()},D:function(){return Date.replaceChars.shortDays[this.getDay()]},j:function(){return this.getDate()},l:function(){return Date.replaceChars.longDays[this.getDay()]},N:function(){return this.getDay()+1},S:function(){return this.getDate()%10==1&&this.getDate()!=11?"st":this.getDate()%10==2&&this.getDate()!=12?"nd":this.getDate()%10==3&&this.getDate()!=13?"rd":"th"},w:function(){return this.getDay()},z:function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil((this-e)/864e5)},W:function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil(((this-e)/864e5+e.getDay()+1)/7)},F:function(){return Date.replaceChars.longMonths[this.getMonth()]},m:function(){return(this.getMonth()<9?"0":"")+(this.getMonth()+1)},M:function(){return Date.replaceChars.shortMonths[this.getMonth()]},n:function(){return this.getMonth()+1},t:function(){var e=new Date;return(new Date(e.getFullYear(),e.getMonth(),0)).getDate()},L:function(){var e=this.getFullYear();return e%400==0||e%100!=0&&e%4==0},o:function(){var e=new Date(this.valueOf());e.setDate(e.getDate()-(this.getDay()+6)%7+3);return e.getFullYear()},Y:function(){return this.getFullYear()},y:function(){return(""+this.getFullYear()).substr(2)},a:function(){return this.getHours()<12?"am":"pm"},A:function(){return this.getHours()<12?"AM":"PM"},B:function(){return Math.floor(((this.getUTCHours()+1)%24+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)*1e3/24)},g:function(){return this.getHours()%12||12},G:function(){return this.getHours()},h:function(){return((this.getHours()%12||12)<10?"0":"")+(this.getHours()%12||12)},H:function(){return(this.getHours()<10?"0":"")+this.getHours()},i:function(){return(this.getMinutes()<10?"0":"")+this.getMinutes()},s:function(){return(this.getSeconds()<10?"0":"")+this.getSeconds()},u:function(){var e=this.getMilliseconds();return(e<10?"00":e<100?"0":"")+e},e:function(){return"Not Yet Supported"},I:function(){var e=null;for(var t=0;t<12;++t){var n=new Date(this.getFullYear(),t,1);var r=n.getTimezoneOffset();if(e===null)e=r;else if(r<e){e=r;break}else if(r>e)break}return this.getTimezoneOffset()==e|0},O:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+"00"},P:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+":00"},T:function(){var e=this.getMonth();this.setMonth(0);var t=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,"$1");this.setMonth(e);return t},Z:function(){return-this.getTimezoneOffset()*60},c:function(){return this.format("Y-m-d\\TH:i:sP")},r:function(){return this.toString()},U:function(){return this.getTime()/1e3}}

function PostData(e)
{
  var buyer = e.namedValues["Who should make this purchase?"].toString();
  if (buyer == "I will make this purchase")
    var title = "Express Order: " + e.namedValues['Order name'].toString();
  else if (buyer == "Non-contracted supplier")
    var title = "Special Order: " + e.namedValues['Order name'].toString();
  else
    var title = "Purchase Order: " + e.namedValues['Order name'].toString();

	var body = "<strong>Description:</strong>\n";
	body += e.namedValues['Description'].toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	body += "\n<strong>Ordered by:</strong> " + e.namedValues['Email Address'].toString();
	body += "\n-----------------\n";
	body += "<strong>Justification:</strong>\n";
	body += e.namedValues['Justification'].toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	body += "\n-----------------\n";
	body += "<strong>Quotation:</strong>\n";
	body += e.namedValues['Quotation'].toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	body += "\n-----------------\n";
	body += "<strong>Funding Source:</strong> " + e.namedValues['Funding source'].toString() + "\n";
	body += "<strong>Estimated Cost:</strong> " + e.namedValues['Total cost (estimated)'].toString() + "\n";
	body += "-----------------\n";
	body += "<strong>Shipping instructions:</strong> " +e.namedValues['Shipping instructions'].toString()+ "\n";
	body += "<strong>Deliver To:</strong> " +e.namedValues['Where should the equipment be delivered?'].toString()+ "\n";
	body += "<strong>Location:</strong> " +e.namedValues['Where will the equipment be located?'].toString()+ "\n";
	body += "-----------------\n";

    //if (buyer == "c")
       // body += "<strong>Please email this order to papurch@pitt.edu</strong>\n-----------------\n";

	var assignee = "";

	if (buyer == "Person McPerson")
		assignee = "p.mcperson@eg.com";
	else
		assignee = "default@eg.com";

	var d = new Date();

	/**
	*	Primary data for task
	*/
	var payload =
	{
		"workspace" : "123456", //PQI
		"projects" : "99999999",
		"assignee" : assignee,
		"name" : title,
		"html_notes" : body,
		"due_on" : d.format("Y-m-d"),
		"followers" : assignee
	};
	var options = { "method" : "post", "payload" : payload, "muteHttpExceptions": true};
	options.headers = AuthData();

	// Create the task
	var response = UrlFetchApp.fetch("https://app.asana.com/api/1.0/tasks/?opt_pretty", options);
	if (response.getResponseCode() == 400)
	{
		var errordata = JSON.parse (response);
		MailApp.sendEmail(e.namedValues["Email Address"].toString(), "Task \""+title+"\" could not be created", "Asana reported this error:\n" + errordata.errors[0].message.toString() + "\n\nThis incident has been reported.", {bcc: "webmaster@eg.com"});
		return 0;
	}


	// Get response data
	jResponse = JSON.parse (response);

	/**
	* Add followers
	*/

    var followers = e.namedValues["Email Address"].toString();
	if (e.namedValues["Who should be copied on this purchase order?"].toString() !== "")
		followers += "," + e.namedValues["Who should be copied on this purchase order?"].toString();

	followers = followers.replace("John Smith", "john.smith@eg.com");
	followers = followers.replace("Jane Smith", "jane.smith@eg.com");

    followers = followers.replace(/\s/g, "");

	var num = 0;
	var error = "";
	do
	{
		//Logger.log(followers);

		while (followers.slice(-1) == ',')
			followers = followers.substring(0, followers.length - 1);
		while (followers.slice(0, 1) == ',')
			followers = followers.slice(1, followers.length);

		payload = {"followers" : followers};
		options = { "method" : "post", "payload" : payload, "muteHttpExceptions": true};
		options.headers = AuthData();

		response = UrlFetchApp.fetch("https://app.asana.com/api/1.0/tasks/"+jResponse.data.id+"/addFollowers?opt_pretty", options);

		if (response.getResponseCode() == 400)
		{
			var rdata = JSON.parse (response);
			var email = rdata.errors[0].message.toString();
			email = email.replace(/\s/g, "");
			email = email.substring(email.indexOf("Organization:") + "Organization:".length);

			Logger.log("Bad email:" + email);
			error += email + "\n";

			followers = followers.replace(email, "");
			followers = followers.replace(/[,\s]{2,}/,",");

			num++;
		}
	}
	while (response.getResponseCode() == 400);
	if (response.getResponseCode() == 400)
		MailApp.sendEmail(e.namedValues["Email Address"].toString(), "Errors occurred while creating task", "The following emails are not part of the destination organization:\n" + error);

	/**
	* Move task inside the project
	*/
	/*
	var payload = {"project" : "PROJECTID", "insert_after" : "TASKORSECTION"};
	var options = { "method" : "post", "payload" : payload };
	options.headers = AuthData()
	var response = UrlFetchApp.fetch("https://app.asana.com/api/1.0/tasks/"+jResponse.data.id+"/addProject?opt_pretty", options);

	Logger.log("Response:  " + response.getResponseCode() + "\n\nContent:\n" + response.getContentText());
	*/

	/**
	* Set task tag
	*/
	/*
	var payload = {"tag" : "TAGID"};
	var options = { "method" : "post", "payload" : payload };
	options.headers = AuthData();
	UrlFetchApp.fetch("https://app.asana.com/api/1.0/tasks/"+jResponse.data.id+"/addTag?opt_pretty", options);
	*/
}