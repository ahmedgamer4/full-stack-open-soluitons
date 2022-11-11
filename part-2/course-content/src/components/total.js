export const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return  s + p.exercises
}, 0)
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}