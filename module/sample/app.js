//CREATES THE MAIN WINDOW, HEADER AND A TITLE
var win = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff',
    layout:'vertical'
});

var header = Ti.UI.createView({
	width:Ti.UI.FILL,
	height:60,
	backgroundColor:'#00b3ed',
	top:0
});

var title = Ti.UI.createLabel({
	text:'TiFlexiGrid',
	width:Ti.UI.SIZE,
	height:Ti.UI.SIZE,
	color:'#fff',
	font:{fontSize:18,fontWeight:'bold'},
	bottom:10
});
header.add(title);


//HERE WE CREATE OUR GRID ITEMS.
var items = [];

for(var x=0;x<25;x++){
	//THIS IS THE ITEM VIEW LAYOUT (RIGHT NOW JUST A VIEW WITH A LABEL)
	var view = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:'#eee'
	});
	var label = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:x
	});
	view.add(label);
	
	//THE DATA WE WANT AVAILABLE FOR THIS ITEM
	var values = {
			title: x
		};
	
	//WE ADD THE ITEM VIEW AND DATA
	items.push({
		view: view,
		data: values
	});
}


//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){
	alert('Title is: ' + e.source.data.title + '.');
};


//INCLUDE THE TIFLEXIGRID MODULE
var TFG = require('tiflexigrid');

//INITIALIZE & CREATE TIFLEXIGRID
var grid_view = TFG.init({
	columns:4,
	space:5,
	gridBackgroundColor:'#fff',
	itemHeightDelta: 0,
	itemBackgroundColor:'#eee',
	itemBorderColor:'transparent',
	itemBorderWidth:0,
	itemBorderRadius:0,
	onItemClick: showGridItemInfo,
	data:items
});

//BUTTON FOR CLEARING THE GRID VIEW
var btn_clear = Ti.UI.createButton({
	width:Ti.UI.SIZE,
	height:Ti.UI.SIZE,
	title:'Clear',
	right:10,
	bottom:8
});

btn_clear.addEventListener('click',function(e){
	TFG.clearGrid();
});
header.add(btn_clear);


//BUTTON FOR ADDING ITEMS TO THE GRID VIEW
var btn_add = Ti.UI.createButton({
	width:Ti.UI.SIZE,
	height:Ti.UI.SIZE,
	title:'Add',
	left:10,
	bottom:8
});

btn_add.addEventListener('click',function(e){
	TFG.addGridItems(items);
});
header.add(btn_add);


//ADD THE HEADER AND THE GRID VIEW TO THE MAIN WINDOW
win.add(header);
win.add(grid_view);

//OPEN MAIN WIN
win.open();
