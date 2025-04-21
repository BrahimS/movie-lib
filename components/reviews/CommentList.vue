<script setup lang="ts">
import { computed } from 'vue'
import { useCommentsStore } from '~/store/comments'

const props = defineProps<{
  movieId: number
}>()

const commentsStore = useCommentsStore()
const comments = computed(() => commentsStore.getMovieComments(props.movieId))

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
<template>
  <div class="tw-mt-8">
    <h3 class="tw-text-xl tw-mb-4">Comments</h3>
    <div v-if="comments.length === 0" class="tw-text-center ">
      No comments yet. Be the first to comment!
    </div>
    <v-list v-else class="tw-bg-gray-950">
      <v-list-item
        v-for="comment in comments"
        :key="comment.id"
        class="tw-mb-4"
      >
        <v-card width="100%" class="tw-bg-gray-950">
          <v-card-item>
            <v-card-title>
              <div class="tw-flex tw-justify-between tw-items-center">
                <span class="tw-font-bold">{{ comment.username }}</span>
                <v-rating
                  :model-value="comment.rating"
                  color="warning"
                  density="compact"
                  readonly
                  size="small"
                />
              </div>
            </v-card-title>
            <v-card-text>
              <div v-html="comment.message" class="tw-mt-2"></div>
              <div class="tw-text-sm tw-text-gray-500 tw-mt-2">
                {{ formatDate(comment.createdAt) }}
              </div>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>
