/* SAMPLE FOR iOS (iPhone / iPad)
 * It just works!
 */

//SOME SAMPLE DATA
var items = [
	{title:'sample 1', image:'http://www.lorempixel.com/700/600/'},
	{title:'sample 2', image:'http://www.lorempixel.com/900/1200/'},
	{title:'sample 3', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 4', image:'http://www.lorempixel.com/600/600/'},
	{title:'sample 5', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 6', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 7', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 8', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 9', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 10', image:'http://www.lorempixel.com/400/300/'}
];

$.fg.createGrid({
	columns:3, 					//NUMBER OF COLUMNS. DEFAULT IS 4.
	space:10, 					//SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
	data:items					//ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE
	//width: 320				//OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID. ONLY USE IT FOR ANDROID.
});

$.fgWin.open();
