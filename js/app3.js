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
    app.newId=13000;
    seamanController.getId().then(function(){
        $('#SeamanID')[0].value = app.newId;
    });
    


     selector = '#ranks';
     seamanController.listRanks(selector).then(function() {
            //console.log("attemptiong hook");
            // checkboxes
            var visa = $('#USA_visa').val();
            var SSOCertz = $('#SSOCert').val();
            if(visa=='on') visa=true;
            if(visa=='off') visa=false;


            $('#addSeamanButton').click(function() {
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
                    Panama_license_number :$("#Panama_license_number" ).val(), 
                    Gibraltar_license_number:$("#Gibraltar_license_number").val(),
                    Available : true
                };
                console.log(data);

                seamanController.addSeaman(data);
                
                return false;
            })
        }).done();
    
}());