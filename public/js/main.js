$(document).ready(function(){

    $(".enrollBtn").on("click",function(){
    //grabs value from event to follow
             var cand = ($(this).attr("value"));
             $.ajax({
 								        type: "POST",
 								        url: $(this).data("url"),
                        dataType:"json",
 								        data: { CandidateId: cand},
 								        success:function() {
                            alert('Enrolled');
                            window.location.href='/elections';
 								        }
 								  	  });

    });

   $(".endElection").click(function(){

      var elect = ($(this).attr("value"));
      $.ajax({
                 type: "POST",
                 url: $(this).data("url"),
                 dataType:"json",
                 data: { endElectId: elect},
                 success:function() {
                     alert('Election has ended! Continue to see the results');
                     window.location.href='/elections/calResults/'+elect;
                 }
               });



    });

    $("#nextRound").click(function(){
       var tempcandidates =  new Array();

       tempcandidates.push($("#candidate1").attr("value"),($("#candidate2").attr("value")));

       $.ajax({
                type: "POST",
                  url: $(this).data("url"),
                 dataType:"json",
                  data: { candidates: tempcandidates},
                  success:function() {
                      window.location.href='/elections';
                  }
                });
     });


     $("#finalRoundResult").click(function(){
        var url = window.location.href + '/roundTwo';
        $("#finalRoundResult").attr('href', url );
      });


});