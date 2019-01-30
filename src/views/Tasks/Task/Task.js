import React, { Component } from 'react';
import {
  Card, 
  CardBody,  
  CardHeader, 
  Col, 
  Row
 } from 'reactstrap';
import { fetchTask, resetIDE } from '../../../actions';
import { connect } from 'react-redux';
import IDE from './IDE';
import marked from 'marked';
import { Base64 } from 'js-base64';

class Task extends Component{

  state = {
    statements: []
  }

  componentDidMount(){
    this.props.fetchTask(this.props.match.params.id);
    this.props.resetIDE();
  }

  componentWillReceiveProps(update) {
    this.setState({ statements: update.task.statements });
  }

  render(){
    const task = this.props.task;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="5">
            <Card>
              <CardHeader>
                <p><b>{task.title}</b></p>
              </CardHeader>
              <CardBody>
              {
                this.state.statements.map((statement, index) => {
                return(
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{__html:  marked(Base64.decode(statement.text, {sanitize: true}))}} />
                  </div>
                  );
                })
              }
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="7">
              <IDE/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    task: state.task,
    ide: state.ide
  }
}

export default connect(mapStateToProps, { fetchTask, resetIDE })(Task);