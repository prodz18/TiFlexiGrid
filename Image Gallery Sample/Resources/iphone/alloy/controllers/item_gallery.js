function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "item_gallery";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.mainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "transparent",
        zIndex: 0,
        id: "mainView"
    });
    $.__views.mainView && $.addTopLevelView($.__views.mainView);
    $.__views.imgContainer = Ti.UI.createView({
        id: "imgContainer"
    });
    $.__views.mainView.add($.__views.imgContainer);
    $.__views.thumb = Ti.UI.createImageView({
        id: "thumb"
    });
    $.__views.imgContainer.add($.__views.thumb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var the_image = args.image || "";
    var item_width = args.width || "95%";
    var item_height = args.height || "95%";
    $.thumb.image = the_image;
    $.thumb.width = item_width;
    $.thumb.height = item_height;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;