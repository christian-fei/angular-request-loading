angular-request-loading
=======================

```
npm install --save angular-request-loading
```

Sets a `loading` property on the `$rootScope` to show a loader
while resource are being fetched.

# Example integration

```
angular.module('app', ['angular-request-loading'])
.config(function($httpProvider){
  $httpProvider.interceptors.push('LoadingRequestInterceptor')
})
```

and in your views you can use it like this:

```
<loader loading="requestLoading"/>
```

# UMD

This is an [UMD](https://github.com/umdjs/umd) package.

# License

Do whatever you please with this.
