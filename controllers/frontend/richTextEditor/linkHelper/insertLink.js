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
import wrapLink from "./wrapLink";

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export default insertLink;
