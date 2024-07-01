function LoginViewModel() {
  var self = this;
  self.email = ko.observable('');
  self.password = ko.observable('');

  self.login = function () {
    $.post('/auth/login', {
      email: self.email(),
      password: self.password(),
    })
      .done(function (data) {
        alert('Login successful!');
        // Redirecionar para a home
        const { access_token } = data;
        localStorage.setItem('token', access_token);
        window.location.href = '/home';
      })
      .fail(function (error) {
        alert('Login failed!');
      });
  };
}
const viewModel = new LoginViewModel();
ko.applyBindings(viewModel, document.getElementById('login-form'));
