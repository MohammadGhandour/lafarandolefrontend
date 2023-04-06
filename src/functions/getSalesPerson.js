const users = [
    { id: 1, name: "Mohammad" },
    { id: 2, name: "Alaa" },
    { id: 6, name: "Fatima Diab" },
];


export function getSalesPerson(id) {
    return users.find(user => user.id === id).name;
};
