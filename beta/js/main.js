var menu =[];
var cost = 0;

$.ajax({
    url: "../json/menu.json",
    //force to handle it as text
    dataType: "text",
    success: function(data) {
        var json = $.parseJSON(data);
        menu = json.menu_items;
    }
});

	var cw = Raphael.colorwheel($("#size_example .colorwheel_large")[0],300, 250).color("#00F");

	cw.onchange(function(color)
    {
    	updateTable(parseInt(color.r), parseInt(color.g), parseInt(color.b));
    });

function updateTable(red, green, blue) {
	var count = 0;
	for(i in menu) {
		if (count == 3){
			count = 0;
			cost = 0;
			break;
		}
		var item = menu[i];
		if(item.id == red){
			cost += item.price;
			setHtml(item, "Red");
			count++;
		}
		if(item.id == green){
			cost += item.price;
			setHtml(item, "Green");
			count++;
		}
		if(item.id == blue){
			cost += item.price;
			setHtml(item, "Blue");
			count++;
		}
	}
}

function setHtml(item, colour) {
	document.getElementById("rgbID"+colour).innerHTML = item.id;
	document.getElementById("rgbName"+colour).innerHTML = item.name;
	document.getElementById("rgbPrice"+colour).innerHTML = "£" + item.price.toFixed(2);
	document.getElementById("totalPrice").innerHTML = "£" + cost.toFixed(2);
}

function getRandom() {
	var hex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	cw.color(hex);
	var rgb = hexToRgb(hex);
    updateTable(rgb.r, rgb.g, rgb.b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}