import React from 'react'

const Notification = ({ message, show }) => {
  return (
    <div className={show ? 'notification visible' : 'notification hidden'}>
      {message}
    </div>
  )
}

export default Notification