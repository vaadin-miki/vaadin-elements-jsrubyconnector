/**
 * Created by Miki. This file is used by Ruby gem vaadin-elements.
 * Version 0.20160518
 */
function serverCallbackResponse(e) {
console.log(e);
var resp = JSON.parse(e);
for(var oid in resp) {
    var comp = document.querySelector('#'+oid);
    for(var meth in resp[oid]) {
        if(meth in comp) {
            if(typeof comp[meth] === 'function') {
                comp[meth]();
            }
            else {
                comp[meth] = resp[oid][meth];
            }
}}}}

// ajax code http://stackoverflow.com/a/18078705/384484 thanks Petah
var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4 && callback) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        if(data instanceof Array) {
            for(var elem in data) {
                query.push(encodeURIComponent(key+'[]')+ '=' + encodeURIComponent(JSON.stringify(elem)))
            }
        }
        else query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        if(data instanceof Array) {
            for(var elem in data) {
                query.push(encodeURIComponent(key+'[]')+ '=' + encodeURIComponent(JSON.stringify(elem)))
            }
        }
        else query.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(data[key])));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};
