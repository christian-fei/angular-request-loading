var some = require('lodash.some')
function compose() {
  var args = arguments
  var start = args.length - 1
  return function() {
    var i = start
    var result = args[start].apply(this, arguments)
    while (i--) result = args[i].call(this, result)
    return result
  }
}

module.exports = ['$q','$rootScope','LoadingRequestInterceptorConfiguration',function LoadingRequestInterceptor($q, $rootScope, LoadingRequestInterceptorConfiguration){
  var pendingRequests = 0
  var outcomes = {
    SUCCESS: 0,
    FAILURE: 1,
  }

  function isBlacklisted(url) {
    return some(LoadingRequestInterceptorConfiguration.blacklist, function(rule) {
      return rule.test(url)
    })
  }

  return {
    request: function(config){
      if( isBlacklisted(config.url) ){
        return config
      }
      pendingRequests++
      $rootScope[LoadingRequestInterceptorConfiguration.prefix] = true
      return config
    },
    response: compose(decrementPendingRequestsCount, handleResponseWith(outcomes.SUCCESS)),
    responseError: compose(decrementPendingRequestsCount, handleResponseWith(outcomes.FAILURE))
  }

  function decrementPendingRequestsCount(response){
    if( pendingRequests > 0 ){
      pendingRequests--
    }
    if( pendingRequests === 0 ){
      $rootScope[LoadingRequestInterceptorConfiguration.prefix] = false
    }
    return response
  }

  function handleResponseWith(outcome){
    return function(response){
      if( outcomes.SUCCESS === outcome ){
        return $q.when(response)
      }
      return $q.reject(response)
    }
  }
}]
