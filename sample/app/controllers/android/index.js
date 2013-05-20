/*SAMPLE FOR ANDROID
 * 
 * IMPORTANT!!! This sample uses anydensity = true and system units as dp
 * in the tiapp.xml. 
 * You can use something like this in your tiapp.xml:
 
  <property name="ti.ui.defaultunit" type="string">dp</property>
  <android xmlns:android="http://schemas.android.com/apk/res/android">
        <manifest android:versionCode="1" android:versionName="1.0">
        <supports-screens android:anyDensity="true"
            android:largeScreens="true" android:normalScreens="true"
            android:smallScreens="false" android:xlargeScreens="false"/>
        </manifest>
   </android>
   
 * See the tiapp.xml in this project for more details.
 * Is important to run the function "createGrid" on the open event of the main application
 * window or the window containing TiFlexiGrid. Also, put the function inside a setTimeout()
 * so it can give Android some time to render the window and return the correct dimensions.
 * 
 * The sample below shows all this process. Is a little bit tricky but it works.
 * If you don't want to separate the code for android, you can use this sample
 * for both iOS and Android and it'll work (except the orientation changes. Need a little 
 * 	more work). 
 */

//SOME SAMPLE DATA
var items = [
	{title:'sample 1', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 2', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 3', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 4', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 5', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 6', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 7', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 8', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 9', image:'http://dummyimage.com/400x300/000000/fff.jpg'},
	{title:'sample 10', image:'http://dummyimage.com/400x300/000000/fff.jpg'}
];

//SAMPLE FOR CUSTOM VIEWS
/*
var items = [];
for (var x=0;x<10;x++){
	var view = Ti.UI.createView({
		width:'90%',
		height:'90%',
		backgroundColor:'#ff0000'
	});
	
	var label = Ti.UI.createLabel({
		text:x,
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE
	});
	view.add(label);
	items.push(view);
};
*/

$.fgWin.addEventListener('open',function(e){
	setTimeout(function(){
		$.fg.createGrid({
			columns:3, 					//NUMBER OF COLUMNS. DEFAULT IS 4.
			space:10, 					//SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
			data:items,					//ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE
			layout:'gallery',			//LAYOUT TYPE: gallery,article,customView. DEFAULT IS gallery
			params:{
				padding:10,
				showTitle:false,
				backgroundColor: '#eee',
				gridColor: '#ccc'
			},
			width: $.fgWin.size.width	//OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
		});
	},800);
	
});


// EXAMPLE OF HOW TO USE TIFLEXIGRID IN ANDROID
// WITH DIFFERENT LAYOUTS IN ORIENTATION CHANGES
Ti.Gesture.addEventListener('orientationchange', function(e){

    var orientation = e.orientation;
   
	if (orientation < 1 || orientation > 4){
    	return;
    }
	else if (orientation == 1){
		$.fg.clearGrid();
    	var params = {
			columns:3,
			space:10,
			data: items,
			layout:'gallery',
			params:{
				padding:10,
				showTitle:false,
				backgroundColor: '#eee',
				gridColor: '#ccc'
			},
			width: $.fgWin.size.width
		};
		$.fg.createGrid(params);
    }
    else if (orientation == 2) {
    	$.fg.clearGrid();
    	var params = {
			columns:4,
			space:10,
			data: items,
			layout:'gallery',
			params:{
				padding:10,
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
