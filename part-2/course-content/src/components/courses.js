import { Header } from "./header"
import { Content } from "./content"
import { Total } from "./total"

export const Courses = ({ courses }) => 
  <div>
      {courses.map(course =>
        <div key={course.id}>
          <Header title={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )}
  </div>