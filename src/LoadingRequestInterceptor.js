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

module.exports = ['$q','$rootScope',function LoadingRequestInterceptor($q, $rootScope){
  var pendingRequests = 0
  var outcomes = {
    SUCCESS: 0,
    FAILURE: 1,
  }

  return {
    request: function(config){
      pendingRequests++
      $rootScope.requestLoading = true
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
      $rootScope.requestLoading = false
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
