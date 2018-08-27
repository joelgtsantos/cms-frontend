import React, { Component } from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader, 
  Col, 
  Row} from 'reactstrap';
import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/mode/java';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import { submitEntry, retrieveResult, retrieveScore } from '../../../actions';
import { connect } from 'react-redux';
import { Autocomplete } from 'brace/ext/language_tools';

const languages = [
  'java',
  'python',
  'ruby'
];

const defaultValue =
`public void onLoad(String editor) {
  System.out.println("Hello world");
}`;

class IDE extends Component{

  state = {
    code: {
      mode: 'java',
      value: defaultValue,
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
    }
  }

  setMode = (e) => {
    const code = Object.assign({}, this.state.code);
    code.mode = e.target.value;

    this.setState({ code: code});
  }

  onChange = (newValue) => {
    console.log('change',newValue);
  }

  onLoad = () => {
    console.log('i\'ve loaded');
  }

  onSubmitEntry = () => {
    this.props.submitEntry(this.props.task, this.state.code.value, this.state.code.mode);
  }

  componentWillReceiveProps(update) {
    console.log('update ',update);
    switch (update.ide.status){
      case 1:
        return setTimeout(
          function() {
            this.props.retrieveResult(update.ide.entry.links.result.id)
          }
          .bind(this), 1000);
      case 2:
        return setTimeout(
          function() {
            this.props.retrieveScore(update.ide.entry.links.score.id)
          }
          .bind(this), 1000);
      default:
          return true;
    }
  }

  render(){
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>              
            <Row>
              <Col xs="6" md="6">
                <select name="mode" onChange={this.setMode} value={this.state.code.mode}>
                  {languages.map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
                </select>
              </Col>
              <Col xs="3" md="3">
                <Button block color="primary"><i size={'sm'} className="icon-arrow-right-circle icons "></i> Run</Button>
              </Col>
              <Col xs="3" md="3">
                <Button block color="success" onClick={this.onSubmitEntry}><i size={'sm'} className="icon-arrow-up-circle icons "></i> Submit</Button>
              </Col>
            </Row>        
          </CardHeader>
          <CardBody>
            <AceEditor
              mode={this.state.code.mode}
              onLoad={this.onLoad}
              theme="github"
              value={this.state.code.value}
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
              {
                
                this.props.ide.status >= 1 ? <p> COMPILE ... </p> : '' 
              }
              {
                this.props.ide.status >= 2 ? <p> RUN ... </p> : ' '
              }
              {
                this.props.ide.status >= 3 ? <p> SCORE {this.props.ide.score.value} </p> : ' '
              }
          </CardFooter>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    ide: state.ide,
    task: state.task,
  }
}

export default connect(mapStateToProps, { submitEntry, retrieveResult, retrieveScore })(IDE);