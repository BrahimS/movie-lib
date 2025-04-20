<template>
  <v-card class="p-4">
    <v-form @submit.prevent="submitComment">
      <v-text-field
        v-model="username"
        :error-messages="v$.username.$errors.map((e) => e.$message)"
        label="Username"
        @input="v$.username.$touch"
        @blur="v$.username.$touch"
      />

      <div class="mb-4">
        <RichTextEditor
          v-model="message"
          :error="v$.message.$error"
          :error-message="v$.message.$errors[0]?.$message"
        />
      </div>

      <v-rating
        v-model="rating"
        color="warning"
        hover
        length="10"
        size="large"
      />
      <div v-if="v$.rating.$error" class="text-red-500 text-sm">
        {{ v$.rating.$errors[0].$message }}
      </div>

      <v-btn
        type="submit"
        color="primary"
        block
        :disabled="v$.$invalid"
        class="mt-4"
      >
        Submit Comment
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, between } from '@vuelidate/validators'
import { useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { useCommentsStore } from '~/store/comments'
import RichTextEditor from '@/components/reviews/RichTextEditor.vue'

const props = defineProps<{
  movieId: number
}>()

const commentsStore = useCommentsStore()
const username = ref('')
const message = ref('')
const rating = ref(0)

const editor = useEditor({
  extensions: [StarterKit],
  content: message.value,
  onUpdate({ editor }) {
    message.value = editor.getHTML()
  },
})

watch(message, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val)
  }
})

// Custom validator to check for actual text content in message
function hasTextContent(value: string) {
  // Strip HTML tags and check length
  const text = value.replace(/<[^>]*>/g, '').trim()
  return text.length >= 3 || 'Message must be at least 3 characters.'
}

const rules = {
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(50),
  },
  message: {
    required,
    hasTextContent,
    maxLength: maxLength(500),
  },
  rating: {
    required,
    between: between(1, 10),
  },
}

const v$ = useVuelidate(rules, { username, message, rating })

const submitComment = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  commentsStore.addComment(
    props.movieId,
    username.value,
    message.value,
    rating.value,
  )

  // Reset form
  username.value = ''
  message.value = ''
  rating.value = 0
  v$.value.$reset()
}
</script>

<style lang="scss">
.ProseMirror {
  min-height: 100px;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

.ProseMirror:focus {
  outline: none;
  box-shadow: 0 0 0 2px #2563eb;
  border-color: #2563eb;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #6b7280;
  pointer-events: none;
  height: 0;
}
</style>
