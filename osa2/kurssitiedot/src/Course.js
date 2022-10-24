const Total = ({ course }) => {
    let total = 0
    const array = course.parts.map(part => part.exercises)
    return array.reduce((val1, val2) => val1 + val2, total)
  }
  
  const Course = ({ courses }) => {
    return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
      <div>
      <h2 key={course.id}>{course.name}</h2>
       {course.parts.map(part =>
            <p key={part.id}> {part.name} {part.exercises}</p>
          )}
          <h3> total of <Total course={course}/> of exercises </h3>
      </div>
     )}
    </div>
    )
  }

  export default Course