import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import { getMovies_detail, IMovieDetail } from "../../api";
import { DetailOverview, List, Lists, Loader, Main } from "../Style/MainStyle";

function MovieDetail() {
  const BigMovieMatch = useRouteMatch<{ movieId: string }>(`/movies/:movieId`);
  const { data: infoData, isLoading: detailIsLoading } = useQuery<IMovieDetail>(
    "MovieDetail",
    () => getMovies_detail(BigMovieMatch?.params.movieId + "")
  );
  return (
    <div>
      {detailIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Main>
          <Lists>
            <List>
              <h2>Status : </h2>
              {infoData?.status}
            </List>
            <List>
              <h2>러닝타임 : </h2>
              {infoData?.runtime} min
            </List>
            <List>
              <h2>장르 : </h2>
              {infoData?.genres.map((gerne) => (
                <p>{gerne.name}</p>
              ))}
            </List>
            <List>
              <h2>평점 : </h2>
              {`✨` + infoData?.vote_average + `✨`}
            </List>
            <DetailOverview>
              {infoData?.overview ? infoData?.overview : `There Is No Overview`}
            </DetailOverview>
          </Lists>
        </Main>
      )}
    </div>
  );
}

export default MovieDetail;
