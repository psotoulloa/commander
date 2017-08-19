/**
 * Este objeto se encarga de escuchar las instrucciones indicadas por el commander
 * @autor Patricio Soto <pjsoto@uc.cl>
 */
var Slave = {
  /**
   * Hashmap con las funciones que podrán ser ejecutadas
   */
  functions : {},
  /**
   * Método que inicia la conexión con el servidor socketio y que inicializa los listeners
   * para cambiar la url y llamar una función
   */
  start : function(){
    var socket = io('http://localhost:3000');
    socket.on('change_url', function (data) {
      location.href = data.url;
    });
    socket.on('function_call', function (data) {
      this.functions[data.callbackName](data.data);
    }.bind(this));
  },
  /**
   * Método que registra una funcion a ser ejecutada
   */
  addFunciton : function(name,callback){
    this.functions[name] = callback;
  }
}
