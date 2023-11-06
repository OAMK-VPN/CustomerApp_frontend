const credentials = [
    {
      userName: "driver1",
      password: "aaa",

    },
    {
      userName: "driver2",
      password: "bbb",

    },
    {
        userName: "driver3",
        password: "ccc",
  
      },
    
  ];
  
  export const getCredential = (userName) => {
    return credentials.find((credential) => credential.userName === userName);
  };
  
  export const getAllCredentials = () => {
    return credentials;
  };
  