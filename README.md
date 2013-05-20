TiFlexiGrid 1.1
================================

An Alloy Widget for creating flexible grid layouts in iOS and Android. It works on phones and tablets in any orientation. You can also set different grid layouts depending the orientations. Also, when you click one of the items, it will pop-up in a modal view (gallery layout). Or you can create your own views and assign them in TiFlexiGrid. Please refer to the sample project to see it in action.

More cool stuff very soon. Thanks everyone for the feedback. If anyone have some ideas o requests, please let me know at [@pablorr18](http://twitter.com/pablorr18).

### Changelog

**1.1**
* New layout property: you can use a gallery layout or  a customView layout
* New params property: now you can specify padding (gallery only),  showTitle (gallery only), backgroundColor and gridColor,
* thumbnail generator in gallery layout (iOS only for now)
* general bug fixes

**1.0** 
* Initial Release

### Screenshots

![iPhone](http://www.lineartpr.com/img/github/tiflexigrid_iphone.jpg)
![iPhone](http://www.lineartpr.com/img/github/tiflexigrid_iphone1.jpg)

![iPad](http://www.lineartpr.com/img/github/tiflexigrid_ipad.jpg)

![Android](http://www.lineartpr.com/img/github/tiflexigrid_android.jpg)


### How to use

First, add the widget to the dependencies list in your Alloy Project (config.json):

```javascript
"dependencies": {
	"tiflexigrid":"1.1"
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

Create an array with the data to show (title and image) and initialize the widget in the controller (index.js):

```javascript
//SOME SAMPLE DATA
var items = [
	{title:'sample 1', image:'http://www.lorempixel.com/700/600/'},
	{title:'sample 2', image:'http://www.lorempixel.com/900/1200/'},
	{title:'sample 3', image:'http://www.lorempixel.com/400/300/'},
	{title:'sample 4', image:'http://www.lorempixel.com/600/600/'},
	{title:'sample 5', image:'http://www.lorempixel.com/400/310/'},
	{title:'sample 6', image:'http://www.lorempixel.com/410/300/'},
	{title:'sample 7', image:'http://www.lorempixel.com/500/300/'},
	{title:'sample 8', image:'http://www.lorempixel.com/300/300/'},
	{title:'sample 9', image:'http://www.lorempixel.com/450/320/'},
	{title:'sample 10', image:'http://www.lorempixel.com/500/400/'}
];

$.fg.createGrid({
	columns:3, 				//NUMBER OF COLUMNS. DEFAULT IS 4.
	space:10, 				//SPACE BETWEEN EACH ELEMENT. DEFAULT IS 5.
	data:items,				//ARRAY WITH THE DATA TO DISPLAY. SEE SAMPLE DATA ABOVE.
	layout:'gallery',				//LAYOUT TYPE: gallery or customView. DEFAULT IS gallery.
	params:{
		padding:5,			//GALLERY ONLY.
		showTitle:false,		//GALLERY ONLY. True or False
		backgroundColor: '#eee',
		gridColor: '#ccc'
	}
	//width: 320				//OPTIONAL. SCREEN'S WIDTH TO ADJUST GRID.
});

$.fgWin.open();
```

### Methods

**createGrid(parameters)** - creates a grid layout with the following parameters:
* columns - number of columns
* space - space between each element
* data - array with objects (title and image)
* layout - type of layout (gallery or customView)
* params - properties for the layout (padding, showTitle, backgroundColor and gridColor)
* width - Optional. Width to adjust the grid (especially in Android)

**clearGrid()** - clears all the elements of the grid. 

### customView Layout
Now you can assign an array of views to TiFlexiGrid. Here is an example:
```javascript
//SAMPLE FOR CUSTOM VIEWS
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

var params = {
	columns:2,
	space:10,
	data: items,
	layout:'customView',
	params:{
		backgroundColor: '#eee',
		gridColor: '#ccc'
	},
	width: $.fgWin.size.width
};
$.fg.createGrid(params);
```
![iPhone](http://www.lineartpr.com/img/github/tiflexigrid_iphone2.jpg)


### Note for Android

Android requires some extra steps in order to make the widget work correctly.  The widget uses anydensity = true and system units as dp in the tiapp.xml. 
 
 You can use something like this in your tiapp.xml:
```xml
<property name="ti.ui.defaultunit" type="string">dp</property>
  <android xmlns:android="http://schemas.android.com/apk/res/android">
        <manifest android:versionCode="1" android:versionName="1.0">
        <supports-screens android:anyDensity="true"
            android:largeScreens="true" android:normalScreens="true"
            android:smallScreens="false" android:xlargeScreens="true"/>
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
			layout:'gallery',
			params:{
				padding:10,
				showTitle:false,
				backgroundColor: '#eee',
				gridColor: '#ccc'
			},
			width: $.fgWin.size.width
		});
	},800);
	
});
```

To understand it better, please refer to the sample project included.

###License
The MIT License (MIT)

Copyright (c) 2013 Pablo Rodriguez Ruiz, [@pablorr18](http://twitter.com/pablorr18) 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.