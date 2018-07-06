import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/mode/java';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import { Autocomplete } from 'brace/ext/language_tools';

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

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }


  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="5">
            <Card>
              <CardHeader>
                <p>Task {this.props.match.params.id}</p>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
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

export default Task;