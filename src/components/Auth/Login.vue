<template>
    <div class="pt-60">
        <form action="#" class="border border-lime-600 bg-lime-500 rounded-lg mx-auto p-10 flex flex-col w-96 gap-5 text-center" @form.prevent="login">
            <p class="text-lime-800 text-3xl">Login</p>
            <input v-model="email" type="email" placeholder="Username" class="h-10 rounded-md px-2 bg-white ">
            <input type="password" placeholder="Password" class="h-10 rounded-md px-2 bg-white">
            <button 
                class="rounded-md bg-lime-900 h-10 px-2" 
                @click.prevent="login">
                <div :class="stateLoading ? 'loading loading-spinner loading-sm text-primary' : ''">
                    Login
                </div>
            </button>
        </form>
    </div>
</template>

<script>

import { ref } from 'vue';
import {RouterLink, RouterView} from "vue-router";
import {useRouter, useRoute} from "vue-router";

export default {
    components: {
        RouterLink,
        RouterView
    },
    setup () {
        let stateLoading = ref(false);
        const router = useRouter();
        const route = useRoute();

        let email = ref("");
        let password = ref("");

        const errors = ref({
            email: [],
            password: [],
        });

        const login = () => {
          stateLoading.value = !stateLoading.value;
          router.push({
            name: "home",
            // query: {
            //     email: email.value
            // }
          });
        };

        return {stateLoading, route, router, email,password, login};
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>

</style>