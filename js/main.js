let board = [ [null, null, null],
              [null, null, null],
              [null, null, null] ];

const tictactoe = function(move) {
  let moveArray = move.split(' ');
  let row;
  if (moveArray[0] === 'a') {
    row = 0;
  } else if (moveArray[0] === 'b') {
    row = 1;
  } else if (moveArray[0] === 'c') {
    row = 2;
  } else {
    $('#alert').html("Please re-enter your move.");
    $('#input').val('');
  }
  let col = parseInt(moveArray[1]);
  if (col === 0 || col === 1 || col === 2) {
    $('#input').val('');
  } else {
    $('#alert').html("Please re-enter your move.");
    $('#input').val('');
    console.log("Column value is too large");
  }
  let piece = moveArray[2].toUpperCase();
  if (board[row][col] === 'X' || board[row][col] === 'O') {
    // console.log("Already taken.");
    $('#alert').html("That square is already taken. Try again.");
  } else if (piece !== 'X' && piece !== 'O') {
    $('#alert').html(`Please enter either "X" or "O" for your piece.`);
  } else if (board[row][col] === null && (piece === 'X' || piece === 'O')) {
    board[row][col] = piece;
    // console.log("The piece was placed.");
    $(`#row${row} .col${col}`).html(`${piece}`);
    $('#alert').html('');
  } else  {
    $('#alert').html("There was an error. Please try again.");
  }
  $('#input').val('');

  if (board[0][0] !== null && board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
    if (board[0][0] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[0][0] === 'O') {
      $('#alert').html("The winner is O!");
    }
    // console.log("Row 1 winner");
  } else if (board[1][0] !== null && board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
    if (board[1][0] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[1][0] === 'O') {
      $('#alert').html("The winner is O!");
    }
    // console.log("Row 2 winner");
  } else if (board[2][0] !== null && board[2][0] === board[2][1] && board[2][0] === board[2][2]) {
    if (board[2][0] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[2][0] === 'O') {
      $('#alert').html("The winner is O!");
    }
  } else if (board[0][0] !== null && board[0][0] === board[1][0] && board[0][0] === board[2][0]) {
    if (board[0][0] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[0][0] === 'O') {
      $('#alert').html("The winner is O!");
    }
  } else if (board[0][1] !== null && board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
    if (board[0][1] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[0][1] === 'O') {
      $('#alert').html("The winner is O!");
    }
  } else if (board[0][2] !== null && board[0][2] === board[1][2] && board[0][2] === board[2][2]) {
    if (board[0][2] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[0][2] === 'O') {
      $('#alert').html("The winner is O!");
    }
  } else if (board[0][0] !== null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    if (board[0][0] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[0][0] === 'O') {
      $('#alert').html("The winner is O!");
    }
  } else if (board[0][2] !== null && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    if (board[0][2] === 'X') {
      $('#alert').html("The winner is X!");
    } else if (board[0][2] === 'O') {
      $('#alert').html("The winner is O!");
    }
  } else if (board[0].includes(null) === false && board[1].includes(null) === false && board[2].includes(null) === false) {
    $('#alert').html("There is no winner. It's a tie!");
  }
  return board;
};

$(document).ready(function() {
  $('#form').on('submit', function(event) {
    event.preventDefault();

    let userInput = $('#input').val();
    tictactoe(userInput);
    // console.log(userInput);
  });
});


// // let row1 = [col1, col2, col3];
// // let row2 = [col1, col2, col3];
// // let row3 = [col1, col2, col3];
//
// // let tictactoe = [row1, row2, row3];
// // let result = tictactoe[0]; // returns [col1, col2, col3]
// // result[0]; // returns row1, col1
// //
// // tictactoe[0][0] = "X"; // this will place an X at top left corner of the game board
//
// // let tictactoe = [ [col1, col2, col3],
// //                   [col1, col2, col3],
// //                   [col1, col2, col3] ];
//
// let tictactoe = [ [null, null, null],
//                   [null, null, null],
//                   [null, null, null] ];
//
// // create a website where you can play tictactoe
// // prompt people for their move
// // update the array
//