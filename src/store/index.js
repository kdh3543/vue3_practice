import { createStore } from "vuex";

export default createStore({
    state: {
        toastMessage: '',
        showToast: false,
        timeOut: null,
        toastAlertType: '',
        counter: 0
    }
})