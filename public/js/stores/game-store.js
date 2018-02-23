import { createAction, createReducer } from 'redux-act';
import { fetchGame, guess } from '../fetchers';

export const addOrReplaceGame = createAction('Add or replace game');
export const updateWordInGame = createAction('Update roleRevealedForClueGiver for a word in a game');

const reducer = createReducer({
	[addOrReplaceGame]: (state, game) => {
		if (!game) return state;

		return game;
	},

	[updateWordInGame]: (state, { gameId, word, roleRevealedForClueGiver }) => {
		if (gameId !== state.gameId) return state;

		return {
			...state,
			words: {
				...state.words,
				[word]: {
					roleRevealedForClueGiver,
				},
			},
		};
	},
}, {});

// Selectors
export const getGame = state => state && state.game;

// Thunks
export function enterGame({ gameId }) {
	return () => fetchGame({ gameId });
}

export function makeGuess({ word }) {
	return (dispatch, getState) => {
		const { gameId } = getState().game;
		return guess({ gameId, word });
	};
}

export default reducer;
