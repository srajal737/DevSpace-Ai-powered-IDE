
const fileIcons = new Map([
  ["js", { label: "JS", color: "text-yellow-400 bg-yellow-400/10" }],
  ["jsx", { label: "JSX", color: "text-cyan-400 bg-cyan-400/10" }],
  ["ts", { label: "TS", color: "text-blue-400 bg-blue-400/10" }],
  ["tsx", { label: "TSX", color: "text-blue-400 bg-blue-400/10" }],
  ["mjs", { label: "JS", color: "text-yellow-400 bg-yellow-400/10" }],
  ["html", { label: "HTML", color: "text-orange-500 bg-orange-500/10" }],
  ["css", { label: "CSS", color: "text-blue-500 bg-blue-500/10" }],
  ["scss", { label: "SCSS", color: "text-pink-400 bg-pink-400/10" }],
  ["json", { label: "{}", color: "text-yellow-300 bg-yellow-300/10" }],
  ["jsonc", { label: "{}", color: "text-yellow-300 bg-yellow-300/10" }],
  ["md", { label: "MD", color: "text-gray-400 bg-gray-400/10" }],
  ["mdx", { label: "MDX", color: "text-gray-300 bg-gray-300/10" }],
  ["txt", { label: "TXT", color: "text-gray-400 bg-gray-400/10" }],
  ["py", { label: "PY", color: "text-yellow-400 bg-yellow-400/10" }],
  ["java", { label: "JAVA", color: "text-red-400 bg-red-400/10" }],
  ["c", { label: "C", color: "text-blue-400 bg-blue-400/10" }],
  ["cpp", { label: "C++", color: "text-blue-500 bg-blue-500/10" }],
  ["h", { label: "H", color: "text-purple-400 bg-purple-400/10" }],
  ["cs", { label: "C#", color: "text-purple-400 bg-purple-400/10" }],
  ["go", { label: "GO", color: "text-cyan-400 bg-cyan-400/10" }],
  ["rs", { label: "RS", color: "text-orange-500 bg-orange-500/10" }],
  ["php", { label: "PHP", color: "text-indigo-400 bg-indigo-400/10" }],
  ["rb", { label: "RB", color: "text-red-500 bg-red-500/10" }],
  ["swift", { label: "SWIFT", color: "text-orange-400 bg-orange-400/10" }],
  ["kt", { label: "KT", color: "text-purple-400 bg-purple-400/10" }],
  ["dart", { label: "DART", color: "text-cyan-400 bg-cyan-400/10" }],
  ["vue", { label: "VUE", color: "text-emerald-400 bg-emerald-400/10" }],
  ["svelte", { label: "SVELTE", color: "text-orange-500 bg-orange-500/10" }],
  ["astro", { label: "ASTRO", color: "text-purple-400 bg-purple-400/10" }],
  ["yaml", { label: "YAML", color: "text-red-400 bg-red-400/10" }],
  ["yml", { label: "YML", color: "text-red-400 bg-red-400/10" }],
  ["toml", { label: "TOML", color: "text-gray-400 bg-gray-400/10" }],
  ["xml", { label: "XML", color: "text-orange-400 bg-orange-400/10" }],
  ["env", { label: "ENV", color: "text-green-400 bg-green-400/10" }],
  ["sh", { label: "SH", color: "text-green-400 bg-green-400/10" }],
  ["sql", { label: "SQL", color: "text-blue-300 bg-blue-300/10" }],
  ["graphql", { label: "GQL", color: "text-pink-400 bg-pink-400/10" }],
  ["prisma", { label: "PRISMA", color: "text-indigo-400 bg-indigo-400/10" }],
  ["dockerfile", { label: "DOCKER", color: "text-blue-400 bg-blue-400/10" }],
  ["gitignore", { label: "GIT", color: "text-gray-400 bg-gray-400/10" }],
  ["lock", { label: "LOCK", color: "text-gray-500 bg-gray-500/10" }],
  ["png", { label: "IMG", color: "text-purple-400 bg-purple-400/10" }],
  ["jpg", { label: "IMG", color: "text-purple-400 bg-purple-400/10" }],
  ["jpeg", { label: "IMG", color: "text-purple-400 bg-purple-400/10" }],
  ["gif", { label: "GIF", color: "text-purple-400 bg-purple-400/10" }],
  ["webp", { label: "IMG", color: "text-purple-400 bg-purple-400/10" }],
  ["ico", { label: "ICO", color: "text-yellow-300 bg-yellow-300/10" }],
  ["svg", { label: "SVG", color: "text-orange-400 bg-orange-400/10" }],
  ["mp3", { label: "MP3", color: "text-pink-400 bg-pink-400/10" }],
  ["mp4", { label: "MP4", color: "text-pink-400 bg-pink-400/10" }],
  ["pdf", { label: "PDF", color: "text-red-500 bg-red-500/10" }],
  ["zip", { label: "ZIP", color: "text-yellow-600 bg-yellow-600/10" }],
]);

export default function FileIcon({ name, className = "" }) {
  const filename = name.toLowerCase();
  const extension = filename.split(".").pop();

  const icon = fileIcons.get(extension) ??
    { label: extension === filename ? "FILE" : extension.toUpperCase(),
      color: "text-sky-400 bg-sky-400/10" };

  return (
    <span
      className={`inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold leading-4 ${icon.color} ${className}`}
    >
      {icon.label}
    </span>
  );
}