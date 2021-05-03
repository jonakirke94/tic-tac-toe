const checkWinner = (board) => {	
	const validateLine = (cells, onMatch) => {
		const match = cells.every(v => v.value && v.value === cells[0].value);

		if (match) {
			onMatch({
				winner: cells[0].value,
				hasWinner: match,
			})
		}
	}

	const getCol = (row, i) => {
		return row.map((_row, j) => board[j][i]);
	}

	const validate = () => {
		let hasWinner = false;
		let winner = '';
		let foundMatch = false;

		const processLine = (line) => {
			validateLine(line, (res) => {
				hasWinner = res.hasWinner;
				winner = res.winner;
				foundMatch = true;
			});
		};

		let i = 0;
		const leftDiagonal = [];
		const rightDiagonal = [];
		const len = board.length;
		while (!foundMatch && i <= len - 1) {
			processLine(board[i]);
			processLine(getCol(board[i], i));

			leftDiagonal.push(board[i][i]);
			rightDiagonal.push(board[i][len-i-1])

			const isLast = i === len - 1;
			if (isLast) {
				processLine(leftDiagonal);
				processLine(rightDiagonal);
			}

			i++;
		}

		return {
			hasWinner,
			winner,
		}
	}
		
	return validate()
}

export default checkWinner;