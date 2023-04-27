import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const text = ref<string|null>('0000')
  const textStyles = reactive({
    fontSize: 24,
    color: '#841515'
  })
  const colors = ref<Array<string>|null>([])
  const chars = computed(() => text.value?.split(''))

  return { text, chars, textStyles, colors }
})
