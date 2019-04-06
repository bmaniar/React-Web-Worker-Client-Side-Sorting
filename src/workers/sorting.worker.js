export default function MyWorker(args) {
    this.onmessage = e => {
        if (!e) return;
        let users = e.data;
        for (let i = 0; i < users.length - 1; i++) {
            for (let j = i + 1; j < users.length; j++) {
                if (users[i].id > users[j].id) {
                    const t = users[i];
                    users[i] = users[j];
                    users[j] = t;
                }
            }
        }
        postMessage(users);
    }
}