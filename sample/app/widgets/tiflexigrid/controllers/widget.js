exports.createGrid = function(args){
	var params = args || {};
	//Ti.API.info('Params es ---> '+ JSON.stringify(params));
	
	var columns = params.columns || 4;
	var space = params.space || 5;
	var data = params.data || {};
	var screenWidth = params.width || Ti.Platform.displayCaps.getPlatformWidth();
	var newWidth = screenWidth - space;
	var columnWidth = (newWidth / columns) - space;
	
	//ADJUST THE SCROLLVIEW
	$.fgScrollView.left = space;
	$.fgScrollView.top = space;
	$.fgScrollView.right = -1;
	
	for (var x=0;x < data.length; x++){
		var frame = Ti.UI.createView({
			width:columnWidth,
			height:columnWidth,
			backgroundColor:'#ccc',
			top:0,
			left:0,
			right:space,
			bottom:space
		});
		
		var main_view = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:'vertical',
			backgroundColor:'transparent',
			zIndex:0
		});
		
			var thumb = Ti.UI.createView({
				top:5,
				width:columnWidth - 10,
				height:columnWidth * 0.70,
				backgroundColor:'#eee'
			});
				
				var img = Ti.UI.createImageView({
					image:data[x].image,
					width:'100%',
					height:'100%'
				});
				thumb.add(img);
			
			var vTitle = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				backgroundColor:'transparent'
			});
		
				var title = Ti.UI.createLabel({
				 	text:data[x].title,
					width:Ti.UI.FILL,
					height:Ti.UI.SIZE,
					textAlign:'center',
					color:'#555',
				 	font:{fontSize:12}
				 });
				 vTitle.add(title);
				 
		var overlay = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			backgroundColor:'transparent',
			zIndex:1,
			strImage:data[x].image
		});
		
		overlay.addEventListener('click',function(e){
			exports.openModal(e.source.strImage);
		});
		
		main_view.add(thumb);
		main_view.add(vTitle);
		
		frame.add(main_view);
		frame.add(overlay);
		
		$.fgScrollView.add(frame);
	};
};

exports.openModal = function(url){
	var overlay = Ti.UI.createView({
		width:Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor:'#000',
		opacity:0,
		zIndex:100
	});
	
	var topView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height: Ti.UI.FILL,
		zIndex:1200,
		visible:false
	});
	
		var imgView = Ti.UI.createImageView({
			image: url,
			width:Ti.UI.SIZE,
			height: Ti.UI.SIZE
		});
	
	topView.add(imgView);
	$.fgMain.add(overlay);
		
	if (OS_IOS){
		//ANIMATION OF OVERLAY
		overlay.animate({opacity:0.7,duration:200});
		
		//ANIMATION FOR POP EFFECT
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(0);
		var a = Titanium.UI.createAnimation();
		a.transform = t;
		a.duration = 200;
		
		$.fgMain.add(topView);
		topView.animate(a);
		
		a.addEventListener('complete', function(){
			topView.visible = true;
			var t2 = Titanium.UI.create2DMatrix();
			t2 = t2.scale(1.2);
			topView.animate({transform:t2, duration:200},function(e){
				var t4 = Titanium.UI.create2DMatrix();
				t4 = t4.scale(1.0);
				topView.animate({transform:t4, duration:200});
			});
		});
	}
	else{
		//ANIMATION OF OVERLAY
		overlay.animate({opacity:0.7,duration:200},function(e){
			topView.visible = true;
			$.fgMain.add(topView);
		});	
	}
	
	topView.addEventListener('click',function(e){
		if (OS_IOS){
			var t3 = Titanium.UI.create2DMatrix();
			t3 = t3.scale(1.2);
			var a2 = Titanium.UI.createAnimation();
			a2.transform = t3;
			a2.duration = 200;
			topView.animate(a2);
			
			a2.addEventListener('complete', function(){
				var t5 = Titanium.UI.create2DMatrix();
				t5 = t5.scale(0);
				topView.animate({transform:t5, duration:200},function(e){
					$.fgMain.remove(topView);
					overlay.animate({opacity:0,duration:200},function(e){
						$.fgMain.remove(overlay);
					});
				});
			});
		}
		else{
			$.fgMain.remove(topView);
			overlay.animate({opacity:0,duration:200},function(e){
				$.fgMain.remove(overlay);
			});
		}
		
	});
	
};
