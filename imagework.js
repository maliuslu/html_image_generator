var chosenphoto;

function choicephoto(photo) {
  chosenphoto = photo;
  document.getElementById('img1').style = "";
  document.getElementById('img2').style = "";
  document.getElementById('img3').style = "";
  document.getElementById('img' + chosenphoto).style = "border: solid red 10px;";
}

function onload() {
  choicephoto('1');
}

function createHtml(profile) {
  var img = document.getElementById('img' + chosenphoto);
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d', { willReadFrequently: true });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 0, 0);

  let width = img.width;
  let height = img.height;

  let html = "";
  for (let y = 0; y < height; y++) {
    html = html + '<div class="row">';
    for (let x = 0; x < width; x++) {
      let pixel = getPixelColor(ctx, x, y);
      html = html + '<div class="pixel" style="background-color: ' + pixel + ';"></div>\r\n';
    }
    html = html + '</div>';
  }

  var newWindow = window.open("/" + profile + ".html", "newWindow", "width=2000,height=1000");
  newWindow.onload = function () {
    newWindow.document.body.innerHTML = html;
  };

}

function getPixelColor(ctx, x, y) {
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
}