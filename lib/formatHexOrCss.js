import { displayable, formatCss, formatHex } from 'culori';

export const formatHexOrCss = color =>
  displayable(color) ? formatHex(color) : formatCss(color);
