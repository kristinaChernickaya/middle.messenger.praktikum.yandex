import Button from '../components/Button';

export function renderDOM(query: string, block: Button) {
  const root = document.querySelector(query);
  (root as Element).appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
