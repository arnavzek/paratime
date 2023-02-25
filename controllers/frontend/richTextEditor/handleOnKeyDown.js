import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  Node,
  Range,
  Point,
} from "slate";
import toggleMark from "./toggleMark";
import isHotkey from "is-hotkey";
let breakToParagraph = [
  "heading-one",
  "heading-two",
  "heading-three",
  "block-quote",
];

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

function handleOnKeyDown(event, editor) {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey];
      toggleMark(editor, mark);
    }
  }

  const selectedElement = Node.descendant(
    editor,
    editor.selection.anchor.path.slice(0, -1)
  );

  if (
    event.key === "Enter" &&
    !event.shiftKey &&
    breakToParagraph.includes(selectedElement.type)
  ) {
    event.preventDefault();
    const newLine = {
      type: "paragraph",
      children: [
        {
          text: "",
          marks: [],
        },
      ],
    };
    Transforms.insertNodes(editor, newLine);
  }
}

export default handleOnKeyDown;
