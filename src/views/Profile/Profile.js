import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, saveProfile } from '../../actions';
import FileSaver from 'file-saver';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import InputFile from './InputFile';
import {
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }

  state = {
    formIsValid: false,
    open: false,
    birthdate: moment(),
    study: '',
    work: '',
    wantWork: false,
    cv: '',
    fileName: 'Sin cargar archivo',
    fileNameWeb: '',
    primary: false,
  }

  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  togglePrimary = () => {
    this.setState({
      primary: !this.state.primary,
    });
  }

  componentDidMount(){
    this.props.fetchProfile();
  }

  componentWillReceiveProps(update) {
    this.setState({birthdate:  moment(update.profile.birthdate)});
    this.setState({study: update.profile.study });
    this.setState({work: update.profile.work });
    this.setState({wantWork: update.profile.wantWork == 'true' || update.profile.wantWork === 'true' ? true: false });
    this.setState({cv: update.profile.cv });
    this.setState({fileName: update.profile.fileName });
    this.setState({fileNameWeb: update.profile.fileNameWeb });
  }

  onInputFileChange = ({ fileName, file, fileNameWeb }) => {
    this.setState({cv: file, fileName: fileName, fileNameWeb: fileNameWeb});
  }

  handleChange = (date) => {
    this.setState({birthdate: date});
  }

  onSubmit = () => {
    this.props.saveProfile(this.state);
    this.setState({primary: true});
  }

  download = () => {
    var dlnk = document.getElementById('dwnldLnk');
    dlnk.href = this.state.fileNameWeb+','+this.state.cv;

    dlnk.click();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm={{ size: 8, offset: 2}}>
            <Card>
              <CardHeader>
                <strong>Perfil</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal">
                 <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="mm">Fecha de nacimiento</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <DatePicker
                        selected={this.state.birthdate}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="company">Lugar de trabajo</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input 
                        defaultValue={this.state.work}
                        onChange={event => this.setState({work: event.target.value})}
                        name="work"
                        type="text" 
                        placeholder="Nombre del lugar de trabajo"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="company">Lugar de estudios</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input 
                        defaultValue={this.state.study}
                        onChange={event => this.setState({study: event.target.value})}
                        name="study"
                        type="text"
                        placeholder="Nombre del lugar de estudios"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Desea aplicar a una bolsa de trabajo?</Label></Col>
                    <Col xs="12" md="9">
                      <FormGroup check className="checkbox">
                        <Input 
                          className="form-check-input"
                          name="wantWork"
                          type="checkbox"
                          checked={this.state.wantWork}
                          onChange={event => {this.setState({wantWork: !this.state.wantWork})}}
                          />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Curriculum viate</Label></Col>
                    <Col md="2" className="mb-3 mb-xl-0 text-center">
                    <a id='dwnldLnk' download={this.state.fileName} /> 
                      <Button 
                        /* onClick={`${this.state.fileNameWeb},${this.state.cv}`}  */
                        onClick={this.download}
                        target="_blank" 
                        className="btn-pill btn btn-primary btn-sm">
                          <i className="fa icon-docs"></i>&nbsp;{this.state.fileName}
                      </Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>Cargar nuevo CV?</Label></Col>
                    <Col xs="12" md="9">
                      <InputFile
                        type='file'
                        onChange={this.onInputFileChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label></Label></Col>
                    <Col xs="12" md="9">
                      <Button type="button" size="sm" color="success" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Actualizar</Button>   
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal 
          isOpen={this.state.primary} 
          toggle={this.togglePrimary}
          className='modal-primary '>
          <ModalHeader toggle={this.togglePrimary}>Perfil actualizado exitosamente!</ModalHeader>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, { fetchProfile, saveProfile })(Profile);
