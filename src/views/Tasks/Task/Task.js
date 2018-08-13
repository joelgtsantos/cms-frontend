import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/mode/java';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import { fetchTask } from '../../../actions';
import { connect } from 'react-redux';
import { Autocomplete } from 'brace/ext/language_tools';
import marked from 'marked';
import { Base64 } from 'js-base64';

const languages = [
  'java',
  'python',
  'ruby'
];

const defaultValue =
`function onLoad(editor) {
  console.log("i've loaded");
}`;

class Task extends Component{

  state = {
    mode: 'javascript',
    value: defaultValue,
    collapse: false,
    accordion: [true, false, false],
    custom: [true, false],
    status: 'Closed',
    fadeIn: true,
    timeout: 300,
    statements: []
  }

  setMode = (e) => {
    this.setState({
      mode: e.target.value
    })
  }

  onChange = (newValue) => {
    console.log('change',newValue);
  }

  onLoad = () => {
    console.log('i\'ve loaded');
  }

  componentDidMount(){
    this.props.fetchTask(this.props.match.params.id);
  }

  componentWillReceiveProps(update) {
    //console.log('this.props.fields', this.props, update);
    //console.log(update.task);
    this.setState({ statements: update.task.statements });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  render(){
    const task = this.props.task;
    console.log(task);

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
            <Card>
              <CardHeader>              
                <Row>
                  <Col xs="6" md="6">
                    <select name="mode" onChange={this.setMode} value={this.state.mode}>
                      {languages.map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
                    </select>
                  </Col>
                  <Col xs="3" md="3">
                    <Button block color="primary"><i size={'sm'} className="icon-arrow-right-circle icons "></i> Run</Button>
                  </Col>
                  <Col xs="3" md="3">
                    <Button block color="success"><i size={'sm'} className="icon-arrow-up-circle icons "></i> Submit</Button>
                  </Col>
                </Row>        
              </CardHeader>
              <CardBody>
                <AceEditor
                  mode={this.state.mode}
                  onLoad={this.onLoad}
                  theme="github"
                  onChange={this.onChange}
                  value={this.state.value}
                  name="UNIQUE_ID_OF_DIV"
                  fontSize={14}
                  height="200px"
                  width="100%"
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                />
              </CardBody>
              <CardFooter>
                  <p> COMPILE ... </p>
                  <p> RUN </p>
                  <p> OUTPUT </p>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    task: state.task
  }
}

export default connect(mapStateToProps, { fetchTask })(Task);