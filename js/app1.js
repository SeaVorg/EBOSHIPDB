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
   

    selector = '#container';
    var as = app.getParam("who");
    console.log(as);

    selector = '#content';
    if(as!=null) seamanController.loadSeamanView(selector,as).then(function(){
     selector = '#ranks';
     seamanController.listRanks(selector).then(function(){
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
                    SSOCert : $('#SSOCert').val(),
                    Rank : $('#ranks').val(),
                    Available : true
                };
                console.log(data);

                seamanController.editSeaman(as,data);
                
                return false;
            })
        }).done();
    });
    
}());