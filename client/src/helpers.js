const cookies = require("react-cookies");

const isAdmin = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  fetch(`/user/`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (data.surname === "Chehebar") {
        return true;
      } else {
        return false;
      }
    });
};

const isLoggedIn = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  fetch(`/user/`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data._id) {
        console.log("if fired");
        return true;
      } else {
        return false;
      }
    });
};

const logout = () => {
  cookies.remove("JWT");
  window.location.href = "/";
};

export { isAdmin, isLoggedIn, logout };
