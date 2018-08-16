import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

const mapStateToProps = state => ({
    user: state.user,
  });

class UserList extends Component {
    state = {

    }

    render(){
        return(
            <div>
                <TableCell padding="checkbox">
                  <Checkbox  />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  6
                </TableCell>
                <TableCell >1</TableCell>
                <TableCell >2</TableCell>
                <TableCell >3</TableCell>
                <TableCell >4</TableCell>
            </div>

        )
    }
}

export default connect(mapStateToProps)(UserList);