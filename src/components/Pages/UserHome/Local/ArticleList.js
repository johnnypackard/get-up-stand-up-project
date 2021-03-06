import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

//components
import swal from 'sweetalert2';

//material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

//actions
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { ARTICLE_ACTIONS } from '../../../../redux/actions/articleActions';
import EditArticleModal from '../../../Global/Modals/AddArticle/EditArticleModal';


//ReduxStore
const mapStateToProps = state => ({
    user: state.user,
    articles: state.articleReducer.article
})

const styles = theme => ({
    card: {
      maxWidth: 'auto',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
});
  
class ArticleCard extends React.Component {
    state = { 
        expanded: false,
    };
  
    componentDidMount = async() => {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
      await this.getArticleDetail();
    }

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    editProfile = () => {
    }

    getArticleDetail = (id) => {
        id = this.props.user.user.id;
        this.props.dispatch({type: ARTICLE_ACTIONS.FETCH_USER_ARTICLES, payload: id});
    }

    requestDelete = (article) => {
      swal(
        'Notice',
        'Your edits/deletion will be reviewed by an Admin',
        'info'
      )
      const id = article.id
      const user_id = article.user_id
      const action = ({
        type: ARTICLE_ACTIONS.POST_QUASI_DELETE,
        payload: article
      })
      this.props.dispatch(action);
    }

    render() {
        const { classes } = this.props;        
      return (
        <div >
         
            {this.props.articles.map((article, i) => 
            <div> 
              <br/>
                <Card key={i} className={classes.card}>
                <CardHeader
                  style={{ textDecoration: 'underline', backgroundColor:'#',  fontSize:'20px' }}
                  title={article.research_title}
                />
                <CardContent id="articleStatus">
                  <Typography style={{color:'#475c87', fontStyle: 'italic', fontSize:'20px'}}component="p">
                    Date Submitted: {article.date_posted}
                  </Typography>
                  { article.status &&  
                  <Typography style={{color:'#475c87', fontStyle: 'italic', fontSize:'20px'}} component="p">
                    Status: {article.status === 'pending' && 'Pending'} {article.status === 'approved' && 'Approved'} {article.status === 'rejected' && 'Rejected'} {article.status === 'edit-review' && 'Under Review For Editing'} {article.status === 'edit-delete' && 'Under Review For Deletion'}
                  </Typography>
                  }
                </CardContent>
                <CardContent>
                  <Typography  style={{color:'#475c87', fontSize:'20px'}}> Institution Name: </Typography> 

                  <Typography style={{color:'black', fontStyle: 'italic', fontSize:'20px'}}> { article.institution_name } </Typography>

                </CardContent>
                { article.status === "rejected" &&  
                <CardContent>
                  <Typography  style={{color:'#A23645', fontSize:'25px'}}>
                
                    Reason article was rejected:</Typography> 
                    
                    <Typography style={{color:'black', fontStyle: 'italic', textDecoration: 'underline',  fontSize:'20px'}}>{article.admin_comment}</Typography>
                  
                  
                </CardContent>
                  }
                <CardActions className="actionButton">                    
                    <EditArticleModal article={article}/>
                    {article.status !== 'edit-delete'?
                    <IconButton variant="fab" color="secondary" aria-label="Edit" onClick={ ()=>this.requestDelete(article) }>
                        <DeleteRoundedIcon/>
                    </IconButton> : <IconButton variant="fab" color="secondary" aria-label="Edit" onClick={ ()=>this.requestDelete(article)} disabled>
                        <DeleteRoundedIcon/>
                    </IconButton>
                  }
                </CardActions>
              </Card>
            </div>
            )}
            
        </div>
      );
    }
}
  
  ArticleCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
//   export default withStyles(styles)(ArticleCard);
  export default compose(
      withStyles(styles),
      connect(mapStateToProps)
  )(ArticleCard);
