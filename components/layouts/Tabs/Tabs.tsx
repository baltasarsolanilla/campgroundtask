import { ReactNode } from 'react';

interface TabsProps {
  tabs: {
    id: string;
    title: string;
    selected: boolean;
    onSelect: Function;
    component: ReactNode;
  }[];
}
export default function Tabs({ tabs }: TabsProps) {
  return (
    <>
      <ul className='nav nav-tabs'>
        {tabs.map((tab) => (
          <li key={tab.id} className='nav-item'>
            <a
              className={`nav-link ${tab.selected ? 'active' : ''}`}
              aria-current='page'
              href='#'
              onClick={() => tab.onSelect()}
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
      {tabs.find((t) => t.selected)?.component}
    </>
  );
}
