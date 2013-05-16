function S4() {
    return (0 | 65536 * (1 + Math.random())).toString(16).substring(1);
}

exports.guid = function() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};