import {config} from "../EnvConfig";

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
    getDemands,
    deleteDemand,
    addOrEditDemand,
};

function authenticate(username, password) {
    return fetch(`${config.url.API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
}

function getTeachers(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/admin/teachers/${id}` : `${config.url.API_BASE_URL}/api/admin/teachers`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteTeacher(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/teachers/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditTeacher(user, teacher) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/teachers${teacher.id ? `/${teacher.id}` : ''}`, {
        method: (teacher.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(teacher),
    });
}

function getCampuses(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/admin/campuses/${id}` : `${config.url.API_BASE_URL}/api/admin/campuses`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteCampus(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/campuses/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditCampus(user, campus) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/campuses${campus.id ? `/${campus.id}` : ''}`, {
        method: (campus.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(campus),
    });
}

function getFormations(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/admin/formations/${id}` : `${config.url.API_BASE_URL}/api/admin/formations`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteFormation(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/formations/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditFormation(user, formation) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/formations${formation.id ? `/${formation.id}` : ''}`, {
        method: (formation.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(formation),
    });
}

function getSchoolClasses(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/admin/school-classes/${id}` : `${config.url.API_BASE_URL}/api/admin/school-classes`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteSchoolClass(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/school-classes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditSchoolClass(user, schoolClass) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/school-classes${schoolClass.id ? `/${schoolClass.id}` : ''}`, {
        method: (schoolClass.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(schoolClass),
    });
}

function getRooms(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/admin/rooms/${id}` : `${config.url.API_BASE_URL}/api/admin/rooms`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteRoom(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/rooms/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditRoom(user, room) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/rooms${room.id ? `/${room.id}` : ''}`, {
        method: (room.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(room),
    });
}

function getStudents(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/admin/students/${id}` : `${config.url.API_BASE_URL}/api/admin/students`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteStudent(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/students/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditStudent(user, student) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/students${student.id ? `/${student.id}` : ''}`, {
        method: (student.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(student),
    });
}

function getLessons(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/admin/lessons/${id}` : `${config.url.API_BASE_URL}/api/admin/lessons`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteLesson(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/lessons/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditLesson(user, lesson) {
    return fetch(`${config.url.API_BASE_URL}/api/admin/lessons${lesson.id ? `/${lesson.id}` : ''}`, {
        method: (lesson.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(lesson),
    });
}

function getDemands(user, id) {
    const url = id ? `${config.url.API_BASE_URL}/api/demands/${id}` : `${config.url.API_BASE_URL}/api/demands`;
    return fetch(url, {
        headers: {
            'Authorization': basicAuth(user),
        },
    });
}

function deleteDemand(user, id) {
    return fetch(`${config.url.API_BASE_URL}/api/demands/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
    });
}

function addOrEditDemand(user, demand) {
    return fetch(`${config.url.API_BASE_URL}/api/demands${demand.id ? `/${demand.id}` : ''}`, {
        method: (demand.id) ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth(user),
        },
        body: JSON.stringify(demand),
    });
}

function basicAuth(user) {
    return `Basic ${user.authData}`;
}