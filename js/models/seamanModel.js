var app = app || {};

app.seamanModel = (function() {
    function SeamanModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Seaman/';
        this.ranksUrl = baseUrl + 'classes/Ranks/';
        this.shipsUrl = baseUrl + 'classes/Ships/';
        this.embarksUrl = baseUrl + 'classes/Embarkations/';
        this.requester = requester;
        this.headers = headers;
    }

    SeamanModel.prototype.listRanks = function ()
    {
        return this.requester.get(this.ranksUrl, this.headers.getHeaders(true));
    }
    SeamanModel.prototype.listShips = function ()
    {
        return this.requester.get(this.shipsUrl, this.headers.getHeaders(true));
    }
    SeamanModel.prototype.listShipsDate = function (data)
    {
        console.log("list ships modle");
        console.log(data);
        var asd = '?where={"Ship" : "'+data.ship+'"}&limit=35770&skip=0';
        console.log(asd);
        return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
    }
    SeamanModel.prototype.listReallyAllSeamans = function ( name )
    {

       console.log("nwnw");
       var asd= '?where={"Name" : {"$regex":"'+name+'", "$options" :"i" }}';
       console.log(asd);
    return this.requester.get(this.serviceUrl  + asd, this.headers.getHeaders(true));
     };
    
    SeamanModel.prototype.listAllSeamans = function() {
        console.log(" in model ");

       return this.requester.get(this.serviceUrl + '?limit=50&count=50' , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listSeamansId = function(id ) {
        console.log("in modelasz cust" + id);
        console.log('?where={"SeamanID": {"$regex":"' + id + '"}}');
        var asd= '?where={"SeamanID" : {"$regex":"'+name+'", "$options" :"i" }}';
                        return this.requester.get(this.serviceUrl + '?where={"SeamanID": {"$regex":"' + id + '"}}', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansId = function(id ) {
        console.log("in modelasz");
        return this.requester.get(this.serviceUrl + '?where={"objectId": "' + id + '"}', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansAvailable = function()
    {
        console.log("available check");
        return this.requester.get(this.serviceUrl + '?limit=50&count=50&where={"Available": true }', this.headers.getHeaders(true));
    }

    SeamanModel.prototype.addSeaman = function(data) {
        //console.log("add seaman called");
       
        console.log("adding seaman with data, model ");
        console.log(data);
        return this.requester.post(this.serviceUrl, this.headers.getHeaders(true), data);
    };

    SeamanModel.prototype.editSeaman = function(seamanId, data) {
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