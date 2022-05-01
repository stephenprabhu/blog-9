import React from 'react'

const SimpleTextLabelSection = ({label, children}) => {
  return (
    <div>
        {label}:
        <h4 className="font-bold mb-3">
            {children}
        </h4>
    </div>
  )
}

export default SimpleTextLabelSection
