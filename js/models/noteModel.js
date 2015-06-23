var app = app || {};

app.noteModel = (function() {
    function NoteModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Note/';
        this.requester = requester;
        this.headers = headers;
    }

    NoteModel.prototype.listAllTodayNotes = function(page){
        return this.requester.get(this.serviceUrl + '?where={"deadline":"' + new Date().toJSON().slice(0,10) + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    }

    NoteModel.prototype.listAllNotes = function(page) {
        return this.requester.get(this.serviceUrl + '?where={"author": "' + sessionStorage['fullName'] + '"}&limit=10&count=10&skip='+page, this.headers.getHeaders(true));
    };

    NoteModel.prototype.addNote = function(title, text, deadline) {
        //console.log("add note called");
        var userId = sessionStorage['userId'];
        var author = sessionStorage['fullName'];
        var data = {
            title : title,
            text : text,
            author : author,
            deadline : deadline,
            ACL : {
                "*":{"read":true}, 
            }
        };

        data.ACL[userId] = {"write":true,"read":true};
        //console.log("adding note with data ");
        //console.log(data);
        return this.requester.post(this.serviceUrl, this.headers.getHeaders(true), data);
    };

    NoteModel.prototype.editNote = function(noteId, title, text, deadline) {
        // we dont change author
        var data = {
            title : title,
            text : text,
            deadline : deadline
        };

        return this.requester.put(this.serviceUrl + noteId, this.headers.getHeaders(true), data);
    };

    NoteModel.prototype.deleteNote = function(noteId) {
        return this.requester.remove(this.serviceUrl + noteId, this.headers.getHeaders(true));
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new NoteModel(baseUrl, requester, headers);
        }
    }
}());