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
                            location.reload();
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

    $(".endParlimentElection").click(function(){
      var elect = ($(this).attr("value"));
      $.ajax({
                 type: "POST",
                 url: $(this).data("url"),
                 dataType:"json",
                 data: { endElectId: elect},
                 success:function() {
                     alert('Election has ended!');
                     window.location.href='/elections/calParliResults/'+elect;
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


         $("#whichPartySelectParli").change(function(){
            //with each selectio it grabs the selected party and disaply the candidates that are a part of that party
              var party = ($(this)).find(":selected").text();


              $.ajax({
                       type: "POST",
                         url: $(this).data("url"),
                        dataType:"json",
                         data: { party: party },
                         success:function(candidates) {
                           var trHTML = '';
                                 if(candidates.candidates.length <=0 ){
                                   trHTML = "No Candidates";
                                 }
                                 else {
                                      trHTML ='<tr><td>'+'Candidate Name'+'</td><td>'+'Address'+'</td><td>'+'Type'+'</td></tr>';
                                   $.each(candidates.candidates, function (i, item) {

                                       trHTML += '<tr><td>' + item.name + '</td><td>' + item.address + '</td><td>'+ item.type + '</td><td>' + '<button value ='+item._id+' class=\"btn btn-primary nominateCandidateParliBtn \" >Nominate </button>' + '</td></tr>';

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

        $('#showCandForParty').on('click','.nominateCandidateParliBtn',function(){
              var cand = ($(this).attr("value"));
              var dist = $('#whichDistrictSelect').find(":selected").text();
           $.ajax({
                    type: "PUT",
                      url: $(this).data("url"),
                     dataType:"json",
                      data: { candidate: cand, district : dist },
                      success:function() {
                         alert('Nominated');
                         window.location.href='/parties/pAccount';
                      }
                    });


       });



      $('#electionType').on('change',function(){
          if($(this).val()=='Parliamentary'){
              $('#districtElection').show();
          }else{
              $('#districtElection').hide();
          }
      });

      $('#districtNo').on('change', function () {
           var number_of_fields = $('#districtNo').val();
           var html ="";

           for(var i = 0; i < number_of_fields; i++){
            html += '<input type=\"text\" name=\"districts[]\" class=\"form-control districtInputs\" placeholder=\"District Name\">';
             }
            $('#districtsDiv'). html(html);

      });

      $('.districtBox').click(function(){
          var dist = ($(this).attr("value"));

          $.ajax({
                   type: "POST",
                     url: $(this).data("url"),
                    dataType:"json",
                     data: { district: dist },
                     success:function(data) {
                        var trHTML = '<h4>Candidates</h4><form class=\"form\" action=\"/users/vote/submitVote\" method=\"post\">';
                        $.each(data.candidates, function (i, item) {
                              trHTML += '<div class=\"radio form-control candidateBox\">'+
                                      '<label class=\"votingLabel\">'+
                                      '<input type=\"radio\"  value=\"' + item._id + '\" name=\"candidate\" required/>'+ item.name+'</label>'+
                                      '<div class=\"votingLabelParty\">'+item.party+'</div></div>';

                        });
                        if(data.candidates.length > 0){
                            trHTML += '<input type=\"submit\" name=\"vote\" value=\"Submit Vote\" class=\"btn btn-primary\"></form>';
                        }
                        $('#vote-section-district').html(trHTML);
                     }
                   });

      });



});
