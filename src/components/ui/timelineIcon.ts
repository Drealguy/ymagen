/**
 * Shared props for the 24px line icons drawn inside timeline markers.
 * Kept out of Timeline.tsx: that file is a client module, and a server
 * component importing a plain value from it gets a client reference, not
 * the object.
 */
export const timelineIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-6 w-6",
} as const;
