TiFlexiGrid 1.0
================================

An Alloy Widget for creating flexible grid layouts in iOS and Android. It works on handsets and tablets in any orientation.

## Screenshots
Coming in a moment.

## How to use

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
## Note for Android

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
 See the tiapp.xml in the sample project for more details. Is important to run the function "createGrid" on the open event of the main application window or the window containing TiFlexiGrid. Also, put the function inside a setTimeout() so it can give Android some time to render the window and return the correct dimensions.

To understand it better, please refer to the sample project included.




