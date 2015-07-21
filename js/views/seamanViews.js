var app = app || {};

app.seamanViews = (function() {
    function SeamanViews() {
        this.listTodaySeamans = {
            loadSeamansTodayView : loadSeamansTodayView
        }
        this.listSeamans = {
            loadSeamansView: loadSeamansView,
            loadSeamansViewCrew : loadSeamansViewCrew
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

    function loadSeamansView (selector, data) {
        console.log("in load seaman view");
        $.get('templates/seamanList.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });

    }

    function loadSeamansViewCrew (selector, data) {
        console.log("in load seaman view crew");
        $.get('templates/seamanListCrew.html', function (template) {
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