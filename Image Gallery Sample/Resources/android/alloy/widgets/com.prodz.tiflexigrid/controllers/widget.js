function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.prodz.tiflexigrid/" + s : s.substring(0, index) + "/com.prodz.tiflexigrid/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    new (require("alloy/widget"))("com.prodz.tiflexigrid");
    this.__widgetId = "com.prodz.tiflexigrid";
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
    var params, columns, space, data, screenWidth, newWidth, columnWidth, frameBGcolor, itemsOptions, onItemClick;
    var init = function(opts) {
        params = opts || {};
        columns = params.columns || 4;
        space = params.space || 5;
        data = params.data || {};
        screenWidth = params.width || Ti.Platform.displayCaps.getPlatformWidth();
        screenWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
        newWidth = screenWidth - space;
        columnWidth = newWidth / columns - space;
        $.fgScrollView.left = space;
        $.fgScrollView.top = space;
        $.fgScrollView.right = -1;
        frameBGcolor = params.gridBackgroundColor || "#fff";
        $.fgMain.backgroundColor = frameBGcolor;
        itemsOptions = {
            heightDelta: params.itemHeightDelta || 0,
            backgroundColor: params.itemBackgroundColor || "transparent",
            borderWidth: params.itemBorderWidth || 0,
            borderColor: params.itemBorderColor || "transparent",
            borderRadius: params.itemBorderRadius || 0
        };
        onItemClick = params.onItemClick || function() {
            Ti.API.info("TiFlexiGrid -> onItemClick is not defined.");
        };
        Ti.API.info("TiFlexiGrid -> Widget initialized.");
        Ti.API.info("TiFlexiGrid -> Items dimension: " + columnWidth + " x " + (columnWidth + itemsOptions.heightDelta));
        addGridItems(data);
    };
    var addGridItems = function(args) {
        clearGrid();
        data = args || {};
        for (var x = 0; data.length > x; x++) addGridItem(data[x]);
    };
    var addGridItem = function(item) {
        var frame = Ti.UI.createView({
            width: columnWidth,
            height: columnWidth + itemsOptions.heightDelta,
            backgroundColor: itemsOptions.backgroundColor,
            top: 0,
            left: 0,
            right: space,
            bottom: space,
            borderColor: itemsOptions.borderColor,
            borderRadius: itemsOptions.borderRadius,
            borderWidth: itemsOptions.borderWidth
        });
        var overlay = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            backgroundColor: "transparent",
            zIndex: 1,
            data: item.data
        });
        var gridElement = item.view;
        overlay.addEventListener("click", function(e) {
            onItemClick(e);
        });
        frame.add(gridElement);
        frame.add(overlay);
        $.fgScrollView.add(frame);
    };
    var openModal = function(url) {
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
        }, function() {
            topView.visible = true;
            $.fgMain.add(topView);
        });
        topView.addEventListener("click", function() {
            $.fgMain.remove(topView);
            overlay.animate({
                opacity: 0,
                duration: 200
            }, function() {
                $.fgMain.remove(overlay);
            });
        });
    };
    var clearGrid = function() {
        $.fgScrollView.removeAllChildren();
    };
    var getItemWidth = function() {
        return columnWidth;
    };
    var getItemHeight = function() {
        return columnWidth + itemsOptions.heightDelta;
    };
    exports.init = init;
    exports.addGridItems = addGridItems;
    exports.clearGrid = clearGrid;
    exports.openModal = openModal;
    exports.addGridItem = addGridItem;
    exports.getItemWidth = getItemWidth;
    exports.getItemHeight = getItemHeight;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;