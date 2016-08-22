$(document).ready(function () {
  getTasks();

  // add a task from the client side
  $('#task-submit').on('click', postTask);

  // mark task as completed in database and on client side
  $('#task-list').on('click', '.complete', completeTask);

  // delete task in database and on client side
  $('#task-list').on('click', '.delete', deleteTask);
});


function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function (tasks) {
      console.log('GET /tasks returns:', tasks);
      appendTasks(tasks);
    },

    error: function (response) {
      console.log('GET /tasks fails');
    },
  });
}


function postTask() {
  event.preventDefault();
  var task = {};

  $.each($('#task-form').serializeArray(), function (i, field) {
    task[field.name] = field.value;
  });

  if(task.task === ""  || task.task === " ") {
    alert("Please enter in a useful task!")
  } else {
  $.ajax({
      type: 'POST',
      url: '/tasks',
      data: task,
      success: function () {
        console.log('POST /tasks works!');
        $('#task').val('')
        $('.newTasks').empty();
        $('.finishedTasks').empty();
        getTasks();
      },

      error: function (response) {
        console.log('POST /tasks does not work...');
      },
    });
  }
}


function completeTask() {
  var taskId = $(this).parent().data('taskId');

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + taskId,
    success: function () {
      console.log('PUT / complete success');
      $('.newTasks').empty();
      $('.finishedTasks').empty();
      getTasks();
    },
    error: function () {
      console.log('PUT / complete failed');
    }
  });
}


function deleteTask () {
  var taskId = $(this).parent().data('taskId');

  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + taskId,
    success: function () {
      console.log('DELETE success');
      $('.newTasks').empty();
      $('.finishedTasks').empty();
      getTasks();
    },
    error: function () {
      console.log('DELETE failed');
    }
  });
}


function appendTasks(tasks) {
  tasks.forEach(function (task) {
    var $el = $('<li></li>');

    if(task.completed) {
      $el.addClass('completedTask');
      $el.append('<button class="complete notActive"><span class="checkmark"><div class="checkmark_stem"></div><div class="checkmark_kick"></div></span></button>');
      $el.append('<div>' + task.task + '</div>');
      $el.data('taskId', task.id);
      $el.append('<button class="delete">-</button>');
      $('.finishedTasks').last().append($el);
    } else {
      $el.append('<button class="complete"></button>');
      $el.append('<div>' + task.task + '</div>');
      $el.data('taskId', task.id);
      $el.append('<button class="delete">-</button>');
      $('.newTasks').append($el);
    }
  });
}
