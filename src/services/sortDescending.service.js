export default function sortListDescending(users) {
    const userData = [...users];
    for (var i = 0; i < userData.length - 1; i++) {
        for (var j = i + 1; j < userData.length; j++) {
            if (userData[i].id < userData[j].id) {
                var t = userData[i];
                userData[i] = userData[j];
                userData[j] = t;
            }
        }
    }
    return userData;
}