class MockHttp {
  post(payload) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const paramName = "user_name";
        const userName = payload[paramName] || "";
        if (userName.toUpperCase().startsWith("B")) {
          reject({
            paramName,
            paramMessage: "Already exists"
          });
        }
        resolve({
          message: "Account created successfully"
        });
      }, 100);
    });
  }
}

export default new MockHttp();
