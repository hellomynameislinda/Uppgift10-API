function getApi(charName) {
    fullUri = `https://www.swapi.tech/api/people/?name=${charName}`;

    let retString = '';
    //    console.log(fullUri);
    fetch(fullUri)
        .then(res => res.json())
        .then(data => {


            let properties = data.result[0].properties;

             // Constructing the output string
             const outputString = `Born in ${properties.birth_year}, ${properties.name} is a ${properties.gender} with ${properties.eye_color} eyes and ${properties.hair_color} hair.`;


             form.elements['api-result'].value = outputString;

        })
        .catch(err => console.log(err))
}


const form = document.querySelector('#swapi-form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // To make sure we don't submit

    const charName = form.elements['charName'].value;

    getApi(charName);
});