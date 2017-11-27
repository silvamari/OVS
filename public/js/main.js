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


      $(".deleteCandidate").click(function(){
        if(confirm('Are you sure?')){
          var cand = ($(this).attr("value"));
         $.ajax({
                  type: "POST",
                    url: $(this).data("url"),
                   dataType:"json",
                    data: { candidate: cand},
                    success:function() {
                        window.location.href='/candidates';
                    }
                  });
            }
       });

    $(".deleteParty").click(function(){
        if(confirm('Are you sure?')){
            var prty = ($(this).attr("value"));
            $.ajax({
                type: "POST",
                url: $(this).data("url"),
                dataType:"json",
                data: { party: prty},
                success:function() {
                    window.location.href='/parties';
                }
            });
        }
    });

       $(".deleteVoter").click(function(){
          if(confirm('Are you sure?')){
             var tempVoter = ($(this).attr("value"));
            $.ajax({
                     type: "POST",
                       url: $(this).data("url"),
                      dataType:"json",
                       data: { voter: tempVoter},
                       success:function() {
                           window.location.href='/elections/voters';
                       }
                     });
          }
        });
        $(".deleteElection").click(function(){
          var url = window.location.href + '/deleteElection';

           if(confirm('Are you sure? This will deletes votes and everything else associated with the election.')){

            // $(this).attr('href', url );

            var tempElection = ($(this).attr("value"));
             $.ajax({
                      type: "PUT",
                        url: $(this).data("url"),
                       dataType:"json",
                        data: { election: tempElection},
                        success:function() {
                            window.location.href='/elections';
                        }
                      });
           }
         });


         $("#whichPartySelect").change(function(){
            //with each selectio it grabs the selected party and disaply the candidates that are a part of that party
              var party = ($(this)).find(":selected").text();

              $.ajax({
                       type: "POST",
                         url: $(this).data("url"),
                        dataType:"json",
                         data: { party: party},
                         success:function(candidates) {
                           var trHTML = '';
                                 if(candidates.candidates.length <=0 ){
                                   trHTML = "No Candidates";
                                 }
                                 else {
                                   $.each(candidates.candidates, function (i, item) {

                                       trHTML += '<tr><td>' + item.name + '</td><td>' + item.address + '</td><td>'+ item.type + '</td></tr>';

                                   });
                                 }

                                $('#showCandForParty').html(trHTML);
                         }
                       });

         });


         $("#whichPartySelectPres").change(function(){
            //with each selectio it grabs the selected party and disaply the candidates that are a part of that party
              var party = ($(this)).find(":selected").text();

              $.ajax({
                       type: "POST",
                         url: $(this).data("url"),
                        dataType:"json",
                         data: { party: party},
                         success:function(candidates) {
                           var trHTML = '';
                                 if(candidates.candidates.length <=0 ){
                                   trHTML = "No Candidates";
                                 }
                                 else {
                                      trHTML ='<tr><td>'+'Candidate Name'+'</td><td>'+'Address'+'</td><td>'+'Type'+'</td></tr>';
                                   $.each(candidates.candidates, function (i, item) {

                                       trHTML += '<tr><td>' + item.name + '</td><td>' + item.address + '</td><td>'+ item.type + '</td><td>' + '<button value ='+item._id+' class=\"btn btn-primary nominateCandidatePresBtn \" >Nominate </button>' + '</td></tr>';

                                   });
                                 }

                                $('#showCandForParty').html(trHTML);
                         }
                       });

         });

         $('#showCandForParty').on('click','.nominateCandidatePresBtn',function(){
           var cand = ($(this).attr("value"));
            $.ajax({
                     type: "PUT",
                       url: $(this).data("url"),
                      dataType:"json",
                       data: { candidate: cand },
                       success:function() {
                          alert('Nominated');
                          window.location.href='/parties/pAccount';
                       }
                     });




        });

});
