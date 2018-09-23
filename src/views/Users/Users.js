import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions';
import { CMS_BASE_URI_PROFILE } from '../../config';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

function UserRow(props) {
  const user = props.user;
  const userLink = `${CMS_BASE_URI_PROFILE}/user/${user.id}`;
 
  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
        <th scope="row">{props.index}</th>
        <td>{user.name}</td>
        <td>{user.score}</td>
        {/* <td><Badge href={userLink} color={getBadge(user.status)}>{user.status}</Badge></td> */}
    </tr>
  )
}

class Users extends Component {

  componentDidMount = () => {
    this.props.fetchLeaderboard();
  }

  render() {
    const userList = this.props.leaderboard;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Top 10 <small className="text-muted">scores</small>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">name</th>
                      <th scope="col">score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} index={index + 1} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    leaderboard: state.leaderboard
  }
}

export default connect(mapStateToProps, { fetchLeaderboard })(Users);
