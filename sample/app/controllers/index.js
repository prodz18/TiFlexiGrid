var items = [];

//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){
	alert('Title is: ' + e.source.data.title + '. Image is: ' + e.source.data.image);
};

//INITIALIZE TIFLEXIGRID
$.fg.init({
	columns:3,
	space:5,
	gridBackgroundColor:'#fff',
	itemHeightDelta: 0,
	itemBackgroundColor:'#eee',
	itemBorderColor:'transparent',
	itemBorderWidth:0,
	itemBorderRadius:0,
	onItemClick: showGridItemInfo
});

//CUSTOM FUNCTION TO CREATE THE ITEMS FOR THE GRID
function createSampleData(){
	
	items = [];
	
	//SOME DATA FOR A GALLERY LAYOUT SAMPLE
	var sample_data = [
		{title:'sample 1', image:'http://www.lorempixel.com/700/600/'},
		{title:'sample 2', image:'http://www.lorempixel.com/900/1200/'},
		{title:'sample 3', image:'http://www.lorempixel.com/400/300/'},
		{title:'sample 4', image:'http://www.lorempixel.com/600/600/'},
		{title:'sample 5', image:'http://www.lorempixel.com/400/310/'},
		{title:'sample 6', image:'http://www.lorempixel.com/410/300/'},
		{title:'sample 7', image:'http://www.lorempixel.com/500/300/'},
		{title:'sample 8', image:'http://www.lorempixel.com/300/300/'},
		{title:'sample 9', image:'http://www.lorempixel.com/450/320/'},
		{title:'sample 10', image:'http://www.lorempixel.com/523/424/'},
		{title:'sample 11', image:'http://www.lorempixel.com/610/320/'},
		{title:'sample 12', image:'http://www.lorempixel.com/450/450/'},
		{title:'sample 13', image:'http://www.lorempixel.com/620/420/'},
		{title:'sample 14', image:'http://www.lorempixel.com/710/410/'},
		{title:'sample 15', image:'http://www.lorempixel.com/500/500/'}
	];
	
	if(OS_ANDROID){
		sample_data = [
			{title:'sample 1', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 2', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 3', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 4', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 5', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 6', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 7', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 8', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 9', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 10', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 11', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 12', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 13', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 14', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 15', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'}
		];
	}
	
	for (var x=0;x<sample_data.length;x++){
	
		//CREATES A VIEW WITH OUR CUSTOM LAYOUT
		var view = Alloy.createController('item_gallery',{
			image:sample_data[x].image,
			width:$.fg.getItemWidth(),
			height:$.fg.getItemHeight()
		}).getView();
		
		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {
			title: sample_data[x].title,
			image: sample_data[x].image
		};
		
		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		items.push({
			view: view,
			data: values
		});
	};
	
	//ADD ALL THE ITEMS TO THE GRID
	$.fg.addGridItems(items);
	
};
createSampleData();


// EXAMPLE OF HOW TO USE TIFLEXIGRID IN iOS & ANDROID
// WITH DIFFERENT LAYOUTS IN ORIENTATION CHANGES
Ti.Gesture.addEventListener('orientationchange', function(e){

    var orientation = e.orientation;
    var nColumn,nSpace;
    
    if(OS_ANDROID){
    	if (orientation < 1 || orientation > 4){
	    	return;
	    }
	    else if (orientation == 1){
	    	nColumn = 3;
			nSpace = 5;
	    }
	    else if (orientation == 2) {
	    	nColumn = 5;
			nSpace = 7;
	    }
    }
    else{
    	if (orientation < 1 || orientation > 4){
	    	return;
	    }
		else if (orientation == 1 || orientation == 2){
			nColumn = 3;
			nSpace = 5;
	    }
	    else if (orientation == 3 || orientation == 4) {
	    	nColumn = 5;
			nSpace = 7;
	    }
    }	
	
    $.fg.clearGrid();
    $.fg.init({
		columns:nColumn,
		space:nSpace,
		gridBackgroundColor:'#fff',
		itemHeightDelta: 0,
		itemBackgroundColor:'#eee',
		itemBorderColor:'transparent',
		itemBorderWidth:0,
		itemBorderRadius:0,
		onItemClick: showGridItemInfo
	});
    createSampleData();  
});

$.fgWin.open();
