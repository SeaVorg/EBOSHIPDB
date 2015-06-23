var app = app || {};

(function() {
    var appId= '3ptqm4HWvKRnYieAXpaW99vWDjntqHYZFyXsWYTU';
    var restAPI = 'C2XOuRZN8q1bcERgcIspL3MrD319rbGbvIcptQPr';
    var baseUrl = 'https://api.parse.com/1/';

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
    var noteModel = app.noteModel.load(baseUrl, requester, headers);

    var homeViews = app.homeViews.load();
    var userViews = app.userViews.load();
    var noteViews = app.noteViews.load();

    var userController = app.userController.load(userModel, userViews);
    var noteController = app.noteController.load(noteModel, noteViews);
    var homeController = app.homeController.load(homeViews);

    

    app.router = Sammy(function () {
        var selector = '#container';

        this.before(function() {
            var userId = sessionStorage['userId'];
            //console.log("called smth, the userId is " + userId);             
            
            $("#welcomeMenu").text("Welcome, " + sessionStorage['username']);

            if(userId) {
                $('#menu').show();
            } else {
                $('#menu').hide();
            }
        });

        this.before('#/home/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                app.error_msg('You must be logged in to do that!');
                return false;
            }
        });

        this.before('#/office/(.*)', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                app.error_msg('You must be logged in to do that!');
                return false;
            }
        });

        this.before('#/addNote/(.*)', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                app.error_msg('You must be logged in to do that!');
                return false;
            }
        });

        this.before('#/myNotes/(.*)', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                app.error_msg('You must be logged in to do that!');
                return false;
            }
        });

        this.before('#/logout/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                app.error_msg('You must be logged in to do that!');
                return false;
            }
        });

        this.get('#/', function () {
            homeController.welcomeScreen(selector);
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/home/', function () {
            homeController.homeScreen(selector);
        });

        this.get('#/myNotes/', function() {
            this.redirect('#/myNotes/1');
            //noteController.listAllNotes(selector);
        });

        this.get('#/myNotes/:id', function(){
            noteController.listAllNotes(selector,this.params['id']);
        });

        this.get('#/office/', function() {
            this.redirect('#/office/1');
            //noteController.listAllTodayNotes(selector);
        });

        this.get('#/office/:id', function() {
            noteController.listAllTodayNotes(selector,this.params['id']);
        });

        this.get('#/addNote/', function() {
            noteController.loadAddNoteView(selector);
        });

        this.get('#/myNotes/edit/:id', function() {
            noteController.loadNoteView(selector, this.params['id'], 'edit');
        });

        this.get('#/myNotes/delete/:data', function() {
           noteController.loadNoteView(selector, this.params['data'], 'delete');
        });

        this.bind('login', function(e, data) {
            userController.login(data.username, data.password);
        });

        this.bind('register', function(e, data) {
            userController.register(data.username, data.password, data.fullName);
        });

        this.bind('addNote', function(e, data) {
            noteController.addNote(data.title, data.text, data.deadline);
        });

        this.bind('editNote', function(e, data) {
            noteController.editNote(data.id, data.title, data.text, data.deadline);
        });

        this.bind('deleteNote', function(e, data) {
            noteController.deleteNote(data.id);
        });
    });

    app.router.run('#/');
}());