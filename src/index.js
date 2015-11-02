window.AngularRequestLoading = angular.module('angular-request-loading', [])
.constant('LoadingRequestInterceptorConfiguration', {prefix:'loadingRequest'})
.provider('LoadingRequestInterceptor', require('./LoadingRequestInterceptorProvider'))
.factory('LoadingRequestInterceptor', require('./LoadingRequestInterceptor'))
