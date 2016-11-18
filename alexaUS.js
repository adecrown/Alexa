'use strict';

/**
* This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
* The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
* testing instructions are located at http://amzn.to/1LzFrj6
*
* For additional samples, visit the Alexa Skills Kit Getting Started guide at
* http://amzn.to/1LGWsLG
*/


// --------------- Helpers that build all of the responses -----------------------

var orders=[];
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output,
    },
    card: {
      type: 'Simple',
      title: `SessionSpeechlet - ${title}`,
      content: `SessionSpeechlet - ${output}`,
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText,
      },
    },
    shouldEndSession,
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: '1.0',
    sessionAttributes,
    response: speechletResponse,
  };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
  // If we wanted to initialize the session to have some attributes we could add those here.
  orders=[];
  const sessionAttributes = {};
  const cardTitle = 'Hello';
  const speechOutput = 'Can I please take your order. ' +
  'Please tell me your order by saying, can I have a coke';
  // If the user either does not reply to the welcome message or says something that is not
  // understood, they will be prompted again with this text.
  const repromptText = 'Please tell me your order by saying, ' +
  'can I have a large coke';
  const shouldEndSession = false;
  
  callback(sessionAttributes,
    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
  }
  
  
  
  function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you and have a nice day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;
    
    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
  }
  
  
  
  
  function createOrderAttributes(item,session) {
    
    return {
      orders,
      item
    };
    
  }
  
  
  
  
  /**
  * Sets the order in the session and prepares the speech to reply to the user.
  */
  function createOrderInSession(intent, session, callback) {
    const cardTitle = intent.name;
    //const orderSlot = intent.slots.Order;
    const itemSlot = intent.slots.Items;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';
    
    if (itemSlot) {
      const item = itemSlot.value;
      orders.push(item);
      sessionAttributes = createOrderAttributes(item,session);
      
      
      
      
      
      speechOutput = `${item} added. You can add more by saying ` +
      "plus";
      repromptText = "Is that all you need?";
      
      
    } else {
      speechOutput = `We currently do not have that item. Please try again .`;
      repromptText = "The item your ordered was not added. You can add a new " +
      'item by saying, plus coke';
    }
    
    callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
    
    
    
    
    
    
    
    
    /**
    * Sets the order in the session and prepares the speech to reply to the user.
    */
    function removeItemInSession(intent, session, callback) {
      const cardTitle = intent.name;
      //const orderSlot = intent.slots.Order;
      const itemSlot = intent.slots.Items;
      let repromptText = '';
      let sessionAttributes = {};
      const shouldEndSession = false;
      let speechOutput = '';
      
      if (itemSlot) {
        const item = itemSlot.value;
        
        
        var index = orders.indexOf(item);
        if (index > -1) {
          orders.splice(index, 1);
          speechOutput = `${item} removed.`;
          repromptText = "Is that all you need?";
        }
        else
        {
          speechOutput = `This item is currently not in your order.`;
          repromptText = "This item is currently not in your order";
        }
        
        sessionAttributes = createOrderAttributes(item,session);
        
        
        
        
        
      } else {
        speechOutput = `This item is currently not in your order.`;
        repromptText = "This item is currently not in your order";
      }
      
      callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
      }
      
      
      
      
      
      function removeOrderInSession(intent, session, callback)
      {
        
        const sessionAttributes = {};
        let shouldEndSession = false;
        let speechOutput = '';
        const repromptText = '';
        
        orders = [];
        
        speechOutput = "Your order has been cancelled.";
        
        
        callback(sessionAttributes,
          buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
        }
        
        
        
        
        
        function continueOrderInSession(intent, session, callback) {
          const cardTitle = intent.name;
          //const orderSlot = intent.slots.Order;
          const itemSlot = intent.slots.Items;
          let repromptText = '';
          let sessionAttributes = {};
          const shouldEndSession = false;
          let speechOutput = '';
          
          if (itemSlot) {
            const item = itemSlot.value;
            orders.push(item);
            sessionAttributes = createOrderAttributes(item,session);
            
            
            
            
            
            speechOutput = `${item} added`;
            repromptText = "Is that all you need?";
            
            
          } else {
            speechOutput = `We currently do not have that item. Please try again .`;
            repromptText = "The item your ordered was not added. You can add a new " +
            'item by saying, add coke';
          }
          
          callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
          }
          
          
          
          
          
          
          
          
          
          
          
          function getOrderFromSession(intent, session, callback) {
            let orderList;
            let repromptText = '';
            const sessionAttributes = {};
            let shouldEndSession = false;
            let speechOutput = '';
            
            if (session.attributes) {
              orderList = session.attributes.orders;
            }
            
            if (orderList) {
              speechOutput = `The following items are in your order list: ${orderList}.`;
              repromptText = "Is that all you need?";
              //shouldEndSession = true;
            } else {
              speechOutput = "Your order is empty, you can add to it by saying, add Coke";
            }
            
            // Setting repromptText to null signifies that we do not want to reprompt the user.
            // If the user does not respond or says something that is not understood, the session
            // will end.
            callback(sessionAttributes,
              buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
            }
            
            
            
            
            function finalOrderYes(intent, session, callback)
            {
              const repromptText = null;
              const sessionAttributes = {};
              let shouldEndSession = false;
              let speechOutput = '';
              
              speechOutput = "Your order is now processed, Please move forward to pick them up. Goodbye. Come Again.";
              orders=[];
              shouldEndSession = true;
              callback(sessionAttributes,
                buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
              }
              
              
              function finalOrderNo(intent, session, callback)
              {
                
                const sessionAttributes = {};
                let shouldEndSession = false;
                let speechOutput = '';
                let repromptText = '';
                
                speechOutput = "Ok, please continue.";
                repromptText = "Is that all you need?";
                
                callback(sessionAttributes,
                  buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
                }
                
                
                
                
                // --------------- Events -----------------------
                
                /**
                * Called when the session starts.
                */
                function onSessionStarted(sessionStartedRequest, session) {
                  console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
                }
                
                /**
                * Called when the user launches the skill without specifying what they want.
                */
                function onLaunch(launchRequest, session, callback) {
                  console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
                  
                  // Dispatch to your skill's launch.
                  getWelcomeResponse(callback);
                }
                
                /**
                * Called when the user specifies an intent for this skill.
                */
                function onIntent(intentRequest, session, callback) {
                  console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);
                  
                  const intent = intentRequest.intent;
                  const intentName = intentRequest.intent.name;
                  
                  // Dispatch to your skill's intent handlers
                  if (intentName === 'MyOrderIsIntent') {
                    createOrderInSession(intent, session, callback);
                  } else if (intentName === 'WhatsMyOrderIntent') {
                    getOrderFromSession(intent, session, callback);
                  } else if (intentName === 'AndContinueOrder') {
                    continueOrderInSession(intent, session, callback);
                  }
                  else if (intentName === 'CheckOrderIsDoneYes') {
                    finalOrderYes(intent, session, callback);
                  }
                  else if (intentName === 'CheckOrderIsDoneNo') {
                    finalOrderNo(intent, session, callback);
                  }
                  else if (intentName === 'RemoveItemIntent') {
                    removeItemInSession(intent, session, callback);
                  }
                  else if (intentName === 'RemoveOrderIntent') {
                    removeOrderInSession(intent, session, callback);
                  }
                  else if (intentName === 'AMAZON.HelpIntent') {
                    getWelcomeResponse(callback);
                  } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
                    handleSessionEndRequest(callback);
                  } else {
                    throw new Error('Invalid intent');
                  }
                }
                
                /**
                * Called when the user ends the session.
                * Is not called when the skill returns shouldEndSession=true.
                */
                function onSessionEnded(sessionEndedRequest, session) {
                  console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
                  // Add cleanup logic here
                }
                
                
                // --------------- Main handler -----------------------
                
                // Route the incoming request based on type (LaunchRequest, IntentRequest,
                // etc.) The JSON body of the request is provided in the event parameter.
                exports.handler = (event, context, callback) => {
                  try {
                    console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);
                    
                    /**
                    * Uncomment this if statement and populate with your skill's application ID to
                    * prevent someone else from configuring a skill that sends requests to this function.
                    */
                    /*
                    if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
                    callback('Invalid Application ID');
                  }
                  */
                  
                  if (event.session.new) {
                    onSessionStarted({ requestId: event.request.requestId }, event.session);
                  }
                  
                  if (event.request.type === 'LaunchRequest') {
                    onLaunch(event.request,
                      event.session,
                      (sessionAttributes, speechletResponse) => {
                        callback(null, buildResponse(sessionAttributes, speechletResponse));
                      });
                    } else if (event.request.type === 'IntentRequest') {
                      onIntent(event.request,
                        event.session,
                        (sessionAttributes, speechletResponse) => {
                          callback(null, buildResponse(sessionAttributes, speechletResponse));
                        });
                      } else if (event.request.type === 'SessionEndedRequest') {
                        onSessionEnded(event.request, event.session);
                        callback();
                      }
                    } catch (err) {
                      callback(err);
                    }
                  };
