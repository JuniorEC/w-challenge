function RegisterViewModel() {
  const self = this;

  self.fullName = ko.observable('');
  self.email = ko.observable('');
  self.password = ko.observable('');
  self.confirmPassword = ko.observable('');
  self.street = ko.observable('');
  self.neighborhood = ko.observable('');
  self.number = ko.observable('');
  self.city = ko.observable('');
  self.state = ko.observable('');
  self.zipCode = ko.observable('');

  self.zipCode.subscribe(function (newZipCode) {
    if (newZipCode.length === 8) {
      self.fetchAddress(newZipCode);
    }
  });

  self.fetchAddress = function (cep) {
    $.ajax({
      url: `/users/cep?cep=${cep}`,
      type: 'GET',
      success: function (response) {
        if (response.erro) {
          alert('CEP não encontrado. Por favor, digite outro CEP.');
        } else {
          self.street(response.logradouro);
          self.neighborhood(response.bairro);
          self.city(response.localidade);
          self.state(response.uf);
        }
      },
      error: function () {
        alert('Erro ao buscar o CEP. Por favor, tente novamente.');
      },
    });
  };

  self.register = function () {
    // Validate form data
    if (self.password() !== self.confirmPassword()) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      fullName: self.fullName(),
      email: self.email(),
      password: self.password(),
      confirmPassword: self.confirmPassword(),
      address: {
        street: self.street(),
        neighborhood: self.neighborhood(),
        number: self.number(),
        city: self.city(),
        state: self.state(),
        zipCode: self.zipCode(),
      },
    };

    // Send data to the server
    $.ajax({
      url: '/users/register',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function (response) {
        alert('Registration successful!');
        // Redirect to login page or home page
        window.location.href = '/login';
      },
      error: function (error) {
        alert('Registration failed: ' + error.responseJSON.message);
      },
    });
  };
}

const viewModel = new RegisterViewModel();
ko.applyBindings(viewModel, document.getElementById('register-form'));
