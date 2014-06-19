function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.prodz.tiflexigrid/" + s : s.substring(0, index) + "/com.prodz.tiflexigrid/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0009,
    key: "fgThumb",
    style: {
        backgroundColor: "#eee"
    }
}, {
    isApi: true,
    priority: 1000.001,
    key: "fgImage",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "fgMainView",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "transparent",
        zIndex: 0
    }
} ];