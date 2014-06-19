function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "tiflexigrid/" + s : s.substring(0, index) + "/tiflexigrid/" + s.substring(index + 1);
    return path;
}

function Controller() {
    var Widget = new (require("alloy/widget"))("tiflexigrid");
    this.__widgetId = "tiflexigrid";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.fgMain = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "fgMain"
    });
    $.__views.fgMain && $.addTopLevelView($.__views.fgMain);
    $.__views.fgWrapper = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        id: "fgWrapper"
    });
    $.__views.fgMain.add($.__views.fgWrapper);
    $.__views.fgScrollView = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        layout: "horizontal",
        backgroundColor: "transparent",
        scrollType: "vertical",
        id: "fgScrollView"
    });
    $.__views.fgWrapper.add($.__views.fgScrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.createGrid = function(args) {
        var params = args || {};
        var columns = params.columns || 4;
        var space = params.space || 5;
        var data = params.data || {};
        var options = params.params || {};
        var layout = params.layout || "gallery";
        var screenWidth = params.width || Ti.Platform.displayCaps.getPlatformWidth();
        var newWidth = screenWidth - space;
        var columnWidth = newWidth / columns - space;
        var frameBGcolor = options.backgroundColor || "#fff";
        $.fgScrollView.left = space;
        $.fgScrollView.top = space;
        $.fgScrollView.right = -1;
        $.fgMain.backgroundColor = frameBGcolor;
        for (var x = 0; data.length > x; x++) {
            var frame = Ti.UI.createView({
                width: columnWidth,
                height: columnWidth,
                backgroundColor: options.gridColor || "#eee",
                top: 0,
                left: 0,
                right: space,
                bottom: space
            });
            var overlay = Ti.UI.createView({
                width: Ti.UI.FILL,
                height: Ti.UI.FILL,
                backgroundColor: "transparent",
                zIndex: 1,
                strImage: data[x].image
            });
            var gridElement;
            switch (layout) {
              case "gallery":
                gridElement = Widget.createController("gallery", {
                    image: data[x].image,
                    title: data[x].title,
                    width: columnWidth,
                    padding: options.padding || 10,
                    showTitle: options.showTitle || false
                }).getView();
                overlay.addEventListener("click", function(e) {
                    exports.openModal(e.source.strImage);
                });
                break;

              case "customView":
                gridElement = data[x];
            }
            frame.add(gridElement);
            frame.add(overlay);
            $.fgScrollView.add(frame);
        }
    };
    exports.openModal = function(url) {
        var overlay = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            backgroundColor: "#000",
            opacity: 0,
            zIndex: 100
        });
        var topView = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            zIndex: 1200,
            visible: false
        });
        var imgView = Ti.UI.createImageView({
            image: url,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        topView.add(imgView);
        $.fgMain.add(overlay);
        overlay.animate({
            opacity: .7,
            duration: 200
        });
        var t = Titanium.UI.create2DMatrix();
        t = t.scale(0);
        var a = Titanium.UI.createAnimation();
        a.transform = t;
        a.duration = 200;
        $.fgMain.add(topView);
        topView.animate(a);
        a.addEventListener("complete", function() {
            topView.visible = true;
            var t2 = Titanium.UI.create2DMatrix();
            t2 = t2.scale(1.2);
            topView.animate({
                transform: t2,
                duration: 200
            }, function() {
                var t4 = Titanium.UI.create2DMatrix();
                t4 = t4.scale(1);
                topView.animate({
                    transform: t4,
                    duration: 200
                });
            });
        });
        topView.addEventListener("click", function() {
            var t3 = Titanium.UI.create2DMatrix();
            t3 = t3.scale(1.2);
            var a2 = Titanium.UI.createAnimation();
            a2.transform = t3;
            a2.duration = 200;
            topView.animate(a2);
            a2.addEventListener("complete", function() {
                var t5 = Titanium.UI.create2DMatrix();
                t5 = t5.scale(0);
                topView.animate({
                    transform: t5,
                    duration: 200
                }, function() {
                    $.fgMain.remove(topView);
                    overlay.animate({
                        opacity: 0,
                        duration: 200
                    }, function() {
                        $.fgMain.remove(overlay);
                    });
                });
            });
        });
    };
    exports.clearGrid = function() {
        $.fgScrollView.removeAllChildren();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;