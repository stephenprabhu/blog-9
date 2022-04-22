import classNames from 'classnames';
import React from 'react'

const Badge = (props) => {
    let classes = classNames("inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 rounded-full",{
        "bg-green-600" : props.color === 'success',
        "bg-indigo-600" : props.color === 'info',
        "bg-red-600" : props.color === 'danger',
    });
  return (
    <span className={classes}>
        {props.children}
    </span>
  )
}

export default Badge
