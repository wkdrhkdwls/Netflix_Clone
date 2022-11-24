import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import { getTv_detail, IGetTvDetail } from "../../api";
import { DetailOverview, List, Lists, Loader, Main } from "../Style/MainStyle";

function TvDetail() {
  const BigTvMatch = useRouteMatch<{ tvId: string }>(`/tvs/:tvId`);
  const { data: infoData, isLoading: detailIsLoading } = useQuery<IGetTvDetail>(
    "MovieDetail",
    () => getTv_detail(BigTvMatch?.params.tvId + "")
  );
  return (
    <div>
      {detailIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Main>
          <Lists>
            <List>
              <h2>시즌 : </h2>
              {infoData?.number_of_seasons}
            </List>
            <List>
              <h2>에피소드 : </h2>
              {infoData?.number_of_episodes} 화
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

export default TvDetail;
