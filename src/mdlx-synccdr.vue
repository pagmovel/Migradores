<template>
  <a href="#" @click="sincronizar">
    <div class="contenedor" v-bind:class="{ 'expandcontenedor': contenedor, 'aborta': aborta, 'sincronizando':sincronizando}" id="dois">
      <i class="fa fa-cloud vsyncOut" aria-hidden="true" v-show="!aborta" v-bind:class="{ 'vloop': !vsync, 'vsyncOut': vsync }"></i>
      <i class="fa fa-exclamation-triangle vsyncOut" aria-hidden="true" v-show="aborta" v-bind:class="{ 'vloop': !vsync, 'vsyncOut': vsync }"></i>
      <p class="texto">{{txtsincronizar}}<br>{{txtdados}}<br><span class="registros">{{retorno}}</span></p>
    </div>
  </a>        
</template>

<script>


export default {
  data () {
    return {
      id: 0,
      titulo: 'Sincronizar Dados do Cdr',
    // controle de tela
      liberaBotao: true,
      podeconsultar:true,
      vsync: true,
      contenedor: false,
      vcontinua: true,
    // model
      retorno: '',
      tabelas: '',
      txtsincronizar: 'Sincronizar',
      txtdados:'CDR',
      aborta:false,
      sincronizando:false,
      src: 'http://localhost/medhospcomunicacao/cdr/importacron',
      cor: '#643b8a',
      sTime:'',
      countDown:'',
    }
  },
  ready: function(){
    this.db = this.$resource(this.src);
    this.$set('id', this._uid);
    //this.efeitoSync();
  },

  methods: {
    sincronizar: function (e) {
      if(this.aborta){
        this.resetTexto();
        this.aborta = false;
        this.vcontinua = true;
        this.podeconsultar = true;
        this.sincronizando = false;
        return false;
      }
      if(this.podeconsultar && this.vcontinua){
        this.podeconsultar = false;
        this.txtsincronizar = 'Sincronizando';
        this.txtdados = 'CDR';
        this.efeitoSync();

        this.db.get().then((response) => {
          this.grade = true;
          this.txtsincronizar = 'Sincronizar';
          this.efeitoSync();
          if(response.status == 204){
            this.resetTexto();
            this.contenedor = false;;
            this.aborta = false;
            this.sincronizando = false;
            this.vcontinua = true;
            this.podeconsultar = true;
            this.retorno = '(CONCLUIDO)';
          } else {
            this.retorno = '(' + response.ultimo + ' registros sincronizados)';
            this.abortar();
          }
        }, (response) => {
          this.liberaBotao = true;
          this.txtsincronizar = 'Sincronizar';
          this.podeconsultar = true;
          alert("Houve um erro ao conectar com o servidor do sms.\n\nPor favor tente mais tarde.");
          this.efeitoSync();
        }).bind(this);
      }
    },

    abortar: function(){
      //this = this;
      this.sincronizando = false;
      this.aborta = true;
      this.sTime = new Date().getTime();
      this.countDown = 2;
      this.txtsincronizar = 'Abortar Sincronismo?';
      this.txtdados = '';
      
      
      
      var counter = setInterval(this.UpdateTime, 500);
    },
    UpdateTime: function () {
        if(this.aborta == false){
          return false;
        }
        var cTime = new Date().getTime();
        var diff = cTime - this.sTime;
        var seconds = this.countDown - Math.floor(diff / 1000);
        if (seconds >= 0) {
          var minutes = Math.floor(seconds / 60);
          var minutos = ""; var segundos = "0";
          seconds -= minutes * 60;
          (minutes < 10 ? minutos="0" + minutes : minutos = minutes);
          (seconds < 10 ? segundos="0" + seconds : segundos=seconds);
        } else {
            return
        }   
        this.txtdados = minutos + ':' + segundos;
        //console.log(this);
        if(minutes==0 && seconds ==0){
          if(!this.resetTexto()){
            this.sincronizar();
            return false;
          }
        }
      },

    resetTexto: function(){
      this.txtsincronizar = 'Sincronizar';
      this.txtdados = 'CDR';
      this.retorno ='';
      this.aborta = false;
      this.podeconsultar = true;
    },
    efeitoSync: function(){
      this.contenedor = !this.contenedor;
      this.vsync = !this.vsync;
      this.sincronizando = !this.abort;
    },
  },

}
</script>

<style scoped>

.centraliza-vertical{
  vertical-align: middle !important;
   height:75px;
}

.btn{
  height: 200px;
  margin-top: 20px;
}
#bt-icon{
  position: absolute;
  top:26%;
  left:47%;
  font-size: 27px;
}
@media (max-width: 767px){
  
}
@media (min-width: 768px){
  
}

.row{
  margin-top: 10%!important;
}
.registros{
  font-size: 11px;
}


*{
/*  margin:0px;
padding:0px; */
  font-family: Helvetica Roboto; 
}

/*titulo*/

div#titulo{
  width:100%;
  margin-top:100px;
}

p#header{
  text-align: center;
  font-size: 2.5em;
  color:#9a9a9a;
}

p#subheader{
  text-align: center;
  color:#cecece;
  margin-top:20px;
  font-size: 1.3em;
}

header{
  margin:100px auto;
  width:1200px;
  height:230px;
  background-color: red;
}

div.contenedor{
  width: 200px;
  height: 230px;
  float:left;
  -webkit-transition: height .4s;
  -transition: height .4s;
  -moz-transition: height .4s;
  transition: height .4s;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
}
div.contenedor:hover img{
  -webkit-border-radius: 50%;
    -webkit-box-shadow: 0px 0px 0px 30px rgba(255,255,255,0);
    -webkit-transition: box-shadow .4s;
}

div#uno{
  background-color: #643b8a;
}

div#dois{
  background-color: rgb(233,147,26);
}

div#tres{
  background-color: rgb(22,145,190);
}

div#cuatro{
  background-color: rgb(22,107,162);
}

div#cinco{
  background-color: rgb(27,54,71);
}

div#seis{
  background-color: rgb(21,40,54);
}

img.icon{
  display: block;
    margin: 43px auto;
    background-color: rgba(255,255,255,.15);
    width: 87px;
    padding: 20px;
    -webkit-border-radius: 50%;
    -webkit-box-shadow: 0px 0px 0px 30px rgba(255,255,255,0);
    -webkit-transition: box-shadow .4s;
}

.titulo{
  padding-bottom: 30px;
}

p.texto{
  font-size: 1.2em;
  color:white;
  line-height: 1;
  margin-top: -23px !important;
  text-align: center;
  padding-top:10px;
  opacity: .6;
  -webkit-transition: padding-top .4s;
}

div.contenedor:hover{
  height:250px;
}
.aborta{
  background-color: #9E2521 !important;
}
.sincronizando{
  background-color: #26a69a !important; 
}
div.contenedor:hover p.texto{
  padding-top: 40px;
  opacity: 1;

}
div.contenedor:hover img.icon{
  -webkit-box-shadow:0px 0px 0px 0px rgba(255,255,255,.6);
}
.vsyncOut{
  display: block;
  margin-top: 42px;
  background-color: rgba(255,255,255,.15);
  width: 90px;
  padding: 27px;
  margin-left: calc(100% - 72%);
  left: -43.5;
  position: relative;
  -webkit-border-radius: 50%;
  -webkit-box-shadow: 0px 0px 0px 30px rgba(255,255,255,0);
  -webkit-transition: box-shadow .4s;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 43px;
  font-size: 36px;
}
.vloop{
  display: block;
  /* margin: 43px auto; */
  margin-top: 42px;
  background-color: rgba(255,255,255,.15);
  width: 90px;
  position: relative;
  margin-left: calc(100% - 72%);
  left: -43.5;
  padding: 27px;
  -webkit-border-radius: 50%;
  -webkit-box-shadow: 0px 0px 0px 30px rgba(255,255,255,0) !important;
  -webkit-transition: box-shadow .4s;
  -webkit-animation: vloop 1s infinite; /* Safari 4+ */
  -moz-animation:    vloop 1s infinite; /* Fx 5+ */
  -o-animation:      vloop 1s infinite; /* Opera 12+ */
  animation:         vloop 1s infinite; /* IE 10+, Fx 29+ */
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 43px;
  font-size: 36px;
}
@keyframes vloop{
  0%   { 
    -webkit-box-shadow: 0px 0px 0px 1px white;
    transform: rotate(-25deg);
    left: -41.5;
  }
  100% {
    -webkit-box-shadow: 0px 0px 0px 30px rgba(255,255,255,0);
    -webkit-transition: box-shadow .4s; 
    transform: rotate(25deg);
    left: -45.5;
  }
}
.expandcontenedor {
  height:250px !important;
}
.expandcontenedor .texto{
  padding-top: 40px;
  opacity: 1 ;
}
</style>