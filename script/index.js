function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#im')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
            
            let jso = {
                "instances": [{
                    "content": e.target.result
                }],
                "parameters": {
                "confidenceThreshold": 0.5,
                "maxPredictions": 5
              }
            } 
            jsonJ = JSON.stringify(jso);
            ENDPOINT_ID="5972424016776921088"
            PROJECT_ID="arboreal-logic-310217"
            PROJECT_ID_1 = "68475756889"
            INPUT_DATA_FILE = jsonJ
            token = "ya29.a0AfH6SMDhtmvNEx0Z1PHq_r64VTQeQTdbLkwtSATIm6aIm-ch2XM6mruKFMtnoza7uf8T89OVf9rnpCuU6lsYCT1I2nmG9--NnCqdVjuwbzPP23AUWgQ6yx6NPmMXUh0i51qkxh5v-IqXlQHsf_IQYcsA7xzHHn0DXPJHug"
            fetch(`https://us-central1-aiplatform.googleapis.com/v1alpha1/projects/${PROJECT_ID}/${PROJECT_ID_1}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`, {
                body: `@${INPUT_DATA_FILE}`,
                headers: {
                     Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
                .then(res => console.log(res))
                .catch((e) => {
                    console.error('Error:', e);
                });

        };
        reader.readAsDataURL(input.files[0]);
    }
}