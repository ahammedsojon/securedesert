// types/editorjs.d.ts

declare module "@editorjs/embed" {
  import { ToolConstructable } from "@editorjs/editorjs";

  const Embed: ToolConstructable;
  export default Embed;
}

declare module "@editorjs/link" {
  import { ToolConstructable } from "@editorjs/editorjs";

  const LinkTool: ToolConstructable;
  export default LinkTool;
}

declare module "@editorjs/header" {
  import { ToolConstructable } from "@editorjs/editorjs";

  const Header: ToolConstructable;
  export default Header;
}

declare module "@editorjs/table" {
  import { ToolConstructable } from "@editorjs/editorjs";

  const Table: ToolConstructable;
  export default Table;
}

declare module "@editorjs/list" {
  import { ToolConstructable } from "@editorjs/editorjs";

  const List: ToolConstructable;
  export default List;
}

declare module "@editorjs/code" {
  import { ToolConstructable } from "@editorjs/editorjs";

  const Code: ToolConstructable;
  export default Code;
}

declare module "@editorjs/inline-code" {
  import { ToolConstructable } from "@editorjs/editorjs";

  const InlineCode: ToolConstructable;
  export default InlineCode;
}
