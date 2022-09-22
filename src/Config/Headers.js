const token = localStorage.getItem("token");

export const headers = {
    "authorization": "Bearer " + JSON.parse(token)
};
