export const ItPlanningApi = {
    authenticate,
    getTeachers,
    deleteTeacher,
    addOrEditTeacher,
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
    const url = id ? `/api/admin/teachers/${id}` : '/api/admin/teachers';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteTeacher(user, id) {
    return fetch(`/api/admin/teachers/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditTeacher(user, teacher) {
    return fetch(`/api/admin/teachers${teacher.id ? `/${teacher.id}` : ''}`, {
        method: (teacher.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(teacher),
    });
}

function basicAuth(user) {
    return `Basic ${user.authData}`;
}