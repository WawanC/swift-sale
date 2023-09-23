import { FC, useCallback, useMemo, useState } from "react";
import RightIcon from "./icons/RightIcon.tsx";
import LeftIcon from "./icons/LeftIcon.tsx";

type Picture = {
  url: string;
  public_id: string;
};

type Props = {
  pictures: Picture[];
};

const ProductPictureDisplay: FC<Props> = (props) => {
  const [activePictureIdx, setActivePictureIdx] = useState(0);

  const activePicture = useMemo(() => {
    return props.pictures[activePictureIdx];
  }, [activePictureIdx, props.pictures]);

  const changeToNextPicture = useCallback(() => {
    setActivePictureIdx((idx) => {
      if (idx === props.pictures.length - 1) return 0;
      return idx + 1;
    });
  }, [props.pictures]);

  const changeToPreviousPicture = useCallback(() => {
    setActivePictureIdx((idx) => {
      if (idx === 0) return props.pictures.length - 1;
      return idx - 1;
    });
  }, [props.pictures]);

  return (
    <div className={`w-full flex flex-col gap-8 items-center`}>
      {/* Picture Component */}
      <div
        className={`w-full md:w-3/4 aspect-square bg-neutral-200 md:border 
            md:rounded shadow overflow-hidden`}
      >
        {props.pictures.length <= 0 ? (
          <div className={`w-full h-full object-cover bg-neutral-400`} />
        ) : (
          <img
            src={activePicture.url}
            alt={activePicture.public_id}
            className={`w-full h-full object-cover`}
          />
        )}
      </div>

      {/* Actions Component */}
      {props.pictures.length > 1 && (
        <div className={`flex text-3xl gap-8 items-center`}>
          <button type={"button"} onClick={changeToPreviousPicture}>
            <LeftIcon className={"w-8 h-8"} />
          </button>
          <div className={`flex gap-2 items-center`}>
            {props.pictures.map((picture) => (
              <div
                className={`w-4 aspect-square rounded-full ${
                  activePicture.url === picture.url
                    ? "bg-accent"
                    : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <button type={"button"} onClick={changeToNextPicture}>
            <RightIcon className={"w-8 h-8"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPictureDisplay;
