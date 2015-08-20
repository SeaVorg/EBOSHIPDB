var app = app || {};

app.seamanViews = (function() {
    function SeamanViews() {
        this.listTodaySeamans = {
            loadSeamansTodayView : loadSeamansTodayView
        }
        this.listSeamans = {
            loadSeamansView: loadSeamansView,
            loadSeamansViewCrew : loadSeamansViewCrew,
            loadSeamansViewCrewCra : loadSeamansViewCrewCra,
            loadSeamansViewCrewHax: loadSeamansViewCrewHax,
            loadSeamansViewAvail: loadSeamansViewAvail
        };

        this.addSeaman = {
            addSeamanView: addSeamanView
        };

        this.editSeaman = {
            editSeamanView: editSeamanView
        };

        this.deleteSeaman = {
            deleteSeamanView: deleteSeamanView
        }

        this.listRanks = {
            loadRanksView: loadRanksView,
            loadRanksViewAll: loadRanksViewAll
        }
        this.listShips = {
            loadShipsView: loadShipsView,
            loadShipsViewAll: loadShipsViewAll
        }
        this.listShipmans = 
        {
            loadShipmansView: loadShipmansView
        }
        this.listRaces = {
            loadRacesView: loadRacesView
        }
        this.listCountries={
            loadCountriesView: loadCountriesView
        }
        this.listPorts = 
        {
            loadPortsView: loadPortsView
        }
    }

     function loadRacesView(selector, data)
    {
        console.log("in load races view");
        $.get('templates/seamanRaces.html', function (template) {
            var outHtml = Mustache.render(template, data);
            
            $(selector).html(outHtml);
        }).then(function(){
            //$(selector)[0].value=app.seamanRank;
        });
    }

    function loadPortsView(selector, data)
    {
        console.log("in load races view");
        $.get('templates/portsStuff.html', function (template) {
            var outHtml = Mustache.render(template, data);
            
            $(selector).html(outHtml);
        }).then(function(){
            if(app.setCountriesFunc==1) app.setPorts();
            //$(selector)[0].value=app.seamanRank;
        });
    }

    function loadShipmansView(selector, data)
    {
        console.log("in load ships from adsasdad view");
        $.get('templates/shipsDateStuff.html', function (template) {
            var outHtml = Mustache.render(template, data);
            console.log('out html');
            console.log(outHtml);
            //console.log(outHtml);
            $(selector).html(outHtml);
        }).then(function(){
            //$(selector)[0].value=app.seamanRank;
        });
    }

    function loadSeamansTodayView ( selector, data, itemsCount, pageId)
    {
        $.get('templates/officeSeamanTemplate.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function(){
            $('#pagination').pagination({
            items: itemsCount,
            itemsOnPage: 10,
            cssStyle: 'light-theme',
            hrefTextPrefix: '#/office/'
        }).pagination('selectPage', pageId);
        });

        

    }

    function loadRanksView (selector, data)
    {
        console.log("in load ranks view");
        $.get('templates/ranksStuff.html', function (template) {
            var outHtml = Mustache.render(template, data);
            //console.log(outHtml);
            $(selector).html(outHtml);
        }).then(function(){
            $(selector)[0].value=app.seamanRank;
        });
    }

    function loadRanksViewAll (selector, data)
    {
        console.log("in load ranks view");
        $.get('templates/ranksStuffAll.html', function (template) {
            var outHtml = Mustache.render(template, data);
            //console.log(outHtml);
            $(selector).html(outHtml);
        }).then(function(){
            $(selector)[0].value=app.rankz;
        });
    }

    function loadShipsViewAll (selector, data)
    {
        console.log("YYYYYYYYYYYYYYY");
        $.get('templates/shipsStuffAll.html', function (template) {
            var outHtml = Mustache.render(template, data);
            //console.log(outHtml);
            $(selector).html(outHtml);
        }).then(function(){
            $(selector)[0].value=app.bsz;
        });
    }

    function loadShipsViewValue (selector, data,value)
    {
        console.log("in load ships view");
        $.get('templates/shipsStuff.html', function (template) {
            var outHtml = Mustache.render(template, data);
            //console.log(outHtml);
            $(selector).html(outHtml);
        }).then(function(){
            $(selector)[0].value=value;
        });
    }


    function loadShipsView (selector, data)
    {
        console.log("in load ships view");
        $.get('templates/shipsStuff.html', function (template) {
            var outHtml = Mustache.render(template, data);
            //console.log(outHtml);
            $(selector).html(outHtml);
        }).then(function(){
            //$(selector)[0].value=app.seamanRank;
        });
    }

    function loadCountriesView (selector1, selector2, data)
    {
        console.log("in load countries view");
        $.get('templates/countriesStuff.html', function (template) {
            var outHtml = Mustache.render(template, data);
            //console.log(outHtml);
            $(selector1).html(outHtml);
            $(selector2).html(outHtml);
        }).then(function(){
            if(app.setCountriesFunc==1) app.setCountries();
            app.updatePort1($(selector1).val());
            app.updatePort2($(selector2).val());
        });
    }

    function loadSeamansView (selector, data) {
        console.log("in load seaman view");
        $.get('templates/seamanList.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });

    }

    function loadSeamansViewAvail (selector, data) {
        console.log("in load seaman view");
        $.get('templates/seamanListAvail.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });

    }

    function loadSeamansViewCrew (selector, data) {
        console.log("in load seaman view crew");
        $.get('templates/seamanListCrew.html', function (template) {
            console.log("0000000000000000000000 hax");
            var i;
            var j;
            var count=0;
            var r = 'MASTER';
            var ranks = [];
            ranks[1] ='MASTER';
            ranks[2] ='CHOFF';
            ranks[3] ='2NDOFF';
            ranks[4] ='3RDOFF';
            ranks[5] ='CHENG';
            ranks[6] ='1STENG';
            ranks[7] ='2NDENG';
            ranks[8] ='3RDENG';
            ranks[9] ='ELENG';
            ranks[10]='ELECTR';
            ranks[11]='BOSUN';
            ranks[12]='AB';
            ranks[13]='OILER';
            ranks[14]='DFITT';
            ranks[15]='EFITT';
            ranks[16]='DECBOY';
            ranks[17]='DBOY';
            ranks[18]='COOK';
            ranks[19]='XTRAFITT';
            ranks[20]='XTRA2NDOFF';
            ranks[21]='XTRA2NDENG';
            ranks[22]='FITTER';
            ranks[23]='TRUCKF';
            ranks[24]='ASSENG';
            ranks[25]='ASELEC';
            ranks[26]='MOTMAN';
            ranks[27]='MESMAN';
            ranks[28]='DCADETT';
            ranks[29]='ECADETT';
            ranks[30]='RO';
            ranks[31]='OS';
            ranks[32]='STWD';
            ranks[33]='WIPER';
            ranks[34]='WIFE';
            ranks[35]='CHILD';
            ranks[36]='TECNIC';
            console.log('-----------------');
            for(i=0;i<data.results.length;i++)
            {
                data.results[i].Rank=data.results[i].Rank.trim();
                console.log(data.results[i].Rank);
            }
            console.log('-----------------');

            for(j=1;j<36;j++)
            {

            r = ranks[j];
            for(i=0;i<data.results.length;i++)
            {
                if(data.results[i].Rank==r)
                {
                    var t = data.results[count];
                    data.results[count]=data.results[i];
                    data.results[i]=t;
                    count++;
                }
            }

            }

            console.log('-----------------');
            for(i=0;i<data.results.length;i++)
            {
                console.log(data.results[i].Rank);
            }
            console.log('-----------------');
            

            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });

    }

    function loadSeamansViewCrewCra (selector, data) {
        console.log("in load seaman view cra");
        $.get('templates/seamanListCra.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });

    }

    function loadSeamansViewCrewHax (selector, data) {
        console.log("in load seaman view crew");
        $.get('templates/seamanListCrewHax.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });

    }

    function addSeamanView (selector) {
        $.get('templates/addSeaman.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            //console.log("attemptiong hook");
            $('#addSeamanButton').click(function() {
                //console.log("in add ");
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();

                $.sammy(function() {
                    this.trigger('addSeaman', {title: title, text: text, deadline: deadline});
                    
                });
                
                return false;
            })
        }).done();
    }

    function editSeamanView (selector, data) {
        $.get('templates/editSeamanTemplate.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            
        }).done();
    }

    function deleteSeamanView (selector, data) {
        $.get('templates/deleteSeaman.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            $('#deleteSeamanButton').click(function() {

                if (confirm('Are you sure you want to delete the seaman?')) {
                    $.sammy(function() {
                        this.trigger('deleteSeaman', {id: data.id});
                    });

                }     

                return false;
            })
        }).done();
    }

    return {
        load: function() {
            return new SeamanViews();
        }
    }
}());