const credentials = [
    {
      email: "user1@user.com",
      userName: "user1",
      password: "aaa",

    },
    {
      email: "user2@user.com",
      userName: "user2",
      password: "bbb",

    },
    {   
        email: "user3@user.com",
        userName: "user3",
        password: "ccc",
  
      },
    
  ];
  


  export const getCredential = (email) => {
    return credentials.find((credential) => credential.email === email);
  };
  
  export const getAllCredentials = () => {
    return credentials;
  };
  