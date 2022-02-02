(function() {
    console.log('Sanity check!');
})();

function handleClick(type) {
    fetch('/tasks', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: type}),

    })
    .then(response => response.json())
    .then(data => {
        getStatus(data.task_id)
    })
};

function getStatus(taskID) {
    fetch(`/tasks/${taskID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(res => {
      console.log(res)
      const html = `
        <tr>
          <td>${taskID}</td>
          <td>${res.task_status}</td>
          <td>${res.task_result}</td>
        </tr>`;
      const newRow = document.getElementById('tasks').insertRow();
      newRow.innerHTML = html;
  
      const taskStatus = res.data.task_status;
      if (taskStatus === 'finished' || taskStatus === 'failed') return false;
      setTimeout(function() {
        getStatus(res.data.task_id);
      }, 1000);
    })
    .catch(err => console.log(err));
  }