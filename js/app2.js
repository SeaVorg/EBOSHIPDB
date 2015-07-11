var app = app || {};

(function() {
    var appId= '6cyfrgXtA8d36yNvOI2W66X9jbj5Qe86NFMF7UZc';
    var restAPI = 'C7MXpLQzn1CLA8Io2y2GbCJA1XEhnTLALc7qMYVY';
    var baseUrl = 'https://api.parse.com/1/';



    app.shitbtn = function(name)
    {
        window.location.search='?who='+$('#search')[0].value;
    }

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

    app.seaController = seamanController;

    var selector = '#container';
    var as = app.getParam("who");
    app.asz = as;
    console.log(as);
    if(as!=null) seamanController.listAllSeamansNameAvailable(selector, as);
    else seamanController.listAllSeamansAvailable(selector);

    $("#search").keyup(function (e) {
            if (e.which == 13) {
                app.shitbtn();
                }
            });

    app.deleteSeaman = function deleteSeaman(objectId)
    {
        //console.log("deleting");
        if(confirm("Are you sure you want to delete?")){ 
            console.log('deleting');
            app.seaController.deleteSeaman(objectId);
            console.log(app.asz);
            //location.reload();
            //app.shitbtn(app.asz);
        }
    }

    app.reloadz = function ()
    {
        $('#container')[0].innerHTML='';
        if(app.asz!=null ) seamanController.listAllSeamansNameAvailable(selector, as);
        else seamanController.listAllSeamansAvailable(selector);
    }
}());