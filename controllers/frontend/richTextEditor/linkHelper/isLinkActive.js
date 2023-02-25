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

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

export default isLinkActive;
