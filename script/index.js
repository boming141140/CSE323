var div = document.createElement('div');
div.setAttribute('id', 'keys');
var key = document.getElementById("emp").innerText;

//Check key is valid or not
function runCheck() {
  if(div.innerText.length == 0) {
    return false;
  }
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + div.innerText);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'

  };

  fetch("https://us-central1-aiplatform.googleapis.com/v1alpha1/projects/nth-aggregator-312802/locations/us-central1/endpoints/4609662917032280064:predict", requestOptions)
    .then(response => response.text())
    .then(result => {
      var res = JSON.parse(result);
      if (res.error.code == '401') {
          return false;
      }
      return true;
    })
    .catch(error => console.log('error', error));
}

//Generate key 
async function generKey() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  urlencoded.append("assertion", key);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  let data = async() => fetch("https://oauth2.googleapis.com/token", requestOptions)
    .then(async response => {
      var ans = await response.json();
      key_final = ans["access_token"];
      return key_final;
    })
    .catch(error => {console.log(error)} );
  return await data();
}

// Get the final result of the image
async function getResult(e, key_f) {
  code = e.slice(22,);
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
  INPUT_DATA_FILE = jsonJ
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + key_f);
  myHeaders.append("Content-Type", "application/json");

  var raw = jsonJ;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://us-central1-aiplatform.googleapis.com/v1alpha1/projects/nth-aggregator-312802/locations/us-central1/endpoints/4609662917032280064:predict", requestOptions)
    .then(async response => {
      ans = await response.json();
      console.log(ans);
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
// The upload image.
function readURL(input) {
  if (input.files && input.files[0]) {
    div = document.createElement("div");

    var reader = new FileReader();
    reader.onload = (e) => {
      $('#im')
        .attr('src', e.target.result)
        .width(150)
        .height(200);
        var img = new Image();//create a image
        img.src = e.target.result;//result is base64-encoded Data URI
        img.size = e.target.size;//set size (optional)
        img.onload = function(el) {
          var elem = document.createElement('canvas');//create a canvas
          var resize_width = 150;
          //scale the image to 600 (width) and keep aspect ratio
          var scaleFactor = resize_width / el.target.width;
          elem.width = resize_width;
          elem.height = el.target.height * scaleFactor;
    
          //draw in canvas
          var ctx = elem.getContext('2d');
          ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
    
          //get the base64-encoded Data URI from the resize image
          var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
    
          //assign it to thumb src
          if(runCheck()) {
            getResult(srcEncoded, div.innerText);
          } else {
            key_s =  generKey();
            key_s
              .then(val =>  {
              
              getResult(srcEncoded, val);});
          }
        };
      }    
    reader.readAsDataURL(input.files[0]);
  }
  console.log(div.innerHTML);
}

function takePho() {
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({video: true})
  }
   
}

