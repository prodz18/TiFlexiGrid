function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.prodz.tiflexigrid/" + s : s.substring(0, index) + "/com.prodz.tiflexigrid/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "fgMain",
    style: {
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "fgWrapper",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "transparent"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "fgScrollView",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        layout: "horizontal",
        backgroundColor: "transparent",
        scrollType: "vertical"
    }
} ];