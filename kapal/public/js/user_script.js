let token = '';
let username = '';

document.addEventListener("DOMContentLoaded", function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  token = urlParams.get('token');
  username = urlParams.get('username');
  if (!token) {
    window.location.href = '/';
  } else {
    document.getElementById('username').textContent = username;
    fetchShips();
  }
});

function fetchShips() {
  fetch('/kapal', {
    headers: {
      'x-access-token': token
    }
  })
  .then(response => response.json())
  .then(data => {
    const shipList = document.getElementById('ship-list');
    shipList.innerHTML = '';
    data.forEach(ship => {
      const shipDiv = document.createElement('div');
      shipDiv.textContent = `${ship.nama_kapal} - ${ship.jenis_kapal} - ${ship.kapasitas_muatan}`;
      shipList.appendChild(shipDiv);
    });
  })
  .catch(error => console.error('Error:', error));
}

function logout() {
  token = '';
  window.location.href = '/';
}
