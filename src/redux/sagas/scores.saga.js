import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addScore(action) {
    
    try {
        yield axios.post('/scores', action.payload);

        yield put({ type: 'GET_SCORES', payload: action.payload.game_id });

    } catch {
        console.log('get all error');
    }
}

function* deleteScore(action) {

    try {
        yield axios.delete(`/scores/${action.payload.score_id}`);

        yield put({ type: 'GET_SCORES', payload: action.payload.game_id });

    } catch {
        console.log('get all error');
    }
}

function* getScores(action) {
    try {
        const results = yield axios.get(`/scores/${action.payload}`);

        const scores = results.data

        yield put({ type: 'SET_SCORES', payload: scores });

    } catch {
        console.log('get all error');
    }
}



function* masterMindSaga() {
    yield takeEvery('ADD_SCORE', addScore);
    yield takeEvery('GET_SCORES', getScores)
    yield takeEvery('DELETE_SCORE', deleteScore)
}

export default masterMindSaga

