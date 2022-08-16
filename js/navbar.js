new Vue({
    el: '#navbar',
    data () {
      return {
        view: {
          topOfPage: true
        }
      }
    },
    beforeMount() {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll(){
        if(window.pageYOffset>0){
          if(this.view.topOfPage) this.view.topOfPage = false
        } else {
          if(!this.view.topOfPage) this.view.topOfPage = true
        }
      }
    },
  })