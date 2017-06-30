$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      //console.log(todo); //WORK TILL THIS MOMENT

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        dataType: "json",
        success: function(data){
          //console.log(data); //here is send null back as 4th object
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
