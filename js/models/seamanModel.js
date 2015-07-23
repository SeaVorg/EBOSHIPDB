var app = app || {};

app.seamanModel = (function() {
    function SeamanModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Seaman/';
        this.ranksUrl = baseUrl + 'classes/Ranks/';
        this.shipsUrl = baseUrl + 'classes/Ships/';
        this.embarksUrl = baseUrl + 'classes/Embarkations/';
        this.embarkUrl = baseUrl + 'classes/Embarkation/';
        this.requester = requester;
        this.headers = headers;
    }

    SeamanModel.prototype.listRanksAll = function ()
    {
        return this.requester.get(this.ranksUrl, this.headers.getHeaders(true));
    }

    SeamanModel.prototype.listRanks = function ()
    {
        return this.requester.get(this.ranksUrl, this.headers.getHeaders(true));
    }
    SeamanModel.prototype.listShips = function ()
    {
        return this.requester.get(this.shipsUrl, this.headers.getHeaders(true));
    }
    SeamanModel.prototype.listShipsAll = function ()
    {
        console.log("shieis");
        var asd = '?where={"Active":true}';
        return this.requester.get(this.shipsUrl + asd, this.headers.getHeaders(true));
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
     SeamanModel.prototype.listReallyAllSeamansShips = function ( name , ship)
    {

       console.log("nwnw");
       var asd= '?where={"Name" : {"$regex":"'+name+'", "$options" :"i" }}';
       console.log(asd);
    return this.requester.get(this.serviceUrl  + asd, this.headers.getHeaders(true));
     };
     SeamanModel.prototype.listReallyAllSeamansCrew = function ( name )
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

    SeamanModel.prototype.listAllSeamansShips = function(ship) {
        console.log(" in model ships  "+ship);
         var asd = '?where={"Ship" : "' + ship + '", "Disembarked" : false }&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansCrewNameShip = function(name,ship) {
        console.log(" in model crew ");
         var asd = '?where={"Ship" : "'+ship+'","Embarked" : true, "Disembarked" : false, "SeamanID":{"$select": {"query":{"className":"Seaman","where":{"Name" : {"$regex":"'+name+'", "$options" :"i" }}}, "key":"SeamanID"}} }&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansCrewShip = function(ship) {
        console.log(" in model crew ship " + ship);
         var asd = '?where={"Embarked" : true, "Disembarked" : false , "Ship" : "'+ship+'"}&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };
    SeamanModel.prototype.listAllSeamansCrewName = function(name) {
        console.log(" in model crew ");
         var asd = '?where={"Embarked" : true, "Disembarked" : false, "SeamanID":{"$select": {"query":{"className":"Seaman","where":{"Name" : {"$regex":"'+name+'", "$options" :"i" }}}, "key":"SeamanID"}} }&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansCrew = function() {
        console.log(" in model crew ");
         var asd = '?where={"Embarked" : true, "Disembarked" : false }&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };
    SeamanModel.prototype.listAllSeamansIdCrewNotNameRank = function(ids, name, rank ) {
        console.log("in crwt");
        //console.log(ids);
        //console.log(ids.toString());
        var shit = '[';
        var i;
        for(i=0;i<ids.length;i++) {if(i!=0) shit+=','; shit+='"'+ids[i]+'"'; }
            shit+=']';
            console.log(shit);
        //console.log('?where={"SeamanID": {"$in":' + shit + '}}');
        var asd= '?where={"Rank": "'+rank+'","Name" : {"$regex":"'+name+'", "$options" :"i" },"SeamanID": {"$in":' + shit + '}}';
                        return this.requester.get(this.serviceUrl + '?where={"Rank": "'+rank+'","Name" : {"$regex":"'+name+'", "$options" :"i" },"SeamanID": {"$nin":' + shit + '}}&limit=35770&skip=0', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };
    SeamanModel.prototype.listAllSeamansIdCrewNotRank = function(ids ,rank) {
        console.log("in crwt");
        //console.log(ids);
        //console.log(ids.toString());
        var shit = '[';
        var i;
        for(i=0;i<ids.length;i++) {if(i!=0) shit+=','; shit+='"'+ids[i]+'"'; }
            shit+=']';
            console.log(shit);
        //console.log('?where={"SeamanID": {"$in":' + shit + '}}');
        var asd= '?where={"Rank": "'+rank+'", SeamanID": {"$in":' + shit + '}}';
                        return this.requester.get(this.serviceUrl + '?where={"Rank": "'+rank+'","SeamanID": {"$nin":' + shit + '}}&limit=35770&skip=0', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };
    SeamanModel.prototype.listAllSeamansIdCrewNotName = function(ids, name ) {
        console.log("in crwt");
        //console.log(ids);
        //console.log(ids.toString());
        var shit = '[';
        var i;
        for(i=0;i<ids.length;i++) {if(i!=0) shit+=','; shit+='"'+ids[i]+'"'; }
            shit+=']';
            console.log(shit);
        //console.log('?where={"SeamanID": {"$in":' + shit + '}}');
        var asd= '?where={"Name" : {"$regex":"'+name+'", "$options" :"i" },"SeamanID": {"$in":' + shit + '}}';
                        return this.requester.get(this.serviceUrl + '?where={"Name" : {"$regex":"'+name+'", "$options" :"i" },"SeamanID": {"$nin":' + shit + '}}&limit=35770&skip=0', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };
    SeamanModel.prototype.listAllSeamansIdCrewNot = function(ids ) {
        console.log("in crwt");
        //console.log(ids);
        //console.log(ids.toString());
        var shit = '[';
        var i;
        for(i=0;i<ids.length;i++) {if(i!=0) shit+=','; shit+='"'+ids[i]+'"'; }
            shit+=']';
            console.log(shit);
        //console.log('?where={"SeamanID": {"$in":' + shit + '}}');
        var asd= '?where={"SeamanID": {"$in":' + shit + '}}';
                        return this.requester.get(this.serviceUrl + '?where={"SeamanID": {"$nin":' + shit + '}}&limit=35770&skip=0', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansIdCrew = function(ids ) {
        console.log("in crwt");
        //console.log(ids);
        //console.log(ids.toString());
        var shit = '[';
        var i;
        for(i=0;i<ids.length;i++) {if(i!=0) shit+=','; shit+='"'+ids[i]+'"'; }
            shit+=']';
            console.log(shit);
        //console.log('?where={"SeamanID": {"$in":' + shit + '}}');
        var asd= '?where={"SeamanID": {"$in":' + shit + '}}';
                        return this.requester.get(this.serviceUrl + '?where={"SeamanID": {"$in":' + shit + '}}', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listSeamansIds = function(ids ) {
        console.log("in modelasz cust");
        var shit = '[';
        var i;
        for(i=0;i<ids.length;i++) {if(i!=0) shit+=','; shit+='"'+ids[i]+'"'; }
            shit+=']';
            console.log(shit);
        //console.log('?where={"SeamanID": {"$in":' + shit + '}}');
        var asd= '?where={"SeamanID": {"$in":' + shit + '}}';

                        return this.requester.get(this.serviceUrl + '?where={"SeamanID": {"$in":' + shit + '}}', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansId = function(id ) {
        console.log("in modelasz");
        return this.requester.get(this.serviceUrl + '?where={"objectId": "' + id + '"}', this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansAvailableRankName = function(name,rank)
    {
        console.log("available check");
        var asd = '?where={"Embarked":true, "Disembarked":true,"SeamanID":{"$select": {"query":{"className":"Seaman","where":{ "Rank" : "'+rank+'", "Name" : {"$regex":"'+name+'", "$options" :"i" }}}, "key":"SeamanID"}} }&order=-Disembarking_date';
        console.log(asd);
        return this.requester.get(this.embarkUrl + asd, this.headers.getHeaders(true));
    }

    SeamanModel.prototype.listAllSeamansAvailableName = function(name)
    {
        console.log("available check");
        var asd = '?where={"Embarked":true, "Disembarked":true, "SeamanID":{"$select": {"query":{"className":"Seaman","where":{"Name" : {"$regex":"'+name+'", "$options" :"i" }}}, "key":"SeamanID"}} }&order=-Disembarking_date';

        return this.requester.get(this.embarkUrl + asd, this.headers.getHeaders(true));
    }

    SeamanModel.prototype.listAllSeamansAvailableRank = function(rank)
    {
        console.log("available check");
        var asd = '?where={"Embarked":true, "Disembarked":true, "SeamanID":{"$select": {"query":{"className":"Seaman","where":{"Rank" : "'+rank+'"}}, "key":"SeamanID"}}}&order=-Disembarking_date';

        return this.requester.get(this.embarkUrl + asd, this.headers.getHeaders(true));
    }


    SeamanModel.prototype.listAllSeamansAvailable = function()
    {
        console.log("available check");
        var asd = '?where={"Embarked":true, "Disembarked":true}&order=-Disembarking_date';

        return this.requester.get(this.embarkUrl + asd, this.headers.getHeaders(true));
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

    //--------------- new stuff

    SeamanModel.prototype.listAllSeamansCrewHax = function() {
        console.log(" in hax");
         var asd = '?where={ "Disembarked" : false }&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };
    SeamanModel.prototype.listAllSeamansCrewNameShipHax = function(name,ship) {
        console.log(" in hax ");
         var asd = '?where={"Ship" : "'+ship+'", "Disembarked" : false, "SeamanID":{"$select": {"query":{"className":"Seaman","where":{"Name" : {"$regex":"'+name+'", "$options" :"i" }}}, "key":"SeamanID"}} }&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    SeamanModel.prototype.listAllSeamansCrewShipHax = function(ship) {
        console.log(" in hax " + ship);
         var asd = '?where={ "Disembarked" : false , "Ship" : "'+ship+'"}&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };
    SeamanModel.prototype.listAllSeamansCrewNameHax = function(name) {
        console.log(" in hax ");
         var asd = '?where={ "Disembarked" : false, "SeamanID":{"$select": {"query":{"className":"Seaman","where":{"Name" : {"$regex":"'+name+'", "$options" :"i" }}}, "key":"SeamanID"}} }&limit=35770&skip=0';
       return this.requester.get(this.embarksUrl + asd , this.headers.getHeaders(true));
       // return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new SeamanModel(baseUrl, requester, headers);
        }
    }
}());