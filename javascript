<script language="javascript">

$(document).ready(function(){
	$('select[name^="quan"]').change(function() {
		$("#subtotal").val(calculateTotals()[0]);
		$("#tax").val(calculateTotals()[1].toFixed(2));
		$("#total").val(calculateTotals()[2].toFixed(2));
	})

	costs = document.getElementsByName('cost');

	$('select[name="quan0"]').change(function() {
		a = document.getElementsByName('quan0')[0];
		quan = parseFloat(a.options[a.selectedIndex].text);
		cost = menuItems[0].cost;
		$(costs[0]).val(quan*cost).toFixed(2);
	})
	$('select[name="quan1"]').change(function() {
		a = document.getElementsByName('quan1')[0];
		quan = parseFloat(a.options[a.selectedIndex].text);
		cost = menuItems[1].cost;
		$(costs[1]).val(quan*cost).toFixed(2);
	})
	$('select[name="quan2"]').change(function() {
		a = document.getElementsByName('quan2')[0];
		quan = parseFloat(a.options[a.selectedIndex].text);
		cost = menuItems[2].cost;
		$(costs[2]).val(quan*cost).toFixed(2);
	})
	$('select[name="quan3"]').change(function() {
		a = document.getElementsByName('quan3')[0];
		quan = parseFloat(a.options[a.selectedIndex].text);
		cost = menuItems[3].cost;
		$(costs[3]).val(quan*cost).toFixed(2);
	})
	$('select[name="quan4"]').change(function() {
		a = document.getElementsByName('quan4')[0];
		quan = parseFloat(a.options[a.selectedIndex].text);
		cost = menuItems[4].cost;
		$(costs[4]).val(quan*cost).toFixed(2);
	})
})

function validateForm() {
	valid = true;
	with(document.forms[0]) {
		if (lname.value == "") {
			valid = false;
			alert("No last name provided");
		}
		if (phone.value == "") {
			valid = false;
			alert("No phone number provided");
		}
		else if (phone.value.length != 10) {
			valid = false;
			alert("Invalid phone number provided. Input phone number in form xxxxxxxxxx.");
		}
		if (!(document.getElementById('pickup_check').checked)) {
			if (street.value == "") {
				valid = false;
				alert("No street provided");
			}
			if (city.value == "") {
				valid = false;
				alert("No city provided");
			}
		}
	}
	
	numItems = calculateNumOrdered();
	if (numItems == 0) {
		valid = false;
		alert("Must order at least one item.");
	}
	if (valid) thankYou();
}

function calculateNumOrdered() {
	numItems = 0;
	for (i=0;i<menuItems.length;i++) {
		a = document.getElementsByName('quan'+i)[0];
		numItems += parseInt(a.options[a.selectedIndex].text);
	}
	return numItems;
}

function getItemsOrdered() {
	items = "";
	for (i=0;i<menuItems.length;i++) {
		a = document.getElementsByName('quan'+i)[0];
		items += " " + a.options[a.selectedIndex].text + " " + menuItems[i].name + ",";
	}
	return items;
}

function calculateTotals() {
	subtotal = 0;
	for (i=0;i<menuItems.length;i++) {
		a = document.getElementsByName('quan'+i)[0];
		quan = parseInt(a.options[a.selectedIndex].text);
		cost = menuItems[i].cost;
		subtotal += cost * quan;
	}
	tax = 0.0625*subtotal;
	total = subtotal + tax;
	return [subtotal, tax, total];
}

function showFields() {
	if (document.getElementById('pickup_check').checked) {
		document.getElementById('strt').style.visibility = 'hidden';
       	document.getElementById('cty').style.visibility = 'hidden';
	}
	else {
		document.getElementById('strt').style.visibility = 'visible';
        document.getElementById('cty').style.visibility = 'visible';
	}
}

function thankYouHelper(timeTillReady) {
	today = new Date();
	time = new Date(today.getTime() + timeTillReady*60000);
	hour = time.getHours();
	if (time.getMinutes() < 10) {
		min = "0" + time.getMinutes();
	} else min = time.getMinutes();
	
	if (document.forms[0].p_or_d.value == 'pickup') message1 = "Your order will be ready for pickup at ";
	else message1 = "Your order will be delivered at ";

	message2 = getItemsOrdered();

	alert("Thank you for your order.\nOrder:" + message2 + "\nTotal: $" + calculateTotals()[2].toFixed(2) + "\n" + message1 + hour + ":" + min);
}

function thankYou() {
	with (document.forms[0]) {
		if (p_or_d.value == 'pickup') thankYouHelper(15);
		else thankYouHelper(30);
	}
}

</script>
