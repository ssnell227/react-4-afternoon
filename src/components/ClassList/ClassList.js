import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class ClassList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3005/students?class=${this.props.match.params.class}`)
      .then(res => this.setState({ students: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.students)
    const studentsMap = this.state.students.map((student, index) => <Link
      to={`/student/${student.id}`} 
      key={`student-${index}`}
      ><h3 >{`${student.first_name} ${student.last_name}`}</h3></Link>)
    return (
      <div className="box">
        <h1>{this.props.match.params.class}</h1>
        <h2>ClassList:</h2>
        {studentsMap}
        <button onClick={() => this.props.history.goBack()} className='btn'>Back</button>

      </div>
    )
  }
}