import { useUpcomingFilms } from "../../hooks/useUpcomingFilms";
import { ComingSoonCard } from "../ComingSoonCard";
import { FilmRow } from "../FilmRow";

export function ComingSoonSection() {
  const { data: films = [], isPending } = useUpcomingFilms();
  console.log(films);
  return (
    <FilmRow title="Coming soon" seeAllHref="/">
      {films.map((film) => (
        <ComingSoonCard key={film.id} film={film} />
      ))}
    </FilmRow>
  );
}
