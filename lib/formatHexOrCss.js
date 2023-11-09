import { displayable, formatCss, formatHex } from "culori";

export function formatHexOrCss(color) {
  return displayable(color) ? formatHex(color) : formatCss(color);
}
