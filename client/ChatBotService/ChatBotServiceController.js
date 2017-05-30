/**
 * Created by Parthiban.Sudhaman on 28-May-17.
 */
({
    postUserChat: function(component, event, helper){
        if(event.getParams().keyCode !== 13){
            return;
        }
        var chatList = component.get("v.chatList");
        var action = component.get("c.postChatText");
        chatList.push({"chatText": component.get("v.userChat"), "userName": 'Me: '});
        action.setParams({"chatText": component.get("v.userChat")});
        component.set("v.userChat", "");
        action.setCallback(this, function(response){
            var data = JSON.parse(response.getReturnValue());
            chatList.push({"chatText": data.result.fulfillment.speech, "userName": 'Personal Assistant: '});
            component.set("v.chatList", chatList);
            var navigateUrl = "";
            if(!data.result.actionIncomplete && data.result.action === 'OPEN_SCREEN'){
                switch(data.result.parameters.SFObjectEntities){
                    case 'Opportunity':
                        navigateUrl = "/006/o";
                        break;
                    case 'Lead':
                        navigateUrl = "/00Q/o";
                        break;
                    case 'Task':
                        navigateUrl = "00T/o";
                        break;
                    default:
                        navigateUrl = "";
                        break;

                }
                navigateUrl && $A.get("e.force:navigateToURL").setParams({
                  "url": navigateUrl,
                  "isredirect": false
                }).fire();
            }
        });
        $A.enqueueAction(action);
    }
})



