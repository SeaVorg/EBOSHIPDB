var app = app || {};

app.noteViews = (function() {
    function NoteViews() {
        this.listTodayNotes = {
            loadNotesTodayView : loadNotesTodayView
        }
        this.listNotes = {
            loadNotesView: loadNotesView
        };

        this.addNote = {
            addNoteView: addNoteView
        };

        this.editNote = {
            editNoteView: editNoteView
        };

        this.deleteNote = {
            deleteNoteView: deleteNoteView
        }
    }

    function loadNotesTodayView ( selector, data, itemsCount, pageId)
    {
        $.get('templates/officeNoteTemplate.html', function (template) {
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

    function loadNotesView (selector, data, itemsCount, pageId) {
        $.get('templates/myNoteTemplate.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function(){
            $('#pagination').pagination({
            items: itemsCount,
            itemsOnPage: 10,
            cssStyle: 'light-theme',
            hrefTextPrefix: '#/myNotes/'
        }).pagination('selectPage', pageId);
        });

    }

    function addNoteView (selector) {
        $.get('templates/addNote.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            //console.log("attemptiong hook");
            $('#addNoteButton').click(function() {
                //console.log("in add ");
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();

                $.sammy(function() {
                    this.trigger('addNote', {title: title, text: text, deadline: deadline});
                    
                });
                
                return false;
            })
        }).done();
    }

    function editNoteView (selector, data) {
        $.get('templates/editNote.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            $('#editNoteButton').click(function() {
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();

                $.sammy(function() {
                    this.trigger('editNote', {id:data.id, title: title, text: text, deadline: deadline});
                    
                });

                return false;
            })
        }).done();
    }

    function deleteNoteView (selector, data) {
        $.get('templates/deleteNote.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function() {
            $('#deleteNoteButton').click(function() {

                if (confirm('Are you sure you want to delete the note?')) {
                    $.sammy(function() {
                        this.trigger('deleteNote', {id: data.id});
                    });

                }     

                return false;
            })
        }).done();
    }

    return {
        load: function() {
            return new NoteViews();
        }
    }
}());