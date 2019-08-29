import Vue from "vue";
import Vuex from "vuex";
import Validators from "../utils/validators";

Vue.use(Vuex);

export const state = {
  list: {},
  validations: {}
};

export const mutations = {
  createForm: (state, formName) => {
    const form = { fields: {}, name: formName };
    Vue.set(state.list, formName, form);
  },
  createField: (state, { formName, field }) => {
    Vue.set(state.list[formName].fields, field.name, field);
  },
  deleteForm: (state, formName) => {
    Vue.delete(state.list, formName);
  },
  deleteField: (state, { formName, fieldName }) => {
    Vue.delete(state.list[formName].fields, fieldName);
  },
  updateField: (state, { formName, fieldName, value }) => {
    Vue.set(state.list[formName].fields[fieldName], "value", value);
  },
  setError(state, { formName, fieldName, value }) {
    Vue.set(state.list[formName].fields[fieldName], "errorMsg", value);
  },
  setValidations(state, { formName, validations }) {
    Vue.set(state.validations, formName, { ...validations });
  }
};

export const actions = {
  initForm: ({ commit }, { formName, validations }) => {
    commit("createForm", formName);
    commit("setValidations", { formName, validations });
  },
  initField: ({ commit }, payload) => {
    commit("createField", payload);
  },
  initFormValidations({ commit }, payload) {
    commit("setValidations", payload);
  },
  updateFormInput: ({ commit }, payload) => {
    commit("updateField", payload);
  },
  clearForm({ commit }, formName) {
    commit("deleteForm", formName);
  },
  fieldError({ commit }, payload) {
    commit("setError", payload);
  },
  validateField({ commit, getters }, { formName, fieldName }) {
    const validations = getters.fieldValidations(formName, fieldName);
    const field = getters.formField(formName, fieldName);

    let errorMsg;
    Object.keys(validations).some(key => {
      if (Array.isArray(field.value)) {
        field.value.some(value => {
          errorMsg = Validators.validationWrapper(key, validations, value);
          return errorMsg;
        });
      } else {
        errorMsg = Validators.validationWrapper(key, validations, field.value);
      }
      return !!errorMsg;
    });
    errorMsg
      ? commit("setError", {
          formName,
          fieldName,
          value: errorMsg
        })
      : commit("setError", { formName, fieldName, value: "" });
  },
  validateForm({ dispatch, getters }, formName) {
    const formFields = getters.formFields(formName);
    Object.keys(formFields).forEach(fieldName => {
      dispatch("validateField", { formName, fieldName });
    });
    const invalidFields = getters.invalidFormFields(formName);
    return new Promise((resolve, reject) => {
      !invalidFields.length ? resolve(true) : reject(false);
    });
  }
};

export const getters = {
  formValidations: state => formName => state.validations[formName],
  fieldValidations: state => (formName, fieldName) =>
    state.validations[formName][fieldName],
  formValues: state => formName => {
    return Object.keys(state.list[formName].fields).reduce((fields, field) => {
      fields[field] = state.list[formName].fields[field].value;
      return fields;
    }, {});
  },
  formFields: state => formName => state.list[formName].fields,
  formField: state => (formName, fieldName) =>
    state.list[formName].fields[fieldName],
  invalidFormFields: state => formName => {
    const formFields = state.list[formName].fields;
    return Object.keys(formFields).filter(
      value => !!formFields[value].errorMsg
    );
  }
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters
});
