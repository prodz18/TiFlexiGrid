function ucfirst(text) {
    if (!text) return text;
    return text[0].toUpperCase() + text.substr(1);
}

function isTabletFallback() {
    return !(700 > Math.min(Ti.Platform.displayCaps.platformHeight, Ti.Platform.displayCaps.platformWidth));
}

var _ = require("alloy/underscore")._, Backbone = require("alloy/backbone");

var DEFAULT_WIDGET = "widget";

exports.version = "1.1.1";

exports._ = _;

exports.Backbone = Backbone;

exports.M = function(name, modelDesc, migrations) {
    var config = modelDesc.config;
    var type = (config.adapter ? config.adapter.type : null) || "localDefault";
    "localDefault" === type && (type = "sql");
    var adapter = require("alloy/sync/" + type);
    var extendObj = {
        defaults: config.defaults,
        sync: function(method, model, opts) {
            var config = model.config || {};
            var type = (config.adapter ? config.adapter.type : null) || "localDefault";
            "localDefault" === type && (type = "sql");
            require("alloy/sync/" + type).sync(method, model, opts);
        }
    };
    var extendClass = {};
    migrations && (extendClass.migrations = migrations);
    _.isFunction(adapter.beforeModelCreate) && (config = adapter.beforeModelCreate(config, name) || config);
    var Model = Backbone.Model.extend(extendObj, extendClass);
    Model.prototype.config = config;
    _.isFunction(modelDesc.extendModel) && (Model = modelDesc.extendModel(Model) || Model);
    _.isFunction(adapter.afterModelCreate) && adapter.afterModelCreate(Model, name);
    return Model;
};

exports.C = function(name, modelDesc, model) {
    var extendObj = {
        model: model,
        sync: function(method, model, opts) {
            var config = model.config || {};
            var type = (config.adapter ? config.adapter.type : null) || "localDefault";
            "localDefault" === type && (type = "sql");
            require("alloy/sync/" + type).sync(method, model, opts);
        }
    };
    var Collection = Backbone.Collection.extend(extendObj);
    var config = Collection.prototype.config = model.prototype.config;
    var type = (config.adapter ? config.adapter.type : null) || "localDefault";
    var adapter = require("alloy/sync/" + type);
    _.isFunction(adapter.afterCollectionCreate) && adapter.afterCollectionCreate(Collection);
    _.isFunction(modelDesc.extendCollection) && (Collection = modelDesc.extendCollection(Collection) || Collection);
    return Collection;
};

exports.createWidget = function(id, name, args) {
    if ("undefined" != typeof name && null !== name && _.isObject(name) && !_.isString(name)) {
        args = name;
        name = DEFAULT_WIDGET;
    }
    return new (require("alloy/widgets/" + id + "/controllers/" + (name || DEFAULT_WIDGET)))(args);
};

exports.createController = function(name, args) {
    return new (require("alloy/controllers/" + name))(args);
};

exports.createModel = function(name, args) {
    return new (require("alloy/models/" + ucfirst(name)).Model)(args);
};

exports.createCollection = function(name, args) {
    return new (require("alloy/models/" + ucfirst(name)).Collection)(args);
};

exports.isTablet = function() {
    return "ipad" === Ti.Platform.osname;
}();

exports.isHandheld = !exports.isTablet;

exports.Globals = {};

exports.Models = {};

exports.Models.instance = function(name) {
    return exports.Models[name] || (exports.Models[name] = exports.createModel(name));
};

exports.Collections = {};

exports.Collections.instance = function(name) {
    return exports.Collections[name] || (exports.Collections[name] = exports.createCollection(name));
};

exports.CFG = require("alloy/CFG");