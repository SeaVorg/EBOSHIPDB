var app = app || {};

app.seamanController = (function () {
    function SeamanController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    SeamanController.prototype.loadAddSeamanView = function(selector) {
        //console.log("loading add seamans view");
        this.viewBag.addSeaman.addSeamanView(selector);
    };

    SeamanController.prototype.loadSeamanView = function(selector, id) {
       var _this = this;
        console.log("controller mofo called load seaman");
        return this.model.listAllSeamansId(id)
            .then(function (data) {
                console.log(data.results);
                app.seamanRank = data.results[0].Rank;
                console.log('"'+app.seamanRank+'"');
                _this.viewBag.editSeaman.editSeamanView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllTodaySeamans = function (selector, urlParams) {
        var _this = this;
        var pageId = urlParams;
        ///console.log(urlParams);
        pageId--;

        return this.model.listAllTodaySeamans(pageId*10)
            .then(function (data) {
                console.log(data);
                _this.viewBag.listTodaySeamans.loadSeamansTodayView(selector, data, data.count ,pageId+1);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listShips  = function (selector)
    {   
        var _this = this;
        console.log("controller mofo called list all ships");
        return this.model.listShips()
            .then(function (data) {
                _this.viewBag.listShips.loadShipsView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listShipsDate = function (selector, data) {
        var _this = this;
        var oldData=data;
        console.log("controller mofo called list all ships shit");
        return this.model.listShipsDate(data)
            .then(function (data) {
                console.log(data);
                var i;
                var results=[];
                var s = new Date( Date.parse(oldData.beginDate));
                var e = new Date( Date.parse(oldData.endDate));
                
                var ss= (s.getUTCMonth()+1)+"/"+s.getUTCDate()+"/"+s.getFullYear();
                var ee =(e.getUTCMonth()+1)+"/"+e.getUTCDate()+"/"+e.getFullYear();
                
                var origs = Date.parse(ss);
                var orige = Date.parse(ee);
                
                var zaqvki=0;

                var ids = [];
                
                for(i=0;i<data.results.length;i++)
                {
                    var start =  Date.parse(data.results[i].Embarking_date);
                    var end=  Date.parse(data.results[i].Disembarking_date);

                    if(+origs<=+start&&+orige>=+end) {
                        var str = data.results[i].SeamanID;
                        
                       
                        
                        ids.push(str);
                        

                        //results.push(data.results[i]);
                    }
                    _this.model.listSeamansIds(ids).then(function(dataz){
                            console.log("deiba");
                            console.log(dataz);
                           
                                _this.viewBag.listShipmans.loadShipmansView(selector, dataz);

                            
                        });

                        
                }
                console.log("listShipsDate");

                
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listRanks  = function (selector)
    {   
        var _this = this;
        console.log("controller mofo called list all ranks");
        return this.model.listRanks()
            .then(function (data) {
                _this.viewBag.listRanks.loadRanksView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansNameAvailable = function (selector, name) {
        var _this = this;
        return this.model.listAllSeamansAvailable()
            .then(function (data) {
                console.log(data);

                var i;
                for(i=0;i<data.results.length;i++)
                {
                    console.log(i);
                    
                    if(data.results[i].Name.toLowerCase().indexOf(name.toLowerCase()) > -1){
                        console.log('asd');
                    }
                    else {
                        console.log("deleting");
                        data.results.splice(i,1);
                        i--;
                    
                    }
                }
              
                
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansAvailable = function (selector) {
        var _this = this;
        console.log("controller mofo called list all seamans available");
        return this.model.listAllSeamansAvailable()
            .then(function (data) {
                
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansNameCrew = function (selector, name) {
        var _this = this;
        console.log("crew all seamans with name ");
        return this.model.listReallyAllSeamansCrew(name)
            .then(function (data) {
                console.log(data);
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansName = function (selector, name) {
        var _this = this;
        console.log("controller mofo called list all seamans");
        return this.model.listReallyAllSeamans(name)
            .then(function (data) {
                console.log(data);
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansNamez = function (selector, name) {
        var _this = this;
        return this.model.listAllSeamans()
            .then(function (data) {
                console.log(data);

                var i;
                for(i=0;i<data.results.length;i++)
                {
                    console.log(i);
                    
                    if(data.results[i].Name.toLowerCase().indexOf(name.toLowerCase()) > -1){
                        console.log('asd');
                    }
                    else {
                        console.log("deleting");
                        data.results.splice(i,1);
                        i--;
                    
                    }
                }
              
                
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansCrew = function (selector) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrew()
            .then(function (data) {
                var ids = [];
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        
                        ids.push(str);
                        
                }
                console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    _this.viewBag.listSeamans.loadSeamansView(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamans = function (selector) {
        var _this = this;
        console.log("controller mofo called list all seamans");
        return this.model.listAllSeamans()
            .then(function (data) {
                
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.addSeaman = function (data) {
        console.log("controller add seaman ");
        return this.model.addSeaman(data)
            .then(function() {
                //window.location.replace('#/mySeamans/');
                app.success_msg("Successfully added new seaman!");
            }, function(error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.editSeaman = function (seamanId, data) {
        return this.model.editSeaman(seamanId, data)
            .then(function() {
                //window.location.replace('#/mySeamans/');
                app.success_msg("Successfully edited seaman!");
            }, function(error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.deleteSeaman = function (seamanId) {
        return this.model.deleteSeaman(seamanId)
                    .then(function() {
                        //window.location.replace('#/mySeamans/');
                        app.success_msg("Successfully deleted seaman!");
                        app.reloadz();
                    }, function(error) {
                       // window.location.replace('#/mySeamans/');
                        app.error_msg(error.responseJSON.error);
                    })
    };

    return {
        load: function (model, views) {
            return new SeamanController(model, views);
        }
    }
}());