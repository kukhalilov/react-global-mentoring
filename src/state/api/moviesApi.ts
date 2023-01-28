import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Movie from '../../types/Movie';
import MoviesResponse from '../../types/MoviesResponse';

type Query = {
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  searchBy?: string;
  filter?: string[];
  offset?: number;
  limit?: number;
};

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, Query>({
      query({ sortBy, sortOrder, search, searchBy, filter, offset, limit }) {
        return {
          url: 'movies',
          params: {
            sortBy,
            sortOrder,
            search,
            searchBy,
            filter,
            offset,
            limit,
          },
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result?.data.map(({ id }) => ({
                type: 'Movies' as const,
                id,
              })),
              { type: 'Movies', id: 'LIST' },
            ]
          : [{ type: 'Movies', id: 'LIST' }],
    }),

    getMovie: builder.query<Movie, string>({
      query(id) {
        return `movies/${id}`;
      },
      transformResponse: (response: { data: { movie: Movie } }) =>
        response.data.movie,
      providesTags: (_result, _error, id) => [{ type: 'Movies', id }],
    }),

    addMovie: builder.mutation<Movie, Partial<Movie>>({
      query(body) {
        return {
          url: `movies`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }],
      transformResponse: (response: { movie: Movie }) => response.movie,
    }),

    updateMovie: builder.mutation<Movie, Partial<Movie>>({
      query(data) {
        const body = data;
        return {
          url: `movies`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: 'Movies', id },
              { type: 'Movies', id: 'LIST' },
            ]
          : [{ type: 'Movies', id: 'LIST' }],
      transformResponse: (response: { movie: Movie }) => response.movie,
    }),

    deleteMovie: builder.mutation<null, number>({
      query(id) {
        return {
          url: `movies/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApi;
