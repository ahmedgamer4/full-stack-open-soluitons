const ErrMessageC = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="err">
      { message }
    </div>
  )
}

const MessageC = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className="message">
      a new blog { props.message } by { props.author }
    </div>
  )
}


export {
  MessageC, 
  ErrMessageC,
}