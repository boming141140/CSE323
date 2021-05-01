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
            const token = "ya29.a0AfH6SMDkaVPMCBxs6mv8v_lksg6PN26FaMN3r7meHNebGemIr4TaKJk_mphEXGE4asfD4jCtg79YDA37__K5MBLinrmBkYSsYd8-hO5lbhqZEEGtV4ySuQ_Klb6fS0KXpt_cA4yGITm_4xdp0GIJucwx5bgRSHDE6NNj";
            fetch(`https://us-central1-aiplatform.googleapis.com/v1alpha1/projects/arboreal-logic-310217/locations/us-central1/endpoints/5972424016776921088:predict`, {
                body: `${INPUT_DATA_FILE}`,
                headers: {
                     Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                
            })
                .then(res => console.log(res))
                .catch((e) => {
                    console.error('Error:', e);
                });

        };
        reader.readAsDataURL(input.files[0]);
    }
}