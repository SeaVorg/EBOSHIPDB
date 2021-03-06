var app = app || {};

app.seamanController = (function () {
    function SeamanController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    SeamanController.prototype.getId = function()
    {
        console.log("in get id");
        return this.model.getId()
            .then(function (data){
                console.log('getID');
                app.newId=parseInt(data.results[0].SeamanID)+1;
                console.log(app.newId);
            })
    }

    SeamanController.prototype.loadAddSeamanView = function(selector) {
        //console.log("loading add seamans view");
        this.viewBag.addSeaman.addSeamanView(selector);
    };

    SeamanController.prototype.loadSeamanView2 = function(selector, id) {
       var _this = this;
        console.log("controller mofo called load seaman");
        return this.model.listAllSeamansId(id)
            .then(function (data) {
                console.log(data.results);
                app.seamanRank = data.results[0].Rank;
                app.seamanID = data.results[0].SeamanID;
                console.log('"'+app.seamanRank+'"');
                //_this.viewBag.editSeaman.editSeamanView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
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

    SeamanController.prototype.listShipsAll  = function (selector)
    {   
        var _this = this;
        console.log("controller mofo called list all ships all");
        return this.model.listShipsAll()
            .then(function (data) {
                if(app.shipstuff!=null){
                var i;
                for(i=0;i<data.results.length;i++)
                {
                    app.ShipCode[data.results[i].Ship]=data.results[i].Flag;
                }
                }
                _this.viewBag.listShips.loadShipsViewAll(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listRanksAll  = function (selector)
    {   
        var _this = this;
        console.log("controller mofo called list all ranks all");
        return this.model.listRanksAll()
            .then(function (data) {
                _this.viewBag.listRanks.loadRanksViewAll(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listCountries  = function (selector1, selector2)
    {   
        var _this = this;
        console.log("controller mofo called list all countries");
        return this.model.listCountries()
            .then(function (data) {
                _this.viewBag.listCountries.loadCountriesView(selector1, selector2, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listPorts  = function (selector, country)
    {   
        var _this = this;
        console.log("controller mofo called list all ports "+country);
        return this.model.listPorts(country)
            .then(function (data) {
                console.log("logging date");
                console.log(data);
                _this.viewBag.listPorts.loadPortsView(selector, data);
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

    SeamanController.prototype.listAllSeamansNameAvailableRankOld = function (selector, name, rank) {
        var _this = this;
        console.log("all seamans available name");
        return this.model.listAllSeamansCrew()
            .then(function (data) {
                var ids = [];
               
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrewNotNameRank(ids,name,rank).then(function(data5){
                    
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansView(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansNameAvailableOld = function (selector, name) {
        var _this = this;
        console.log("all seamans available name");
        return this.model.listAllSeamansCrew()
            .then(function (data) {
                var ids = [];
               
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrewNotName(ids,name).then(function(data5){
                    
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansView(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansAvailableRankOld = function (selector,rank) {
        var _this = this;
        console.log("controller mofo called list all seamans available rank");
        console.log("all seamans");
        return this.model.listAllSeamansCrew()
            .then(function (data) {
                var ids = [];
               
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrewNotRank(ids,rank).then(function(data5){
                    
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansView(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansAvailableOld = function (selector) {
        var _this = this;
        console.log("controller mofo called list all seamans available");
        console.log("all seamans");
        return this.model.listAllSeamansCrew()
            .then(function (data) {
                var ids = [];
               
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrewNot(ids).then(function(data5){
                    
                    //console.log('read here');
                    console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansView(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansNameShips = function (selector, name, ship) {
        var _this = this;
        console.log("ships all seamans with name and ship");
        return this.model.listReallyAllSeamansShips(name, ship)
            .then(function (data) {
                console.log(data);
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansNameCrewShip = function (selector, name, ship) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewNameShip(name,ship)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrew(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansNameCrew = function (selector, name) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewName(name)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrew(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
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

    SeamanController.prototype.listAllSeamansCrewShip = function (selector, ship) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewShip(ship)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrew(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
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
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrew(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansShips = function (selector, ship) {
        var _this = this;
        console.log("controller mofo called list all seamans ships " + ship);
        return this.model.listAllSeamansShips(ship)
            .then(function (data) {
                console.log("bak in controler");
                console.log(data);
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
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

    SeamanController.prototype.addSeamanRace = function (data) {
        console.log("controller add seaman race");
        return this.model.addSeamanRace(data)
            .then(function() {
                //window.location.replace('#/mySeamans/');
                app.success_msg("Successfully added new seaman race!");
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

    SeamanController.prototype.editRace = function (seamanId, data) {
        return this.model.editRace(seamanId, data)
            .then(function() {
                //window.location.replace('#/mySeamans/');
                app.success_msg("Successfully edited seaman race!");
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

    SeamanController.prototype.deleteRace = function (seamanId) {
        return this.model.deleteRace(seamanId)
                    .then(function() {
                        //window.location.replace('#/mySeamans/');
                        app.success_msg("Successfully deleted Race!");
                        app.reloadz();
                    }, function(error) {
                       // window.location.replace('#/mySeamans/');
                        app.error_msg(error.responseJSON.error);
                    })
    };

    //------------- ships embark and disembark
    SeamanController.prototype.listAllSeamansNameEmbark = function (selector, name) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewName(name)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewHax(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansEmbark = function (selector) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewHax()
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewHax(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansNameEmbarkShip = function (selector, name, ship) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewNameShipHax(name,ship)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewHax(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listAllSeamansEmbarkShip = function (selector, ship) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewShipHax(ship)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewHax(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    //------------- end




    //====================== avail =============================
    //==========================================================
    SeamanController.prototype.listAllSeamansAvailable = function (selector) {
        var _this = this;
        console.log("controller mofo called list all seamans available");
        console.log("all seamans");
        return this.model.listAllSeamansAvailable()
            .then(function (data) {
                var ids = [];
               var stuff =[];
               var stuff2 =[];
               var asd=0;
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var datestr = ""+ data.results[i].Disembarking_date.iso[8]+data.results[i].Disembarking_date.iso[9]+"/"+data.results[i].Disembarking_date.iso[5] + data.results[i].Disembarking_date.iso[6] +"/" + data.results[i].Disembarking_date.iso[0]+ data.results[i].Disembarking_date.iso[1] + data.results[i].Disembarking_date.iso[2] + data.results[i].Disembarking_date.iso[3] 
                        var dateob = new Date(data.results[i].Disembarking_date.iso);
                        var datestr = dateob.toUTCString().substring(0,16);
                        if(stuff[str]==null) { stuff[str]=asd; stuff2[str] = datestr; asd++; }
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                console.log(ids);
                console.log(stuff);
                _this.model.listSeamansIds(ids).then(function(data5){
                    
                    var ress = [];
                    console.log('read here');
                    console.log(data5);
                    for(i=0;i<data5.results.length;i++)
                    {
                        ress[stuff[data5.results[i].SeamanID]]=data5.results[i];
                        ress[stuff[data5.results[i].SeamanID]].Disembarking_date = stuff2[data5.results[i].SeamanID];
                    }
                     var data6 = {
                        results : ress
                    }
                    console.log(ress);
                    console.log(data6);
                    console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewAvail(selector, data6);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansAvailableName = function (selector,name) {
        var _this = this;
        console.log("controller mofo called list all seamans available");
        console.log("all seamans");
        return this.model.listAllSeamansAvailableName(name)
            .then(function (data) {
                var ids = [];
               var stuff =[];
               var stuff2 =[];
               var asd=0;
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var datestr = ""+ data.results[i].Disembarking_date.iso[8]+data.results[i].Disembarking_date.iso[9]+"/"+data.results[i].Disembarking_date.iso[5] + data.results[i].Disembarking_date.iso[6] +"/" + data.results[i].Disembarking_date.iso[0]+ data.results[i].Disembarking_date.iso[1] + data.results[i].Disembarking_date.iso[2] + data.results[i].Disembarking_date.iso[3] 
                        var dateob = new Date(data.results[i].Disembarking_date.iso);
                        var datestr = dateob.toUTCString().substring(0,16);
                        if(stuff[str]==null) { stuff[str]=asd; stuff2[str] = datestr; asd++; }
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                console.log(ids);
                console.log(stuff);
                _this.model.listSeamansIds(ids).then(function(data5){
                    
                    var ress = [];
                    console.log('read here');
                    console.log(data5);
                    for(i=0;i<data5.results.length;i++)
                    {
                        ress[stuff[data5.results[i].SeamanID]]=data5.results[i];
                        ress[stuff[data5.results[i].SeamanID]].Disembarking_date = stuff2[data5.results[i].SeamanID];
                    }
                     var data6 = {
                        results : ress
                    }
                    console.log(ress);
                    console.log(data6);
                    console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewAvail(selector, data6);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansAvailableRank = function (selector,rank) {
        var _this = this;
        console.log("controller mofo called list all seamans available rank");
        console.log("all seamans");
        return this.model.listAllSeamansAvailableRank(rank)
            .then(function (data) {
                var ids = [];
               var stuff =[];
               var stuff2 =[];
               var asd=0;
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var datestr = ""+ data.results[i].Disembarking_date.iso[8]+data.results[i].Disembarking_date.iso[9]+"/"+data.results[i].Disembarking_date.iso[5] + data.results[i].Disembarking_date.iso[6] +"/" + data.results[i].Disembarking_date.iso[0]+ data.results[i].Disembarking_date.iso[1] + data.results[i].Disembarking_date.iso[2] + data.results[i].Disembarking_date.iso[3] 
                        var dateob = new Date(data.results[i].Disembarking_date.iso);
                        var datestr = dateob.toUTCString().substring(0,16);
                        if(stuff[str]==null) { stuff[str]=asd; stuff2[str] = datestr; asd++; }
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                console.log(ids);
                console.log(stuff);
                _this.model.listSeamansIds(ids).then(function(data5){
                    
                    var ress = [];
                    console.log('read here');
                    console.log(data5);
                    for(i=0;i<data5.results.length;i++)
                    {
                        ress[stuff[data5.results[i].SeamanID]]=data5.results[i];
                        ress[stuff[data5.results[i].SeamanID]].Disembarking_date = stuff2[data5.results[i].SeamanID];
                    }
                     var data6 = {
                        results : ress
                    }
                    console.log(ress);
                    console.log(data6);
                    console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewAvail(selector, data6);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansAvailableRankName = function (selector,rank,name) {
        var _this = this;
        console.log("controller mofo called list all seamans available rank");
        console.log("all seamans");
        return this.model.listAllSeamansAvailableRankName(rank,name)
            .then(function (data) {
                var ids = [];
               var stuff =[];
               var stuff2 =[];
               var asd=0;
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var datestr = ""+ data.results[i].Disembarking_date.iso[8]+data.results[i].Disembarking_date.iso[9]+"/"+data.results[i].Disembarking_date.iso[5] + data.results[i].Disembarking_date.iso[6] +"/" + data.results[i].Disembarking_date.iso[0]+ data.results[i].Disembarking_date.iso[1] + data.results[i].Disembarking_date.iso[2] + data.results[i].Disembarking_date.iso[3] 
                        var dateob = new Date(data.results[i].Disembarking_date.iso);
                        var datestr = dateob.toUTCString().substring(0,16);
                        if(stuff[str]==null) { stuff[str]=asd; stuff2[str] = datestr; asd++; }
                        ids.push(str);
                        
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                console.log(ids);
                console.log(stuff);
                _this.model.listSeamansIds(ids).then(function(data5){
                    
                    var ress = [];
                    console.log('read here');
                    console.log(data5);
                    for(i=0;i<data5.results.length;i++)
                    {
                        ress[stuff[data5.results[i].SeamanID]]=data5.results[i];
                        ress[stuff[data5.results[i].SeamanID]].Disembarking_date = stuff2[data5.results[i].SeamanID];
                    }
                     var data6 = {
                        results : ress
                    }
                    console.log(ress);
                    console.log(data6);
                    console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewAvail(selector, data6);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    //==================================================================
    //==================================================================
    //======================= list races ===============================
    SeamanController.prototype.listRaces = function (selector,id) {
        var _this = this;
        console.log("controller listRaces");
        return this.model.listAllSeamanRaces(id)
            .then(function (data) {
                console.log(data);
                _this.viewBag.listRaces.loadRacesView(selector, data);
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

     SeamanController.prototype.loadShips = function (stuff) {
        var _this = this;
        console.log("controller load ships");
        return this.model.listShipsAll()
            .then(function (data) {
                console.log(data);
                app.ships=data;
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.loadPorts = function (stuff) {
        var _this = this;
        console.log("controller load ports");
        return this.model.listPorts()
            .then(function (data) {
                console.log(data);
                app.ports=data;
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.listRacesId = function (selector,id,raceId) {
        var _this = this;
        console.log("controller listRacesid");
        return this.model.listAllSeamanRacesId(id,raceId)
            .then(function (data) {
                console.log(data);
                app.saveData(data);
                //_this.viewBag.listRaces.loadRacesView(selector, data);
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.getPort = function (stuff,stuff2) {
        var _this = this;
        console.log("controller geyy ports");
        return this.model.getPort(stuff)
            .then(function (data) {
                //console.log(data);
                //console.log('looooooooooooooooooooooooooooooooooooooooooool');
                app.savePort(data,stuff2);
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            });
    };

    //===========================================================
    //===========================================================
    //===========================================================
    // CRA License code below
    //===========================================================
    //===========================================================
    //===========================================================
    SeamanController.prototype.listAllSeamansCrewCra = function (selector) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrew()
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewCra(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansNameCrewCra = function (selector, name) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewName(name)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewCra(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansNameCrewShipCra = function (selector, name, ship) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewNameShip(name,ship)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewCra(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };
    SeamanController.prototype.listAllSeamansCrewShipCra = function (selector, ship) {
        var _this = this;
        console.log("crew all seamans");
        return this.model.listAllSeamansCrewShip(ship)
            .then(function (data) {
                var ids = [];
                var stuffs = [];
                var stships = [];
                var i;
                console.log(data.results.length);
                for(i=0;i<data.results.length;i++)
                {
                        var str = data.results[i].SeamanID;
                        var stship = data.results[i].Ship;
                        var dataKachvane = data.results[i].Embarking_date;
                        ids.push(str);
                        stuffs[str] = dataKachvane;
                        stships[str] = stship;
                        //stuffs.push(dataKachvane)
                        
                }
                //console.log(stuffs);
                //console.log(stships);
                //console.log(ids);
                _this.model.listAllSeamansIdCrew(ids).then(function(data5){
                    for(i=0;i<data5.results.length;i++)
                    {
                        data5.results[i].Embarking_date=stuffs[data5.results[i].SeamanID];
                        data5.results[i].Ship=app.shipsNames[stships[data5.results[i].SeamanID]];
                    }
                    //console.log('read here');
                    //console.log(data5);
                    //console.log('stop reading');
                    _this.viewBag.listSeamans.loadSeamansViewCrewCra(selector, data5);
                });
                //_this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    return {
        load: function (model, views) {
            return new SeamanController(model, views);
        }
    }
}());