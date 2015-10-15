'use strict';

var myExtras = myExtras || {};

var gameExtras = {
  myToken: 0,
  myGameID: 0,
  singleMode: true,
  player: 'X',


  callback: function callback(error, data) {
    if (error) {

      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));
  },

  callbackNewGame: function callbackNewGame(error, data) {
    if (error) {
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    gameExtras.myGameID = data.game.id;
    $('#result').val(JSON.stringify(data, null, 4));
  },

  ajaxMarkCell: function(e,index,value){
   var myData = {
      "game" : {
        "cell" : {
          "index": index,
          "value": value,}}}

    e.preventDefault();
    tttapi.markCell(this.myGameID, myData, this.myToken, this.callback);
  },

  ajaxEndCurentGame: function (e){
    e.preventDefault();
    tttapi.endGame(this.myGameID, this.myToken, this.callback);
  },

  ajaxCreateNewGame: function(e) {
    e.preventDefault();
    tttapi.createGame(this.myToken, this.callbackNewGame);
  },


};




var resourceWatcher = function(url, conf) {
  var token = function(conf) {
    return conf && (conf = conf.Authorization) &&
      (conf = typeof conf === 'string' &&
        conf.split('=')) &&
      Array.isArray(conf) && conf[1];
  };
  url += '?token=' + token(conf);
  url += conf.timeout ? '&timeout=' + conf.timeout : '';
  var es = new EventSource(url);
  var close = function() {
    es.close();
  };
  var makeHandler = function(handler, close) {
    return function(e) {
      if (close) {
        close();
      }
      return handler(e.data ? e.data : e);
    };
  };

  var on = function(event, handler) {
    switch (event) {
      case 'connect':
        es.onopen = makeHandler(handler);
        break;
      case 'change':
        es.onmessage = makeHandler(handler);
        break;
      case 'error':
        es.onerror = makeHandler(handler, close);
        break;
      default:
        console.error('Unknown event type:' + event);
        break;
    }
  };

  return {
    close: close,
    on: on
  };
};





var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },

  //Authenticated api actions
  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json',
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json',
    }, callback);
  },


  endGame: function (id, token, callback) {
     var myData = {
      "game" : {
        "over" : true,
      }
    }
    this.ajax({
     method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(myData),
      dataType: 'json',
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json',
    }, callback);
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};

////////////////////////

//$(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault(); /* should always be called with a submit event,  default is brower packs data up
                          and send to webpage server.  You want to send it to data server
                          IF SOMETHING IS CLICKABLE AND YOU ARE DOING SOMETHING IN J SCRIPT CALL this */
  });

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);
      gameExtras.myToken = data.user.token
      $(".Main").show();
      $(".userInfo").hide();
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  $('#create-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, callback);
  });

  $('#join-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(id, token, callback);
  });

 $('#end-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#end-id').val();
    e.preventDefault();
    tttapi.endGame(id, token, callback);
  });

  $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, callback);
  });

  $('#watch-game').on('submit', function(e){
    var token = $(this).children('[name="token"]').val();
    var id = $('#watch-id').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      $('#watch-index').val(cell.index);
      $('#watch-value').val(cell.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

 // myExtras.initFunction();
});





