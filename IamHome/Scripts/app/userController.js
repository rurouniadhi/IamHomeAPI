angular.module('IamHomeApp', [])
    .controller('IamHomeCtrl', function ($scope, $http) {
        $scope.Id = "ee";
        $scope.Name = "ee";
        $scope.Email = "ee@ee.ee";
        $scope.PhoneNumber = "123";
        $scope.Status = false;

        /**$scope.getUsers = function () {
            $http.get("/api/users").success(function (data, status, headers, config) {
                $scope.id = data.Id;
                $scope.name = data.Name;
                $scope.email = data.Email;
                $scope.phonenumber = data.PhoneNumber;
                $scope.status = data.Status;
            }).error(function (data, status, headers, config) {
                console.log(error);
            });
        }; **/
        $scope.getUsers = function () {
          $http({
            method: 'GET',
            url: 'api/users'
          }).then(function (user, success) {
            console.log(user.data);
            this.userlist = user.data;
            for (let i = 0; i < user.data.length; i++) {
              let id = this.userlist[i].Id;
              let name = this.userlist[i].Name;
              let email = this.userlist[i].Email;
              let phonenumber = this.userlist[i].PhoneNumber;
              let status = this.userlist[i].Status;
              console.log(name);
            }
            // id = user.Id;
            //   name = user.Name;
            //   email = user.Email;
            //   phonenumber = user.PhoneNumber;
            //  status = user.Status;

          }, function (error) {
            console.log(error);
          });
        }
    });

