const SELECTORS = {
	BOARD: '#board',
	GRID_SIZE_SELECT: '#grid-size',
	NEW_GAME: '#new-game',
	PLAYER_ONE: '#player-one',
	PLAYER_TWO: '#player-two',
	PLAYER_ONE_SYMBOL_SELECT: '#player-one-symbol-select',
	PLAYER_TWO_SYMBOL_SELECT: '#player-two-symbol-select',
	PLAYER_ONE_SYMBOL: '#player-one span',
	PLAYER_TWO_SYMBOL: '#player-two span',
}

const render = () => {
	const reset = () => {
		document.querySelector(SELECTORS.PLAYER_ONE_SYMBOL).textContent = '';
		document.querySelector(SELECTORS.PLAYER_TWO_SYMBOL).textContent = '';
		document.querySelector(SELECTORS.PLAYER_ONE).style.color = 'black';
		document.querySelector(SELECTORS.PLAYER_TWO).style.color = 'black';
		

		const board = document.querySelector(SELECTORS.BOARD);
		while (board.firstChild) {
			board.firstChild.remove();
		}
	}

	const bindClick = (handler) => {
		document.querySelector(SELECTORS.BOARD).addEventListener('click', (e) => {
			const { textContent, id } = e.target;
			handler({
				id,
				cellValue: textContent,
			});
		});
	}

	const bindNewGameClick = (handler) => {
		document.querySelector(SELECTORS.NEW_GAME).addEventListener('click', (_) => {
			const gridSize = document.querySelector(SELECTORS.GRID_SIZE_SELECT).value;
			const playerOne = document.querySelector(SELECTORS.PLAYER_ONE_SYMBOL_SELECT).value;
			const playerTwo = document.querySelector(SELECTORS.PLAYER_TWO_SYMBOL_SELECT).value;
			handler({gridSize, playerOne, playerTwo});
		});
	}

	const setCell = (id, value) => {
		document.querySelector(`#${id}`).textContent = value;
	}

	const setPlayerSymbols = (playerOne, playerTwo) => {
		document.querySelector(SELECTORS.PLAYER_ONE_SYMBOL).textContent = playerOne;
		document.querySelector(SELECTORS.PLAYER_TWO_SYMBOL).textContent = playerTwo;
	}

	const setActivePlayer = (currentTurn) => {
		const playerOneNode = document.querySelector(SELECTORS.PLAYER_ONE);
		const playerTwoNode = document.querySelector(SELECTORS.PLAYER_TWO);

		const activeNode = currentTurn === 'playerOne' ? playerOneNode : playerTwoNode;

		playerOneNode.style.color = 'black';
		playerTwoNode.style.color = 'black';

		activeNode.style.color = 'red';
	}

	const init = (state) => {
		const board = document.querySelector(SELECTORS.BOARD);

		state.board.flat().forEach(({ id }) => {
			const cell = document.createElement('div');
			cell.id = `${id}`;
			board.appendChild(cell)
		});

		board.style['grid-template-columns'] = `repeat(${state.gridSize}, minmax(10px, 50px))`;
		board.style['grid-template-rows'] = `repeat(${state.gridSize}, minmax(10px, 50px))`;
        
		setPlayerSymbols(state.playerOne, state.playerTwo);

		setActivePlayer(state.currentTurn);	
	}

	const announce = (text) => {
		// this is a trick to wait until the page has been painted
		setTimeout(() => {
			alert(text);			
		}, 0);
	}

	return {
		init,
		bindClick,
		bindNewGameClick,
		announce,
		setCell,
		setActivePlayer,
		reset,
	}
}

export default render;