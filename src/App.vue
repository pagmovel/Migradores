
<script>
import MdlxSyncsms from './mdlx-syncsms.vue'
import MdlxSynccdr from './mdlx-synccdr.vue'
import MdlxSynccallcenter from './mdlx-synccallcenter.vue'

export default {
  components: { MdlxSyncsms, MdlxSynccdr, MdlxSynccallcenter },
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1 col-md-7 col-md-offset-3 cont-mos">
        <mdlx-syncsms></mdlx-syncsms>
        <mdlx-synccdr></mdlx-synccdr>
        <mdlx-synccallcenter></mdlx-synccallcenter>
      </div>
    </div>
  </div>
</template>


<style>
body {
  font-family: Helvetica, sans-serif;
}
.cont-mos {
  top: 50px;
}
a .contenedor{
  margin-right: -7px
}
</style>
