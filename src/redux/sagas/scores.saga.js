import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addScore(action) {
    const scoresToGet = {
        game_id: action.payload.game_id,
        myScores: false
    }
    
    try {
        yield axios.post('/scores', action.payload);

        yield put({ type: 'GET_SCORES', payload: scoresToGet });

    } catch {
        console.log('get all error');
    }
}

function* deleteScore(action) {
    const scoresToGet = {
        game_id: action.payload.game_id,
        myScores: action.payload.myScores
    }

    try {
        yield axios.delete(`/scores/${action.payload.score_id}`);

        yield put({ type: 'GET_SCORES', payload: scoresToGet});

    } catch {
        console.log('get all error');
    }
}

function* getScores(action) {
    try {
        const results = yield axios.get(`/scores/${action.payload.game_id}/${action.payload.myScores}`);

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

