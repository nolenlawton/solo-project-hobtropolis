import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addScore(action) {
    console.log(action.payload)
}

function* masterMindSaga() {
    yield takeEvery('ADD_SCORE', addScore);
}

export default masterMindSaga

