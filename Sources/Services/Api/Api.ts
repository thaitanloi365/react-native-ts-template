import Network from "../Network/Network";
export type NetworkPromiseResponse<T> = Promise<T>;

function login<T>(email: string, password: string): NetworkPromiseResponse<T> {
  const body = { email, password };
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest<T>("/app/api/login", "POST", body)
      .then(response => {
        console.log("response", response);
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        console.warn(error);
        reject("Login failed");
      });
  });
}

function extendToken<T>(token: string): NetworkPromiseResponse<T> {
  const body = { token };
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest<T>("/app/api/login", "POST", body)
      .then(response => {
        console.log("response", response);
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        console.warn(error);
        reject("Login failed");
      });
  });
}

function getHomeFacilitiesComming<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.authorizedRequest<T>("/app/api/home/facilities/coming", "GET")
      .then(response => {
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        reject("Login failed");
      });
  });
}

function getHomeFacilitiesAvailable<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.authorizedRequest<T>("/app/api/home/facilities/available", "GET")
      .then(response => {
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        reject("Login failed");
      });
  });
}

function getFacilitiesComming<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.authorizedRequest<T>("/app/api/facilities/home/coming", "GET")
      .then(response => {
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        reject("Login failed");
      });
  });
}

function getFacilitiesFavourite<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.authorizedRequest<T>("/app/api/facilities/home/favourite", "GET")
      .then(response => {
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        reject("Login failed");
      });
  });
}

function getFacilitiesAll<T>(): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.authorizedRequest<T>("/app/api/facilities/home/all", "GET")
      .then(response => {
        const data = response.data;
        resolve(data);
      })
      .catch(error => {
        reject("Login failed");
      });
  });
}

export default {
  login,
  extendToken,
  getFacilitiesAll,
  getFacilitiesComming,
  getFacilitiesFavourite,
  getHomeFacilitiesAvailable,
  getHomeFacilitiesComming
};
