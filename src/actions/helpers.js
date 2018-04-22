export function sendAndRetrieve(msg, ws) {
    return new Promise(resolve => {
        ws.onmessage = msg => {
            resolve(JSON.parse(msg.data));
        }
        if (ws.readyState !== 1) {
            ws.onopen = (evt) => ws.send(msg);
        }
        else {
            ws.send(msg);
        }
    });
}