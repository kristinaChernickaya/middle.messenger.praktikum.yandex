import Button from '../components/Button';

export function render(query: string, block: Button) {
  const root = document.querySelector(query);
  (root as Element).appendChild(block.getContent());
  return root;
}
