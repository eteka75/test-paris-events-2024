/**
 * Permet de colorer le fond du titre
 * @param title, query
 * @returns Hightlight text
 */
const EventTitle = ({ title, query }: { title: string; query: string }) => {
  const highlightedTitle = highlightTitle(title, query);
  return <span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />;
};

export function highlightTitle(title: string, query: string) {
  const escapedQuery = query.replace(/[-\/\\^$.*+?()[\]{}|]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const highTitle = title.replace(
    regex,
    `<span class="bg-yellow-300">$1</span>`
  );
  return highTitle;
}

export default EventTitle;
