const idSs = "1gsZnv1bgkPDYPR4p-y6C23mRTd7JFG8CQzJzRt5MVI8";


function doGet(){
    const ws = SpreadsheetApp.openById(idSs);
    const ss = ws.getSheetByName("control_panel");
    const data = ss.getRange("A1").getDataRegion().getValues();
    const headers = data.shift();

    const jsonArray = data.map(r =>{
        let obj = {};
        headers.forEach((h, i) =>{
            obj[h] = r[i];
        });
        return obj;
    });

    const response = [{status: "200", data: jsonArray}]

    return sendJSON_(response);



}


function doPost(e) {
    let jsonRes;

    const ws = SpreadsheetApp.openById(idSs);
    const ss = ws.getSheetByName("control_panel");

    const body = JSON.parse(e.postData.contents)

    if(Object.keys(e.parameters).length > 0){
        if(Object.keys(e.parameters)[0] === "sessionToken"){
            if(e.parameters.sessionToken[0].length > 60){
                jsonRes = retrieveDefaultData_(body);
                return sendJSON_(jsonRes);
            }

        }else if(Object.keys(e.parameters)[0] === "retrieveAccount"){
            if(e.parameters.retrieveAccount[0].length > 60){
                jsonRes = retrieveAccountDetails_(body);
                return sendJSON_(jsonRes);
            }
       
        }else if(e.parameter.form == "login_auth"){
                jsonRes = loginUser_(body);
                return sendJSON_(jsonRes);

        }else if(e.parameter.form == "change_password"){
            jsonRes = changePassword_(body);
            return sendJSON_(jsonRes);

        }else if(e.parameter.form == "register_new_account"){
            jsonRes = registerAccount_(body);
            return sendJSON_(jsonRes);
            
        }else if(e.parameter.form == "reset_password"){
            jsonRes = changePassword_(body);
            return sendJSON_(jsonRes);
        }
    }    
}       

function sendJSON_(res){
    return ContentService
    .createTextOutput(JSON.stringify(res))
    .setMimeType(ContentService.MimeType.JSON);
}

