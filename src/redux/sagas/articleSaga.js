import {put, takeLatest} from 'redux-saga/effects';
import {ARTICLE_ACTIONS} from '../actions/articleActions';
import {getArticles, postArticle, deleteArticle, putArticle, getUserArticles} from '../requests/articleRequests';
import {getResearchPhase, getResearchType, requestDeleteArticle, postQuasiArticle, postQuasiArticleDelete} from '../requests/articleRequests';

function* fetchArticles(action) {
    try {
        let articles = yield getArticles(action.payload);
        console.log('in article saga to get articles', articles);
        yield put({
            type: ARTICLE_ACTIONS.SHOW_ARTICLES,
            payload: articles
        });
    } catch (error) {
        console.log('error in article saga on GET', error);    
    }
}

function* fetchUserArticles(action) {
   try{
    let id = action.payload;
    let userArticles = yield getUserArticles(id);
    yield put({
        type: ARTICLE_ACTIONS.SHOW_ARTICLES,
        payload: userArticles
    }) 
    } catch (error) {
        console.log('error', error);
    }
}

function* fetchResearchType(action) {
    try {
        let research_type = yield getResearchType(action.payload);
        yield put({
            type: ARTICLE_ACTIONS.SHOW_RESEARCH_TYPE,
            payload: research_type
        });
    } catch (error) {
        console.log('error in article saga on GET for research_type', error);   
    }
}

function* fetchResearchPhase(action) {
    try {
        let research_phase = yield getResearchPhase(action.payload);
        yield put({
            type: ARTICLE_ACTIONS.SHOW_RESEARCH_PHASE,
            payload: research_phase
        });
    } catch (error) {
        console.log('error in article saga on GET for research_phase', error);   
    }
}

function* addArticle(action) {
    try {
        let article = action.payload
        yield postArticle(article);
    } catch (error) {
        console.log('error in article saga on POST', error); 
    }  
} 

function* addQuasiArticle(action) {
    try {
        let article = action.payload
        yield postQuasiArticle(article);
        yield put ({
            type: ARTICLE_ACTIONS.FETCH_USER_ARTICLES,
            payload: action.payload.user_id
        })
    } catch (error) {
        console.log('error in article saga on POST', error); 
    }  
} 

function* addQuasiArticleDelete(action) {
    try {
        let article = action.payload
        yield postQuasiArticleDelete(article);
        yield put ({
            type: ARTICLE_ACTIONS.FETCH_USER_ARTICLES,
            payload: action.payload.user_id
        })
    } catch (error) {
        console.log('error in article saga on PUT', error);
    } 
}


function* removeArticle(action) {
    try {
        let id = action.payload
        yield deleteArticle(id);
        yield put ({
            type: ARTICLE_ACTIONS.FETCH_ARTICLES
        });
    } catch (error) {
        console.log('error in article saga on DELETE', error);    
    }   
}

function* updateArticle(action) {
    try {
        let article = action.payload
        yield putArticle(article);
        console.log('in article saga for update', action);
    } catch (error) {
        console.log('error in article saga on PUT', error);
    } 
}

function* articleSaga() {
    yield takeLatest (ARTICLE_ACTIONS.FETCH_ARTICLES, fetchArticles)
    yield takeLatest (ARTICLE_ACTIONS.FETCH_USER_ARTICLES, fetchUserArticles)
    yield takeLatest (ARTICLE_ACTIONS.FETCH_RESEARCH_TYPE, fetchResearchType)
    yield takeLatest (ARTICLE_ACTIONS.FETCH_RESEARCH_PHASE, fetchResearchPhase)
    yield takeLatest (ARTICLE_ACTIONS.POST_ARTICLE, addArticle)
    yield takeLatest (ARTICLE_ACTIONS.UPDATE_ARTICLE, updateArticle)
    yield takeLatest (ARTICLE_ACTIONS.POST_QUASI_ARTICLE, addQuasiArticle)
    yield takeLatest (ARTICLE_ACTIONS.POST_QUASI_DELETE, addQuasiArticleDelete)

  }
  
  export default articleSaga;