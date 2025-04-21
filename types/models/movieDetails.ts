import type { Genre, Movie, ProductionCompany } from '../models/movie'

export interface MovieDetailsType extends Movie {
  genres: Genre[]
  runtime: number
  status: string
  tagline: string
  director: string
  cast: string[]
  budget: number
  revenue: number
  production_companies: ProductionCompany[]
}
