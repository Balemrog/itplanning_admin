import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {ItPlanningApi} from "../api/ItPlanningApi";
import {handleLogError} from "../helpers/ErrorHandler";
import {ROLE} from "../Constant";

export default class Planning extends React.Component {

  resetState = () => {
    this.setState({
      showModal: false,
      selectedEventInfo: null,
      formData: {
        title: '',
        teacher: {
          id: '',
          firstName: '',
        },
        lesson: {
          id: '',
          label: '',
        },
        room: {
          id: '',
          roomName: '',
        },
        schoolClass: {
          id: '',
          label: '',
        },
      },
      isUpdateLessonSession: false,
    });
  }

  state = {
    weekendsVisible: false,
    showModal: false,
    selectedEventInfo: null,
    formData: {
      title: '',
      teacher: {
        id: '',
        firstName: '',
      },
      lesson: {
        id: '',
        label: '',
      },
      room: {
        id: '',
        roomName: '',
      },
      schoolClass: {
        id: '',
        label: '',
      },
    },
    isUpdateLessonSession: false,
    user: this.props.user,
    navigate: this.props.navigate,
    teachers: [],
    lessons: [],
    rooms: [],
    schoolClasses: [],
  }

  handleEventSelectModal = (selectInfo) => {
    this.setState({
      showModal: true,
      selectedEventInfo: selectInfo,
    });
  };

  handleCloseModal = () => {
    this.resetState();
    this.deselectEvent();
  };

  deselectEvent = () => {
    if (this.state.selectedEventInfo) {
      const { view } = this.state.selectedEventInfo;
      if (view && view.calendar) {
        view.calendar.unselect();
      }
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.saveLessonSession(this.state.formData);
  };

  saveLessonSession = async (lessonSessionData) => {
    try {
      const newLessonSession = {
        title: lessonSessionData.title,
        start: this.state.selectedEventInfo.startStr,
        end: this.state.selectedEventInfo.endStr,
        teacher: lessonSessionData.teacher,
        lesson: lessonSessionData.lesson,
        room: lessonSessionData.room,
        schoolClass: lessonSessionData.schoolClass
      };
      if (this.state.isUpdateLessonSession) {
        newLessonSession.id = this.state.selectedEventInfo.id;
      }
      const response = await ItPlanningApi.addOrEditLessonSession(this.state.user, newLessonSession);
      if (response.ok) {
        this.resetState();
        this.fetchEvents();
        this.state.navigate('/');
      } else {
        handleLogError(response.statusText);
      }
    } catch (error) {
      handleLogError(error);
    }
  };

  handleFormChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "select-one") {
      const selectedIndex  = event.target.options.selectedIndex;
      const id = event.target.options[selectedIndex].getAttribute('data-key')
      if (name === "schoolClass") {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData, schoolClass: {
              id: id,
              label: value}
          },
        }));
      } else if (name === "room") {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData, room: {
              id: id,
              roomName: value}
          },
        }));
      } else if (name === "teacher") {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData, teacher: {
              id: id,
              firstName: value}
          },
        }));
      } else if (name === "lesson") {
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData, lesson: {
              id: id,
              label: value}
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      }));
    }
  };

  async fetchEvents() {
    try {
      const response = await ItPlanningApi.getLessonSessions(this.state.user);
      if (response.ok) {
        const responseData = await response.json();
        this.setState({ events: responseData });
      } else {
        handleLogError(response.statusText);
      }
    } catch (error) {
      handleLogError(error);
    }
  }

  componentDidMount() {

    const handleGetTeachers = async () => {
      try {
        const response = await ItPlanningApi.getTeachers(this.state.user)
        if (response.ok) {
          const responseData = await response.json();
          this.setState({ teachers: responseData});
        } else {
          handleLogError(response.statusText);
        }
      } catch (error) {
        handleLogError(error)
      }
    }

    const handleGetLessons = async () => {
      try {
        const response = await ItPlanningApi.getLessons(this.state.user)
        if (response.ok) {
          const responseData = await response.json();
          this.setState({ lessons: responseData});
        } else {
          handleLogError(response.statusText);
        }
      } catch (error) {
        handleLogError(error)
      }
    }

    const handleGetRooms = async () => {
      try {
        const response = await ItPlanningApi.getRooms(this.state.user)
        if (response.ok) {
          const responseData = await response.json();
          this.setState({ rooms: responseData});
        } else {
          handleLogError(response.statusText);
        }
      } catch (error) {
        handleLogError(error)
      }
    }

    const handleGetSchoolClasses = async () => {
      try {
        const response = await ItPlanningApi.getSchoolClasses(this.state.user)
        if (response.ok) {
          const responseData = await response.json();
          this.setState({ schoolClasses: responseData});
        } else {
          handleLogError(response.statusText);
        }
      } catch (error) {
        handleLogError(error)
      }
    }

    this.fetchEvents();
    handleGetTeachers();
    handleGetLessons();
    handleGetRooms();
    handleGetSchoolClasses();
  };

  render() {
    return (
        <div className='demo-app'>
          <div className='demo-app-main'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='timeGridWeek'
                editable={this.state.user.role === ROLE.SERVICE_PLANNING}
                selectable={this.state.user.role === ROLE.SERVICE_PLANNING}
                selectMirror={true}
                dayMaxEvents={true}
                locale={'fr'}
                allDayText={'Toute la journée'}
                allDaySlot={false}
                weekNumbers={true}
                weekText={'Sem.'}
                navLinks={true}
                slotMinTime={'08:00:00'}
                slotMaxTime={'18:00:00'}
                expandRows={true}
                buttonText={{
                  today: 'Aujourd\'hui',
                  month: 'Mois',
                  week: 'Semaine',
                  day: 'Jour'
                }}
                weekends={this.state.weekendsVisible}
                events={this.state.events}
                select={this.handleEventSelectModal}
                eventContent={renderEventContent} // custom render function
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
            />
            <Modal isOpen={this.state.showModal} toggle={this.handleCloseModal} size='lg'>
              <ModalHeader>Ajouter un événement</ModalHeader>
              <Form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <Label for="title">Titre</Label>
                    <Input type="text" name="title" id="title" value={this.state.formData.title || ''} onChange={this.handleFormChange} autoComplete="label" required/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="teacher">Enseignant</Label>
                    <Input type="select" name="teacher" id="teacher" value={this.state.formData.teacher.firstName || ''} onChange={this.handleFormChange} required>
                      <option value="">Sélectionnez un enseignant</option>
                      {this.state.teachers.map((teacher) => (
                          <option key={teacher.id} data-key={teacher.id} value={teacher.firstName}>
                            {`${teacher.firstName} ${teacher.lastName}`}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="lesson">Cours</Label>
                    <Input type="select" name="lesson" id="lesson" value={this.state.formData.lesson.label || ''} onChange={this.handleFormChange} required>
                      <option value="">Sélectionnez un cours</option>
                      {this.state.lessons.map((lesson) => (
                          <option key={lesson.id} data-key={lesson.id} value={lesson.label}>
                            {lesson.label}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="room">Salle</Label>
                    <Input type="select" name="room" id="room" value={this.state.formData.room.roomName || ''} onChange={this.handleFormChange} required>
                      <option value="">Sélectionnez une salle</option>
                      {this.state.rooms.map((room) => (
                          <option key={room.id} data-key={room.id} value={room.roomName}>
                            {room.roomName}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="schoolClass">Promotion</Label>
                    <Input type="select" name="schoolClass" id="schoolClass" value={this.state.formData.schoolClass.label || ''} onChange={this.handleFormChange} required>
                      <option value="">Sélectionnez une promotion</option>
                      {this.state.schoolClasses.map((schoolClass) => (
                          <option key={schoolClass.id} data-key={schoolClass.id} value={schoolClass.label}>
                            {schoolClass.label}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">{this.state.isUpdateLessonSession ? 'Modifier' : 'Ajouter'}</Button>
                  {this.state.isUpdateLessonSession && (
                      <Button color="danger" onClick={this.handleDeleteLessonSession}>
                        Supprimer
                      </Button>
                  )}
                  <Button color="secondary" onClick={this.handleCloseModal}>Annuler</Button>
                </ModalFooter>
              </Form>
            </Modal>
          </div>
        </div>
    )
  }

  handleDeleteLessonSession = () => {
    const remove = async (id) => {
      try {
        const response = await ItPlanningApi.deleteLessonSession(this.state.user, id)
        if (response.ok) {
          await this.fetchEvents();
        } else {
          handleLogError(response.statusText);
        }
      } catch (error) {
        handleLogError(error)
      }
    }
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'événement : '${this.state.selectedEventInfo.title}'`)) {
      remove(this.state.selectedEventInfo.id)
      this.state.selectedEventInfo.remove()
      this.handleCloseModal();
    }
  };

  handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const { lesson, room, schoolClass, teacher } = event.extendedProps;
    this.setState({
      showModal: true,
      selectedEventInfo: event,
      formData: {
        title: event.title,
        lesson: lesson,
        room: room,
        schoolClass: schoolClass,
        teacher: teacher,
      },
      isUpdateLessonSession: true,
    });
  }

  handleEvents = (events) => {
    this.setState({
      // TODO
    })
  }

}

function renderEventContent(eventInfo) {
  return (
      <div className='fc-event-main-frame'>
        <b>{eventInfo.timeText}</b>
        <div className='fc-event-title-container'>
          <div className='fc-event-title fc-sticky'>{eventInfo.event.title}</div>
          {Object.keys(eventInfo.event.extendedProps).length > 0 && (
              <div className='fc-event-teacher'>{eventInfo.event.extendedProps.teacher.firstName}</div>
          )}
          {Object.keys(eventInfo.event.extendedProps).length > 0 && (
              <div className='fc-event-lesson'>{eventInfo.event.extendedProps.lesson.label}</div>
          )}
          {Object.keys(eventInfo.event.extendedProps).length > 0 && (
              <div className='fc-event-room'>{eventInfo.event.extendedProps.room.roomName}</div>
          )}
          {Object.keys(eventInfo.event.extendedProps).length > 0 && (
              <div className='fc-event-schoolClass'>{eventInfo.event.extendedProps.schoolClass.label}</div>
          )}
        </div>
      </div>
  )
}