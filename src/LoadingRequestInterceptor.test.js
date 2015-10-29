require('angular/angular.min')
require('angular-mocks')
require('.')
describe('LoadingRequestInterceptor', function () {
  var LoadingRequestInterceptor, $rootScope, request, response, responseError
  beforeEach(angular.mock.module('angular-request-loading'))
  beforeEach(inject(function ($injector) {
    LoadingRequestInterceptor = $injector.get('LoadingRequestInterceptor')
    $rootScope = $injector.get('$rootScope')
    request = {config: {}}
    response = {status: 200, config: {}}
    responseError = {status: 500, config: {}}
  }))

  it('sets requestLoading property', function () {
    expect( $rootScope ).to.not.have.property('requestLoading')
    LoadingRequestInterceptor.request(request)
    expect( $rootScope ).to.have.property('requestLoading').and.to.be.true
  })

  it('unsets requestLoading property when got response', function () {
    LoadingRequestInterceptor.response(response)
    expect( $rootScope ).to.have.property('requestLoading').that.is.false
  })

  it('unsets requestLoading property when got failed response', function () {
    LoadingRequestInterceptor.responseError(responseError)
    expect( $rootScope ).to.have.property('requestLoading').that.is.false
  })
})
