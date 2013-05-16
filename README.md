TiFlexiGrid 1.0
================================

An Alloy Widget for creating flexible grid layouts in iOS and Android. It works on phones and tablets in any orientation. You can also set different grid layouts depending the orientations. Also, when you click one of the items, it will pop-up in a modal view.

It's pretty basic for now, but I'm already working in different layouts (like templates) and other uses. If anyone have some ideas o requests, please let me know at [prodriguez@lineartpr.com](mailto:prodriguez@lineartpr.com). 

### Screenshots

![iPhone](http://www.lineartpr.com/img/github/tiflexigrid_iphone.jpg)

![iPad](http://www.lineartpr.com/img/github/tiflexigrid_ipad.jpg)

![Android](http://www.lineartpr.com/img/github/tiflexigrid_android.jpg)


### How to use

First, add the widget to the dependencies list in your Alloy Project (config.json):

```javascript
"dependencies": {
	"tiflexigrid":"1.0"
}
```

Add the widget to a view (index.xml):

```xml
<Alloy>
	<Window id="fgWin">
		<Require type="widget" src="tiflexigrid" id="fg"/>
	</Window>		
</Alloy>
```

Create an array with the data to show (title and image) and initialize the widget.

```javascript
//SOME SAMPLE DATA
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

$.fg.createGrid({
	columns:3, 				//NUMBER OF COLUMNS. DEFAULT IS 4.
	space:10, 				//SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
	data:items				//ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE
	//width: 320				//OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
});

$.fgWin.open();
```

### Methods

**createGrid(parameters)** - creates a grid layout with the following parameters:
* columns - number of columns
* space - space between each element
* data - array with objects (title and image)
* width - Optional. Width to adjust the grid (especially in Android)

**clearGrid()** - clears all the elements of the grid. 

### Note for Android

Android requires some extra steps in order to make the widget work correctly.  The widget uses anydensity = true and system units as dp in the tiapp.xml. 
 
 You can use something like this in your tiapp.xml:
```xml
<property name="ti.ui.defaultunit" type="string">dp</property>
  <android xmlns:android="http://schemas.android.com/apk/res/android">
        <manifest android:versionCode="1" android:versionName="1.0">
        <supports-screens android:anyDensity="true"
            android:largeScreens="true" android:normalScreens="true"
            android:smallScreens="false" android:xlargeScreens="false"/>
        </manifest>
   </android>
```
 See the tiapp.xml in the sample project for more details. 

 Also, is important to run the function "createGrid" on the open event of the main application window or the window containing TiFlexiGrid. Also, put the function inside a setTimeout() so it can give Android some time to render the window and return the correct dimensions.

 You can use something like this:

 ```javascript
 $.fgWin.addEventListener('open',function(e){
	setTimeout(function(){
		$.fg.createGrid({
			columns:3, 
			space:10, 
			data:items,
			width: $.fgWin.size.width
		});
	},800);
	
});
```

To understand it better, please refer to the sample project included.

###About
Created by Pablo Rodriguez Ruiz, [@pablorr18](http://twitter.com/pablorr18)



