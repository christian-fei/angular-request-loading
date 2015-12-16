angular-request-loading
=======================

[![Build Status](https://travis-ci.org/christian-fei/angular-request-loading.svg)](https://travis-ci.org/christian-fei/angular-request-loading)

```
npm install --save angular-request-loading
```

Sets a `loading` property on the `$rootScope` to show a loader
while resource are being fetched.

# Example integration

```
angular.module('app', ['angular-request-loading'])
.config(function(LoadingRequestInterceptorProvider, $httpProvider){
  LoadingRequestInterceptorProvider.setPrefix('customPrefix')
  LoadingRequestInterceptorProvider.blacklist(/blacklisted$/)

  $httpProvider.interceptors.push('LoadingRequestInterceptor')
})
```

and in your views you can use it like this:

```
<loader loading="loadingRequest"/>
```

# Configuration

You can configure the module by injecting `LoadingRequestInterceptorProvider`
in the config phase:

```
angular.module('app', ['angular-request-loading'])
.config(function($httpProvider, LoadingRequestInterceptorProvider){
  LoadingRequestInterceptorProvider.setPrefix('loadingRequest')
  $httpProvider.interceptors.push('LoadingRequestInterceptor')
})
```

# UMD

This is an [UMD](https://github.com/umdjs/umd) package.

# License

Do whatever you please with this.
