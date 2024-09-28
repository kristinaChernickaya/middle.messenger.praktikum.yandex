import Block from './Block';

export function renderDOM(query: string, block: Block): Element | null {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent() as Node);
    block.dispatchComponentDidMount();
  }
  return root;
}
