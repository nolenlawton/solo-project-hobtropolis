import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addScore(action) {
    try {
        yield axios.post('/masterMind', action.payload);

        yield put({ type: 'SET_SCORES' });

    } catch {
        console.log('get all error');
    }
}

function* getScores() {
    try {
        const results = yield axios.get('/masterMind');

        const scores = results.data

        yield put({ type: 'SET_SCORES', payload: scores });

    } catch {
        console.log('get all error');
    }
}

function* masterMindSaga() {
    yield takeEvery('ADD_SCORE', addScore);
    yield takeEvery('GET_SCORES', getScores)
}

export default masterMindSaga

