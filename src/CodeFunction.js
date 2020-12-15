function loginUser_(data){
    const ws = SpreadsheetApp.openById(idSs);
    const ss = ws.getSheetByName("control_panel");
    const dataLogin = ss.getRange(2,1, ss.getLastRow()-1, ss.getLastColumn()).getValues();
    var token = dataLogin.map(function(r){return r[3]; });
    var status = dataLogin.map(function(r){return r[8]; });
    var session = dataLogin.map(function(r){return r[3]; });
    var pos = token.indexOf(data.token);
    console.log(data);
  
  if(pos > -1){
    return {
        status: status[pos], 
        session: session[pos]
    }
  } else {
    return {status:500, message:"failed"};
  }
}

function retrieveDefaultData_(e){
  const ws = SpreadsheetApp.openById(idSs);
  const ss = ws.getSheetByName("control_panel");
  var data = ss.getRange(2,1, ss.getLastRow()-1, ss.getLastColumn()).getDisplayValues();
  var session = data.map(function(r){return r[3]; });
  var name = data.map(function(r){return r[4]; });
  var status = data.map(function(r){return r[8]; });
  var pos = session.indexOf(e.token);
  if(pos > -1){
    return {
      name: name[pos],
      status: status[pos]
    }
  
  } else {
    return {status: false}
  }

}

function retrieveAccountDetails_(e){
  const ws = SpreadsheetApp.openById(idSs);
  const ss = ws.getSheetByName("control_panel");
  var data = ss.getRange(2,1, ss.getLastRow()-1, ss.getLastColumn()).getDisplayValues();
  var email = data.map(function(r){return r[1]; });
  var name = data.map(function(r){return r[4]; });
  var level = data.map(function(r){return r[5]; });
  var dStart = data.map(function(r){return r[6]; });
  var dEnd = data.map(function(r){return r[7]; });
  var status = data.map(function(r){return r[8]; });
  var session = data.map(function(r){return r[3]; });

  var pos = session.indexOf(e.token);
  if(pos > -1){
    return {
      email: email[pos],
      name: name[pos],
      subs: level[pos],
      status: status[pos],
      start_date: dStart[pos],
      expired_date: dEnd[pos]
    };
  }else{
    return {status: false}
  }

}

function changePassword_(e){
  const ws = SpreadsheetApp.openById(idSs);
  const ss = ws.getSheetByName("control_panel");
  var data = ss.getRange(2,1, ss.getLastRow()-1, ss.getLastColumn()).getDisplayValues();
  var session = data.map(function(r){return r[3]; });

  var pos = session.indexOf(e.token);

  if(pos > -1){
    ss.getRange(pos+2, 3, 1, 2).setValues(
      [[
        e.password,
        e.new_token
      ]]
    );

    
    return true;
  } else {
    return false;
  }

}

function registerAccount_(r){
  const ws = SpreadsheetApp.openById(idSs);
  const ss = ws.getSheetByName("control_panel");
  var wsBc = SpreadsheetApp.openById("17iI2N0zcucopNBs69J3SpjDzZigbpNg3XhjFXJ8Wcbc");
  var ssBc = wsBc.getSheetByName("user");

  var data = ss.getRange(2,1, ss.getLastRow()-1, ss.getLastColumn()).getDisplayValues();
  var email = data.map(function(r){return r[1]; });
  var pos = email.indexOf(r.email);

  if(pos > -1){
    return false;
  } else {
    ss.appendRow([
      new Date(),
      r.email,
      r.pass,
      r.loginTokenReg,
      r.devName,
      r.subsType,
      r.startDate
    ]);

    ssBc.appendRow([
      new Date(),
      r.email,
      r.passBc,
      r.loginTokenReg,
      r.devName,
      r.subsType,
      r.startDate
    ]);
    SendEmailDeveloper.sendEmailUser();
    return true;
  }
}