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

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

export default unwrapLink;
