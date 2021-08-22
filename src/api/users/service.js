module.exports = {
  async getAllUsers(id = undefined) {
    const allUsers = [
      {
        name: 'First Last',
        user_id: 1
      }, {
        name: 'Second Last',
        user_id: 2
      }, {
        name: 'Third Last',
        user_id: 3
      },
    ];

    if (id) return allUsers.filter(u => u.user_id == id);
    return allUsers;
  }
};
