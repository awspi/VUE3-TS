export const demoMixin={
  data(){
    return {
      msg:'Hello Mixin'
    }
  },
  methods:{
    foo(){
      console.log('foo~');
    }
  },
  created(){
    console.log('demoMixin created');
  }
}