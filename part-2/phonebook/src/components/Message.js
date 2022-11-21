export const Message = ({ message }) => {
  if (message === null) {
    return null
  }
  return(
    <div className="message">
      {message}
    </div>
  )
}

export const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}