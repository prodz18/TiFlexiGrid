function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.fgWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: true,
        tabBarHidden: true,
        layout: "vertical",
        id: "fgWin"
    });
    $.__views.fgWin && $.addTopLevelView($.__views.fgWin);
    $.__views.fgHeader = Ti.UI.createView({
        backgroundColor: "#555",
        width: Ti.UI.FILL,
        height: 50,
        id: "fgHeader"
    });
    $.__views.fgWin.add($.__views.fgHeader);
    $.__views.fgHeaderTitle = Ti.UI.createLabel({
        text: "TiFlexiGrid",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        id: "fgHeaderTitle"
    });
    $.__views.fgHeader.add($.__views.fgHeaderTitle);
    $.__views.fg = Alloy.createWidget("tiflexigrid", "widget", {
        id: "fg",
        __parentSymbol: $.__views.fgWin
    });
    $.__views.fg.setParent($.__views.fgWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var items = [ {
        title: "sample 1",
        image: "http://www.lorempixel.com/700/600/"
    }, {
        title: "sample 2",
        image: "http://www.lorempixel.com/900/1200/"
    }, {
        title: "sample 3",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 4",
        image: "http://www.lorempixel.com/600/600/"
    }, {
        title: "sample 5",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 6",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 7",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 8",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 9",
        image: "http://www.lorempixel.com/400/300/"
    }, {
        title: "sample 10",
        image: "http://www.lorempixel.com/400/300/"
    } ];
    $.fg.createGrid({
        columns: 3,
        space: 10,
        data: items
    });
    $.fgWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;