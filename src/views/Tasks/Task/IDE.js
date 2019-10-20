import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader, 
  Col,
  Row,
  Input} from 'reactstrap';
import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/mode/java';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import { submitEntry,
        retrieveEntrySubmitTrx,
        retrieveEntryTrx,
        retrieveEntryResult,
        submitDraft,
        retrieveDraftSubmitTrx,
        retrieveDraftTrx,
        retrieveDraftResult 
      } from '../../../actions';
import { PROFILE_STORAGE_KEY } from '../../../config';

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
    },
    draftInput: ""
  };

  setMode = (e) => {
    const code = Object.assign({}, this.state.code);
    code.mode = e.target.value;

    this.setState({ code: code});
  }

  //Save actual code into local storage
  onChange = (newValue) => {
    this.task = JSON.parse(localStorage.getItem(`${this.profile.id}_${this.props.task.name}`));
    this.task.code = newValue;
    localStorage.setItem(`${this.profile.id}_${this.props.task.name}`,JSON.stringify(this.task));
    const code = Object.assign({}, this.state.code);
    
    code.value = newValue;

    this.setState({ code: code});
  }

  //Load from local storage
  onLoad = () => {
    this.profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
    if (this.profile){
      this.task = JSON.parse(localStorage.getItem(`${this.profile.id}_${this.props.task.name}`));
      if(this.task){
        const code = Object.assign({}, this.state.code);
        code.value = this.task.code;
        this.setState({ code: code});
      }else{
        this.task = {score: 0, code: ''}
        localStorage.setItem(`${this.profile.id}_${this.props.task.name}`, JSON.stringify(this.task));
      }
    }
  }

  onSubmitEntry = () => {
    this.props.submitEntry(this.props.task, this.state.code.value, this.state.code.mode);
  }

  onSubmitDraft = () => {
    this.props.submitDraft(this.props.task, this.state.code.value, this.state.code.mode, this.state.draftInput);
  }

  componentWillReceiveProps(update) {
    switch (update.ide.status){
      case 1:
        return setTimeout(
          function() {
            if(update.ide.entry.status !== 'failed'){
              this.props.retrieveEntrySubmitTrx(update.ide.entry.href);
            }else{
              this.props.entryFailure();
            }
          }
          .bind(this), 1000);
      case 2:
        return setTimeout(
          function() {
            this.props.retrieveEntryTrx(update.ide.entry.links.entry.href)
          }
          .bind(this), 1000);
      case 3:
          return setTimeout(
            function() {
              this.props.retrieveEntryResult(update.ide.entry.links.result.href)
            }
            .bind(this), 1000);
      case 4:
        this.task = JSON.parse(localStorage.getItem(`${this.profile.id}_${this.props.task.name}`));
        
        if(update.ide.result.score.taskValue > 0){
          this.task.score = update.ide.result.score.taskValue;
        }

        localStorage.setItem(`${this.profile.id}_${this.props.task.name}`, JSON.stringify(this.task));

        return true;
      case 5:
        return setTimeout(
          function() {
            if(update.ide.entry.status !== 'failed'){
              this.props.retrieveDraftSubmitTrx(update.ide.draft.href);
            }else{
              this.props.entryFailure();
            }
          }
          .bind(this), 1000);
      case 6:
        return setTimeout(
          function() {
            this.props.retrieveDraftTrx(update.ide.draft.links.draft.href)
          }
          .bind(this), 1000);
      case 7:
          return setTimeout(
            function() {
              this.props.retrieveDraftResult(update.ide.draft.links.result.href)
            }
            .bind(this), 1000);
      case 8:        
        if(update.ide.result){
          this.status = update.ide.result;
        }
        return true;
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
              <Col xs="3" md="2">
                <select name="mode" onChange={this.setMode} value={this.state.code.mode}>
                  {languages.map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
                </select>
              </Col>
              <Col xs="6" md="4">
                {/* <Button block color="primary"><i size={'sm'} className="icon-arrow-right-circle icons "></i> Run</Button> */}
                <h5>Punteo actual { this.task ? this.task.score : 0 } </h5>
              </Col>
              <Col xs="3" md=" 2">
                <Button block color="info" onClick={this.onSubmitDraft} title="Utiliza valores de prueba para probar tu código"><i size={'sm'} className="cui-circle-check icons "></i> Ejecutar </Button>
              </Col>
              <Col xs="3" md=" 2">
                <Button block color="success" onClick={this.onSubmitEntry} title="Utiliza esta opción para enviar tu código y generar puntos"><i size={'sm'} className="icon-cloud-upload icons "></i> Enviar </Button>
              </Col>
            </Row>        
          </CardHeader>
          { 
            this.props.task.id
            ?
            <CardBody>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <span className="text-raft">Valores de prueba: </span>
                      <Input 
                        defaultValue={this.state.draftInput}
                        onChange={event => this.setState({draftInput: event.target.value})}
                        name="draftInput"
                        type="textarea"
                        className="textarea-draft" 
                        placeholder="Ingrese valores"/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <AceEditor
                        mode={this.state.code.mode}
                        onLoad={this.onLoad}
                        onChange={this.onChange}
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
                    </td>
                  </tr>
                </tbody>
              </table>
                    
              
            </CardBody>
            :
            ''
          }
          <CardFooter>
           
              {
                
                this.props.ide.status === 0 ? <h6> { this.props.ide.result.detail } </h6> : ''
              }
              {
                
                this.props.ide.status >= 1 && this.props.ide.status <= 4 ? <h6> Submited ... </h6> : '' 
              }
              {
                
                this.props.ide.status >= 2 && this.props.ide.status <= 4 ? <h6> Analyzed ... </h6> : '' 
              }
              {
                this.props.ide.status >= 3 && this.props.ide.status <= 4 ? <h6> Processed ... </h6> : ' '
              }
              {
                this.props.ide.status === 4
                ?
                this.props.ide.result.evaluation.status === 'ok' 
                 ? <Row>
                    <Col xs="12" md="3"> <h6> Compilation </h6> </Col> 
                    <Col xs="12" md="9"> {this.props.ide.result.compilation.stderr} </Col>
                    <Col xs="12" md="3"> </Col> 
                    <Col xs="12" md="9"> {this.props.ide.result.compilation.stdout} </Col>
                    <Col xs="12" md="3"> <h5> Punteo </h5></Col> 
                    <Col xs="12" md="9"> <h5>{this.props.ide.result.score.taskValue}</h5></Col>
                    <Col xs="12" md="5"> </Col> 
                    <Col xs="12" md="2" className="text-center">
                      <i size={'xl'} className="cui-circle-check icons font-2xl d-block mt-4 bg-success"></i>
                    </Col>
                  </Row>
                  : 
                  <Row>
                      <Col xs="12" md="5"> </Col> 
                      <Col xs="12" md="2" className="text-center">
                      <i size={'xl'} className="cui-circle-x icons font-2xl d-block mt-4 bg-danger"></i>
                    </Col>
                  </Row>
                : ' '
              }
              {
                
                this.props.ide.status >= 5 && this.props.ide.status <= 8 ? <h6> Submited ... </h6> : '' 
              }
              {
                
                this.props.ide.status >= 6 && this.props.ide.status <= 8 ? <h6> Analyzed ... </h6> : '' 
              }
              {
                this.props.ide.status >= 7 && this.props.ide.status <= 8 ? <h6> Processed ... </h6> : ' '
              }
              {
                this.props.ide.status === 8 
                ?
                this.props.ide.result.evaluation.status === 'ok' 
                 ? <Row>
                    <Col xs="12" md="3"> <h6> Compilation </h6> </Col> 
                    <Col xs="12" md="9"> {this.props.ide.result.compilation.stderr} </Col>
                    <Col xs="12" md="3"> </Col> 
                    <Col xs="12" md="9"> {this.props.ide.result.compilation.stdout} </Col>
                    <Col xs="12" md="3"> <h6> Execution </h6></Col> 
                    <Col xs="12" md="9"> {this.props.ide.result.compilation.output} </Col>
                    <Col xs="12" md="3"> </Col> 
                    <Col xs="12" md="9"> <h5>{this.props.ide.result.compilation.stdout}</h5></Col>
                    <Col xs="12" md="5"> </Col> 
                    <Col xs="12" md="2" className="text-center">
                      <i size={'xl'} className="cui-circle-check icons font-2xl d-block mt-4 bg-success"></i>
                    </Col>
                  </Row>
                  : 
                  <Row>
                      <Col xs="12" md="5"> </Col> 
                      <Col xs="12" md="2" className="text-center">
                      <i size={'xl'} className="cui-circle-x icons font-2xl d-block mt-4 bg-danger"></i>
                    </Col>
                  </Row>
                : ' '
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

export default connect(
    mapStateToProps, 
    { submitEntry,
      retrieveEntrySubmitTrx,
      retrieveEntryTrx,
      retrieveEntryResult,
      submitDraft,
      retrieveDraftSubmitTrx,
      retrieveDraftTrx,
      retrieveDraftResult 
    })(IDE);