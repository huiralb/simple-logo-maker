<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMainStore } from './stores/main'
import Modal from './components/Modal.vue';
import html2canvas from "html2canvas"

const store = useMainStore()
const styles = computed(() => ({
  'font-size': `${store.textStyles.fontSize}px`,
  'color': store.textStyles.color
}))
const area = ref<HTMLElement|null>(null)
const showModal = ref(false)
const canvas = ref<HTMLCanvasElement|null>(null)

function changeColor(event: Event) {
  store.textStyles.color = (event.target as HTMLInputElement).value
}

function render() {
  if(area.value) {
    html2canvas(area.value).then(_canvas => {
      const container = document.getElementById('canvas-container')
      
      if(container) {
        showModal.value = true
        container.innerHTML = ''
        container?.appendChild(_canvas)
      }
    })
  }
}

</script>

<template>
  <header class="px-4 min-h-[60px] border-b flex items-center shadow-sm font-semibold text-lg gap-1">
    <div class="text-teal-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-c-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503Z"/>
      </svg>
    </div>
    <h1>Simple Logo Maker</h1>
  </header>
  <main class="wrapper p-4">
    <div class="workspace bg-gray-400 py-4">
      <div ref="area" class="mx-auto flex min-h-[200px] w-[442px] border justify-center items-center bg-white" :style="styles">
        <div v-drag v-for="c in store.chars">
          <span>{{ c }}</span>
        </div>
      </div>
      <p class="text-center">*The letters are draggable</p>
    </div>
    <hr class="my-4" />
    <div class="mx-auto mt-9 px-9 max-w-lg">
      <div class="flex mb-4">
        <input type="text" v-model="store.text" class="border rounded-sm min-h-[40px] w-full px-2">
      </div>
      <div class="flex mb-4 items-center gap-3">
        <label for="customRange1">Size:</label>
        <input
          type="range" 
          v-model="store.textStyles.fontSize" 
          min="8"
          max="72"
          :disabled="!store.chars || store.chars.length <= 0"
          class="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
          id="customRange1" />
        <span>{{ store.textStyles.fontSize }}px</span>
      </div>
      <div class="flex mb-4 gap-3">
        <label for="colorPicker">Color:</label>
        <input :value="styles.color" @input="changeColor($event)" type="color" id="colorPicker">
      </div>
      <div class="flex mb-4 justify-center">
        <button @click="render()" class="border rounded-sm bg-neutral-300 border-neutral-400 hover:bg-neutral-400 px-4 h-10 min-w-[100px]">Save</button>
      </div>
    </div>
  </main>

  <modal :value="showModal" :canvas="canvas" @close="showModal = false"></modal>

</template>
