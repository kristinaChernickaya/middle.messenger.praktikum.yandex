export function renderDOM(query: string, block) {
  const root = document.querySelector(query);
  (root as Element).appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
