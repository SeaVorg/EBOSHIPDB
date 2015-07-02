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

    SeamanController.prototype.loadSeamanView = function(selector, urlParams, action) {
        var data = urlParams.split('&');
        var outData = {
            id : data[0].split('id=')[1],
            title : data[1].split('title=')[1],
            text : data[2].split('text=')[1],
            author : data[3].split('author=')[1],
            deadline : data[4].split('deadline=')[1]
        };

        //console.log("in load seaman view,");
        //console.log(outData);

        if(action === 'delete') {
            this.viewBag.deleteSeaman.deleteSeamanView(selector, outData);
        } else {
            this.viewBag.editSeaman.editSeamanView(selector, outData);
        }
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

    SeamanController.prototype.listAllSeamans = function (selector) {
        var _this = this;
        console.log("controller mofo called list all seamans");
        return this.model.listAllSeamans()
            .then(function (data) {
                console.log('asd');
                console.log(data);
                _this.viewBag.listSeamans.loadSeamansView(selector, data);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.addSeaman = function (title, text, deadline) {
        //console.log("controller add seaman ");
        return this.model.addSeaman(title, text, deadline)
            .then(function() {
                window.location.replace('#/mySeamans/');
                app.success_msg("Successfully added new seaman!");
            }, function(error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.editSeaman = function (phoneId, title, text, deadline) {
        return this.model.editSeaman(phoneId, title, text, deadline)
            .then(function() {
                window.location.replace('#/mySeamans/');
                app.success_msg("Successfully edited seaman!");
            }, function(error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    SeamanController.prototype.deleteSeaman = function (seamanId) {
        return this.model.deleteSeaman(seamanId)
                    .then(function() {
                        window.location.replace('#/mySeamans/');
                        app.success_msg("Successfully deleted seaman!");
                    }, function(error) {
                        window.location.replace('#/mySeamans/');
                        app.error_msg(error.responseJSON.error);
                    })
    };

    return {
        load: function (model, views) {
            return new SeamanController(model, views);
        }
    }
}());