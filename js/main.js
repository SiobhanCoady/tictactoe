$(document).ready(function() {

  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  let board_history = [];
  let move_history = [];
  let index = 0;
  let wins = {};
  let player_x = '';
  let player_o = '';
  wins.player_x = 0;
  wins.player_o = 0;
  let gameId;


  const x_win_case = function() {
    $('#alert').html("The winner is X!");
    $('.undo-button').prop('disabled', true);
    $('.undo-button').addClass("disabled");
    wins.player_x += 1;
  };

  const o_win_case = function() {
    $('#alert').html("The winner is O!");
    $('.undo-button').prop('disabled', true);
    $('.undo-button').addClass("disabled");
    wins.player_o += 1;
  };


  let userPiece = "";
  let value = true;
  if (value) {
    userPiece = "X";
  } else {
    userPiece = "O";
  }

  $('#players').on('submit', function(event) {
    event.preventDefault();

    gameId = firebase.database().ref().child('wins').push({
      x_name: $('#player_x').val(),
      o_name: $('#player_o').val(),
      x_score: wins.player_x,
      o_score: wins.player_o
    }, function(error){
      if(error){
        alert(`Error: ${error}`);
      } else {
        $('#x_name').html(`Player X: ${$('#player_x').val()}`);
        $('#o_name').html(`Player O: ${$('#player_o').val()}`);
        $('#x_score').html(`Player X: ${wins.player_x}`);
        $('#o_score').html(`Player O: ${wins.player_o}`);
        $('#player_x').val('');
        $('#player_o').val('');
      }
    }).key;
  });

  $('#next_game').click(function(event) {
    event.preventDefault();
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        $(`#r${r}c${c}`).html(`-`);
        $(`#r${r}c${c}`).removeClass('win');
      }
    }
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    board_history = [];
    move_history = [];
    index = 0;
    value = true;
    if (value) {
      userPiece = "X";
    } else {
      userPiece = "O";
    }
    $('#alert').html(`Click to place your ${userPiece}.`);
    $('#history').html(`${move_history}`);
    $('.undo-button').removeClass("disabled");
    $('#undo').hide();
  });

  $('#refresh').click(function() {
    location.reload();
  });

  $('#undo').click(function(event) {
    event.preventDefault();
    board_history.pop();
    move_history.pop();
    index--;
    if (index === 0) {
      for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
          $(`#r${r}c${c}`).html(`-`);
        }
      }
      board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
      $('#history').html(`${move_history}`);
      $('#undo').hide();
    } else {
      for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
          let square = board_history[index - 1][r][c];
          if (square === null) {
            board[r][c] = null;
            $(`#r${r}c${c}`).html(`-`);
          } else {
            $(`#r${r}c${c}`).html(`${board_history[index - 1][r][c]}`);
          }
          let move_history_list = [];
          $.each(move_history, function(index, value) {
            move_history_list.push(`${value} <br>`);
          });
          $('#history').html(move_history_list.join(''));
        }
      }
    }

    value = !value;
    if (value) {
      userPiece = "X";
    } else {
      userPiece = "O";
    }
    $('#alert').html(`Click to place your ${userPiece}.`);

  });

  $('#alert').html(`Click to place your ${userPiece}.`);
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      $(`#r${r}c${c}`).on('click', function() {
        if (board[r][c] === null) {
          board[r][c] = userPiece;
          let temp_board = [];
          temp_board[0] = board[0].slice(0);
          temp_board[1] = board[1].slice(0);
          temp_board[2] = board[2].slice(0);
          board_history.push(temp_board);
          index++;
          move_history.push(`${userPiece} was placed at row ${r}, column ${c}.`);
          // console.log(move_history);
          $('#history').append(`${move_history[index - 1]}<br>`);
          // console.log(`${userPiece} was placed at row ${r}, column ${c}.`);
          $(`#r${r}c${c}`).html(`${userPiece}`);
          // console.log(board_history);
          // console.log(index);
          $('#undo').show();

          if (board[0][0] !== null && board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
            if (board[0][0] === 'X') {
              x_win_case();
            } else if (board[0][0] === 'O') {
              o_win_case();
            }
            $('#r0c0, #r0c1, #r0c2').addClass('win');
          } else if (board[1][0] !== null && board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
            if (board[1][0] === 'X') {
              x_win_case();
            } else if (board[1][0] === 'O') {
              o_win_case();
            }
            $('#r1c0, #r1c1, #r1c2').addClass('win');
          } else if (board[2][0] !== null && board[2][0] === board[2][1] && board[2][0] === board[2][2]) {
            if (board[2][0] === 'X') {
              x_win_case();
            } else if (board[2][0] === 'O') {
              o_win_case();
            }
            $('#r2c0, #r2c1, #r2c2').addClass('win');
          } else if (board[0][0] !== null && board[0][0] === board[1][0] && board[0][0] === board[2][0]) {
            if (board[0][0] === 'X') {
              x_win_case();
            } else if (board[0][0] === 'O') {
              o_win_case();
            }
            $('#r0c0, #r1c0, #r2c0').addClass('win');
          } else if (board[0][1] !== null && board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
            if (board[0][1] === 'X') {
              x_win_case();
            } else if (board[0][1] === 'O') {
              o_win_case();
            }
            $('#r0c1, #r1c1, #r2c1').addClass('win');
          } else if (board[0][2] !== null && board[0][2] === board[1][2] && board[0][2] === board[2][2]) {
            if (board[0][2] === 'X') {
              x_win_case();
            } else if (board[0][2] === 'O') {
              o_win_case();
            }
            $('#r0c2, #r1c2, #r2c2').addClass('win');
          } else if (board[0][0] !== null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            if (board[0][0] === 'X') {
              x_win_case();
            } else if (board[0][0] === 'O') {
              o_win_case();
            }
            $('#r0c0, #r1c1, #r2c2').addClass('win');
          } else if (board[0][2] !== null && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            if (board[0][2] === 'X') {
              x_win_case();
            } else if (board[0][2] === 'O') {
              o_win_case();
            }
            $('#r0c2, #r1c1, #r2c0').addClass('win');
          } else if (board[0].includes(null) === false && board[1].includes(null) === false && board[2].includes(null) === false) {
            $('#alert').html("There is no winner. It's a tie!");
          } else {
            value = !value;
            if (value) {
              userPiece = "X";
            } else {
              userPiece = "O";
            }
            $('#alert').html(`Click to place your ${userPiece}.`);
          }

          firebase.database().ref().child(`wins/${gameId}`).update({ x_score: wins.player_x, o_score: wins.player_o });
          $('#x_score').html(`Player X: ${wins.player_x}`);
          $('#o_score').html(`Player O: ${wins.player_o}`);
        }
      });
    }
  }
});
