import { useState } from 'react';
import style from './tab.module.scss'
import clsx from 'clsx';

interface TabProps {
  options: ReadonlyArray<{
    label: string;
    value: string;
  }>
}

const Tab = ({ options }: TabProps) => {
  const [active, setActive] = useState(options[0].value)

  const handleClickTab = (value: string) => {
    setActive(value)
  }

  return (
    <div className="flex items-center gap-3 w-full">
      {options.map((opt) => (
        <div
          key={opt.value}
          className={clsx(style.tab, active === opt.value && style.tabActive)}
          onClick={() => handleClickTab(opt.value)}
        >
          <span>{opt.label}</span>
        </div>
      ))}
    </div>
  )
}

export default Tab