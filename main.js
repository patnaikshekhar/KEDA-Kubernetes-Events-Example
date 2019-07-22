const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const WAIT_TIME = 10

const wait = (seconds) => 
    new Promise((resolve, reject) => setTimeout(resolve, seconds * 1000))

const run = async () => {
    while(1) {
        const response = await k8sApi.listNamespacedEvent('kubernetes-events-scaler')
        const events = response.body.items
        if (events.length > 0) {
            const now = new Date()
            let found = false

            events.forEach(event => {
                if (event.lastTimestamp.getTime() > now.getTime() - (WAIT_TIME * 1000)) {
                    found = true
                    console.log(`New Event: ${event.message}, Type: ${event.type}, Reason: ${event.reason}`)
                }
            })

            if (!found) {
                console.log('No new events found')    
            }
        } else {
            console.log('No events found')
        }
        console.log(`Waiting for ${WAIT_TIME} seconds`)
        await wait(WAIT_TIME)
    }
}

run()
