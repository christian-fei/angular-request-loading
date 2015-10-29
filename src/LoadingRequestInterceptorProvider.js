module.exports = ['LoadingRequestInterceptorConfiguration', function(LoadingRequestInterceptorConfiguration){
  this.setPrefix = setPrefix
  this.$get = function(){}

  function setPrefix(prefix){
    LoadingRequestInterceptorConfiguration.prefix = prefix
  }
}]
