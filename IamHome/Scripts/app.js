var ViewModel = function () {
    var self = this;
    self.users = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
    self.remove = ko.observable();
    self.newUser = {
        Name: ko.observable(),
        Email: ko.observable(),
        PhoneNumber: ko.observable(),
        Status: ko.observable()
    };
    self.Id = ko.observable();
    self.Name = ko.observable();
    self.Email = ko.observable();
    self.PhoneNumber = ko.observable();
    self.Status = ko.observable();
    var user = {
        Id: self.Id,
        Name: self.Name,
        Email: self.Email,
        PhoneNumber: self.PhoneNumber,
        Status: self.Status
    }
    

    var usersUri = '/api/users/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    //get all users
    function getAllUsers() {
        ajaxHelper(usersUri, 'GET').done(function (data) {
            self.users(data);
        });
    }

    //user detail
    self.getUser = function (item) {
        ajaxHelper(usersUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    };

    //user delete
    self.deleteUser = function (item) {
        if (confirm('Are you sure to Delete "' + item.Name + '"?')) {
            ajaxHelper(usersUri + item.Id, 'DELETE', user).done(function (data) {
                self.users.remove(data);
                getAllUsers();
            });
        }
    };

    //add new user
    self.addUser = function (formElement) {
        var user = {
            Name: self.newUser.Name(),
            Email: self.newUser.Email(),
            PhoneNumber: self.newUser.PhoneNumber(),
            Status: self.newUser.Status()
        };

        ajaxHelper(usersUri, 'POST', user).done(function (item) {
            self.users.push(item);
        });
    };

    self.editUser = function (item) {
        var user = {
            Name: self.Name(),
            Email: self.Email(),
            PhoneNumber: self.PhoneNumber(),
            Status: self.Status()
        };
        ajaxHelper(usersUri + item.Id, 'POST', user).done(function (item) {
            self.users.push(item);
        })
    }

    

    getAllUsers();

};

ko.applyBindings(new ViewModel());
