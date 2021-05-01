function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var code = "";
        reader.onload = function (e) {
            $('#im')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
            code = e.target.result.slice(23,);
            let jso = {
              instances: [{
                content: code
              }],
              parameters: {
                confidenceThreshold: 0.5,
                maxPredictions: 5
              }
            }
          jsonJ = JSON.stringify(jso);
          ENDPOINT_ID="5972424016776921088"
          PROJECT_ID="arboreal-logic-310217"
          INPUT_DATA_FILE = jsonJ
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer ya29.a0AfH6SMD5j4svNNxBHMIzJgKuR9LiS-hY_T1kCfI_D2oOxd2NfjM7qjh45QHHiop0tYCqf4HzStyY1RSy0w2pVqWT5xbVniPlPELdpbH7yofdJVkZPJ6-HmTMaJRiJtYM4BnhR0TPFhhITGbU9SDYXcaHxjqGkDJ9PqeiCA");
          myHeaders.append("Content-Type", "application/json");
          
          var raw = jsonJ;
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch("https://us-central1-aiplatform.googleapis.com/v1alpha1/projects/arboreal-logic-310217/locations/us-central1/endpoints/5972424016776921088:predict", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}