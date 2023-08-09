import { Skeleton } from "@mui/material";
import { dataLoader } from "@/utils/constant";

const SkeltonLoad = () => {
  return (
    <>
      {dataLoader.map((_, idx) => {
        return (
          <div className="skelton_loader" key={idx}>
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton width="10%" />
            <Skeleton width="10%" />
            <Skeleton width="40%" />
            <Skeleton width="30%" />
          </div>
        );
      })}
    </>
  );
};

export default SkeltonLoad;
