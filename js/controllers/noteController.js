var app = app || {};

app.noteController = (function () {
    function NoteController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    NoteController.prototype.loadAddNoteView = function(selector) {
        //console.log("loading add notes view");
        this.viewBag.addNote.addNoteView(selector);
    };

    NoteController.prototype.loadNoteView = function(selector, urlParams, action) {
        var data = urlParams.split('&');
        var outData = {
            id : data[0].split('id=')[1],
            title : data[1].split('title=')[1],
            text : data[2].split('text=')[1],
            author : data[3].split('author=')[1],
            deadline : data[4].split('deadline=')[1]
        };

        //console.log("in load note view,");
        //console.log(outData);

        if(action === 'delete') {
            this.viewBag.deleteNote.deleteNoteView(selector, outData);
        } else {
            this.viewBag.editNote.editNoteView(selector, outData);
        }
    };

    NoteController.prototype.listAllTodayNotes = function (selector, urlParams) {
        var _this = this;
        var pageId = urlParams;
        ///console.log(urlParams);
        pageId--;

        return this.model.listAllTodayNotes(pageId*10)
            .then(function (data) {
                console.log(data);
                _this.viewBag.listTodayNotes.loadNotesTodayView(selector, data, data.count ,pageId+1);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    NoteController.prototype.listAllNotes = function (selector, urlParams) {
        var _this = this;
        var pageId = urlParams;
        pageId--;
        //console.log(urlParams);
        return this.model.listAllNotes(pageId*10)
            .then(function (data) {
                _this.viewBag.listNotes.loadNotesView(selector, data, data.count, pageId+1);
            }, function (error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    NoteController.prototype.addNote = function (title, text, deadline) {
        //console.log("controller add note ");
        return this.model.addNote(title, text, deadline)
            .then(function() {
                window.location.replace('#/myNotes/');
                app.success_msg("Successfully added new note!");
            }, function(error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    NoteController.prototype.editNote = function (phoneId, title, text, deadline) {
        return this.model.editNote(phoneId, title, text, deadline)
            .then(function() {
                window.location.replace('#/myNotes/');
                app.success_msg("Successfully edited note!");
            }, function(error) {
                app.error_msg(error.responseJSON.error);
            })
    };

    NoteController.prototype.deleteNote = function (noteId) {
        return this.model.deleteNote(noteId)
                    .then(function() {
                        window.location.replace('#/myNotes/');
                        app.success_msg("Successfully deleted note!");
                    }, function(error) {
                        window.location.replace('#/myNotes/');
                        app.error_msg(error.responseJSON.error);
                    })
    };

    return {
        load: function (model, views) {
            return new NoteController(model, views);
        }
    }
}());