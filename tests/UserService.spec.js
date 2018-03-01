describe('UserService', function () {
    beforeEach(module('app'));
 
    var UserService, $httpBackend;
 
    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
 
        $httpBackend.when('GET', '/rest/user').respond({first_name: 'John', last_name: 'Dole'});
    }));
 
    it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');
 
        UserService
          .getUser()
          .then(function (res) {
          	var data = res.data;
            if (data.last_name === 'Dole' && data.first_name === 'John') {
              done();
            }
          });
 
        $httpBackend.flush();
    });

    it('createFullName should add names togehtor correctly', function (){

    	expect(UserService.createFullName({first_name: "New", last_name: "York"})).toEqual('New York')

    });
});
