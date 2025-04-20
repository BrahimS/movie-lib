import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useStorage, useTimestamp } from '@vueuse/core'
import type { MovieComment } from '@/types/models/comment'

interface CommentState {
  comments: Record<number, MovieComment[]>
}

export const useCommentsStore = defineStore('comments', {
  state: (): CommentState => ({
    comments: useStorage('movie-comments', {} as Record<number, MovieComment[]>).value
  }),

  getters: {
    getMovieComments: (state) => {
      return (movieId: number) => state.comments[movieId] || []
    },

    getAverageRating: (state) => {
      return (movieId: number) => {
        const movieComments = state.comments[movieId] || []
        if (!movieComments.length) return 0

        const sum = movieComments.reduce((acc, comment) => acc + comment.rating, 0)
        return Number((sum / movieComments.length).toFixed(1))
      }
    }
  },

  actions: {
    addComment(
      movieId: number,
      username: string,
      message: string,
      rating: number,
    ) {
      const timestamp = useTimestamp()
      
      const newComment: MovieComment = {
        id: uuidv4(),
        movieId,
        username,
        message,
        rating,
        createdAt: new Date(timestamp.value).toISOString(),
      }

      if (!this.comments[movieId]) {
        this.comments[movieId] = []
      }

      this.comments[movieId].unshift(newComment)
    },

    deleteComment(movieId: number, commentId: string) {
      if (!this.comments[movieId]) return
      
      this.comments[movieId] = this.comments[movieId].filter(
        comment => comment.id !== commentId
      )
    }
  }
})
