const Header = ({coursename}) => <h2>{coursename}</h2>

const Total = ({ parts }) => 
  <p>
    <b>total of {parts.reduce((sum,iter)=>sum+iter.exercises,0)} exercises</b>
  </p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(i => <Part key={i.id} part={i}/>)}
  </>

const Course = ({course}) => (
  <div>
    <Header coursename={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course