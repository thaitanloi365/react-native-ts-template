import Api from "../Api/Api";
import Network from "../Network/Network";
import { UserToken } from "Models";
import { UserStorageActions, getStore } from "ReduxManager";

function logout(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const store = getStore();
    store.dispatch(UserStorageActions.deleteAll());
    resolve(true);
  });
}

function loginAndCreateSession(
  email: string,
  password: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Api.login<UserToken>(email, password)
      .then(response => {
        const { token } = response;
        Network.setToken(token);

        Promise.all([
          // Api.getFacilitiesAll<FaciliesAll>(),
          // Api.getFacilitiesComming<FacilityComming>(),
          // Api.getFacilitiesFavourite<FaciliesFavourite>(),
          // Api.getHomeFacilitiesComming<HomeFacilitiesComming>(),
          // Api.getHomeFacilitiesAvailable<HomeFacilitiesAvailable>()
        ])
          .then(value => {
            const userDatabase = {
              facilitiesAll: value[0],
              facilitiesComming: value[1],
              facilitiesFavourite: value[2],
              homeFacilitiesComming: value[3],
              homeFacilitiesAvailabel: value[4]
            };

            const store = getStore();
            const data = {
              userToken: response,
              userDatabase
            };
            store.dispatch(UserStorageActions.saveAll(data));
            resolve(true);
          })
          .catch(error => {
            reject(false);
            console.log("error", error);
          });
      })
      .catch(error => {
        reject(false);
        console.log("error", error);
      });
  });
}

function createSession(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const store = getStore();
    const { userStorage } = store.getState();
    const { userToken } = userStorage;
    if (userToken) {
      const { token } = userToken;
      Network.setToken(token);
      Promise.all([
        // Api.getFacilitiesAll<FaciliesAll>(),
        // Api.getFacilitiesComming<FacilityComming>(),
        // Api.getFacilitiesFavourite<FaciliesFavourite>(),
        // Api.getHomeFacilitiesComming<HomeFacilitiesComming>(),
        // Api.getHomeFacilitiesAvailable<HomeFacilitiesAvailable>()
      ])
        .then(value => {
          const userDatabase = {
            facilitiesAll: value[0],
            facilitiesComming: value[1],
            facilitiesFavourite: value[2],
            homeFacilitiesComming: value[3],
            homeFacilitiesAvailabel: value[4]
          };
          store.dispatch(UserStorageActions.saveUserDatabase(userDatabase));
          resolve(true);
        })
        .catch(error => {
          reject("Error");
          console.log("error", error);
        });
    } else {
      reject("User not logged");
    }
  });
}

export default {
  logout,
  loginAndCreateSession,
  createSession
};
