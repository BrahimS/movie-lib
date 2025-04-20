<script setup lang="ts">
import CommentForm from '@/components/reviews/CommentForm.vue'
import CommentList from '@/components/reviews/CommentList.vue'

defineOptions({
  name: 'MovieReviews',
})
defineProps<{
  averageRating: number
  movieId: number
}>()
</script>

<template>
  <section class="tw-mt-8">
    <h2 class="tw-text-2xl tw-mb-4">Reviews</h2>
    <div class="tw-flex tw-items-center tw-mb-6">
      <span class="tw-text-xl tw-mr-2">Average Rating:</span>
      <v-rating
        :model-value="averageRating"
        color="warning"
        half-increments
        readonly
      />
      <span class="tw-ml-2">({{ averageRating }})</span>
    </div>
    <CommentForm :movie-id="movieId" />
    <CommentList :movie-id="movieId" />
  </section>
</template>
