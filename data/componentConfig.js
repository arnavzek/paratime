import { nanoid } from "nanoid";
import { BsCardHeading } from "react-icons/bs";
import { BiImages } from "react-icons/bi";
import { HiOutlineViewBoards } from "react-icons/hi";
import { CgFormatHeading } from "react-icons/cg";
import getDefaultColors from "../controllers/frontend/getDefaultColors";
import { GoFileMedia } from "react-icons/go";
import { RiLinksLine } from "react-icons/ri";
import { HiOutlineCursorClick } from "react-icons/hi";
import { AiOutlineLayout } from "react-icons/ai";
import { VscSymbolColor } from "react-icons/vsc";

let componentConfig = {
  0: {
    name: "Header",
    icon: null,
    fields: {
      design: {
        icon: <AiOutlineLayout />,
        name: "Design",
        type: "ENUM",
        default: "ZERO",
        enum: [
          { value: 0, name: "Portfolio" },
          { value: 1, name: "Atristic" },
          { value: 2, name: "Blog" },
        ],
      },
      name: {
        type: "STRING",
        default: "$profile.name",
        metadata: "profileField",
      },
      username: {
        type: "STRING",
        default: "$profile.username",
        editAction: "OPEN_USERNAME_EDITOR",
        metadata: "username",
      },
      profilePicture: {
        name: "Profile Picture",
        default: "$profile.image",
        type: "IMAGE",
        editAction: "OPEN_PROFILE_IMAGE_EDITOR",
      },
      socialLinks: {
        name: "Social Links",
        editAction: "OPEN_SOCIAL_LINKS_EDITOR",
        icon: <RiLinksLine />,
      },
      media: {
        icon: <GoFileMedia />,

        type: "MEDIA",
      },
      tagline: {
        default: "$profile.tagline",
        type: "STRING",
        metadata: "profileField",
      },
      bio: {
        default: "$profile.bio",
        type: "STRING",
        metadata: "profileField",
      },
      primaryButton: {
        name: "Primary Button",
        default: null,
        type: "BUTTON",
        icon: <HiOutlineCursorClick />,
      },
      secondaryButton: {
        name: "Secondary Button",
        default: null,
        type: "BUTTON",
        icon: <HiOutlineCursorClick />,
      },
      pages: {
        editAction: "OPEN_PAGES_EDITOR",
      },
    },
  },
  1: {
    name: "Content List",
    icon: BiImages,
    fields: {
      folderID: {
        name: "Folder",
        default: null,
        editAction: "OPEN_FOLDER_SELECTOR",
      },
    },
  },
  2: {
    name: "Card",
    icon: BsCardHeading,
    fields: {
      desktopDesign: {
        icon: <AiOutlineLayout />,
        name: "Desktop Design",
        type: "ENUM",
        default: "desktop0",
        enum: [
          { value: "desktop0", name: "Encapsulated" },
          { value: "desktop1", name: "Magazine" },
          { value: "desktop2", name: "Minimal" },
        ],
      },
      mobileDesign: {
        icon: <AiOutlineLayout />,
        name: "Mobile Design",
        type: "ENUM",
        default: "mobile0",
        enum: [
          { value: "mobile0", name: "Encapsulated" },
          { value: "mobile1", name: "Minimal" },
        ],
      },
      title: { default: "", type: "STRING" },
      description: { default: "", type: "STRING" },
      media: { default: null, type: "MEDIA", icon: <GoFileMedia /> },
      mediaFit: {
        type: "ENUM",
        name: "Media Fit",
        default: "Cover",
        enum: [
          { value: "Cover", name: "Cover" },
          { value: "Contain", name: "Contain" },
        ],
      },
      primaryButton: {
        name: "Primary Button",
        default: null,
        type: "BUTTON",
        icon: <HiOutlineCursorClick />,
      },
      secondaryButton: {
        name: "Secondary Button",
        default: null,
        type: "BUTTON",
        icon: <HiOutlineCursorClick />,
      },
      colors: {
        name: "colors",
        default: getDefaultColors(false),
        icon: <VscSymbolColor />,
        type: "COLORS",
      },
    },
  },
  3: {
    name: "List",
    icon: HiOutlineViewBoards,
    fields: {
      design: {
        icon: <AiOutlineLayout />,
        name: "Design",
        type: "ENUM",
        default: 0,
        enum: [{ value: 0, name: "simple" }],
      },
      title: { default: null, type: "STRING" }, // It will encapsulate all items
      description: { default: null, type: "STRING" }, // It will encapsulate all items
      items: {
        default: [{ id: 0 }, { id: 1 }, { id: 3 }],
        type: "ARRAY",
        editAction: "NONE",
        syntax: {
          title: { default: "Lorem Ipsum", type: "STRING" },
          description: { default: "Lorem Ipsum", type: "STRING" },
          image: { default: null, type: "IMAGE" },
          button: { default: null, type: "BUTTON" },
        },
      },
    },
  },
  4: {
    name: "Heading",
    icon: CgFormatHeading,
    fields: {
      size: {
        default: 0,
        enum: [
          { value: 0, name: "Big" },
          { value: 1, name: "Medium" },
          { value: 2, name: "Small" },
        ],
      },
      title: { default: "Lorem Ipsum Lorem", type: "STRING" },
      description: { default: "Lorem Ip isum Lorem isum", type: "STRING" },
    },
  },
};
export default componentConfig;

/*
Future Components
* 6 -> Table -> For about page
* 7 -> Form
* 8 -> work experience
* 9 -> Text
* 10 -> Heading
* 11 -> Image
*/
