var app = app || {};

(function() {
    var appId= '6cyfrgXtA8d36yNvOI2W66X9jbj5Qe86NFMF7UZc';
    var restAPI = 'C7MXpLQzn1CLA8Io2y2GbCJA1XEhnTLALc7qMYVY';
    var baseUrl = 'https://api.parse.com/1/';


    app.getParam = function (name) {
        return decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')
            )||null
    }

    app.error_msg = function(text){
        noty({
                layout: 'top',
                type: 'error',
                text: text,
                dismissQueue: true, 
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 500 
                    },
                timeout: 4000
                });
    }

    app.success_msg = function(text){
        noty({
                layout: 'top',
                type: 'success',
                text: text,
                dismissQueue: true, 
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 500 
                    },
                timeout: 2000
                });
    }

    var headers = app.headers.load(appId, restAPI);
    var requester = app.requester.load();
    var userModel = app.userModel.load(baseUrl, requester, headers);
    var seamanModel = app.seamanModel.load(baseUrl, requester, headers);

    //var homeViews = app.homeViews.load();
    //var userViews = app.userViews.load();
    var seamanViews = app.seamanViews.load();

    //var userController = app.userController.load(userModel, userViews);
    var seamanController = app.seamanController.load(seamanModel, seamanViews);
    //var homeController = app.homeController.load(homeViews);

    var selector = '#ranks';
    //seamanController.listAllSeamans(selector);
   


    

    

    var as = app.getParam("who");
    var bz = app.getParam("ship");
    app.shipsNames=[];
    app.ShipCode=[];
    app.Flag = 'monchi';
    app.shipstuff=1;
    console.log(as);
    console.log(bz);
    if(bz==null) bz='ALL';
    app.asz = as;
    app.bsz = bz;

    selector = '#ships';
     seamanController.listShipsAll(selector).then(function(){
        console.log('------------------------finished');
        console.log(app.shipsNames);
        console.log(app.ShipCode);
        if(app.bsz!='ALL') {
            app.Flag = app.ShipCode[app.bsz];
            console.log('flag is ');
            console.log(app.Flag);
        }
     });
    selector = '#content';

    if(bz=='ALL'){
    if(as!=null) seamanController.listAllSeamansNameCrewCra(selector, as);
    else seamanController.listAllSeamansCrewCra(selector);
    }
    else{
        if(as!=null) seamanController.listAllSeamansNameCrewShipCra(selector, as, bz);
        else seamanController.listAllSeamansCrewShipCra(selector, bz);
    }

    
    app.crabtn = function()
    {
        self.location = 'cralicense.html?ship='+$('#ships').val();
    }

    app.shitbtn = function(name)
    {
        window.location.search='?who='+$('#search')[0].value+'&ship='+$('#ships').val();
    }

    $("#search").keyup(function (e) {
            if (e.which == 13) {
                app.shitbtn();
                }
            });

    app.addstuff = function(name, name2)
    {
        app.shipsNames[name]=name2;
       
    }

    
    //if(as!=null) seamanController.loadSeamanView(selector,as).then(function(){
    // selector = '#ranks';
    // seamanController.listRanks(selector);
    //});
    
}());