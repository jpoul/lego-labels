# lego-labels

A tool to generate and print lego labels for Stanley drawers.

## How to use
1. Open index.js and replace the value of the apiKey variable with your https://www.rebrickable.com API key. 
2. Open the data.json file in your favourite json editor and create your box and drawer contents.
3. Open index.html in your favourite browser (except IE*).
4. Click the "Choose File" button and select the data.json file.
5. Click Render.

## Printing
Print settings are configured in the index.css file, so you shouldn't have to configure any specific settings.

## Data structure
The model for the data.json file is an array of boxes. Each box has the following properties:
* id: The number of your drawer box
* size: small or big (based on the size of the stanley drawers
* drawers: an array of the contents of each drawer. Each drawer is an array itself of all the part numbers in the drawer.

### Data example:
```json
{
  "id": "1",
  "size": "small",
  "drawers": [
    ["partnum1", "partnum2", "partnum3"],
    ["partnum4", "partnum6", "partnum7"]
  ]
}, 
{
  "id": "2",
  "size": "big",
  "drawers": [
    ["partnum11", "partnum21", "partnum31"],
    ["partnum41", "partnum61", "partnum71"]
  ]
}
```

## Notes
* This tool is for sorting by part, not element. Feel free to download the code and introduce elements as well :)
* It uses the http://www.rebrickable.com API so you will need a rebrickable account and API key to get the images.