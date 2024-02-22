import { ComponentPropsWithoutRef, ReactNode } from 'react';
import style from './input.module.scss';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  icon?: ReactNode
}

const Input = (props: InputProps) => {
  return (
    <div className="relative">
      {props.icon ? (
        <div className={style['input-icon']}>
          {props.icon}
        </div>
      ) : null}

      <input className={style['input']} {...props} />
    </div>
  )
}

export default Input