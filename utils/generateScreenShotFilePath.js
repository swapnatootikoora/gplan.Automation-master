var screenshotCount = 0;

module.exports = generateScreenShotFilePath;

function generateScreenShotFilePath(fileName) {
	screenshotCount++;
	fileName = fileName || 'Screenshot';
	return 'screenshots/' + zeroFill(screenshotCount, 3) + ' - ' + fileName + '.png';
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}