import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const styles = {
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};


class ResearchPhaseSelect extends React.Component {
  state = {
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  };


  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <FormGroup row>
      {this.props.research_phase.map((research_phase, i) => {
        return (
          <FormControlLabel
          control={
            <Checkbox
              checked={this.state.research_phase}
              onChange={this.handleChange('research_phase')}
              value={research_phase.id}
              color="primary"
            />
          }
          label={research_phase.phase}
        />
        )
      })}
      </FormGroup>
      </div>
    );
  }
}

ResearchPhaseSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResearchPhaseSelect);