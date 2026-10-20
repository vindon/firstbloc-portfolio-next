// The 3-triangle prism from components/BrandBlockIcon.tsx, with the accent
// colors as literals. The image routes (opengraph-image, apple-icon) render
// through Satori, which cannot resolve CSS variables, so these hex values
// must stay in sync with --accent-light, --accent-deep and --accent in
// app/globals.css by hand.
export default function BrandPrism({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46">
      <polygon points="23,2 43,13 23,24 3,13" fill="#FFD9BF" />
      <polygon points="3,13 23,24 23,44 3,33" fill="#C93700" />
      <polygon points="43,13 23,24 23,44 43,33" fill="#FF4800" />
    </svg>
  );
}
