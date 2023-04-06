const users = [
    { id: 1, name: "Mohammad" },
    { id: 2, name: "Alaa" },
    { id: 4, name: "Mira Faraj" },
    { id: 6, name: "Fatima Diab" },
];


export function getSalesPerson(id) {
    if (id) {
        return users.find(user => user.id === id).name || "";
    } else {
        return "";
    }
};
