//import and setup axios
import axios from 'axios';
import { headers, outputError, API_TOKEN, BASE_URL } from './token';

export default {
    //subscriptions to classes
    unsubscribe(context, id) {},

    updateCourseProgress(context, courseId, payload, callback) {
        axios
            .put(BASE_URL + `users/updatecourseprogress/${courseId}`, payload, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    getCourseProgress(context, courseId, callback) {
        axios
            .get(BASE_URL + `users/getcourseprogress/${courseId}`, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    //status of classes
    //returns all classes in progress
    inProgress(context) {
        axios
            .get(BASE_URL + `courses/coursesinprogress`, headers())
            .then(response => {
                context.$store.dispatch('updateClassesInProgress', response.data.data);
            })
            .catch(error => outputError(error));
    },

    //returns recommended classes
    recList(context) {
        axios
            .get(BASE_URL + `courses/reclist`, headers())
            .then(response => {
                console.log(response);
                context.$store.dispatch('updateRecList', response.data.data);
            })
            .catch(error => outputError(error));
    },

    //returns all master classes in progress
    masterClasses(context) {
        axios
            .get(BASE_URL + `courses/masterclassesforuser`, headers())
            .then(response => {
                context.$store.dispatch('updateMasterClasses', response.data.data);
            })
            .catch(error => outputError(error));
    },

    //returns all completed classes
    completed(context) {
        axios
            .get(BASE_URL + `courses/coursescompleted`, headers())
            .then(response => {
                context.$store.dispatch('updateCompletedClasses', response.data.data);
            })
            .catch(error => outputError(error));
    },

    classDetails(context, id, cbErr, cb) {
        axios
            .get(BASE_URL + 'courses/' + id, headers())
            .then(response => {
                context.$store.dispatch('updateActiveCourse', response.data.data);
                cb(response.data.data);
            })
            .catch(error => cbErr(error));
    },

    updateAHA(context, course) {
        let _this = this;
        let promise = new Promise((resolve, reject) => {
            axios
                .post(BASE_URL + 'courses/aha', course, headers())
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
        return promise;
    },
    
    getAHA(context, course, cbErr, cb) {
        axios
            .get(BASE_URL + 'courses/aha/'+course, headers())
            .then(response => {
                context.$store.dispatch('updateAHACourse', response.data.data);
                cb(response.data.data);
            })
            .catch(error => cbErr(error));
    },

    searchClasses(context, terms, cb) {
        axios
            .get(BASE_URL + 'courses/search?terms=' + terms, headers())
            .then(response => {
                context.$store.dispatch('updateSearchResults', response.data.data);
                cb({ status: 'success', data: response.data.data });
            })
            .catch(error => cb({ status: 'error', data: error }));
    },

    classesByTopic(context, topic, cb) {
        console.log('getting classes by topic');
        axios
            .get(BASE_URL + 'courses/topics/' + topic, headers())
            .then(response => {
                context.$store.dispatch('updateClassesByTopic', {
                    topic: topic,
                    data: response.data.data
                });
                cb(response.data.data);
            })
            .catch(error => outputError(error));
    },

    featuredClasses(context) {
        axios
            .get(BASE_URL + 'courses/featured', headers())
            .then(response => {
                context.$store.dispatch('updateFeaturedClasses', response.data.data);
            })
            .catch(error => outputError(error));
    },

    recentClasses(context, cb) {
        axios
            .get(BASE_URL + 'courses', headers())
            .then(response => {
                context.$store.dispatch('updateClasses', response.data.data);
                cb(response.data.data);
            })
            .catch(error => outputError(error));
    },

    highestRated(context, cb) {
        axios
            .get(BASE_URL + 'courses/highestrated', headers())
            .then(response => {
                console.log(response.data.data);
                context.$store.dispatch('updateClasses', response.data.data);
                cb(response.data.data);
            })
            .catch(error => outputError(error));
    },

    mostPopular(context, cb) {
        axios
            .get(BASE_URL + 'courses/mostpopular', headers())
            .then(response => {
                console.log(response.data.data);
                context.$store.dispatch('updateClasses', response.data.data);
                cb(response.data.data);
            })
            .catch(error => outputError(error));
    },

    lessonsForClass(context, classId, callback) {
        axios
            .get(BASE_URL + `lessons/course/${classId}`, headers())
            .then(response => {
                //context.$store.dispatch('updateClasses', response.data.data);
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    listPodcasts(context, callback) {
        axios
            .get(BASE_URL + `courses/podcasts`)
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    podcastDetail(context, id, callback) {
        axios
            .get(BASE_URL + `courses/podcasts/${id}`)
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    //Meta
    updateViewCount(context, classId, callback) {
        console.log('updating view count......');
        axios
            .post(BASE_URL + `courses/updateviewcount/${classId}`, {}, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    //Notes Section
    classNotes(context, classId, callback) {
        axios
            .get(BASE_URL + `notes/class/${classId}`, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    addNote(context, payload, callback) {
        axios
            .post(BASE_URL + 'notes', payload, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    deleteNoteForLesson(context, noteId, callback) {},

    editNoteForLesson(context, payload, callback) {},

    //Review Section
    addReviewForClass(context, payload) {
        let _this = this;
        let promise = new Promise((resolve, reject) => {
            axios
                .post(BASE_URL + 'reviews', payload, headers())
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
        return promise;
    },

    //master classes
    recentMasterClasses(context, cb) {
        axios
            .get(BASE_URL + 'courses/master', headers())
            .then(response => {
                cb(response.data.data);
            })
            .catch(error => outputError(error));
    },

    purchaseMasterClass(context, courseId) {
        let _this = this;
        let promise = new Promise((resolve, reject) => {
            axios
                .post(BASE_URL + 'courses/purchasemasterclass', { course: courseId }, headers())
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
        return promise;
    },

    //saved for later
    getSavedForLater(context) {
        axios
            .get(BASE_URL + 'courses/savedforlater', headers())
            .then(response => {
                context.$store.dispatch('updateSavedClasses', response.data.data);
            })
            .catch(error => outputError(error));
    },

    addSavedForLater(context, payload) {
        let _this = this;
        axios
            .post(BASE_URL + 'courses/addsavedforlater', payload, headers())
            .then(response => {
                _this.getSavedForLater(context);
            })
            .catch(error => outputError(error));
    },

    removeSavedForLater(context, courseId) {
        let _this = this;
        axios
            .delete(BASE_URL + 'courses/removesavedforlater/' + courseId, headers())
            .then(response => {
                _this.getSavedForLater(context);
            })
            .catch(error => outputError(error));
    }
};
