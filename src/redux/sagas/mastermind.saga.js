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

function* masterMindSaga() {
    yield takeEvery('ADD_SCORE', addScore);
}

export default masterMindSaga

