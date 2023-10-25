import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {createEventId} from "./event-utils"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {ItPlanningApi} from "../api/ItPlanningApi";
import {handleLogError} from "../helpers/ErrorHandler";

export default class Planning extends React.Component {

  state = {
    weekendsVisible: false,
    showModal: false,
    selectedEventInfo: null,
    formData: {
      title: '',
      teacher: '',
      lesson: '',
      room: '',
      schoolClass: '',
    },
    // Pour savoir si on modifie le cours (pas en création)
    updateLesson: false,
    user: this.props.user,
    navigate: this.props.navigate,
    teachers: { data: [] },
    lessons: { data: [] },
    rooms: { data: [] },
    schoolClasses: { data: [] },
  }

  // Méthode pour afficher la modal
  handleEventSelectModal = (selectInfo) => {
    // Collectez les informations nécessaires pour créer un nouvel événement et affichez la modal
    this.setState({
      showModal: true,
      selectedEventInfo: selectInfo,
    });
  };

  // Méthode pour fermer la modal
  handleCloseModal = () => {
    // On reset les données
    this.setState({
      showModal: false,
      selectedEventInfo: null,
      formData: {
        title: '',
        teacher: '',
        lesson: '',
        room: '',
        schoolClass: '',
      },
      updateLesson: false,
    });
    // Au cas où on quitte sans cliquer nul part avec la touche Echap, on déselectionne l'évènnement
    this.deselectEvent();
  };

  // Désélectionnez la plage horaire
  deselectEvent = () => {
    if (this.state.selectedEventInfo) {
      const { view } = this.state.selectedEventInfo;
      if (view && view.calendar) {
        view.calendar.unselect();
      }
    }
  };

  // Méthode pour sauvegarder le cours (ajout ou modification) on peut utiliser le hook d'état updateLesson
  // si on veut faire une instruction différente dans le cas d'une modification
  handleSubmit = (event) => {
    event.preventDefault();
    // if (this.state.updateLesson) {
    //
    // } else {
    //   this.saveLessonSession(this.state.formData);
    // }
    this.saveLessonSession(this.state.formData);
  };

  saveLessonSession = async (lessonSessionData) => {
    try {
      console.log(lessonSessionData.title)
      const newLessonSession = {
        title: lessonSessionData.title,
        start: this.state.selectedEventInfo.startStr,
        end: this.state.selectedEventInfo.endStr,
        teacher: lessonSessionData.teacher,
        lesson: lessonSessionData.lesson,
        room: lessonSessionData.room,
        schoolClass: lessonSessionData.schoolClass
      };

      const response = await ItPlanningApi.addOrEditLessonSession(this.state.user, newLessonSession);
      if (response.ok) {
        this.setState({
          showModal: false,
          selectedEventInfo: null,
          formData: {
            title: '',
            teacher: '',
            lesson: '',
            room: '',
            schoolClass: '',
          },
          updateLesson: false,
        });
        this.fetchEvents();
        this.state.navigate('/');
      } else {
        handleLogError(response.statusText);
      }
    } catch (error) {
      handleLogError(error);
    }
  };

  handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  async fetchEvents() {
    try {
      const response = await ItPlanningApi.getLessonSessions(this.state.user); // Replace 'getEvents' with your actual API call
      if (response.ok) {
        const responseData = await response.json();
        // Assuming your response data is an array of event objects, update your state with it
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
          // Handle errors if the response status is not in the 200 range
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
          // Handle errors if the response status is not in the 200 range
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
          // Handle errors if the response status is not in the 200 range
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
          // Handle errors if the response status is not in the 200 range
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
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                locale={'fr'}
                allDayText={'Toute la journée'}
                allDaySlot={true}
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
                    <Input type="text" name="title" id="title" value={this.state.formData.title || ''} onChange={this.handleFormChange} autoComplete="label"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="teacher">Enseignant</Label>
                    <Input type="select" name="teacher" id="teacher" value={this.state.formData.teacher || ''} onChange={this.handleFormChange}>
                      <option value="">Sélectionnez un enseignant</option>
                      {this.state.teachers.data.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {`${teacher.firstName} ${teacher.lastName}`}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="lesson">Cours</Label>
                    <Input type="select" name="lesson" id="lesson" value={this.state.formData.lesson || ''} onChange={this.handleFormChange}>
                      <option value="">Sélectionnez un cours</option>
                      {this.state.lessons.data.map((lesson) => (
                          <option key={lesson.id} value={lesson.id}>
                            {lesson.label}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="room">Salle</Label>
                    <Input type="select" name="room" id="room" value={this.state.formData.room || ''} onChange={this.handleFormChange}>
                      <option value="">Sélectionnez une salle</option>
                      {this.state.rooms.data.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.roomName}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="schoolClass">Promotion</Label>
                    <Input type="select" name="schoolClass" id="schoolClass" value={this.state.formData.schoolClass || ''} onChange={this.handleFormChange}>
                      <option value="">Sélectionnez une promotion</option>
                      {this.state.schoolClasses.data.map((schoolClass) => (
                          <option key={schoolClass.id} value={schoolClass.id}>
                            {schoolClass.label}
                          </option>
                      ))}
                    </Input>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">{this.state.updateLesson ? 'Modifier' : 'Ajouter'}</Button>
                  {this.state.updateLesson && (
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

  // Inutilisé pour l'instant
  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
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

  // Méthode pour modifier un évènnement
  handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const { lessonDto, roomDto, schoolClassDto, teacherDto } = event.extendedProps;

    console.log(event.title)
    this.setState({
      showModal: true,
      selectedEventInfo: event,
      formData: {
        title: event.title,
        lesson: lessonDto,
        room: roomDto,
        schoolClass: schoolClassDto,
        teacher: teacherDto,
      },
      updateLesson: true,
    });
  }

  // Méthode utilisé seulement dans la paramétrage du calendar par eventsSet, je sais pas trop à quoi ça sert, je m'en sert pas
  handleEvents = (events) => {
    this.setState({
      // a faire
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
              <div className='fc-event-teacher'>{eventInfo.event.extendedProps.teacherDto.firstName}</div>
          )}
          {Object.keys(eventInfo.event.extendedProps).length > 0 && (
              <div className='fc-event-lesson'>{eventInfo.event.extendedProps.lessonDto.label}</div>
          )}
          {Object.keys(eventInfo.event.extendedProps).length > 0 && (
              <div className='fc-event-room'>{eventInfo.event.extendedProps.roomDto.roomName}</div>
          )}
          {Object.keys(eventInfo.event.extendedProps).length > 0 && (
              <div className='fc-event-schoolClass'>{eventInfo.event.extendedProps.schoolClassDto.label}</div>
          )}
        </div>
      </div>
  )
}