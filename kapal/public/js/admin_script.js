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

      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.onclick = () => updateShip(ship.id_kapal);
      shipDiv.appendChild(updateButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteShip(ship.id_kapal);
      shipDiv.appendChild(deleteButton);
    });
  })
  .catch(error => console.error('Error:', error));
}

function showAddShipForm() {
  document.getElementById('add-ship-form').style.display = 'block';
}

function addShip() {
  const nama_kapal = document.getElementById('nama_kapal').value;
  const jenis_kapal = document.getElementById('jenis_kapal').value;
  const kapasitas_muatan = document.getElementById('kapasitas_muatan').value;

  fetch('/kapal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ nama_kapal, jenis_kapal, kapasitas_muatan })
  })
  .then(response => {
    return response.json().then(data => ({ status: response.status, body: data }));
  })
  .then(({ status, body }) => {
    if (status === 201) {
      alert('Kapal berhasil ditambahkan!');
      fetchShips();
      document.getElementById('add-ship-form').style.display = 'none';
    } else {
      alert('Gagal menambahkan kapal!');
      console.error('Error:', body);
    }
  })
  .catch(error => console.error('Error:', error));
}

function updateShip(id) {
  const nama_kapal = prompt('Nama Kapal Baru:');
  const jenis_kapal = prompt('Jenis Kapal Baru:');
  const kapasitas_muatan = prompt('Kapasitas Muatan Baru:');

  fetch(`/kapal/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify({ nama_kapal, jenis_kapal, kapasitas_muatan })
  })
  .then(response => {
    if (response.ok) {
      alert('Kapal berhasil diperbarui!');
      fetchShips();
    } else {
      alert('Gagal memperbarui kapal!');
    }
  })
  .catch(error => console.error('Error:', error));
}

function deleteShip(id) {
  if (confirm('Apakah Anda yakin ingin menghapus kapal ini?')) {
    fetch(`/kapal/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Kapal berhasil dihapus!');
        fetchShips();
      } else {
        alert('Gagal menghapus kapal!');
      }
    })
    .catch(error => console.error('Error:', error));
  }
}

function logout() {
  token = '';
  window.location.href = '/';
}
