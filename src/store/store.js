import Vue from "vue"; // Initialize vue and vuex to use the vuex libra
import Vuex from "vuex"; // Vuex for State management
import axios from "axios"; // Axios for handling API request
//import db from "../firebase/firebase"; // use firebase

axios.defaults.baseURL = "http://laravel-todoapp.test/";
axios.defaults.withCredentials = true;

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [],
    loading: true,
    isLoggedIn: localStorage.getItem("isLoggedIn"),
  
  },

  getters: {
    remaining(state) {
      return state.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter((todo) => !todo.completed);
      } else if (state.filter == "completed") {
        return state.todos.filter((todo) => todo.completed);
      }
      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter((todo) => todo.completed).length > 0;
    },

    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },

  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
        timestamp: new Date(),
      });
    },

    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    // mutations

    updateFilter(state, filter) {
      state.filter = filter;
    },
    checkAll(state, checked) {
      state.todos.forEach((todo) => (todo.completed = checked));
    },

    deleteTodo(state, id) {
      const index = state.todos.findIndex((item) => item.id == id);

      if (index >= 0) {
        state.todos.splice(index, 1);
      }
    },

    updateTodo(state, todo) {
      const index = state.todos.findIndex((item) => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
      });
    },

    getTodos(state, todos) {
      state.todos = todos;
    },

    storeCookie(state, value) {
      state.isLoggedIn = value;
    },

    removeCookie(state, value) {
      return (state.isLoggedIn = value);
    },
    
    clearTodos(state) {
      state.todos = [];
    },
    register(state, value) {
      state.isLoggedIn = value;
    },
  },

  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios
            .post("/register", {
              name: data.name,
              email: data.email,
              password: data.password,
              password_confirmation: data.password_confirmation,
            })
            .then(function() {
              localStorage.setItem("isLoggedIn", "true");
              context.commit("register", true);

              resolve(response);
            })
            .catch(function(error) {
           
              reject(error);
            });
        });
      });
    },

    storeCookie(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios
            .post("/login", {
              email: credentials.email,
              password: credentials.password,
            })
            .then(function() {
              localStorage.setItem("isLoggedIn", "true");
              //console.log(response);
              context.commit("storeCookie", true);

              resolve(response);
            })
            .catch(function(error) {
              // console.log(error);
              localStorage.removeItem("isLoggedIn");
             // console.log(error);
              context.commit("removeCookie", false);
             
              
              reject(error);
            });
        });
      });
    },

    clearTodos(context) {
      context.commit("clearTodos");
    },

    removeCookie(context) {
      if (context.getters.isLoggedIn) {
        return new Promise((resolve, reject) => {
          axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
              .post("/logout")
              .then(function() {
                context.commit("removeCookie", false);
                localStorage.removeItem("isLoggedIn");
                resolve(response);
              })
              .catch(function(error) {
                context.commit("removeCookie", false);
                localStorage.removeItem("isLoggedIn");
                console.log(error);
                reject(error);
              });
          });
        });
      }
    },

    // initRealtimeListeners(context) {
    //   db.collection("todos").onSnapshot((snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //       if (change.type === "added") {
    //         // console.log("Added ", change.doc.data());
    //         const source = change.doc.metadata.hasPendingWrites ?
    //           "Local" :
    //           "Server";

    //         if (source === "Server") {
    //           context.commit("addTodo", {
    //             id: change.doc.id,
    //             title: change.doc.data().title,
    //             completed: false,
    //           });
    //         }
    //       }
    //       if (change.type === "modified") {
    //         context.commit("updateTodo", {
    //           id: change.doc.id,
    //           title: change.doc.data().title,
    //           completed: change.doc.data().completed,
    //         });
    //       }

    //       if (change.type === "removed") {
    //         context.commit("deleteTodo", change.doc.id);
    //       }
    //     });
    //   });
    // },

    getTodos(context) {
      axios
        .get("api/todos")
        .then(function(response) {
          context.commit("getTodos", response.data);
          context.state.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });

      // db.collection("todos")
      //   .get()
      //   .then((querySnapshot) => {
      //     let tempTodos = [];
      //     querySnapshot.forEach((doc) => {
      //       console.log(doc.data());

      //       const data = {
      //         id: doc.id,
      //         title: doc.data().title,
      //         completed: doc.data().completed,
      //         timestamp: doc.data().timestamp,
      //       };
      //       tempTodos.push(data);
      //     });

      //     const SortedTodos = tempTodos.sort((a, b) => {
      //       return a.timestamp.seconds - b.timestamp.seconds;
      //     });

      //     context.state.loading = false;
      //     context.commit("getTodos", SortedTodos);
      //   });
    },
    addTodo(context, todo) {
      axios
        .post("api/create/todos", {
          title: todo.title,
          completed: false,
        })
        .then(function(response) {
          context.commit("addTodo", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      // setTimeout(() => {
      //   db.collection("todos")
      //     .add({
      //       title: todo.title,
      //       completed: false,
      //       timestamp: new Date(),
      //     })
      //     .then((docRef) => {
      //       context.commit("addTodo", {
      //         id: docRef.id,
      //         title: todo.title,
      //         completed: todo.completed,
      //       });
      //     });
      // }, 100);
    },

    clearCompleted(context) {
      // for axios
      // Get the ids of checked todos from the store
      const completed = context.state.todos
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);

      axios
        .delete("api/todosDeleteCompleted", {
          data: {
            todos: completed,
          },
        })
        .then(function() {
          context.commit("clearCompleted");
        })
        .catch(function(error) {
          console.log(error);
        });

      // for firebase

      // setTimeout(() => {
      //   db.collection("todos")
      //     .where("completed", "==", true)
      //     .get()
      //     .then((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         doc.ref.delete().then(() => {
      //           context.commit("clearCompleted");
      //         });
      //       });
      //     });
      // }, 100);
    },

    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit("updateFilter", filter);
      }, 100);
    },

    checkAll(context, checked) {
      // for axios
      axios
        .patch("todosCheckAll", {
          completed: checked,
        })

        .then(function() {
          context.commit("checkAll", checked);
        })
        .catch(function(error) {
          console.log(error);
        });

      // for firebase

      // setTimeout(() => {
      //   db.collection("todos")
      //     .get()
      //     .then((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         doc.ref
      //           .update({
      //             completed: checked,
      //           })
      //           .then(() => {
      //             context.commit("checkAll", checked);
      //           });
      //       });
      //     });
      // }, 80);
    },

    deleteTodo(context, id) {
      // for axios
      axios
        .delete("api/delete/todos/" + id)

        .then(function() {
          context.commit("deleteTodo", id);
        })
        .catch(function(error) {
          console.log(error);
        });

      // for firebase
      // setTimeout(() => {
      //   db.collection("todos")
      //     .doc(id)
      //     .delete()
      //     .then(() => {
      //       context.commit("deleteTodo", id);
      //     });
      // }, 100);
    },

    updateTodo(context, todo) {
      // for axios
      axios
        .patch("api/update/todos/" + todo.id, {
          title: todo.title,
          completed: todo.completed,
        })
        .then(function(response) {
          context.commit("updateTodo", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      // for firebase
      // setTimeout(() => {
      //   db.collection("todos")
      //     .doc(todo.id)
      //     .set(
      //       {
      //         id: todo.id,
      //         title: todo.title,
      //         completed: todo.completed,
      //         //  timestamp:new Date()
      //       },
      //       { merge: true }
      //     )
      //     .then(() => {
      //       context.commit("updateTodo", todo);
      //     });
      // }, 100);
    },
  },
});
