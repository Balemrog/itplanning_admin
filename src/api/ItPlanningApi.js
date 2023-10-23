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
    getSchoolClasses,
    deleteSchoolClass,
    addOrEditSchoolClass,
    getRooms,
    deleteRoom,
    addOrEditRoom,
    getStudents,
    deleteStudent,
    addOrEditStudent,
    getLessons,
    deleteLesson,
    addOrEditLesson,
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

function getSchoolClasses(user, id) {
    const url = id ? `/api/admin/school-classes/${id}` : '/api/admin/school-classes';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteSchoolClass(user, id) {
    return fetch(`/api/admin/school-classes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditSchoolClass(user, schoolClass) {
    return fetch(`/api/admin/school-classes${schoolClass.id ? `/${schoolClass.id}` : ''}`, {
        method: (schoolClass.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(schoolClass),
    });
}

function getRooms(user, id) {
    const url = id ? `/api/admin/rooms/${id}` : '/api/admin/rooms';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteRoom(user, id) {
    return fetch(`/api/admin/rooms/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditRoom(user, room) {
    return fetch(`/api/admin/rooms${room.id ? `/${room.id}` : ''}`, {
        method: (room.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(room),
    });
}

function getStudents(user, id) {
    const url = id ? `/api/admin/students/${id}` : '/api/admin/students';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteStudent(user, id) {
    return fetch(`/api/admin/students/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditStudent(user, student) {
    return fetch(`/api/admin/students${student.id ? `/${student.id}` : ''}`, {
        method: (student.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(student),
    });
}

function getLessons(user, id) {
    const url = id ? `/api/admin/lessons/${id}` : '/api/admin/lessons';
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteLesson(user, id) {
    return fetch(`/api/admin/lessons/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditLesson(user, lesson) {
    return fetch(`/api/admin/lessons${lesson.id ? `/${lesson.id}` : ''}`, {
        method: (lesson.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(lesson),
    });
}

function basicAuth(user) {
    return `Basic ${user.authData}`;
}