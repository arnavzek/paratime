import { RiFacebookCircleLine } from "react-icons/ri";
import { RiSnapchatFill } from "react-icons/ri";
import {
  AiOutlineYoutube,
  AiOutlineReddit,
  AiFillInstagram,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";
import { BsReddit } from "react-icons/bs";
import { AiOutlineMedium, AiOutlineInstagram } from "react-icons/ai";
import { FaArtstation, FaTiktok, FaQuora } from "react-icons/fa";
import { GrLinkedinOption, GrSoundcloud, GrPinterest } from "react-icons/gr";
import {
  RiSoundcloudLine,
  RiSnapchatLine,
  RiLinkedinLine,
  RiFacebookCircleFill,
  RiFacebookLine,
  RiTwitterLine,
} from "react-icons/ri";
import { TiSocialFacebook, TiSocialPinterest } from "react-icons/ti";
import { TbBrandTiktok } from "react-icons/tb";
import { ImLinkedin2 } from "react-icons/im";
import { FiGithub } from "react-icons/fi";
import { ImReddit, ImPinterest2 } from "react-icons/im";

const socialLinksConfig = {
  facebook: {
    prefix: "https:www.facebook.com",
    icon: <RiFacebookCircleFill />,
    lineIcon: <RiFacebookLine />,
  },
  medium: {
    prefix: "https:www.youtube.com",
    icon: <AiOutlineMedium />,
    lineIcon: <AiOutlineMedium />,
  },
  youtube: {
    prefix: "https:www.youtube.com",
    icon: <AiFillYoutube />,
    lineIcon: <AiOutlineYoutube />,
  },
  twitter: {
    prefix: "https:www.twitter.com",
    icon: <AiOutlineTwitter />,
    lineIcon: <RiTwitterLine />,
  },
  instagram: {
    prefix: "https:www.instagram.com",
    icon: <AiFillInstagram />,
    lineIcon: <AiOutlineInstagram />,
  },
  artstation: {
    prefix: "https:www.artstation.com",
    icon: <FaArtstation />,
    lineIcon: <FaArtstation />,
  },
  soundCloud: {
    prefix: "https:www.soundcloud.com",
    icon: <GrSoundcloud />,
    lineIcon: <RiSoundcloudLine />,
  },
  tiktok: {
    prefix: "https:www.tiktok.com",
    icon: <FaTiktok />,
    lineIcon: <TbBrandTiktok />,
  },
  pinterest: {
    prefix: "https:www.pinterest.com",
    icon: <GrPinterest />,
    lineIcon: <ImPinterest2 />,
  },
  snapchat: {
    prefix: "https:www.snapchat.com",
    icon: <RiSnapchatFill />,
    lineIcon: <RiSnapchatLine />,
  },
  linkedIn: {
    prefix: "https:www.linkedin.com",
    icon: <GrLinkedinOption />,
    lineIcon: <RiLinkedinLine />,
  },
  github: {
    prefix: "https:www.github.com",
    icon: <AiOutlineGithub />,
    lineIcon: <FiGithub />,
  },
  reddit: {
    prefix: "https:www.reddit.com",
    icon: <BsReddit />,
    lineIcon: <ImReddit />,
  },
  quora: {
    prefix: "https:www.quora.com",
    icon: <FaQuora />,
    lineIcon: <FaQuora />,
  },
};

export default socialLinksConfig;
