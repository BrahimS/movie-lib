<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
  modelValue: string
  error?: boolean
  errorMessage?: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = ref<Editor | null>(null)

editor.value = new Editor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  },
})

// Keep editor content in sync if parent changes value
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue || '', false)
    }
  },
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
<template>
  <div>
    <label class="block mb-2">Message</label>
    <div class="flex gap-2 mb-2">
      <button
        type="button"
        @click="editor?.chain().focus().toggleBold().run()"
        :class="{ 'font-bold': editor?.isActive('bold') }"
      >
        <v-icon>mdi-format-bold</v-icon>
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().toggleItalic().run()"
        :class="{ italic: editor?.isActive('italic') }"
      >
        <v-icon>mdi-format-italic</v-icon>
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'font-bold': editor?.isActive('heading', { level: 1 }) }"
      >
        <v-icon>mdi-format-header-1</v-icon>
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().toggleBulletList().run()"
        :class="{ 'font-bold': editor?.isActive('bulletList') }"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>
      </button>
    </div>
    <EditorContent :editor="editor" class="prose prose-sm max-w-none" />
    <div v-if="error" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>
