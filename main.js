import render from './render.js';
import checkWinner from './tictac.js';

const game = function() {
	const ui = render();

	let state = {
		gridSize: 3,
		playerOne: '😄',
		playerTwo: '😍',
		currentTurn: 'playerOne',
		board: [],
		gameOver: false,
		playedRounds : 0,
	}

	const resetState = () => {
		state = {
			gridSize: 3,
			playerOne: '',
			playerTwo: '',
			currentTurn: 'playerOne',
			board: [],
			gameOver: false,
			playedRounds : 0,
		}
	}

	const init = () => {
		ui.bindNewGameClick((userInput) => {
			resetState();
			state = { ...state, ...userInput };
			ui.reset();
			instantiateGame();
		});

		instantiateGame();
	};

	const instantiateGame = () => {
		ui.bindClick(playedTurn);

		for (let i = 0; i < state.gridSize; i++) {
			const row = [];

			for (let j = 0; j < state.gridSize; j++) {
				row.push({
					id: `cell-${i}-${j}`,
					value: ''
				});
			}

			state.board.push(row);
		}
		
		ui.init(state);
	}

	const isTied = () => {
		return state.playedRounds === state.gridSize * state.gridSize;		
	}

	const playedTurn = ({ id, cellValue}) => {
		if (cellValue || state.gameOver) {
			return;
		}
		
		const toggleTurn = () => {
			state.currentTurn = state.currentTurn === 'playerOne' ? 'playerTwo' : 'playerOne';
		}
		
		const [_, x, y] = id.split('-');
		state.board[x][y].value = state[state.currentTurn];
		state.playedRounds++;
		const { hasWinner, winner } = checkWinner(state.board);		

		ui.setCell(id, state[state.currentTurn]);
		
		toggleTurn();
		
		ui.setActivePlayer(state.currentTurn);

		if (hasWinner || isTied()) {
			state.gameOver = true;
			const msg = hasWinner ? `Player ${winner} has won!` : 'The game is tied';
			ui.announce(msg);
		}
	}

	return {
		init,
	}
}


const { init } = game();
init();
