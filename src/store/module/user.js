const user = {
  namespaced: true,
  state: {
    name: "",
    email: "",
    token: ""
  },

  actions: {
    setUser({ commit }, payload) {
      commit("SET_USER", payload)
    },
    removeToken({ commit }) {
      commit("REMOVE_TOKEN")
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, payload) {
      state.token = payload.token
      state.email = payload.email
      state.name = payload.name
    },
    REMOVE_TOKEN(state) {
      state.token = null
    }
  }
}

export default user
