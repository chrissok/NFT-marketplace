import { IconEnum } from "@/constants/iconEnum";
import Search from "../small/SearchSmall";
import ArrowRight from "../small/ArrowRightSmall";
import ArrowRightBig from "../big/ArrowRightBig";
import SearchSmall from "../small/SearchSmall";
import Download from "../standard/Download";
import Like from "../standard/Like";
import Eye from "../standard/Eye";
import Hair from "../standard/Hair";
import Skin from "../standard/Skin";
import Calendar from "../standard/Calendar";
import Polygon from "../standard/Polygon/Polygon";
import Crown from "../standard/Crown";
import Mirror from "../standard/Mirror";
import Discord from "../standard/Discord";
import Cross from "../standard/Cross";
import Cube from "../standard/Cube";
import CubeWithCircle from "../standard/CubeWithCircle";
import Note from "../standard/Note";
import Shop from "../standard/Shop";
import Instagram from "../standard/Instagram";
import Youtube from "../standard/Youtube";
import XTwitter from "../standard/XTwitter";
import Linkedin from "../standard/Linkedin";
import Ethereum from "../standard/Ethereum";

// eslint-disable-next-line no-unused-vars
const ICON_COMPONENT_MAP: { [key in IconEnum]?: React.ElementType } = {
  [IconEnum.Search]: Search,
  [IconEnum.ArrowRight]: ArrowRight,
  [IconEnum.ArrowRightBig]: ArrowRightBig,
  [IconEnum.SearchSmall]: SearchSmall,
  [IconEnum.Like]: Like,
  [IconEnum.Download]: Download,
  [IconEnum.Eye]: Eye,
  [IconEnum.Hair]: Hair,
  [IconEnum.Skin]: Skin,
  [IconEnum.Calendar]: Calendar,
  [IconEnum.polygon]: Polygon,
  [IconEnum.ethereum]: Ethereum,
  [IconEnum.sepolia]: Ethereum,
  [IconEnum.Crown]: Crown,
  [IconEnum.Mirror]: Mirror,
  [IconEnum.discord]: Discord,
  [IconEnum.Cross]: Cross,
  [IconEnum.Cube]: Cube,
  [IconEnum.CubeWithCircle]: CubeWithCircle,
  [IconEnum.Note]: Note,
  [IconEnum.Shop]: Shop,
  [IconEnum.instagram]: Instagram,
  [IconEnum.youtube]: Youtube,
  [IconEnum.twitter]: XTwitter,
  [IconEnum.linkedin]: Linkedin,
};

function IconOrchestrator({ type }: { type: IconEnum }) {
  const IconComponent = ICON_COMPONENT_MAP[type];

  return <>{IconComponent && <IconComponent />}</>;
}

export default IconOrchestrator;
