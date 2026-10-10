import { useNowPlayingFilms } from "../../hooks/useNowPlayingFilms";
import { FilmCard } from "../FilmCard";
import { FilmRow } from "../FilmRow";

export function NowPlayingSection() {
  const { data: films = [], isError } = useNowPlayingFilms();
  return (
    <FilmRow title="Now Playing" seeAllHref="/sessions">
      {films.map((film) => (
        <FilmCard film={film} key={film.id} />
      ))}
    </FilmRow>
  );
}
