function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "tiflexigrid/" + s : s.substring(0, index) + "/tiflexigrid/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function createThumb(image, size) {
        var imageView = Ti.UI.createImageView({
            image: image,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            hires: true
        });
        return imageView.toImage().imageAsThumbnail(2 * size, 0, 0);
    }
    new (require("alloy/widget"))("tiflexigrid");
    this.__widgetId = "tiflexigrid";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "gallery";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.fgMainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "transparent",
        zIndex: 0,
        id: "fgMainView"
    });
    $.__views.fgMainView && $.addTopLevelView($.__views.fgMainView);
    $.__views.fgThumb = Ti.UI.createView({
        id: "fgThumb"
    });
    $.__views.fgMainView.add($.__views.fgThumb);
    $.__views.fgImage = Ti.UI.createImageView({
        id: "fgImage"
    });
    $.__views.fgThumb.add($.__views.fgImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var the_image = args.image || "";
    var theWidth = args.width || "95%";
    var thePadding = args.padding || 10;
    var showTitle = args.showTitle || false;
    var theTitle = args.title || "";
    if (showTitle) {
        $.fgThumb.width = theWidth - thePadding;
        $.fgThumb.height = .7 * theWidth;
        $.fgThumb.top = thePadding / 2;
        $.fgImage.image = createThumb(the_image, theWidth - thePadding);
        $.fgImage.width = theWidth - thePadding;
        $.fgImage.height = .7 * theWidth;
        var titleView = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            backgroundColor: "transparent"
        });
        var title = Ti.UI.createLabel({
            text: theTitle,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            textAlign: "center",
            color: "#555",
            font: {
                fontSize: 12
            }
        });
        titleView.add(title);
        $.fgMainView.add(titleView);
    } else {
        $.fgImage.image = createThumb(the_image, theWidth - thePadding);
        $.fgImage.width = theWidth - thePadding;
        $.fgImage.height = theWidth - thePadding;
        $.fgThumb.top = thePadding / 2;
        $.fgThumb.width = theWidth - thePadding;
        $.fgThumb.height = theWidth - thePadding;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;