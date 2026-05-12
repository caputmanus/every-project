//  Вставьте свой API ключ с https://www.themoviedb.org/settings/api 
const API_KEY = 'f11653c00a3494a4bc418f3db33e0c9b'
const BASE    = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

//  Соответствие TMDB genre_id -> наши жанры 
const GENRE_MAP = {
  28:    'Боевик',
  18:    'Драма',
  35:    'Комедия',
  53:    'Триллер',
  27:    'Ужасы',
  878:   'Фантастика',
  16:    'Мультфильм',
  99:    'Документальный',
  80:    'Криминал',
  10749: 'Романтика',
  10751: 'Драма',
  14:    'Фантастика',
  12:    'Боевик',
}

//  Поиск фильмов по строке 
export async function searchMovies(query) {
  if (!query || query.trim().length < 2) return []

  try {
    const url = `${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    const res  = await fetch(url)

    if (!res.ok) throw new Error(`TMDB error: ${res.status}`)

    const data = await res.json()

    // Берём первые 6 результатов, маппим в удобный формат
    return (data.results ?? []).slice(0, 6).map(movie => ({
      tmdbId:     movie.id,
      title:      movie.title,
      // Берём overview, обрезаем до 400 символов
      description: (movie.overview ?? '').slice(0, 400) || 'Описание отсутствует.',
      category:   mapGenre(movie.genre_ids),
      posterPath: movie.poster_path ?? null,
      rating:     movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : null,
      year:       movie.release_date ? movie.release_date.slice(0, 4) : null,
    }))
  } catch (e) {
    console.error('[tmdb] searchMovies failed:', e)
    return []
  }
}

//  Маппинг первого подходящего жанра из массива ID 
function mapGenre(genreIds = []) {
  for (const id of genreIds) {
    if (GENRE_MAP[id]) return GENRE_MAP[id]
  }
  return 'Драма' // fallback
}
