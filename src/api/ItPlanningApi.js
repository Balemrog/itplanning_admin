export const ItPlanningApi = {
    authenticate,
    getTeachers,
};

function authenticate(username, password) {
    return fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
}

function getTeachers(user, id) {
    const url = id ? `/api/teachers/${id}` : '/api/teachers';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function basicAuth(user) {
    return `Basic ${user.authData}`;
}