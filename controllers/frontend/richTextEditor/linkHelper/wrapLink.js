import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  Node,
  Range,
  Point,
} from "slate";
import { useSlate } from "slate-react";
import isLinkActive from "./isLinkActive";
import unwrapLink from "./unWrapLink";

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export default wrapLink;
