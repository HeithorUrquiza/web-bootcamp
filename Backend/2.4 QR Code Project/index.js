/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer"
import qr from "qr-image"
import * as fs from "node:fs"


function generateQRCodeAndSave(url, pathImage, pathFile){
    const qrCode = qr.image(url);

    qrCode.pipe(fs.createWriteStream(pathImage))

    qrCode.on('end', () => {
        console.log('QR Code has been sucessfuly generated');
        fs.writeFile(pathFile, url, (err) => {
            if (err) throw err
            console.log("The file has been saved")
        })
    });

    qrCode.on('error', error => {
        console.error('An error ocurred:', error);
    });
}


inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Type your URL:'
    }
  ])
  .then(answers => {
    const url = answers.url
    generateQRCodeAndSave(url, "./qrCode.png", "./URL.txt")
  })
  .catch(error => {
    console.error('AN error ocurred:', error);
  });