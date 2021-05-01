function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#im')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
            code = e.target.result.slice(24,);
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
            PROJECT_ID_1 = "68475756889"
            INPUT_DATA_FILE = jsonJ
            const token = "ya29.a0AfH6SMBGEEnGVoyQAWYhanYtrYolnqIhMBsHnyi2Bg6PzRfgkM0OkHjAyCd6HarV6bkc0HMr9XMLSyubt7Iv0AW79sDlOiISrHC0kntQ9EvjiNQXmFKuNw7xM_rGGvYf9rUEq3ThB9etyl2fsJ2EiHXcCoyA2oFATKj5YQ";
            fetch(`https://us-central1-aiplatform.googleapis.com/v1alpha1/projects/arboreal-logic-310217/locations/us-central1/endpoints/5972424016776921088:predict`, {
                body: `${INPUT_DATA_FILE}`,
                headers: {
                     Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                credentials: 'include'
            })
                .then(res => console.log(res))
                .catch((e) => {
                    console.error('Error:', e);
                });

        };
        reader.readAsDataURL(input.files[0]);
    }
}