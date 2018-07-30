import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions';

class Contests extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  componentDidMount(){
    this.props.fetchTasks();
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        {
          this.props.tasks.map((task, index) => {
            //const taskLink = `#/tasks/${task.id}`;
            const taskLink = `/tasks/${task.id}`;

            return(
            <Row key={index}>
              <Col xs="12" md={{ size: 8, offset: 2 }}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-check float-right"></i><Link to={taskLink}>{task.name}</Link>
                  </CardHeader>
                  <CardBody>
                    <h4>{task.title}</h4>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            )
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, { fetchTasks })(Contests);
