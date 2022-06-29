<template>
  <div id="app">
    <router-link to="/home" v-slot="props" custom>
      <button @click="props.navigate">home</button>
      <!-- <p>{{props.href}}</p>
      <p>{{props.route}}</p>
      <p>{{props.navigate}}</p>
      <p>{{props.isActive}}</p>
      <p>{{props.isExactActive}}</p> -->
    </router-link>

    <router-link to="/about">About</router-link>
    <router-link to="/user/pithy">User</router-link>
    <button @click="JumpToAbout">关于</button>

    <router-link to="/catetgory">分类</router-link>
    <router-link to="/login">LOGIN</router-link>

    <router-view v-slot="props">
      <transition name="pithy" mode="out-in">
        <keep-alive>
          <component :is='props.Component'></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import NavBar from "./component/NavBar.vue";
export default {
  components: {
    NavBar
  },
  // methods:{
  //   JumpToAbout(){
  //    this.$router.push('/about') 
  //   }
  // },
  setup() {
    const router = useRouter()
    const JumpToAbout = () => {
      router.push({
        path: '/about',
        query: {
          name: 'pithy',
          age: 22
        }
      })
    }
    return {
      JumpToAbout
    }
  }
}
</script>

<style scoped>
.router-link-active {
  color: red;
}

.pithy-enter-from,
.pithy-leave-to {
  opacity: 0;
}

.pithy-enter-active,
.pithy-leave-active {
  transition: opacity .2s ease;
}
</style>