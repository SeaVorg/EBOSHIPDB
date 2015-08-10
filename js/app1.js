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

    app.deleteSeamanRace = function(id)
    {
        seamanController.deleteRace(id);
    }
    app.editSeamanRace = function ( id )
    {
        console.log("editing");
        var date1 = new Date($("#Embark_date"+id).val());
        var date2 = new Date($("#Disembark_date"+id).val());
        var d1;

        if($("#Embark_date"+id).val()!=''){
         d1 = {
            __type: "Date",
            iso: date1.toISOString()
        }
        }
        var d2;
        if($("#Disembark_date"+id).val()!=''){
            d2 = {
            __type: "Date",
            iso: date2.toISOString()
        }
        }


        var data = 
        {
            Embarking_date: d1,
            Embarked: $("#embarked"+id).prop('checked'),
            Disembarking_date: d2,
            Disembarked: $("#disembarked"+id).prop('checked'),
            General_notes: $("#Notes"+id).val()
        };
        console.log(data);

        seamanController.editRace(id,data);
    }
   

    selector = '#container';
    var as = app.getParam("who");
    console.log(as);

    app.addSeamanEmbarkation = function()
    {
        self.location='addembarkation.html?who='+as;
        
    }
    app.editSeamanEmbarkation = function(race)
    {
        self.location='editembarkation.html?who='+as+'&race='+race;
    }

    selector = '#content';
    if(as!=null) seamanController.loadSeamanView(selector,as).then(function(){
     selector = '#ranks';
     seamanController.listRanks(selector).then(function(){
        app.ports=[];
        app.ships=[];

        seamanController.loadShips(app.ships);
        seamanController.loadPorts(app.ports);



     }
        ).then(function(){
        $(selector)[0].value=app.seamanRank;
            //console.log("attemptiong hook");
            // checkboxes
            var visa = $('#USA_visa').val();
            var SSOCertz = $('#SSOCert').val();
            if(visa=='on') visa=true;
            if(visa=='off') visa=false;


            $('#editSeamanButton').click(function() {
                //console.log("in add ");
                var data = {
                    SeamanID : $('#SeamanID').val(),
                    Name : $('#Name').val(),
                    Birth_date : $('#Birth_date').val(),
                    Birth_place : $('#Birth_place').val(),
                    Nationality: $('#Nationality').val(),
                    Email: $('#Email').val(),
                    Address: $('#Address').val(),
                    City: $('#City').val(),
                    Telephone: $('#Telephone').val(),
                    Recruiting_agent: $('#Recruiting_agent').val(),
                    Notes: $('#Notes').val(),
                    USA_visa_expiration: $('#USA_visa_expiration').val(),
                    Rank_modify: $('#Rank_modify').val(),
                    Application_date: $('#Application_date').val(),
                    CRA_expiration: $('#CRA_expiration').val(),
                    Seaman_book_number: $('#Seaman_book_number').val(),
                    Seaman_book_expiration: $('#Seaman_book_expiration').val(),
                    Passport_number: $('#Passport_number').val(),
                    Passport_expiration : $('#Passport_expiration').val(),
                    National_license_number : $('#National_license_number').val(),
                    National_license_expiration : $('#National_license_expiration').val(),
                    Rank : $('#ranks').val(),
                    Malta_license_number  :$("#Malta_license_number"  ).val(), 
                    SVG_license_number    :$("#SVG_license_number"    ).val(), 
                    Bahamas_license_number:$("#Bahamas_license_number").val(), 
                    Cayman_license_number :$("#Cayman_license_number" ).val(), 
                    Gibraltar_license_number:$("#Gibraltar_license_number").val(),
                    Panama_license_number :$("#Panama_license_number" ).val()
                };
                console.log(data);

                seamanController.editSeaman(as,data);
                
                return false;
            })
        }).then(function()
        {
            selector='#races';
            if(as!=null) seamanController.listRaces(selector,$('#SeamanID').val());
        }).done();
    });

}());