<template>
    <div class="m-10 space-y-10 p-10 animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <!-- Glowing Header -->
        <h1 class="text-5xl font-bold text-pink-500 text-shadow-xl animate-glow hover:text-purple-600 transition-all duration-300">
            Hello {{ email }}!
        </h1>
        
        <!-- Animated Subheader -->
        <h1 class="text-4xl text-green-400 uppercase tracking-widest animate-flicker hover:text-orange-400 transition duration-300"> 
            {{ MyData }} 
        </h1>

        <!-- Slot Container with animated border -->
        <div class="relative border-8 border-purple-500 neon-border p-10 my-5 transform hover:rotate-2 hover:scale-105 transition-transform duration-500 shadow-2xl p-6 bg-pink-600 text-white rounded-lg hover:bg-purple-500 floating">
            <slot></slot>
        </div>

        <!-- Rotating Button with loading animation -->
        <button class="p-6 bg-purple-700 text-white rounded-full hover:bg-pink-500 hover:rotate-180 transform transition-all duration-500 ease-in-out hover:shadow-lg"
                :class="stateModal ? 'loading loading-bars loading-lg bg-red-500 text-yellow-300 border-yellow-500 animate-bounce' : ''"
                @click="clickIt()">
            <span v-if="!stateModal" class="animate-wiggle">Click it!</span>
        </button>

        <!-- Conditional Modal Content -->
        <div v-if="stateModal" class="border-4 border-sky-500 bg-blue-200 rounded-xl p-8 mt-5 animate-fade-in text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 wave-text">
            <Modal></Modal>
        </div>
        <div v-else class="border-4 border-lime-500 bg-lime-100 rounded-xl p-8 mt-5 animate-fade-out text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 wave-text">
            <p>No modal available!</p>
        </div>


        <!-- Table with fancy hover effects -->
        <div class="border-4 border-slate-600 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg p-5 mt-5">
            <table class="w-full table-auto border-collapse text-center">
                <thead>
                    <tr class="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                        <th class="border-2 border-black p-3">Index</th>
                        <th class="border-2 border-black p-3">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(array, index) in arrays" :key="index" class="odd:bg-blue-50 even:bg-yellow-50 hover:bg-pink-200 transition duration-300 ease-in-out transform hover:scale-105">
                        <td class="border-2 border-black p-3">{{ index + 1 }}</td>
                        <td class="border-2 border-black p-3">{{ array }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="flex flex-col text-center space-y-3 mt-5 animate-flash">
                <p class="text-xl text-red-500 font-mono">{{ Days }}</p>
                <p class="text-xl text-green-500 font-mono">{{ Text }}</p>
                <p class="text-xl text-blue-500 font-mono">{{ Color }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Modal from './Dahboard/Modal.vue';

export default {
    props: ["Days", "Text", "Color", "email"],
    components: { Modal },
    setup() {
        const MyData = "Hello World!";
        let stateModal = ref(false);
        const arrays = ['satu', 'dua', 'tiga'];
        return { MyData, stateModal, arrays };
    },
    methods: {
        clickIt() {
            this.stateModal = !this.stateModal;
        }
    }
};
</script>

<style scoped>
@keyframes glow {
    0% {
        text-shadow: 0 0 20px #ff007f, 0 0 30px #ff007f;
    }
    100% {
        text-shadow: 0 0 40px #ff007f, 0 0 50px #ff007f;
    }
}

.text-shadow-xl {
    text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
}

.animate-glow {
    animation: glow 2s infinite alternate;
}

@keyframes flicker {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.3;
    }
}

.animate-flicker {
    animation: flicker 1.5s infinite;
}

@keyframes wiggle {
    0%, 100% {
        transform: rotate(-3deg);
    }
    50% {
        transform: rotate(3deg);
    }
}

.animate-wiggle {
    animation: wiggle 0.2s ease-in-out infinite;
}

@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out;
}

@keyframes fade-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(20px);
    }
}

.animate-fade-out {
    animation: fade-out 0.5s ease-out;
}

@keyframes flash {
    0% {
        opacity: 0.1;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.1;
    }
}

.animate-flash {
    animation: flash 2s infinite;
}

@keyframes neon-border {
    0% {
        box-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
    }
    50% {
        box-shadow: 0 0 40px rgba(0, 255, 255, 1);
    }
    100% {
        box-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
    }
}

.neon-border {
    animation: neon-border 3s infinite alternate;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 5s ease infinite;
}

@keyframes wave {
    0%, 100% {
        transform: translateX(0) translateY(0);
    }
    20% {
        transform: translateY(-10px) rotate(-2deg);
    }
    40% {
        transform: translateY(10px) rotate(2deg);
    }
}

.wave-text {
    display: inline-block;
    animation: wave 1s infinite ease-in-out;
}

@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-10px) rotate(10deg);
    }
    100% {
        transform: translateY(0) rotate(0deg);
    }
}

.floating {
    animation: float 3s ease-in-out infinite;
}

</style>
