import { useState } from 'react';
import './SearchableList.css';

type Props = {
  list: string[];
};
export function SearchableList({ list }: Props) {
  const [value, setValue] = useState('');
  const items = list.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <div className="wrapper">
      <SearchBar value={value} onCustomChange={setValue} />
      <Items items={items} />
    </div>
  );
}

type SearchBarProps = {
  value: string;
  onCustomChange: (value: string) => void;
};
function SearchBar({ value, onCustomChange }: SearchBarProps) {
  return (
    <input
      type="text"
      className="search"
      value={value}
      onChange={(e) => onCustomChange(e.target.value)}
    />
  );
}

type ItemsProps = {
  items: string[];
};
function Items({ items }: ItemsProps) {
  if (items.length === 0) {
    return <ul>No items match the filter.</ul>;
  }
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
