import session from './session.js';
import {logInfoMsg} from './index-invisible.js'
import {logInfoEvent} from './index-invisible.js'
import {displayAgentStatus} from './index-invisible.js'
/**
 * Extends the agent events.
*/
export default function (agent) {
    // Show the CCP container once tthe agent is logged in
    console.log("CDEBUG >> agentEvents");
    
    session.agent = agent;
    agentGreetingDiv.innerHTML = '<h3>Hi ' + agent.getName() + '!</h3>';
    logInfoMsg("Subscribing to events for agent " + agent.getName());
    logInfoMsg("Agent is currently in status of " + agent.getStatus().name);
    displayAgentStatus(agent.getStatus().name);

    //session.agent = agent;
    agent.onRefresh(handleAgentRefresh);
    agent.onStateChange(handleAgentStateChange);
    agent.onRoutable(handleRoutable);
    agent.onNotRoutable(handleNotRoutable);
    agent.onOffline(handleAgentOffline);
    agent.onSoftphoneError(handleSoftphoneError);
    agent.onWebSocketConnectionLost(handleWebSocketConnectionLost);
    agent.onWebSocketConnectionGained(handleWebSocketConnectionGained);
    agent.onAfterCallWork(handleAfterCallWork);

    // Agent handlers
    function handleAgentRefresh(agent) {
        console.debug("CDEBUG >> handleAgentRefresh()");
        logInfoEvent("[agent.onRefresh] Agent data refreshed. Agent status is " + agent.getStatus().name);
        displayAgentStatus(agent.getStatus().name);
    }

    function handleAgentStateChange(agent) {
        console.debug("CDEBUG >> handleAgentStateChange()");
    }

    function handleRoutable(agent) {
        console.debug("CDEBUG >> handleRoutable()");
        logInfoEvent("[agent.onRoutable] Agent is routable. Agent status is " + agent.getStatus().name);
        displayAgentStatus(agent.getStatus().name);
        document.getElementById ('goAvailableDiv').classList.remove("glowingButton");
    }

    function handleNotRoutable(agent) {
        console.debug("CDEBUG >> handleNotRoutable()");
        logInfoEvent("[agent.onNotRoutable] Agent is online, but not routable. Agent status is " + agent.getStatus().name);
        displayAgentStatus(agent.getStatus().name);
    }

    function handleAgentOffline(agent) {
        console.debug("CDEBUG >> handleAgentOffline()");
        logInfoEvent("[agent.onOffline] Agent is offline. Agent status is " + agent.getStatus().name);
        displayAgentStatus(agent.getStatus().name);
        document.getElementById ('goAvailableDiv').classList.add("glowingButton");
    }

    function handleSoftphoneError(agent) {
        console.debug("CDEBUG >> handleSoftphoneError()");
    }

    function handleWebSocketConnectionLost(agent) {
        console.debug("CDEBUG >> handleWebSocketConnectionLost()");
    }

    function handleWebSocketConnectionGained(agent) {
        console.debug("CDEBUG >> handleWebSocketConnectionGained()");
    }

    function handleAfterCallWork(agent) {
        console.debug("CDEBUG >> handleAfterCallWork()");
    }
}
