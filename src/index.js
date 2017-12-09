import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Heading, ResetButton, ChooseCharacters, Batman, Captain, Cell11, Cell12, Cell13, Cell21, Cell22, Cell23, Cell31, Cell32, Cell33 } from './App.js';

var src = [['', '', ''], ['', '', ''], ['', '', '']];
const batmanIcon = 'http://www.minsteronline.co.uk/wp-content/uploads/2017/01/Minster-Briefing-Other.png';
const captainIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Creative-Tail-People-superman.svg/2000px-Creative-Tail-People-superman.svg.png';
const icons = [batmanIcon, captainIcon];
const characters = ['batman', 'captain'];
var user; var userIcon; var compIcon;
const cells = [['r1c1', 'r1c2', 'r1c3'], ['r2c1', 'r2c2', 'r2c3'], ['r3c1', 'r3c2', 'r3c3']];
var url;
var cellStyle = [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]];
var matrix = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];
var r1;
var r2;
var r3;
var c1;
var c2;
var c3;
var d1;
var d2;
var newMessage = '';
var movesNumber = 0;

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startGame: false,
			userTurn: false,
			message: ''
		};
		this.chooseCharacter = this.chooseCharacter.bind(this);
		this.play = this.play.bind(this);
		this.refresh = this.refresh.bind(this);
	}
	
	chooseCharacter(e) {
		document.getElementsByClassName('character')[0].style.display = 'none';
		user = e.target.getAttribute('alt');
		for (var i=0; i < characters.length; i++) {
			if (user === characters[i]) {
				userIcon = icons[i];
			} else {
				compIcon = icons[i];
			}
		}
		this.setState({startGame: true});
	}
	
	play(e) {
	
		var cellClass = e.target.className;
		if (this.state.userTurn === false) {
			for (var i=0; i < 3; i++) {
				for (var j=0; j < 3; j++) {
					if (cellClass === cells[i][j] && matrix[i][j] === '') {
						url = 'url(\'' + userIcon + '\')';
						cellStyle[i][j] = {
							background: url + ' no-repeat',
							backgroundSize: 'contain'
						};
						matrix[i][j] = 'x';
						++movesNumber;
					}
				}
			}
			this.setState({ userTurn: true });
		}
		
		var r1 = matrix[0][0] + matrix[0][1] + matrix[0][2];
		var r2 = matrix[1][0] + matrix[1][1] + matrix[1][2];
		var r3 = matrix[2][0] + matrix[2][1] + matrix[2][2];
		var c1 = matrix[0][0] + matrix[1][0] + matrix[2][0];
		var c2 = matrix[0][1] + matrix[1][1] + matrix[2][1];
		var c3 = matrix[0][2] + matrix[1][2] + matrix[2][2];
		var d1 = matrix[0][0] + matrix[1][1] + matrix[2][2];
		var d2 = matrix[0][2] + matrix[1][1] + matrix[2][0];
		var matrixCombined = [r1, r2, r3, c1, c2, c3, d1, d2];
		var cellsIndex = [
											[[0,0], [0,1], [0,2]],
											[[1,0], [1,1], [1,2]],
											[[2,0], [2,1], [2,2]],
											[[0,0], [1,0], [2,0]],
											[[0,1], [1,1], [2,1]],
											[[0,2], [1,2], [2,2]],
											[[0,0], [1,1], [2,2]],
											[[0,2], [1,1], [2,0]]
											];
		
		function computerPlays() {
			// check if user has won
			var status = '';
			for (var i=0; i<matrixCombined.length; i++) {
				if (matrixCombined[i] === 'xxx') {
					status = 'userWon';
				}
			}
			if (status === 'userWon') {
				newMessage = 'You won!';
			}
			
			// check if computer can win
			var emptyCells = [];
			for (var i=0; i<matrixCombined.length; i++) {
				if (matrixCombined[i] === 'oo') {
					for (var j=0; j<cellsIndex[i].length; j++) {
						if (matrix[cellsIndex[i][j][0]][cellsIndex[i][j][1]] === '') {
							emptyCells.push([cellsIndex[i][j][0],cellsIndex[i][j][1]]);
							status = 'userLost';
						}
					}
				}
			}
			if (status === 'userLost') {
				url = 'url(\'' + compIcon + '\')';
				cellStyle[emptyCells[0][0]][emptyCells[0][1]] = {
					background: url + ' no-repeat',
					backgroundSize: 'contain'
				};
				newMessage = 'You lost...';
			}
			
			// check if user is about to win
			emptyCells = [];
			for (var i=0; i<matrixCombined.length; i++) {
				if (matrixCombined[i] === 'xx') {
					for (var j=0; j<cellsIndex[i].length; j++) {
						if (matrix[cellsIndex[i][j][0]][cellsIndex[i][j][1]] === '') {
							emptyCells.push([cellsIndex[i][j][0],cellsIndex[i][j][1]]);
							status = 'needToBlock';
						}
					}
				}
			}
			if (status === 'needToBlock') {
				url = 'url(\'' + compIcon + '\')';
				cellStyle[emptyCells[0][0]][emptyCells[0][1]] = {
					background: url + ' no-repeat',
					backgroundSize: 'contain'
				};
				matrix[emptyCells[0][0]][emptyCells[0][1]] = 'o';
				++movesNumber;
			}
			
			// in other cases, computer plays randomly
			if (status === '') {
				emptyCells = [];
				for (var i=0; i<matrix.length; i++) {
					for (var j=0; j<matrix[i].length; j++) {
						if (matrix[i][j] === '') {
							emptyCells.push([i, j]);
						}
					}
				}
				var randomIndex = Math.floor(Math.random() * emptyCells.length);
				url = 'url(\'' + compIcon + '\')';
				cellStyle[emptyCells[randomIndex][0]][emptyCells[randomIndex][1]] = {
					background: url + ' no-repeat',
					backgroundSize: 'contain'
				};
				matrix[emptyCells[randomIndex][0]][emptyCells[randomIndex][1]] = 'o';
				++movesNumber;
			}
			
		}
		
		if (movesNumber < 9) {
			setTimeout(()=>{
				computerPlays();
				this.setState({
					userTurn: false,
					message: newMessage
				});
			}, 500);
		} else {
			var status = '';
			for (var i=0; i<matrixCombined.length; i++) {
				if (matrixCombined[i] === 'xxx') {
					status = 'win';
				}
			}
			if (status === 'win') {
				newMessage = 'You won!';
			} else {
				newMessage = "It's a tie...";
			}
			this.setState({message: newMessage});
		}
		
	}
	
	refresh() {
		window.location.reload();
	}
	
	render() {
		if (this.state.message === '') {
			if (this.state.startGame === false ) {
				return(
					<div>
						<Heading />
						<ResetButton onClick={this.refresh} />
						<div id='box'>	
							<div className='character'>
								<ChooseCharacters />
								<Batman onClick={this.chooseCharacter} />
								<Captain onClick={this.chooseCharacter} />
							</div>
						</div>
					</div>
				);
			} else {
				return(
					<div>
						<Heading />
						<ResetButton onClick={this.refresh} />
						<div id='box'>
							<table>
								<tr>
									<Cell11 onClick={this.play} style={cellStyle[0][0]} />
									<Cell12 onClick={this.play} style={cellStyle[0][1]} />
									<Cell13 onClick={this.play} style={cellStyle[0][2]} />
								</tr>
								<tr>
									<Cell21 onClick={this.play} style={cellStyle[1][0]} />
									<Cell22 onClick={this.play} style={cellStyle[1][1]} />
									<Cell23 onClick={this.play} style={cellStyle[1][2]} />
								</tr>
								<tr>
									<Cell31 onClick={this.play} style={cellStyle[2][0]} />
									<Cell32 onClick={this.play} style={cellStyle[2][1]} />
									<Cell33 onClick={this.play} style={cellStyle[2][2]} />
								</tr>
							</table>
						</div>
					</div>
				);
			}
		} else {
			return(
				<div>
					<Heading />
					<ResetButton onClick={this.refresh} />
					<div id='box'>
						<h2>{this.state.message}</h2>
					</div>
				</div>
			)
		}
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));