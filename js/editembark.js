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


    app.editSeamanRace = function ( id )
    {
        console.log("editing");
        var date1 = new Date($("#Embark_date"+id).val());
        var date2 = new Date($("#Disembark_date"+id).val());

        var d1 = {
            __type: "Date",
            iso: date1.toISOString()
        }

        var d2 = {
            __type: "Date",
            iso: date2.toISOString()
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
    var race = app.getParam("race");
    console.log(race);

    app.setCountriesFunc=1;
    app.setCountries = function()
    {
        $('#Start_country').val(app.port1.Country);
        $('#End_country').val(app.port2.Country);
        
    }
    app.setPorts = function()
    {
     
        $('#Start_port').val(app.port1.Port);
        $('#End_port').val(app.port2.Port);
    }

    app.FUCKYOU = function(data)
    {
        app.object1=$('#Onship');
        app.object2=$('#Onship')[0];
        app.object3=$('#Onship')[0].value;
        app.object1.val(app.race.Ship);

    }
    app.saveData = function(data)
    {
        app.race = data.results[0];
    }
    app.savePort = function (data, stuff2)
    {
        if(stuff2==1){
            app.port1 = data.results[0];
            $('#Start_country').val(app.port1.Country);

        }
        else{ app.port2=data.results[0];
             $('#End_country').val(app.port2.Country);
        }
    }
    app.updatePort1 = function(country)
    {
        var selector3="#Start_port";
        seamanController.listPorts(selector3,country);
    } 
    app.updatePort2 = function(country)
    {
        var selector3="#End_port";
        seamanController.listPorts(selector3,country);
    }
    app.FUCKPORTS = function()
    {
        console.log(app.port1);
        console.log(app.port2);
        console.log('===============');
    }
    app.loadCountries = function()
    {
        var selector1 = '#Start_country';
        var selector2 = '#End_country';
        seamanController.listCountries(selector1,selector2).then(function()
            {
                
                $(selector1).change(function()
                    {
                        app.updatePort1($(selector1).val());
                    });
                
                $(selector2).change(function()
                    {
                        app.updatePort2($(selector2).val());
                    });
            });
    }

    app.DateStuffs = function()
    {
        if(app.race.Embarking_date!=null){
        var date2 = new Date(app.race.Embarking_date.iso);
        var month = (date2.getMonth()+1);
        if(month<10) month="0" + month;
        var date = date2.getDate();
        if(date<10) date = "0"+date;
        var datestring = date2.getFullYear()+"-"+month+"-"+date;
        console.log(datestring);
        $("#Start_date").val(datestring);
        }
        if(app.race.Disembarking_date!=null){
            var date2 = new Date(app.race.Disembarking_date.iso);
            var month = (date2.getMonth()+1);
            if(month<10) month="0" + month;
            var date = date2.getDate();
            if(date<10) date = "0"+date;
            var datestring = date2.getFullYear()+"-"+month+"-"+date;
            console.log(datestring);
            $("#End_date").val(datestring);
        }
        if(app.race.Embarked!=null)$('#Embarked').prop('checked',app.race.Embarked);
        if(app.race.Disembarked!=null)$('#Disembarked').prop('checked',app.race.Disembarked);
        if(app.race.General_notes!=null) $('#Notes').val(app.race.General_notes);
    }

    app.funct1 = function()
    {

        
        selector = '#Board_rank';
        seamanController.listRanks(selector).then(function(){
        $(selector)[0].value=app.seamanRank;
        
        app.loadCountries();
        app.DateStuffs();



            $('#editSeamanButton').click(function() {
                console.log("in add ");

                var date1 = new Date($("#Start_date").val());
                var date2 = new Date($("#End_date").val());

                var d1;

                if($("#Start_date").val()!=''){
                 d1 = {
                    __type: "Date",
                    iso: date1.toISOString()
                }
                }
                var d2;
                if($("#End_date").val()!=''){
                    d2 = {
                    __type: "Date",
                    iso: date2.toISOString()
                }
                }

                var data = {
                    SeamanID : $('#SeamanID').val(),
                    Rank : $('#Board_rank').val(),
                    Ship : $('#Onship').val(),
                    Embarked : $('#Embarked').prop('checked'),
                    //Disembarked: false,
                    Disembarked : $('#Disembarked').prop('checked'),
                    Embarking_date : d1,
                    Disembarking_date : d2,
                    Embarking_port : $('#Start_port').val(),
                    Disembarking_port : $('#End_port').val(),
                    General_notes : $('#Notes').val()
                    
                };
                console.log(data);

                seamanController.editRace(race,data);
                
                return false;
            })
        }).done();
    }

    

    seamanController.listShips('#Onship').then(function(){
            console.log($('#Onship'));
            app.FUCKYOU();
        });
    
    selector = '#content';
    if(as!=null) seamanController.loadSeamanView2(selector,as).then(function(){

        $('#SeamanID').val(app.seamanID);


        seamanController.listRacesId('',as,race).then(function(){
        console.log('finished.. savedd data si');
        console.log(app.race);
        app.FUCKYOU();
        console.log(app.race.Embarking_port);
        if(app.race.Embarking_port!=null)
        seamanController.getPort(app.race.Embarking_port,1).then(function(){
            console.log(app.race.Disembarking_port);
            if(app.race.Disembarking_port!=null) seamanController.getPort(app.race.Disembarking_port,2).then(function(){
                app.FUCKPORTS();
                app.funct1();
                });
            else
            {
                console.log('COOOOOOOOOOoo');
                app.funct1();
            }
        });
        });
    });

}());
