var app = app || {};

app.seamanModel = (function() {
    function SeamanModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Seamen/';
        this.requester = requester;
        this.headers = headers;
    }


    SeamanModel.prototype.listAllSeamans = function() {
        console.log(" in model ");
       return this.requester.get(this.serviceUrl, this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.addSeaman = function(title, text, deadline) {
        //console.log("add seaman called");
        var userId = sessionStorage['userId'];
        var author = sessionStorage['fullName'];
        var data = {
            title : title,
            text : text,
            author : author,
            deadline : deadline,
            ACL : {
                "*":{"read":true}, 
            }
        };

        data.ACL[userId] = {"write":true,"read":true};
        //console.log("adding seaman with data ");
        //console.log(data);
        return this.requester.post(this.serviceUrl, this.headers.getHeaders(true), data);
    };

    SeamanModel.prototype.editSeaman = function(seamanId, title, text, deadline) {
        // we dont change author
        var data = {
            title : title,
            text : text,
            deadline : deadline
        };

        return this.requester.put(this.serviceUrl + seamanId, this.headers.getHeaders(true), data);
    };

    SeamanModel.prototype.deleteSeaman = function(seamanId) {
        return this.requester.remove(this.serviceUrl + seamanId, this.headers.getHeaders(true));
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new SeamanModel(baseUrl, requester, headers);
        }
    }
}());