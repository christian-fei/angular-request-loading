var interceptor = require('./LoadingRequestInterceptor')

module.exports = ['LoadingRequestInterceptorConfiguration', function(LoadingRequestInterceptorConfiguration){
  this.$get = interceptor

  this.setPrefix = setPrefix
  this.blacklist = blacklist

  function setPrefix(prefix){
    LoadingRequestInterceptorConfiguration.prefix = prefix
  }

  function blacklist(rule){
    LoadingRequestInterceptorConfiguration.blacklist = LoadingRequestInterceptorConfiguration.blacklist || []
    rule = (typeof rule === 'string') ? new RegExp(rule) : rule
    if( rule && rule.test ){
      LoadingRequestInterceptorConfiguration.blacklist.push(rule)
    }
  }
}]
