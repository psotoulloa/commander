/**
 * Este objeto se encarga de comandar la aplicación esclava
 * Consta de dos instrucciones principales, la primera hace relación con disparar una función
 * en la aplicación esclava y la segunda cambiar la url de la aplicación esclava
 *
 * Adicionalmente se entrega el método getParameterByName que permite obtener parámetros de la URL
 * para interactuar de manera más facil con el sistema
 *
 * @autor Patricio Soto <pjsoto@uc.cl>
 */
var Commander = {
  /**
   * Representación del cliente socketio
   */
  socket : null,
  /**
   * Método que inicia la conexión
   */
  start : function(){
    this.socket = io('http://192.168.0.16:3000');
  },
  /**
   * Método que ejecuta una función en el esclavo
   */
  triggerFunction : function(name,data){
    this.socket.emit('function_call_commander', {callbackName : name , data : data});
  },
  /**
   * Método que cambiar la url en que está el esclavo
   */
  changeUrl : function(url){
    this.socket.emit('change_url_commander', {url : url});
  },

  /**
   * Método auxiliar para obtener parámetros de la URL
   */
  getParameterByName: function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
}
