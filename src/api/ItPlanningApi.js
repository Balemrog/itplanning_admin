export const ItPlanningApi = {
    authenticate,
    getTeachers,
    deleteTeacher,
    addOrEditTeacher,
    getCampuses,
    deleteCampus,
    addOrEditCampus,
    getFormations,
    deleteFormation,
    addOrEditFormation,
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

function getCampuses(user, id) {
    const url = id ? `/api/admin/campuses/${id}` : '/api/admin/campuses';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteCampus(user, id) {
    return fetch(`/api/admin/campuses/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditCampus(user, campus) {
    return fetch(`/api/admin/campuses${campus.id ? `/${campus.id}` : ''}`, {
        method: (campus.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(campus),
    });
}

function getFormations(user, id) {
    const url = id ? `/api/admin/formations/${id}` : '/api/admin/formations';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteFormation(user, id) {
    return fetch(`/api/admin/formations/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditFormation(user, formation) {
    return fetch(`/api/admin/formations${formation.id ? `/${formation.id}` : ''}`, {
        method: (formation.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(formation),
    });
}

function basicAuth(user) {
    return `Basic ${user.authData}`;
}