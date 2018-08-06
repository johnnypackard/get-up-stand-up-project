import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import { LOGIN_ACTIONS } from '../../../redux/actions/loginActions';
import {ARTICLE_ACTIONS} from '../../../redux/actions/articleActions';
import { triggerLogin, formError, clearError, formError2 } from '../../../redux/actions/loginActions';
import Icon from '@material-ui/core/Icon';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchBar from '../../Pages/Landing/Local/SearchBar'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    user: state.user,
    articles: state.articleReducer.article,
    location_id: state.articleReducer.article.id,
    research_type: state.articleReducer.research_type,
    research_phase: state.articleReducer.research_phase
})

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginRight: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    
    });

class AddArticleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
            location_id: '',
            user_id: '',
            date_posted: '',
            research_date: '',
            reasearch_title: '',
            research_type: '',
            research_phase: '',
            institution_name: '',
            instutution_url: '',
            funding_source: '',
            related_articles: '',
            status: ''
            }
        }
    }

    // googleApiCall = (event) => {
    //     event.preventDefault();
    //     console.log('googleApiCall');
    //     console.log('searchAddress:', this.state.searchAddress);
    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.searchAddress}&key=AIzaSyD9e9e4rYBfPVZsPiKNBvQ8Ciu5yGPlfq8`
    //     console.log('url:', url);
        
    //     axios.get(url)
    //     .then((response) => {
    //       console.log('response', response)
    //         const latLng = {...response.data.results}
    //         console.log('latLng:', latLng);
    //         this.props.dispatch({type: MAP_ACTIONS.SET_ADDRESS, payload: latLng})
    //         this.props.dispatch({type: MAP_ACTIONS.RECENTER})
    //     })
    //     .catch(err => {
    //     console.log('in googleApicall',err);                     
        
    //     });
    //   }
      
    addArticle = (event) => {
        event.preventDefault();
        // if (this.state.user.user.type === 'admin') {
            const body = {
                location_id: this.state.location_id,
                user_id: this.state.user_id,
                date_posted: this.state.date_posted,
                research_date: this.state.research_date,
                reasearch_title: this.state.reasearch_title,
                research_type: this.state.research_type,
                research_phase: this.state.research_phase,
                institution_name: this.state.institution_name,
                institution_url: this.state.institution_url,
                funding_source: this.state.funding_source,
                related_articles: this.state.related_articles,
                status: this.state.status
            };
            console.log('body:',body);
            const action = ({
                type: ARTICLE_ACTIONS.POST_ARTICLE,
                payload: body
            })
            this.props.dispatch(action);
            this.handleClose();
        // }
    }
        
        handleInputChangeFor = propertyName => (event) => {
            console.log('user id', this.props.user.user.id);  
            this.setState({
                [propertyName]: event.target.value,
                user_id: this.props.user.user.id,
                location_id: 6,
                status: 1,
            
            });
        }
    
        handleClickOpen = () => {
            this.setState({ open: true });
        };
    
        handleClose = () => {
            this.setState({ open: false });
        };
    
      render() {
        const { classes } = this.props;
        return (
          <div>
            <Button className={classes.button} onClick={this.handleClickOpen} variant="contained" color="primary">Add a new article</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Add a new article:"}</DialogTitle>
              {this.state.message}
              <form onSubmit={this.addArticle}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Location: <SearchBar />
                <TextField 
                    type="date"
                    value={this.state.date_posted}
                    onChange={this.handleInputChangeFor('date_posted')}
                    name="date_posted"
                    autoFocus
                    margin="dense"
                    label="Date Posted"
                    fullWidth
                    />
                <TextField 
                    type="date"
                    value={this.state.research_date}
                    onChange={this.handleInputChangeFor('research_date')}
                    name="research_date"
                    autoFocus
                    margin="dense"
                    label="Research Date"
                    fullWidth
                    />
                <TextField 
                    type="text"
                    value={this.state.reasearch_title}
                    onChange={this.handleInputChangeFor('reasearch_title')}
                    name="reasearch_title"
                    autoFocus
                    margin="dense"
                    label="Research Title"
                    fullWidth
                    multiline
                    />
                    <InputLabel htmlFor="research_type-simple">Research Type</InputLabel>
                    <Select
                        value={this.state.research_type}
                        onChange={this.handleInputChangeFor('research_type')}
                        inputProps={{
                        name: 'research_type',
                        id: 'research_type-simple',
                        }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {this.props.research_type.map(research_type => {
                            return (
                                <MenuItem value={research_type.type}>{research_type.type}</MenuItem>
                            )
                        })}
                    </Select>
                 {/* <TextField 
                    type="text"
                    value={this.state.research_type}
                    onChange={this.handleInputChangeFor('research_type')}
                    name="research_type"
                    autoFocus
                    margin="dense"
                    label="Research Type"
                    fullWidth  
                    /> */}
                    <br/>
                    <InputLabel htmlFor="research_phase-simple">Research Phase</InputLabel>
                    <Select
                        value={this.state.research_phase}
                        onChange={this.handleInputChangeFor('research_phase')}
                        inputProps={{
                        name: 'research_phase',
                        id: 'research_phase-simple',
                        }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {this.props.research_phase.map(research_phase => {
                            return (
                                <MenuItem value={research_phase.phase}>{research_phase.phase}</MenuItem>
                            )
                        })}
                    </Select>
                    {/* <TextField 
                    type="text"
                    value={this.state.research_phase}
                    onChange={this.handleInputChangeFor('research_phase')}
                    name="research_phase"
                    autoFocus
                    margin="dense"
                    label="Research Phase"
                    fullWidth  
                    /> */}
                    <TextField 
                    type="text"
                    value={this.state.institution_name}
                    onChange={this.handleInputChangeFor('institution_name')}
                    name="institution_name"
                    autoFocus
                    margin="dense"
                    label="Institution Name"
                    fullWidth  
                    />
                    <TextField 
                    type="text"
                    value={this.state.institution_url}
                    onChange={this.handleInputChangeFor('institution_url')}
                    name="institution_url"
                    autoFocus
                    margin="dense"
                    label="Institution Website"
                    fullWidth  
                    />
                    <TextField 
                    type="text"
                    value={this.state.funding_source}
                    onChange={this.handleInputChangeFor('funding_source')}
                    name="funding_source"
                    autoFocus
                    margin="dense"
                    label="Funding Source"
                    fullWidth  
                    />
                    <TextField 
                    type="text"
                    value={this.state.related_articles}
                    onChange={this.handleInputChangeFor('related_articles')}
                    name="related_articles"
                    autoFocus
                    margin="dense"
                    label="Related Articles"
                    fullWidth  
                    />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button type="submit" value="Add Article" color="primary" variant="contained" autoFocus>Add</Button>
                <Button onClick={this.handleClose}  type="button" value="Cancel">Cancel</Button>
              </DialogActions>
              </form>
            </Dialog>
          </div>
        );
      }
    }
    
    export default compose(connect(mapStateToProps), withStyles(styles))(AddArticleModal);
