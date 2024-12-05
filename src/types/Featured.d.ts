/* eslint-disable no-unused-vars */
type FeaturedFile = {
  Value: string;
  FileType: string;
  Name: string;
};

type FeaturedItem = {
  Name: string;
  Description: string;
  id: string;
  Files: FeaturedFile[];
};
