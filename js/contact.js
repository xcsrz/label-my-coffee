(function() {
	var holderClassName = 'contact-form-container'
	var submitClassName = 'contact-form-submit'
	var active = false;
	var formHolder;

	var activate = function() {
		var forms = document.getElementsByClassName(holderClassName);
		[].forEach.call(forms,function(form){
			// var found = {name:0,email:0,message:0};
			var inputs = form.getElementsByTagName('input');
			// [].forEach.call(inputs,function(elem){
			// 	if(elem.hasAttribute('name')) {
			// 		found[elem.getAttribute('name')]++;
			// 	}
			// });
			// if(found.name != 1 || found.email != 1 || found.message != 1) {
			// 	console.log("ERROR: Unable to initialize contact form.");
			// } else {
				var submits = form.getElementsByClassName(submitClassName);
				if(submits.length < 1) {
					console.log("ERROR: Unable to initialize contact action");
				} else {
					[].forEach.call(submits, function(submit){
						submit.addEventListener("click", function(){
							send(form);
						});
						active = true;
					});
				}
			// }
		});
	}

	var encodeForm = function(form) {
		if(!active) {
			return;
		}
		var payload = "";
		var inputs = form.getElementsByTagName('input');
		[].forEach.call(inputs, function(input){
			if(input.hasAttribute('name')) {
				payload += input.getAttribute('name') + "=" + encodeURIComponent(input.value) + "&";
			}
		});
		return payload;
	}

	var send = function(form) {
		if(!active) {
			return;
		}
		var data = encodeForm(form);
		var req = new XMLHttpRequest();
		req.open('POST', 'http://localhost:8080/send', true);
		// req.open('POST', 'https://form-mailer-1191.appspot.com/send', true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(data);
		req.onreadystatechange = function () {
			var DONE = 4; // readyState 4 means the request is done.
			var OK = 200; // status 200 is a successful return.
			if (req.readyState === DONE) {
				if (req.status === OK) {
					console.log(req.responseText); // 'This is the returned text.'
				} else {
					console.log('Error: ' + req.status); // An error occurred during the request.
				}
			}
		};
	}

	activate();

}).call(this);