function HomeViewModel() {
  const self = this;

  self.token = ko.observable(localStorage.getItem('token'));
  self.users = ko.observableArray([]);
  self.currentPage = ko.observable(1);
  self.pageSize = ko.observable(10);
  self.totalPages = ko.observableArray([]);

  self.loadUsers = function (page) {
    const url = `/users?page=${page}&size=${self.pageSize()}`;
    $.ajax({
      url: url,
      type: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${self.token()}`,
      },

      success: function (response) {
        self.users(
          response.users.map((u) => ({
            ...u,
            address: `${u.address.street},${u.address.number},${u.address.neighborhood},${u.address.city},${u.address.state}, ${u.address.zipCode}`,
          })),
        );
        const totalPages = Math.ceil(response.totalCount / self.pageSize());
        self.totalPages(Array.from({ length: totalPages }, (_, i) => i + 1));
      },
      error: function (error) {
        console.error('Error loading users:', error);
      },
    });
  };

  self.prevPage = function () {
    if (self.currentPage() > 1) {
      self.currentPage(self.currentPage() - 1);
      self.loadUsers(self.currentPage());
    }
  };

  self.nextPage = function () {
    if (self.currentPage() < self.totalPages().length) {
      self.currentPage(self.currentPage() + 1);
      self.loadUsers(self.currentPage());
    }
  };

  self.setPage = function (page) {
    self.currentPage(page);
    self.loadUsers(page);
  };

  // Load the initial users
  self.loadUsers(self.currentPage());
}

const viewModel = new HomeViewModel();
ko.applyBindings(viewModel);
