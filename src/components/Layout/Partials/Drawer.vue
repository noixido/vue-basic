<template>
    <div>
        <div class="drawer">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <!-- Page content here -->
                <NavigationBar/>
            </div>
            <div class="drawer-side">
                <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <!-- Sidebar content here -->
                    <li><router-link to="/home">Home</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import NavigationBar from './NavigationBar.vue';

export default {
    components: {
        NavigationBar,
    },
    setup () {
        
        
        return {};
    }
}
</script>

<style lang="scss" scoped>
    
</style>