module.exports = {
  async getAllUsers(id = undefined) {
    const allUsers = [
      {
        name: 'Haley Wright',
        user_id: 1
      }, {
        name: 'James Wright',
        user_id: 2
      }, {
        name: 'Sassy Wright',
        user_id: 3
      },
    ];

    if (id) return allUsers.filter(u => u.user_id == id);
    return allUsers;
  }
};
