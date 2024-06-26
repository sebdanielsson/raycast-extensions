import { useCallback, useEffect, useState } from "react";
import { Picsum } from "picsum-photos/dist";
import { PicsumImage, SpecifyIdImageConfig } from "../types/types";
import { axiosGetPicsumImages } from "../utils/axios-utils";

export const usePlaceholderImages = (page: number, perPage: number) => {
  const [picsumImages, setPicsumImages] = useState<PicsumImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const _picsumImages = await axiosGetPicsumImages(page, perPage);
    setPicsumImages(_picsumImages);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { picsumImages: picsumImages, isLoading: isLoading };
};

export const useSpecifyIdPlaceholderImageURL = (picsumConfig: SpecifyIdImageConfig) => {
  const [imageURL, setImageURL] = useState<string>("");

  const fetchData = useCallback(async () => {
    let _blur = parseFloat(picsumConfig.blur);
    if (isNaN(_blur) || _blur < 0) {
      _blur = 0;
    }
    if (_blur > 10) {
      _blur = 10;
    }
    let _imageURL = Picsum.url({
      id: parseInt(picsumConfig.id),
      width: parseInt(picsumConfig.width),
      height: parseInt(picsumConfig.height),
      blur: _blur,
      cache: picsumConfig.cache,
      grayscale: picsumConfig.grayscale,
      jpg: picsumConfig.jpg,
    });
    if (parseInt(picsumConfig.id) === 0) {
      _imageURL = _imageURL.replace("https://picsum.photos/", `https://picsum.photos/id/${0}/`);
    }
    setImageURL(_imageURL);
  }, [picsumConfig]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { imageURL: imageURL };
};
