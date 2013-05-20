/* SAMPLE FOR iOS (iPhone / iPad)
 * It just works!
 */

//SOME SAMPLE DATA FOR GALLERY LAYOUT
var items = [
	{title:'sample 1', image:'http://www.lorempixel.com/700/600/'},
	{title:'sample 2', image:'http://www.lorempixel.com/900/1200/'},
	{title:'sample 3', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 4', image:'http://www.lorempixel.com/600/600/'},
	{title:'sample 5', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 6', image:'http://www.lorempixel.com/410/300/'},
	{title:'sample 7', image:'http://www.lorempixel.com/500/300/'},
	{title:'sample 8', image:'http://www.lorempixel.com/300/300/'},
	{title:'sample 9', image:'http://www.lorempixel.com/450/320/'},
	{title:'sample 10', image:'http://www.lorempixel.com/500/400/'}
];

//SAMPLE FOR CUSTOM VIEWS
/*
var items = [];
for (var x=0;x<10;x++){
	var view = Ti.UI.createView({
		width:'99%',
		height:'99%',
		backgroundColor:'#555'
	});
	
	var label = Ti.UI.createLabel({
		text:'View ' + x,
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#fff'
	});
	view.add(label);
	items.push(view);
};
*/

$.fg.createGrid({
	columns:4, 					//NUMBER OF COLUMNS. DEFAULT IS 4.
	space:10, 					//SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
	data:items,					//ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE
	layout:'gallery',			//LAYOUT TYPE: gallery or customView. DEFAULT IS gallery
	params:{
		padding:5,				//GALLERY ONLY
		showTitle:false,		//GALLERY ONLY
		backgroundColor: '#eee',
		gridColor: '#ccc'
	}
	//width: 320				//OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
});


// EXAMPLE OF HOW TO USE TIFLEXIGRID IN IOS
// WITH DIFFERENT LAYOUTS IN ORIENTATION CHANGES
Ti.Gesture.addEventListener('orientationchange', function(e){

    var orientation = e.orientation;
    	
    	if (orientation < 1 || orientation > 4){
	    	return;
	    }
		else if (orientation == 1 || orientation == 2){
			$.fg.clearGrid();
	    	var params = {
				columns:4,
				space:10,
				data: items,
				layout:'gallery',
				params:{
					padding:5,
					showTitle:false,
					backgroundColor: '#eee',
					gridColor: '#ccc'
				},
				width: $.fgWin.size.width
			};
			$.fg.createGrid(params);
	    }
	    else if (orientation == 3 || orientation == 4) {
	    	$.fg.clearGrid();
	    	var params = {
				columns:6,
				space:10,
				data: items,
				layout:'gallery',
				params:{
					padding:5,
					showTitle:false,
					backgroundColor: '#eee',
					gridColor: '#ccc'
				},
				width: $.fgWin.size.width
			};
			$.fg.createGrid(params);
	    }    
});

$.fgWin.open();
